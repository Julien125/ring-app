# Ring App — Wireframe Screens

> Companion to `RING_APP_PLAN.md` and `ring-app.css`
> 13 screens total · Priority 1 = core loop · Priority 2 = edge cases · Priority 3 = context & progress

---

## How to read this file

Each screen entry covers:
- **Purpose** — the one job this screen does
- **Entry point** — what brings the user here
- **Key elements** — what must be visible
- **Interactions** — what the user can tap
- **Exit points** — where the user goes next
- **Design notes** — constraints, decisions, open questions

---

## Priority 1 — Core loop (build these first)

These 7 screens cover the complete happy path from arriving at the park to saving the session.

---

### S-01 · Home / Today

**Purpose:** One-glance summary of what's happening today. Single entry point into a session.

**Entry point:** App open, no session in progress.

**Key elements:**
- Day + date (large)
- Phase tag — `Week 1 · Strength I` or `Week 3 · Hypertrophy`
- Session label — `Wednesday Pull` / `Monday Push`
- Session structure summary — `Warm-up · Skills · Legs · 3 supersets · Flex`
- CTA button — `Start session` or `Resume session B` if partial save exists
- Bottom tab bar — Plan / Live / Log

**Interactions:**
- Tap `Start session` → S-02 Session overview
- Tap `Resume session` → S-02 at last saved position
- Tap `Plan` tab → (out of scope for proto)
- Tap `Log` tab → S-13 Progress view

**Design notes:**
- No choices to make on this screen. Day and session are auto-determined.
- If rest day: show recovery message, no CTA.
- Phase colour tints the header subtly — Strength = neutral, Hypertrophy = green tint, Deload = purple tint.

---

### S-02 · Session overview

**Purpose:** The paper replacement. Shows the full session structure at a glance — where you are, what's done, what's coming.

**Entry point:** S-01 Start / Resume.

**Key elements:**
- Screen title — session name (`Wednesday Pull 1`)
- Phase + week tag
- Section tabs or scroll — `Warm-up · Skills · Legs · Workout · Flex`
  - For proto: show Workout section only (3 superset columns)
- 3 superset columns side by side:
  - Column header: superset letter (A / B / C) + short name
  - Round dots: ●●○ showing completed rounds
  - Exercise list: dot colour + name + target reps
  - States: done (greyed) / current (highlighted) / upcoming (normal)
- Resume / Start button (full-width, bottom)

**Interactions:**
- Tap `Start / Resume` → S-03 Active exercise (reps mode) or S-04 (hold mode)
- Tap a superset column → jump to that superset (confirm dialog if mid-session)

**Design notes:**
- This is the mental model anchor. Must feel like the paper table.
- Columns are read-only during a session — no editing here.
- Round dots are the fastest way to track "how far am I?"

---

### S-03 · Active exercise — reps mode

**Purpose:** The primary logging screen for rep-based exercises. All information needed, nothing extra.

**Entry point:** S-02 Start, or rest timer ending.

**Key elements:**
- Breadcrumb — `Superset B · Round 2/3 · Ex 3/6`
- Progress dots — 6 dots, states: done / current / upcoming
- Category tag — e.g. `Pelican`
- Exercise name — very large (`Unbounded 28px 900`)
- 3 metric chips — target reps / tempo cue / rest duration
- Set tracker pills — one pill per set, shows logged reps for done sets
- Coaching note — subtle, inset, one line
- Rep logger — label + stepper (− val +), default = target reps
- Primary CTA — `Done — start rest` (full-width)
- Ghost action — `skip exercise`

**Interactions:**
- Tap `−` / `+` → adjust rep count
- Tap `Done — start rest` → log reps, go to S-05 (intra-rest) or S-06 (between-round rest)
- Tap `skip exercise` → S-07 skip confirmation dialog
- Tap breadcrumb → S-02 overview (confirm exit)

