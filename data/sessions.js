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

// Variant A — Monday (baseline)
const ssLegsAnterior = {
  id: 'B', label: 'Legs — Anterior Chain', rings: 'none', rounds: 2,
  restIntra: 60, restRound: 90,
  exercises: [
    EX['bulgarian-split-squat'],
    EX['pistol-squat'],
    EX['sissy-squat'],
    EX['single-leg-calf-raise'],
    EX['copenhagen-plank'],
  ],
};

const ssLegsPosterior = {
  id: 'B', label: 'Legs — Posterior Chain', rings: 'none', rounds: 2,
  restIntra: 60, restRound: 90,
  exercises: [
    EX['nordic-curl'],
    EX['single-leg-deadlift'],
    EX['single-leg-glute-bridge'],
  ],
};

// Variant B — Friday anterior (3s descent pistol; loaded BSS; 3×12 sissy)
const ssLegsAnteriorB = {
  id: 'B', label: 'Legs — Anterior Chain', rings: 'none', rounds: 2,
  restIntra: 60, restRound: 90,
  exercises: [
    { ...EX['bulgarian-split-squat'],  note: 'Add KB/DB — load it' },
    { ...EX['pistol-squat'],           note: '3s descent · eyes closed — proprioception challenge' },
    { ...EX['sissy-squat'],            targetReps: 12 },
    { ...EX['single-leg-calf-raise'],  note: 'Bent knee — soleus focus' },
    EX['copenhagen-plank'],
  ],
};

// Variant B — Saturday posterior (explosive nordic; weighted SL deadlift; foot-elevated bridge)
const ssLegsPosteriorB = {
  id: 'B', label: 'Legs — Posterior Chain', rings: 'none', rounds: 2,
  restIntra: 60, restRound: 90,
  exercises: [
    { ...EX['nordic-curl'],             targetReps: 6,  note: 'Explosive descent — use hands to push back up if needed' },
    { ...EX['single-leg-deadlift'],     note: 'Weighted KB · 3s pause at bottom — eccentric emphasis' },
    { ...EX['single-leg-glute-bridge'], targetReps: 10, note: 'Foot elevated · weighted KB on hip — full glute stretch' },
  ],
};

// ─── Superset builders ────────────────────────────────────

// Monday SS A — pure handstand skill, CNS fresh, no strength mixed in
const ssOverheadSkillMon = {
  id: 'A', label: 'Skill — Handstand & Planche', rings: 'none', rounds: 3,
  restIntra: 30, restRound: 120,
  exercises: [
    EX['wall-kick-up'],
    EX['chest-wall-handstand'],
    EX['back-wall-handstand'],
    EX['toe-pulls'],
    EX['shoulderpress-negative'],
    EX['planche-lean'],
    EX['tuck-planche'],
    EX['planche-protraction'],
  ],
};

// Monday SS C — overhead + dips strength block
const ssOverheadDipsStrength = {
  id: 'C', label: 'Overhead & Dips', rings: 'mid', rounds: 3,
  restIntra: 30, restRound: 120,
  exercises: [
    EX['hspu'],
    EX['straight-bar-dips'],
    EX['bulgarian-dips'],
    EX['korean-dips'],
    EX['ring-dip-deep'],
  ],
};

// Friday SS A — skill + planche overhead, CNS fresh
const ssOverheadSkillFri = {
  id: 'A', label: 'Overhead & Planche Skill', rings: 'none', rounds: 3,
  restIntra: 30, restRound: 120,
  exercises: [
    EX['handstand-drills'],
    EX['pseudo-planche-lean'],
    EX['pseudo-planche-push-up'],
  ],
};

// Monday SS D — shoulder health + isolation, no redundancy with SS C
const ssIsolationPushMon = {
  id: 'D', label: 'Shoulder Health & Isolation', rings: 'low', rounds: 3,
  restIntra: 20, restRound: 90,
  exercises: [
    EX['cuban-press'],
    EX['lateral-raise'],
    EX['ring-overhead-ext'],
    EX['l-sit'],
    EX['side-bend'],
    EX['pallof-press'],
  ],
};

// ─── Skill support blocks (SS B on each day) ─────────────

const ssSkillSupportWed = {
  id: 'B', label: 'Skill Support', rings: 'high', rounds: 3,
  restIntra: 30, restRound: 90,
  exercises: [
    EX['iron-cross-pull'],
    EX['front-lever-hold'],
    EX['german-hang'],
    EX['back-lever-negative'],
    EX['hollow-body-hold'],
  ],
};

