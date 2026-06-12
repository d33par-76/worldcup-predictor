import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Schedule from './pages/Schedule'
import Predict from './pages/Predict'
import Leaderboard from './pages/Leaderboard'
import Admin from './pages/Admin'
import { isConfigured } from './lib/supabase'

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('wc2026_user') || '')

  function handleSetName(name) {
    localStorage.setItem('wc2026_user', name)
    setUserName(name)
  }

  return (
    <BrowserRouter>
      {!isConfigured && (
        <div className="bg-yellow-900/50 border-b border-yellow-700 text-yellow-200 text-xs text-center py-1.5 px-4">
          ⚠️ Running in <strong>demo mode</strong> (localStorage) — add Supabase credentials to go live. See README for setup.
        </div>
      )}
      <Header userName={userName} />
      <main>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/predict" element={<Predict userName={userName} onSetName={handleSetName} />} />
          <Route path="/leaderboard" element={<Leaderboard userName={userName} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