**Design notes:**
- Stepper buttons minimum 56px — chalk hands.
- Rep count defaults to target. A perfect set = one tap on Done.
- Coaching note should never push the Done button below the fold.
- Set pills update live as sets are completed — gives progress feedback.

---

### S-04 · Active exercise — hold / timed mode

**Purpose:** Same as S-03 but for exercises measured in seconds, not reps. L-sit, hollow body, planche lean, front lever, Superman hold, iron cross, back lever, manna.

**Entry point:** Same as S-03, triggered when `exercise.type === 'timed'` or `'holds'`.

**Key elements:**
- All same as S-03 except the rep logger is replaced by:
  - Target display — `aim: 30s`
  - Large stopwatch numeral — `0:00`
  - Two buttons: `Start` (begins counting) and `Stop` (logs the time)
  - After stop: logged seconds shown, Done becomes active
- For hold exercises (planche lean, front lever): shows hold count instead of total seconds — `Hold 2 of 4`

**Interactions:**
- Tap `Start` → timer begins, button becomes `Stop`
- Tap `Stop` → logs elapsed seconds, enables Done
- Tap `Done — start rest` → same as S-03

**Design notes:**
- Timer starts at 0:00, counts up. Target shown as ghost/reference — not a countdown.
- User may start and stop multiple times per set (e.g. failed at 12s, tried again). Log the last value, or the best? Decision needed.
- For holds (5–8s): simpler — show hold counter (1/4, 2/4…), tap start/stop for each hold, rest auto-starts after target holds done.

---

### S-05 · Intra-rest timer

**Purpose:** Short rest between exercises within a superset (20–30s). Full-screen to prevent accidental taps.

**Entry point:** Tapping Done on S-03 or S-04, when the next exercise is in the same superset.

**Key elements:**
- Circular countdown ring (SVG) — colour matches category of the exercise just done
- Large timer numeral — counts down
- `rest` label
- "Just done" summary — exercise name + reps logged
- Round pill — `Round 2 / 3`
- `Up next` label + next exercise name + target
- Two action buttons: `Skip rest` · `+15s`
- Progress strip — 6 segments, shows position in superset

**Interactions:**
- Timer reaches 0 → auto-advance to S-03 / S-04 (next exercise)
- Tap `Skip rest` → immediately go to next exercise
- Tap `+15s` → add 15 seconds to remaining time
- Timer overshoots 0 → numeral goes negative in `--danger` red, stays on screen, user taps `Start next` when ready

**Design notes:**
- No back navigation during rest — intentional.
- "Up next" is the primary focus — user's brain should be preparing, not reading.
- Overshoot state: timer reads `–0:04` etc. No alert, no buzz. Just visual indicator. User controls when to move.

---

### S-06 · Between-round rest timer

**Purpose:** Longer rest between rounds of the same superset (90–120s). Functionally the same as S-05 but with more time and different context label.

**Entry point:** Tapping Done on the last exercise of a superset round, when more rounds remain.

**Key elements:**
- Same layout as S-05
- Timer starts at 90s (SS A/B) or 120s (SS C)
- Context label — `Round 2 complete · 1 more round`
- `Up next` shows the first exercise of the superset again (round restart)
- Same Skip / +15s buttons

**Interactions:** Identical to S-05.

**Design notes:**
- Separate screen from S-05 to allow different default durations.
- "Up next" showing the first exercise again (not a new one) is the key difference — user knows a full round is starting.
- Consider: show mini round summary during this rest? (e.g. "Set 1: 7 reps → Set 2: 6 reps"). Low priority.

---

### S-07 · Session summary

**Purpose:** Post-session wrap-up. Answers "how did I do?" and saves the session.

**Entry point:** Completing the last exercise of the last superset.

**Key elements:**
- "Session complete" eyebrow
- Day + date + week (large)
- Phase tag
- 3 stat cards — duration / sets / PRs
- Section label — `Superset B — logged` (or full session)
- Log rows — one per exercise: dot / name / sets×reps (or seconds) / badge (PR / ✓ / ↓)
- Mini chart — one exercise (e.g. strict pull-up), bars = avg reps per session, spans the block
- Auto-saves after 5s — no required action
- Bottom tab bar

