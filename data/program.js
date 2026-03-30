// ─────────────────────────────────────────────────────────
//  Ring App — Program Data
//  All 4 sessions hardcoded from full_week_workout.pdf
// ─────────────────────────────────────────────────────────

// ─── Skill progression ladders ───────────────────────────
// Each skill: goal + ordered progressions
// Sessions reference skills by ID string
// state.skillLevels[id] tracks current level (1-based)

export const SKILL_PROGRESSIONS = {
  'planche': {
    name: 'Planche',
    goal: 'Straight-arm horizontal planche, 5 seconds',
    progressions: [
      { level: 1, drill: 'Planche Lean Hold',       type: 'hold', targetSecs: 30, sets: 4,
        note: 'Fingers back, lean shoulders past wrists. Arms straight, scapulas protracted, posterior pelvic tilt.',
        criteria: 'All 4 sets ≥ 30s' },
      { level: 2, drill: 'Tuck Planche',             type: 'hold', targetSecs: 20, sets: 4,
        note: 'Knees tucked tight to chest, hips level with shoulders. Back rounded.',
        criteria: 'All 4 sets ≥ 20s' },
      { level: 3, drill: 'Advanced Tuck Planche',    type: 'hold', targetSecs: 15, sets: 4,
        note: 'Back flat and parallel to floor — no longer rounded. Knees still tucked.',
        criteria: 'All 4 sets ≥ 15s' },
      { level: 4, drill: 'Straddle Planche',         type: 'hold', targetSecs: 10, sets: 4,
        note: 'Legs straddled wide, body parallel to floor. Full serratus engagement.',
        criteria: 'All 4 sets ≥ 10s' },
      { level: 5, drill: 'Full Planche',             type: 'hold', targetSecs: 5,  sets: 4,
        note: 'Legs together, body completely horizontal, arms locked. Planche achieved.',
        criteria: 'Planche achieved' },
    ],
  },
  'shoulderstand-press': {
    name: 'Shoulderstand Press',
    goal: 'Freestanding pike press to headstand, 3s descent',
    progressions: [
      { level: 1, drill: 'Pike Push-Up to Headstand', type: 'reps', targetReps: 3, sets: 3,
        note: 'Start in pike, bend elbows and lower head to floor between hands. Learn the arm path.',
        criteria: '3 clean reps all sets' },
      { level: 2, drill: 'Tripod to Headstand Press', type: 'reps', targetReps: 5, sets: 3,
        note: 'From tripod headstand, press to full headstand and back. Builds the top range.',
        criteria: '5 clean reps all sets' },
      { level: 3, drill: 'Pike Press to Headstand',   type: 'reps', targetReps: 5, sets: 3,
        note: 'Slow 3s descent. Hips drive high, elbows track back, core braced throughout.',
        criteria: '5 reps with 3s descent all sets' },
      { level: 4, drill: 'Freestanding HS Press',     type: 'reps', targetReps: 3, sets: 3,
        note: 'No wall. From pike, press to freestanding handstand. Skill achieved.',
        criteria: 'Shoulderstand press achieved' },
    ],
  },
  'muscle-up': {
    name: 'Muscle Up',
    goal: 'Clean false grip muscle up, no kip',
    progressions: [
      { level: 1, drill: 'False Grip Dead Hang + RTO Hold', type: 'hold', targetSecs: 20, sets: 4,
        note: 'Wrist draped over the bar, not around it. Shoulders depress fully. Build grip endurance.',
        criteria: 'All 4 sets ≥ 20s stable' },
      { level: 2, drill: 'False Grip C2B + MU Negative 5s', type: 'reps', targetReps: 4, sets: 4,
        note: 'Pull chest to bar with false grip, then lower slowly through the transition — 5s down.',
        criteria: '4 reps all sets with 5s negative' },
      { level: 3, drill: 'Low Transition Drill',      type: 'reps', targetReps: 5, sets: 3,
        note: 'Bar at chest height. Explosive pull, fast hip-driven transition. Clean form only.',
        criteria: '5 clean reps all sets' },
      { level: 4, drill: 'Clean Muscle Up',           type: 'reps', targetReps: 3, sets: 3,
        note: 'No kip. False grip, explosive pull, clean transition, lock out at top. Achieved.',
        criteria: 'Muscle up achieved' },
    ],
  },
  'iron-cross': {
    name: 'Iron Cross',
    goal: 'Full iron cross, arms at 90°, 3 seconds',
    progressions: [
      { level: 1, drill: 'Cross Lean + Support Hold', type: 'hold', targetSecs: 15, sets: 4,
        note: 'Rings at hip height, arms extended out to sides. Engage lats hard — no shrugging.',
        criteria: 'All 4 sets ≥ 15s' },
      { level: 2, drill: 'Wide Support Hold',         type: 'hold', targetSecs: 10, sets: 4,
        note: 'Arms at 45° below horizontal, rings wide. Build lat adductor strength.',
        criteria: 'All 4 sets ≥ 10s' },
      { level: 3, drill: 'Half Cross Hold',           type: 'hold', targetSecs: 8,  sets: 4,
        note: 'Arms at true 90°, rings level with hips. The most demanding position.',
        criteria: 'All 4 sets ≥ 8s' },
      { level: 4, drill: 'Tuck Iron Cross',           type: 'hold', targetSecs: 5,  sets: 4,
        note: 'Knees tucked, arms at 90°. Reduces load slightly to build hold time at this angle.',
        criteria: 'All 4 sets ≥ 5s' },
      { level: 5, drill: 'Full Iron Cross',           type: 'hold', targetSecs: 3,  sets: 3,
        note: 'Legs together, arms at 90°, body vertical. Iron cross achieved.',
        criteria: 'Iron cross achieved' },
    ],
  },
  'back-lever': {
    name: 'Back Lever',
    goal: 'Full back lever, straight body, 10 seconds',
    progressions: [
      { level: 1, drill: 'Skin the Cat',              type: 'reps', targetReps: 5, sets: 3,
        note: 'From hang, pull knees over, pass through inverted hang, return. Slow and fully controlled.',
        criteria: '5 controlled reps all sets' },
      { level: 2, drill: 'Tuck Back Lever',           type: 'hold', targetSecs: 15, sets: 4,
        note: 'From skin the cat, hold tuck back lever position. Push rings down, squeeze glutes.',
        criteria: 'All 4 sets ≥ 15s' },
      { level: 3, drill: 'Straddle Back Lever',       type: 'hold', targetSecs: 10, sets: 4,
        note: 'Legs straddled wide. Body parallel to floor. Squeeze glutes and hamstrings hard.',
        criteria: 'All 4 sets ≥ 10s' },
      { level: 4, drill: 'Full Back Lever',           type: 'hold', targetSecs: 10, sets: 4,
        note: 'Legs together, body parallel to floor, arms straight. Back lever achieved.',
        criteria: 'Back lever achieved' },
    ],
  },
  'manna': {
    name: 'Manna',
    goal: 'Manna hold — legs above horizontal, 5 seconds',
    progressions: [
      { level: 1, drill: 'Seated Hip Compression',   type: 'hold', targetSecs: 20, sets: 4,
        note: 'Seated, hands beside hips, push floor. Compress hip flexors actively. Legs stay grounded.',
        criteria: 'All 4 sets ≥ 20s' },
      { level: 2, drill: 'Manna Lean',               type: 'hold', targetSecs: 15, sets: 4,
        note: 'Push floor, lift hips slightly off ground. Legs straight, toes pointed forward.',
        criteria: 'All 4 sets ≥ 15s' },
      { level: 3, drill: 'Pike Compression Hold',    type: 'hold', targetSecs: 10, sets: 4,
        note: 'Legs at 45° off floor, body leaning back. Extreme hip flexor and wrist demand.',
        criteria: 'All 4 sets ≥ 10s' },
      { level: 4, drill: 'Full Manna',               type: 'hold', targetSecs: 5,  sets: 3,
        note: 'Legs above horizontal, body near vertical. Manna achieved.',
        criteria: 'Manna achieved' },
    ],
  },
  'ring-handstand': {
    name: 'Ring Handstand',
    goal: 'Freestanding ring handstand, 10 seconds, arms locked',
    progressions: [
      { level: 1, drill: 'Ring Support Hold (RTO)',   type: 'hold', targetSecs: 30, sets: 4,
        note: 'In support position, turn rings out hard. Arms locked, shoulders depressed. Hold perfectly still.',
        criteria: 'All 4 sets ≥ 30s, rings not wobbling' },
      { level: 2, drill: 'Wall Ring Handstand',       type: 'hold', targetSecs: 20, sets: 4,
        note: 'Feet lightly on wall — barely touching. Learn ring-specific micro-corrections while inverted.',
        criteria: 'All 4 sets ≥ 20s, feet barely touching' },
      { level: 3, drill: 'Chest-to-Wall Ring HS',    type: 'hold', targetSecs: 15, sets: 4,
        note: 'Face away from wall. Hollow body only — arched back means instant bail on rings.',
        criteria: 'All 4 sets ≥ 15s, hollow body' },
      { level: 4, drill: 'Freestanding HS Attempts', type: 'hold', targetSecs: 5,  sets: 5,
        note: 'Short freestanding attempts. Same kick-up every time. You are learning the ring-specific corrections.',
        criteria: 'Consistent 5s+ holds across most attempts' },
      { level: 5, drill: 'Freestanding Ring Handstand', type: 'hold', targetSecs: 10, sets: 3,
        note: 'Ring handstand achieved.',
        criteria: 'Ring handstand achieved' },
    ],
  },
  'front-lever': {
    name: 'Front Lever',
    goal: 'Full front lever, horizontal, arms locked — achieved',
    progressions: [
      { level: 1, drill: 'Tuck Front Lever',          type: 'hold', targetSecs: 10, sets: 4,
        note: 'Knees tucked to chest, arms straight. Body parallel to floor.',
        criteria: 'All 4 sets ≥ 10s' },
      { level: 2, drill: 'Advanced Tuck Front Lever', type: 'hold', targetSecs: 8,  sets: 4,
        note: 'Back flat and parallel to floor — not rounded. Knees still tucked.',
        criteria: 'All 4 sets ≥ 8s' },
      { level: 3, drill: 'One-Leg Front Lever',       type: 'hold', targetSecs: 6,  sets: 4,
        note: 'One leg extended, one tucked. Steps down the leverage progressively.',
        criteria: 'All 4 sets ≥ 6s' },
      { level: 4, drill: 'Straddle Front Lever',      type: 'hold', targetSecs: 5,  sets: 4,
        note: 'Legs straddled wide, body horizontal. Almost full.',
        criteria: 'All 4 sets ≥ 5s' },
      { level: 5, drill: 'Full Front Lever Hold',     type: 'hold', targetSecs: 5,  sets: 2,
        note: 'Achieved. Maintenance only — 2 sets. Stop at first sign of shoulder fatigue.',
        criteria: 'Maintenance — achieved' },
    ],
  },
  'forward-roll': {
    name: 'Forward Roll on Rings',
    goal: 'Controlled forward roll from support to support',
    progressions: [
      { level: 1, drill: 'Spotted Forward Roll',      type: 'reps', targetReps: 3, sets: 3,
        note: 'Tuck chin, hollow body, roll forward slowly. Spotter keeps rings stable.',
        criteria: '3 controlled rolls all sets' },
      { level: 2, drill: 'Slow Solo Forward Roll',    type: 'reps', targetReps: 3, sets: 3,
        note: 'Solo. Stay fully in control — this is not a fall. Return to support clean.',
        criteria: '3 clean solo rolls all sets' },
      { level: 3, drill: 'Forward Roll — Free',       type: 'reps', targetReps: 5, sets: 3,
        note: 'Consistent, controlled, clean entry and exit. Forward roll achieved.',
        criteria: 'Forward roll achieved' },
    ],
  },
  'backward-roll': {
    name: 'Backward Roll on Rings',
    goal: 'Controlled backward roll from hang to hang',
    progressions: [
      { level: 1, drill: 'Skin the Cat to Invert',    type: 'reps', targetReps: 3, sets: 3,
        note: 'From hang, pull knees up and over. Control the descent. Shoulders stay packed.',
        criteria: '3 controlled reps all sets' },
      { level: 2, drill: 'Controlled Backward Roll',  type: 'reps', targetReps: 3, sets: 3,
        note: 'Full backward roll. Control through the transition — no falling through.',
        criteria: '3 clean rolls all sets' },
      { level: 3, drill: 'Backward Roll — Free',      type: 'reps', targetReps: 5, sets: 3,
        note: 'Consistent, controlled, shoulders packed throughout. Backward roll achieved.',
        criteria: 'Backward roll achieved' },
    ],
  },
};

