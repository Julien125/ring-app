import { EX } from './exercises.js';

// ─── Warmups (copied verbatim from data/sessions.js) ───────

const WARMUP_PUSH = [
  { name: '90/90 breathing',               duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Wrist circles + shoulder CARs', duration: '2 min',  note: 'Joint prep' },
  { name: 'Lateral band walk',             duration: '2×15',   note: 'Glute med — prevents knee valgus in pistol' },
  { name: 'Tibialis raise',                duration: '2×20',   note: 'Anterior shin — balances Achilles load' },
];

const WARMUP_PULL_WED = [
  { name: '90/90 breathing',             duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Dead hang',                    duration: '3×30s',  note: 'Grip + shoulder decompression' },
  { name: 'German Hang',                  duration: '2×20s',  note: 'Back lever shoulder prep — rotate slowly into position, exit with control' },
  { name: 'Cat-cow + thoracic rotation',  duration: '2 min',  note: 'Spinal mobility before hinging' },
];

const WARMUP_PULL_SAT = [
  { name: '90/90 breathing',  duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Dead hang',         duration: '3×30s',  note: 'Grip + shoulder decompression' },
  { name: 'German Hang',       duration: '2×20s',  note: 'Back lever shoulder prep — rotate slowly into position, exit with control' },
  { name: 'Band pull-aparts',  duration: '2×20',   note: 'Rear delt activation' },
];

// ─── Cooldowns (copied verbatim from data/sessions.js) ─────

const COOLDOWN_PUSH = [
  { name: 'Cat-cow',                        breaths: '8 breaths',        note: 'Full ROM each direction, sync with breath',              cue: 'Exhale to round, inhale to arch' },
  { name: 'Thread the needle',              breaths: '5 breaths/side',   note: 'Thoracic rotation, upper back opening',                  cue: null },
  { name: 'Ring / doorframe chest stretch', breaths: '8 breaths/side',   note: 'Pec minor + anterior capsule — critical after pressing', cue: 'Arms at 90°, lean into the stretch' },
  { name: 'Down dog — pedal heels',         breaths: '6 breaths',        note: 'Hamstrings, calves, Achilles',                           cue: 'Long spine, hips high' },
  { name: 'Low lunge → Apollo',             breaths: '6 breaths/side',   note: 'Deep hip flexor, arms overhead, soft backbend',          cue: 'Sink the hips, lift the heart' },
  { name: 'Cobra',                          breaths: '5 breaths',        note: 'Anterior spine — elbows soft, thoracic extension',       cue: 'Chest forward first, then up' },
  { name: 'Supine butterfly',               breaths: '8 breaths',        note: 'Lie on back, soles together, knees drop open. Gravity does the work — no pressure on the knees.', cue: 'Every exhale the inner thighs release' },
  { name: "Child's pose + lat reach",       breaths: '6 breaths/side',   note: 'Lat decompression — arm extended, sit back toward heel', cue: null },
  { name: 'Pigeon pose',                    breaths: '8 breaths/side',   note: 'Hip rotators and glute med',                             cue: 'Melt the front hip toward the floor' },
  { name: 'Seated forward fold',            breaths: '8 breaths',        note: 'Hamstrings, erectors — lead with the chest',             cue: null },
  { name: 'Supine spinal twist',            breaths: '5 breaths/side',   note: 'Thoracic rotation and QL release',                       cue: 'Hips one way, gaze the other' },
  { name: 'Savasana',                       breaths: '2 min',            note: 'Full integration — let the session settle',              cue: null },
];

const COOLDOWN_PULL = [
  { name: 'Cat-cow',                 breaths: '8 breaths',       note: 'Full ROM each direction, sync with breath',         cue: 'Exhale to round, inhale to arch' },
  { name: 'Thread the needle',       breaths: '5 breaths/side',  note: 'Thoracic rotation, upper back opening',             cue: null },
  { name: 'Seated lat side stretch', breaths: '6 breaths/side',  note: 'Lat and oblique — arm overhead, lean away',         cue: "Long spine, don't collapse" },
  { name: 'Down dog — pedal heels',  breaths: '6 breaths',       note: 'Hamstrings, calves, Achilles',                      cue: 'Long spine, hips high' },
  { name: 'Low lunge → Apollo',      breaths: '6 breaths/side',  note: 'Deep hip flexor, arms overhead, soft backbend',     cue: 'Sink the hips, lift the heart' },
  { name: 'Cobra',                   breaths: '5 breaths',       note: 'Anterior spine — elbows soft, thoracic extension',  cue: 'Chest forward first, then up' },
  { name: 'Supine butterfly',         breaths: '8 breaths',       note: 'Lie on back, soles together, knees drop open. Gravity does the work — no pressure on the knees.', cue: 'Every exhale the inner thighs release' },
  { name: "Child's pose — wide",     breaths: '6 breaths',       note: 'Full posterior decompression after pulling volume', cue: null },
  { name: 'Pigeon pose',             breaths: '8 breaths/side',  note: 'Hip rotators and glute med',                        cue: 'Melt the front hip toward the floor' },
  { name: 'Seated forward fold',     breaths: '8 breaths',       note: 'Hamstrings, erectors — lead with the chest',        cue: null },
  { name: 'Supine spinal twist',     breaths: '5 breaths/side',  note: 'Thoracic rotation and QL release',                  cue: 'Hips one way, gaze the other' },
  { name: 'Savasana',                breaths: '2 min',           note: 'Full integration — let the session settle',         cue: null },
];

// ─── Sessions — Monthly Designer Program (2026-09-08) ──────
// 4-track model: Skill (fresh, first) -> Strength (chosen to feed the pushed
// skill) -> Hypertrophy (circumference laggards: arm/shoulder/serratus + legs)
// -> Core Finisher (2-move V-ab). Skill focus: Handstand (push) + Muscle-up
// (pull) + Manna (core); Front Lever maintained; Shoulderstand-Press (Fri) is
// Julian's add. Overload = Last Set to Failure (per-exercise schemes in notes).

// ─── SESSIONS — regenerated by the Body OS Designer 2026-09-08 ───
// PROPOSAL ONLY. Every other export below is copied verbatim from sessions.js.
export const SESSIONS = [
  {
    id: 'mon-push-designer',
    day: 'Monday', weekday: 1,
    type: 'push', label: 'Push — Handstand & Width',
    focus: 'Skill (Handstand) + Push strength + Delt width + Legs + Core',
    skills: ['handstand'],
    warmup: WARMUP_PUSH,
    supersets: [
      {
        id: 'A', label: 'Skill (fresh, first) (6 rounds)', rings: 'none', rounds: 6,
        restIntra: 60, restRound: 90,
        exercises: [
          { ...EX['chest-wall-handstand'], note: '60s-method @ ~50% max hold — L1 Wall HS — the current cell. Fresh, first, quality over fatigue' },
        ],
      },
      {
        id: 'B', label: 'Skill (fresh, first) (3 rounds)', rings: 'none', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['wall-kick-up'], note: '3 x 12, same lead leg every rep — entry mechanics toward Free HS (L4)', targetReps: 12 },
          { ...EX['planche-lean'], note: '3 x 15s, maximum protraction — upper back rounded, shoulders past the wrists — SERRATUS standing priority, upgraded from the banded scapular push-up to a max-leverage isometric. NOTE: planche-lean feeds PLANCHE only, not handstand — it is justified here by the standing serratus rule, not by skill-feeding. The handstand-feeding protraction work is preserved as Planche Protraction on Friday (feeds planche + handstand). tissue_load HIGH + straight arm — takes the 3rd and final weekly slot.' },
        ],
      },
      {
        id: 'C', label: 'Strength — feeds the pushed skills (LSTF) (5 rounds)', rings: 'none', rounds: 5,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['hspu'], note: '4-4-4-4-X (last to failure) — current max 5 -> m-1 = 4; feeds handstand + shoulderstand-press; advance if last >= first+2', targetReps: 4 },
        ],
      },
      {
        id: 'D', label: 'Strength — feeds the pushed skills (LSTF) (4 rounds)', rings: 'mid', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['ring-dip-deep'], note: '4-4-4-X (last to failure) — current max 5 -> 4; feeds muscle-up (the dip out of the transition)', targetReps: 4 },
        ],
      },
      {
        id: 'E', label: 'Hypertrophy — patch what the skills miss (4 rounds)', rings: 'none', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['lateral-raise'], note: '4 x 12-15, last sets to failure — shoulder -13.5% laggard; lateral-delt is NOT in the skill-overlap set', targetReps: '12-15' },
        ],
      },
      {
        id: 'F', label: 'Hypertrophy — patch what the skills miss (3 rounds)', rings: 'none', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['bulgarian-split-squat'], note: '3 x 10-12, last set to failure — hips -11% laggard; legs uncovered by ring skills', targetReps: '10-12' },
        ],
      },
      {
        id: 'G', label: 'Core Finisher — V-ab', rings: 'bar', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['hanging-leg-raise'], note: '3 x 10-15, to failure — Core Finisher — lower rectus', targetReps: '10-15' },
          { ...EX['hanging-oblique-twist'], note: '3 x 10 per side — Core Finisher — oblique', targetReps: '10/side' },
        ],
      },
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'wed-pull-designer',
    day: 'Wednesday', weekday: 3,
    type: 'pull', label: 'Pull — Muscle-up & Manna',
    focus: 'Skill (Muscle-up) + Pull strength + Arm/rear-delt + Manna core',
    skills: ['muscle-up', 'manna'],
    warmup: WARMUP_PULL_WED,
    supersets: [
      {
        id: 'A', label: 'Skill (fresh, first) (5 rounds)', rings: 'mid', rounds: 5,
        restIntra: 60, restRound: 90,
        exercises: [
          { ...EX['muscle-up-negative'], note: '5 x 3, 5-8s descent — L2 MU Negatives — the current cell. Control the elbow-past-chest moment', targetReps: 3 },
        ],
      },
      {
        id: 'B', label: 'Skill (fresh, first) (4 rounds)', rings: 'mid', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['false-grip-dead-hang'], note: '60s-method — wrist conditioning for the MU. HIGH tissue_load + straight arm — 1 of the 3 weekly slots' },
        ],
      },
      {
        id: 'C', label: 'Strength — feeds the pushed skills (LSTF) (5 rounds)', rings: 'bar', rounds: 5,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['chest-to-bar'], note: '6-6-6-6-X (last to failure) — current max 7 -> 6; the explosive pull that feeds the muscle-up', targetReps: 6 },
        ],
      },
      {
        id: 'D', label: 'Strength — feeds the pushed skills (LSTF) (4 rounds)', rings: 'low', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['row'], note: '8-8-8-X (last to failure) — current max 9 -> 8; feeds muscle-up + front-lever; horizontal-pull volume', targetReps: 8 },
        ],
      },
      {
        id: 'E', label: 'Hypertrophy — patch what the skills miss', rings: 'low', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['ring-hammer-curl'], note: '3 x 10-12, last set to failure — arm -24%, the WORST laggard. Chosen over a supinated curl because brachialis is NOT in the skill-overlap set while biceps is', targetReps: '10-12' },
          { ...EX['face-pull'], note: '3 x 12-15 — shoulder laggard via lateral/rear delt + pressing health', targetReps: '12-15' },
          { ...EX['nordic-curl'], note: '3 x 7, slow eccentric — hips -11%; at_best benchmark, hold it. HIGH tissue (eccentric) but not straight-arm', targetReps: 7 },
        ],
      },
      {
        id: 'F', label: 'Core / compression (5 rounds)', rings: 'none', rounds: 5,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['v-sit-pulse'], note: '60s-method at end range — L6 45-deg V-Sit — the manna cell. counts_as_core', targetReps: 'hold' },
        ],
      },
      {
        id: 'G', label: 'Core / compression (3 rounds)', rings: 'none', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['butt-lift'], note: '3 x 8, 1-2s hold at top — manna support — L-sit compression lift. counts_as_core, so NO separate Core Finisher today', targetReps: 8 },
        ],
      },
    ],
    cooldown: COOLDOWN_PULL,
  },
  {
    id: 'fri-push-designer',
    day: 'Friday', weekday: 5,
    type: 'push', label: 'Push — Handstand 2 & Traps',
    focus: 'Skill (Handstand 2) + Push accessory + Traps + Legs + Core',
    skills: ['handstand'],
    warmup: WARMUP_PUSH,
    supersets: [
      {
        id: 'A', label: 'Skill (fresh, first) (4 rounds)', rings: 'none', rounds: 4,
        restIntra: 60, restRound: 90,
        exercises: [
          { ...EX['back-wall-handstand'], note: '60s-method, minimal wall contact — the freestanding bridge toward Free HS (L4)' },
          { ...EX['shoulderpress-negative'], note: '4 x 3, 5s descent — trains the press line despite the formal L5 cell being gated behind a free HS', targetReps: 3 },
        ],
      },
      {
        id: 'B', label: 'Skill (fresh, first) (3 rounds)', rings: 'none', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['toe-pulls'], note: '3 x 12 — balance-correction reflex — the actual gate on a free handstand', targetReps: 12 },
          { ...EX['planche-protraction'], note: '3 x 10-12, 2s hold at max protraction — SERRATUS standing priority; horizontal-push quadrant volume', targetReps: '10-12' },
        ],
      },
      {
        id: 'C', label: 'Strength — feeds the pushed skills (LSTF)', rings: 'none', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['pike-push-up'], note: '8-8-8-X (last to failure) — overhead-press pattern feeding handstand + shoulderstand-press', targetReps: 8 },
        ],
      },
      {
        id: 'D', label: 'Hypertrophy — patch what the skills miss', rings: 'mid', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['ring-support-shrug'], note: '3 x 12-15, 1s hold at top — neck -10.7% laggard via traps; traps are NOT in the skill-overlap set', targetReps: '12-15' },
          { ...EX['tyi-raise'], note: '3 x 10, 3-5s per position — lower trap + rear delt; adds horizontal-pull volume on a push day to fight the 2.6:1 push skew', targetReps: 10 },
          { ...EX['pistol-squat'], note: '3 x 9, full depth — current 10 vs best 30 — the biggest benchmark gap in the set; hips laggard', targetReps: 9 },
        ],
      },
      {
        id: 'E', label: 'Core Finisher — V-ab', rings: 'none', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['dragon-flag'], note: '4-4-4-X (last to failure) — current max 5 -> 4; Core Finisher lower-rectus AND feeds manna + front-lever', targetReps: 4 },
          { ...EX['side-bend'], note: '4 x 12-15 per side — Core Finisher — oblique. 4 sets to match Dragon Flag so the finisher stays ONE superset block (the two-core-move contract is per block, not per day)', targetReps: '12-15' },
        ],
      },
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'sat-pull-designer',
    day: 'Saturday', weekday: 6,
    type: 'pull', label: 'Pull — Muscle-up 2 & FL',
    focus: 'Skill (Muscle-up 2 + FL maintain) + Pull strength + Traps + Core',
    skills: ['muscle-up', 'front-lever'],
    warmup: WARMUP_PULL_SAT,
    supersets: [
      {
        id: 'A', label: 'Skill (fresh, first)', rings: 'mid', rounds: 3,
        restIntra: 60, restRound: 90,
        exercises: [
          { ...EX['rto-support-hold'], note: '60s-method — the MU lockout position — own the top' },
          { ...EX['front-lever-hold'], note: '3 x 5s, maintenance only — do not chase — L9 Full FL held, not pushed. HIGH tissue_load + straight arm — 2 of the 3 weekly slots' },
        ],
      },
      {
        id: 'B', label: 'Strength — feeds the pushed skills (LSTF)', rings: 'mid', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['ring-mid-pull-up-hold'], note: '60s-method at the sticking point — the bent-arm isometric under the muscle-up transition' },
          { ...EX['archer-pull-up'], note: '5-5-5-X (last to failure) — unilateral lat strength feeding the muscle-up', targetReps: 5 },
          { ...EX['false-grip-row'], note: '6-6-6-X (last to failure) — false-grip conditioning at a horizontal angle — less demanding than a hang, so the wrist gets the focus', targetReps: 6 },
        ],
      },
      {
        id: 'C', label: 'Hypertrophy — patch what the skills miss', rings: 'low', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['feet-elevated-row'], note: '3 x 10, 1s retraction hold — traps primary — neck laggard; more horizontal-pull volume', targetReps: 10 },
          { ...EX['single-leg-glute-bridge'], note: '3 x 12, pause at top — hips -11% laggard, glute isolation', targetReps: 12 },
        ],
      },
      {
        id: 'D', label: 'Core Finisher — V-ab', rings: 'none', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['dragon-flag-tuck'], note: '3 x 6, 5s eccentric — Core Finisher — lower rectus. Swapped in for L-sit: L-sit is track=skill (a manna ladder cell), and the Core Finisher slot needs a hypertrophy-track move', targetReps: 6 },
          { ...EX['windshield-wipers'], note: '3 x 7 — Core Finisher — oblique; current 8 vs best 12', targetReps: 7 },
        ],
      },
    ],
    cooldown: COOLDOWN_PULL,
  },
];