**Interactions:**
- Scroll to see all exercises
- Tap a log row → expand to see per-set breakdown
- Tap an exercise in the chart → switch to that exercise's chart
- Tab bar: `Log` → S-13 full progress view

**Design notes:**
- PRs in `--cat-shoulder` (amber/gold), on-target in `--cat-core` (teal), miss in `--cat-lowback` (orange-red).
- Auto-save is silent. No "saved!" toast. Just saves.
- First session: no chart, no PRs. Just raw numbers. Chart appears from session 2.
- Partial sessions show `Partial — 2 of 3 supersets`. Doesn't advance week counter.

---

## Priority 2 — Edge cases

These screens handle the moments where something goes off-script. Needed before testing with a real user.

---

### S-08 · Skill block screen

**Purpose:** Gateway between warm-up and the workout. The PDF shows skills (planche, iron cross, back lever, muscle up, etc.) come before the main supersets. The app needs to acknowledge this block exists even if it doesn't guide through it step by step.

**Entry point:** S-02 Session overview, before tapping "Start workout."

**Key elements:**
- Section label — `Skills block`
- Skill focus of the day — e.g. `Iron cross · Back lever`
- Brief description — 1 line each
- Two options:
  - `Log skills done` → marks skills as complete, advances to workout
  - `Skip skills today` → skips, goes straight to workout

**Interactions:**
- Tap `Log skills done` → S-02 (workout section now active)
- Tap `Skip skills today` → S-02 (workout section active, skills marked as skipped)

**Design notes:**
- Skills are not rep-tracked in the proto — too complex for first version. This screen is a checkpoint, not a guide.
- Expand later: tap a skill to see the hold duration / superset details from the PDF.
- Open question: should skill quality be logged here (e.g. "felt good / struggled")? Useful for tracking.

---

### S-09 · Quit mid-session dialog

**Purpose:** Prevent accidental session loss. Confirm intent before exiting.

**Entry point:** Tapping back/close during an active session.

**Key elements:**
- Bottom sheet or modal overlay
- Title — `End session?`
- Body — `Progress saved up to Superset B, exercise 3.`
- Two actions:
  - `Save and exit` (primary)
  - `Keep going` (secondary, dismisses sheet)

**Interactions:**
- Tap `Save and exit` → partial session saved → S-01 Home (shows "Resume session" CTA)
- Tap `Keep going` → dismiss, return to current screen
- Tap backdrop → dismiss (same as Keep going)

**Design notes:**
- No "discard" option in the proto — always save. Discard can be added in settings later.
- Sheet should not obscure the session state behind it.

---

### S-10 · Skip exercise confirmation

**Purpose:** Intentional friction to prevent accidental skips with chalky hands.

**Entry point:** Tapping `skip exercise` ghost button on S-03 / S-04.

**Key elements:**
- Small bottom sheet (not full modal)
- `Skip [exercise name]?`
- Two buttons: `Skip` (secondary) · `Cancel` (primary)
- Logged as `—` in the session summary

**Interactions:**
- Tap `Skip` → exercise logged as skipped, advance to rest timer
- Tap `Cancel` → dismiss, return to active exercise screen

**Design notes:**
- Primary button is Cancel — default to "don't skip." Reversal of the usual primary/secondary hierarchy, intentional.
- Sheet appears from bottom, 200ms ease. Tap backdrop = cancel.

---

### S-11 · Rest overshoot state

**Purpose:** Communicate clearly that rest has ended without forcing action.

**Entry point:** Rest timer reaches 0:00, user hasn't tapped Skip or started moving.

**Key elements:**
- Same layout as S-05 / S-06
- Timer numeral changes to negative (`–0:04`, `–0:09`…) in `--danger` red
- Timer label changes from `rest` to `overtime`
- `Skip rest` button changes to `Start next exercise` (same position, more explicit label)
- `+15s` button disappears

