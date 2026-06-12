import { useEffect, useState } from 'react'
import { getMatches } from '../lib/store'
import { STAGE_ORDER } from '../data/schedule'
import MatchCard from '../components/MatchCard'
import { useAppContext } from '../lib/context'

export default function Schedule() {
  const { compact } = useAppContext()
  const [matches, setMatches] = useState([])
  const [activeStage, setActiveStage] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMatches().then(m => { setMatches(m); setLoading(false) })
  }, [])

  const stages = ['all', ...STAGE_ORDER.filter(s => matches.some(m => m.stage === s))]

  const filtered = activeStage === 'all'
    ? matches
    : matches.filter(m => m.stage === activeStage)

  const grouped = {}
  for (const m of filtered) {
    if (!grouped[m.stage]) grouped[m.stage] = []
    grouped[m.stage].push(m)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-1">Full Match Schedule</h1>
      <p className="text-gray-400 text-sm mb-5">2026 FIFA World Cup · USA, Canada & Mexico</p>

      {/* Stage filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {stages.map(s => (
          <button
            key={s}
            onClick={() => setActiveStage(s)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              activeStage === s
                ? 'bg-fifa-gold text-fifa-dark border-fifa-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
          >
            {s === 'all' ? 'All Matches' : s}
          </button>
        ))}
      </div>

      {loading && <div className="text-center text-gray-400 py-12">Loading schedule…</div>}

      {!loading && Object.entries(grouped)
        .sort(([a], [b]) => STAGE_ORDER.indexOf(a) - STAGE_ORDER.indexOf(b))
        .map(([stage, stageMatches]) => (
          <div key={stage} className="mb-8">
            <h2 className="text-lg font-bold text-fifa-gold mb-3">{stage}</h2>
            <div className={compact ? 'flex flex-col gap-2' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
              {stageMatches.map(m => (
                <MatchCard key={m.id} match={m} compact={compact} />
              ))}
            </div>
          </div>
        ))
      }
    </div>
  )
}
