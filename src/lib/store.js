import { supabase, isConfigured } from './supabase'
import { MATCHES, BRACKET_MAP } from '../data/schedule'

// ── LOCAL STORAGE KEYS ──────────────────────────────────────────────────────
const SCHEDULE_VERSION = 'v3' // bump when schedule.js teams/dates change
const LS_MATCHES = `wc2026_matches_${SCHEDULE_VERSION}`
const LS_PREDICTIONS = 'wc2026_predictions'

function lsGet(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}
function lsSet(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function initLocalMatches() {
  if (!localStorage.getItem(LS_MATCHES)) lsSet(LS_MATCHES, MATCHES)
}

// ── MATCHES ──────────────────────────────────────────────────────────────────

export async function getMatches() {
  if (isConfigured) {
    const { data, error } = await supabase.from('matches').select('*').order('match_date')
    if (!error) return data
  }
  initLocalMatches()
  const stored = lsGet(LS_MATCHES, MATCHES)
  return [...stored].sort((a, b) => new Date(a.match_date) - new Date(b.match_date))
}

export async function updateMatchResult(id, homeScore, awayScore, status) {
  if (isConfigured) {
    const { error } = await supabase
      .from('matches')
      .update({ home_score: homeScore, away_score: awayScore, status })
      .eq('id', id)
    if (error) throw error
    await recalcPoints()
  } else {
    const matches = lsGet(LS_MATCHES, MATCHES)
    const idx = matches.findIndex(m => m.id === id)
    if (idx !== -1) {
      matches[idx] = { ...matches[idx], home_score: homeScore, away_score: awayScore, status }
      lsSet(LS_MATCHES, matches)
    }
    recalcLocalPoints()
  }
  if (status === 'finished' && homeScore !== awayScore) {
    await advanceBracket(id, homeScore, awayScore)
  }
}

async function advanceBracket(matchId, homeScore, awayScore) {
  const bracket = BRACKET_MAP[matchId]
  if (!bracket) return

  const winnerSlot = homeScore > awayScore ? 'home' : 'away'
  const loserSlot  = winnerSlot === 'home' ? 'away' : 'home'

  let match
  if (isConfigured) {
    const { data } = await supabase.from('matches').select('*').eq('id', matchId).single()
    match = data
  } else {
    match = lsGet(LS_MATCHES, MATCHES).find(m => m.id === matchId)
  }
  if (!match) return

  const winnerTeam = match[`${winnerSlot}_team`]
  const loserTeam  = match[`${loserSlot}_team`]

  await setMatchTeamSlot(bracket.next, bracket.slot, winnerTeam)
  if (bracket.loser_next) {
    await setMatchTeamSlot(bracket.loser_next, bracket.loser_slot, loserTeam)
  }
}

async function setMatchTeamSlot(matchId, slot, team) {
  const field = slot === 'home' ? 'home_team' : 'away_team'
  if (isConfigured) {
    await supabase.from('matches').update({ [field]: team }).eq('id', matchId)
  } else {
    const matches = lsGet(LS_MATCHES, MATCHES)
    const idx = matches.findIndex(m => m.id === matchId)
    if (idx !== -1) {
      matches[idx] = { ...matches[idx], [field]: team }
      lsSet(LS_MATCHES, matches)
    }
  }
}

export async function updateMatchTeams(id, homeTeam, awayTeam) {
  if (isConfigured) {
    const { error } = await supabase
      .from('matches')
      .update({ home_team: homeTeam, away_team: awayTeam })
      .eq('id', id)
    if (error) throw error
    return
  }
  const matches = lsGet(LS_MATCHES, MATCHES)
  const idx = matches.findIndex(m => m.id === id)
  if (idx !== -1) {
    matches[idx] = { ...matches[idx], home_team: homeTeam, away_team: awayTeam }
    lsSet(LS_MATCHES, matches)
  }
}

// ── PREDICTIONS ──────────────────────────────────────────────────────────────

export async function getPredictions(userName) {
  if (isConfigured) {
    const query = supabase.from('predictions').select('*')
    if (userName) query.eq('user_name', userName)
    const { data, error } = await query
    if (!error) return data
  }
  const all = lsGet(LS_PREDICTIONS, [])
  return userName ? all.filter(p => p.user_name === userName) : all
}

export async function savePrediction(userName, matchId, predictedWinner, predictedHomeScore = null, predictedAwayScore = null) {
  if (isConfigured) {
    const { error } = await supabase.from('predictions').upsert(
      { user_name: userName, match_id: matchId, predicted_winner: predictedWinner, predicted_home_score: predictedHomeScore, predicted_away_score: predictedAwayScore, points: null },
      { onConflict: 'user_name,match_id' }
    )
    if (error) throw error
    return
  }
  const all = lsGet(LS_PREDICTIONS, [])
  const existing = all.findIndex(p => p.user_name === userName && p.match_id === matchId)
  const entry = { user_name: userName, match_id: matchId, predicted_winner: predictedWinner, predicted_home_score: predictedHomeScore, predicted_away_score: predictedAwayScore, points: null }
  if (existing !== -1) all[existing] = entry
  else all.push(entry)
  lsSet(LS_PREDICTIONS, all)
}

// ── LEADERBOARD ──────────────────────────────────────────────────────────────

export async function getLeaderboard() {
  if (isConfigured) {
    const { data, error } = await supabase
      .from('predictions')
      .select('user_name, points')
    if (!error) {
      return aggregateLeaderboard(data)
    }
  }
  const all = lsGet(LS_PREDICTIONS, [])
  return aggregateLeaderboard(all)
}

function aggregateLeaderboard(predictions) {
  const map = {}
  for (const p of predictions) {
    if (!map[p.user_name]) map[p.user_name] = { user_name: p.user_name, total: 0, correct: 0, total_picks: 0 }
    if (p.points !== null) {
      map[p.user_name].total += p.points
      map[p.user_name].total_picks += 1
      if (p.points > 0) map[p.user_name].correct += 1
    }
  }
  return Object.values(map).sort((a, b) => b.total - a.total || b.correct - a.correct)
}

// ── LIVE SCORES REFRESH ──────────────────────────────────────────────────────

// ESPN team name → our app name
const ESPN_NAME_MAP = {
  'Czechia': 'Czech Republic',
  'Turkey': 'Türkiye',
  "Cote d'Ivoire": 'Ivory Coast',
  'Congo': 'DR Congo',
  'Congo DR': 'DR Congo',
  'Congo, DR': 'DR Congo',
  'Democratic Republic of the Congo': 'DR Congo',
  'Democratic Republic of Congo': 'DR Congo',
  'Bosnia-Herzegovina': 'Bosnia & Herzegovina',
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  'Cape Verde Islands': 'Cape Verde',
}
function normalizeEspn(n) { return ESPN_NAME_MAP[n] || n }

const ESPN_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard'

export async function refreshFromApi() {
  try {
    // Fetch today + the past 7 days to catch any recently finished matches
    const dates = []
    for (let i = 0; i <= 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d.toISOString().slice(0, 10).replace(/-/g, ''))
    }

    const scoreMap = {}
    for (const date of dates) {
      const res = await fetch(`${ESPN_URL}?dates=${date}`)
      if (!res.ok) continue
      const data = await res.json()
      for (const event of (data.events || [])) {
        const comp = event.competitions?.[0]
        if (!comp) continue
        const statusDesc = comp.status?.type?.description || ''
        const statusName = comp.status?.type?.name || ''
        const finished = ['Full Time', 'Final', 'FT', 'Ended', 'End', 'After Extra Time', 'After Penalties'].includes(statusDesc)
          || statusName === 'STATUS_FINAL'
        const live = ['In Progress', 'Halftime', 'Half Time', 'Extra Time'].includes(statusDesc)
          || statusName === 'STATUS_IN_PROGRESS'
        if (!finished && !live) continue

        // competitors: find home and away by homeAway field
        const homeComp = comp.competitors?.find(c => c.homeAway === 'home') || comp.competitors?.[0]
        const awayComp = comp.competitors?.find(c => c.homeAway === 'away') || comp.competitors?.[1]
        if (!homeComp || !awayComp) continue

        const home = normalizeEspn(homeComp.team.displayName)
        const away = normalizeEspn(awayComp.team.displayName)
        const key = `${home}|${away}`
        scoreMap[key] = {
          home_score: parseInt(homeComp.score, 10),
          away_score: parseInt(awayComp.score, 10),
          status: finished ? 'finished' : 'live',
        }
      }
    }

    if (Object.keys(scoreMap).length === 0) return { updated: 0 }

    if (isConfigured) {
      // Fetch all matches from Supabase and update finished ones
      const { data: matches } = await supabase.from('matches').select('*')
      if (!matches) return { updated: 0 }
      let updated = 0
      for (const m of matches) {
        const key = `${m.home_team}|${m.away_team}`
        const result = scoreMap[key]
        if (result && (m.home_score !== result.home_score || m.away_score !== result.away_score)) {
          await supabase.from('matches').update(result).eq('id', m.id)
          updated++
        }
      }
      if (updated > 0) await recalcPoints()
      return { updated }
    } else {
      // Update localStorage
      const matches = lsGet(LS_MATCHES, MATCHES)
      let updated = 0
      for (const m of matches) {
        const key = `${m.home_team}|${m.away_team}`
        const result = scoreMap[key]
        if (result && (m.home_score !== result.home_score || m.away_score !== result.away_score)) {
          Object.assign(m, result)
          updated++
        }
      }
      if (updated > 0) {
        lsSet(LS_MATCHES, matches)
        recalcLocalPoints()
      }
      return { updated }
    }
  } catch (e) {
    console.error('refreshFromApi:', e)
    throw e
  }
}

