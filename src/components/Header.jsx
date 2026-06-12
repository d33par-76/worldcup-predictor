import { Link, useLocation } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Schedule' },
  { to: '/predict', label: 'My Picks' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export default function Header({ userName }) {
  const { pathname } = useLocation()
  return (
    <header className="bg-fifa-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
          <span className="text-2xl">🏆</span>
          <span className="text-white">WC <span className="text-fifa-gold">2026</span></span>
        </Link>
        <nav className="flex gap-1 text-sm font-semibold">
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
