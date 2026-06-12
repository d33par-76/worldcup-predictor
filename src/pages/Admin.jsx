import { useEffect, useState } from 'react'
import { getMatches, updateMatchResult, updateMatchTeams } from '../lib/store'
import { STAGE_ORDER } from '../data/schedule'

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '2026'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [matches, setMatches] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [stageFilter, setStageFilter] = useState('all')

  useEffect(() => {
    if (authed) getMatches().then(setMatches)
  }, [authed])

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h2 className="text-xl font-black mb-6">Admin Panel</h2>
        <form onSubmit={e => { e.preventDefault(); if (pin === ADMIN_PIN) setAuthed(true) }}>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Enter admin PIN"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fifa-gold mb-3"
          />
          <button type="submit" className="btn-primary w-full py-3">Enter</button>
        </form>
        <p className="text-xs text-gray-600 mt-4">Default PIN: 2026 — set VITE_ADMIN_PIN to change</p>
      </div>
    )
  }

  const stages = ['all', ...STAGE_ORDER.filter(s => matches.some(m => m.stage === s))]
  const filtered = stageFilter === 'all' ? matches : matches.filter(m => m.stage === stageFilter)

  function startEdit(m) {
    setEditing(m.id)
    setForm({
      home_team: m.home_team,
      away_team: m.away_team,
      home_score: m.home_score ?? '',
      away_score: m.away_score ?? '',
      status: m.status,
    })
  }

  async function saveResult() {
    setSaving(true)
    setMsg('')
    try {
      const hs = form.home_score === '' ? null : Number(form.home_score)
      const as = form.away_score === '' ? null : Number(form.away_score)
      await updateMatchResult(editing, hs, as, form.status)
      await updateMatchTeams(editing, form.home_team, form.away_team)
      const updated = await getMatches()
      setMatches(updated)
      setEditing(null)
      setMsg('✅ Saved!')
    } catch (e) {
      setMsg('❌ Error: ' + e.message)
    }
    setSaving(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-black mb-1">Admin Panel</h1>
      <p className="text-gray-400 text-sm mb-5">Update match results, team names, and statuses</p>
      {msg && <div className="mb-4 text-sm font-semibold text-center">{msg}</div>}

      {/* Stage filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {stages.map(s => (
          <button key={s} onClick={() => setStageFilter(s)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border transition-colors ${stageFilter === s ? 'bg-fifa-gold text-fifa-dark border-fifa-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(m => (
          <div key={m.id} className="card">
            {editing === m.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Home Team</label>
                    <input value={form.home_team} onChange={e => setForm(f => ({ ...f, home_team: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Away Team</label>
                    <input value={form.away_team} onChange={e => setForm(f => ({ ...f, away_team: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Home Score</label>
                    <input type="number" min="0" value={form.home_score} onChange={e => setForm(f => ({ ...f, home_score: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Away Score</label>
                    <input type="number" min="0" value={form.away_score} onChange={e => setForm(f => ({ ...f, away_score: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm text-white">
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="finished">Finished</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={saveResult} disabled={saving} className="btn-primary text-sm py-1.5 px-4">
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button onClick={() => setEditing(null)} className="btn-secondary text-sm py-1.5 px-4">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500 w-16 flex-shrink-0">{m.stage}</div>
                <div className="flex-1 font-semibold text-sm">
                  {m.home_team} {m.home_score !== null ? `${m.home_score}–${m.away_score}` : 'vs'} {m.away_team}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  m.status === 'live' ? 'bg-red-900 text-red-300'
                  : m.status === 'finished' ? 'bg-green-900 text-green-300'
                  : 'bg-gray-800 text-gray-400'}`}>{m.status}</span>
                <button onClick={() => startEdit(m)} className="text-xs text-fifa-gold hover:underline ml-2">Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
