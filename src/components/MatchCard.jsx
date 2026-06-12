import { FLAG_EMOJI, STAGE_COLORS } from '../data/schedule'

function formatTimes(iso) {
  const d = new Date(iso)
  const pst = d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  })
  const nl = d.toLocaleString('en-US', {
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
    timeZoneName: 'short',
  })
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

export default function MatchCard({ match, prediction, onPredict, locked, compact }) {
  const { home_team, away_team, match_date, venue, home_score, away_score, stage, status } = match
  const stageColor = STAGE_COLORS[stage] ?? 'bg-gray-800 text-gray-300'
  const { pst, nl } = formatTimes(match_date)

  const canPredict = status === 'upcoming' && !locked
  const actual =
    home_score !== null && away_score !== null
      ? home_score > away_score ? 'home'
        : away_score > home_score ? 'away'
        : 'draw'
      : null

  function pointLabel() {
    if (!prediction || actual === null) return null
    const pts = prediction === actual ? 2 : (prediction === 'draw' || actual === 'draw') ? 1 : 0
    const colors = { 2: 'text-green-400', 1: 'text-yellow-400', 0: 'text-red-400' }
    return <span className={`text-sm font-bold ${colors[pts]}`}>{pts === 2 ? '+2 pts' : pts === 1 ? '+1 pt' : '+0 pts'}</span>
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
            {[{ val: 'home', label: flag(home_team) }, { val: 'draw', label: '🤝' }, { val: 'away', label: flag(away_team) }].map(({ val, label }) => (
              <button
                key={val}
                disabled={locked}
                onClick={() => !locked && onPredict(match.id, val)}
                className={`w-8 h-8 rounded-lg border text-sm transition-colors ${
                  prediction === val
                    ? 'bg-fifa-gold text-fifa-dark border-fifa-gold'
                    : locked
                    ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 border-gray-700 hover:border-fifa-gold'
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
        <div className="text-gray-600 dark:text-gray-600">{nl} (Netherlands)</div>
        {venue && <div className="hidden sm:block">{venue}</div>}
      </div>

      {status === 'upcoming' && (
        <div className="mt-4 flex gap-2 text-xs font-semibold">
          {[
            { val: 'home', label: `🏠 ${home_team}` },
            { val: 'draw', label: '🤝 Draw' },
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
                    ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-fifa-gold hover:text-white'
                }`}
              >{label}</button>
            )
          })}
        </div>
      )}

      {locked && status === 'upcoming' && prediction && (
        <div className="mt-3 text-center text-xs text-yellow-500">🔒 Pick locked in</div>
      )}
    </div>
  )
}
