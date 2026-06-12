import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../lib/context'

const nav = [
  { to: '/', label: 'Schedule' },
  { to: '/predict', label: 'My Picks' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export default function Header({ userName, onSetName }) {
  const { pathname } = useLocation()
  const { compact, setCompact, theme, toggleTheme } = useAppContext()
  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(userName)

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
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight mr-2">
          <span className="text-2xl">🏆</span>
          <span className="text-white">WC <span className="text-fifa-gold">2026</span></span>
        </Link>

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

        {/* Compact toggle */}
        <button
          onClick={() => setCompact(c => !c)}
          title={compact ? 'Switch to full view' : 'Switch to compact view'}
          className={`px-2 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
            compact
              ? 'bg-fifa-gold text-fifa-dark border-fifa-gold'
              : 'border-white/20 text-gray-300 hover:border-fifa-teal hover:text-white'
          }`}
        >
          {compact ? '⊞ Full' : '☰ Compact'}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="px-2 py-1.5 rounded-lg text-sm border border-white/20 text-gray-300 hover:border-white/40 hover:text-white transition-colors"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

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
