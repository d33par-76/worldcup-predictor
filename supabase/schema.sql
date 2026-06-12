-- 2026 World Cup Predictor — Supabase Schema
-- Run this in your Supabase SQL Editor

create table if not exists matches (
  id          serial primary key,
  stage       text not null,
  home_team   text not null,
  away_team   text not null,
  match_date  timestamptz not null,
  venue       text,
  home_score  int,
  away_score  int,
  status      text not null default 'upcoming' check (status in ('upcoming','live','finished'))
);

create table if not exists predictions (
  id                serial primary key,
  user_name         text not null,
  match_id          int not null references matches(id) on delete cascade,
  predicted_winner  text not null check (predicted_winner in ('home','away','draw')),
  points            int,
  created_at        timestamptz not null default now(),
  unique (user_name, match_id)
);

-- Indexes for fast leaderboard queries
create index if not exists idx_predictions_user on predictions(user_name);
create index if not exists idx_predictions_match on predictions(match_id);

-- Row-Level Security: allow anyone to read, insert, and update their own predictions
alter table matches enable row level security;
alter table predictions enable row level security;

create policy "matches_read" on matches for select using (true);
-- Only service role (admin) can update matches
create policy "matches_admin_write" on matches for all using (auth.role() = 'service_role');

create policy "predictions_read" on predictions for select using (true);
create policy "predictions_insert" on predictions for insert with check (true);
create policy "predictions_update_own" on predictions for update using (true);
