// 2026 FIFA World Cup — Official schedule (48 teams, 12 groups, 104 matches)

export const FLAG_EMOJI = {
  // Group A
  'Mexico': '🇲🇽', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', 'Czech Republic': '🇨🇿',
  // Group B
  'Canada': '🇨🇦', 'Bosnia & Herzegovina': '🇧🇦', 'Qatar': '🇶🇦', 'Switzerland': '🇨🇭',
  // Group C
  'Brazil': '🇧🇷', 'Morocco': '🇲🇦', 'Haiti': '🇭🇹', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  // Group D
  'USA': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Turkey': '🇹🇷',
  // Group E
  'Germany': '🇩🇪', 'Curaçao': '🇨🇼', 'Ivory Coast': '🇨🇮', 'Ecuador': '🇪🇨',
  // Group F
  'Netherlands': '🇳🇱', 'Japan': '🇯🇵', 'Sweden': '🇸🇪', 'Tunisia': '🇹🇳',
  // Group G
  'Belgium': '🇧🇪', 'Egypt': '🇪🇬', 'Iran': '🇮🇷', 'New Zealand': '🇳🇿',
  // Group H
  'Spain': '🇪🇸', 'Cape Verde': '🇨🇻', 'Saudi Arabia': '🇸🇦', 'Uruguay': '🇺🇾',
  // Group I
  'France': '🇫🇷', 'Senegal': '🇸🇳', 'Iraq': '🇮🇶', 'Norway': '🇳🇴',
  // Group J
  'Argentina': '🇦🇷', 'Algeria': '🇩🇿', 'Austria': '🇦🇹', 'Jordan': '🇯🇴',
  // Group K
  'Portugal': '🇵🇹', 'DR Congo': '🇨🇩', 'Uzbekistan': '🇺🇿', 'Colombia': '🇨🇴',
  // Group L
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Croatia': '🇭🇷', 'Ghana': '🇬🇭', 'Panama': '🇵🇦',
}

export const GROUPS = {
  A: ['Mexico', 'South Africa', 'South Korea', 'Czech Republic'],
  B: ['Canada', 'Bosnia & Herzegovina', 'Qatar', 'Switzerland'],
  C: ['Brazil', 'Morocco', 'Haiti', 'Scotland'],
  D: ['USA', 'Paraguay', 'Australia', 'Turkey'],
  E: ['Germany', 'Curaçao', 'Ivory Coast', 'Ecuador'],
  F: ['Netherlands', 'Japan', 'Sweden', 'Tunisia'],
  G: ['Belgium', 'Egypt', 'Iran', 'New Zealand'],
  H: ['Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay'],
  I: ['France', 'Senegal', 'Iraq', 'Norway'],
  J: ['Argentina', 'Algeria', 'Austria', 'Jordan'],
  K: ['Portugal', 'DR Congo', 'Uzbekistan', 'Colombia'],
  L: ['England', 'Croatia', 'Ghana', 'Panama'],
}

