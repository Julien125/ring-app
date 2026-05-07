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
    EX['superman-hold'],
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
  id: 'A', label: 'Skill — Handstand', rings: 'none', rounds: 3,
  restIntra: 30, restRound: 120,
  exercises: [
    EX['wall-kick-up'],
    EX['chest-wall-handstand'],
    EX['back-wall-handstand'],
    EX['toe-pulls'],
    EX['shoulderpress-negative'],
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
  id: 'A', label: 'Skill Support — Iron Cross & Back Lever', rings: 'high', rounds: 3,
  restIntra: 30, restRound: 90,
  exercises: [
    EX['iron-cross-pull'],
    EX['front-lever-hold'],
    EX['german-hang'],
    EX['back-lever-negative'],
    EX['hollow-body-hold'],
    EX['false-grip-dead-hang'],
    EX['wide-support-hold'],
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
    EX['chest-to-bar'],
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
      ssSkillSupportWed,                          // A — skill support (no separate skill tries block)
      ssLegsPosterior,                            // B — legs
      ssStrengthVolume,                           // C — strength volume
      ssIsolationPull,                            // D — isolation
      ssCoreFinisherPull,                         // E — core
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
