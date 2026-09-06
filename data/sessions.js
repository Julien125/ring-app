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

// ─── Sessions — Monthly Designer Program (2026-09-06) ──────
// Priority order: (a) reclaim below_best benchmark lifts, (b) zero-volume
// groups [none this month], (c) lowest-completion gymnastic skills
// (shoulderstand-press; forward-roll/backward-roll have no matching EX and
// are skipped — practice separately as floor tumbling), (d) shoulder width
// for the shoulder:waist gap (1.40 vs 1.618 goal).

export const SESSIONS = [
  {
    id: 'mon-push-designer',
    day: 'Monday', weekday: 1,
    type: 'push', label: 'Push — Reclaim & Width',
    focus: 'HSPU/Ring Dip reclaim · Shoulderstand Press skill · Shoulder width · Core reclaim',
    skills: ['shoulderstand-press'],
    warmup: WARMUP_PUSH,
    supersets: [
      {
        id: 'A', label: 'Skill — Shoulderstand Press', rings: 'none', rounds: 3,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['shoulderpress-negative'], note: 'Shoulderstand Press skill, lowest-completion (1/4) — 5s controlled descent' },
        ],
      },
      {
        id: 'B', label: 'Push Strength — Benchmark Reclaim', rings: 'mid', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['hspu'], note: 'Reclaim — best_ever 7, current 5' },
          { ...EX['ring-dip-deep'], note: 'Reclaim — best_ever 7, current 5' },
        ],
      },
      {
        id: 'C', label: 'Shoulder Width', rings: 'low', rounds: 3,
        restIntra: 30, restRound: 90,
        exercises: [
          { ...EX['lateral-raise'], note: 'Shoulder:waist 1.40 vs 1.618 goal — priority isolation' },
          EX['korean-dips'],
        ],
      },
      {
        id: 'D', label: 'Core Finisher — Reclaim', rings: 'bar', rounds: 4,
        restIntra: 45, restRound: 90,
        exercises: [
          { ...EX['dragon-flag'], note: 'Reclaim — best_ever 9, current 5' },
          { ...EX['hollow-body-hold'], note: 'Added core volume — anti-extension base' },
        ],
      },
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'wed-pull-designer',
    day: 'Wednesday', weekday: 3,
    type: 'pull', label: 'Pull — Reclaim & Width',
    focus: 'Chest to Bar/Row reclaim · Shoulder width · Core reclaim',
    skills: [],
    warmup: WARMUP_PULL_WED,
    supersets: [
      {
        id: 'A', label: 'Strength Volume — Benchmark Reclaim', rings: 'high', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['chest-to-bar'], note: 'Reclaim — best_ever 8, current 7' },
          { ...EX['row'], note: 'Reclaim — best_ever 10, current 9' },
        ],
      },
      {
        id: 'B', label: 'Isolation — Benchmark Reclaim', rings: 'mid', rounds: 3,
        restIntra: 30, restRound: 90,
        exercises: [
          { ...EX['pelican-curl'], note: 'Reclaim — best_ever 10, current 8' },
        ],
      },
      {
        id: 'C', label: 'Shoulder Width', rings: 'mid', rounds: 3,
        restIntra: 30, restRound: 90,
        exercises: [
          { ...EX['tyi-raise'], note: 'Shoulder:waist 1.40 vs 1.618 goal — lower trap + rear delt' },
          EX['face-pull'],
        ],
      },
      {
        id: 'D', label: 'Core Finisher — Reclaim', rings: 'bar', rounds: 3,
        restIntra: 45, restRound: 90,
        exercises: [
          { ...EX['windshield-wipers'], note: 'Reclaim — best_ever 12, current 8' },
          { ...EX['hanging-leg-raise'], note: 'Added core volume — hip flexion + grip' },
        ],
      },
    ],
    cooldown: COOLDOWN_PULL,
  },
  {
    id: 'fri-push-designer',
    day: 'Friday', weekday: 5,
    type: 'push', label: 'Push — Reclaim, Legs & Width',
    focus: 'Ring Dip reclaim · Pistol Squat reclaim · Shoulder width · Core reclaim',
    skills: [],
    warmup: WARMUP_PUSH,
    supersets: [
      {
        id: 'A', label: 'Push Strength — Benchmark Reclaim', rings: 'mid', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['ring-dip-deep'], note: 'Second weekly exposure — reclaim best_ever 7, current 5' },
        ],
      },
      {
        id: 'B', label: 'Legs — Benchmark Reclaim', rings: 'none', rounds: 4,
        restIntra: 60, restRound: 90,
        exercises: [
          { ...EX['pistol-squat'], note: 'Reclaim — best_ever 30, current 10, largest gap of all benchmarks. Rebuild volume progressively' },
          { ...EX['bulgarian-split-squat'], note: 'Quad volume support for pistol squat reclaim' },
        ],
      },
      {
        id: 'C', label: 'Shoulder Width', rings: 'low', rounds: 3,
        restIntra: 30, restRound: 90,
        exercises: [
          EX['russian-push-up'],
          { ...EX['ring-y-raise'], note: 'Shoulder:waist 1.40 vs 1.618 goal — lower trap, slow and controlled' },
        ],
      },
      {
        id: 'D', label: 'Core Finisher — Reclaim', rings: 'bar', rounds: 3,
        restIntra: 45, restRound: 90,
        exercises: [
          { ...EX['dragon-flag'], note: 'Second weekly exposure — reclaim best_ever 9, current 5' },
          { ...EX['ab-wheel-rollout'], note: 'Added core volume — anti-extension overload' },
        ],
      },
    ],
    cooldown: COOLDOWN_PUSH,
  },
  {
    id: 'sat-pull-designer',
    day: 'Saturday', weekday: 6,
    type: 'pull', label: 'Pull — Reclaim, Legs & Width',
    focus: 'Commande/Row reclaim · Nordic maintain · Shoulder width · Core reclaim',
    skills: [],
    warmup: WARMUP_PULL_SAT,
    supersets: [
      {
        id: 'A', label: 'Strength Volume — Benchmark Reclaim', rings: 'high', rounds: 4,
        restIntra: 45, restRound: 120,
        exercises: [
          { ...EX['commande'], note: 'Reclaim — best_ever 8, current 7. Most overdue benchmark, last logged 2026-06-03' },
          { ...EX['row'], note: 'Second weekly exposure — reclaim best_ever 10, current 9' },
        ],
      },
      {
        id: 'B', label: 'Legs — Maintain', rings: 'none', rounds: 3,
        restIntra: 60, restRound: 90,
        exercises: [
          { ...EX['nordic-curl'], note: 'At best_ever (8) — maintain' },
        ],
      },
      {
        id: 'C', label: 'Shoulder Width & Isolation', rings: 'mid', rounds: 3,
        restIntra: 30, restRound: 90,
        exercises: [
          { ...EX['ring-support-shrug'], note: 'Shoulder:waist 1.40 vs 1.618 goal — upper trap, arms straight' },
          { ...EX['one-arm-ring-curl'], note: 'Complements Pelican Curl reclaim without duplicating it' },
        ],
      },
      {
        id: 'D', label: 'Core Finisher — Reclaim', rings: 'bar', rounds: 3,
        restIntra: 45, restRound: 90,
        exercises: [
          { ...EX['windshield-wipers'], note: 'Second weekly exposure — reclaim best_ever 12, current 8' },
          { ...EX['l-sit'], note: 'Added core volume — compression + hip flexor' },
        ],
      },
    ],
    cooldown: COOLDOWN_PULL,
  },
];