// All 72 group stage matches — dates/times in UTC
const groupMatches = [
  // ── Group A ──────────────────────────────────────────────────────────────
  { id:  1, stage: 'Group A', home_team: 'Mexico',       away_team: 'South Africa', match_date: '2026-06-11T19:00:00Z', venue: 'Estadio Azteca, Mexico City' },
  { id:  2, stage: 'Group A', home_team: 'South Korea',  away_team: 'Czech Republic', match_date: '2026-06-12T02:00:00Z', venue: 'Estadio Akron, Guadalajara' },
  { id:  3, stage: 'Group A', home_team: 'Czech Republic', away_team: 'South Africa', match_date: '2026-06-18T16:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { id:  4, stage: 'Group A', home_team: 'Mexico',       away_team: 'South Korea',    match_date: '2026-06-19T01:00:00Z', venue: 'Estadio Akron, Guadalajara' },
  { id:  5, stage: 'Group A', home_team: 'Czech Republic', away_team: 'Mexico',       match_date: '2026-06-25T01:00:00Z', venue: 'Estadio Azteca, Mexico City' },
  { id:  6, stage: 'Group A', home_team: 'South Africa', away_team: 'South Korea',    match_date: '2026-06-25T01:00:00Z', venue: 'Estadio BBVA, Monterrey' },

  // ── Group B ──────────────────────────────────────────────────────────────
  { id:  7, stage: 'Group B', home_team: 'Canada',       away_team: 'Bosnia & Herzegovina', match_date: '2026-06-12T19:00:00Z', venue: 'BMO Field, Toronto' },
  { id:  8, stage: 'Group B', home_team: 'Qatar',        away_team: 'Switzerland',    match_date: '2026-06-13T19:00:00Z', venue: "Levi's Stadium, San Francisco" },
  { id:  9, stage: 'Group B', home_team: 'Switzerland',  away_team: 'Bosnia & Herzegovina', match_date: '2026-06-18T19:00:00Z', venue: 'SoFi Stadium, Los Angeles' },
  { id: 10, stage: 'Group B', home_team: 'Canada',       away_team: 'Qatar',          match_date: '2026-06-18T22:00:00Z', venue: 'BC Place, Vancouver' },
  { id: 11, stage: 'Group B', home_team: 'Switzerland',  away_team: 'Canada',         match_date: '2026-06-24T19:00:00Z', venue: 'BC Place, Vancouver' },
  { id: 12, stage: 'Group B', home_team: 'Bosnia & Herzegovina', away_team: 'Qatar',  match_date: '2026-06-24T19:00:00Z', venue: 'Lumen Field, Seattle' },

  // ── Group C ──────────────────────────────────────────────────────────────
  { id: 13, stage: 'Group C', home_team: 'Brazil',       away_team: 'Morocco',        match_date: '2026-06-13T22:00:00Z', venue: 'MetLife Stadium, New York/NJ' },
  { id: 14, stage: 'Group C', home_team: 'Haiti',        away_team: 'Scotland',       match_date: '2026-06-14T01:00:00Z', venue: 'Gillette Stadium, Boston' },
  { id: 15, stage: 'Group C', home_team: 'Scotland',     away_team: 'Morocco',        match_date: '2026-06-19T22:00:00Z', venue: 'Gillette Stadium, Boston' },
  { id: 16, stage: 'Group C', home_team: 'Brazil',       away_team: 'Haiti',          match_date: '2026-06-20T00:30:00Z', venue: 'Lincoln Financial Field, Philadelphia' },
  { id: 17, stage: 'Group C', home_team: 'Scotland',     away_team: 'Brazil',         match_date: '2026-06-24T22:00:00Z', venue: 'Hard Rock Stadium, Miami' },
  { id: 18, stage: 'Group C', home_team: 'Morocco',      away_team: 'Haiti',          match_date: '2026-06-24T22:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta' },

  // ── Group D ──────────────────────────────────────────────────────────────
  { id: 19, stage: 'Group D', home_team: 'USA',          away_team: 'Paraguay',       match_date: '2026-06-13T01:00:00Z', venue: 'SoFi Stadium, Los Angeles' },
  { id: 20, stage: 'Group D', home_team: 'Australia',    away_team: 'Turkey',         match_date: '2026-06-14T04:00:00Z', venue: 'BC Place, Vancouver' },
  { id: 21, stage: 'Group D', home_team: 'USA',          away_team: 'Australia',      match_date: '2026-06-19T19:00:00Z', venue: 'Lumen Field, Seattle' },
  { id: 22, stage: 'Group D', home_team: 'Turkey',       away_team: 'Paraguay',       match_date: '2026-06-20T03:00:00Z', venue: "Levi's Stadium, San Francisco" },
  { id: 23, stage: 'Group D', home_team: 'Turkey',       away_team: 'USA',            match_date: '2026-06-26T02:00:00Z', venue: 'SoFi Stadium, Los Angeles' },
  { id: 24, stage: 'Group D', home_team: 'Paraguay',     away_team: 'Australia',      match_date: '2026-06-26T02:00:00Z', venue: "Levi's Stadium, San Francisco" },

  // ── Group E ──────────────────────────────────────────────────────────────
  { id: 25, stage: 'Group E', home_team: 'Germany',      away_team: 'Curaçao',        match_date: '2026-06-14T17:00:00Z', venue: 'NRG Stadium, Houston' },
  { id: 26, stage: 'Group E', home_team: 'Ivory Coast',  away_team: 'Ecuador',        match_date: '2026-06-14T23:00:00Z', venue: 'Lincoln Financial Field, Philadelphia' },
  { id: 27, stage: 'Group E', home_team: 'Germany',      away_team: 'Ivory Coast',    match_date: '2026-06-20T20:00:00Z', venue: 'BMO Field, Toronto' },
  { id: 28, stage: 'Group E', home_team: 'Ecuador',      away_team: 'Curaçao',        match_date: '2026-06-21T00:00:00Z', venue: 'Arrowhead Stadium, Kansas City' },
  { id: 29, stage: 'Group E', home_team: 'Curaçao',      away_team: 'Ivory Coast',    match_date: '2026-06-25T20:00:00Z', venue: 'Lincoln Financial Field, Philadelphia' },
  { id: 30, stage: 'Group E', home_team: 'Ecuador',      away_team: 'Germany',        match_date: '2026-06-25T20:00:00Z', venue: 'MetLife Stadium, New York/NJ' },

  // ── Group F ──────────────────────────────────────────────────────────────
  { id: 31, stage: 'Group F', home_team: 'Netherlands',  away_team: 'Japan',          match_date: '2026-06-14T20:00:00Z', venue: 'AT&T Stadium, Dallas' },
  { id: 32, stage: 'Group F', home_team: 'Sweden',       away_team: 'Tunisia',        match_date: '2026-06-15T02:00:00Z', venue: 'Estadio BBVA, Monterrey' },
  { id: 33, stage: 'Group F', home_team: 'Netherlands',  away_team: 'Sweden',         match_date: '2026-06-20T17:00:00Z', venue: 'NRG Stadium, Houston' },
  { id: 34, stage: 'Group F', home_team: 'Tunisia',      away_team: 'Japan',          match_date: '2026-06-21T04:00:00Z', venue: 'Estadio BBVA, Monterrey' },
  { id: 35, stage: 'Group F', home_team: 'Japan',        away_team: 'Sweden',         match_date: '2026-06-25T23:00:00Z', venue: 'AT&T Stadium, Dallas' },
  { id: 36, stage: 'Group F', home_team: 'Tunisia',      away_team: 'Netherlands',    match_date: '2026-06-25T23:00:00Z', venue: 'Arrowhead Stadium, Kansas City' },

  // ── Group G ──────────────────────────────────────────────────────────────
  { id: 37, stage: 'Group G', home_team: 'Belgium',      away_team: 'Egypt',          match_date: '2026-06-15T19:00:00Z', venue: 'Lumen Field, Seattle' },
  { id: 38, stage: 'Group G', home_team: 'Iran',         away_team: 'New Zealand',    match_date: '2026-06-16T01:00:00Z', venue: 'SoFi Stadium, Los Angeles' },
  { id: 39, stage: 'Group G', home_team: 'Belgium',      away_team: 'Iran',           match_date: '2026-06-21T19:00:00Z', venue: 'SoFi Stadium, Los Angeles' },
  { id: 40, stage: 'Group G', home_team: 'New Zealand',  away_team: 'Egypt',          match_date: '2026-06-22T01:00:00Z', venue: 'BC Place, Vancouver' },
  { id: 41, stage: 'Group G', home_team: 'Egypt',        away_team: 'Iran',           match_date: '2026-06-27T03:00:00Z', venue: 'Lumen Field, Seattle' },
  { id: 42, stage: 'Group G', home_team: 'New Zealand',  away_team: 'Belgium',        match_date: '2026-06-27T03:00:00Z', venue: 'BC Place, Vancouver' },

  // ── Group H ──────────────────────────────────────────────────────────────
  { id: 43, stage: 'Group H', home_team: 'Spain',        away_team: 'Cape Verde',     match_date: '2026-06-15T16:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { id: 44, stage: 'Group H', home_team: 'Saudi Arabia', away_team: 'Uruguay',        match_date: '2026-06-15T22:00:00Z', venue: 'Hard Rock Stadium, Miami' },
  { id: 45, stage: 'Group H', home_team: 'Spain',        away_team: 'Saudi Arabia',   match_date: '2026-06-21T16:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { id: 46, stage: 'Group H', home_team: 'Uruguay',      away_team: 'Cape Verde',     match_date: '2026-06-21T22:00:00Z', venue: 'Hard Rock Stadium, Miami' },
  { id: 47, stage: 'Group H', home_team: 'Cape Verde',   away_team: 'Saudi Arabia',   match_date: '2026-06-27T00:00:00Z', venue: 'NRG Stadium, Houston' },
  { id: 48, stage: 'Group H', home_team: 'Uruguay',      away_team: 'Spain',          match_date: '2026-06-27T00:00:00Z', venue: 'Estadio Akron, Guadalajara' },

  // ── Group I ──────────────────────────────────────────────────────────────
  { id: 49, stage: 'Group I', home_team: 'France',       away_team: 'Senegal',        match_date: '2026-06-16T19:00:00Z', venue: 'MetLife Stadium, New York/NJ' },
  { id: 50, stage: 'Group I', home_team: 'Iraq',         away_team: 'Norway',         match_date: '2026-06-16T22:00:00Z', venue: 'Gillette Stadium, Boston' },
  { id: 51, stage: 'Group I', home_team: 'France',       away_team: 'Iraq',           match_date: '2026-06-22T21:00:00Z', venue: 'Lincoln Financial Field, Philadelphia' },
  { id: 52, stage: 'Group I', home_team: 'Norway',       away_team: 'Senegal',        match_date: '2026-06-23T00:00:00Z', venue: 'MetLife Stadium, New York/NJ' },
  { id: 53, stage: 'Group I', home_team: 'Norway',       away_team: 'France',         match_date: '2026-06-26T19:00:00Z', venue: 'Gillette Stadium, Boston' },
  { id: 54, stage: 'Group I', home_team: 'Senegal',      away_team: 'Iraq',           match_date: '2026-06-26T19:00:00Z', venue: 'BMO Field, Toronto' },

  // ── Group J ──────────────────────────────────────────────────────────────
  { id: 55, stage: 'Group J', home_team: 'Argentina',    away_team: 'Algeria',        match_date: '2026-06-17T01:00:00Z', venue: 'Arrowhead Stadium, Kansas City' },
  { id: 56, stage: 'Group J', home_team: 'Austria',      away_team: 'Jordan',         match_date: '2026-06-17T04:00:00Z', venue: "Levi's Stadium, San Francisco" },
  { id: 57, stage: 'Group J', home_team: 'Argentina',    away_team: 'Austria',        match_date: '2026-06-22T17:00:00Z', venue: 'AT&T Stadium, Dallas' },
  { id: 58, stage: 'Group J', home_team: 'Jordan',       away_team: 'Algeria',        match_date: '2026-06-23T03:00:00Z', venue: "Levi's Stadium, San Francisco" },
  { id: 59, stage: 'Group J', home_team: 'Algeria',      away_team: 'Austria',        match_date: '2026-06-28T02:00:00Z', venue: 'Arrowhead Stadium, Kansas City' },
  { id: 60, stage: 'Group J', home_team: 'Jordan',       away_team: 'Argentina',      match_date: '2026-06-28T02:00:00Z', venue: 'AT&T Stadium, Dallas' },

  // ── Group K ──────────────────────────────────────────────────────────────
  { id: 61, stage: 'Group K', home_team: 'Portugal',     away_team: 'DR Congo',       match_date: '2026-06-17T17:00:00Z', venue: 'NRG Stadium, Houston' },
  { id: 62, stage: 'Group K', home_team: 'Uzbekistan',   away_team: 'Colombia',       match_date: '2026-06-18T02:00:00Z', venue: 'Estadio Azteca, Mexico City' },
  { id: 63, stage: 'Group K', home_team: 'Portugal',     away_team: 'Uzbekistan',     match_date: '2026-06-23T17:00:00Z', venue: 'NRG Stadium, Houston' },
  { id: 64, stage: 'Group K', home_team: 'Colombia',     away_team: 'DR Congo',       match_date: '2026-06-24T02:00:00Z', venue: 'Estadio Akron, Guadalajara' },
  { id: 65, stage: 'Group K', home_team: 'Colombia',     away_team: 'Portugal',       match_date: '2026-06-27T23:30:00Z', venue: 'Hard Rock Stadium, Miami' },
  { id: 66, stage: 'Group K', home_team: 'DR Congo',     away_team: 'Uzbekistan',     match_date: '2026-06-27T23:30:00Z', venue: 'Mercedes-Benz Stadium, Atlanta' },

  // ── Group L ──────────────────────────────────────────────────────────────
  { id: 67, stage: 'Group L', home_team: 'England',      away_team: 'Croatia',        match_date: '2026-06-17T20:00:00Z', venue: 'AT&T Stadium, Dallas' },
  { id: 68, stage: 'Group L', home_team: 'Ghana',        away_team: 'Panama',         match_date: '2026-06-17T23:00:00Z', venue: 'BMO Field, Toronto' },
  { id: 69, stage: 'Group L', home_team: 'England',      away_team: 'Ghana',          match_date: '2026-06-23T20:00:00Z', venue: 'Gillette Stadium, Boston' },
  { id: 70, stage: 'Group L', home_team: 'Panama',       away_team: 'Croatia',        match_date: '2026-06-23T23:00:00Z', venue: 'BMO Field, Toronto' },
  { id: 71, stage: 'Group L', home_team: 'Panama',       away_team: 'England',        match_date: '2026-06-27T21:00:00Z', venue: 'MetLife Stadium, New York/NJ' },
  { id: 72, stage: 'Group L', home_team: 'Croatia',      away_team: 'Ghana',          match_date: '2026-06-27T21:00:00Z', venue: 'Lincoln Financial Field, Philadelphia' },
].map(m => ({ ...m, home_score: null, away_score: null, status: 'upcoming' }))

// Knockout stage placeholders (teams determined after group stage)
let id = 73
const knockoutMatches = [
  // Round of 32 — June 28 – July 3
  ...['2026-06-28T19:00:00Z','2026-06-29T20:30:00Z','2026-06-29T23:00:00Z','2026-06-29T17:00:00Z',
      '2026-06-30T21:00:00Z','2026-06-30T17:00:00Z','2026-06-30T23:00:00Z','2026-07-01T16:00:00Z',
      '2026-07-01T19:00:00Z','2026-07-01T17:00:00Z','2026-07-02T23:00:00Z','2026-07-02T19:00:00Z',
      '2026-07-02T20:00:00Z','2026-07-03T22:00:00Z','2026-07-03T23:30:00Z','2026-07-03T18:00:00Z',
    ].map(date => ({
      id: id++, stage: 'Round of 32', home_team: 'TBD', away_team: 'TBD',
      match_date: date, venue: 'TBD', home_score: null, away_score: null, status: 'upcoming',
    })),
  // Round of 16 — July 4–7
  ...['2026-07-04T21:00:00Z','2026-07-04T17:00:00Z','2026-07-05T20:00:00Z','2026-07-05T23:00:00Z',
      '2026-07-06T19:00:00Z','2026-07-06T21:00:00Z','2026-07-07T16:00:00Z','2026-07-07T17:00:00Z',
    ].map(date => ({
      id: id++, stage: 'Round of 16', home_team: 'TBD', away_team: 'TBD',
      match_date: date, venue: 'TBD', home_score: null, away_score: null, status: 'upcoming',
    })),
  // Quarter-finals — July 9–11
  { id: id++, stage: 'Quarter-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-09T20:00:00Z', venue: 'Gillette Stadium, Boston', home_score: null, away_score: null, status: 'upcoming' },
  { id: id++, stage: 'Quarter-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-10T19:00:00Z', venue: 'SoFi Stadium, Los Angeles', home_score: null, away_score: null, status: 'upcoming' },
  { id: id++, stage: 'Quarter-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-11T21:00:00Z', venue: 'Hard Rock Stadium, Miami', home_score: null, away_score: null, status: 'upcoming' },
  { id: id++, stage: 'Quarter-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-12T00:00:00Z', venue: 'Arrowhead Stadium, Kansas City', home_score: null, away_score: null, status: 'upcoming' },
  // Semi-finals — July 14–15
  { id: id++, stage: 'Semi-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-14T19:00:00Z', venue: 'AT&T Stadium, Dallas', home_score: null, away_score: null, status: 'upcoming' },
  { id: id++, stage: 'Semi-final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-15T19:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta', home_score: null, away_score: null, status: 'upcoming' },
  // Third place — July 18
  { id: id++, stage: 'Third Place', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-18T21:00:00Z', venue: 'Hard Rock Stadium, Miami', home_score: null, away_score: null, status: 'upcoming' },
  // Final — July 19
  { id: id++, stage: 'Final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-19T19:00:00Z', venue: 'MetLife Stadium, New York/NJ', home_score: null, away_score: null, status: 'upcoming' },
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