export const VOLUME = {
  isometricFactor: 0.2,
  secondaryFactor: 0.5,
  zones: [
    { min: 0,          max: 39,       label: 'Maintenance',    color: '#888888' },
    { min: 40,         max: 99,       label: 'Strength Focus', color: '#6C7FD8' },
    { min: 100,        max: 199,      label: 'Hypertrophy',    color: '#2BA88A' },
    { min: 200,        max: Infinity, label: 'High Volume',    color: '#E05050' },
  ],
};

// ─── Mesocycle: 10 weeks ─────────────────────────────────
//  Weeks  1–3  Strength I   : base volume, learn the movements
//  Weeks  4–6  Strength II  : same volume, harder execution (tempo, pauses)
//  Weeks  7–9  Hypertrophy  : +25% rounds, +40% reps — volume peak
//  Week   10   Deload       : 60% of working volume, recover without losing gains
// ─────────────────────────────────────────────────────────
export const PHASES = {
  1:  { label: 'Strength I',  phaseWeek: 1, phaseTotalWeeks: 3, roundMult: 1.0,  repMult: 1.0 },
  2:  { label: 'Strength I',  phaseWeek: 2, phaseTotalWeeks: 3, roundMult: 1.0,  repMult: 1.0 },
  3:  { label: 'Strength I',  phaseWeek: 3, phaseTotalWeeks: 3, roundMult: 1.0,  repMult: 1.0 },
  4:  { label: 'Strength II', phaseWeek: 1, phaseTotalWeeks: 3, roundMult: 1.0,  repMult: 0.9 },
  5:  { label: 'Strength II', phaseWeek: 2, phaseTotalWeeks: 3, roundMult: 1.0,  repMult: 0.9 },
  6:  { label: 'Strength II', phaseWeek: 3, phaseTotalWeeks: 3, roundMult: 1.0,  repMult: 0.9 },
  7:  { label: 'Hypertrophy', phaseWeek: 1, phaseTotalWeeks: 3, roundMult: 1.25, repMult: 1.4 },
  8:  { label: 'Hypertrophy', phaseWeek: 2, phaseTotalWeeks: 3, roundMult: 1.25, repMult: 1.4 },
  9:  { label: 'Hypertrophy', phaseWeek: 3, phaseTotalWeeks: 3, roundMult: 1.25, repMult: 1.4 },
  10: { label: 'Deload',      phaseWeek: 1, phaseTotalWeeks: 1, roundMult: 0.6,  repMult: 0.6 },
};

