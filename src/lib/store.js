import { supabase, isConfigured } from './supabase'
import { MATCHES } from '../data/schedule'

// ── LOCAL STORAGE KEYS ──────────────────────────────────────────────────────
const SCHEDULE_VERSION = 'v2' // bump when schedule.js teams/dates change
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
    return
  }
  const matches = lsGet(LS_MATCHES, MATCHES)
  const idx = matches.findIndex(m => m.id === id)
  if (idx !== -1) {
    matches[idx] = { ...matches[idx], home_score: homeScore, away_score: awayScore, status }
    lsSet(LS_MATCHES, matches)
  }
  recalcLocalPoints()
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

export async function savePrediction(userName, matchId, predictedWinner) {
  if (isConfigured) {
    const { error } = await supabase.from('predictions').upsert(
      { user_name: userName, match_id: matchId, predicted_winner: predictedWinner, points: null },
      { onConflict: 'user_name,match_id' }
    )
    if (error) throw error
    return
  }
  const all = lsGet(LS_PREDICTIONS, [])
  const existing = all.findIndex(p => p.user_name === userName && p.match_id === matchId)
  const entry = { user_name: userName, match_id: matchId, predicted_winner: predictedWinner, points: null }
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
      if (p.points === 2) map[p.user_name].correct += 1
    }
  }
  return Object.values(map).sort((a, b) => b.total - a.total || b.correct - a.correct)
}

// ── LIVE SCORES REFRESH ──────────────────────────────────────────────────────

// Normalize team names from openfootball → our app names
const NAME_MAP = {
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  "Côte d'Ivoire": 'Ivory Coast',
  'Congo DR': 'DR Congo',
  'DR Congo': 'DR Congo',
  'Czech Republic': 'Czech Republic',
}
function normalizeName(n) { return NAME_MAP[n] || n }

export async function refreshFromApi() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json')
    if (!res.ok) throw new Error('API fetch failed')
    const data = await res.json()

    // Build a map: "HomeTeam|AwayTeam" → { home_score, away_score, status }
    const scoreMap = {}
    for (const round of (data.rounds || data.matches_groups || [])) {
      for (const m of (round.matches || [])) {
        const home = normalizeName(m.team1)
        const away = normalizeName(m.team2)
        const key = `${home}|${away}`
        const ft = m.score?.ft
        if (ft) {
          scoreMap[key] = { home_score: ft[0], away_score: ft[1], status: 'finished' }
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

function calcPoints(match, predictedWinner) {
  if (match.home_score === null || match.away_score === null) return null
  const actual =
    match.home_score > match.away_score ? 'home'
    : match.away_score > match.home_score ? 'away'
    : 'draw'
  if (predictedWinner === actual) return 2
  if (predictedWinner === 'draw' || actual === 'draw') return 1
  return 0
}

async function recalcPoints() {
  if (!isConfigured) return
  const { data: matches } = await supabase.from('matches').select('*').eq('status', 'finished')
  const { data: preds } = await supabase.from('predictions').select('*')
  if (!matches || !preds) return
  const updates = preds
    .filter(p => matches.find(m => m.id === p.match_id))
    .map(p => {
      const match = matches.find(m => m.id === p.match_id)
      return { ...p, points: calcPoints(match, p.predicted_winner) }
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
    return { ...p, points: calcPoints(match, p.predicted_winner) }
  })
  lsSet(LS_PREDICTIONS, updated)
}