export const FLEX_SESSIONS = [
  {
    id:    'flex-lower',
    label: 'Lower Body Opening',
    focus: 'Pancake · Front split · Hip flexors',
    duration: '~45 min',
    poses: [
      { name: 'Diaphragmatic breathing',       duration: '2 min',   note: 'Wide stance, hands on ribs. Exhale fully — let the pelvic floor drop.', cue: 'Every exhale, release deeper' },
      { name: 'Supported squat to parallel',    duration: '2 min',   note: 'Hold a ring strap or post for support. Go only to 90° or your pain-free limit — do not sink past it.', cue: 'Heels down, knees track over toes' },
      { name: 'Butterfly forward fold',        duration: '2 min',   note: 'Soles together, hinge from hips not waist. Hands forward on floor.', cue: 'Don\'t round the lower back' },
      { name: 'Seated straddle — center',      duration: '3 min',   note: 'Sit tall first, then hinge forward. Place forearms on floor if possible.', cue: 'Push floor away with sit bones' },
      { name: 'Straddle — left side',          duration: '90s',     note: 'Turn chest toward left leg. Reach forearms to shin.', cue: null },
      { name: 'Straddle — right side',         duration: '90s',     note: 'Turn chest toward right leg. Reach forearms to shin.', cue: null },
      { name: 'Elephant walks × 15',           duration: '2 min',   note: 'Standing straddle, alternately bend each knee. Active pancake loading.', cue: 'Stay heavy in the hips' },
      { name: 'Seated straddle — center',      duration: '3 min',   note: 'Second pass — you\'ll go deeper now. Chest to floor if possible.', cue: 'Breathe into the inner thighs' },
      { name: 'Low lunge — left',              duration: '2 min',   note: 'Back knee down. Drive hips forward and down. Arms overhead to deepen.', cue: 'Tuck the tailbone slightly' },
      { name: 'Low lunge — right',             duration: '2 min',   note: 'Same. Notice your tighter side — stay longer there.', cue: null },
      { name: 'Half split — left',             duration: '90s',     note: 'Front leg straight, hinge at hips. Flex foot.', cue: 'Don\'t lock the knee' },
      { name: 'Half split — right',            duration: '90s',     note: null, cue: null },
      { name: 'Standing forward fold',         duration: '2 min',   note: 'Feet hip-width. Bend knees slightly, then slowly straighten. Grip elbows overhead.', cue: 'Nod the head, release neck' },
      { name: 'Front split — left (supported)', duration: '2 min',  note: 'Use blocks or fists under hips. Go to your edge, not past it.', cue: 'Square the hips to the front' },
      { name: 'Front split — right (supported)', duration: '2 min', note: null, cue: null },
      { name: 'Supine twist — left / right',   duration: '60s/side', note: 'Knees stacked, arms out. Let gravity do the work.', cue: 'Exhale to rotate deeper' },
      { name: 'Savasana',                      duration: '3 min',   note: 'Wide legs, arms out, palms up. Let everything go.', cue: null },
    ],
  },
  {
    id:    'flex-deep',
    label: 'Deep Opening',
    focus: 'Leg behind head · Bridge · Pelvic floor',
    duration: '~45 min',
    poses: [
      { name: 'Diaphragmatic breathing',         duration: '3 min',   note: 'Lie on back, knees bent. 10 slow breaths — feel the pelvic floor descend on exhale.', cue: 'Release, don\'t push' },
      { name: 'Happy baby',                      duration: '2 min',   note: 'Grab outer feet. Rock gently. This releases the deepest part of the pelvic floor.', cue: 'Let the tailbone be heavy' },
      { name: 'Supine hip ER — left',             duration: '2 min',   note: 'Lie on back, let left knee drop out to the side. Foot near hip — no ankle on opposite knee. Pure hip rotation, no knee stress.', cue: 'Exhale — hip opens without forcing' },
      { name: 'Supine hip ER — right',            duration: '2 min',   note: 'Stay longer on your tighter side.', cue: null },
      { name: 'Sleeping pigeon — left',          duration: '3 min',   note: 'The most important pose for leg behind head. Front shin parallel to mat. Hips square.', cue: 'Exhale — hip melts toward floor' },
      { name: 'Sleeping pigeon — right',         duration: '3 min',   note: 'Stay longer on your tighter side.', cue: null },
      { name: 'Hip ER active hold — left',        duration: '90s',     note: 'Same supine position, gently press knee toward floor using hip rotators only. No hand pressure on the knee.', cue: 'Use the muscle, not gravity' },
      { name: 'Hip ER active hold — right',       duration: '90s',     note: null, cue: null },
      { name: 'Thoracic extension over roll',    duration: '2 min',   note: 'Rolled blanket/mat under mid-back (not lower back). Arms overhead. Let chest drop.', cue: 'The bottleneck for bridge' },
      { name: 'Thread the needle — left / right', duration: '60s/side', note: 'On all fours. Thread arm under body for thoracic rotation.', cue: null },
      { name: 'Camel — hands to sacrum',         duration: '90s',     note: 'Kneel, hands at lower back. Hinge back from the hips. Chin up.', cue: 'Don\'t crunch the lower back' },
      { name: 'Bridge hold × 5',                 duration: '10s/rep', note: 'Feet hip-width, push through heels. Work toward straight arms.', cue: 'Press chest toward the wall behind you' },
      { name: 'Full bridge attempt',             duration: '3 holds', note: 'Walk hands closer to feet each time. Straight arms is the goal.', cue: 'Look at the floor between hands' },
      { name: 'Child\'s pose — wide knees',      duration: '2 min',   note: 'Decompress after back bending. Breathe into the lower back.', cue: null },
      { name: 'Plow or supported shoulder stand', duration: '2 min',  note: 'Optional — spinal decompression. Exit slowly.', cue: null },
      { name: 'Supine twist — left / right',     duration: '60s/side', note: null, cue: null },
      { name: 'Wide-legged savasana',            duration: '3 min',   note: 'Legs wide, hands on belly. Feel the work integrate.', cue: 'Pelvic floor heavy and soft' },
    ],
  },
  {
    id:    'flex-knee',
    label: 'Knee Care',
    focus: 'VMO · IT band · Calf · Hip flexor',
    duration: '~30 min',
    poses: [
      { name: 'Diaphragmatic breathing',      duration: '2 min',    note: 'Lie on back, knees bent. Let the pelvic floor release on each exhale.', cue: 'Soften the jaw, soften the knees' },
      { name: 'Ankle circles + dorsiflexion', duration: '90s/side', note: 'Foot against wall or strap. Ankle stiffness compensates at the knee — address it first.', cue: 'Drive the knee forward without lifting the heel' },
      { name: 'Supine hamstring stretch',     duration: '2 min/side', note: 'Towel or strap around arch, leg straight. No forcing — let the hip hinge.', cue: 'Flex the foot, release the back of the knee' },
      { name: 'Prone quad stretch',           duration: '90s/side', note: 'Lie face down, bring heel toward glute only to your pain-free limit. No forcing past discomfort.', cue: 'Keep the hips flat — do not let the hip hike' },
      { name: 'Supine IT band stretch',       duration: '90s/side', note: 'Supine, cross straight leg over body. Knee stays extended — no ankle-on-knee lever.', cue: 'Let gravity pull the leg down, don\'t push' },
      { name: 'Supine hip ER hold',           duration: '2 min/side', note: 'Knee drops out to the side, foot near hip — no ankle on opposite knee. Replaces figure-4.', cue: 'Exhale — the hip rotates open' },
      { name: 'Calf stretch — gastroc',       duration: '90s/side', note: 'Straight leg against wall or step. Full stretch from heel through ankle.', cue: 'Heel into the floor, push the wall away' },
      { name: 'Calf stretch — soleus',        duration: '90s/side', note: 'Same position but bend the knee gently — targets the deeper soleus. Stay within comfort.', cue: 'Soft knee, heavy heel' },
      { name: 'Tall kneeling hip flexor',     duration: '2 min/side', note: 'Kneeling lunge, upright torso. Do NOT raise arms overhead — keeps back knee load light.', cue: 'Tuck the tailbone, feel the front of the hip open' },
      { name: 'Short arc quads × 15',         duration: '2 sets',   note: 'Seated, roll under the knee. Straighten only the last 30° — VMO activation, no deep flexion.', cue: 'Squeeze hard at the top, lower slowly' },
      { name: 'Terminal knee extension × 15', duration: '2 sets',   note: 'Stand with band behind knee. Micro-bend → full extension. Trains VMO to stabilize the joint.', cue: 'Push the knee back through the band' },
      { name: 'Supine spinal twist',          duration: '60s/side', note: 'Knees stacked and together — no twist at the knee joint itself.', cue: 'Hips one way, gaze the other' },
      { name: 'Savasana',                     duration: '3 min',    note: 'Legs slightly apart, arms relaxed. Let the knees fully release.', cue: null },
    ],
  },
  {
    id:    'flex-bridge',
    label: 'Bridge & Pelvic Floor',
    focus: 'Full bridge · Pelvic floor release · Men\'s longevity',
    duration: '~35 min',
    poses: [
      { name: 'Diaphragmatic breathing',           duration: '3 min',    note: 'Lie on back, knees bent. 10 slow breaths — on each exhale feel the pelvic floor drop and release. This is the practice.', cue: 'Don\'t push — just release' },
      { name: 'Constructive rest',                 duration: '3 min',    note: 'Knees bent, feet flat, let the knees drop gently outward. Completely passive — pelvic floor releases under gravity.', cue: 'Every exhale, the floor gets heavier' },
      { name: 'Happy baby',                        duration: '2 min',    note: 'Grab outer feet, rock gently side to side. The deepest passive release for the pelvic floor.', cue: 'Let the tailbone be heavy' },
      { name: 'Supported squat hold',             duration: '2 min',    note: 'Hold a ring strap. Go only to your pain-free knee depth. The natural pelvic floor release position.', cue: 'Exhale — let the pelvic floor open' },
      { name: 'Reverse kegel awareness × 10',     duration: '2 min',    note: 'Sitting or lying. Inhale → gently push out and down as if starting to urinate. Hold 3s, release. Most men are too tight, not too weak.', cue: 'Release is the skill — not squeeze' },
      { name: 'Thoracic extension over roll',     duration: '2 min',    note: 'Rolled blanket or mat under mid-back (T5–T8, NOT lower back). Arms overhead. Let the chest drop open.', cue: 'The #1 bottleneck for full bridge' },
      { name: 'Wrist prep — extension + circles', duration: '2 min',    note: 'Hands on floor fingers-back, gently shift weight forward. Then full wrist circles. Bridge demands full wrist extension.', cue: 'Go slow — don\'t force the range' },
      { name: 'Shoulder opener — floor',          duration: '2 min',    note: 'Lie on belly, one arm out at 90°, roll onto it gently. Or: arms overhead on floor, push chest down.', cue: 'Chest toward the floor, not the arm' },
      { name: 'Bridge hold × 5',                  duration: '10s/rep',  note: 'Feet hip-width, push through heels. Lift as high as comfortable — arms straight is the goal, not required today.', cue: 'Press the chest toward the wall behind you' },
      { name: 'Full bridge attempt',              duration: '3 holds',  note: 'Walk hands closer to feet each attempt. Straight arms is the goal. No rush — this takes months.', cue: 'Look at the floor between your hands' },
      { name: 'Child\'s pose — wide knees',       duration: '2 min',    note: 'Decompress the spine after back bending. Breathe into the lower back and sacrum.', cue: null },
      { name: 'Supine hip ER hold',               duration: '90s/side', note: 'Knee drops out, foot near hip. Pelvic floor release continues here.', cue: 'Exhale — let the hip be heavy' },
      { name: 'Supine spinal twist',              duration: '60s/side', note: 'Knees stacked. Final spinal decompression.', cue: 'Hips one way, gaze the other' },
      { name: 'Wide-legged savasana',             duration: '3 min',    note: 'Legs wide, hands on belly. Feel the pelvic floor completely at rest.', cue: 'Pelvic floor heavy and soft' },
    ],
  },
];

