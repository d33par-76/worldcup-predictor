// 2026 FIFA World Cup — 48 teams, 12 groups (A–L), 104 matches
// Group stage: each team plays 3 matches. Top 2 + 8 best 3rd-place advance (32 teams).
// Dates are approximate; admin can update via the Admin panel.

export const FLAG_EMOJI = {
  // Group A
  'USA': '🇺🇸', 'Bolivia': '🇧🇴', 'Panama': '🇵🇦', 'Morocco': '🇲🇦',
  // Group B
  'Colombia': '🇨🇴', 'Ecuador': '🇪🇨', 'South Korea': '🇰🇷', 'Cameroon': '🇨🇲',
  // Group C
  'Mexico': '🇲🇽', 'Jamaica': '🇯🇲', 'Venezuela': '🇻🇪', 'Senegal': '🇸🇳',
  // Group D
  'France': '🇫🇷', 'Tunisia': '🇹🇳', 'Japan': '🇯🇵', 'Paraguay': '🇵🇾',
  // Group E
  'Germany': '🇩🇪', 'South Africa': '🇿🇦', 'New Zealand': '🇳🇿', 'Chile': '🇨🇱',
  // Group F
  'Spain': '🇪🇸', 'Serbia': '🇷🇸', 'Iran': '🇮🇷', 'Honduras': '🇭🇳',
  // Group G
  'Brazil': '🇧🇷', 'Turkey': '🇹🇷', 'Egypt': '🇪🇬', 'Costa Rica': '🇨🇷',
  // Group H
  'Argentina': '🇦🇷', 'Croatia': '🇭🇷', 'Nigeria': '🇳🇬', 'Romania': '🇷🇴',
  // Group I
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Austria': '🇦🇹', 'Slovakia': '🇸🇰', 'Cuba': '🇨🇺',
  // Group J
  'Portugal': '🇵🇹', 'Hungary': '🇭🇺', 'Saudi Arabia': '🇸🇦', 'Iraq': '🇮🇶',
  // Group K
  'Netherlands': '🇳🇱', 'Denmark': '🇩🇰', 'Australia': '🇦🇺', 'Algeria': '🇩🇿',
  // Group L
  'Belgium': '🇧🇪', 'Ukraine': '🇺🇦', 'Switzerland': '🇨🇭', 'Ivory Coast': '🇨🇮',
}

