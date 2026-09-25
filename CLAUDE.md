# Ring Workout App — Claude Context File

The Ring Workout PWA (Android/Chrome) — the **hands of the Body OS**: Julian logs sessions, steps and cross-training here. Served from GitHub Pages (`max-age=600`), remote `Julien125/ring-app`, branch `main`.

**Front door (decisions, status, roadmap):** vault `085_Area/Body/Body OS.md`. Data brain + program designer: `~/Documents/Body_Analysis/` (see its `CLAUDE.MD`). This file holds only how the app works.

**Last updated:** 2026-09-15

## Design constraints
Chalk on hands (large tap targets, no precision gestures) and outdoor bright sun (high contrast, dark theme). Original product brief: `RING_APP_PLAN.md` — its 3×/week schedule and xlsx source are historical; the program is now generated monthly.

## Files

| Path | What |
|---|---|
| `index.html` · `app.js` · `sw.js` · `ring-app.css` · `timer-worker.js` | the app |
| `data/program.js` | re-export shim — `EX`, `SKILL_PROGRESSIONS`, `VOLUME`/`PHASES`, `SESSIONS`/`FLEX_SESSIONS`/`HYPERTROPHY_SESSIONS` |
| `data/sessions.js` | **written by the Body OS monthly pass** (Stage 3) |
| `data/exercises.js` | the exercise database (`EX`) |
| `data/skills.js` · `data/phases.js` | skill progressions · volume zones (the 10-week `PHASES` mesocycle is **retired** since v70, 2026-09-25 — Body OS is the master; the app applies no phase multipliers, no deload) |
| `EXERCISES.md` | exercises by session |
| `EXERCISES_ENRICHED.md` | **generated** from `exercises.js` — regenerate, never hand-edit |

## Release rule — bump ALL THREE whenever `app.js` changes
`sw.js` is network-first, but that does **not** make a bump optional (2026-09-09: the phone served the old build for hours).
1. `index.html` → `./app.js?v=N` (an unchanged URL is never refetched)
2. `sw.js` → `const CACHE = 'ring-app-vN'` (activate() only purges caches whose key differs)
3. `app.js` → `APP_VERSION` (shown on the home screen — the only way to tell which build a device runs)

Changes under `data/` need no query bump, but the SW cache name should still move.

## Exercise database rules (`data/exercises.js`)
- Every entry carries 5 selection fields the Designer queries: `pattern` (movement quadrant) · `arm` (straight | bent | n/a) · `track` (skill | strength | hypertrophy) · `feeds` (OG2 ladders it develops) · `tissue_load` (high | moderate | low — connective-tissue cost, not muscular difficulty). Taxonomy stays separate from programming logic.
- `muscles` use anatomical slugs. **Every slug must exist in `MUSCLE_LABEL`, `MUSCLE_CAT` and `MUSCLE_STRETCHES` in `app.js`** — `MUSCLE_CAT[m] || 'push'` silently counts a missing slug as PUSH volume.
- `hip-flexors` → `core`, not `legs` (Julian's call: in calisthenics hip flexion is compression work).
- The muscle tally recomputes from logs at read time, so a vocabulary change shifts historical readouts.

## `data/sessions.js` rules
- Regenerating it must **preserve every non-`SESSIONS` export verbatim** — dropping `FLEX_SESSIONS` or `HYPERTROPHY_SESSIONS` is a fatal module error that kills the whole app (2026-09-07).
- Keep `targetReps` parseable — string ranges like `'12-15'` produced NaN (fixed `3b6627b`).

## Data flow
`state` (`log`, `skillLevels`, `otherActivities[]`, `steps[]`, `protein[]`, `homeSkills[]`) → `buildBackupPayload()` → GitHub Gist → Body_Analysis `data/ring_app_export.json`.

## Body OS lead-measure capture (v68, 2026-09-15)
- **Protein** — home-screen yes/no, `state.protein = [{date, hit, loggedAt}]`, one per local day, latest wins (160 g target).
- **Pain tap** — summary screen after every session: `entry.pain = {level: 'none'|'niggle'|'stop', sites: [...]}`. Read-only history shows it.
- **Handstand at home** (temporary, until the handstand is good) — on sessions whose `skills` include `handstand`, the skill screen offers "Handstand block at home today": sets `A.skillsAtHome`, skips superset A (only if `rings: 'none'`). The home-screen "🏠 Handstand block" dialog lists the block and logs `state.homeSkills = [{date, sessionId, skills}]`, which marks that day's session `skillsDone: true`. Log entries carry `skillsAtHome` + `skillsWhere: 'home'|'park'`.
- Dates use `fmtLocal()` (local day). Note: the older steps/activity dialog uses `_todayKey()` = UTC date, so a step log between 00:00 and 02:00 local lands on the previous day.

## Git
- The **unattended** monthly pass auto-applies `sessions.js` and pushes when its gate passes.
- **Interactive sessions commit but never push** — Julian pushes.
- Other Claude sessions edit this repo — stage explicit paths.
