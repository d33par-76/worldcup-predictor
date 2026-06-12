import { FLAG_EMOJI, STAGE_COLORS } from '../data/schedule'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  })
}

function flag(team) {
  return FLAG_EMOJI[team] ?? '🏳️'
}

function StatusBadge({ status }) {
  if (status === 'live') return <span className="text-xs font-bold text-red-400 animate-pulse">● LIVE</span>
  if (status === 'finished') return <span className="text-xs text-gray-500">Final</span>
  return null
}

export default function MatchCard({ match, prediction, onPredict, locked }) {
  const { home_team, away_team, match_date, venue, home_score, away_score, stage, status } = match
  const stageColor = STAGE_COLORS[stage] ?? 'bg-gray-800 text-gray-300'

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

  return (
    <div className="card relative overflow-hidden">
      {/* Stage badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`stage-badge ${stageColor}`}>{stage}</span>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          {pointLabel()}
        </div>
      </div>

      {/* Teams row */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex-1 text-right">
          <div className="text-2xl">{flag(home_team)}</div>
          <div className="font-bold text-sm leading-tight mt-1">{home_team}</div>
        </div>

        {/* Score / VS */}
        <div className="w-20 text-center flex-shrink-0">
          {status !== 'upcoming' && home_score !== null ? (
            <div className="text-2xl font-black tracking-widest text-fifa-gold">
              {home_score} – {away_score}
            </div>
          ) : (
            <div className="text-gray-500 font-bold text-sm">VS</div>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 text-left">
          <div className="text-2xl">{flag(away_team)}</div>
          <div className="font-bold text-sm leading-tight mt-1">{away_team}</div>
        </div>
      </div>

      {/* Venue / date */}
      <div className="text-center mt-3 text-xs text-gray-500">
        <div>{formatDate(match_date)}</div>
        <div>{venue}</div>
      </div>

      {/* Prediction buttons */}
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
              >
                {label}
              </button>
            )
          })}
        </div>
      )}

      {locked && status === 'upcoming' && prediction && (
        <div className="mt-3 text-center text-xs text-yellow-500">
          🔒 Pick locked in — match has started
        </div>
      )}
    </div>
  )
}
