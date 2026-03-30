// ─── Volume zones ─────────────────────────────────────────
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
  10: { label: 'Deload',      phaseWeek: 1, phaseTotalWeeks: 1, roundMult: 0.6,  repMult: 0.6, isDeload: true },
};
