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

export const PHASES = {
  1: { label: 'Strength I',  roundMult: 1,    repMult: 1    },
  2: { label: 'Strength II', roundMult: 1,    repMult: 1.1  },
  3: { label: 'Hypertrophy', roundMult: 1.33, repMult: 1.5  },
  4: { label: 'Deload',      roundMult: 0.67, repMult: 0.5  },
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
    note: 'Neural — fully fresh CNS',
    muscles: { primary: ['shoulders', 'core'], secondary: ['front-delt', 'serratus'] },
  },
  'hspu': {
    id: 'hspu', name: 'HSPU',
    category: 'shoulder', type: 'reps', targetReps: 5,
    note: 'Max overhead press',
    muscles: { primary: ['shoulders', 'front-delt', 'triceps'], secondary: ['serratus', 'core'] },
  },
  'straight-bar-dips': {
    id: 'straight-bar-dips', name: 'Straight Bar Dips',
    category: 'shoulder', type: 'reps', targetReps: 8,
    note: 'Chest + triceps compound',
    muscles: { primary: ['chest', 'triceps'], secondary: ['front-delt', 'shoulders'] },
  },
  'pseudo-planche-lean': {
    id: 'pseudo-planche-lean', name: 'Pseudo Planche Lean',
    category: 'straight', type: 'hold', targetSecs: 20,
    note: 'Serratus + scapular protraction',
    muscles: { primary: ['serratus', 'front-delt'], secondary: ['triceps', 'core'] },
  },
  'dragon-flag': {
    id: 'dragon-flag', name: 'Dragon Flag',
    category: 'core', type: 'reps', targetReps: 5,
    note: 'Anti-extension',
    muscles: { primary: ['core'], secondary: ['lower-back', 'shoulders'] },
  },
  'copenhagen-plank': {
    id: 'copenhagen-plank', name: 'Copenhagen Plank',
    category: 'core', type: 'hold', targetSecs: 20,
    note: 'Anti-lateral — adductor + oblique',
    muscles: { primary: ['core'], secondary: ['glutes', 'hamstrings'] },
  },
  'hollow-body-hold': {
    id: 'hollow-body-hold', name: 'Hollow Body Hold',
    category: 'core', type: 'hold', targetSecs: 20,
    note: 'Anti-extension variation',
    muscles: { primary: ['core'], secondary: ['lower-back'] },
  },

  // ── Heavy dips (SS2 push) ──────────────────────────────
  'bulgarian-dips': {
    id: 'bulgarian-dips', name: 'Bulgarian Dips',
    category: 'shoulder', type: 'reps', targetReps: 8,
    note: 'Deep pec stretch, rings mid',
    muscles: { primary: ['chest', 'front-delt'], secondary: ['triceps', 'shoulders'] },
  },
  'korean-dips': {
    id: 'korean-dips', name: 'Korean Dips',
    category: 'shoulder', type: 'reps', targetReps: 8,
    note: 'Posterior shoulder',
    muscles: { primary: ['rear-delt', 'triceps'], secondary: ['shoulders', 'chest'] },
  },
  'archer-push-up': {
    id: 'archer-push-up', name: 'Archer Push Up',
    category: 'shoulder', type: 'reps', targetReps: 5,
    note: 'Unilateral load',
    muscles: { primary: ['chest', 'triceps'], secondary: ['shoulders', 'core'] },
  },
  'side-plank-thread': {
    id: 'side-plank-thread', name: 'Side Plank + Thread Needle',
    category: 'core', type: 'reps', targetReps: 8,
    note: 'Anti-lateral + rotation',
    muscles: { primary: ['core', 'serratus'], secondary: ['glutes', 'shoulders'] },
  },
  'windshield-wipers': {
    id: 'windshield-wipers', name: 'Windshield Wipers',
    category: 'core', type: 'reps', targetReps: 8,
    note: 'Rotational power — bar',
    muscles: { primary: ['core'], secondary: ['lower-back', 'shoulders'] },
  },

  // ── Isolation (SS3 push) ───────────────────────────────
  'ring-fly': {
    id: 'ring-fly', name: 'Ring Fly',
    category: 'shoulder', type: 'reps', targetReps: 10,
    note: 'Chest isolation',
    muscles: { primary: ['chest', 'front-delt'], secondary: ['shoulders'] },
  },
  'push-up-rto': {
    id: 'push-up-rto', name: 'Push Up RTO',
    category: 'shoulder', type: 'reps', targetReps: 8,
    note: 'Rings turned out at lockout',
    muscles: { primary: ['chest', 'triceps', 'serratus'], secondary: ['shoulders'] },
  },
  'ring-overhead-ext': {
    id: 'ring-overhead-ext', name: 'Ring Overhead Extension',
    category: 'shoulder', type: 'reps', targetReps: 10,
    note: 'Triceps long head',
    muscles: { primary: ['triceps'], secondary: ['shoulders', 'serratus'] },
  },
  'pike-push-up': {
    id: 'pike-push-up', name: 'Pike Push Up',
    category: 'shoulder', type: 'reps', targetReps: 8,
    note: 'Overhead prep bridge',
    muscles: { primary: ['shoulders', 'front-delt'], secondary: ['triceps', 'serratus'] },
  },
  'russian-push-up': {
    id: 'russian-push-up', name: 'Russian Push Up + Lateral Raise',
    category: 'shoulder', type: 'reps', targetReps: 8,
    note: 'Shoulder health',
    muscles: { primary: ['lateral-delt', 'serratus'], secondary: ['shoulders', 'core'] },
  },
  'l-sit': {
    id: 'l-sit', name: 'L-sit',
    category: 'core', type: 'hold', targetSecs: 10,
    note: 'Hip flexor — isometric',
    muscles: { primary: ['core'], secondary: ['shoulders', 'triceps'] },
  },

  // ── Skill & power (SS1 pull) ───────────────────────────
  'front-lever-hold': {
    id: 'front-lever-hold', name: 'Front Lever Hold',
    category: 'straight', type: 'hold', targetSecs: 5,
    note: 'Static skill — fresh CNS',
    muscles: { primary: ['lats', 'rear-delt', 'core'], secondary: ['biceps', 'serratus'] },
  },
  'chest-to-bar': {
    id: 'chest-to-bar', name: 'Chest to Bar',
    category: 'pull', type: 'reps', targetReps: 5,
    note: 'Explosive pull',
    muscles: { primary: ['lats', 'biceps'], secondary: ['rear-delt', 'core'] },
  },
  'typewriter': {
    id: 'typewriter', name: 'Typewriter',
    category: 'pull', type: 'reps', targetReps: 5,
    note: 'Lateral unilateral pull',
    muscles: { primary: ['lats', 'biceps'], secondary: ['rear-delt', 'core'] },
  },
  'tuck-to-l': {
    id: 'tuck-to-l', name: 'Tuck to L — Dynamic',
    category: 'core', type: 'reps', targetReps: 8,
    note: 'Hip flexor through range',
    muscles: { primary: ['core'], secondary: ['lats', 'shoulders'] },
  },
  'superman-hold': {
    id: 'superman-hold', name: 'Superman Hold',
    category: 'lowback', type: 'hold', targetSecs: 10,
    note: 'Posterior — active rest',
    muscles: { primary: ['lower-back', 'glutes'], secondary: ['hamstrings'] },
  },

  // ── Strength volume (SS2 pull) ─────────────────────────
  'wide-pull-up': {
    id: 'wide-pull-up', name: 'Wide Pull Up',
    category: 'pull', type: 'reps', targetReps: 8,
    note: 'Lat width',
    muscles: { primary: ['lats'], secondary: ['biceps', 'rear-delt'] },
  },
  'archer-pull-up': {
    id: 'archer-pull-up', name: 'Archer Pull Up',
    category: 'pull', type: 'reps', targetReps: 5,
    note: 'Unilateral lat strength',
    muscles: { primary: ['lats', 'biceps'], secondary: ['rear-delt', 'core'] },
  },
  'commande': {
    id: 'commande', name: 'Commande',
    category: 'pull', type: 'reps', targetReps: 8,
    note: 'Neutral grip — brachialis',
    muscles: { primary: ['brachialis', 'lats'], secondary: ['biceps'] },
  },
  'ice-cream-maker': {
    id: 'ice-cream-maker', name: 'Ice-cream Maker',
    category: 'pull', type: 'reps', targetReps: 8,
    note: 'Rotational lat arc',
    muscles: { primary: ['lats', 'serratus'], secondary: ['biceps', 'rear-delt'] },
  },
  'dead-bug': {
    id: 'dead-bug', name: 'Dead Bug',
    category: 'core', type: 'reps', targetReps: 10,
    note: 'IAP + contralateral — active rest',
    muscles: { primary: ['core'], secondary: ['lower-back'] },
  },
  'windmill': {
    id: 'windmill', name: 'Windmill',
    category: 'core', type: 'reps', targetReps: 8,
    note: 'Lateral + oblique rotation',
    muscles: { primary: ['core'], secondary: ['lower-back', 'shoulders'] },
  },
  'l-sit-pike-press': {
    id: 'l-sit-pike-press', name: 'L-sit Pike Press',
    category: 'core', type: 'reps', targetReps: 8,
    note: 'Compression + hip flexors',
    muscles: { primary: ['core', 'shoulders'], secondary: ['triceps', 'serratus'] },
  },
  'back-extension': {
    id: 'back-extension', name: 'Back Extension',
    category: 'lowback', type: 'reps', targetReps: 10,
    note: 'Erectors — active rest',
    muscles: { primary: ['lower-back'], secondary: ['glutes', 'hamstrings'] },
  },
  'planche-lean': {
    id: 'planche-lean', name: 'Planche Lean',
    category: 'straight', type: 'hold', targetSecs: 15,
    note: 'Serratus — motor pattern',
    muscles: { primary: ['serratus', 'front-delt'], secondary: ['triceps', 'core'] },
  },

  // ── Isolation + health (SS3 pull) ─────────────────────
  'inverted-deadlift': {
    id: 'inverted-deadlift', name: 'Inverted Deadlift',
    category: 'pull', type: 'reps', targetReps: 10,
    note: 'Horizontal pull',
    muscles: { primary: ['lats', 'rear-delt'], secondary: ['biceps', 'core'] },
  },
  'row': {
    id: 'row', name: 'Row',
    category: 'pull', type: 'reps', targetReps: 10,
    note: 'Mid back, retraction',
    muscles: { primary: ['lats', 'rear-delt'], secondary: ['biceps', 'brachialis'] },
  },
  'pelican-curl': {
    id: 'pelican-curl', name: 'Pelican Curl',
    category: 'pelican', type: 'reps', targetReps: 8,
    note: 'Bicep isolation',
    muscles: { primary: ['biceps'], secondary: ['brachialis'] },
  },
  'ring-hammer-curl': {
    id: 'ring-hammer-curl', name: 'Ring Hammer Curl',
    category: 'pull', type: 'reps', targetReps: 10,
    note: 'Neutral — brachialis',
    muscles: { primary: ['brachialis', 'biceps'], secondary: [] },
  },
  'ring-y-raise': {
    id: 'ring-y-raise', name: 'Ring Y-raise',
    category: 'pull', type: 'reps', targetReps: 12,
    note: 'Lower trap — arms wide',
    muscles: { primary: ['rear-delt', 'lower-back'], secondary: ['serratus'] },
  },
  'face-pull': {
    id: 'face-pull', name: 'Face Pull',
    category: 'pull', type: 'reps', targetReps: 12,
    note: 'Rear delt + external rotation',
    muscles: { primary: ['rear-delt', 'lateral-delt'], secondary: ['shoulders'] },
  },
  'jefferson-curl': {
    id: 'jefferson-curl', name: 'Jefferson Curl',
    category: 'lowback', type: 'reps', targetReps: 8,
    note: 'Loaded spinal flexion',
    muscles: { primary: ['lower-back', 'hamstrings'], secondary: ['glutes'] },
  },
  'cuban-press': {
    id: 'cuban-press', name: 'Cuban Press',
    category: 'shoulder', type: 'reps', targetReps: 10,
    note: 'Shoulder health finisher',
    muscles: { primary: ['shoulders', 'rear-delt'], secondary: ['lateral-delt'] },
  },
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
    ],
    cooldown: COOLDOWN_PULL,
  },
];
