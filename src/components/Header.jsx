import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../lib/context'

const nav = [
  { to: '/', label: 'Schedule' },
  { to: '/predict', label: 'My Picks' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export default function Header({ userName }) {
  const { pathname } = useLocation()
  const { compact, setCompact, theme, toggleTheme } = useAppContext()

  return (
    <header className="bg-fifa-dark border-b border-gray-800 dark:border-gray-800 sticky top-0 z-50">
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
                  ? 'bg-fifa-gold text-fifa-dark'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
              : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
          }`}
        >
          {compact ? '⊞ Full' : '☰ Compact'}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="px-2 py-1.5 rounded-lg text-sm border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-colors"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {userName && (
        <div className="bg-fifa-blue/20 border-t border-fifa-blue/30 text-center text-xs text-blue-300 py-1">
          Playing as <span className="font-bold text-white">{userName}</span>
          &nbsp;·&nbsp;
          <button
            className="underline hover:text-white"
            onClick={() => { localStorage.removeItem('wc2026_user'); window.location.reload() }}
          >
            Change name
          </button>
        </div>
      )}
    </header>
  )
}
