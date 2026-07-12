-- ============================================================
-- 2026 WC Knockout Results — paste into Supabase SQL Editor
-- ============================================================

-- ── Quarter-finals (finish the 2 remaining) ──────────────────
UPDATE matches SET home_team='Norway',    away_team='England',      home_score=1, away_score=2, status='finished' WHERE id=308;
UPDATE matches SET home_team='Argentina', away_team='Switzerland',  home_score=3, away_score=1, status='finished' WHERE id=309;

-- ── Semi-finals (set teams) ───────────────────────────────────
UPDATE matches SET home_team='France',  away_team='Spain',      status='upcoming' WHERE id=310;
UPDATE matches SET home_team='England', away_team='Argentina',  status='upcoming' WHERE id=311;
