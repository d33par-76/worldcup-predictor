import { useEffect, useRef, useState } from 'react'
import { getMatches } from '../lib/store'
import { GROUPS } from '../data/schedule'
import MatchCard from '../components/MatchCard'
import { useAppContext } from '../lib/context'

const GROUP_NAMES = Object.keys(GROUPS).map(g => `Group ${g}`)

export default function Schedule() {
  const { compact, refreshKey } = useAppContext()
  const [matches, setMatches] = useState([])
  const [filter, setFilter] = useState('upcoming') // 'upcoming' | 'completed' | group name
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [groupOpen, setGroupOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    getMatches().then(m => { setMatches(m); setLoading(false) })
  }, [refreshKey])

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setGroupOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const query = search.trim().toLowerCase()

  const baseMatches =
    filter === 'upcoming'
      ? matches.filter(m => m.status === 'upcoming' || m.status === 'live')
      : filter === 'completed'
      ? matches.filter(m => m.status === 'finished')
      : matches.filter(m => {
          const groupLetter = filter.replace('Group ', '')
          const groupTeams = GROUPS[groupLetter] || []
          return groupTeams.includes(m.home_team) || groupTeams.includes(m.away_team)
        })

  const filtered = query
    ? baseMatches.filter(m =>
        m.home_team.toLowerCase().includes(query) ||
        m.away_team.toLowerCase().includes(query)
      )
    : baseMatches

  // Sort by match date
  const sorted = [...filtered].sort((a, b) => new Date(a.match_date) - new Date(b.match_date))

  const activeGroup = GROUP_NAMES.includes(filter) ? filter : null

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

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          ['upcoming', `Upcoming (${matches.filter(m => m.status === 'upcoming' || m.status === 'live').length})`],
          ['completed', `Completed (${matches.filter(m => m.status === 'finished').length})`],
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setFilter(val); setGroupOpen(false) }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === val
                ? 'bg-fifa-gold text-fifa-dark'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >{label}</button>
        ))}

        {/* Groups dropdown */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => setGroupOpen(o => !o)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              activeGroup
                ? 'bg-fifa-gold text-fifa-dark'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {activeGroup || 'Groups'}
            <svg className={`w-3.5 h-3.5 transition-transform ${groupOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {groupOpen && (
            <div className="absolute top-full left-0 mt-1 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 py-1 min-w-[130px]">
              {GROUP_NAMES.map(g => (
                <button
                  key={g}
                  onClick={() => { setFilter(g); setGroupOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                    filter === g ? 'text-fifa-gold font-bold' : 'text-gray-300'
                  }`}
                >{g}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && <div className="text-center text-gray-400 py-12">Loading schedule…</div>}

      {!loading && sorted.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No matches found{query ? ` for "${search}"` : ''}.
        </div>
      )}

      {!loading && (
        <div className={compact ? 'flex flex-col gap-2' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
          {sorted.map(m => (
            <MatchCard key={m.id} match={m} compact={compact} />
          ))}
        </div>
      )}
    </div>
  )
}