export const GROUPS = {
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
function getVenue(_home, _away) {
  const v = ALL_VENUES[venueIdx % ALL_VENUES.length]
  venueIdx++
  return v
}

const groupMatches = []
let id = 1

// Generate all group stage fixtures (each group: 6 matches in 3 matchdays)
const groupFixtures = [
  // Matchday 1: team[0] v team[1], team[2] v team[3]
  // Matchday 2: team[0] v team[2], team[1] v team[3]
  // Matchday 3: team[0] v team[3], team[1] v team[2]
  [0, 1, 2, 3],
  [0, 2, 1, 3],
  [0, 3, 1, 2],
]

// Group stage dates: June 12 – July 2, 2026
// Pairs of groups play on the same days
const groupDateOffsets = {
  A: 0, B: 0,
  C: 1, D: 1,
  E: 2, F: 2,
  G: 3, H: 3,
  I: 4, J: 4,
  K: 5, L: 5,
}

const BASE_DATE = new Date('2026-06-12T00:00:00Z')

Object.entries(GROUPS).forEach(([group, teams]) => {
  const offset = groupDateOffsets[group]
  groupFixtures.forEach(([a, b, c, d], matchday) => {
    const dayOffset = offset + matchday * 12
    const date1 = new Date(BASE_DATE)
    date1.setDate(date1.getDate() + dayOffset)
    date1.setHours(18, 0, 0, 0)

    const date2 = new Date(date1)
    date2.setHours(21, 0, 0, 0)

    groupMatches.push({
      id: id++,
      stage: `Group ${group}`,
      home_team: teams[a],
      away_team: teams[b],
      match_date: date1.toISOString(),
      venue: getVenue(teams[a], teams[b]),
      home_score: null,
      away_score: null,
      status: 'upcoming',
    })
    groupMatches.push({
      id: id++,
      stage: `Group ${group}`,
      home_team: teams[c],
      away_team: teams[d],
      match_date: date2.toISOString(),
      venue: getVenue(teams[c], teams[d]),
      home_score: null,
      away_score: null,
      status: 'upcoming',
    })
  })
})

// Knockout stage placeholder matches (teams TBD after group stage)
const knockoutMatches = [
  // Round of 32 — July 6–10
  ...Array.from({ length: 16 }, (_, i) => ({
    id: id++,
    stage: 'Round of 32',
    home_team: `Winner Group ${String.fromCharCode(65 + Math.floor(i / 2))}${i % 2 === 0 ? '' : '/Runner-up'}`,
    away_team: 'TBD',
    match_date: new Date(`2026-07-0${6 + Math.floor(i / 4)}T${18 + (i % 2) * 3}:00:00Z`).toISOString(),
    venue: 'TBD',
    home_score: null,
    away_score: null,
    status: 'upcoming',
  })),
  // Round of 16 — July 13–16
  ...Array.from({ length: 8 }, (_, i) => ({
    id: id++,
    stage: 'Round of 16',
    home_team: 'TBD',
    away_team: 'TBD',
    match_date: new Date(`2026-07-${13 + Math.floor(i / 2)}T${18 + (i % 2) * 3}:00:00Z`).toISOString(),
    venue: 'TBD',
    home_score: null,
    away_score: null,
    status: 'upcoming',
  })),
  // Quarter-finals — July 18–19
  ...Array.from({ length: 4 }, (_, i) => ({
    id: id++,
    stage: 'Quarter-final',
    home_team: 'TBD',
    away_team: 'TBD',
    match_date: new Date(`2026-07-${18 + Math.floor(i / 2)}T${18 + (i % 2) * 3}:00:00Z`).toISOString(),
    venue: 'TBD',
    home_score: null,
    away_score: null,
    status: 'upcoming',
  })),
  // Semi-finals — July 22–23
  { id: id++, stage: 'Semi-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-22T21:00:00Z', venue: 'MetLife Stadium, New Jersey', home_score: null, away_score: null, status: 'upcoming' },
  { id: id++, stage: 'Semi-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-23T21:00:00Z', venue: 'AT&T Stadium, Dallas', home_score: null, away_score: null, status: 'upcoming' },
  // Third place — July 25
  { id: id++, stage: 'Third Place', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-25T18:00:00Z', venue: 'Hard Rock Stadium, Miami', home_score: null, away_score: null, status: 'upcoming' },
  // Final — July 19
  { id: id++, stage: 'Final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-19T21:00:00Z', venue: 'MetLife Stadium, New Jersey', home_score: null, away_score: null, status: 'upcoming' },
]

export const MATCHES = [...groupMatches, ...knockoutMatches]


export const STAGE_ORDER = [
  'Group A', 'Group B', 'Group C', 'Group D',
  'Group E', 'Group F', 'Group G', 'Group H',
  'Group I', 'Group J', 'Group K', 'Group L',
  'Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Third Place', 'Final',
]

export const STAGE_COLORS = {
  'Group A': 'bg-cyan-900/60 text-cyan-200',
  'Group B': 'bg-cyan-900/60 text-cyan-200',
  'Group C': 'bg-cyan-900/60 text-cyan-200',
  'Group D': 'bg-cyan-900/60 text-cyan-200',
  'Group E': 'bg-cyan-900/60 text-cyan-200',
  'Group F': 'bg-cyan-900/60 text-cyan-200',
  'Group G': 'bg-cyan-900/60 text-cyan-200',
  'Group H': 'bg-cyan-900/60 text-cyan-200',
  'Group I': 'bg-cyan-900/60 text-cyan-200',
  'Group J': 'bg-cyan-900/60 text-cyan-200',
  'Group K': 'bg-cyan-900/60 text-cyan-200',
  'Group L': 'bg-cyan-900/60 text-cyan-200',
  'Round of 32': 'bg-sky-900/70 text-sky-200',
  'Round of 16': 'bg-sky-800/70 text-sky-100',
  'Quarter-final': 'bg-orange-900/70 text-orange-200',
  'Semi-final': 'bg-amber-900/70 text-amber-200',
  'Third Place': 'bg-gray-700 text-gray-200',
  'Final': 'bg-fifa-gold text-fifa-dark',
}
