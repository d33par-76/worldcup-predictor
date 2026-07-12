-- ============================================================
-- 2026 WC Knockout Results — paste into Supabase SQL Editor
-- Updates R32, R16, QF scores + SF team names
-- ============================================================

-- ── Round of 32 ──────────────────────────────────────────────
UPDATE matches SET home_team='South Africa', away_team='Canada',               home_score=0, away_score=1, status='finished' WHERE id=73;
UPDATE matches SET home_team='Brazil',       away_team='Japan',                home_score=2, away_score=1, status='finished' WHERE id=74;
UPDATE matches SET home_team='Germany',      away_team='Paraguay',             home_score=1, away_score=1, status='finished' WHERE id=75; -- Paraguay won on pens
UPDATE matches SET home_team='Netherlands',  away_team='Morocco',              home_score=1, away_score=1, status='finished' WHERE id=76; -- Morocco won on pens
UPDATE matches SET home_team='Ivory Coast',  away_team='Norway',               home_score=1, away_score=2, status='finished' WHERE id=77;
UPDATE matches SET home_team='France',       away_team='Sweden',               home_score=3, away_score=0, status='finished' WHERE id=78;
UPDATE matches SET home_team='Mexico',       away_team='Ecuador',              home_score=2, away_score=0, status='finished' WHERE id=79;
UPDATE matches SET home_team='England',      away_team='DR Congo',             home_score=2, away_score=1, status='finished' WHERE id=80;
UPDATE matches SET home_team='Belgium',      away_team='Senegal',              home_score=3, away_score=2, status='finished' WHERE id=81;
UPDATE matches SET home_team='USA',          away_team='Bosnia & Herzegovina', home_score=2, away_score=0, status='finished' WHERE id=82;
UPDATE matches SET home_team='Spain',        away_team='Austria',              home_score=3, away_score=0, status='finished' WHERE id=83;
UPDATE matches SET home_team='Portugal',     away_team='Croatia',              home_score=2, away_score=1, status='finished' WHERE id=84;
UPDATE matches SET home_team='Switzerland',  away_team='Algeria',              home_score=2, away_score=0, status='finished' WHERE id=85;
UPDATE matches SET home_team='Australia',    away_team='Egypt',                home_score=1, away_score=1, status='finished' WHERE id=86; -- Egypt won on pens
UPDATE matches SET home_team='Argentina',    away_team='Cape Verde',           home_score=3, away_score=2, status='finished' WHERE id=87;
UPDATE matches SET home_team='Colombia',     away_team='Ghana',                home_score=1, away_score=0, status='finished' WHERE id=88;

-- ── Round of 16 ──────────────────────────────────────────────
UPDATE matches SET home_team='Morocco',     away_team='Canada',    home_score=3, away_score=0, status='finished', venue='NRG Stadium, Houston'                    WHERE id=89;
UPDATE matches SET home_team='France',      away_team='Paraguay',  home_score=1, away_score=0, status='finished', venue='Lincoln Financial Field, Philadelphia'    WHERE id=90;
UPDATE matches SET home_team='Norway',      away_team='Brazil',    home_score=2, away_score=1, status='finished', venue='MetLife Stadium, East Rutherford'         WHERE id=91;
UPDATE matches SET home_team='England',     away_team='Mexico',    home_score=3, away_score=2, status='finished', venue='Estadio Azteca, Mexico City'              WHERE id=92;
UPDATE matches SET home_team='Spain',       away_team='Portugal',  home_score=1, away_score=0, status='finished', venue='AT&T Stadium, Dallas'                    WHERE id=93;
UPDATE matches SET home_team='Belgium',     away_team='USA',       home_score=4, away_score=1, status='finished', venue='Lumen Field, Seattle'                    WHERE id=94;
UPDATE matches SET home_team='Argentina',   away_team='Egypt',     home_score=3, away_score=2, status='finished', venue='Mercedes-Benz Stadium, Atlanta'          WHERE id=95;
UPDATE matches SET home_team='Switzerland', away_team='Colombia',  home_score=0, away_score=0, status='finished', venue='BC Place, Vancouver'                     WHERE id=96; -- Switzerland won 4-3 on pens

-- ── Quarter-finals ───────────────────────────────────────────
UPDATE matches SET home_team='France',    away_team='Morocco',      home_score=2, away_score=0, status='finished' WHERE id=97;
UPDATE matches SET home_team='Spain',     away_team='Belgium',      home_score=2, away_score=1, status='finished' WHERE id=98;
UPDATE matches SET home_team='England',   away_team='Norway',       home_score=2, away_score=1, status='finished' WHERE id=99;
UPDATE matches SET home_team='Argentina', away_team='Switzerland',  home_score=3, away_score=1, status='finished' WHERE id=100;

-- ── Semi-finals (teams known, upcoming) ──────────────────────
UPDATE matches SET home_team='France',   away_team='Spain',      status='upcoming' WHERE id=101;
UPDATE matches SET home_team='England',  away_team='Argentina',  status='upcoming' WHERE id=102;
