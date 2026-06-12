-- Re-seed matches with the real 2026 FIFA World Cup schedule
-- Run in Supabase SQL Editor: clear old data then insert correct matches

TRUNCATE TABLE predictions;
TRUNCATE TABLE matches RESTART IDENTITY;

INSERT INTO matches (stage, home_team, away_team, match_date, venue, home_score, away_score, status) VALUES

-- ── Group A ──────────────────────────────────────────────────────────────────
('Group A','Mexico','South Africa','2026-06-11T19:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
('Group A','South Korea','Czech Republic','2026-06-12T02:00:00Z','Estadio Akron, Guadalajara',NULL,NULL,'upcoming'),
('Group A','Czech Republic','South Africa','2026-06-18T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
('Group A','Mexico','South Korea','2026-06-19T01:00:00Z','Estadio Akron, Guadalajara',NULL,NULL,'upcoming'),
('Group A','Czech Republic','Mexico','2026-06-25T01:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
('Group A','South Africa','South Korea','2026-06-25T01:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),

-- ── Group B ──────────────────────────────────────────────────────────────────
('Group B','Canada','Bosnia & Herzegovina','2026-06-12T19:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
('Group B','Qatar','Switzerland','2026-06-13T19:00:00Z','Levi''s Stadium, San Francisco',NULL,NULL,'upcoming'),
('Group B','Switzerland','Bosnia & Herzegovina','2026-06-18T19:00:00Z','SoFi Stadium, Los Angeles',NULL,NULL,'upcoming'),
('Group B','Canada','Qatar','2026-06-18T22:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
('Group B','Switzerland','Canada','2026-06-24T19:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
('Group B','Bosnia & Herzegovina','Qatar','2026-06-24T19:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),

-- ── Group C ──────────────────────────────────────────────────────────────────
('Group C','Brazil','Morocco','2026-06-13T22:00:00Z','MetLife Stadium, New York/NJ',NULL,NULL,'upcoming'),
('Group C','Haiti','Scotland','2026-06-14T01:00:00Z','Gillette Stadium, Boston',NULL,NULL,'upcoming'),
('Group C','Scotland','Morocco','2026-06-19T22:00:00Z','Gillette Stadium, Boston',NULL,NULL,'upcoming'),
('Group C','Brazil','Haiti','2026-06-20T00:30:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
('Group C','Scotland','Brazil','2026-06-24T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Group C','Morocco','Haiti','2026-06-24T22:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),

-- ── Group D ──────────────────────────────────────────────────────────────────
('Group D','USA','Paraguay','2026-06-13T01:00:00Z','SoFi Stadium, Los Angeles',NULL,NULL,'upcoming'),
('Group D','Australia','Turkey','2026-06-14T04:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
('Group D','USA','Australia','2026-06-19T19:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
('Group D','Turkey','Paraguay','2026-06-20T03:00:00Z','Levi''s Stadium, San Francisco',NULL,NULL,'upcoming'),
('Group D','Turkey','USA','2026-06-26T02:00:00Z','SoFi Stadium, Los Angeles',NULL,NULL,'upcoming'),
('Group D','Paraguay','Australia','2026-06-26T02:00:00Z','Levi''s Stadium, San Francisco',NULL,NULL,'upcoming'),

-- ── Group E ──────────────────────────────────────────────────────────────────
('Group E','Germany','Curaçao','2026-06-14T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
('Group E','Ivory Coast','Ecuador','2026-06-14T23:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
('Group E','Germany','Ivory Coast','2026-06-20T20:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
('Group E','Ecuador','Curaçao','2026-06-21T00:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),
('Group E','Curaçao','Ivory Coast','2026-06-25T20:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
('Group E','Ecuador','Germany','2026-06-25T20:00:00Z','MetLife Stadium, New York/NJ',NULL,NULL,'upcoming'),

-- ── Group F ──────────────────────────────────────────────────────────────────
('Group F','Netherlands','Japan','2026-06-14T20:00:00Z','AT&T Stadium, Dallas',NULL,NULL,'upcoming'),
('Group F','Sweden','Tunisia','2026-06-15T02:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),
('Group F','Netherlands','Sweden','2026-06-20T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
('Group F','Tunisia','Japan','2026-06-21T04:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),
('Group F','Japan','Sweden','2026-06-25T23:00:00Z','AT&T Stadium, Dallas',NULL,NULL,'upcoming'),
('Group F','Tunisia','Netherlands','2026-06-25T23:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),

-- ── Group G ──────────────────────────────────────────────────────────────────
('Group G','Belgium','Egypt','2026-06-15T19:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
('Group G','Iran','New Zealand','2026-06-16T01:00:00Z','SoFi Stadium, Los Angeles',NULL,NULL,'upcoming'),
('Group G','Belgium','Iran','2026-06-21T19:00:00Z','SoFi Stadium, Los Angeles',NULL,NULL,'upcoming'),
('Group G','New Zealand','Egypt','2026-06-22T01:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
('Group G','Egypt','Iran','2026-06-27T03:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
('Group G','New Zealand','Belgium','2026-06-27T03:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),

-- ── Group H ──────────────────────────────────────────────────────────────────
('Group H','Spain','Cape Verde','2026-06-15T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
('Group H','Saudi Arabia','Uruguay','2026-06-15T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Group H','Spain','Saudi Arabia','2026-06-21T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
('Group H','Uruguay','Cape Verde','2026-06-21T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Group H','Cape Verde','Saudi Arabia','2026-06-27T00:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
('Group H','Uruguay','Spain','2026-06-27T00:00:00Z','Estadio Akron, Guadalajara',NULL,NULL,'upcoming'),

-- ── Group I ──────────────────────────────────────────────────────────────────
('Group I','France','Senegal','2026-06-16T19:00:00Z','MetLife Stadium, New York/NJ',NULL,NULL,'upcoming'),
('Group I','Iraq','Norway','2026-06-16T22:00:00Z','Gillette Stadium, Boston',NULL,NULL,'upcoming'),
('Group I','France','Iraq','2026-06-22T21:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
('Group I','Norway','Senegal','2026-06-23T00:00:00Z','MetLife Stadium, New York/NJ',NULL,NULL,'upcoming'),
('Group I','Norway','France','2026-06-26T19:00:00Z','Gillette Stadium, Boston',NULL,NULL,'upcoming'),
('Group I','Senegal','Iraq','2026-06-26T19:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),

-- ── Group J ──────────────────────────────────────────────────────────────────
('Group J','Argentina','Algeria','2026-06-17T01:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),
('Group J','Austria','Jordan','2026-06-17T04:00:00Z','Levi''s Stadium, San Francisco',NULL,NULL,'upcoming'),
('Group J','Argentina','Austria','2026-06-22T17:00:00Z','AT&T Stadium, Dallas',NULL,NULL,'upcoming'),
('Group J','Jordan','Algeria','2026-06-23T03:00:00Z','Levi''s Stadium, San Francisco',NULL,NULL,'upcoming'),
('Group J','Algeria','Austria','2026-06-28T02:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),
('Group J','Jordan','Argentina','2026-06-28T02:00:00Z','AT&T Stadium, Dallas',NULL,NULL,'upcoming'),

-- ── Group K ──────────────────────────────────────────────────────────────────
('Group K','Portugal','DR Congo','2026-06-17T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
('Group K','Uzbekistan','Colombia','2026-06-18T02:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
('Group K','Portugal','Uzbekistan','2026-06-23T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
('Group K','Colombia','DR Congo','2026-06-24T02:00:00Z','Estadio Akron, Guadalajara',NULL,NULL,'upcoming'),
('Group K','Colombia','Portugal','2026-06-27T23:30:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Group K','DR Congo','Uzbekistan','2026-06-27T23:30:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),

-- ── Group L ──────────────────────────────────────────────────────────────────
('Group L','England','Croatia','2026-06-17T20:00:00Z','AT&T Stadium, Dallas',NULL,NULL,'upcoming'),
('Group L','Ghana','Panama','2026-06-17T23:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
('Group L','England','Ghana','2026-06-23T20:00:00Z','Gillette Stadium, Boston',NULL,NULL,'upcoming'),
('Group L','Panama','Croatia','2026-06-23T23:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
('Group L','Panama','England','2026-06-27T21:00:00Z','MetLife Stadium, New York/NJ',NULL,NULL,'upcoming'),
('Group L','Croatia','Ghana','2026-06-27T21:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),

-- ── Round of 32 (placeholders) ───────────────────────────────────────────────
('Round of 32','TBD','TBD','2026-06-28T19:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-06-29T20:30:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-06-29T23:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-06-29T17:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-06-30T21:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-06-30T17:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-06-30T23:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-01T16:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-01T19:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-01T17:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-02T23:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-02T19:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-02T20:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-03T22:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-03T23:30:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 32','TBD','TBD','2026-07-03T18:00:00Z','TBD',NULL,NULL,'upcoming'),

-- ── Round of 16 (placeholders) ───────────────────────────────────────────────
('Round of 16','TBD','TBD','2026-07-04T21:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-04T17:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-05T20:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-05T23:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-06T19:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-06T21:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-07T16:00:00Z','TBD',NULL,NULL,'upcoming'),
('Round of 16','TBD','TBD','2026-07-07T17:00:00Z','TBD',NULL,NULL,'upcoming'),

-- ── Quarter-finals (placeholders) ────────────────────────────────────────────
('Quarter-final','TBD','TBD','2026-07-09T20:00:00Z','Gillette Stadium, Boston',NULL,NULL,'upcoming'),
('Quarter-final','TBD','TBD','2026-07-10T19:00:00Z','SoFi Stadium, Los Angeles',NULL,NULL,'upcoming'),
('Quarter-final','TBD','TBD','2026-07-11T21:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Quarter-final','TBD','TBD','2026-07-12T00:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),

-- ── Semi-finals (placeholders) ───────────────────────────────────────────────
('Semi-final','TBD','TBD','2026-07-14T19:00:00Z','AT&T Stadium, Dallas',NULL,NULL,'upcoming'),
('Semi-final','TBD','TBD','2026-07-15T19:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),

-- ── Third place & Final ───────────────────────────────────────────────────────
('Third Place','TBD','TBD','2026-07-18T21:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Final','TBD','TBD','2026-07-19T19:00:00Z','MetLife Stadium, New York/NJ',NULL,NULL,'upcoming');
