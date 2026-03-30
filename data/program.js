// ─────────────────────────────────────────────────────────
//  Ring App — Program Data
//  All 4 sessions hardcoded from full_week_workout.pdf
// ─────────────────────────────────────────────────────────

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
  { name: 'Cat-cow + thoracic rotation',   duration: '2 min',  note: 'Spinal mobility before hinging' },
];

const WARMUP_PULL_SAT = [
  { name: '90/90 breathing',  duration: '3 min',  note: 'IAP — 3×5 deep exhales' },
  { name: 'Dead hang',         duration: '3×30s',  note: 'Grip + shoulder decompression' },
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
  ],
};

const ssSkillPower = {
  id: 'A', label: 'Skill & Power', rings: 'high', rounds: 3,
  restIntra: 25, restRound: 90,
  exercises: [
    EX['front-lever-hold'],
    EX['chest-to-bar'],
    EX['typewriter'],
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
    skills: [
      { name: 'Planche', drill: 'Planche Lean Hold', sets: '4 × 20s', note: 'Lean forward past wrists, protract scapula, posterior pelvic tilt. Straight arms.' },
      { name: 'Shoulderstand Press', drill: 'Pike Press to Headstand', sets: '3 × 5', note: 'Slow 3s descent. Drive hips high, elbows track back, core braced throughout.' },
    ],
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
    skills: [
      { name: 'Iron Cross', drill: 'Cross Lean + Support Hold', sets: '4 × 10s', note: 'Rings at hip height, arms fully extended out to sides. Engage lats hard, no shrugging.' },
      { name: 'Back Lever', drill: 'Skin the Cat + Tuck Back Lever', sets: '3 × 15s', note: 'Skin the cat, pause in tuck back lever. Push rings down, squeeze glutes.' },
    ],
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
    skills: [
      { name: 'Muscle Up', drill: 'Low Transition Drill', sets: '3 × 5', note: 'Bar at chest height. False grip, explosive pull, fast transition. Focus on hip drive.' },
      { name: 'Manna', drill: 'Seated Compression + Manna Lean', sets: '4 × 15s', note: 'Hands beside hips, push into floor, lift hips. Legs straight, toes pointed.' },
    ],
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
    skills: [
      { name: 'Forward Roll on Rings', drill: 'Spotted Forward Roll', sets: '3 × 3', note: 'Start in support. Tuck chin, hollow body, roll forward slowly. Stay in control — not a fall.' },
      { name: 'Backward Roll on Rings', drill: 'Skin the Cat to Invert', sets: '3 × 3', note: 'From hang, pull knees up and over. Control descent. Shoulders stay packed.' },
    ],
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
