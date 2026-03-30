// ─── Re-export shim ───────────────────────────────────────
// All data now lives in focused modules. This file re-exports
// everything so existing import paths keep working.
//
//   data/exercises.js  — EX library (50 exercises)
//   data/skills.js     — SKILL_PROGRESSIONS (10 skills)
//   data/phases.js     — PHASES, VOLUME
//   data/sessions.js   — SESSIONS (4 sessions, all supersets)

export { EX }                  from './exercises.js';
export { SKILL_PROGRESSIONS }  from './skills.js';
export { VOLUME, PHASES }      from './phases.js';
export { SESSIONS }            from './sessions.js';
