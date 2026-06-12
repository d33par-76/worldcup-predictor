import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Schedule from './pages/Schedule'
import Predict from './pages/Predict'
import Leaderboard from './pages/Leaderboard'
import Admin from './pages/Admin'
import { isConfigured } from './lib/supabase'
import { AppContext } from './lib/context'

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('wc2026_user') || '')
  const [theme, setTheme] = useState(() => localStorage.getItem('wc2026_theme') || 'dark')
  const [compact, setCompact] = useState(() => localStorage.getItem('wc2026_compact') === 'true')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      document.body.classList.remove('bg-gray-950', 'text-white')
      document.body.classList.add('bg-gray-50', 'text-gray-900')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      document.body.classList.remove('bg-gray-50', 'text-gray-900')
      document.body.classList.add('bg-gray-950', 'text-white')
    }
    localStorage.setItem('wc2026_theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('wc2026_compact', compact)
  }, [compact])

  function handleSetName(name) {
    localStorage.setItem('wc2026_user', name)
    setUserName(name)
  }

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppContext.Provider value={{ compact, setCompact, theme, toggleTheme }}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
          {!isConfigured && (
            <div className="bg-yellow-900/50 dark:bg-yellow-900/50 border-b border-yellow-700 text-yellow-200 text-xs text-center py-1.5 px-4">
              ⚠️ Running in <strong>demo mode</strong> (localStorage) — add Supabase credentials to go live.
            </div>
          )}
          <Header userName={userName} onSetName={handleSetName} />
          <main>
            <Routes>
              <Route path="/" element={<Schedule />} />
              <Route path="/predict" element={<Predict userName={userName} onSetName={handleSetName} />} />
              <Route path="/leaderboard" element={<Leaderboard userName={userName} />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
