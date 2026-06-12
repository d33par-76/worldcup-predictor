import { useEffect, useState } from 'react'
import { getMatches } from '../lib/store'
import { STAGE_ORDER } from '../data/schedule'
import MatchCard from '../components/MatchCard'
import { useAppContext } from '../lib/context'

export default function Schedule() {
  const { compact, refreshKey } = useAppContext()
  const [matches, setMatches] = useState([])
  const [activeStage, setActiveStage] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMatches().then(m => { setMatches(m); setLoading(false) })
  }, [refreshKey])

  const query = search.trim().toLowerCase()

  const stageFiltered = activeStage === 'all'
    ? matches
    : matches.filter(m => m.stage === activeStage)

  const filtered = query
    ? stageFiltered.filter(m =>
        m.home_team.toLowerCase().includes(query) ||
        m.away_team.toLowerCase().includes(query)
      )
    : stageFiltered

  const stages = ['all', ...STAGE_ORDER.filter(s => matches.some(m => m.stage === s))]

  const grouped = {}
  for (const m of filtered) {
    if (!grouped[m.stage]) grouped[m.stage] = []
    grouped[m.stage].push(m)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-1">Full Match Schedule</h1>
      <p className="text-gray-400 text-sm mb-5">2026 FIFA World Cup · USA, Canada & Mexico</p>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search country…"
          className="w-full bg-gray-800 dark:bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-8 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fifa-teal"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
          >✕</button>
        )}
      </div>

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

      {!loading && filtered.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No matches found{query ? ` for "${search}"` : ''}.
        </div>
      )}

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
