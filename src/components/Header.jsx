import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../lib/context'
import { refreshFromApi } from '../lib/store'

const nav = [
  { to: '/', label: 'Schedule' },
  { to: '/predict', label: 'My Picks' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export default function Header({ userName, onSetName }) {
  const { pathname } = useLocation()
  const { compact, setCompact, theme, toggleTheme, triggerRefresh } = useAppContext()
  const [editing, setEditing] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshMsg, setRefreshMsg] = useState(null)

  async function handleRefresh() {
    setMenuOpen(false)
    setRefreshing(true)
    setRefreshMsg(null)
    try {
      const { updated } = await refreshFromApi()
      setRefreshMsg(updated > 0 ? `✓ ${updated} score${updated !== 1 ? 's' : ''} updated` : '✓ Already up to date')
      triggerRefresh()
    } catch {
      setRefreshMsg('⚠ Could not reach score API')
    } finally {
      setRefreshing(false)
      setTimeout(() => setRefreshMsg(null), 3000)
    }
  }
  const [nameInput, setNameInput] = useState(userName)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function submitRename(e) {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    onSetName(trimmed)
    setEditing(false)
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo opens more menu */}
        <div className="relative mr-2" ref={menuRef}>
          <button onClick={() => setMenuOpen(o => !o)} className="rounded-full focus:outline-none">
            <img src="/logo.png" alt="La Dee Du WC26" className="h-10 w-10 rounded-full object-cover" />
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-full mt-2 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
              <button
                onClick={() => { setCompact(c => !c); setMenuOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
              >
                <span>{compact ? '⊞' : '☰'}</span>
                <span>{compact ? 'Full view' : 'Compact view'}</span>
              </button>
              <div className="border-t border-gray-800" />
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
              >
                <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
              </button>
              <div className="border-t border-gray-800" />
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
                <span>{refreshing ? 'Refreshing…' : 'Refresh scores'}</span>
              </button>
            </div>
          )}
        </div>

        <nav className="flex gap-1 text-sm font-semibold flex-1">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === to
                  ? 'nav-active'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {refreshMsg && (
        <div className="bg-black/30 text-center text-xs text-white/80 py-1">{refreshMsg}</div>
      )}

      {userName && (
        <div className="bg-black/20 border-t border-white/10 text-center text-xs text-white/70 py-1.5">
          {editing ? (
            <form onSubmit={submitRename} className="inline-flex items-center gap-2">
              <span className="text-white/60">Playing as</span>
              <input
                autoFocus
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                maxLength={30}
                className="bg-white/10 border border-white/30 rounded px-2 py-0.5 text-white text-xs w-32 focus:outline-none focus:border-white/60"
              />
              <button type="submit" className="text-fifa-gold font-bold hover:text-white">Save</button>
              <button type="button" onClick={() => { setEditing(false); setNameInput(userName) }} className="text-white/50 hover:text-white">Cancel</button>
            </form>
          ) : (
            <>
              Playing as <span className="font-bold text-white">{userName}</span>
              &nbsp;·&nbsp;
              <button
                className="underline hover:text-white"
                onClick={() => { setNameInput(userName); setEditing(true) }}
              >
                Change name
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}