const ssSkillSupportFri = {
  id: 'B', label: 'Skill Support', rings: 'high', rounds: 3,
  restIntra: 30, restRound: 90,
  exercises: [
    EX['shoulderpress-negative'],
    EX['v-sit-pulse'],
    EX['ring-dip-deep'],
    EX['muscle-up-negative'],
    EX['rto-support-hold'],
  ],
};

const ssSkillSupportSat = {
  id: 'B', label: 'Skill Support', rings: 'high', rounds: 3,
  restIntra: 30, restRound: 90,
  exercises: [
    EX['german-hang'],
    EX['back-lever-negative'],
    EX['false-grip-row'],
    EX['muscle-up-negative'],
    EX['rto-support-hold'],
    EX['hollow-body-hold'],
  ],
};

// Friday SS C — horizontal push strength, no overlap with SS A or SS D
const ssHorizontalPush = {
  id: 'C', label: 'Horizontal Push', rings: 'mid', rounds: 3,
  restIntra: 25, restRound: 120,
  exercises: [
    EX['hspu'],
    EX['archer-push-up'],
    EX['ring-fly'],
    EX['push-up-rto'],
    EX['russian-push-up'],
  ],
};

// Friday SS D — isolation + shoulder health, no overlap with SS A or SS C
const ssIsolationPushFri = {
  id: 'D', label: 'Shoulder Health & Isolation', rings: 'low', rounds: 3,
  restIntra: 20, restRound: 90,
  exercises: [
    EX['bulgarian-push-up'],
    EX['cuban-press'],
    EX['lateral-raise'],
    EX['ring-overhead-ext'],
    EX['l-sit'],
    EX['side-bend'],
    EX['pallof-press'],
  ],
};

// Wednesday SS A — static skill focus: iron cross + back lever (straight-arm, posterior)
const ssSkillPowerWed = {
  id: 'A', label: 'Skill — Iron Cross & Back Lever', rings: 'high', rounds: 3,
  restIntra: 30, restRound: 120,
  exercises: [
    EX['skin-the-cat'],
    EX['chest-to-bar'],
    EX['superman-hold'],
    EX['false-grip-dead-hang'],
    EX['wide-support-hold'],
  ],
};

// Saturday SS A — explosive + transition focus: muscle up + back lever
const ssSkillPowerSat = {
  id: 'A', label: 'Skill — Muscle Up & Back Lever', rings: 'high', rounds: 3,
  restIntra: 30, restRound: 120,
  exercises: [
    EX['skin-the-cat'],
    EX['chest-to-bar'],
    EX['360-pull'],
    EX['typewriter'],
    EX['false-grip-dead-hang'],
    EX['superman-hold'],
  ],
};

const ssStrengthVolume = {
  id: 'D', label: 'Strength Volume', rings: 'high', rounds: 3,
  restIntra: 25, restRound: 90,
  exercises: [
    EX['wide-pull-up'],
    EX['archer-pull-up'],
    EX['commande'],
    EX['ice-cream-maker'],
    EX['l-sit-pike-press'],
    EX['back-extension'],
    EX['tuck-to-l'],
  ],
};

const ssIsolationPull = {
  id: 'E', label: 'Isolation + Health', rings: 'mid', rounds: 3,
  restIntra: 20, restRound: 90,
  exercises: [
    EX['row'],
    EX['pelican-curl'],
    EX['ring-hammer-curl'],
    EX['ring-y-raise'],
    EX['face-pull'],
    EX['pallof-press'],
    EX['jefferson-curl'],
    EX['windshield-wipers'],
  ],
};

// ─── Core finisher supersets ──────────────────────────────

// Push days: hanging leg raise → ab wheel → dragon flag
const ssCoreFinisherPush = {
  id: 'F', label: 'Core Finisher', rings: 'bar', rounds: 2,
  restIntra: 45, restRound: 90,
  exercises: [
    EX['hanging-leg-raise'],
    EX['ab-wheel-rollout'],
    EX['butt-lift'],
    EX['hollow-body-hold'],
    EX['windshield-wipers'],
    EX['dragon-flag'],
  ],
};

// Pull days: hanging leg raise → ab wheel → tuck-to-L (hip flexor compression from hang)
const ssCoreFinisherPull = {
  id: 'F', label: 'Core Finisher', rings: 'bar', rounds: 2,
  restIntra: 45, restRound: 90,
  exercises: [
    EX['hanging-leg-raise'],
    EX['ab-wheel-rollout'],
    EX['butt-lift'],
    EX['v-sit-pulse'],
  ],
};

