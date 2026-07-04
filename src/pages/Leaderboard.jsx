import { useEffect, useState } from 'react'
import { getLeaderboard, getPredictions, getMatches } from '../lib/store'

const MEDAL = ['🥇', '🥈', '🥉']

function adjScore(entry) {
  if (!entry.total_picks) return 0
  return entry.total / entry.total_picks
}

function resultLabel(match, predicted) {
  if (match.home_score === null) return { text: predicted === 'home' ? match.home_team : predicted === 'away' ? match.away_team : 'Draw', color: 'text-gray-400', icon: '⏳' }
  const actual = match.home_score > match.away_score ? 'home' : match.away_score > match.home_score ? 'away' : 'draw'
  const correct = predicted === actual
  const partial = !correct && (predicted === 'draw' || actual === 'draw')
  const label = predicted === 'home' ? match.home_team : predicted === 'away' ? match.away_team : 'Draw'
  if (correct) return { text: label, color: 'text-green-400', icon: '✓' }
  if (partial) return { text: label, color: 'text-yellow-400', icon: '~' }
  return { text: label, color: 'text-red-400', icon: '✗' }
}

export default function Leaderboard({ userName }) {
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('original')
  const [selectedUser, setSelectedUser] = useState(null)
  const [userPicks, setUserPicks] = useState([])
  const [matches, setMatches] = useState([])
  const [picksLoading, setPicksLoading] = useState(false)

  useEffect(() => {
    Promise.all([getLeaderboard(), getMatches()]).then(([b, m]) => {
      setBoard(b)
      setMatches(m)
      setLoading(false)
    })
    const interval = setInterval(() => {
      getLeaderboard().then(setBoard)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  async function handleSelectUser(name) {
    if (selectedUser === name) { setSelectedUser(null); return }
    setSelectedUser(name)
    setPicksLoading(true)
    const preds = await getPredictions(name)
    setUserPicks(preds)
    setPicksLoading(false)
  }

  const sorted = [...board].sort((a, b) =>
    mode === 'adjusted'
      ? adjScore(b) - adjScore(a) || b.total - a.total
      : b.total - a.total || b.correct - a.correct
  )

  const picksMap = Object.fromEntries(userPicks.map(p => [p.match_id, p.predicted_winner]))
  const pickedMatches = matches.filter(m => picksMap[m.id]).sort((a, b) => new Date(b.match_date) - new Date(a.match_date))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-1">Leaderboard</h1>
      <p className="text-gray-400 text-sm mb-4">Updates as results come in · 2 pts correct · 1 pt draw · 0 pts wrong</p>

      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        {['original', 'adjusted'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              mode === m
                ? 'bg-fifa-gold text-fifa-dark border-fifa-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
          >
            {m === 'original' ? 'Original' : 'Adjusted'}
          </button>
        ))}
        {mode === 'adjusted' && (
          <span className="text-xs text-gray-500 self-center ml-1">points per graded pick</span>
        )}
      </div>

      {loading && <div className="text-center text-gray-400 py-12">Loading…</div>}

      {!loading && board.length === 0 && (
        <div className="card text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🏁</div>
          No predictions yet — be the first to pick!
        </div>
      )}

      {!loading && sorted.length > 0 && (
        <div className="space-y-2">
          {sorted.map((entry, i) => {
            const isMe = entry.user_name === userName
            const isOpen = selectedUser === entry.user_name
            return (
              <div key={entry.user_name}>
                {/* Row */}
                <button
                  onClick={() => handleSelectUser(entry.user_name)}
                  className={`w-full flex items-center gap-4 rounded-xl px-4 py-3 border transition-colors text-left ${
                    isOpen
                      ? 'bg-gray-800 border-fifa-gold rounded-b-none border-b-0'
                      : isMe
                      ? 'bg-fifa-blue/30 border-fifa-blue text-white hover:bg-fifa-blue/40'
                      : 'bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <div className="w-8 text-center font-black text-lg flex-shrink-0">
                    {i < 3 ? MEDAL[i] : <span className="text-gray-500 text-sm">{i + 1}</span>}
                  </div>
                  <div className="flex-1 font-semibold">
                    {entry.user_name}
                    {isMe && <span className="ml-2 text-xs text-fifa-gold font-bold">YOU</span>}
                  </div>
                  {mode === 'adjusted' ? (
                    <div className="text-right text-sm text-gray-400">
                      <span className="text-white font-bold text-lg">{adjScore(entry).toFixed(2)}</span>
                      <span className="ml-1">avg</span>
                      <div className="text-xs text-gray-500">{entry.total_picks} graded</div>
                    </div>
                  ) : (
                    <div className="text-right text-sm text-gray-400">
                      <span className="text-white font-bold text-lg">{entry.total}</span>
                      <span className="ml-1">pts</span>
                    </div>
                  )}
                  <div className="text-right text-xs text-gray-500 w-16">
                    <div>{entry.correct} correct</div>
                    <div>{entry.total_picks} graded</div>
                  </div>
                  <div className="text-gray-500 text-xs ml-1">{isOpen ? '▲' : '▼'}</div>
                </button>

                {/* Expanded picks */}
                {isOpen && (
                  <div className="border border-fifa-gold border-t-0 rounded-b-xl bg-gray-800/80 px-4 py-3">
                    {picksLoading ? (
                      <div className="text-center text-gray-400 py-4 text-sm">Loading picks…</div>
                    ) : pickedMatches.length === 0 ? (
                      <div className="text-center text-gray-500 py-4 text-sm">No picks made yet.</div>
                    ) : (
                      <div className="space-y-1.5">
                        {pickedMatches.map(m => {
                          const predicted = picksMap[m.id]
                          const { text, color, icon } = resultLabel(m, predicted)
                          return (
                            <div key={m.id} className="flex items-center gap-2 text-xs">
                              <span className={`font-bold w-4 text-center ${color}`}>{icon}</span>
                              <span className="text-gray-400 flex-1">{m.home_team} vs {m.away_team}</span>
                              <span className="text-gray-500">
                                {m.home_score !== null ? `${m.home_score}–${m.away_score}` : 'upcoming'}
                              </span>
                              <span className={`font-semibold w-24 text-right ${color}`}>{text}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <p className="text-center text-xs text-gray-600 mt-6">Refreshes every 30 seconds</p>
    </div>
  )
}
