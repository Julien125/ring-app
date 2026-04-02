import { EX } from './exercises.js';

// ─── Warmups ─────────────────────────────────────────────

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

// ─── Leg supersets ────────────────────────────────────────

// Variant A — Monday / Wednesday (baseline)
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

// Variant B — Thursday anterior (3s descent + eyes closed for pistol; 3×12 sissy)
const ssLegsAnteriorB = {
  id: 'D', label: 'Legs — Anterior Chain', rings: 'none', rounds: 1,
  restIntra: 60, restRound: 90,
  exercises: [
    { ...EX['pistol-squat'],           note: '3s descent · eyes closed — proprioception challenge' },
    { ...EX['sissy-squat'],            targetReps: 12 },
    { ...EX['single-leg-calf-raise'],  note: 'Bent knee — soleus focus' },
  ],
};

// Variant B — Saturday posterior (3×6 explosive nordic; weighted SL deadlift; foot-elevated bridge)
const ssLegsPosteriorB = {
  id: 'D', label: 'Legs — Posterior Chain', rings: 'none', rounds: 1,
  restIntra: 60, restRound: 90,
  exercises: [
    { ...EX['nordic-curl'],             targetReps: 6,  note: 'Explosive descent — use hands to push back up if needed' },
    { ...EX['single-leg-deadlift'],     note: 'Weighted KB · 3s pause at bottom — eccentric emphasis' },
    { ...EX['single-leg-glute-bridge'], targetReps: 10, note: 'Foot elevated · weighted KB on hip — full glute stretch' },
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
    EX['l-sit'],
    EX['side-bend'],
  ],
};

const ssSkillPower = {
  id: 'A', label: 'Skill & Power', rings: 'high', rounds: 3,
  restIntra: 25, restRound: 90,
  exercises: [
    EX['front-lever-hold'],
    EX['chest-to-bar'],
    EX['360-pull'],
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
    EX['row'],
    EX['pelican-curl'],
    EX['ring-y-raise'],
    EX['face-pull'],
    EX['pallof-press'],
    EX['cross-body-band-hold'],
    EX['jefferson-curl'],
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
    day: 'Friday', weekday: 5,
    type: 'push', label: 'Push 2',
    focus: 'Anterior legs · Rotation core',
    skills: ['muscle-up', 'manna', 'ring-handstand'],
    warmup: WARMUP_PUSH,
    supersets: [
      ssOverheadSkill(EX['hollow-body-hold']),
      ssHeavyDips(EX['windshield-wipers']),
      ssIsolationPush,
      ssLegsAnteriorB,
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
      ssLegsPosteriorB,
    ],
    cooldown: COOLDOWN_PULL,
  },
];
