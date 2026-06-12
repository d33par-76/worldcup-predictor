-- ============================================================
-- 2026 FIFA World Cup — Official schedule reseed
-- All times in UTC (converted from Eastern Time, ET = UTC-4)
-- Run in Supabase SQL Editor to replace all match data
-- WARNING: This clears all predictions too
-- ============================================================

TRUNCATE TABLE predictions;
TRUNCATE TABLE matches RESTART IDENTITY;

INSERT INTO matches (stage, home_team, away_team, match_date, venue, home_score, away_score, status) VALUES

-- ══════════════════════════════════════════════════════════════
-- GROUP STAGE
-- ══════════════════════════════════════════════════════════════

-- ── Group A ──────────────────────────────────────────────────
-- Jun 11 3:00 PM ET  = 19:00 UTC
('Group A','Mexico','South Africa','2026-06-11T19:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
-- Jun 11 10:00 PM ET = 02:00 UTC Jun 12
('Group A','South Korea','Czech Republic','2026-06-12T02:00:00Z','Estadio Akron, Zapopan',NULL,NULL,'upcoming'),
-- Jun 18 12:00 PM ET = 16:00 UTC
('Group A','Czech Republic','South Africa','2026-06-18T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
-- Jun 18 9:00 PM ET  = 01:00 UTC Jun 19
('Group A','Mexico','South Korea','2026-06-19T01:00:00Z','Estadio Akron, Zapopan',NULL,NULL,'upcoming'),
-- Jun 24 9:00 PM ET  = 01:00 UTC Jun 25
('Group A','Czech Republic','Mexico','2026-06-25T01:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
('Group A','South Africa','South Korea','2026-06-25T01:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),

-- ── Group B ──────────────────────────────────────────────────
-- Jun 12 3:00 PM ET  = 19:00 UTC
('Group B','Canada','Bosnia & Herzegovina','2026-06-12T19:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
-- Jun 13 3:00 PM ET  = 19:00 UTC
('Group B','Qatar','Switzerland','2026-06-13T19:00:00Z','Levi''s Stadium, Santa Clara',NULL,NULL,'upcoming'),
-- Jun 18 3:00 PM ET  = 19:00 UTC
('Group B','Switzerland','Bosnia & Herzegovina','2026-06-18T19:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Jun 18 6:00 PM ET  = 22:00 UTC
('Group B','Canada','Qatar','2026-06-18T22:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
-- Jun 24 3:00 PM ET  = 19:00 UTC
('Group B','Switzerland','Canada','2026-06-24T19:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
('Group B','Bosnia & Herzegovina','Qatar','2026-06-24T19:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),

-- ── Group C ──────────────────────────────────────────────────
-- Jun 13 6:00 PM ET  = 22:00 UTC
('Group C','Brazil','Morocco','2026-06-13T22:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),
-- Jun 13 9:00 PM ET  = 01:00 UTC Jun 14
('Group C','Haiti','Scotland','2026-06-14T01:00:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
-- Jun 19 6:00 PM ET  = 22:00 UTC
('Group C','Scotland','Morocco','2026-06-19T22:00:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
-- Jun 19 8:30 PM ET  = 00:30 UTC Jun 20
('Group C','Brazil','Haiti','2026-06-20T00:30:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
-- Jun 24 6:00 PM ET  = 22:00 UTC
('Group C','Scotland','Brazil','2026-06-24T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Group C','Morocco','Haiti','2026-06-24T22:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),

-- ── Group D ──────────────────────────────────────────────────
-- Jun 12 9:00 PM ET  = 01:00 UTC Jun 13
('Group D','USA','Paraguay','2026-06-13T01:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Jun 14 12:00 AM ET = 04:00 UTC
('Group D','Australia','Türkiye','2026-06-14T04:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
-- Jun 19 3:00 PM ET  = 19:00 UTC
('Group D','USA','Australia','2026-06-19T19:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
-- Jun 19 11:00 PM ET = 03:00 UTC Jun 20
('Group D','Türkiye','Paraguay','2026-06-20T03:00:00Z','Levi''s Stadium, Santa Clara',NULL,NULL,'upcoming'),
-- Jun 25 10:00 PM ET = 02:00 UTC Jun 26
('Group D','Türkiye','USA','2026-06-26T02:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
('Group D','Paraguay','Australia','2026-06-26T02:00:00Z','Levi''s Stadium, Santa Clara',NULL,NULL,'upcoming'),

-- ── Group E ──────────────────────────────────────────────────
-- Jun 14 1:00 PM ET  = 17:00 UTC
('Group E','Germany','Curaçao','2026-06-14T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
-- Jun 14 7:00 PM ET  = 23:00 UTC
('Group E','Ivory Coast','Ecuador','2026-06-14T23:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
-- Jun 20 4:00 PM ET  = 20:00 UTC
('Group E','Germany','Ivory Coast','2026-06-20T20:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
-- Jun 20 8:00 PM ET  = 00:00 UTC Jun 21
('Group E','Ecuador','Curaçao','2026-06-21T00:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),
-- Jun 25 4:00 PM ET  = 20:00 UTC
('Group E','Curaçao','Ivory Coast','2026-06-25T20:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
('Group E','Ecuador','Germany','2026-06-25T20:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),

-- ── Group F ──────────────────────────────────────────────────
-- Jun 14 4:00 PM ET  = 20:00 UTC
('Group F','Netherlands','Japan','2026-06-14T20:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Jun 14 10:00 PM ET = 02:00 UTC Jun 15
('Group F','Sweden','Tunisia','2026-06-15T02:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),
-- Jun 20 1:00 PM ET  = 17:00 UTC
('Group F','Netherlands','Sweden','2026-06-20T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
-- Jun 21 12:00 AM ET = 04:00 UTC
('Group F','Tunisia','Japan','2026-06-21T04:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),
-- Jun 25 7:00 PM ET  = 23:00 UTC
('Group F','Japan','Sweden','2026-06-25T23:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
('Group F','Tunisia','Netherlands','2026-06-25T23:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),

-- ── Group G ──────────────────────────────────────────────────
-- Jun 15 12:00 PM ET = 16:00 UTC -- note: schedule says 3 PM but Spain is at 12 PM in H; Belgium at 3 PM ET = 19:00 UTC
('Group G','Belgium','Egypt','2026-06-15T19:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
-- Jun 15 9:00 PM ET  = 01:00 UTC Jun 16
('Group G','Iran','New Zealand','2026-06-16T01:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Jun 21 3:00 PM ET  = 19:00 UTC
('Group G','Belgium','Iran','2026-06-21T19:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Jun 21 9:00 PM ET  = 01:00 UTC Jun 22
('Group G','New Zealand','Egypt','2026-06-22T01:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
-- Jun 26 11:00 PM ET = 03:00 UTC Jun 27
('Group G','Egypt','Iran','2026-06-27T03:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
('Group G','New Zealand','Belgium','2026-06-27T03:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),

-- ── Group H ──────────────────────────────────────────────────
-- Jun 15 12:00 PM ET = 16:00 UTC
('Group H','Spain','Cape Verde','2026-06-15T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
-- Jun 15 6:00 PM ET  = 22:00 UTC
('Group H','Saudi Arabia','Uruguay','2026-06-15T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
-- Jun 21 12:00 PM ET = 16:00 UTC
('Group H','Spain','Saudi Arabia','2026-06-21T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
-- Jun 21 6:00 PM ET  = 22:00 UTC
('Group H','Uruguay','Cape Verde','2026-06-21T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
-- Jun 26 8:00 PM ET  = 00:00 UTC Jun 27
('Group H','Cape Verde','Saudi Arabia','2026-06-27T00:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
('Group H','Uruguay','Spain','2026-06-27T00:00:00Z','Estadio Akron, Zapopan',NULL,NULL,'upcoming'),

-- ── Group I ──────────────────────────────────────────────────
-- Jun 16 3:00 PM ET  = 19:00 UTC
('Group I','France','Senegal','2026-06-16T19:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),
-- Jun 16 6:00 PM ET  = 22:00 UTC
('Group I','Iraq','Norway','2026-06-16T22:00:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
-- Jun 22 5:00 PM ET  = 21:00 UTC
('Group I','France','Iraq','2026-06-22T21:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
-- Jun 22 8:00 PM ET  = 00:00 UTC Jun 23
('Group I','Norway','Senegal','2026-06-23T00:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),
-- Jun 26 3:00 PM ET  = 19:00 UTC
('Group I','Norway','France','2026-06-26T19:00:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
('Group I','Senegal','Iraq','2026-06-26T19:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),

-- ── Group J ──────────────────────────────────────────────────
-- Jun 16 9:00 PM ET  = 01:00 UTC Jun 17
('Group J','Argentina','Algeria','2026-06-17T01:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),
-- Jun 17 12:00 AM ET = 04:00 UTC
('Group J','Austria','Jordan','2026-06-17T04:00:00Z','Levi''s Stadium, Santa Clara',NULL,NULL,'upcoming'),
-- Jun 22 1:00 PM ET  = 17:00 UTC
('Group J','Argentina','Austria','2026-06-22T17:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Jun 22 11:00 PM ET = 03:00 UTC Jun 23
('Group J','Jordan','Algeria','2026-06-23T03:00:00Z','Levi''s Stadium, Santa Clara',NULL,NULL,'upcoming'),
-- Jun 27 10:00 PM ET = 02:00 UTC Jun 28
('Group J','Algeria','Austria','2026-06-28T02:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),
('Group J','Jordan','Argentina','2026-06-28T02:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),

-- ── Group K ──────────────────────────────────────────────────
-- Jun 17 1:00 PM ET  = 17:00 UTC
('Group K','Portugal','DR Congo','2026-06-17T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
-- Jun 17 10:00 PM ET = 02:00 UTC Jun 18
('Group K','Uzbekistan','Colombia','2026-06-18T02:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
-- Jun 23 1:00 PM ET  = 17:00 UTC
('Group K','Portugal','Uzbekistan','2026-06-23T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
-- Jun 23 10:00 PM ET = 02:00 UTC Jun 24
('Group K','Colombia','DR Congo','2026-06-24T02:00:00Z','Estadio Akron, Zapopan',NULL,NULL,'upcoming'),
-- Jun 27 7:30 PM ET  = 23:30 UTC
('Group K','Colombia','Portugal','2026-06-27T23:30:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
('Group K','DR Congo','Uzbekistan','2026-06-27T23:30:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),

-- ── Group L ──────────────────────────────────────────────────
-- Jun 17 4:00 PM ET  = 20:00 UTC
('Group L','England','Croatia','2026-06-17T20:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Jun 17 7:00 PM ET  = 23:00 UTC
('Group L','Ghana','Panama','2026-06-17T23:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
-- Jun 23 4:00 PM ET  = 20:00 UTC
('Group L','England','Ghana','2026-06-23T20:00:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
-- Jun 23 7:00 PM ET  = 23:00 UTC
('Group L','Panama','Croatia','2026-06-23T23:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
-- Jun 27 5:00 PM ET  = 21:00 UTC
('Group L','Panama','England','2026-06-27T21:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),
('Group L','Croatia','Ghana','2026-06-27T21:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),

-- ══════════════════════════════════════════════════════════════
-- ROUND OF 32 (June 28 – July 3)
-- ══════════════════════════════════════════════════════════════
-- Sun Jun 28  3:00 PM ET = 19:00 UTC
('Round of 32','TBD','TBD','2026-06-28T19:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Mon Jun 29  1:00 PM ET = 17:00 UTC
('Round of 32','TBD','TBD','2026-06-29T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
-- Mon Jun 29  4:30 PM ET = 20:30 UTC
('Round of 32','TBD','TBD','2026-06-29T20:30:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
-- Mon Jun 29  9:00 PM ET = 01:00 UTC Jul 1
('Round of 32','TBD','TBD','2026-06-30T01:00:00Z','Estadio BBVA, Monterrey',NULL,NULL,'upcoming'),
-- Tue Jun 30  1:00 PM ET = 17:00 UTC
('Round of 32','TBD','TBD','2026-06-30T17:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Tue Jun 30  5:00 PM ET = 21:00 UTC
('Round of 32','TBD','TBD','2026-06-30T21:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),
-- Tue Jun 30  9:00 PM ET = 01:00 UTC Jul 1
('Round of 32','TBD','TBD','2026-07-01T01:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
-- Wed Jul 1  12:00 PM ET = 16:00 UTC
('Round of 32','TBD','TBD','2026-07-01T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
-- Wed Jul 1   4:00 PM ET = 20:00 UTC
('Round of 32','TBD','TBD','2026-07-01T20:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
-- Wed Jul 1   8:00 PM ET = 00:00 UTC Jul 2
('Round of 32','TBD','TBD','2026-07-02T00:00:00Z','Levi''s Stadium, Santa Clara',NULL,NULL,'upcoming'),
-- Thu Jul 2   3:00 PM ET = 19:00 UTC
('Round of 32','TBD','TBD','2026-07-02T19:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Thu Jul 2   7:00 PM ET = 23:00 UTC
('Round of 32','TBD','TBD','2026-07-02T23:00:00Z','BMO Field, Toronto',NULL,NULL,'upcoming'),
-- Thu Jul 2  11:00 PM ET = 03:00 UTC Jul 3
('Round of 32','TBD','TBD','2026-07-03T03:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),
-- Fri Jul 3   2:00 PM ET = 18:00 UTC
('Round of 32','TBD','TBD','2026-07-03T18:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Fri Jul 3   6:00 PM ET = 22:00 UTC
('Round of 32','TBD','TBD','2026-07-03T22:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
-- Fri Jul 3   9:30 PM ET = 01:30 UTC Jul 4
('Round of 32','TBD','TBD','2026-07-04T01:30:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),

-- ══════════════════════════════════════════════════════════════
-- ROUND OF 16 (July 4–7)
-- ══════════════════════════════════════════════════════════════
-- Sat Jul 4  1:00 PM ET = 17:00 UTC
('Round of 16','TBD','TBD','2026-07-04T17:00:00Z','NRG Stadium, Houston',NULL,NULL,'upcoming'),
-- Sat Jul 4  5:00 PM ET = 21:00 UTC
('Round of 16','TBD','TBD','2026-07-04T21:00:00Z','Lincoln Financial Field, Philadelphia',NULL,NULL,'upcoming'),
-- Sun Jul 5  4:00 PM ET = 20:00 UTC
('Round of 16','TBD','TBD','2026-07-05T20:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming'),
-- Sun Jul 5  8:00 PM ET = 00:00 UTC Jul 6
('Round of 16','TBD','TBD','2026-07-06T00:00:00Z','Estadio Azteca, Mexico City',NULL,NULL,'upcoming'),
-- Mon Jul 6  3:00 PM ET = 19:00 UTC
('Round of 16','TBD','TBD','2026-07-06T19:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Mon Jul 6  8:00 PM ET = 00:00 UTC Jul 7
('Round of 16','TBD','TBD','2026-07-07T00:00:00Z','Lumen Field, Seattle',NULL,NULL,'upcoming'),
-- Tue Jul 7 12:00 PM ET = 16:00 UTC
('Round of 16','TBD','TBD','2026-07-07T16:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),
-- Tue Jul 7  4:00 PM ET = 20:00 UTC
('Round of 16','TBD','TBD','2026-07-07T20:00:00Z','BC Place, Vancouver',NULL,NULL,'upcoming'),

-- ══════════════════════════════════════════════════════════════
-- QUARTERFINALS (July 9–11)
-- ══════════════════════════════════════════════════════════════
-- Thu Jul 9  4:00 PM ET = 20:00 UTC
('Quarter-final','TBD','TBD','2026-07-09T20:00:00Z','Gillette Stadium, Foxborough',NULL,NULL,'upcoming'),
-- Fri Jul 10 3:00 PM ET = 19:00 UTC
('Quarter-final','TBD','TBD','2026-07-10T19:00:00Z','SoFi Stadium, Inglewood',NULL,NULL,'upcoming'),
-- Sat Jul 11 5:00 PM ET = 21:00 UTC
('Quarter-final','TBD','TBD','2026-07-11T21:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
-- Sat Jul 11 9:00 PM ET = 01:00 UTC Jul 12
('Quarter-final','TBD','TBD','2026-07-12T01:00:00Z','Arrowhead Stadium, Kansas City',NULL,NULL,'upcoming'),

-- ══════════════════════════════════════════════════════════════
-- SEMIFINALS (July 14–15)
-- ══════════════════════════════════════════════════════════════
-- Tue Jul 14 3:00 PM ET = 19:00 UTC
('Semi-final','TBD','TBD','2026-07-14T19:00:00Z','AT&T Stadium, Arlington',NULL,NULL,'upcoming'),
-- Wed Jul 15 3:00 PM ET = 19:00 UTC
('Semi-final','TBD','TBD','2026-07-15T19:00:00Z','Mercedes-Benz Stadium, Atlanta',NULL,NULL,'upcoming'),

-- ══════════════════════════════════════════════════════════════
-- THIRD PLACE & FINAL
-- ══════════════════════════════════════════════════════════════
-- Sat Jul 18 5:00 PM ET = 21:00 UTC
('Third Place','TBD','TBD','2026-07-18T21:00:00Z','Hard Rock Stadium, Miami',NULL,NULL,'upcoming'),
-- Sun Jul 19 3:00 PM ET = 19:00 UTC
('Final','TBD','TBD','2026-07-19T19:00:00Z','MetLife Stadium, East Rutherford',NULL,NULL,'upcoming');
