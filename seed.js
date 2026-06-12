import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wnsudgqvtzvsmlnolafq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_91EKHPkroPKWKGKkX6Ywjg_c-fwQV8C'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Venues ───────────────────────────────────────────────────────────────────
const USA_VENUES = [
  'MetLife Stadium, New Jersey',
  'SoFi Stadium, Los Angeles',
  'AT&T Stadium, Dallas',
  "Levi's Stadium, San Francisco",
  'Lumen Field, Seattle',
  'Gillette Stadium, Boston',
  'Hard Rock Stadium, Miami',
  'Mercedes-Benz Stadium, Atlanta',
  'Arrowhead Stadium, Kansas City',
  'Lincoln Financial Field, Philadelphia',
]
const CANADA_VENUES = ['BMO Field, Toronto', 'BC Place, Vancouver']
const MEXICO_VENUES = ['Estadio Azteca, Mexico City', 'Estadio Akron, Guadalajara', 'Estadio BBVA, Monterrey']
const ALL_VENUES = [...USA_VENUES, ...CANADA_VENUES, ...MEXICO_VENUES]
let venueIdx = 0
function getVenue() {
  return ALL_VENUES[venueIdx++ % ALL_VENUES.length]
}

// ── Groups ───────────────────────────────────────────────────────────────────
const GROUPS = {
  A: ['USA', 'Bolivia', 'Panama', 'Morocco'],
  B: ['Colombia', 'Ecuador', 'South Korea', 'Cameroon'],
  C: ['Mexico', 'Jamaica', 'Venezuela', 'Senegal'],
  D: ['France', 'Tunisia', 'Japan', 'Paraguay'],
  E: ['Germany', 'South Africa', 'New Zealand', 'Chile'],
  F: ['Spain', 'Serbia', 'Iran', 'Honduras'],
  G: ['Brazil', 'Turkey', 'Egypt', 'Costa Rica'],
  H: ['Argentina', 'Croatia', 'Nigeria', 'Romania'],
  I: ['England', 'Austria', 'Slovakia', 'Cuba'],
  J: ['Portugal', 'Hungary', 'Saudi Arabia', 'Iraq'],
  K: ['Netherlands', 'Denmark', 'Australia', 'Algeria'],
  L: ['Belgium', 'Ukraine', 'Switzerland', 'Ivory Coast'],
}

const groupFixtures = [
  [0, 1, 2, 3],
  [0, 2, 1, 3],
  [0, 3, 1, 2],
]

const groupDateOffsets = {
  A: 0, B: 0, C: 1, D: 1, E: 2, F: 2,
  G: 3, H: 3, I: 4, J: 4, K: 5, L: 5,
}

const BASE_DATE = new Date('2026-06-12T00:00:00Z')

const matches = []

// Group stage
Object.entries(GROUPS).forEach(([group, teams]) => {
  const offset = groupDateOffsets[group]
  groupFixtures.forEach(([a, b, c, d], matchday) => {
    const dayOffset = offset + matchday * 12
    const date1 = new Date(BASE_DATE)
    date1.setDate(date1.getDate() + dayOffset)
    date1.setUTCHours(18, 0, 0, 0)
    const date2 = new Date(date1)
    date2.setUTCHours(21, 0, 0, 0)

    matches.push({ stage: `Group ${group}`, home_team: teams[a], away_team: teams[b], match_date: date1.toISOString(), venue: getVenue(), status: 'upcoming' })
    matches.push({ stage: `Group ${group}`, home_team: teams[c], away_team: teams[d], match_date: date2.toISOString(), venue: getVenue(), status: 'upcoming' })
  })
})

// Knockout placeholders
for (let i = 0; i < 16; i++) {
  matches.push({ stage: 'Round of 32', home_team: 'TBD', away_team: 'TBD', match_date: new Date(`2026-07-0${6 + Math.floor(i / 4)}T${i % 2 === 0 ? 18 : 21}:00:00Z`).toISOString(), venue: 'TBD', status: 'upcoming' })
}
for (let i = 0; i < 8; i++) {
  matches.push({ stage: 'Round of 16', home_team: 'TBD', away_team: 'TBD', match_date: new Date(`2026-07-${13 + Math.floor(i / 2)}T${i % 2 === 0 ? 18 : 21}:00:00Z`).toISOString(), venue: 'TBD', status: 'upcoming' })
}
for (let i = 0; i < 4; i++) {
  matches.push({ stage: 'Quarter-final', home_team: 'TBD', away_team: 'TBD', match_date: new Date(`2026-07-${18 + Math.floor(i / 2)}T${i % 2 === 0 ? 18 : 21}:00:00Z`).toISOString(), venue: 'TBD', status: 'upcoming' })
}
matches.push({ stage: 'Semi-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-22T21:00:00Z', venue: 'MetLife Stadium, New Jersey', status: 'upcoming' })
matches.push({ stage: 'Semi-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-23T21:00:00Z', venue: 'AT&T Stadium, Dallas', status: 'upcoming' })
matches.push({ stage: 'Third Place', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-25T18:00:00Z', venue: 'Hard Rock Stadium, Miami', status: 'upcoming' })
matches.push({ stage: 'Final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-19T21:00:00Z', venue: 'MetLife Stadium, New Jersey', status: 'upcoming' })

async function seed() {
  console.log(`Seeding ${matches.length} matches…`)

  // Check if already seeded
  const { count } = await supabase.from('matches').select('*', { count: 'exact', head: true })
  if (count > 0) {
    console.log(`⚠️  matches table already has ${count} rows — skipping to avoid duplicates.`)
    console.log('   Run: DELETE FROM matches; in Supabase SQL Editor to reset first.')
    process.exit(0)
  }

  const BATCH = 20
  for (let i = 0; i < matches.length; i += BATCH) {
    const batch = matches.slice(i, i + BATCH)
    const { error } = await supabase.from('matches').insert(batch)
    if (error) {
      console.error('Insert error:', error.message)
      process.exit(1)
    }
    console.log(`  ✓ inserted rows ${i + 1}–${Math.min(i + BATCH, matches.length)}`)
  }
  console.log(`\n✅ Done! ${matches.length} matches seeded.`)
}

seed()