// ── POINTS CALCULATION ───────────────────────────────────────────────────────

const KNOCKOUT_STAGES = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Third Place', 'Final']

const STAGE_WIN_POINTS = { 'Final': 200, 'Third Place': 100 }

const SCORE_BONUS_STAGES = ['Final', 'Third Place']
const SCORE_BONUS = 100

function calcPoints(match, predictedWinner, predictedHomeScore = null, predictedAwayScore = null) {
  if (match.home_score === null || match.away_score === null) return null
  const actual =
    match.home_score > match.away_score ? 'home'
    : match.away_score > match.home_score ? 'away'
    : 'draw'
  const winPoints = STAGE_WIN_POINTS[match.stage] ?? 2
  if (predictedWinner !== actual) {
    const isKnockout = KNOCKOUT_STAGES.includes(match.stage)
    if (!isKnockout && (predictedWinner === 'draw' || actual === 'draw')) return 1
    return 0
  }
  let pts = winPoints
  if (SCORE_BONUS_STAGES.includes(match.stage) && predictedHomeScore !== null && predictedAwayScore !== null) {
    if (predictedHomeScore === match.home_score && predictedAwayScore === match.away_score) {
      pts += SCORE_BONUS
    }
  }
  return pts
}

export async function recalcPoints() {
  if (!isConfigured) return
  const { data: matches } = await supabase.from('matches').select('*').eq('status', 'finished')
  const { data: preds } = await supabase.from('predictions').select('*')
  if (!matches || !preds) return
  const updates = preds
    .filter(p => matches.find(m => m.id === p.match_id))
    .map(p => {
      const match = matches.find(m => m.id === p.match_id)
      return { ...p, points: calcPoints(match, p.predicted_winner, p.predicted_home_score, p.predicted_away_score) }
    })
  for (const u of updates) {
    await supabase.from('predictions').update({ points: u.points }).eq('id', u.id)
  }
}

function recalcLocalPoints() {
  const matches = lsGet(LS_MATCHES, MATCHES)
  const preds = lsGet(LS_PREDICTIONS, [])
  const updated = preds.map(p => {
    const match = matches.find(m => m.id === p.match_id)
    if (!match || match.status !== 'finished') return p
    return { ...p, points: calcPoints(match, p.predicted_winner, p.predicted_home_score, p.predicted_away_score) }
  })
  lsSet(LS_PREDICTIONS, updated)
}