// ─── Warmups ─────────────────────────────────────────────

const WARMUP_PUSH = [
  { name: '90/90 breathing',              duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Wrist circles + shoulder CARs', duration: '2 min',  note: 'Joint prep' },
  { name: 'Lateral band walk',             duration: '2×15',   note: 'Glute med — prevents knee valgus in pistol' },
  { name: 'Tibialis raise',                duration: '2×20',   note: 'Anterior shin — balances Achilles load' },
];

const WARMUP_PULL_WED = [
  { name: '90/90 breathing',              duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Dead hang',                     duration: '3×30s',  note: 'Grip + shoulder decompression' },
  { name: 'German Hang',                   duration: '2×20s',  note: 'Back lever shoulder prep — rotate slowly into position, exit with control' },
  { name: 'Cat-cow + thoracic rotation',   duration: '2 min',  note: 'Spinal mobility before hinging' },
];

const WARMUP_PULL_SAT = [
  { name: '90/90 breathing',  duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Dead hang',         duration: '3×30s',  note: 'Grip + shoulder decompression' },
  { name: 'German Hang',       duration: '2×20s',  note: 'Back lever shoulder prep — rotate slowly into position, exit with control' },
  { name: 'Band pull-aparts',  duration: '2×20',   note: 'Rear delt activation' },
];

// ─── Cooldowns ────────────────────────────────────────────

const COOLDOWN_PUSH = [
  { name: 'Cat-cow',                        breaths: '8 breaths',        note: 'Full ROM each direction, sync with breath',              cue: 'Exhale to round, inhale to arch' },
  { name: 'Thread the needle',              breaths: '5 breaths/side',   note: 'Thoracic rotation, upper back opening',                  cue: null },
  { name: 'Ring / doorframe chest stretch', breaths: '8 breaths/side',   note: 'Pec minor + anterior capsule — critical after pressing', cue: 'Arms at 90°, lean into the stretch' },
  { name: 'Down dog — pedal heels',         breaths: '6 breaths',        note: 'Hamstrings, calves, Achilles',                           cue: 'Long spine, hips high' },
  { name: 'Low lunge → Apollo',             breaths: '6 breaths/side',   note: 'Deep hip flexor, arms overhead, soft backbend',          cue: 'Sink the hips, lift the heart' },
  { name: 'Cobra',                          breaths: '5 breaths',        note: 'Anterior spine — elbows soft, thoracic extension',       cue: 'Chest forward first, then up' },
  { name: 'Frog pose',                      breaths: '10 breaths',       note: 'Inner groin and adductors — hips sink heavy',            cue: 'Every exhale, surrender a little deeper' },
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
  { name: 'Frog pose',               breaths: '10 breaths',      note: 'Inner groin and adductors — hips sink heavy',       cue: 'Every exhale, surrender a little deeper' },
  { name: "Child's pose — wide",     breaths: '6 breaths',       note: 'Full posterior decompression after pulling volume', cue: null },
  { name: 'Pigeon pose',             breaths: '8 breaths/side',  note: 'Hip rotators and glute med',                        cue: 'Melt the front hip toward the floor' },
  { name: 'Seated forward fold',     breaths: '8 breaths',       note: 'Hamstrings, erectors — lead with the chest',        cue: null },
  { name: 'Supine spinal twist',     breaths: '5 breaths/side',  note: 'Thoracic rotation and QL release',                  cue: 'Hips one way, gaze the other' },
  { name: 'Savasana',                breaths: '2 min',           note: 'Full integration — let the session settle',         cue: null },
];

// ─── Exercise library ─────────────────────────────────────
// category: 'pull' | 'core' | 'shoulder' | 'lowback' | 'straight' | 'pelican'
// type: 'reps' | 'hold'
// targetReps: for reps type  |  targetSecs: for hold type

const EX = {

  // ── Overhead skill (SS1 push) ──────────────────────────
  'handstand-drills': {
    id: 'handstand-drills', name: 'Handstand Drills',
    category: 'shoulder', type: 'reps', targetReps: 5,
    desc: 'Kick up to a wall handstand and hold. Stack shoulders over wrists, hollow body, toes pointed. Exit with control.',
    note: 'Neural — fully fresh CNS',
    muscles: { primary: ['shoulders', 'core'], secondary: ['front-delt', 'serratus'] },
  },
  'hspu': {
    id: 'hspu', name: 'HSPU',
    category: 'shoulder', type: 'reps', targetReps: 5,
    desc: 'Kick up to wall handstand. Lower head to floor with a 3s descent, then press back to full lockout. Full range only.',
    note: 'Max overhead press',
    muscles: { primary: ['shoulders', 'front-delt', 'triceps'], secondary: ['serratus', 'core'] },
  },
  'straight-bar-dips': {
    id: 'straight-bar-dips', name: 'Straight Bar Dips',
    category: 'shoulder', type: 'reps', targetReps: 8,
    desc: 'Grip a straight bar in support position. Lower chest to bar with elbows flaring wide, lean forward slightly, then press to lockout.',
    note: 'Chest + triceps compound',
    muscles: { primary: ['chest', 'triceps'], secondary: ['front-delt', 'shoulders'] },
  },
  'pseudo-planche-lean': {
    id: 'pseudo-planche-lean', name: 'Pseudo Planche Lean',
    category: 'straight', type: 'hold', targetSecs: 20,
    desc: 'Push-up position, fingers pointing back. Lean shoulders forward past wrists, arms fully straight, scapulas protracted. Hold — do not bend elbows.',
    note: 'Serratus + scapular protraction',
    muscles: { primary: ['serratus', 'front-delt'], secondary: ['triceps', 'core'] },
  },
  'dragon-flag': {
    id: 'dragon-flag', name: 'Dragon Flag',
    category: 'core', type: 'reps', targetReps: 5,
    desc: 'Lying on a bench, grip behind your head. Keep the whole body rigid and lower legs-first until nearly horizontal, then pull back up. Control the descent entirely.',
    note: 'Anti-extension',
    muscles: { primary: ['core'], secondary: ['lower-back', 'shoulders'] },
  },
  'copenhagen-plank': {
    id: 'copenhagen-plank', name: 'Copenhagen Plank',
    category: 'core', type: 'hold', targetSecs: 20,
    desc: 'Side plank with the top leg resting on a bench. Bottom leg hangs free. Hold the body in a straight line — engages obliques and inner thigh simultaneously.',
    note: 'Anti-lateral — adductor + oblique',
    muscles: { primary: ['core'], secondary: ['glutes', 'hamstrings'] },
  },
  'hollow-body-hold': {
    id: 'hollow-body-hold', name: 'Hollow Body Hold',
    category: 'core', type: 'hold', targetSecs: 20,
    desc: 'Lie on back, press lower back firmly into the floor. Raise legs to ~45° and arms overhead. Hold the dish shape — squeeze abs and exhale fully.',
    note: 'Anti-extension variation',
    muscles: { primary: ['core'], secondary: ['lower-back'] },
  },

  // ── Heavy dips (SS2 push) ──────────────────────────────
  'bulgarian-dips': {
    id: 'bulgarian-dips', name: 'Bulgarian Dips',
    category: 'shoulder', type: 'reps', targetReps: 8,
    desc: 'Rings behind you at mid height, hands gripping behind. Lower into a deep dip — lean forward, let rings flare wide for a deep pec stretch, then press up.',
    note: 'Deep pec stretch, rings mid',
    muscles: { primary: ['chest', 'front-delt'], secondary: ['triceps', 'shoulders'] },
  },
  'korean-dips': {
    id: 'korean-dips', name: 'Korean Dips',
    category: 'shoulder', type: 'reps', targetReps: 8,
    desc: 'Rings or bar behind you at hip height, grip overhand. Lower into a posterior dip — elbows track back, not out. Targets rear delt and long-head triceps.',
    note: 'Posterior shoulder',
    muscles: { primary: ['rear-delt', 'triceps'], secondary: ['shoulders', 'chest'] },
  },
  'archer-push-up': {
    id: 'archer-push-up', name: 'Archer Push Up',
    category: 'shoulder', type: 'reps', targetReps: 5,
    desc: 'Wide push-up position. Lower to one side while the other arm extends fully straight. Each rep is unilateral — a stepping stone toward one-arm push-up.',
    note: 'Unilateral load',
    muscles: { primary: ['chest', 'triceps'], secondary: ['shoulders', 'core'] },
  },
  'side-plank-thread': {
    id: 'side-plank-thread', name: 'Side Plank + Thread Needle',
    category: 'core', type: 'reps', targetReps: 8,
    desc: 'Side plank on one hand. Reach the free arm under your body (threading the needle), then extend it up to the ceiling. Rotate controlled — obliques and serratus.',
    note: 'Anti-lateral + rotation',
    muscles: { primary: ['core', 'serratus'], secondary: ['glutes', 'shoulders'] },
  },
  'windshield-wipers': {
    id: 'windshield-wipers', name: 'Windshield Wipers',
    category: 'core', type: 'reps', targetReps: 8,
    desc: 'Hang from a bar, legs straight and raised to 90°. Rotate legs side to side in a wide arc like windshield wipers. All rotation from the obliques — control the swing.',
    note: 'Rotational power — bar',
    muscles: { primary: ['core'], secondary: ['lower-back', 'shoulders'] },
  },

  // ── Isolation (SS3 push) ───────────────────────────────
  'ring-fly': {
    id: 'ring-fly', name: 'Ring Fly',
    category: 'shoulder', type: 'reps', targetReps: 10,
    desc: 'Ring push-up position, arms nearly straight. Open arms out wide to the sides feeling a deep pec stretch, then pull them back together at the top. Slow eccentric.',
    note: 'Chest isolation',
    muscles: { primary: ['chest', 'front-delt'], secondary: ['shoulders'] },
  },
  'push-up-rto': {
    id: 'push-up-rto', name: 'Push Up RTO',
    category: 'shoulder', type: 'reps', targetReps: 8,
    desc: 'Standard ring push-up. At the lockout, actively rotate the rings outward (RTO) to externally rotate and engage serratus. Hold the top position a moment.',
    note: 'Rings turned out at lockout',
    muscles: { primary: ['chest', 'triceps', 'serratus'], secondary: ['shoulders'] },
  },
  'ring-overhead-ext': {
    id: 'ring-overhead-ext', name: 'Ring Overhead Extension',
    category: 'shoulder', type: 'reps', targetReps: 10,
    desc: 'Plank on rings, hands overhead. Bend elbows back overhead to lower your head between the rings, then extend back. Long-head triceps under full stretch.',
    note: 'Triceps long head',
    muscles: { primary: ['triceps'], secondary: ['shoulders', 'serratus'] },
  },
  'pike-push-up': {
    id: 'pike-push-up', name: 'Pike Push Up',
    category: 'shoulder', type: 'reps', targetReps: 8,
    desc: 'Hips high in a pike / downward-dog position. Bend elbows and lower your head toward the floor between your hands, then press back up. Overhead-press pattern.',
    note: 'Overhead prep bridge',
    muscles: { primary: ['shoulders', 'front-delt'], secondary: ['triceps', 'serratus'] },
  },
  'russian-push-up': {
    id: 'russian-push-up', name: 'Russian Push Up + Lateral Raise',
    category: 'shoulder', type: 'reps', targetReps: 8,
    desc: 'Lower to the floor in a push-up, then extend arms forward into a superman lateral-raise position, then press back up. Combines push strength with rear-delt health.',
    note: 'Shoulder health',
    muscles: { primary: ['lateral-delt', 'serratus'], secondary: ['shoulders', 'core'] },
  },
  'l-sit': {
    id: 'l-sit', name: 'L-sit',
    category: 'core', type: 'hold', targetSecs: 10,
    desc: 'From support on rings or parallettes, lift straight legs to 90°. Posterior pelvic tilt, quads tight, toes pointed. Arms fully locked out.',
    note: 'Hip flexor — isometric',
    muscles: { primary: ['core'], secondary: ['shoulders', 'triceps'] },
  },

  // ── Skill & power (SS1 pull) ───────────────────────────
  'front-lever-hold': {
    id: 'front-lever-hold', name: 'Front Lever Hold',
    category: 'straight', type: 'hold', targetSecs: 5,
    desc: 'From a bar hang, pull your body horizontal face-up with straight arms. Body completely rigid. Progress: tuck → advanced tuck → straddle → full.',
    note: 'Static skill — fresh CNS',
    muscles: { primary: ['lats', 'rear-delt', 'core'], secondary: ['biceps', 'serratus'] },
  },
  'chest-to-bar': {
    id: 'chest-to-bar', name: 'Chest to Bar',
    category: 'pull', type: 'reps', targetReps: 5,
    desc: 'Explosive pull-up — pull until the bar contacts your upper chest / sternum. Lean back slightly, drive elbows down hard. Reset fully at the bottom.',
    note: 'Explosive pull',
    muscles: { primary: ['lats', 'biceps'], secondary: ['rear-delt', 'core'] },
  },
  'typewriter': {
    id: 'typewriter', name: 'Typewriter',
    category: 'pull', type: 'reps', targetReps: 5,
    desc: 'Pull up to the top with bar at chest. While holding, traverse side to side — extend one arm, shift across, then bend the other. Controlled lateral movement at peak.',
    note: 'Lateral unilateral pull',
    muscles: { primary: ['lats', 'biceps'], secondary: ['rear-delt', 'core'] },
  },
  'tuck-to-l': {
    id: 'tuck-to-l', name: 'Tuck to L — Dynamic',
    category: 'core', type: 'reps', targetReps: 8,
    desc: 'From a dead hang, pull knees to chest (tuck), then extend legs straight out into an L-sit position. Hold briefly, then return. Trains hip flexion dynamically.',
    note: 'Hip flexor through range',
    muscles: { primary: ['core'], secondary: ['lats', 'shoulders'] },
  },
  'superman-hold': {
    id: 'superman-hold', name: 'Superman Hold',
    category: 'lowback', type: 'hold', targetSecs: 10,
    desc: 'Lie face down, arms extended overhead. Simultaneously lift arms, chest, and legs off the floor. Squeeze glutes and lower back. Chin stays neutral — no neck cranking.',
    note: 'Posterior — active rest',
    muscles: { primary: ['lower-back', 'glutes'], secondary: ['hamstrings'] },
  },

  // ── Strength volume (SS2 pull) ─────────────────────────
  'wide-pull-up': {
    id: 'wide-pull-up', name: 'Wide Pull Up',
    category: 'pull', type: 'reps', targetReps: 8,
    desc: 'Pull-up with hands wider than shoulder-width. Full dead hang at the bottom. Drive elbows down and back — lead with the elbows, not the hands.',
    note: 'Lat width',
    muscles: { primary: ['lats'], secondary: ['biceps', 'rear-delt'] },
  },
  'archer-pull-up': {
    id: 'archer-pull-up', name: 'Archer Pull Up',
    category: 'pull', type: 'reps', targetReps: 5,
    desc: 'Wide-grip pull-up where you pull toward one side — one arm does most of the work while the other extends straight. Alternate sides. A one-arm pull-up progression.',
    note: 'Unilateral lat strength',
    muscles: { primary: ['lats', 'biceps'], secondary: ['rear-delt', 'core'] },
  },
  'commande': {
    id: 'commande', name: 'Commande',
    category: 'pull', type: 'reps', targetReps: 8,
    desc: 'Neutral (hammer) grip pull-up with hands facing each other. Emphasizes brachialis and mid-back over biceps. Full range, slow descent.',
    note: 'Neutral grip — brachialis',
    muscles: { primary: ['brachialis', 'lats'], secondary: ['biceps'] },
  },
  'ice-cream-maker': {
    id: 'ice-cream-maker', name: 'Ice-cream Maker',
    category: 'pull', type: 'reps', targetReps: 8,
    desc: 'From a front lever position on rings, curl your body up in a rotating arc (like scooping ice cream) into a pull-up position. A dynamic front-lever to pull-up transition.',
    note: 'Rotational lat arc',
    muscles: { primary: ['lats', 'serratus'], secondary: ['biceps', 'rear-delt'] },
  },
  'dead-bug': {
    id: 'dead-bug', name: 'Dead Bug',
    category: 'core', type: 'reps', targetReps: 10,
    desc: 'Lying on back, arms vertical, knees at 90°. Slowly lower one arm overhead and the opposite leg toward the floor simultaneously. Lower back stays flat the entire time.',
    note: 'IAP + contralateral — active rest',
    muscles: { primary: ['core'], secondary: ['lower-back'] },
  },
  'windmill': {
    id: 'windmill', name: 'Windmill',
    category: 'core', type: 'reps', targetReps: 8,
    desc: 'Stand with a weight held overhead in one hand, arm locked out. Hinge laterally, reaching the free hand down toward your foot on the same side. Keep the top arm vertical.',
    note: 'Lateral + oblique rotation',
    muscles: { primary: ['core'], secondary: ['lower-back', 'shoulders'] },
  },
  'l-sit-pike-press': {
    id: 'l-sit-pike-press', name: 'L-sit Pike Press',
    category: 'core', type: 'reps', targetReps: 8,
    desc: 'Hold an L-sit, then compress further by pressing legs up into a V / pike position. Targets hip flexors at short range. Arms stay locked, chest tall.',
    note: 'Compression + hip flexors',
    muscles: { primary: ['core', 'shoulders'], secondary: ['triceps', 'serratus'] },
  },
  'back-extension': {
    id: 'back-extension', name: 'Back Extension',
    category: 'lowback', type: 'reps', targetReps: 10,
    desc: 'Face down on a GHD or bench. Lower torso toward the floor, then extend back to parallel. Erector training — chin neutral, squeeze glutes at the top, no hyperextension.',
    note: 'Erectors — active rest',
    muscles: { primary: ['lower-back'], secondary: ['glutes', 'hamstrings'] },
  },
  'planche-lean': {
    id: 'planche-lean', name: 'Planche Lean',
    category: 'straight', type: 'hold', targetSecs: 15,
    desc: 'Push-up position, fingers pointing back. Lean shoulders forward past your hands, arms straight, scapulas protracted. This locks in the planche motor pattern.',
    note: 'Serratus — motor pattern',
    muscles: { primary: ['serratus', 'front-delt'], secondary: ['triceps', 'core'] },
  },

  // ── Isolation + health (SS3 pull) ─────────────────────
  'inverted-deadlift': {
    id: 'inverted-deadlift', name: 'Inverted Deadlift',
    category: 'pull', type: 'reps', targetReps: 10,
    desc: 'Lie under a low bar, grip overhand. Pull your chest up to the bar in a reverse row / deadlift hybrid. Horizontal pull for rear delts and upper lats.',
    note: 'Horizontal pull',
    muscles: { primary: ['lats', 'rear-delt'], secondary: ['biceps', 'core'] },
  },
  'row': {
    id: 'row', name: 'Row',
    category: 'pull', type: 'reps', targetReps: 10,
    desc: 'Hang under rings or bar and pull your chest up to the handles. Retract scapulas at the top. Adjust body angle for difficulty — more horizontal means harder.',
    note: 'Mid back, retraction',
    muscles: { primary: ['lats', 'rear-delt'], secondary: ['biceps', 'brachialis'] },
  },
  'pelican-curl': {
    id: 'pelican-curl', name: 'Pelican Curl',
    category: 'pelican', type: 'reps', targetReps: 8,
    desc: 'On low rings facing away, lean forward with arms extended behind you. Let your body drop forward, deeply stretching the biceps, then curl back up. Long-range bicep work.',
    note: 'Bicep isolation',
    muscles: { primary: ['biceps'], secondary: ['brachialis'] },
  },
  'ring-hammer-curl': {
    id: 'ring-hammer-curl', name: 'Ring Hammer Curl',
    category: 'pull', type: 'reps', targetReps: 10,
    desc: 'Ring curl with a neutral (palms facing each other) grip throughout. Emphasizes brachialis and brachioradialis more than a supinated curl. Full hang to full flex.',
    note: 'Neutral — brachialis',
    muscles: { primary: ['brachialis', 'biceps'], secondary: [] },
  },
  'ring-y-raise': {
    id: 'ring-y-raise', name: 'Ring Y-raise',
    category: 'pull', type: 'reps', targetReps: 12,
    desc: 'Face rings at a low angle, arms hanging. Raise both arms out to a wide Y overhead, squeezing lower traps and rear delts. Very slow and controlled — this is not a pull.',
    note: 'Lower trap — arms wide',
    muscles: { primary: ['rear-delt', 'lower-back'], secondary: ['serratus'] },
  },
  'face-pull': {
    id: 'face-pull', name: 'Face Pull',
    category: 'pull', type: 'reps', targetReps: 12,
    desc: 'Face rings at head height. Pull handles to your forehead or ears with elbows high and wide. External rotation of the shoulder — essential for long-term pressing health.',
    note: 'Rear delt + external rotation',
    muscles: { primary: ['rear-delt', 'lateral-delt'], secondary: ['shoulders'] },
  },
  'jefferson-curl': {
    id: 'jefferson-curl', name: 'Jefferson Curl',
    category: 'lowback', type: 'reps', targetReps: 8,
    desc: 'Standing on a box holding light weight. Round your spine one vertebra at a time — chin first, then thoracic, then lumbar — until hanging, then slowly unroll. Loaded flexion for back health.',
    note: 'Loaded spinal flexion',
    muscles: { primary: ['lower-back', 'hamstrings'], secondary: ['glutes'] },
  },
  'cuban-press': {
    id: 'cuban-press', name: 'Cuban Press',
    category: 'shoulder', type: 'reps', targetReps: 10,
    desc: 'Arms extended, externally rotate to a 90/90 "goalpost" position, then press overhead. Combines shoulder external rotation with a press. Use light weight — it is a health exercise.',
    note: 'Shoulder health finisher',
    muscles: { primary: ['shoulders', 'rear-delt'], secondary: ['lateral-delt'] },
  },

  // ── Legs — Anterior chain (push days) ────────────────
  'pistol-squat': {
    id: 'pistol-squat', name: 'Pistol Squat',
    category: 'legs', type: 'reps', targetReps: 5,
    desc: 'Single-leg squat to full depth, other leg extended forward. Balance, strength, and ankle mobility combined. Hold a support if needed — prioritise full depth.',
    note: 'Quad sweep — each leg, full depth',
    muscles: { primary: ['quads', 'glutes'], secondary: ['hamstrings', 'calves', 'core'] },
  },
  'sissy-squat': {
    id: 'sissy-squat', name: 'Sissy Squat',
    category: 'legs', type: 'reps', targetReps: 10,
    desc: 'Kneel backward on your heels while rising on tiptoes and leaning the torso back. Extreme VMO and quad stretch under load. Use light support until comfortable.',
    note: 'VMO definition — max ROM, controlled',
    muscles: { primary: ['quads'], secondary: ['calves', 'core'] },
  },
  'single-leg-calf-raise': {
    id: 'single-leg-calf-raise', name: 'Single Leg Calf Raise',
    category: 'legs', type: 'reps', targetReps: 15,
    desc: 'Stand on one leg on the edge of a step. Drop the heel to a full stretch below the step, then rise to full extension on tiptoe. Slow and full range — no bouncing.',
    note: 'Calf shape — full stretch to full extension',
    muscles: { primary: ['calves'], secondary: [] },
  },

  // ── Ring handstand ────────────────────────────────────
  'ring-handstand': {
    id: 'ring-handstand', name: 'Ring Handstand',
    category: 'shoulder', type: 'hold', targetSecs: 10,
    desc: 'Kick up to a handstand on rings. The unstable surface demands extreme serratus activation, scapular stability, and full-body tension. Start wall-assisted, progress to freestanding.',
    note: 'Balance + scapular stability — fresh CNS only',
    muscles: { primary: ['shoulders', 'serratus', 'core'], secondary: ['triceps', 'front-delt'] },
  },

  // ── Skill support ─────────────────────────────────────
  'false-grip-dead-hang': {
    id: 'false-grip-dead-hang', name: 'False Grip Dead Hang',
    category: 'pull', type: 'hold', targetSecs: 20,
    desc: 'Hang from bar or rings with a false grip — wrist draped over the bar, not fingers wrapped around it. Let shoulders depress fully. Conditions the exact wrist position required for the muscle up.',
    note: 'MU prerequisite — wrist + grip conditioning',
    muscles: { primary: ['forearms', 'lats'], secondary: ['biceps', 'shoulders'] },
  },
  'ring-dip-deep': {
    id: 'ring-dip-deep', name: 'Ring Dip — Deep Pause',
    category: 'shoulder', type: 'reps', targetReps: 5,
    desc: 'Ring dip with a deliberate 3-second pause at the bottom. Elbows at 90°, rings allowed to flare. Builds the chest and shoulder strength needed to push out of the muscle up transition.',
    note: 'MU transition strength — 3s pause at bottom',
    muscles: { primary: ['chest', 'triceps'], secondary: ['shoulders', 'serratus'] },
  },
  'german-hang': {
    id: 'german-hang', name: 'German Hang',
    category: 'shoulder', type: 'hold', targetSecs: 20,
    desc: 'From a bar or ring hang, slowly rotate backward until hanging with arms extended behind you. Passive shoulder opener — exit slowly and controlled. Essential prerequisite for back lever.',
    note: 'Back lever prerequisite — shoulder flexion mobility',
    muscles: { primary: ['shoulders', 'chest'], secondary: ['biceps'] },
  },
  'cross-body-band-hold': {
    id: 'cross-body-band-hold', name: 'Cross Body Band Hold',
    category: 'straight', type: 'hold', targetSecs: 10,
    desc: 'Band anchored at shoulder height. Hold arm extended straight to the side against the band\'s pull — isometric at the exact iron cross arm angle. Nothing else replicates this specific adduction demand.',
    note: 'Iron cross specific — isometric at cross angle',
    muscles: { primary: ['lats', 'chest'], secondary: ['rear-delt', 'serratus'] },
  },
  'wrist-extension-hold': {
    id: 'wrist-extension-hold', name: 'Wrist Extension Hold',
    category: 'shoulder', type: 'hold', targetSecs: 20,
    desc: 'On hands and knees, rotate wrists so fingers point back toward your knees. Gradually shift bodyweight forward over the wrists. The wrist extension range required for manna is the most overlooked limiting factor.',
    note: 'Manna prerequisite — wrist mobility + strength',
    muscles: { primary: ['forearms'], secondary: [] },
  },

  // ── Legs — Posterior chain (pull days) ───────────────
  'nordic-curl': {
    id: 'nordic-curl', name: 'Nordic Curl',
    category: 'legs', type: 'reps', targetReps: 5,
    desc: 'Kneel with feet anchored. Lower your torso toward the floor using hamstrings only — as slow as possible. Catch yourself with hands if needed, then use them to push back up.',
    note: 'Hamstring fullness — eccentric focus',
    muscles: { primary: ['hamstrings'], secondary: ['glutes', 'lower-back'] },
  },
  'single-leg-deadlift': {
    id: 'single-leg-deadlift', name: 'Single Leg Deadlift',
    category: 'legs', type: 'reps', targetReps: 8,
    desc: 'Balance on one leg, hinge forward at the hip while extending the opposite leg back. Keep spine neutral. Full hip extension at the top — glute squeeze. Each side separately.',
    note: 'Posterior line — hinge, hip extension',
    muscles: { primary: ['hamstrings', 'glutes'], secondary: ['lower-back', 'core'] },
  },
  'single-leg-glute-bridge': {
    id: 'single-leg-glute-bridge', name: 'Single Leg Glute Bridge',
    category: 'legs', type: 'reps', targetReps: 12,
    desc: 'Lie on back, one knee bent with foot flat on the floor, other leg extended straight. Drive hips up with the working leg, squeezing the glute hard at the top. Pause.',
    note: 'Glute isolation — pause at top',
    muscles: { primary: ['glutes'], secondary: ['hamstrings', 'core'] },
  },
};

// ─── Leg supersets ────────────────────────────────────────

const ssLegsAnterior = {
  id: 'D', label: 'Legs — Anterior Chain', rings: 'none', rounds: 1,
  restIntra: 60, restRound: 90,
  exercises: [
    EX['pistol-squat'],
    EX['sissy-squat'],
    EX['single-leg-calf-raise'],
  ],
};

const ssLegsPosterior = {
  id: 'D', label: 'Legs — Posterior Chain', rings: 'none', rounds: 1,
  restIntra: 60, restRound: 90,
  exercises: [
    EX['nordic-curl'],
    EX['single-leg-deadlift'],
    EX['single-leg-glute-bridge'],
  ],
};

// ─── Superset builders ────────────────────────────────────

function ssOverheadSkill(coreFinisher) {
  return {
    id: 'A', label: 'Overhead Skill', rings: 'none', rounds: 3,
    restIntra: 25, restRound: 90,
    exercises: [
      EX['handstand-drills'],
      EX['hspu'],
      EX['straight-bar-dips'],
      EX['pseudo-planche-lean'],
      EX['dragon-flag'],
      coreFinisher,
    ],
  };
}

function ssHeavyDips(rotationEx) {
  return {
    id: 'B', label: 'Heavy Dips', rings: 'mid', rounds: 3,
    restIntra: 25, restRound: 90,
    exercises: [
      EX['bulgarian-dips'],
      EX['korean-dips'],
      EX['archer-push-up'],
      EX['ring-dip-deep'],
      rotationEx,
    ],
  };
}

const ssIsolationPush = {
  id: 'C', label: 'Isolation', rings: 'low', rounds: 3,
  restIntra: 20, restRound: 90,
  exercises: [
    EX['ring-fly'],
    EX['push-up-rto'],
    EX['ring-overhead-ext'],
    EX['pike-push-up'],
    EX['russian-push-up'],
    EX['l-sit'],
    EX['wrist-extension-hold'],
  ],
};

const ssSkillPower = {
  id: 'A', label: 'Skill & Power', rings: 'high', rounds: 3,
  restIntra: 25, restRound: 90,
  exercises: [
    EX['ring-handstand'],
    EX['chest-to-bar'],
    EX['typewriter'],
    EX['false-grip-dead-hang'],
    EX['tuck-to-l'],
    EX['superman-hold'],
  ],
};

function ssStrengthVolume(coreEx) {
  return {
    id: 'B', label: 'Strength Volume', rings: 'high', rounds: 3,
    restIntra: 25, restRound: 90,
    exercises: [
      EX['wide-pull-up'],
      EX['archer-pull-up'],
      EX['commande'],
      EX['ice-cream-maker'],
      coreEx,
      EX['l-sit-pike-press'],
      EX['back-extension'],
      EX['planche-lean'],
    ],
  };
}

const ssIsolationPull = {
  id: 'C', label: 'Isolation + Health', rings: 'mid', rounds: 3,
  restIntra: 20, restRound: 90,
  exercises: [
    EX['inverted-deadlift'],
    EX['row'],
    EX['pelican-curl'],
    EX['ring-hammer-curl'],
    EX['ring-y-raise'],
    EX['face-pull'],
    EX['cross-body-band-hold'],
    EX['jefferson-curl'],
    EX['cuban-press'],
  ],
};

// ─── Sessions ─────────────────────────────────────────────

export const SESSIONS = [
  {
    id: 'mon-push1',
    day: 'Monday', weekday: 1,
    type: 'push', label: 'Push 1',
    focus: 'Anterior legs · Lateral core',
    skills: ['planche', 'shoulderstand-press'],
    warmup: WARMUP_PUSH,
    supersets: [
      ssOverheadSkill(EX['copenhagen-plank']),
      ssHeavyDips(EX['side-plank-thread']),
      ssIsolationPush,
      ssLegsAnterior,
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'wed-pull1',
    day: 'Wednesday', weekday: 3,
    type: 'pull', label: 'Pull 1',
    focus: 'Posterior legs · IAP + rotation core',
    skills: ['front-lever', 'iron-cross', 'back-lever'],
    warmup: WARMUP_PULL_WED,
    supersets: [
      ssSkillPower,
      ssStrengthVolume(EX['dead-bug']),
      ssIsolationPull,
      ssLegsPosterior,
    ],
    cooldown: COOLDOWN_PULL,
  },
  {
    id: 'thu-push2',
    day: 'Thursday', weekday: 4,
    type: 'push', label: 'Push 2',
    focus: 'Anterior legs · Rotation core',
    skills: ['muscle-up', 'manna', 'ring-handstand'],
    warmup: WARMUP_PUSH,
    supersets: [
      ssOverheadSkill(EX['hollow-body-hold']),
      ssHeavyDips(EX['windshield-wipers']),
      ssIsolationPush,
      ssLegsAnterior,
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'sat-pull2',
    day: 'Saturday', weekday: 6,
    type: 'pull', label: 'Pull 2',
    focus: 'Posterior legs · Lateral core',
    skills: ['forward-roll', 'backward-roll'],
    warmup: WARMUP_PULL_SAT,
    supersets: [
      ssSkillPower,
      ssStrengthVolume(EX['windmill']),
      ssIsolationPull,
      ssLegsPosterior,
    ],
    cooldown: COOLDOWN_PULL,
  },
];