// ─── Sessions ─────────────────────────────────────────────

// The existing superset model maps directly: restIntra = rest between the two
// exercises in the pair; restRound = rest before repeating the pair.

export const HYPERTROPHY_SESSIONS = [
  {
    id: 'mon-push1-hyp', day: 'Monday', weekday: 1,
    type: 'push', label: 'Push 1', focus: 'APT Correction · Vertical Press · Trap Density',
    skills: ['handstand', 'planche'],
    warmup: [
      { name: '90/90 breathing',         duration: '3 min',  note: 'Ribcage depression — IAP' },
      { name: 'Banded PPT Glute Bridge', duration: '2×15',   note: '3s hold at top · glute squeeze to turn off hip flexors' },
      { name: 'Hollow Body Rock',        duration: '2×30s',  note: 'Lower back flat into floor' },
      { name: 'Scapular Push-Ups',       duration: '2×12',   note: 'Serratus anterior activation' },
    ],
    supersets: [
      { id: 'A', label: 'Pair A — Vertical Press & Legs',     rings: 'none', rounds: 4, restIntra: 75, restRound: 75,
        exercises: [EX['hspu'], { ...EX['bulgarian-split-squat'], note: 'Glute squeeze on back leg · upright torso · stretch hip flexors' }] },
      { id: 'B', label: 'Pair B — Pectoral & Trap Density',   rings: 'high', rounds: 4, restIntra: 60, restRound: 60,
        exercises: [EX['ring-dip-deep'], EX['scapular-pull-up']] },
      { id: 'C', label: 'Pair C — Anti-Extension & Triceps',  rings: 'none', rounds: 3, restIntra: 60, restRound: 60,
        exercises: [EX['dragon-flag-tuck'], EX['ring-overhead-ext']] },
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'wed-pull1-hyp', day: 'Wednesday', weekday: 3,
    type: 'pull', label: 'Pull 1', focus: 'Lat Width · Hamstring · Mid-Back Thickness',
    skills: ['iron-cross', 'back-lever'],
    warmup: [
      { name: '90/90 breathing',  duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
      { name: 'Dead Hang',         duration: '3×30s',  note: 'Grip + shoulder decompression' },
      { name: 'German Hang',       duration: '2×20s',  note: 'Back lever shoulder prep — rotate slowly, exit with control' },
      { name: 'Band Pull-Aparts',  duration: '2×20',   note: 'Mid-trap and rhomboid squeeze' },
    ],
    supersets: [
      { id: 'A', label: 'Pair A — Unilateral Lat & Hamstring',  rings: 'high', rounds: 4, restIntra: 75, restRound: 75,
        exercises: [EX['archer-pull-up'], { ...EX['nordic-curl'], note: '5s eccentric · push off floor to return' }] },
      { id: 'B', label: 'Pair B — Horizontal Pull & Upper Back', rings: 'mid',  rounds: 4, restIntra: 60, restRound: 60,
        exercises: [EX['feet-elevated-row'], EX['tyi-raise']] },
      { id: 'C', label: 'Pair C — Arm Isolation & Core',         rings: 'mid',  rounds: 3, restIntra: 60, restRound: 60,
        exercises: [EX['pelican-curl'], EX['hanging-leg-raise']] },
    ],
    cooldown: COOLDOWN_PULL,
  },
  {
    id: 'fri-push2-hyp', day: 'Friday', weekday: 5,
    type: 'push', label: 'Push 2', focus: 'Horizontal Levers · RTO Press · Trap Trajectory',
    skills: ['handstand', 'muscle-up', 'manna'],
    warmup: [
      { name: 'Hollow Body Rock',       duration: '2×45s', note: 'Establishes core position needed for push-ups' },
      { name: 'Scapular Push-Up (Band)', duration: '2×15',  note: 'Serratus anterior — stabilize shoulder blades' },
    ],
    supersets: [
      { id: 'A', label: 'Pair A — Leverage Press & Quad Depth',    rings: 'none', rounds: 4, restIntra: 75, restRound: 75,
        exercises: [EX['pseudo-planche-push-up'], { ...EX['pistol-squat'], note: '3s descent · full depth · PPT throughout' }] },
      { id: 'B', label: 'Pair B — Chest Volume & Trap Trajectory', rings: 'mid',  rounds: 4, restIntra: 60, restRound: 60,
        exercises: [EX['push-up-rto'], { ...EX['face-pull'], note: '2s isometric hold at peak · squeeze upper + mid traps' }] },
      { id: 'C', label: 'Pair C — Fly · Core · Oblique', rings: 'bar',  rounds: 3, restIntra: 60, restRound: 60,
        exercises: [EX['ring-fly'], { ...EX['ab-wheel-rollout'], note: 'Posterior pelvic tilt throughout · stop before back dips' }, EX['hanging-oblique-twist']] },
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'sat-pull2-hyp', day: 'Saturday', weekday: 6,
    type: 'pull', label: 'Pull 2', focus: 'Explosive Width · Upper Arm Thickness',
    skills: ['muscle-up', 'back-lever'],
    warmup: [
      { name: 'Dead Hang + Active Scapular Shrugs',  duration: '3×10',  note: 'Depress fully at bottom, retract at top' },
      { name: 'Band Pull-Aparts (Overhead Diagonal)', duration: '2×15', note: 'Activates lower and upper traps' },
    ],
    supersets: [
      { id: 'A', label: 'Pair A — Lever Density & Posterior Hinge', rings: 'high', rounds: 4, restIntra: 75, restRound: 75,
        exercises: [EX['inverted-deadlift'], { ...EX['single-leg-deadlift'], note: 'Band under foot · push hips back — APT counterbalance' }] },
      { id: 'B', label: 'Pair B — Explosive Width & Direct Trap',   rings: 'high', rounds: 4, restIntra: 60, restRound: 60,
        exercises: [EX['chest-to-bar'], EX['ring-support-shrug']] },
      { id: 'C', label: 'Pair C — Arm & Core Integration',          rings: 'bar',  rounds: 3, restIntra: 60, restRound: 60,
        exercises: [EX['ring-hammer-curl'], { ...EX['windshield-wipers'], note: 'Knees bent 90° — APT safe · rotate under full control' }] },
    ],
    cooldown: COOLDOWN_PULL,
  },
];
