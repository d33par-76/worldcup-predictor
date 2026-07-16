import { useState, useEffect } from 'react'
import { FLAG_EMOJI, STAGE_COLORS } from '../data/schedule'

function formatTimes(iso) {
  const d = new Date(iso)
  const pst = d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  })
  const nlTime = d.toLocaleString('en-US', {
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  })
  const nl = `${nlTime} NED`
  return { pst, nl }
}

function flag(team) {
  return FLAG_EMOJI[team] ?? '🏳️'
}

function StatusBadge({ status }) {
  if (status === 'live') return <span className="text-xs font-bold text-red-400 animate-pulse">● LIVE</span>
  if (status === 'finished') return <span className="text-xs text-gray-500 dark:text-gray-500">Final</span>
  return null
}

const KNOCKOUT_STAGES = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Third Place', 'Final']
const STAGE_WIN_POINTS = { 'Final': 200, 'Third Place': 100 }
const SCORE_PICKER_STAGES = ['Final', 'Third Place']

export default function MatchCard({ match, prediction, predScore, scoreInput, onScoreChange, onPredict, locked, compact }) {
  const { home_team, away_team, match_date, venue, home_score, away_score, stage, status } = match
  const stageColor = STAGE_COLORS[stage] ?? 'bg-gray-800 text-gray-300'
  const { pst, nl } = formatTimes(match_date)
  const isKnockout = KNOCKOUT_STAGES.includes(stage)
  const hasScorePicker = SCORE_PICKER_STAGES.includes(stage)

  const scoreHome = scoreInput?.home ?? ''
  const scoreAway = scoreInput?.away ?? ''
  const [drawPens, setDrawPens] = useState(false)
  const [pensWinner, setPensWinner] = useState(prediction ?? '')

  useEffect(() => {
    if (prediction) setPensWinner(prediction)
  }, [prediction])

  function submitScorePick() {
    if (locked || !onPredict) return
    const hs = scoreHome === '' ? null : Number(scoreHome)
    const as = scoreAway === '' ? null : Number(scoreAway)
    let winner
    if (hs !== null && as !== null) {
      if (hs > as) winner = 'home'
      else if (as > hs) winner = 'away'
      else winner = drawPens ? pensWinner : null
    } else {
      winner = null
    }
    if (!winner) return
    onPredict(match.id, winner, hs, as)
  }

  const canPredict = status === 'upcoming' && !locked
  const actual =
    home_score !== null && away_score !== null
      ? home_score > away_score ? 'home'
        : away_score > home_score ? 'away'
        : 'draw'
      : null

  function pointLabel() {
    if (!prediction || actual === null) return null
    const winPts = STAGE_WIN_POINTS[stage] ?? 2
    let pts = prediction === actual ? winPts : (!isKnockout && (prediction === 'draw' || actual === 'draw')) ? 1 : 0
    let scoreBonus = 0
    if (pts === winPts && hasScorePicker && predScore?.home !== null && predScore?.home !== undefined && predScore?.away !== null && predScore?.away !== undefined) {
      if (Number(predScore.home) === home_score && Number(predScore.away) === away_score) scoreBonus = 100
    }
    const total = pts + scoreBonus
    const color = pts === winPts ? 'text-green-400' : pts === 1 ? 'text-yellow-400' : 'text-red-400'
    return (
      <span className={`text-sm font-bold ${color}`}>
        {total > 0 ? `+${total} pts` : '+0 pts'}
        {scoreBonus > 0 && <span className="text-xs text-yellow-300 ml-1">(+100 exact!)</span>}
      </span>
    )
  }

  if (compact) {
    return (
      <div className="card flex items-center gap-3 py-3">
        <span className={`stage-badge ${stageColor} flex-shrink-0 hidden sm:inline`}>{stage}</span>
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-lg flex-shrink-0">{flag(home_team)}</span>
          <span className="font-bold text-sm truncate">{home_team}</span>
          {status !== 'upcoming' && home_score !== null
            ? <span className="font-black text-fifa-gold text-sm mx-1">{home_score}–{away_score}</span>
            : <span className="text-gray-500 text-xs mx-1">vs</span>
          }
          <span className="font-bold text-sm truncate">{away_team}</span>
          <span className="text-lg flex-shrink-0">{flag(away_team)}</span>
        </div>
        <div className="text-right flex-shrink-0 text-xs text-gray-400 dark:text-gray-500 leading-tight">
          <div>{pst}</div>
          <div>{nl}</div>
        </div>
        {prediction && (
          <div className="flex-shrink-0">
            {pointLabel() || <span className="text-xs font-semibold text-fifa-gold">{prediction === 'home' ? flag(home_team) : prediction === 'away' ? flag(away_team) : '🤝'}</span>}
          </div>
        )}
        {status === 'upcoming' && onPredict && (
          <div className="flex gap-1 flex-shrink-0">
            {[{ val: 'home', label: flag(home_team) }, ...(!isKnockout ? [{ val: 'draw', label: '🤝' }] : []), { val: 'away', label: flag(away_team) }].map(({ val, label }) => (
              <button
                key={val}
                disabled={locked}
                onClick={() => !locked && onPredict(match.id, val)}
                className={`w-8 h-8 rounded-lg border text-sm transition-colors ${
                  prediction === val
                    ? 'bg-fifa-gold text-fifa-dark border-fifa-gold'
                    : locked
                    ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-fifa-gold'
                }`}
              >{label}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="card relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className={`stage-badge ${stageColor}`}>{stage}</span>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          {pointLabel()}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 text-right">
          <div className="text-2xl">{flag(home_team)}</div>
          <div className="font-bold text-sm leading-tight mt-1">{home_team}</div>
        </div>
        <div className="w-20 text-center flex-shrink-0">
          {status !== 'upcoming' && home_score !== null
            ? <div className="text-2xl font-black tracking-widest text-fifa-gold">{home_score} – {away_score}</div>
            : <div className="text-gray-500 font-bold text-sm">VS</div>
          }
        </div>
        <div className="flex-1 text-left">
          <div className="text-2xl">{flag(away_team)}</div>
          <div className="font-bold text-sm leading-tight mt-1">{away_team}</div>
        </div>
      </div>

      <div className="text-center mt-3 text-xs text-gray-500 dark:text-gray-500 space-y-0.5">
        <div>{pst}</div>
        <div className="text-gray-600 dark:text-gray-600">{nl}</div>
        {venue && <div className="hidden sm:block">{venue}</div>}
      </div>

      {status === 'upcoming' && onPredict && hasScorePicker && (
        <div className="mt-4 space-y-3">
          <div className="text-xs text-gray-400 text-center">Predict the score (+100 pts bonus for exact score)</div>
          <div className="flex items-center gap-2 justify-center">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1 truncate max-w-[80px]">{home_team}</div>
              <input
                type="number" min="0" max="20"
                value={scoreHome}
                onChange={e => onScoreChange && onScoreChange(match.id, 'home', e.target.value)}
                disabled={locked}
                className="w-14 text-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg py-2 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-fifa-gold disabled:opacity-50"
              />
            </div>
            <div className="text-gray-500 font-bold mt-4">–</div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1 truncate max-w-[80px]">{away_team}</div>
              <input
                type="number" min="0" max="20"
                value={scoreAway}
                onChange={e => onScoreChange && onScoreChange(match.id, 'away', e.target.value)}
                disabled={locked}
                className="w-14 text-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg py-2 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-fifa-gold disabled:opacity-50"
              />
            </div>
          </div>
          {scoreHome !== '' && scoreAway !== '' && Number(scoreHome) === Number(scoreAway) && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 justify-center text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" checked={drawPens} onChange={e => setDrawPens(e.target.checked)} className="accent-fifa-gold" />
                Draw after 90 min, winner via penalties
              </label>
              {drawPens && (
                <div className="flex gap-2">
                  {[{ val: 'home', label: `🏠 ${home_team}` }, { val: 'away', label: `✈️ ${away_team}` }].map(({ val, label }) => (
                    <button key={val} onClick={() => setPensWinner(val)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${pensWinner === val ? 'bg-fifa-gold text-fifa-dark border-fifa-gold' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-fifa-gold'}`}
                    >{label}</button>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            onClick={submitScorePick}
            disabled={locked || scoreHome === '' || scoreAway === '' || (Number(scoreHome) === Number(scoreAway) && (!drawPens || !pensWinner))}
            className={`w-full py-2 rounded-lg border text-xs font-bold transition-colors ${prediction ? 'bg-fifa-gold text-fifa-dark border-fifa-gold' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-fifa-gold'} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {prediction ? `✓ Pick saved (${flag(prediction === 'home' ? home_team : away_team)} wins)` : 'Save Pick'}
          </button>
        </div>
      )}

      {status === 'upcoming' && onPredict && !hasScorePicker && (
        <div className="mt-4 flex gap-2 text-xs font-semibold">
          {[
            { val: 'home', label: `🏠 ${home_team}` },
            ...(!isKnockout ? [{ val: 'draw', label: '🤝 Draw' }] : []),
            { val: 'away', label: `✈️ ${away_team}` },
          ].map(({ val, label }) => {
            const selected = prediction === val
            const disabled = locked || !onPredict
            return (
              <button
                key={val}
                disabled={disabled}
                onClick={() => !disabled && onPredict(match.id, val)}
                className={`flex-1 py-2 px-1 rounded-lg border transition-colors truncate ${
                  selected
                    ? 'bg-fifa-gold text-fifa-dark border-fifa-gold font-bold'
                    : disabled
                    ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-fifa-gold hover:text-gray-900 dark:hover:text-white'
                }`}
              >{label}</button>
            )
          })}
        </div>
      )}

      {locked && status === 'upcoming' && prediction && (
        <div className="mt-3 text-center text-xs text-yellow-500">
          🔒 Pick locked in{hasScorePicker && predScore?.home !== undefined ? ` · ${predScore.home}–${predScore.away}` : ''}
        </div>
      )}
    </div>
  )
}
