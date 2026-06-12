import { useEffect, useState } from 'react'
import { getLeaderboard } from '../lib/store'

const MEDAL = ['🥇', '🥈', '🥉']

export default function Leaderboard({ userName }) {
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard().then(b => { setBoard(b); setLoading(false) })
    const interval = setInterval(() => {
      getLeaderboard().then(setBoard)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-1">Leaderboard</h1>
      <p className="text-gray-400 text-sm mb-6">Updates as results come in · 2 pts correct · 1 pt draw · 0 pts wrong</p>

      {loading && <div className="text-center text-gray-400 py-12">Loading…</div>}

      {!loading && board.length === 0 && (
        <div className="card text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🏁</div>
          No predictions yet — be the first to pick!
        </div>
      )}

      {!loading && board.length > 0 && (
        <div className="space-y-2">
          {board.map((entry, i) => {
            const isMe = entry.user_name === userName
            return (
              <div
                key={entry.user_name}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 border transition-colors ${
                  isMe
                    ? 'bg-fifa-blue/30 border-fifa-blue text-white'
                    : 'bg-gray-900 border-gray-800 text-gray-200'
                }`}
              >
                {/* Rank */}
                <div className="w-8 text-center font-black text-lg flex-shrink-0">
                  {i < 3 ? MEDAL[i] : <span className="text-gray-500 text-sm">{i + 1}</span>}
                </div>

                {/* Name */}
                <div className="flex-1 font-semibold">
                  {entry.user_name}
                  {isMe && <span className="ml-2 text-xs text-fifa-gold font-bold">YOU</span>}
                </div>

                {/* Stats */}
                <div className="text-right text-sm text-gray-400">
                  <span className="text-white font-bold text-lg">{entry.total}</span>
                  <span className="ml-1">pts</span>
                </div>
                <div className="text-right text-xs text-gray-500 w-16">
                  <div>{entry.correct} correct</div>
                  <div>{entry.total_picks} graded</div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="text-center text-xs text-gray-600 mt-6">Refreshes every 30 seconds</p>
    </div>
  )
}
