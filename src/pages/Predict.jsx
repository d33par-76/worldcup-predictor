import { useEffect, useState } from 'react'
import { getMatches, getPredictions, savePrediction } from '../lib/store'
import { STAGE_ORDER } from '../data/schedule'
import MatchCard from '../components/MatchCard'
import { useAppContext } from '../lib/context'

function isMatchLocked(match) {
  if (match.status !== 'upcoming') return true
  return new Date(match.match_date) <= new Date()
}

export default function Predict({ userName, onSetName }) {
  const { compact } = useAppContext()
  const [nameInput, setNameInput] = useState('')
  const [matches, setMatches] = useState([])
  const [predictions, setPredictions] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('upcoming')

  useEffect(() => {
    if (!userName) return
    Promise.all([getMatches(), getPredictions(userName)]).then(([m, p]) => {
      setMatches(m)
      const map = {}
      for (const pred of p) map[pred.match_id] = pred.predicted_winner
      setPredictions(map)
      setLoading(false)
    })
  }, [userName])

  async function handlePredict(matchId, winner) {
    if (!userName) return
    const prev = predictions[matchId]
    setPredictions(p => ({ ...p, [matchId]: winner }))
    try {
      await savePrediction(userName, matchId, winner)
    } catch {
      setPredictions(p => ({ ...p, [matchId]: prev }))
    }
  }

  if (!userName) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-black mb-2">Join the Prediction Game</h2>
        <p className="text-gray-400 mb-8 text-sm">
          Enter your name to start predicting match outcomes and climb the leaderboard.
          <br />No account needed.
        </p>
        <form onSubmit={e => { e.preventDefault(); if (nameInput.trim()) onSetName(nameInput.trim()) }}>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fifa-gold mb-3"
          />
          <button type="submit" className="btn-primary w-full py-3 text-base" disabled={!nameInput.trim()}>
            Let's Go →
          </button>
        </form>
      </div>
    )
  }

  const now = new Date()
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

  const upcoming = matches.filter(m => m.status === 'upcoming' && new Date(m.match_date) >= now && new Date(m.match_date) <= in3Days)
  const allUpcoming = matches.filter(m => m.status === 'upcoming')
  const finished = matches.filter(m => m.status === 'finished')
  const live = matches.filter(m => m.status === 'live')

  const displayMatches =
    filter === 'all' ? matches
    : filter === 'upcoming' ? upcoming
    : filter === 'live' ? live
    : finished

  const totalPoints = Object.entries(predictions).reduce((sum, [matchId, winner]) => {
    const m = matches.find(m => m.id === Number(matchId))
    if (!m || m.home_score === null) return sum
    const actual = m.home_score > m.away_score ? 'home' : m.away_score > m.home_score ? 'away' : 'draw'
    return sum + (winner === actual ? 2 : (winner === 'draw' || actual === 'draw') ? 1 : 0)
  }, 0)

  const pickedCount = Object.keys(predictions).length

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="card flex-1 min-w-[120px] text-center">
          <div className="text-3xl font-black text-fifa-gold">{totalPoints}</div>
          <div className="text-xs text-gray-400 mt-1">Total Points</div>
        </div>
        <div className="card flex-1 min-w-[120px] text-center">
          <div className="text-3xl font-black text-white">{pickedCount}</div>
          <div className="text-xs text-gray-400 mt-1">Picks Made</div>
        </div>
        <div className="card flex-1 min-w-[120px] text-center">
          <div className="text-3xl font-black text-white">{allUpcoming.length}</div>
          <div className="text-xs text-gray-400 mt-1">Upcoming</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          ['all', `All (${matches.length})`],
          ['upcoming', `Upcoming (${upcoming.length})`],
          ['live', `Live (${live.length})`],
          ['finished', `Finished (${finished.length})`],
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === val ? 'bg-fifa-gold text-fifa-dark' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <div className="text-center text-gray-400 py-12">Loading…</div>}

      {!loading && displayMatches.length === 0 && (
        <div className="text-center text-gray-500 py-12">No matches in this category.</div>
      )}

      {!loading && (
        <div className={compact ? 'flex flex-col gap-2' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
          {displayMatches.map(m => (
            <MatchCard
              key={m.id}
              match={m}
              prediction={predictions[m.id]}
              onPredict={handlePredict}
              locked={isMatchLocked(m)}
              compact={compact}
            />
          ))}
        </div>
      )}
    </div>
  )
}
