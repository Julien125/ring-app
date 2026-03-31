# Ring Workout App — Product Plan

> Replace the paper. Capture the numbers. Show the progress.

---

## Context

Julian is an intermediate gymnast training 3×/week at an outdoor calisthenics park. He currently follows his pull workout from a hand-written table (columns = supersets, rows = exercises, colour-coded by category). The problem: no rep tracking, no way to know if he's progressing. He trains with chalk (magnesium) on his hands — direct constraint on touch interface design.

**Sessions:** Mon/Fri push · Wed pull  
**Program:** 4-week periodised block (2× strength → 1× hypertrophy → 1× deload)  
**Source of truth:** `ring_pull_4week_program.xlsx`

---

## Core jobs to be done

1. **Replace the paper** — show the full session structure at a glance
2. **Capture the numbers** — log reps (or seconds for holds) per set with minimal friction
3. **Show progress** — did I improve vs last week?

Everything else is secondary to this loop.

---

## Design constraints

| Constraint | Impact |
|---|---|
| Android + Chrome PWA | Full-screen via manifest, background timer via Web Workers, Add to Home Screen |
| Chalk on hands | Large tap targets (min 48px Android baseline), well-separated buttons, no precision gestures |
| Outdoor / bright sun | High contrast, dark theme, large type |
| Phone nearby throughout session | Log immediately after set — rest timer starts after logging |
| Mental model = paper table | Overview screen mirrors superset column structure |
| Timed holds mixed with rep sets | Two logging modes: stepper (reps) and stopwatch (holds) |

---

## Screens

### 1. Overview (the paper)
- Three columns, one per superset — mirrors the paper format
- Each column: superset letter + label, round dots (●●○), exercise list with category dots
- Completed exercises greyed out, current exercise highlighted
- Single CTA: **Resume** or **Start session**
- Purpose: glanceable map of the whole session — you know where you are without reading

### 2. Active exercise
- Exercise name: very large (28px+ Unbounded), readable at arm's length
- Category tag + three metric chips: target reps, tempo cue, rest duration
- Set tracker: pills showing logged reps for each set (done / current / upcoming)
- Short coaching note in a subtle inset — not prominent, just there
- Rep logger: large stepper buttons (−  N  +), defaults to target number
- For **hold exercises**: stopwatch mode replaces stepper (tap start → tap stop)
- Primary action: **Done — start rest** (full-width, high contrast)
- Secondary action: skip exercise (small, bottom)

### 3. Rest timer
- Full-screen takeover — nothing to read or decide
- Circular countdown ring, large timer numeral
- Shows: exercise just completed + reps logged / next exercise + target
- Two actions only: **Skip rest** · **+15s**
- If timer overshoots: goes negative in muted red, no forced action
- Progress strip: where are we in the superset sequence

### 4. Session summary
- Headline stats: duration · sets · PRs
- Per-exercise log: exercise name · sets × actual reps/seconds · badge (PR / ✓ / ↓ below target)
- Mini chart: same exercise across sessions — the one visual that answers "am I progressing?"
- Auto-saves after 5s, no required action

---

## User flow

### Starting a session
```
Home → see week + phase + next superset → tap Start
→ 3s countdown → Superset A, Exercise 1
```
- App tracks session count, auto-selects correct week template
- If partial session saved: offer Resume or Start fresh

### In-session loop (three nested)

**Inner — single exercise:**
```
Show exercise → log reps/hold → tap Done
```

**Middle — superset round:**
```
After Done:
  Last exercise? No  → intra-rest (20–30s) → next exercise
  Last exercise? Yes → last round? No  → between-round rest (90–120s) → back to ex 1
                       last round? Yes → outer loop
```

**Outer — superset sequence:**
```
Last superset? No  → 10s buffer → load next superset
Last superset? Yes → session complete
```

### Post-session
```
Summary screen → auto-save → Home, week counter advances
```
Only full sessions advance the week counter. Partial sessions save as-is.

---

## Edge cases

| Scenario | Behaviour |
|---|---|
| Quit mid-session | Save partial log. Offer resume on next open. |
| Skip exercise | Log as `—` (skipped). Sequence continues. Flagged in summary. |
| Screen lock during rest | Timer continues in background. On unlock: remaining time or "rest ended Xs ago — ready when you are." |
| Rest overshoot | Timer goes negative in muted red. No alert. User taps when ready. |
| App crash | State written after every Done tap. Restores to last completed exercise on reopen. |
| Hold: forgot to stop stopwatch | Gentle haptic + dim pulse after 3× target. No auto-stop. |
| First session | No PRs, no chart. Just raw numbers. Chart appears from session 2. |
| Week repeat needed | Manual override in settings. Doesn't reset log. |
| Wrong rep count logged | No validation. Edit from log view. Trust the user. |

---

## Week auto-advance logic

```
Session 1 → Week 1 (Strength I)
Session 2 → Week 2 (Strength II)   ← same template, push for more reps
Session 3 → Week 3 (Hypertrophy)   ← 4 rounds, higher reps, no skill holds
Session 4 → Week 4 (Deload)        ← 2 rounds, ~50% load
Session 5 → new block begins
```
Manual override in Settings: "Repeat this week."

---

## Open decisions

- [ ] **Inter-superset rest**: structured timer or user-taps-when-ready? Leaning toward user-controlled (gymnastics work, different recovery needs between supersets).
- [ ] **Hold exercise logging**: tap-start / tap-stop stopwatch, or manual entry after the fact?
- [ ] **Progress chart scope**: per-exercise only, or a session-level view too?
- [ ] **Data persistence**: local-only first, or sync to somewhere from day one?
- [ ] **Phase for the app**: PWA on Android (Chrome → Add to Home Screen). Better PWA support than iOS — full-screen, background timers reliable, no App Store needed. ✅ Decision made.

---

## What's not in scope (yet)

- Video demos
- Social / sharing
- Custom program builder
- Notifications / reminders
- Warm-up tracking

---

## Assets

- `ring_pull_4week_program.xlsx` — source programme, 4 tabs
- `ring_app_sketch.html` — interactive screen sketches (4 screens)

---

*Last updated: March 2026*