**Interactions:**
- Tap `Start next exercise` → S-03 / S-04 next exercise
- Timer continues counting up negatively — no auto-advance, no buzz

**Design notes:**
- This is a visual state change on S-05 / S-06, not a separate screen per se. Included here because it requires explicit design decisions.
- No haptic in the proto — add in production.

---

## Priority 3 — Context & progression

These screens provide context and motivation. Not needed for the core loop but important for retention.

---

### S-12 · Weekly program view

**Purpose:** Show the full week at a glance — all four days, their session types, and completion status. Answers "what did I do this week?"

**Entry point:** `Plan` tab in the bottom bar.

**Key elements:**
- Week header — `Week 1 · Strength I`
- 4 day cards (Mon / Wed / Thu / Sat):
  - Day + session name — `Monday · Push 1`
  - Focus tags — `Anterior legs · Lateral core`
  - Status — upcoming / complete / partial / rest
  - Completion badge if done — duration + sets
- Phase progress bar — Week 1 of 4

**Interactions:**
- Tap a day card → S-02 for that session (or summary if completed)
- Phase progress bar is read-only

**Design notes:**
- This screen uses the full `full_week_workout.pdf` as its data source.
- For the proto: static data is fine. Dynamic auto-advance logic comes later.
- Open question: does this screen replace or complement S-01 Home? May merge into one.

---

### S-13 · Progress view — single exercise

**Purpose:** The one question that matters: am I improving? Shows rep/time history for a single exercise across sessions.

**Entry point:** `Log` tab in bottom bar, or tapping an exercise row in S-07 summary.

**Key elements:**
- Exercise selector — dropdown or swipeable header
- Chart — horizontal bars, x-axis = session number, y-axis = avg reps or seconds
- Per-session detail below the chart:
  - Date + week
  - Sets logged — `7 · 6 · 7`
  - Badge if PR
- Empty state for first session

**Interactions:**
- Swipe or tap to switch exercise
- Tap a bar → expand session detail

**Design notes:**
- Chart spans the 4-week block, not just one week. That's the unit of measurement.
- Two data types: reps (most exercises) and seconds (holds). Chart switches label automatically.
- Do not show all exercises at once — one exercise at a time, focused.
- PRs highlighted in `--cat-shoulder` amber on the bar.

---

## Screen count summary

| Priority | Screen | ID |
|---|---|---|
| 1 | Home / Today | S-01 |
| 1 | Session overview | S-02 |
| 1 | Active — reps mode | S-03 |
| 1 | Active — hold/timed mode | S-04 |
| 1 | Intra-rest timer | S-05 |
| 1 | Between-round rest timer | S-06 |
| 1 | Session summary | S-07 |
| 2 | Skill block screen | S-08 |
| 2 | Quit mid-session dialog | S-09 |
| 2 | Skip exercise confirmation | S-10 |
| 2 | Rest overshoot state | S-11 |
| 3 | Weekly program view | S-12 |
| 3 | Progress view | S-13 |

**Start with S-01 through S-07.** If those feel right on the phone, add S-08 through S-11. S-12 and S-13 can wait until the core loop is validated.

---

## What's explicitly out of scope for the wireframe

- Warm-up screen (S-WU) — checklist of 90/90 breathing, dead hang, CARs. Reference only, no tracking.
- Flexibility screen (S-FLEX) — guided breathing cues from the PDF. Passive content, not interactive.
- Settings screen — week override, manual session selection.
- Onboarding / import flow.

These exist in the product but don't need wireframes before the core loop is tested.

---

## Assets

- `ring_app_sketch.html` — interactive sketch of S-02, S-03, S-05, S-07
- `ring-app.css` — full design system, use for all new wireframe screens
- `ring_pull_4week_program.xlsx` — workout data source
- `full_week_workout.pdf` — full program data (all 4 sessions)
- `RING_APP_PLAN.md` — product plan, design decisions, open questions

---

*Last updated: March 2026*