// ─── Flexibility sessions ─────────────────────────────────

export const FLEX_SESSIONS = [
  {
    id:    'flex-lower',
    label: 'Lower Body Opening',
    focus: 'Pancake · Front split · Hip flexors',
    duration: '~45 min',
    poses: [
      { name: 'Diaphragmatic breathing',       duration: '2 min',   note: 'Wide stance, hands on ribs. Exhale fully — let the pelvic floor drop.', cue: 'Every exhale, release deeper' },
      { name: 'Deep squat — wide feet',        duration: '3 min',   note: 'Heels on floor if possible, elbows push knees. Gentle rock side to side.', cue: 'Exhale → floor gets closer' },
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
      { name: 'Figure-4 — left',                 duration: '2 min',   note: 'Supine. Cross ankle over opposite knee. Flex foot. Pull gently toward chest.', cue: 'Push knee away with elbow' },
      { name: 'Figure-4 — right',                duration: '2 min',   note: null, cue: null },
      { name: 'Sleeping pigeon — left',          duration: '3 min',   note: 'The most important pose for leg behind head. Front shin parallel to mat. Hips square.', cue: 'Exhale — hip melts toward floor' },
      { name: 'Sleeping pigeon — right',         duration: '3 min',   note: 'Stay longer on your tighter side.', cue: null },
      { name: 'Seated figure-4 — left',          duration: '90s',     note: 'Sit upright, ankle on opposite thigh. Slowly fold forward.', cue: null },
      { name: 'Seated figure-4 — right',         duration: '90s',     note: null, cue: null },
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
];

// ─── Sessions ─────────────────────────────────────────────

export const SESSIONS = [
  {
    id: 'mon-push1',
    day: 'Monday', weekday: 1,
    type: 'push', label: 'Push 1',
    focus: 'Anterior legs · Dips & Overhead · Core finisher',
    skills: ['handstand', 'planche'],
    warmup: WARMUP_PUSH,
    supersets: [
      ssOverheadSkillMon,                        // A — skill tries
      ssLegsAnterior,                            // B — legs
      ssOverheadDipsStrength,                    // C — overhead + dips strength
      ssIsolationPushMon,                        // D — shoulder health + isolation
      ssCoreFinisherPush,                        // E — core
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'wed-pull1',
    day: 'Wednesday', weekday: 3,
    type: 'pull', label: 'Pull 1',
    focus: 'Posterior legs · Iron Cross · Back Lever',
    skills: ['iron-cross', 'back-lever'],
    warmup: WARMUP_PULL_WED,
    supersets: [
      ssSkillPowerWed,                            // A — skill tries
      ssSkillSupportWed,                          // B — skill support
      ssLegsPosterior,                            // C — legs
      ssStrengthVolume,                           // D — strength volume
      ssIsolationPull,                            // E — isolation
      ssCoreFinisherPull,                         // F — core
    ],
    cooldown: COOLDOWN_PULL,
  },
  {
    id: 'thu-push2',
    day: 'Friday', weekday: 5,
    type: 'push', label: 'Push 2',
    focus: 'Anterior legs · Overhead & Horizontal Push · Core finisher',
    skills: ['handstand', 'muscle-up', 'manna'],
    warmup: WARMUP_PUSH,
    supersets: [
      ssOverheadSkillFri,                          // A — skill tries
      ssSkillSupportFri,                           // B — skill support
      ssLegsAnteriorB,                             // C — legs (loaded variant)
      ssHorizontalPush,                            // D — horizontal push
      ssIsolationPushFri,                          // E — isolation
      ssCoreFinisherPush,                          // F — core
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'sat-pull2',
    day: 'Saturday', weekday: 6,
    type: 'pull', label: 'Pull 2',
    focus: 'Posterior legs · Muscle Up · Back Lever',
    skills: ['muscle-up', 'back-lever'],
    warmup: WARMUP_PULL_SAT,
    supersets: [
      ssSkillPowerSat,                             // A — skill tries
      ssSkillSupportSat,                           // B — skill support
      ssLegsPosteriorB,                            // C — legs (loaded variant)
      ssStrengthVolume,                            // D — strength volume
      ssIsolationPull,                             // E — isolation
      ssCoreFinisherPull,                          // F — core
    ],
    cooldown: COOLDOWN_PULL,
  },
];
