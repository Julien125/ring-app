// ─────────────────────────────────────────────────────────
//  Ring App — Main Logic
// ─────────────────────────────────────────────────────────

import { SESSIONS, FLEX_SESSIONS, PHASES, VOLUME, SKILL_PROGRESSIONS, EX } from './data/program.js';

// ─── Constants ────────────────────────────────────────────
const STORAGE_KEY  = 'ring-app-state';
const ACTIVE_KEY   = 'ring-app-active';
const CIRC         = 2 * Math.PI * 88; // SVG timer ring circumference

// ─── Date helper (local timezone, avoids UTC offset bugs) ─
const fmtLocal = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

// ─── State ────────────────────────────────────────────────
let state = { currentWeek: 1, sessionCount: 0, log: [], skillLevels: {}, skillHistory: [] };

// ─── Adaptations (separate store — never mutates log) ─────
const ADAPT_KEY = 'ring-app-adaptations';
let adaptations = {
  targets:  {},  // { exerciseId: { value, reason, since } }
  rests:    {},  // { 'sessionId:ssId:type': { value, reason, since } }
  flags:    [],  // [{ exerciseId, type, date, acknowledged, ... }]
  patterns: [],  // [{ type, exerciseId?, detectedDate, dismissed }]
};

// Default skill levels — front-lever pre-set to 5 (achieved)
const DEFAULT_SKILL_LEVELS = {
  'planche':             1,
  'shoulderstand-press': 1,
  'muscle-up':           1,
  'iron-cross':          1,
  'back-lever':          1,
  'manna':               1,
  'ring-handstand':      1,
  'front-lever':         5,
  'forward-roll':        1,
  'backward-roll':       1,
};

// active session (ephemeral, persisted for resume)
let A = null;
/*  A = {
      sessionId,              // e.g. 'mon-push1'
      session,                // reference to SESSIONS[...]
      ssIdx,                  // 0-2 current superset
      exIdx,                  // exercise index within superset
      round,                  // 1-based current round
      log,                    // { exerciseId: { sets: [] } }
      skillsDone,
      warmupDone,
      startTime,
      complete,
    }
*/

// timer worker
let worker = null;
let timerRestSecs = 0;
let timerRestTotal = 0;

// stopwatch (S-04)
let swInterval = null;
let swSecs = 0;
let swRunning = false;
// unilateral hold state
let swSide  = 1;   // 1 = left in progress, 2 = right in progress
let swLeft  = 0;   // left side secs (stored after first stop)

// ─── Boot ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  loadAdaptations();
  initWorker();
  registerSW();
  bindGlobalUI();
  bindNav();
  goHome();
});

// ─── Persistence ──────────────────────────────────────────
function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) state = { ...state, ...JSON.parse(s) };
    // Merge skill levels: preserve saved, fill missing with defaults
    state.skillLevels = { ...DEFAULT_SKILL_LEVELS, ...(state.skillLevels || {}) };
    const a = localStorage.getItem(ACTIVE_KEY);
    if (a) {
      A = JSON.parse(a);
      // Re-hydrate session reference — deserialized object may be stale if
      // program.js changed since last save. Always use live SESSIONS data.
      if (A) {
        A.session = SESSIONS.find(s => s.id === A.sessionId) || null;
        if (!A.session) A = null; // sessionId no longer exists — discard
      }
    }
  } catch (_) {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadAdaptations() {
  try {
    const a = localStorage.getItem(ADAPT_KEY);
    if (a) adaptations = { ...adaptations, ...JSON.parse(a) };
  } catch (_) {}
}

function saveAdaptations() {
  localStorage.setItem(ADAPT_KEY, JSON.stringify(adaptations));
}

// ─── Effective target / rest (program default + adaptation) ─
function getEffectiveTarget(ex) {
  // ex is an exercise object from SESSIONS
  const adapted = adaptations.targets[ex.id];
  if (adapted) return adapted.value;
  return ex.type === 'hold' ? ex.targetSecs : ex.targetReps;
}

function getEffectiveRest(sessionId, ssId, type) {
  // type: 'intra' | 'round'
  const key = `${sessionId}:${ssId}:${type}`;
  const adapted = adaptations.rests[key];
  if (adapted) return { value: adapted.value, adjusted: true, reason: adapted.reason };
  const sess = SESSIONS.find(s => s.id === sessionId);
  const ss   = sess?.supersets.find(s => s.id === ssId);
  if (!ss) return { value: 25, adjusted: false };
  const base = type === 'intra' ? ss.restIntra : ss.restRound;
  return { value: base, adjusted: false };
}

function saveActive() {
  if (A) localStorage.setItem(ACTIVE_KEY, JSON.stringify(A));
}

function clearActive() {
  A = null;
  localStorage.removeItem(ACTIVE_KEY);
}

// ─── Service Worker ───────────────────────────────────────
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
  }
}

// ─── Timer Worker ─────────────────────────────────────────
function initWorker() {
  try {
    worker = new Worker('./timer-worker.js');
    worker.onmessage = ({ data }) => {
      if (data.type === 'tick') onTimerTick(data.seconds);
      if (data.type === 'done') onTimerDone();
    };
  } catch (_) {
    worker = null;
  }
}

function startCountdown(secs) {
  timerRestTotal = secs;
  timerRestSecs  = secs;
  if (worker) worker.postMessage({ type: 'start-countdown', seconds: secs });
}

function stopTimer() {
  if (worker) worker.postMessage({ type: 'stop' });
}

function addTime(secs) {
  timerRestSecs += secs;
  timerRestTotal = Math.max(timerRestTotal, timerRestSecs);
  if (worker) worker.postMessage({ type: 'add', seconds: secs });
}

function onTimerTick(secs) {
  timerRestSecs = secs;
  if (secs === 3) cueRestWarning();
  const screen = currentScreen();
  if (screen === 's-05') updateRestUI('s05', secs);
  if (screen === 's-06') updateRestUI('s06', secs);
}

function onTimerDone() {
  const screen = currentScreen();
  if (screen === 's-05' || screen === 's-06') {
    const valEl = screen === 's-05' ? q('#s05-val') : q('#s06-val');
    if (valEl) valEl.classList.add('overtime');
    // Haptics — vibrate on rest end
    if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
    cueRestEnd();
    // Auto-advance after 1.5 s — user can still tap "Next" early
    setTimeout(() => {
      if (currentScreen() === screen) {
        stopTimer();
        renderExercise();
      }
    }, 1500);
  }
}

function updateRestUI(pfx, secs) {
  const valEl  = q(`#${pfx}-val`);
  const ringEl = q(`#${pfx}-ring`);
  if (!valEl || !ringEl) return;

  const display = Math.abs(secs);
  const isOver  = secs < 0;
  valEl.textContent = display;
  valEl.classList.toggle('overtime', isOver);

  const progress = timerRestTotal > 0 ? Math.max(0, secs / timerRestTotal) : 0;
  ringEl.style.strokeDashoffset = CIRC * (1 - progress);
}

// ─── Screen management ────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('is-active'));
  const el = q(`#${id}`);
  if (el) el.classList.add('is-active');
}

function currentScreen() {
  const el = document.querySelector('.screen.is-active');
  return el ? el.id : null;
}

function q(sel) { return document.querySelector(sel); }

// ─── Phase helpers ────────────────────────────────────────
function phase() { return PHASES[state.currentWeek] || PHASES[1]; }

// How many sessions remain until the phase label changes (for countdown badge)
function sessionsUntilPhaseChange() {
  const currentLabel = phase().label;
  let w = state.currentWeek;
  let weeksLeft = 0;
  while (w <= 10 && (PHASES[w] || PHASES[1]).label === currentLabel) {
    weeksLeft++;
    w++;
  }
  const sessInCurrentWeek = 4 - (state.sessionCount % 4);
  return sessInCurrentWeek + (weeksLeft - 1) * 4;
}

// Label of the phase that follows the current one
function nextPhaseName() {
  const currentLabel = phase().label;
  for (let w = state.currentWeek + 1; w <= 11; w++) {
    const p = PHASES[w] || PHASES[1]; // wraps to meso start
    if (p.label !== currentLabel) return p.label;
  }
  return PHASES[1].label;
}

function getTargetReps(ex) {
  const mult = phase().repMult;
  if (ex.type === 'hold') return ex.targetSecs;
  return Math.round((ex.targetReps || 5) * mult);
}

// ─── Nav ──────────────────────────────────────────────────
function bindNav() {
  q('#nav-today').addEventListener('click', () => {
    stopTimer(); stopStopwatch(); stopVoiceInput(); window.speechSynthesis?.cancel();
    goHome();
  });
  q('#nav-live').addEventListener('click', () => {
    if (!A || A.complete) return;
    resumeSession();
  });
  q('#nav-muscles').addEventListener('click', () => {
    stopTimer(); stopStopwatch(); stopVoiceInput(); window.speechSynthesis?.cancel();
    renderMusclesWeek();
  });
  q('#nav-progress').addEventListener('click', () => {
    stopTimer(); stopStopwatch(); stopVoiceInput(); window.speechSynthesis?.cancel();
    renderProgress();
  });
  q('#nav-skills').addEventListener('click', () => {
    stopTimer(); stopStopwatch(); stopVoiceInput(); window.speechSynthesis?.cancel();
    renderSkillsOverview();
  });
}

// activeTab: 'today' | 'live' | 'muscles' | 'progress' | 'skills'
function updateNav(activeTab) {
  const hasSession = A !== null && !A.complete;

  ['today', 'live', 'muscles', 'progress', 'skills'].forEach(tab => {
    const el = q(`#nav-${tab}`);
    if (!el) return;
    el.classList.toggle('active', tab === activeTab);
    if (tab === 'live') {
      el.classList.toggle('is-live',     hasSession);
      el.classList.toggle('is-disabled', !hasSession);
    }
  });
}

// ─── Global UI bindings ───────────────────────────────────
function bindGlobalUI() {
  // All Progress screen buttons — delegation so render timing doesn't matter
  document.addEventListener('click', e => {
    const id = e.target.closest('button')?.id;
    if (id === 's13-gist-save')     { saveGistToken(); return; }
    if (id === 's13-drive-backup')  { gistBackup();    return; }
    if (id === 's13-drive-restore') { gistRestore();   return; }
    if (id === 's13-paste-restore') { pasteRestore();  return; }
    if (id === 's13-export-json')   { exportJSON();    return; }
    if (id === 's13-export-csv')    { exportCSV();     return; }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 's13-import-input') {
      const file = e.target.files[0];
      if (file) importJSON(file);
      e.target.value = '';
    }
  });

  // Session picker — tap backdrop to dismiss
  q('#dialog-pick').addEventListener('click', e => {
    if (e.target === q('#dialog-pick')) hideDialog('dialog-pick');
  });

  // Quit dialog
  q('#dq-keep').addEventListener('click', () => hideDialog('dialog-quit'));
  q('#dq-save').addEventListener('click', () => {
    hideDialog('dialog-quit');
    stopTimer();
    saveActive();
    goHome();
  });

  // Skip dialog — reason picker
  let _skipReason = null;
  q('#ds-reasons').addEventListener('click', e => {
    const btn = e.target.closest('.skip-reason-btn');
    if (!btn) return;
    _skipReason = btn.dataset.reason;
    q('#ds-reasons').querySelectorAll('.skip-reason-btn').forEach(b => b.classList.toggle('is-selected', b === btn));
    q('#ds-skip').disabled = false;
  });
  q('#ds-cancel').addEventListener('click', () => {
    _skipReason = null;
    q('#ds-reasons').querySelectorAll('.skip-reason-btn').forEach(b => b.classList.remove('is-selected'));
    q('#ds-skip').disabled = true;
    hideDialog('dialog-skip');
  });
  q('#ds-skip').addEventListener('click', () => {
    const reason = _skipReason || 'other';
    _skipReason = null;
    q('#ds-reasons').querySelectorAll('.skip-reason-btn').forEach(b => b.classList.remove('is-selected'));
    q('#ds-skip').disabled = true;
    hideDialog('dialog-skip');
    doSkipExercise(reason);
  });

  // Adaptation badge popover on exercise screens
  bindAdaptBadgePopover('s-03');
  bindAdaptBadgePopover('s-04');

  // Adaptation popover dismiss
  q('#dp-cancel')?.addEventListener('click', () => hideDialog('dialog-adapt'));

  // Audio toggle
  q('#s13-audio-toggle')?.addEventListener('change', e => setAudioOn(e.target.checked));

  // Unlock AudioContext on first touch (browser autoplay policy)
  document.addEventListener('touchstart', () => getAudioCtx(), { capture: true, passive: true, once: true });

  // Swipe-left on exercise screens → skip
  bindSwipeToSkip();
}

function bindSwipeToSkip() {
  let touchStartX = 0;
  let touchStartY = 0;
  const IDS = ['s-03', 's-04'];
  IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      // Horizontal swipe left ≥ 80px, not a vertical scroll
      if (dx < -80 && dy < 50) {
        const skipBtn = el.querySelector('[id$="-skip"]');
        if (skipBtn) skipBtn.click();
      }
    }, { passive: true });
  });
}

function showDialog(id) {
  const el = q(`#${id}`);
  if (el) el.classList.add('is-active');
}

function hideDialog(id) {
  const el = q(`#${id}`);
  if (el) el.classList.remove('is-active');
}

// ═══════════════════════════════════════════════════════════
//  ADAPTATION ENGINE — Signal Detection (Phase 2)
// ═══════════════════════════════════════════════════════════
//
//  Open questions resolved:
//  Q1 — Sensitivity: hardcoded "middle path" — silent target bumps visible
//       via ↑/↓ badges. Athlete always one tap away from reset.
//  Q3 — Exercise swap: when suggested (repeated-skip pattern), athlete picks
//       manually. No automated alternatives until exercise library is built.
//  Q4 — Week advancement: adapted targets + rests reset on phase label change.
//       Within the same phase, adaptations carry across weeks.

// Guard: never adapt during deload, always exclude skill exercises
function canAdapt() { return !phase().isDeload; }
const SKILL_IDS = new Set(
  Object.values(SESSIONS).flatMap ? [] : []  // populated lazily below
);
function isSkillExercise(exId) {
  // Skills are tracked in SKILL_PROGRESSIONS, not supersets
  return exId in (typeof SKILL_PROGRESSIONS !== 'undefined' ? SKILL_PROGRESSIONS : {});
}

// detectFading(sets) — true if every set is strictly less than the previous
// Requires at least 3 sets to be meaningful
function detectFading(sets) {
  if (!sets || sets.length < 3) return false;
  const nums = sets.map(v => typeof v === 'number' ? v : 0);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] >= nums[i - 1]) return false;
  }
  return true;
}

// detectPerformanceSignal(sets, target)
// Returns 'above' | 'below' | 'fading' | 'on-target' | null
function detectPerformanceSignal(sets, target) {
  if (!sets || sets.length === 0 || !target) return null;
  const nums = sets.map(v => typeof v === 'number' ? v : 0).filter(v => v > 0);
  if (nums.length === 0) return null;

  if (detectFading(nums)) return 'fading';

  const aboveCount = nums.filter(v => v >= target + 2).length;
  const belowCount = nums.filter(v => v <= target - 2).length;

  if (aboveCount >= 2) return 'above';
  if (belowCount >= 2) return 'below';
  return 'on-target';
}

// detectAsymmetry(leftSecs, rightSecs)
// Returns { pct, weak: 'left'|'right', flagged } or null
function detectAsymmetry(leftSecs, rightSecs) {
  if (!leftSecs || !rightSecs || leftSecs <= 0 || rightSecs <= 0) return null;
  const diff = Math.abs(leftSecs - rightSecs);
  const stronger = Math.max(leftSecs, rightSecs);
  const pct = Math.round((diff / stronger) * 100);
  return {
    pct,
    weak: leftSecs < rightSecs ? 'left' : 'right',
    flagged: pct >= 20,
  };
}

// classifySession(entry)
// entry: { exercises: {id: {sets}}, skips: [], durationSecs }
// Returns 'light' | 'normal' | 'heavy' | 'long'
function classifySession(entry) {
  const sess = SESSIONS.find(s => s.id === entry.sessionId);
  if (!sess) return 'normal';

  const skips = entry.skips || [];
  const fatigueSkips = skips.filter(s => s.reason === 'fatigue').length;
  const timeSkips    = skips.filter(s => s.reason === 'time').length;

  if (timeSkips >= 2) return 'long';
  if (fatigueSkips >= 2) return 'heavy';

  // Check overall reps vs targets
  let totalBelow = 0, totalExercises = 0;
  sess.supersets.forEach(ss => {
    ss.exercises.forEach(ex => {
      const logged = entry.exercises?.[ex.id];
      if (!logged || !logged.sets) return;
      totalExercises++;
      const target = ex.type === 'hold' ? ex.targetSecs : ex.targetReps;
      const signal = detectPerformanceSignal(logged.sets, target);
      if (signal === 'below') totalBelow++;
    });
  });

  if (totalExercises === 0) return 'normal';
  const belowRatio = totalBelow / totalExercises;
  if (belowRatio >= 0.3) return 'heavy';

  // Check for light — all on target or above, no skips
  if (skips.length === 0 && belowRatio === 0) return 'light';
  return 'normal';
}

// ─── S-01 Home ────────────────────────────────────────────
function goHome() {
  stopTimer();
  stopStopwatch();
  stopVoiceInput();
  window.speechSynthesis?.cancel();
  renderHome();
  renderPatternCard();
  showScreen('s-01');
  updateNav('today');
}

function renderPatternCard() {
  const card    = q('#s01-pattern-card');
  const msgEl   = q('#s01-pattern-msg');
  const actBtn  = q('#s01-pattern-act');
  const disBtn  = q('#s01-pattern-dismiss');
  if (!card || !msgEl) return;

  // Find first undismissed pattern
  const pattern = adaptations.patterns.find(p => !p.dismissed);
  if (!pattern) { card.style.display = 'none'; return; }

  msgEl.textContent = pattern.msg;

  // Wire action button based on pattern type
  actBtn.style.display = 'none';
  if (pattern.type === 'plateau') {
    actBtn.textContent = 'Go to Skills →';
    actBtn.style.display = '';
    actBtn.onclick = () => {
      pattern.dismissed = true;
      saveAdaptations();
      card.style.display = 'none';
      renderSkillsOverview();
    };
  } else if (pattern.type === 'long-session') {
    actBtn.textContent = 'Trim SS D to 2 rounds';
    actBtn.style.display = '';
    actBtn.onclick = () => {
      // Soft cap: store in adaptations as a session override
      if (!adaptations.sessionOverrides) adaptations.sessionOverrides = {};
      const sid = pattern.sessionId;
      if (sid) {
        if (!adaptations.sessionOverrides[sid]) adaptations.sessionOverrides[sid] = {};
        adaptations.sessionOverrides[sid].trimLastSS = true;
      }
      pattern.dismissed = true;
      saveAdaptations();
      card.style.display = 'none';
    };
  } else if (pattern.type === 'phase-readiness') {
    actBtn.textContent = `Move to Phase ${state.currentWeek + 1}`;
    actBtn.style.display = '';
    actBtn.onclick = () => {
      state.currentWeek = Math.min(state.currentWeek + 1, 10);
      saveState();
      pattern.dismissed = true;
      saveAdaptations();
      renderHome();
      card.style.display = 'none';
    };
  }

  disBtn.onclick = () => {
    pattern.dismissed = true;
    saveAdaptations();
    card.style.display = 'none';
  };

  card.style.display = '';
}

function renderHome() {
  const today = getTodaySession();
  const ph    = phase();

  // Date + week
  const now = new Date();
  q('#s01-date').textContent = now.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  q('#s01-week').textContent = `W${state.currentWeek}/10 · ${ph.label} (${ph.phaseWeek}/${ph.phaseTotalWeeks})`;

  // Week progress dots — Mon / Wed / Thu / Sat
  renderWeekDots();

  // Streak + phase countdown
  const streak = getStreak();
  const sessUntilPhaseChange = sessionsUntilPhaseChange();
  const nextPhaseLabel = nextPhaseName();
  const metaEl = q('#s01-meta');
  if (metaEl) {
    const streakHtml = streak > 1 ? `<span class="meta-badge meta-badge--fire">🔥 ${streak}w streak</span>` : '';
    const deloadHtml = ph.isDeload
      ? `<span class="meta-badge meta-badge--deload">Deload — back off, recover</span>`
      : '';
    const phaseHtml  = !ph.isDeload && sessUntilPhaseChange <= 8
      ? `<span class="meta-badge">${sessUntilPhaseChange} session${sessUntilPhaseChange !== 1 ? 's' : ''} → ${nextPhaseLabel}</span>`
      : '';
    metaEl.innerHTML  = streakHtml + deloadHtml + phaseHtml;
    metaEl.style.display = (streakHtml || deloadHtml || phaseHtml) ? '' : 'none';
  }

  if (!today) {
    // Rest day
    q('#s01-phase').textContent = ph.label;
    q('#s01-label').textContent = 'Rest day';
    q('#s01-focus').textContent = 'Recovery · mobility · sleep';
    q('#s01-cta').textContent = 'Start flexibility →';
    q('#s01-cta').disabled = false;
    q('#s01-cta').onclick = renderFlexPicker;
    q('#s01-secondary').style.display = 'none';
    q('#s01-pick').style.display = '';
    q('#s01-pick').textContent = 'Train anyway →';
    q('#s01-pick').onclick = showSessionPicker;
    return;
  }

  q('#s01-phase').textContent = ph.label;
  q('#s01-label').textContent = today.label;
  q('#s01-focus').textContent = today.focus;
  q('#s01-cta').disabled = false;

  if (A && A.sessionId === today.id) {
    // Resume
    q('#s01-cta').textContent = 'Resume session →';
    q('#s01-cta').onclick = resumeSession;
    q('#s01-secondary').style.display = '';
    q('#s01-secondary').textContent = 'Start over';
    q('#s01-secondary').onclick = () => { clearActive(); startSession(today); };
    q('#s01-pick').style.display = 'none';
  } else {
    q('#s01-cta').textContent = 'Start session →';
    q('#s01-cta').onclick = () => startSession(today);
    q('#s01-secondary').style.display = 'none';
    q('#s01-pick').style.display = '';
    q('#s01-pick').textContent = 'Pick different session →';
    q('#s01-pick').onclick = showSessionPicker;
  }
}

function getTodaySession() {
  const wd = new Date().getDay(); // 0=Sun,1=Mon,...6=Sat
  return SESSIONS.find(s => s.weekday === wd) || null;
}

// ─── Session init ─────────────────────────────────────────
function startSession(session) {
  clearActive();
  A = {
    sessionId:   session.id,
    session,
    ssIdx:       0,
    exIdx:       0,
    round:       1,
    log:         {},
    skips:       [],
    skillsDone:  false,
    warmupDone:  false,
    startTime:   Date.now(),
    complete:    false,
    softRemoved: [],   // exerciseIds soft-removed for this session
  };
  saveActive();

  // Check for unacknowledged pain flags in today's exercises
  const painFlags = getPainFlagsForSession(session);
  if (painFlags.length > 0) {
    renderPainCheckin(painFlags, () => renderWarmup());
  } else {
    renderWarmup();
  }
}

// getPainFlagsForSession — find unresolved pain flags for exercises in session
function getPainFlagsForSession(session) {
  const exerciseIds = new Set(
    session.supersets.flatMap(ss => ss.exercises.map(e => e.id))
  );
  return adaptations.flags.filter(f =>
    f.type === 'pain-skip' &&
    !f.acknowledged &&
    exerciseIds.has(f.exerciseId)
  );
}

// renderPainCheckin — pre-session check-in for flagged exercises
function renderPainCheckin(flags, onContinue) {
  const dialog = q('#dialog-checkin');
  const list   = q('#dc-list');
  if (!dialog || !list) { onContinue(); return; }

  list.innerHTML = flags.map((f, i) => {
    const sess = SESSIONS.find(s => s.id === f.sessionId);
    const ex   = sess?.supersets.flatMap(ss => ss.exercises).find(e => e.id === f.exerciseId);
    const name = ex?.name || f.exerciseId;
    return `
      <div class="checkin-item" data-i="${i}" data-exid="${f.exerciseId}">
        <div class="checkin-item__name">${name}</div>
        <div class="checkin-item__flag">flagged ${f.date} — discomfort</div>
        <div class="checkin-item__actions">
          <button class="checkin-btn checkin-btn--fine"    data-action="fine"   data-i="${i}">Feels fine — keep it</button>
          <button class="checkin-btn checkin-btn--skip"    data-action="skip"   data-i="${i}">Still sore — skip today</button>
          <button class="checkin-btn checkin-btn--remove"  data-action="remove" data-i="${i}">Remove from this block</button>
        </div>
      </div>`;
  }).join('');

  let resolved = 0;
  list.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const idx    = +btn.dataset.i;
    const flag   = flags[idx];

    // Mark flag acknowledged
    const stored = adaptations.flags.find(f =>
      f.exerciseId === flag.exerciseId && f.type === 'pain-skip' && !f.acknowledged);
    if (stored) stored.acknowledged = true;

    if (action === 'skip') {
      if (!A.skips) A.skips = [];
      A.skips.push({ exerciseId: flag.exerciseId, reason: 'pain', ssIdx: null, round: 0, date: fmtLocal(new Date()) });
      A.softRemoved = [...(A.softRemoved || []), flag.exerciseId];
    } else if (action === 'remove') {
      A.softRemoved = [...(A.softRemoved || []), flag.exerciseId];
    }

    // Dim the item
    btn.closest('.checkin-item').style.opacity = '0.4';
    btn.closest('.checkin-item').querySelectorAll('button').forEach(b => b.disabled = true);

    resolved++;
    if (resolved >= flags.length) {
      saveAdaptations();
      saveActive();
      hideDialog('dialog-checkin');
      onContinue();
    }
  });

  showDialog('dialog-checkin');
}

function resumeSession() {
  if (!A) return;
  // Restore session reference from data
  A.session = SESSIONS.find(s => s.id === A.sessionId);
  if (!A.session) { clearActive(); goHome(); return; }

  if (!A.warmupDone) { renderWarmup(); return; }
  if (!A.skillsDone) { renderSkills(); return; }
  renderOverview();
}

// ─── S-15 Warm-up ─────────────────────────────────────────
function renderWarmup() {
  const sess = A.session;
  q('#s15-session').textContent = sess.label;
  q('#s15-title').textContent   = sess.day;

  const list = q('#s15-list');
  list.innerHTML = '';
  const checked = new Set();

  sess.warmup.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'warmup-item';
    el.innerHTML = `
      <div class="warmup-check" data-i="${i}">✓</div>
      <div class="warmup-item__body">
        <div class="warmup-item__name">${item.name}</div>
        <div class="warmup-item__duration">${item.duration}</div>
        <div class="warmup-item__note">${item.note}</div>
      </div>`;
    el.addEventListener('click', () => {
      const done = el.classList.toggle('is-done');
      if (done) checked.add(i); else checked.delete(i);
    });
    list.appendChild(el);
  });

  q('#s15-cta').onclick = () => { A.warmupDone = true; saveActive(); renderSkills(); };
  q('#s15-skip').onclick = () => { A.warmupDone = true; saveActive(); renderSkills(); };

  showScreen('s-15');
  updateNav('live');
}

// ─── Shared skill card builder ────────────────────────────
// opts.showDots    — show level progress dots (overview)
// opts.showDone    — show "Mark done" button (session block)
// opts.onLevelUp   — callback when Level Up is tapped
function buildSkillCard(skillId, opts = {}) {
  const prog = SKILL_PROGRESSIONS[skillId];
  if (!prog) return null;

  const level    = state.skillLevels[skillId] || 1;
  const maxLevel = prog.progressions.length;
  const cur      = prog.progressions[Math.min(level, maxLevel) - 1];
  const achieved = level >= maxLevel;

  const setsLabel = cur.type === 'hold'
    ? `${cur.sets} × ${cur.targetSecs}s`
    : `${cur.sets} × ${cur.targetReps} reps`;

  const dotsHtml = opts.showDots
    ? `<div style="margin-bottom:8px">${
        Array.from({ length: maxLevel }, (_, i) =>
          `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:3px;background:${i < level ? 'var(--progress)' : 'var(--line-2)'}"></span>`
        ).join('')
      }</div>`
    : '';

  const supportHtml = prog.support && prog.support.length
    ? `<div class="skill-card__support">Support: ${prog.support.map(id => EX[id] ? EX[id].name : id).join(' · ')}</div>`
    : '';

  const isDeload   = phase().isDeload;
  const actionsHtml = `
    <div class="skill-card__actions">
      ${opts.showDone ? `<button class="skill-btn skill-btn--done" data-id="${skillId}">Mark done</button>` : ''}
      ${!achieved && !isDeload ? `<button class="skill-btn skill-btn--up" data-id="${skillId}">Level Up ↑</button>` : ''}
      ${!achieved &&  isDeload ? `<span class="skill-card__deload-note">Deload — no level ups this week</span>` : ''}
    </div>`;

  const el = document.createElement('div');
  el.className = `skill-card${achieved ? ' skill-card--achieved' : ''}`;
  el.innerHTML = `
    <div class="skill-card__head">
      <div class="skill-card__name">${prog.name}</div>
      ${achieved
        ? `<span class="skill-lvl-badge skill-lvl-badge--done">✓ Achieved</span>`
        : `<span class="skill-lvl-badge">L${level} / ${maxLevel}</span>`}
    </div>
    ${dotsHtml}
    <div class="skill-card__goal">${prog.goal}</div>
    <div class="skill-card__drill">${cur.drill}</div>
    <div class="skill-card__sets">${setsLabel}</div>
    ${cur.note  ? `<div class="skill-card__note">${cur.note}</div>` : ''}
    ${!achieved ? `<div class="skill-card__criteria">→ ${cur.criteria}</div>` : ''}
    ${supportHtml}
    ${actionsHtml}`;

  const doneBtn = el.querySelector('.skill-btn--done');
  if (doneBtn) doneBtn.addEventListener('click', e => {
    e.currentTarget.classList.toggle('is-done');
    e.currentTarget.textContent = e.currentTarget.classList.contains('is-done') ? '✓ Done' : 'Mark done';
  });

  const upBtn = el.querySelector('.skill-btn--up');
  if (upBtn && opts.onLevelUp) upBtn.addEventListener('click', () => opts.onLevelUp(skillId));

  return el;
}

// ─── S-08 Skills ──────────────────────────────────────────
function renderSkills() {
  const sess = A.session;
  q('#s08-session').textContent = sess.label;

  const list = q('#s08-list');
  list.innerHTML = '';

  sess.skills.forEach(skillId => {
    const card = buildSkillCard(skillId, {
      showDots: false,
      showDone: true,
      onLevelUp: levelUpSkill,
    });
    if (card) list.appendChild(card);
  });

  q('#s08-cta').onclick = () => { A.skillsDone = true; saveActive(); renderOverview(); };
  showScreen('s-08');
  updateNav('live');
}

function levelUpSkill(skillId) {
  const prog = SKILL_PROGRESSIONS[skillId];
  if (!prog) return;
  const current = state.skillLevels[skillId] || 1;
  if (current < prog.progressions.length) {
    const next = current + 1;
    state.skillLevels[skillId] = next;
    if (!state.skillHistory) state.skillHistory = [];
    state.skillHistory.push({
      skillId,
      fromLevel: current,
      toLevel:   next,
      drill:     prog.progressions[next - 1].drill,
      date:      fmtLocal(new Date()),
    });
    saveState();
    // Re-render the appropriate screen — caller decides context
    if (A && !A.complete) renderSkills(); else renderSkillsOverview();
  }
}

// ─── S-12 Skills Overview ─────────────────────────────────
function renderSkillsOverview() {
  q('#s12-week').textContent = `W${state.currentWeek}/10 · ${phase().label}`;

  const list = q('#s12-list');
  list.innerHTML = '';

  Object.keys(SKILL_PROGRESSIONS).forEach(skillId => {
    const card = buildSkillCard(skillId, {
      showDots: true,
      showDone: false,
      onLevelUp: id => levelUpSkill(id),
    });
    if (card) list.appendChild(card);
  });

  // ── Level-up history timeline ──────────────────────────
  const history = (state.skillHistory || []).slice().reverse(); // most recent first
  if (history.length) {
    const section = document.createElement('div');
    section.style.cssText = 'padding: 20px var(--px) 0';

    const title = document.createElement('div');
    title.className = 'section-label';
    title.style.marginBottom = '12px';
    title.textContent = 'Level-up history';
    section.appendChild(title);

    history.forEach(entry => {
      const prog = SKILL_PROGRESSIONS[entry.skillId];
      const row  = document.createElement('div');
      row.className = 'skill-history-row';
      row.innerHTML = `
        <div class="skill-history-row__left">
          <span class="skill-history-row__level">L${entry.fromLevel} → L${entry.toLevel}</span>
          <span class="skill-history-row__date">${entry.date}</span>
        </div>
        <div class="skill-history-row__right">
          <span class="skill-history-row__name">${prog ? prog.name : entry.skillId}</span>
          <span class="skill-history-row__drill">${entry.drill || ''}</span>
        </div>`;
      section.appendChild(row);
    });

    list.appendChild(section);
  }

  showScreen('s-12');
  updateNav('skills');
}

// ─── S-02 Overview ────────────────────────────────────────
function renderOverview() {
  const sess = A.session;
  const ph   = phase();

  q('#s02-phase').textContent = ph.label;
  q('#s02-title').textContent = sess.label;

  q('#s02-quit').onclick = () => showDialog('dialog-quit');

  const grid = q('#s02-grid');
  grid.innerHTML = '';

  sess.supersets.forEach((ss, i) => {
    const isDone    = i < A.ssIdx;
    const isCurrent = i === A.ssIdx;

    const col = document.createElement('div');
    col.className = 'ss-col' + (isDone ? ' is-done' : '') + (isCurrent ? ' is-current' : '');

    // Header
    const totalRounds = Math.round(ss.rounds * phase().roundMult);
    let dotsHtml = '';
    for (let r = 1; r <= totalRounds; r++) {
      const cls = isDone ? 'round-dot--done' : (isCurrent && r < A.round ? 'round-dot--done' : (isCurrent && r === A.round ? 'round-dot--active' : 'round-dot'));
      dotsHtml += `<div class="round-dot ${cls}"></div>`;
    }

    let exRowsHtml = '';
    ss.exercises.forEach((ex, ei) => {
      const exDone = isDone || (isCurrent && (A.round > totalRounds));
      const exCur  = isCurrent && ei === A.exIdx && !isDone;
      const cls    = exDone ? 'ss-ex-row is-done' : (exCur ? 'ss-ex-row is-current' : 'ss-ex-row');
      const target = ex.type === 'hold' ? `${ex.targetSecs}s` : `${ex.targetReps}r`;
      // Show logged sets if any
      const loggedSets = (A.log[ex.id] || { sets: [] }).sets;
      const setsStr = loggedSets.length
        ? loggedSets.map(v => ex.type === 'hold' ? `${v}s` : v).join(' · ')
        : target;
      exRowsHtml += `<div class="${cls}">
        <div class="dot dot--${ex.category}"></div>
        <div class="ss-ex-row__name">${ex.name}</div>
        <div class="t-label-xs" style="color:${loggedSets.length ? 'var(--progress)' : ''}">${setsStr}</div>
      </div>`;
    });

    col.innerHTML = `
      <div class="ss-col__head">
        <div class="ss-col__letter">${ss.id}</div>
        <div class="ss-col__name">${ss.label}</div>
      </div>
      <div class="round-dots" style="padding:6px 10px; border-bottom:1px solid var(--line)">${dotsHtml}</div>
      <div style="padding:4px 0">${exRowsHtml}</div>`;

    // All supersets are tappable — jump to any one freely
    col.style.cursor = 'pointer';
    col.addEventListener('click', () => {
      if (i !== A.ssIdx) {
        // Jumping to a different superset — reset position within it
        A.ssIdx = i;
        A.round = 1;
        A.exIdx = 0;
        saveActive();
      }
      enterSuperset();
    });
    grid.appendChild(col);
  });

  // CTA button — always points to current superset
  const cta = q('#s02-cta');
  const ss  = sess.supersets[A.ssIdx];
  cta.textContent = A.ssIdx === 0 ? 'Start first superset →' : `Start ${ss.id} — ${ss.label} →`;
  cta.onclick = enterSuperset;

  showScreen('s-02');
  updateProgressStrip();
  updateNav('live');
}

function enterSuperset() {
  const ss = A.session.supersets[A.ssIdx];
  A.exIdx  = 0;
  A.round  = A.round || 1;
  saveActive();
  renderExercise();
}

// ─── S-03/04 Active exercise ──────────────────────────────
function renderExercise() {
  const ss  = A.session.supersets[A.ssIdx];
  const ex  = ss.exercises[A.exIdx];
  const totalRounds = Math.round(ss.rounds * phase().roundMult);

  // Skip soft-removed exercises silently
  if (A.softRemoved?.includes(ex.id)) {
    advance(ss, totalRounds);
    return;
  }

  if (ex.type === 'hold') renderHold(ex, ss, totalRounds);
  else                    renderReps(ex, ss, totalRounds);
}

function buildBreadcrumb(ss, totalRounds) {
  return `SS ${ss.id} · Round ${A.round}/${totalRounds}`;
}

function buildExDots(ss) {
  return ss.exercises.map((_, i) => {
    if (i < A.exIdx) return `<div class="ex-dot ex-dot--done"></div>`;
    if (i === A.exIdx) return `<div class="ex-dot ex-dot--now"></div>`;
    return `<div class="ex-dot"></div>`;
  }).join('');
}

function buildSetPills(ex, ss) {
  const totalRounds = Math.round(ss.rounds * phase().roundMult);
  const logged = (A.log[ex.id] || { sets: [] }).sets;
  let html = '';
  for (let r = 1; r <= totalRounds; r++) {
    const val = logged[r - 1];
    const isCurrent = r === A.round && val === undefined;
    const isDone    = val !== undefined;
    const cls   = isDone    ? 'set-pill set-pill--done'
                : isCurrent ? 'set-pill set-pill--current'
                :             'set-pill';
    // Done: show reps/secs. Current/future: show round number so pill reads as an indicator, not a mystery dash
    const label = isDone
      ? (ex.type === 'hold' ? `${val}s` : `${val}`)
      : `${r}`;
    html += `<div class="${cls}">${label}</div>`;
  }
  return html;
}

function buildMuscleChips(ex) {
  return (ex.muscles.primary || []).map(m =>
    `<div class="muscle-chip">${m}</div>`
  ).join('');
}

// buildAdaptBadge — inline badge ↑/↓ next to target, tap-to-explain
function buildAdaptBadge(ex, adapted, progTarget) {
  const dir    = adapted.value > progTarget ? '↑' : '↓';
  const label  = adapted.reason === 'above-target'
    ? `Above target 2 sessions running — bumped from ${progTarget}`
    : `Below target 2 sessions running — pulled back from ${progTarget}`;
  return ` <span class="adapt-badge adapt-badge--${dir === '↑' ? 'up' : 'down'}"
    data-exid="${ex.id}" data-label="${label}" data-prog="${progTarget}">${dir}</span>`;
}

function bindAdaptBadgePopover(screenId) {
  const screen = q(`#${screenId}`);
  if (!screen) return;
  screen.addEventListener('click', e => {
    const badge = e.target.closest('.adapt-badge');
    if (!badge) return;
    const exId = badge.dataset.exid;
    const label = badge.dataset.label;
    const prog  = badge.dataset.prog;
    showAdaptPopover(exId, label, prog);
  });
}

function showAdaptPopover(exId, label, progTarget) {
  // Simple inline popover — reuse dialog mechanism
  q('#dp-body').textContent  = label;
  q('#dp-reset').onclick = () => {
    delete adaptations.targets[exId];
    saveAdaptations();
    hideDialog('dialog-adapt');
    renderExercise(); // re-render current exercise
  };
  showDialog('dialog-adapt');
}

function renderReps(ex, ss, totalRounds) {
  const progTarget = getTargetReps(ex);
  const adapted    = adaptations.targets[ex.id];
  const target     = adapted ? adapted.value : progTarget;
  const logged     = (A.log[ex.id] || { sets: [] }).sets;
  const lastLogged = logged.length > 0 ? logged[logged.length - 1] : null;
  // Auto-progression: if last round beat the target, default to lastRound − 1
  let currentReps = (lastLogged !== null && lastLogged > target) ? lastLogged - 1 : target;

  q('#s03-breadcrumb').textContent = buildBreadcrumb(ss, totalRounds);
  q('#s03-dots').innerHTML         = buildExDots(ss);
  q('#s03-cat').className          = `cat-tag cat-tag--${ex.category}`;
  q('#s03-cat').textContent        = ex.category;
  q('#s03-name').textContent       = ex.name;
  q('#s03-desc').textContent       = ex.desc || '';
  // Show target with optional adaptation badge
  const isAutoAdjusted = lastLogged !== null && lastLogged > target;
  const badge = adapted ? buildAdaptBadge(ex, adapted, progTarget) : '';
  q('#s03-target').innerHTML       = `${isAutoAdjusted ? currentReps : target}${badge}`;
  q('#s03-setnum').textContent     = `${A.round}/${totalRounds}`;
  q('#s03-pills').innerHTML        = buildSetPills(ex, ss);
  q('#s03-muscles').innerHTML      = buildMuscleChips(ex);
  q('#s03-note').textContent       = ex.note || '';
  q('#s03-val').textContent        = currentReps;

  // "Last set" reference — show previous round's value if on round 2+
  const lastSetWrap = q('#s03-lastset-wrap');
  const lastSetEl   = q('#s03-lastset');
  if (logged.length > 0 && A.round > 1) {
    const prev = logged[logged.length - 1];
    lastSetEl.innerHTML = `Last set: <strong>${prev} reps</strong>`;
    lastSetWrap.style.display = '';
  } else {
    lastSetWrap.style.display = 'none';
  }

  // Tempo chip
  const tempoChip = q('#s03-tempo-chip');
  if (ex.tempo) {
    tempoChip.style.display = '';
    q('#s03-tempo').textContent = ex.tempo;
  } else {
    tempoChip.style.display = 'none';
  }

  // Stepper
  q('#s03-minus').onclick = () => {
    currentReps = Math.max(0, currentReps - 1);
    q('#s03-val').textContent = currentReps;
  };
  q('#s03-plus').onclick = () => {
    currentReps = currentReps + 1;
    q('#s03-val').textContent = currentReps;
  };

  // Done
  q('#s03-done').onclick = () => logSet(currentReps);

  // Skip
  q('#s03-skip').onclick = () => {
    q('#ds-body').textContent = `Skip "${ex.name}"? This set won't be logged.`;
    showDialog('dialog-skip');
  };

  showScreen('s-03');
  announceExercise(ex);
  startVoiceInput('reps');
  updateProgressStrip();
  updateNav('live');
}

function renderHold(ex, ss, totalRounds) {
  const progTarget   = ex.targetSecs;
  const adapted      = adaptations.targets[ex.id];
  const target       = adapted ? adapted.value : progTarget;
  const isUnilateral = !!ex.unilateral;

  q('#s04-breadcrumb').textContent = buildBreadcrumb(ss, totalRounds);
  q('#s04-dots').innerHTML         = buildExDots(ss);
  q('#s04-cat').className          = `cat-tag cat-tag--${ex.category}`;
  q('#s04-cat').textContent        = ex.category;
  q('#s04-name').textContent       = ex.name;
  q('#s04-desc').textContent       = ex.desc || '';
  const badge = adapted ? buildAdaptBadge(ex, adapted, progTarget) : '';
  q('#s04-target').innerHTML       = isUnilateral ? `${target}s / side${badge}` : `${target}s${badge}`;
  q('#s04-setnum').textContent     = `${A.round}/${totalRounds}`;
  q('#s04-pills').innerHTML        = buildSetPills(ex, ss);
  q('#s04-muscles').innerHTML      = buildMuscleChips(ex);
  q('#s04-note').textContent       = ex.note || '';

  // Toggle bilateral vs unilateral timer layout
  q('#s04-sw-single').style.display = isUnilateral ? 'none' : '';
  q('#s04-sw-dual').style.display   = isUnilateral ? '' : 'none';
  q('#s04-side-wrap').style.display = isUnilateral ? '' : 'none';

  resetStopwatch();

  if (isUnilateral) {
    // ── Unilateral: two-phase left → right ───────────────
    swSide = 1; swLeft = 0;
    q('#s04-side-label').textContent = 'LEFT SIDE';
    q('#s04-sw-left').textContent    = '0';
    q('#s04-sw-right').textContent   = '—';

    q('#s04-start').textContent       = 'Start — left';
    q('#s04-start').style.display = '';
    q('#s04-stop').style.display  = 'none';
    q('#s04-stop').textContent    = 'Stop left';

    q('#s04-start').onclick = () => {
      q('#s04-start').style.display = 'none';
      q('#s04-stop').style.display  = 'none';
      startHoldCountdown(() => {
        startStopwatch();
        q('#s04-stop').style.display = '';
        q('#s04-stop').textContent   = swSide === 1 ? 'Stop left' : 'Stop right & log';
      });
    };

    q('#s04-stop').onclick = () => {
      const elapsed = stopStopwatch();
      if (swSide === 1) {
        // Left done — store it, flip to right
        swLeft = elapsed;
        swSide = 2;
        q('#s04-sw-left').textContent  = elapsed;
        q('#s04-sw-right').textContent = '0';
        q('#s04-side-label').textContent = 'RIGHT SIDE';
        resetStopwatch();
        // Brief haptic cue
        if (navigator.vibrate) navigator.vibrate(80);
        // Show start for right side
        q('#s04-start').textContent   = 'Start — right';
        q('#s04-start').style.display = '';
        q('#s04-stop').style.display  = 'none';
        q('#s04-stop').textContent    = 'Stop right & log';
      } else {
        // Right done — log min(left, right)
        q('#s04-sw-right').textContent = elapsed;
        if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
        logSet(Math.min(swLeft, elapsed));
      }
    };

    // Live update for unilateral — update active side display
    const origStart = q('#s04-start').onclick;
    const _startOrig = startStopwatch;
    // Override updateSwDisplay to also update the correct side cell
    // (handled by swSide flag — see updateSwDisplay override below)

  } else {
    // ── Bilateral: single timer ───────────────────────────
    q('#s04-start').textContent   = 'Start hold';
    q('#s04-start').style.display = '';
    q('#s04-stop').style.display  = 'none';

    q('#s04-start').onclick = () => {
      q('#s04-start').style.display = 'none';
      q('#s04-stop').style.display  = 'none';
      startHoldCountdown(() => {
        startStopwatch();
        q('#s04-stop').style.display = '';
      });
    };

    q('#s04-stop').onclick = () => {
      const elapsed = stopStopwatch();
      logSet(elapsed);
    };
  }

  q('#s04-skip').onclick = () => {
    q('#ds-body').textContent = `Skip "${ex.name}"? This hold won't be logged.`;
    showDialog('dialog-skip');
  };

  showScreen('s-04');
  announceExercise(ex);
  startVoiceInput('hold');
  updateProgressStrip();
  updateNav('live');
}

// ─── Stopwatch (S-04) ─────────────────────────────────────
function startHoldCountdown(onDone) {
  // 3-2-1 countdown in the stopwatch display before recording starts
  let count = 3;
  const el = q('#s04-sw');
  if (el) el.textContent = count;
  if (navigator.vibrate) navigator.vibrate(40);
  cueCountdownTick(3);
  const iv = setInterval(() => {
    count--;
    if (count > 0) {
      if (el) el.textContent = count;
      if (navigator.vibrate) navigator.vibrate(40);
      cueCountdownTick(count);
    } else {
      clearInterval(iv);
      if (el) el.textContent = '0';
      if (navigator.vibrate) navigator.vibrate(80);
      cueCountdownTick(0);
      onDone();
    }
  }, 1000);
}

function startStopwatch() {
  swSecs = 0;
  swRunning = true;
  updateSwDisplay(0);
  swInterval = setInterval(() => {
    swSecs++;
    updateSwDisplay(swSecs);
  }, 1000);
}

function stopStopwatch() {
  clearInterval(swInterval);
  swInterval = null;
  swRunning = false;
  return swSecs;
}

function resetStopwatch() {
  clearInterval(swInterval);
  swInterval = null;
  swRunning = false;
  swSecs = 0;
  updateSwDisplay(0);
}

function updateSwDisplay(secs) {
  // Bilateral — single display
  const el = q('#s04-sw');
  if (el) el.textContent = secs;
  // Unilateral — live-update the active side cell too
  if (swSide === 1) {
    const lEl = q('#s04-sw-left');
    if (lEl && q('#s04-sw-dual')?.style.display !== 'none') lEl.textContent = secs;
  } else {
    const rEl = q('#s04-sw-right');
    if (rEl && q('#s04-sw-dual')?.style.display !== 'none') rEl.textContent = secs;
  }
}

// ─── Session progress ─────────────────────────────────────
function sessionProgress() {
  if (!A || !A.session) return 0;
  const ph = phase();
  let total = 0, done = 0;
  A.session.supersets.forEach((ss, si) => {
    const rounds = Math.round(ss.rounds * ph.roundMult);
    total += ss.exercises.length * rounds;
    if (si < A.ssIdx) {
      done += ss.exercises.length * rounds;
    } else if (si === A.ssIdx) {
      ss.exercises.forEach(ex => {
        done += Math.min((A.log[ex.id] || { sets: [] }).sets.length, rounds);
      });
    }
  });
  return total > 0 ? done / total : 0;
}

function updateProgressStrip() {
  const strip = q('#session-strip');
  const fill  = q('#session-strip-fill');
  if (!strip || !fill) return;
  if (!A || A.complete) { strip.style.display = 'none'; return; }
  strip.style.display = '';
  fill.style.width = `${Math.round(sessionProgress() * 100)}%`;
}

// ─── PR detection ─────────────────────────────────────────
function isPR(exId, value) {
  const allPrev = state.log.flatMap(e => (e.exercises[exId] || { sets: [] }).sets);
  return allPrev.length > 0 && value > Math.max(...allPrev);
}

// ─── Streak ───────────────────────────────────────────────
function getStreak() {
  if (!state.log.length) return 0;
  const getMonday = d => {
    const date = new Date(d);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return fmtLocal(date);
  };
  const weeksWithSessions = new Set(state.log.map(e => getMonday(e.date)));
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 52; i++) {
    const d = new Date(now.getTime() - i * 7 * 86400000);
    if (weeksWithSessions.has(getMonday(d))) streak++;
    else if (i > 0) break; // allow current week to be partial
  }
  return streak;
}

// ─── Log set & advance ────────────────────────────────────
function logSet(value) {
  const ss  = A.session.supersets[A.ssIdx];
  const ex  = ss.exercises[A.exIdx];
  const totalRounds = Math.round(ss.rounds * phase().roundMult);

  if (!A.log[ex.id]) A.log[ex.id] = { sets: [] };
  A.log[ex.id].sets.push(value);

  // Track PRs
  if (!A.prs) A.prs = {};
  if (isPR(ex.id, value)) A.prs[ex.id] = value;

  saveActive();
  updateProgressStrip();
  advance(ss, totalRounds);
}

function doSkipExercise(reason = 'other') {
  const ss  = A.session.supersets[A.ssIdx];
  const ex  = ss.exercises[A.exIdx];
  // Log the skip with reason for adaptation engine
  if (!A.skips) A.skips = [];
  A.skips.push({
    exerciseId: ex.id,
    reason,
    ssIdx:  A.ssIdx,
    exIdx:  A.exIdx,
    round:  A.round,
    date:   fmtLocal(new Date()),
  });
  saveActive();
  const totalRounds = Math.round(ss.rounds * phase().roundMult);
  advance(ss, totalRounds);
}

function advance(ss, totalRounds) {
  const isLastEx    = A.exIdx >= ss.exercises.length - 1;
  const isLastRound = A.round >= totalRounds;
  const isLastSS    = A.ssIdx >= A.session.supersets.length - 1;

  if (!isLastEx) {
    // More exercises in this round → intra-rest
    const nextEx = ss.exercises[A.exIdx + 1];
    A.exIdx++;
    saveActive();
    showRest('intra', ss, nextEx);
  } else if (!isLastRound) {
    // Last exercise, more rounds → round rest
    A.round++;
    A.exIdx = 0;
    saveActive();
    showRest('round', ss, ss.exercises[0]);
  } else if (!isLastSS) {
    // Superset done, more supersets → back to overview
    A.ssIdx++;
    A.round = 1;
    A.exIdx = 0;
    saveActive();
    renderOverview();
  } else {
    // All done → summary
    finishSession();
  }
}

// ─── S-05/06 Rest ─────────────────────────────────────────
function showRest(type, ss, nextEx) {
  stopVoiceInput();
  window.speechSynthesis?.cancel();
  const isIntra   = type === 'intra';
  const pfx       = isIntra ? 's05' : 's06';
  const screenId  = isIntra ? 's-05' : 's-06';
  const totalRounds = Math.round(ss.rounds * phase().roundMult);

  // Use adapted rest if available, otherwise program default
  const restInfo  = getEffectiveRest(A.sessionId, ss.id, isIntra ? 'intra' : 'round');
  let secs        = restInfo.value;
  let restAdjusted = restInfo.adjusted;
  let restAdjReason = restInfo.reason || '';

  // Intra-session fading check: if the just-completed hold exercise is fading
  // across this round's sets, add +15s automatically
  if (canAdapt() && isIntra) {
    const prevEx = ss.exercises[A.exIdx - 1];
    if (prevEx && prevEx.type === 'hold') {
      const prevSets = (A.log[prevEx.id] || { sets: [] }).sets;
      if (detectFading(prevSets)) {
        secs += 15;
        restAdjusted = true;
        restAdjReason = 'hold time dropping';
      }
    }
  }

  // Confirmed line
  const confirmed = q(`#${pfx}-confirmed`);
  const prevEx    = ss.exercises[isIntra ? A.exIdx - 1 : ss.exercises.length - 1];
  const prevSets  = prevEx ? (A.log[prevEx.id] || { sets: [] }).sets : [];
  const prevVal   = prevSets.length ? prevSets[prevSets.length - 1] : null;
  const prevLabel = prevVal !== null
    ? (prevEx.type === 'hold' ? `${prevVal}s` : `${prevVal} reps`)
    : 'done';

  const wasPR = prevEx && A.prs && A.prs[prevEx.id];
  confirmed.innerHTML = `
    <strong>${prevEx ? prevEx.name : ''}${wasPR ? ' <span class="pr-badge">PR 🔥</span>' : ''}</strong>
    ${prevLabel}`;

  // Breadcrumb
  q(`#${pfx}-breadcrumb`).textContent = buildBreadcrumb(ss, totalRounds);

  // Next up
  q(`#${pfx}-next-name`).textContent = nextEx.name;
  q(`#${pfx}-next-meta`).textContent = nextEx.type === 'hold'
    ? `hold · ${nextEx.targetSecs}s target`
    : `${getTargetReps(nextEx)} reps`;

  // Ring reset
  const ring = q(`#${pfx}-ring`);
  if (ring) {
    ring.style.strokeDashoffset = '0';
    ring.classList.remove('overtime');
  }
  const valEl = q(`#${pfx}-val`);
  if (valEl) {
    valEl.textContent = secs;
    valEl.classList.remove('overtime');
  }

  // Adjusted rest label
  const adjEl = q(`#${pfx}-adj`);
  if (adjEl) {
    adjEl.textContent  = restAdjusted ? `+15s adjusted — ${restAdjReason}` : '';
    adjEl.style.display = restAdjusted ? 'block' : 'none';
  }

  // Buttons
  q(`#${pfx}-add`).onclick = () => addTime(isIntra ? 15 : 30);
  q(`#${pfx}-next`).onclick = () => {
    stopTimer();
    renderExercise();
  };

  cueRestStart();
  startCountdown(secs);
  showScreen(screenId);
  updateProgressStrip();
  updateNav('live');
}

// ─── S-07 Summary ─────────────────────────────────────────
function finishSession() {
  A.complete = true;
  A.endTime  = Date.now();
  saveActive();

  // Save to permanent log
  const entry = {
    id:         crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
    date:       fmtLocal(new Date()),
    sessionId:  A.sessionId,
    week:       state.currentWeek,
    phase:      phase().label,
    durationSecs: Math.round((A.endTime - A.startTime) / 1000),
    complete:   true,
    skillsDone: A.skillsDone,
    exercises:  A.log,
    skips:      A.skips || [],
    prs:        A.prs || {},
    rpe:        null,   // filled in on summary screen
  };
  state.log.push(entry);
  state.sessionCount++;

  // Advance week every 4 sessions (mesocycle = 10 weeks)
  if (state.sessionCount % 4 === 0) {
    const prevPhaseLabel = (PHASES[state.currentWeek] || PHASES[1]).label;
    state.currentWeek = state.currentWeek < 10 ? state.currentWeek + 1 : 1;
    const newPhaseLabel  = (PHASES[state.currentWeek] || PHASES[1]).label;
    // Safeguard: reset target adaptations on phase change so new phase starts fresh
    if (prevPhaseLabel !== newPhaseLabel) {
      adaptations.targets  = {};
      adaptations.rests    = {};
      adaptations.patterns = adaptations.patterns.filter(p => p.dismissed);
      saveAdaptations();
    }
  }

  saveState();
  clearActive();
  autoBackup();
  if (getGistToken()) gistBackup();
  applyInterSessionAdaptations(entry);
  runPatternDetectors(entry);
  renderSummary(entry);
}

function renderSummary(entry, { readOnly = false } = {}) {
  const sess = SESSIONS.find(s => s.id === entry.sessionId);
  const mins  = Math.round(entry.durationSecs / 60);

  q('#s07-date').textContent  = entry.date;
  q('#s07-title').textContent = sess ? sess.label : 'Session';

  // Stats
  const allSets = Object.values(entry.exercises).flatMap(e => e.sets);
  const totalSets = allSets.length;
  const totalReps = allSets.reduce((a, b) => a + b, 0);
  q('#s07-stats').innerHTML = `
    <div class="stat-block">
      <div class="stat-block__val">${mins}<small>min</small></div>
      <div class="stat-block__label">Duration</div>
    </div>
    <div class="stat-block">
      <div class="stat-block__val">${totalSets}</div>
      <div class="stat-block__label">Sets</div>
    </div>
    <div class="stat-block">
      <div class="stat-block__val">${totalReps}</div>
      <div class="stat-block__label">Reps / secs</div>
    </div>`;

  // Log rows
  const logEl = q('#s07-log');
  logEl.innerHTML = '';
  if (sess) {
    sess.supersets.forEach(ss => {
      ss.exercises.forEach(ex => {
        const exLog = entry.exercises[ex.id];
        if (!exLog || !exLog.sets.length) return;
        const setsStr = exLog.sets.map((v, i) =>
          `<span style="margin-right:6px">${i + 1}: ${v}${ex.type === 'hold' ? 's' : ''}</span>`
        ).join('');
        const row = document.createElement('div');
        row.className = 'log-row';
        row.innerHTML = `
          <div class="log-row__name">${ex.name}</div>
          <div class="log-row__sets">${setsStr}</div>`;
        logEl.appendChild(row);
      });
    });
  }

  // Chart — bars per superset
  const chartEl  = q('#s07-chart');
  const labelsEl = q('#s07-chart-labels');
  chartEl.innerHTML  = '';
  labelsEl.innerHTML = '';

  if (sess) {
    const counts = sess.supersets.map(ss => {
      return ss.exercises.reduce((n, ex) => {
        return n + ((entry.exercises[ex.id] || { sets: [] }).sets.length);
      }, 0);
    });
    const maxCount = Math.max(...counts, 1);
    counts.forEach((count, i) => {
      const ss    = sess.supersets[i];
      const pct   = (count / maxCount) * 100;
      const bar   = document.createElement('div');
      bar.className = 'chart-bar' + (pct === 100 ? ' is-max' : '');
      bar.style.height = `${Math.max(pct, 6)}%`;
      chartEl.appendChild(bar);

      const lbl = document.createElement('div');
      lbl.className   = 'chart-label';
      lbl.textContent = `${ss.id} (${count})`;
      labelsEl.appendChild(lbl);
    });
  }

  // PR callouts
  const prEl = q('#s07-prs');
  if (prEl) {
    const prList = Object.entries(entry.prs || {});
    if (prList.length) {
      prEl.innerHTML = prList.map(([exId, val]) => {
        const sess = SESSIONS.find(s => s.id === entry.sessionId);
        const ex   = sess?.supersets.flatMap(ss => ss.exercises).find(e => e.id === exId);
        const label = ex ? ex.name : exId;
        return `<div class="pr-row">🔥 <strong>${label}</strong> — new best: ${val}${ex?.type === 'hold' ? 's' : ' reps'}</div>`;
      }).join('');
      prEl.style.display = '';
    } else {
      prEl.style.display = 'none';
    }
  }

  // RPE selector — hidden in read-only (log review) mode
  const rpeEl = q('#s07-rpe');
  if (rpeEl) {
    if (readOnly) {
      const rpeEmojis = ['😴','🙂','💪','🔥','💀'];
      rpeEl.innerHTML = entry.rpe
        ? `<div class="rpe-label">Effort: ${rpeEmojis[entry.rpe - 1]}</div>`
        : '';
    } else {
    rpeEl.innerHTML = `
      <div class="rpe-label">How hard was that?</div>
      <div class="rpe-buttons">
        ${[['😴','Easy'],['🙂','Moderate'],['💪','Hard'],['🔥','Very hard'],['💀','Max']].map(([e,l],i) =>
          `<button class="rpe-btn" data-rpe="${i+1}" title="${l}">${e}</button>`
        ).join('')}
      </div>`;
    rpeEl.querySelectorAll('.rpe-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        rpeEl.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        // Update the log entry's RPE
        const idx = state.log.findIndex(e => e.id === entry.id);
        if (idx >= 0) { state.log[idx].rpe = +btn.dataset.rpe; saveState(); }
      });
    });
    } // end else (not readOnly)
  }

  // Muscles teaser (taps to S-17)
  renderMusclesSummary(entry);

  // Signals card (autoregulation feedback)
  renderSignalsCard(entry);

  // Cool-down CTA — hidden in read-only mode
  const cdBtn = q('#s07-cooldown');
  if (cdBtn) {
    cdBtn.style.display = (!readOnly && sess?.cooldown?.length) ? '' : 'none';
    if (!readOnly) cdBtn.onclick = () => renderCooldown(sess);
  }

  const doneBtn = q('#s07-done');
  if (readOnly) {
    doneBtn.textContent = '← Back to log';
    doneBtn.onclick = renderProgress;
  } else {
    doneBtn.textContent = 'Done — go home';
    doneBtn.onclick = goHome;
  }
  showScreen('s-07');
  updateProgressStrip(); // hide strip on summary
  updateNav(readOnly ? 'progress' : 'today');
  if (!readOnly) launchConfetti();
}

// ─── Muscle helpers ───────────────────────────────────────
const MUSCLE_LABEL = {
  'lats':'Lats','biceps':'Biceps','rear-delt':'Rear Delt','lateral-delt':'Lateral Delt',
  'front-delt':'Front Delt','chest':'Chest','triceps':'Triceps','shoulders':'Shoulders',
  'core':'Core','lower-back':'Lower Back','glutes':'Glutes','hamstrings':'Hamstrings',
  'quads':'Quads','calves':'Calves','serratus':'Serratus','brachialis':'Brachialis',
  'forearms':'Forearms',
};
// Map each muscle to its training category for colour coding
const MUSCLE_CAT = {
  'chest':'push','triceps':'push','front-delt':'push','serratus':'push',
  'shoulders':'push','lateral-delt':'push',
  'lats':'pull','biceps':'pull','brachialis':'pull','rear-delt':'pull','forearms':'pull',
  'core':'core','lower-back':'core',
  'glutes':'legs','hamstrings':'legs','quads':'legs','calves':'legs',
};
const CAT_META = {
  push: { color: '#6C7FD8', label: 'Push' },
  pull: { color: '#2BA88A', label: 'Pull' },
  core: { color: '#E05470', label: 'Core' },
  legs: { color: '#D4A017', label: 'Legs' },
};

// Build tally: { primary: {muscle: pts}, secondary: {muscle: pts} }
// Points = reps logged (reps exercises) or secs × 0.2 (holds — isometric factor)
// Effective sets = pts / 10  →  thresholds: <4 Maintenance, 4-9 Strength, 10-19 Hypertrophy, 20+ High Volume
const ISOMETRIC_FACTOR = 0.2;
function buildMuscleTally(entry) {
  const sess = SESSIONS.find(s => s.id === entry.sessionId);
  if (!sess) return { primary: {}, secondary: {} };
  const primary = {}, secondary = {};
  sess.supersets.forEach(ss => {
    ss.exercises.forEach(ex => {
      const logged = entry.exercises[ex.id];
      if (!logged || !logged.sets.length) return;
      const isHold = ex.type === 'hold';
      const pts = logged.sets.reduce((sum, v) => {
        const n = typeof v === 'number' ? v : 0;
        return sum + (isHold ? n * ISOMETRIC_FACTOR : n);
      }, 0);
      (ex.muscles?.primary   || []).forEach(m => { primary[m]   = (primary[m]   || 0) + pts; });
      (ex.muscles?.secondary || []).forEach(m => { secondary[m] = (secondary[m] || 0) + pts * 0.5; });
    });
  });
  Object.keys(primary).forEach(m => { delete secondary[m]; });
  return { primary, secondary };
}

// Zone classification based on effective sets (pts / 10)
function muscleZone(pts) {
  const eff = pts / 10;
  if (eff >= 20) return { label: 'High Volume',  color: '#E05050', msg: 'Risk of overreach',       icon: '⚠' };
  if (eff >= 10) return { label: 'Hypertrophy',  color: '#2BA88A', msg: 'Optimal muscle growth',   icon: '✓' };
  if (eff >=  4) return { label: 'Strength',     color: '#6C7FD8', msg: 'Neural adaptation',       icon: '↑' };
  return               { label: 'Maintenance',  color: '#888888', msg: 'Below growth threshold',  icon: '—' };
}

function fmtEff(pts) {
  const e = pts / 10;
  return e % 1 === 0 ? `${e}` : e.toFixed(1);
}

// ═══════════════════════════════════════════════════════════
//  ADAPTATION ENGINE — Inter-session Target Bumps (Phase 5)
// ═══════════════════════════════════════════════════════════

// evaluateTargetBump(ex) → +1 / -1 / 0
// Requires 2 consecutive sessions with the same signal.
// Excluded: pain-flagged exercises, deload phase.
function evaluateTargetBump(ex) {
  if (!canAdapt() || isSkillExercise(ex.id)) return 0;

  // Don't bump if exercise has a pain flag
  const hasPainFlag = adaptations.flags.some(f =>
    f.exerciseId === ex.id && f.type === 'pain-skip' && !f.acknowledged);
  if (hasPainFlag) return 0;

  // Last 2 sessions that contain this exercise
  const relevant = state.log
    .filter(e => e.exercises?.[ex.id]?.sets?.length > 0)
    .slice(-2);
  if (relevant.length < 2) return 0;

  const target = ex.type === 'hold' ? ex.targetSecs : ex.targetReps;
  const signals = relevant.map(e => detectPerformanceSignal(e.exercises[ex.id].sets, target));

  if (signals.every(s => s === 'above'))   return +1;
  if (signals.every(s => s === 'below'))   return -1;
  return 0;
}

// evaluateRestAdjustment(sessionId, ssId, type) → +15 | 0
// Requires fading signal on hold exercise in same position for 2+ sessions.
function evaluateRestAdjustment(sessionId, ss, type) {
  if (!canAdapt()) return 0;
  if (type !== 'intra') return 0; // only intra-rest adjusted for fading holds

  // Find the exercise just before this rest (last in the superset for intra)
  // — we look at the hold exercises in this ss
  const holdExercises = ss.exercises.filter(e => e.type === 'hold');
  if (!holdExercises.length) return 0;

  // Check last 2 sessions for this sessionId
  const relevant = state.log.filter(e => e.sessionId === sessionId).slice(-2);
  if (relevant.length < 2) return 0;

  let fadingCount = 0;
  holdExercises.forEach(ex => {
    const fadingInBoth = relevant.every(e => {
      const sets = e.exercises?.[ex.id]?.sets || [];
      return detectFading(sets);
    });
    if (fadingInBoth) fadingCount++;
  });

  return fadingCount > 0 ? 15 : 0;
}

// applyInterSessionAdaptations(entry) — called after finishSession
// Computes bumps for all exercises in the just-completed session,
// stores results in adaptations.targets and adaptations.rests.
function applyInterSessionAdaptations(entry) {
  if (!canAdapt()) return;
  const sess = SESSIONS.find(s => s.id === entry.sessionId);
  if (!sess) return;

  const today = fmtLocal(new Date());

  sess.supersets.forEach(ss => {
    // Per-exercise target bumps
    ss.exercises.forEach(ex => {
      const bump = evaluateTargetBump(ex);
      if (bump !== 0) {
        const current = getEffectiveTarget(ex);
        const newVal  = current + (ex.type === 'hold' ? bump * 5 : bump);
        adaptations.targets[ex.id] = {
          value:  newVal,
          reason: bump > 0 ? 'above-target' : 'below-target',
          since:  today,
          base:   ex.type === 'hold' ? ex.targetSecs : ex.targetReps,
        };
      }
    });

    // Rest adjustments per superset
    ['intra', 'round'].forEach(type => {
      const adj = evaluateRestAdjustment(entry.sessionId, ss, type);
      if (adj > 0) {
        const key = `${entry.sessionId}:${ss.id}:${type}`;
        const base = type === 'intra' ? ss.restIntra : ss.restRound;
        adaptations.rests[key] = {
          value:  base + adj,
          reason: 'fading hold time',
          since:  today,
          base,
        };
      }
    });
  });

  saveAdaptations();
}

// ═══════════════════════════════════════════════════════════
//  ADAPTATION ENGINE — Session Signals (Phase 4)
// ═══════════════════════════════════════════════════════════

// buildSessionSignals(entry) → array of signal objects (max 3)
// Each signal: { weight: 'quiet'|'flag'|'alert', msg, exerciseId?, type }
function buildSessionSignals(entry) {
  if (!canAdapt()) return [];
  const sess = SESSIONS.find(s => s.id === entry.sessionId);
  if (!sess) return [];

  const signals = [];

  // ── Per-exercise performance signals ──
  sess.supersets.forEach(ss => {
    ss.exercises.forEach(ex => {
      if (isSkillExercise(ex.id)) return;
      const logged = entry.exercises?.[ex.id];
      if (!logged?.sets?.length) return;

      const target = ex.type === 'hold' ? ex.targetSecs : ex.targetReps;
      const sig = detectPerformanceSignal(logged.sets, target);
      const unit = ex.type === 'hold' ? 's' : ' reps';
      const vals = logged.sets.map(v => `${v}${unit}`).join('→');

      if (sig === 'above') {
        signals.push({ weight: 'quiet', type: 'above', exerciseId: ex.id,
          msg: `${ex.name} consistently above target (${vals}) — target moves up next session.` });
      } else if (sig === 'fading') {
        signals.push({ weight: 'flag', type: 'fading', exerciseId: ex.id,
          msg: `${ex.name} dropped ${vals} across sets — adding rest time next session.` });
      } else if (sig === 'below') {
        signals.push({ weight: 'flag', type: 'below', exerciseId: ex.id,
          msg: `${ex.name} below target ${vals} — keeping load, watching next session.` });
      }

      // Unilateral asymmetry
      if (ex.unilateral && logged.leftSecs != null && logged.rightSecs != null) {
        const asym = detectAsymmetry(logged.leftSecs, logged.rightSecs);
        if (asym?.flagged) {
          signals.push({ weight: 'flag', type: 'asymmetry', exerciseId: ex.id,
            msg: `${ex.name} — ${asym.weak} side ${asym.pct}% weaker. Worth addressing.` });
        }
      }
    });
  });

  // ── Skip signals ──
  (entry.skips || []).forEach(skip => {
    const ex = sess.supersets.flatMap(ss => ss.exercises).find(e => e.id === skip.exerciseId);
    const name = ex?.name || skip.exerciseId;
    if (skip.reason === 'pain') {
      signals.push({ weight: 'alert', type: 'pain-skip', exerciseId: skip.exerciseId,
        msg: `${name} skipped — discomfort. Check in before next session.` });
    } else if (skip.reason === 'fatigue') {
      signals.push({ weight: 'flag', type: 'fatigue-skip', exerciseId: skip.exerciseId,
        msg: `${name} skipped — too tired. Watching inter-superset fatigue.` });
    } else if (skip.reason === 'time') {
      signals.push({ weight: 'quiet', type: 'time-skip', exerciseId: skip.exerciseId,
        msg: `${name} skipped — no time. Session may be running long.` });
    }
  });

  // Max 3 items: alerts first, then flags, then quiet
  const order = { alert: 0, flag: 1, quiet: 2 };
  return signals.sort((a, b) => order[a.weight] - order[b.weight]).slice(0, 3);
}

function renderSignalsCard(entry) {
  const wrap = q('#s07-signals-wrap');
  const card = q('#s07-signals');
  if (!wrap || !card) return;

  const signals = buildSessionSignals(entry);
  if (!signals.length) { wrap.style.display = 'none'; return; }

  card.innerHTML = `
    <div class="signals-card__header">Today's signals</div>
    ${signals.map((sig, i) => `
      <div class="signal-item" data-i="${i}">
        <div class="signal-dot signal-dot--${sig.weight}"></div>
        <div class="signal-body">
          <div class="signal-msg">${sig.msg}</div>
          ${sig.weight !== 'quiet'
            ? `<button class="signal-ack" data-i="${i}">Got it</button>`
            : ''}
        </div>
      </div>
    `).join('')}`;

  wrap.style.display = '';

  // Store flags + alerts into adaptations
  signals.forEach(sig => {
    if (sig.weight === 'alert' || sig.weight === 'flag') {
      // Avoid duplicates for same exercise + type on same date
      const exists = adaptations.flags.some(f =>
        f.exerciseId === sig.exerciseId && f.type === sig.type && f.date === entry.date);
      if (!exists) {
        adaptations.flags.push({
          exerciseId:   sig.exerciseId,
          type:         sig.type,
          weight:       sig.weight,
          date:         entry.date,
          sessionId:    entry.sessionId,
          acknowledged: false,
        });
      }
    }
  });
  saveAdaptations();

  // Ack buttons
  card.addEventListener('click', e => {
    const btn = e.target.closest('.signal-ack');
    if (!btn) return;
    const idx = +btn.dataset.i;
    const sig = signals[idx];
    // Mark acknowledged in flags store
    const flag = adaptations.flags.find(f =>
      f.exerciseId === sig.exerciseId && f.type === sig.type && f.date === entry.date);
    if (flag) { flag.acknowledged = true; saveAdaptations(); }
    btn.closest('.signal-item').style.opacity = '0.4';
    btn.disabled = true;
    btn.textContent = '✓';
  });
}

// ═══════════════════════════════════════════════════════════
//  ADAPTATION ENGINE — Pattern Detectors (Phase 7)
// ═══════════════════════════════════════════════════════════

function detectPlateau(exId) {
  // No target change for 3+ consecutive sessions containing this exercise
  if (isSkillExercise(exId)) return false;
  const relevant = state.log.filter(e => e.exercises?.[exId]?.sets?.length > 0).slice(-3);
  if (relevant.length < 3) return false;
  // Check that adaptations.targets[exId] hasn't changed across those 3 sessions
  // Proxy: last 3 sessions all show 'on-target' (not progressing)
  const ex = SESSIONS.flatMap(s => s.supersets.flatMap(ss => ss.exercises)).find(e => e.id === exId);
  if (!ex) return false;
  const target = getEffectiveTarget(ex);
  const signals = relevant.map(e => detectPerformanceSignal(e.exercises[exId].sets, target));
  // Plateau = not above, not improving — on-target or below for 3 sessions
  return signals.every(s => s === 'on-target' || s === 'below' || s === 'fading');
}

function detectRepeatedSkip(exId) {
  // Same exercise skipped in last 3 sessions that contained it (any reason)
  const relevant = state.log
    .filter(e => e.skips?.some(s => s.exerciseId === exId))
    .slice(-3);
  return relevant.length >= 3;
}

function detectLongSession(sessionId) {
  // 2+ time-skips in last 3 instances of this session type
  const relevant = state.log.filter(e => e.sessionId === sessionId).slice(-3);
  const withTimeSkips = relevant.filter(e =>
    (e.skips || []).filter(s => s.reason === 'time').length >= 2
  );
  return withTimeSkips.length >= 2;
}

function detectPersistentAsymmetry(exId) {
  // Weaker side >20% for 3+ sessions
  const relevant = state.log
    .filter(e => e.exercises?.[exId]?.leftSecs != null)
    .slice(-3);
  if (relevant.length < 3) return null;
  const allFlagged = relevant.every(e => {
    const asym = detectAsymmetry(e.exercises[exId].leftSecs, e.exercises[exId].rightSecs);
    return asym?.flagged;
  });
  if (!allFlagged) return null;
  // Return consistent weak side
  const last = relevant[relevant.length - 1];
  return detectAsymmetry(last.exercises[exId].leftSecs, last.exercises[exId].rightSecs);
}

function detectPhaseReadiness() {
  // Light session signal 3 sessions running
  const relevant = state.log.slice(-3);
  if (relevant.length < 3) return false;
  return relevant.every(e => classifySession(e) === 'light');
}

// runPatternDetectors — called after each session save
// Adds at most one new pattern per type to adaptations.patterns
function runPatternDetectors(entry) {
  if (!canAdapt()) return;
  const sess = SESSIONS.find(s => s.id === entry.sessionId);
  if (!sess) return;

  const today = fmtLocal(new Date());

  const addPattern = (p) => {
    // Skip if same type + exerciseId already pending (not dismissed)
    const dup = adaptations.patterns.find(x =>
      x.type === p.type &&
      x.exerciseId === (p.exerciseId || null) &&
      !x.dismissed
    );
    if (!dup) adaptations.patterns.push({ ...p, detectedDate: today, dismissed: false });
  };

  // Per-exercise plateau + repeated skip + asymmetry
  sess.supersets.forEach(ss => {
    ss.exercises.forEach(ex => {
      if (isSkillExercise(ex.id)) return;

      if (detectPlateau(ex.id)) {
        addPattern({ type: 'plateau', exerciseId: ex.id,
          msg: `${ex.name} hasn't progressed in 3 sessions. Consider the next variation in Skills.` });
      }

      if (detectRepeatedSkip(ex.id)) {
        addPattern({ type: 'repeated-skip', exerciseId: ex.id,
          msg: `${ex.name} has been skipped 3 sessions running. Want to swap or remove it for now?` });
      }

      if (ex.unilateral) {
        const asym = detectPersistentAsymmetry(ex.id);
        if (asym) {
          addPattern({ type: 'persistent-asymmetry', exerciseId: ex.id,
            msg: `${ex.name} — ${asym.weak} side consistently weaker. Worth addressing as accessory work.` });
        }
      }
    });
  });

  // Session-level patterns
  if (detectLongSession(entry.sessionId)) {
    const sessLabel = sess.label;
    addPattern({ type: 'long-session', sessionId: entry.sessionId,
      msg: `${sessLabel} keeps running long. Trim SS D to 2 rounds to fit your schedule?` });
  }

  if (detectPhaseReadiness()) {
    addPattern({ type: 'phase-readiness',
      msg: `You've been above target all week, every session. Ready to move to Phase ${state.currentWeek + 1}?` });
  }

  saveAdaptations();
}

// ─── S-07 Muscles teaser ──────────────────────────────────
function renderMusclesSummary(entry) {
  const teaserEl = q('#s07-muscles-teaser');
  const chipsEl  = q('#s07-muscles-chips');
  if (!teaserEl || !chipsEl) return;

  const { primary } = buildMuscleTally(entry);
  const top = Object.entries(primary).sort((a,b) => b[1]-a[1]).slice(0, 5);
  if (!top.length) { teaserEl.style.display = 'none'; return; }

  teaserEl.style.display = '';
  chipsEl.innerHTML = top.map(([m]) => {
    const cat   = MUSCLE_CAT[m] || 'push';
    const color = CAT_META[cat]?.color || '#6C7FD8';
    return `<span class="muscles-teaser__chip">
      <span class="muscles-teaser__chip-dot" style="background:${color}"></span>
      ${MUSCLE_LABEL[m] || m}
    </span>`;
  }).join('');

  teaserEl.onclick = () => renderMusclesDetail(entry);
}

// ─── S-17 Muscles — weekly view (from nav) ────────────────
function renderMusclesWeek() {
  // Current Mon–Sun window
  const now     = new Date();
  const dow     = (now.getDay() + 6) % 7; // Mon=0 … Sun=6
  const monday  = new Date(now); monday.setDate(now.getDate() - dow); monday.setHours(0,0,0,0);
  const sunday  = new Date(monday); sunday.setDate(monday.getDate() + 6); sunday.setHours(23,59,59,999);
  const monStr  = fmtLocal(monday);
  const sunStr  = fmtLocal(sunday);

  const weekEntries = state.log.filter(e => e.date >= monStr && e.date <= sunStr);

  // Update S-17 header for weekly context
  const sessEl = q('#s17-session');
  if (sessEl) sessEl.textContent = `W${state.currentWeek} · ${monStr} → ${sunStr}`;

  if (!weekEntries.length) {
    // Empty state
    q('#s17-total-sets').textContent = '0';
    q('#s17-legend').innerHTML = '';
    // Clear donut to track only
    const donutEl = q('#s17-donut');
    while (donutEl.children.length > 1) donutEl.removeChild(donutEl.lastChild);
    q('#s17-groups').innerHTML = `<div class="md-empty">No sessions logged this week yet.</div>`;
    q('#s17-back').onclick = goHome;
    q('#s17-done').onclick = goHome;
    showScreen('s-17');
    updateNav('muscles');
    return;
  }

  // Merge tallies across all week sessions
  const primary = {}, secondary = {};
  weekEntries.forEach(entry => {
    const { primary: p, secondary: s } = buildMuscleTally(entry);
    Object.entries(p).forEach(([m, v]) => { primary[m]   = (primary[m]   || 0) + v; });
    Object.entries(s).forEach(([m, v]) => { secondary[m] = (secondary[m] || 0) + v; });
  });
  // Re-strip secondary overlap after merging
  Object.keys(primary).forEach(m => { delete secondary[m]; });

  // Build a synthetic "entry-like" object the detail renderer can use
  // by passing pre-built tallies directly to the donut + bar builders
  _renderMusclesFull({ primary, secondary },
    `W${state.currentWeek} · ${monStr} → ${sunStr}`,
    weekEntries.length > 1
      ? `${weekEntries.length} sessions`
      : SESSIONS.find(s => s.id === weekEntries[0].sessionId)?.label || '',
    goHome
  );

  // Show multi-week region summary chart
  const chartWrap = q('#s17-chart-wrap');
  if (chartWrap) {
    renderWeeklyChart(q('#s17-chart'));
    chartWrap.style.display = '';
  }

  updateNav('muscles');
}

// ─── Multi-week Region Summary chart ─────────────────────
function renderWeeklyChart(container) {
  if (!container) return;

  const catOrder   = ['push', 'pull', 'core', 'legs'];
  const catLabels  = { push: 'Push', pull: 'Pull', core: 'Core', legs: 'Legs' };

  // Aggregate pts per week per category
  const weekData = {}; // { weekNum: { push, pull, core, legs } }
  state.log.forEach(entry => {
    const wk = entry.week;
    if (!wk) return;
    if (!weekData[wk]) weekData[wk] = { push: 0, pull: 0, core: 0, legs: 0 };
    const { primary } = buildMuscleTally(entry);
    Object.entries(primary).forEach(([m, pts]) => {
      const cat = MUSCLE_CAT[m] || 'push';
      if (weekData[wk][cat] !== undefined) weekData[wk][cat] += pts;
    });
  });

  const weeks = Object.keys(weekData).map(Number).sort((a, b) => a - b);
  if (!weeks.length) { container.innerHTML = ''; return; }

  // Global max for bar scaling
  const allVals = weeks.flatMap(wk => catOrder.map(c => weekData[wk][c] || 0));
  const globalMax = Math.max(...allVals, 1);

  // Week colours — cycle through 10 shades
  const WEEK_COLORS = [
    '#6C7FD8','#2BA88A','#D4A017','#E05470',
    '#9B6FD8','#3FC4A0','#E8C44A','#FF7A7A',
    '#7FB3FF','#A0D88A',
  ];

  // Legend
  const legendHtml = weeks.map(wk => `
    <div class="region-chart__legend-item">
      <span class="region-chart__legend-dot" style="background:${WEEK_COLORS[(wk-1) % 10]}"></span>
      W${wk}
    </div>`).join('');

  // Build group columns
  const groupsHtml = catOrder.map(cat => {
    const bars = weeks.map(wk => {
      const pts    = weekData[wk][cat] || 0;
      const pct    = Math.round(pts / globalMax * 100);
      const color  = WEEK_COLORS[(wk - 1) % 10];
      return `<div class="region-chart__bar" data-pct="${pct}" style="background:${color}; height:0%"
               title="W${wk} · ${catLabels[cat]} · ${fmtEff(pts)} eff. sets"></div>`;
    }).join('');
    return `
      <div class="region-chart__group">
        <div class="region-chart__bars">${bars}</div>
        <div class="region-chart__group-label" style="color:${CAT_META[cat].color}">${catLabels[cat]}</div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="region-chart">
      <div class="region-chart__legend">${legendHtml}</div>
      <div class="region-chart__plot">${groupsHtml}</div>
    </div>`;

  // Animate bars
  requestAnimationFrame(() => requestAnimationFrame(() => {
    container.querySelectorAll('.region-chart__bar').forEach(bar => {
      bar.style.height = `${bar.dataset.pct}%`;
    });
  }));
}

// ─── S-17 Muscles detail (per session) ───────────────────
function renderMusclesDetail(entry, backScreen) {
  const _back = backScreen || currentScreen() || 's-07';
  const sess  = SESSIONS.find(s => s.id === entry.sessionId);
  const { primary, secondary } = buildMuscleTally(entry);
  const label = sess ? `${sess.label}` : '';
  const sub   = entry.date;

  // Hide the weekly chart — this is a per-session view
  const cw = q('#s17-chart-wrap');
  if (cw) cw.style.display = 'none';

  _renderMusclesFull({ primary, secondary }, sub, label, () => showScreen(_back));
  updateNav('today');
}

// ─── S-17 shared renderer ────────────────────────────────
function _renderMusclesFull({ primary, secondary }, subtitle, title, onBack) {
  const sessEl = q('#s17-session');
  if (sessEl) sessEl.textContent = subtitle + (title ? ` · ${title}` : '');

  // Merge primary + secondary into one tally for grouping
  // Primary counts full, secondary counts half (already done in buildMuscleTally secondary)
  const allMuscles = { ...primary };
  Object.entries(secondary).forEach(([m, v]) => {
    allMuscles[m] = (allMuscles[m] || 0) + v;
  });

  const totalPts  = Object.values(primary).reduce((a, b) => a + b, 0);
  q('#s17-total-sets').textContent = fmtEff(totalPts);

  // ── Category totals (primary only for donut & group header) ─
  const catOrder = ['push', 'pull', 'core', 'legs'];
  const catSets  = {};
  Object.entries(primary).forEach(([m, sets]) => {
    const cat = MUSCLE_CAT[m] || 'push';
    catSets[cat] = (catSets[cat] || 0) + sets;
  });
  const catTotal = Object.values(catSets).reduce((a, b) => a + b, 0) || 1;
  const maxCat   = Math.max(...Object.values(catSets), 1);

  // ── Donut ring ───────────────────────────────────────────
  const CIRC    = 2 * Math.PI * 60;
  const donutEl = q('#s17-donut');
  while (donutEl.children.length > 1) donutEl.removeChild(donutEl.lastChild);

  let offset = 0;
  const GAP = CIRC * 0.012;
  catOrder.forEach(cat => {
    const sets = catSets[cat] || 0;
    if (!sets) return;
    const arcLen = (sets / catTotal) * CIRC - GAP;
    const seg    = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    seg.setAttribute('cx', '80'); seg.setAttribute('cy', '80'); seg.setAttribute('r', '60');
    seg.setAttribute('fill', 'none');
    seg.setAttribute('stroke', CAT_META[cat].color);
    seg.setAttribute('stroke-width', '16');
    seg.setAttribute('stroke-linecap', 'round');
    seg.setAttribute('stroke-dasharray', `0 ${CIRC}`);
    seg.setAttribute('stroke-dashoffset', `${-offset}`);
    donutEl.appendChild(seg);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      seg.style.transition = 'stroke-dasharray 0.6s cubic-bezier(0.22,1,0.36,1)';
      seg.setAttribute('stroke-dasharray', `${arcLen} ${CIRC - arcLen}`);
    }));
    offset += arcLen + GAP;
  });

  // ── Legend pills ─────────────────────────────────────────
  q('#s17-legend').innerHTML = catOrder
    .filter(cat => catSets[cat])
    .map(cat => `
      <div class="md-legend-pill">
        <span class="md-legend-dot" style="background:${CAT_META[cat].color}"></span>
        ${CAT_META[cat].label} · ${fmtEff(catSets[cat])}
      </div>`).join('');

  // ── Category group cards ─────────────────────────────────
  const groupsEl = q('#s17-groups');
  groupsEl.innerHTML = '';

  catOrder.forEach((cat, ci) => {
    const catPts = catSets[cat] || 0;
    if (!catPts) return;

    const color      = CAT_META[cat].color;
    const pctOfMax   = Math.round(catPts / maxCat * 100);
    const pctOfTotal = Math.round(catPts / catTotal * 100);
    const zone       = muscleZone(catPts);
    const effSets    = fmtEff(catPts);

    // All muscles in this category (from merged tally)
    const muscles = Object.entries(allMuscles)
      .filter(([m]) => (MUSCLE_CAT[m] || 'push') === cat)
      .sort((a, b) => b[1] - a[1]);
    if (!muscles.length) return;

    const maxMuscle = muscles[0][1];

    const group = document.createElement('div');
    group.className = 'md-cat-group';

    const bodyRows = muscles.map(([m, pts]) => {
      const barPct = Math.round(pts / maxMuscle * 100);
      return `
        <div class="md-muscle-row">
          <span class="md-muscle-name">${MUSCLE_LABEL[m] || m}</span>
          <div class="md-muscle-bar-wrap">
            <div class="md-muscle-bar" data-pct="${barPct}" data-color="${color}" style="background:${color}20"></div>
          </div>
          <span class="md-muscle-sets">${fmtEff(pts)}</span>
        </div>`;
    }).join('');

    group.innerHTML = `
      <div class="md-cat-header">
        <div class="md-cat-bar-bg" data-pct="${pctOfMax}" style="background:${color}; width:0%"></div>
        <div class="md-cat-header-main">
          <span class="md-cat-label" style="color:${color}">${CAT_META[cat].label}</span>
          <span class="md-zone-badge" style="color:${zone.color};border-color:${zone.color}40">${zone.icon} ${zone.label}</span>
        </div>
        <div class="md-cat-header-sub">
          <span class="md-cat-effsets">${effSets} eff. sets</span>
          <span class="md-cat-msg">${zone.msg}</span>
        </div>
      </div>
      <div class="md-cat-body">${bodyRows}</div>`;

    groupsEl.appendChild(group);
  });

  // Animate all bars in one rAF pass
  requestAnimationFrame(() => requestAnimationFrame(() => {
    groupsEl.querySelectorAll('.md-cat-bar-bg').forEach(bg => {
      bg.style.transition = 'width 0.65s cubic-bezier(0.22,1,0.36,1)';
      bg.style.width = `${bg.dataset.pct}%`;
    });
    groupsEl.querySelectorAll('.md-muscle-bar').forEach(bar => {
      bar.style.transition = 'width 0.55s cubic-bezier(0.22,1,0.36,1), background 0.55s ease';
      bar.style.width      = `${bar.dataset.pct}%`;
      bar.style.background = bar.dataset.color;
    });
  }));

  q('#s17-back').onclick = onBack;
  q('#s17-done').onclick = onBack;

  showScreen('s-17');
}

// ─── S-16 Cool-down ───────────────────────────────────────
function renderCooldown(sess) {
  if (!sess?.cooldown?.length) return;

  const list  = q('#s16-list');
  const typeEl = q('#s16-type');
  const titleEl = q('#s16-title');
  const subtitleEl = q('#s16-subtitle');
  if (titleEl)    titleEl.textContent    = 'Stretch & recover';
  if (subtitleEl) subtitleEl.textContent = 'Tap each pose when done · breathe fully';
  if (typeEl)     typeEl.textContent     = sess.type === 'push' ? 'Push day' : 'Pull day';

  // Build rows
  list.innerHTML = '';
  let doneCnt = 0;

  const updateProgress = () => {
    const progEl = list.querySelector('.cooldown-progress');
    if (progEl) progEl.textContent = `${doneCnt} / ${sess.cooldown.length} done`;
  };

  sess.cooldown.forEach((pose, i) => {
    const row = document.createElement('div');
    row.className = 'cooldown-row';
    row.innerHTML = `
      <div class="cooldown-row__check"></div>
      <div class="cooldown-row__body">
        <div class="cooldown-row__name">${pose.name}</div>
        <div class="cooldown-row__breaths">${pose.breaths}</div>
        ${pose.note  ? `<div class="cooldown-row__note">${pose.note}</div>`  : ''}
        ${pose.cue   ? `<div class="cooldown-row__cue">"${pose.cue}"</div>` : ''}
      </div>`;
    row.addEventListener('click', () => {
      if (!row.classList.contains('is-done')) {
        row.classList.add('is-done');
        doneCnt++;
        updateProgress();
        if (navigator.vibrate) navigator.vibrate(40);
        announcePose(pose.name, pose.breaths);
      } else {
        row.classList.remove('is-done');
        doneCnt--;
        updateProgress();
      }
    });
    list.appendChild(row);
  });

  // Progress line at top
  const prog = document.createElement('div');
  prog.className = 'cooldown-progress';
  prog.textContent = `0 / ${sess.cooldown.length} done`;
  list.insertBefore(prog, list.firstChild);

  q('#s16-done').onclick = goHome;

  showScreen('s-16');
  updateNav('today');
}

// ─── Flex session picker ──────────────────────────────────
function renderFlexPicker() {
  const overlay = q('#dialog-flex');
  const list    = q('#dialog-flex-list');
  if (!overlay || !list) return;

  list.innerHTML = FLEX_SESSIONS.map(fs => `
    <button class="btn-ghost mb-3 flex-pick-btn" data-id="${fs.id}"
      style="width:100%;text-align:left;padding:var(--sp-3) var(--sp-4)">
      <div class="t-body-strong">${fs.label}</div>
      <div class="t-label mt-1" style="color:var(--txt-3)">${fs.focus} · ${fs.duration}</div>
    </button>
  `).join('');

  overlay.classList.add('is-active');

  overlay.querySelectorAll('.flex-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fs = FLEX_SESSIONS.find(s => s.id === btn.dataset.id);
      overlay.classList.remove('is-active');
      if (fs) renderFlexSession(fs);
    });
  });
  q('#dialog-flex-cancel').onclick = () => overlay.classList.remove('is-active');
}

// ─── S-16 Flexibility session ─────────────────────────────
function renderFlexSession(flexSess) {
  const list   = q('#s16-list');
  const typeEl = q('#s16-type');
  const titleEl = q('#s16-title');
  const subtitleEl = q('#s16-subtitle');

  if (titleEl)    titleEl.textContent    = flexSess.label;
  if (subtitleEl) subtitleEl.textContent = flexSess.focus + ' · ' + flexSess.duration;
  if (typeEl)     typeEl.textContent     = '';

  list.innerHTML = '';
  let doneCnt = 0;

  const updateProgress = () => {
    const progEl = list.querySelector('.cooldown-progress');
    if (progEl) progEl.textContent = `${doneCnt} / ${flexSess.poses.length} done`;
  };

  flexSess.poses.forEach(pose => {
    const row = document.createElement('div');
    row.className = 'cooldown-row';
    row.innerHTML = `
      <div class="cooldown-row__check"></div>
      <div class="cooldown-row__body">
        <div class="cooldown-row__name">${pose.name}</div>
        <div class="cooldown-row__breaths">${pose.duration}</div>
        ${pose.note ? `<div class="cooldown-row__note">${pose.note}</div>` : ''}
        ${pose.cue  ? `<div class="cooldown-row__cue">"${pose.cue}"</div>` : ''}
      </div>`;
    row.addEventListener('click', () => {
      if (!row.classList.contains('is-done')) {
        row.classList.add('is-done');
        doneCnt++;
        updateProgress();
        if (navigator.vibrate) navigator.vibrate(40);
        announcePose(pose.name, pose.duration);
      } else {
        row.classList.remove('is-done');
        doneCnt--;
        updateProgress();
      }
    });
    list.appendChild(row);
  });

  const prog = document.createElement('div');
  prog.className = 'cooldown-progress';
  prog.textContent = `0 / ${flexSess.poses.length} done`;
  list.insertBefore(prog, list.firstChild);

  q('#s16-done').onclick = goHome;

  showScreen('s-16');
  updateNav('today');
}

// ─── Confetti ─────────────────────────────────────────────
function launchConfetti() {
  const canvas = q('#confetti-canvas');
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = '';
  const ctx = canvas.getContext('2d');
  const COLORS = ['#6C7FD8','#2BA88A','#E05050','#D4A017','#ffffff'];
  const particles = Array.from({ length: 90 }, () => ({
    x:  Math.random() * canvas.width,
    y:  -12,
    vx: (Math.random() - 0.5) * 5,
    vy: Math.random() * 3 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 7 + 3,
    rot:  Math.random() * 360,
    rotV: (Math.random() - 0.5) * 12,
  }));
  let raf;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.06;
      if (p.y < canvas.height + 20) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(draw);
    else canvas.style.display = 'none';
  };
  draw();
  setTimeout(() => { cancelAnimationFrame(raf); canvas.style.display = 'none'; }, 4000);
}

// ─── Session picker ───────────────────────────────────────
function showSessionPicker() {
  const today = getTodaySession();
  const list  = q('#pick-list');
  list.innerHTML = '';

  SESSIONS.forEach(sess => {
    const isToday = today && sess.id === today.id;
    const item = document.createElement('div');
    item.className = 'pick-item' + (isToday ? ' is-today' : '');
    item.innerHTML = `
      <div class="pick-item__body">
        <div class="pick-item__label">${sess.label}</div>
        <div class="pick-item__focus">${sess.focus}</div>
      </div>
      <div class="pick-item__day">${isToday ? 'today' : sess.day}</div>`;
    item.addEventListener('click', () => {
      hideDialog('dialog-pick');
      startSession(sess);
    });
    list.appendChild(item);
  });

  showDialog('dialog-pick');
}

// ─── Week progress dots ───────────────────────────────────
function renderWeekDots() {
  const wrap = q('#s01-week-dots');
  if (!wrap) return;

  // Fixed training days: Mon=1, Wed=3, Thu=4, Sat=6
  const trainingDays = [
    { wd: 1, label: 'Mon' },
    { wd: 3, label: 'Wed' },
    { wd: 4, label: 'Thu' },
    { wd: 6, label: 'Sat' },
  ];

  const todayWd = new Date().getDay();

  // Sessions done this week: sessions logged since last Monday
  const now = new Date();
  const daysSinceMon = (now.getDay() + 6) % 7; // Mon=0
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - daysSinceMon);
  weekStart.setHours(0, 0, 0, 0);

  const doneThisWeek = new Set(
    state.log
      .filter(e => new Date(e.date) >= weekStart)
      .map(e => {
        const sess = SESSIONS.find(s => s.id === e.sessionId);
        return sess ? sess.weekday : null;
      })
      .filter(Boolean)
  );

  wrap.innerHTML = trainingDays.map(({ wd, label }) => {
    let cls = 'week-dot';
    if (doneThisWeek.has(wd))  cls += ' week-dot--done';
    else if (wd === todayWd)   cls += ' week-dot--today';
    return `<div class="${cls}">
      <div class="week-dot__pip"></div>
      <div class="week-dot__label">${label}</div>
    </div>`;
  }).join('');
}

// ─── S-13 Progress ────────────────────────────────────────
function renderProgress() {
  const ph = phase();
  q('#s13-week').textContent = `W${state.currentWeek}/10 · ${ph.label} (${ph.phaseWeek}/${ph.phaseTotalWeeks})`;

  const list = q('#s13-list');
  list.innerHTML = '';

  if (!state.log.length) {
    list.innerHTML = `<div class="prog-empty">No sessions logged yet.<br>Complete your first session to see your progress here.</div>`;
    showScreen('s-13');
    updateNav('progress');
    return;
  }

  // Most recent first
  const entries = [...state.log].reverse().slice(0, 20);

  entries.forEach(entry => {
    const sess  = SESSIONS.find(s => s.id === entry.sessionId);
    const label = sess ? sess.label : entry.sessionId;
    const mins  = Math.round((entry.durationSecs || 0) / 60);
    const allSets = Object.values(entry.exercises || {}).flatMap(e => e.sets || []);
    const totalSets = allSets.length;
    const totalReps = allSets.reduce((a, b) => a + b, 0);

    // Top-5 muscle chips for this entry
    const { primary } = buildMuscleTally(entry);
    const topMuscles = Object.entries(primary).sort((a,b) => b[1]-a[1]).slice(0,4);
    const chipsHtml = topMuscles.map(([m]) => {
      const cat   = MUSCLE_CAT[m] || 'push';
      const color = CAT_META[cat]?.color || '#6C7FD8';
      return `<span class="muscles-teaser__chip">
        <span class="muscles-teaser__chip-dot" style="background:${color}"></span>
        ${MUSCLE_LABEL[m] || m}
      </span>`;
    }).join('');

    const card = document.createElement('div');
    card.className = 'prog-session-card';
    card.innerHTML = `
      <div class="prog-session-card__header">
        <div class="prog-session-card__label">${label}</div>
        <div class="prog-session-card__date">${entry.date}</div>
      </div>
      <div class="prog-session-card__meta">
        ${mins}min · ${totalSets} sets · ${totalReps} reps/secs · ${entry.phase || ''}
      </div>
      ${topMuscles.length ? `
      <div class="prog-muscles-row">
        <div class="muscles-teaser__chips">${chipsHtml}</div>
        <button class="prog-muscles-btn">muscles →</button>
      </div>` : ''}`;

    card.addEventListener('click', () => renderSummary(entry, { readOnly: true }));

    if (topMuscles.length) {
      card.querySelector('.prog-muscles-btn').addEventListener('click', e => {
        e.stopPropagation();
        renderMusclesDetail(entry);
      });
    }
    list.appendChild(card);
  });

  // All buttons wired via delegation in bindGlobalUI
  renderGistTokenUI();
  syncAudioToggleUI();

  showScreen('s-13');
  updateNav('progress');
}

// ─── GitHub Gist backup ──────────────────────────────────
// Uses a Personal Access Token (gist scope) stored in localStorage.
// No OAuth, no redirects — plain HTTPS API calls, works in all browsers.
const GIST_TOKEN_KEY = 'ring-app-gist-token';
const GIST_ID_KEY    = 'ring-app-gist-id';
const GIST_FILENAME  = 'ring-app-backup.json';

function getGistToken() {
  return localStorage.getItem(GIST_TOKEN_KEY) || '';
}

function renderGistTokenUI() {
  const token    = getGistToken();
  const statusEl = q('#s13-gist-status');
  const wrapEl   = q('#s13-token-wrap');
  if (statusEl) statusEl.textContent = token ? '● Connected' : '○ Not connected';
  if (wrapEl)   wrapEl.style.display = token ? 'none' : '';
}

function saveGistToken() {
  const val = (q('#s13-gist-token')?.value || '').trim();
  if (!val) { alert('Paste your GitHub token first.'); return; }
  localStorage.setItem(GIST_TOKEN_KEY, val);
  if (q('#s13-gist-token')) q('#s13-gist-token').value = '';
  renderGistTokenUI();
}

async function gistBackup() {
  const token = getGistToken();
  if (!token) { alert('Enter your GitHub token first (see below).'); return; }
  const btn = q('#s13-drive-backup');
  try {
    if (btn) btn.textContent = '↑ Uploading…';
    const content  = JSON.stringify(buildBackupPayload(), null, 2);
    const gistId   = localStorage.getItem(GIST_ID_KEY);
    const headers  = { Authorization: `token ${token}`, 'Content-Type': 'application/json' };
    const body     = JSON.stringify({ description: 'Ring App backup', public: false,
                       files: { [GIST_FILENAME]: { content } } });

    let resp, data;
    if (gistId) {
      resp = await fetch(`https://api.github.com/gists/${gistId}`, { method: 'PATCH', headers, body });
    } else {
      resp = await fetch('https://api.github.com/gists', { method: 'POST', headers, body });
    }
    if (!resp.ok) {
      // Token expired or gist deleted — try creating fresh
      if (resp.status === 404 || resp.status === 401) {
        localStorage.removeItem(GIST_ID_KEY);
        resp = await fetch('https://api.github.com/gists', { method: 'POST', headers, body });
      }
      if (!resp.ok) throw new Error(`GitHub API ${resp.status}`);
    }
    data = await resp.json();
    localStorage.setItem(GIST_ID_KEY, data.id);
    if (btn) btn.textContent = '↑ Backed up ✓';
    setTimeout(() => { if (btn) btn.textContent = '↑ Backup to Gist'; }, 3000);
  } catch (err) {
    if (btn) btn.textContent = '↑ Backup to Gist';
    alert('Gist backup failed: ' + err.message);
  }
}

async function gistRestore() {
  const token = getGistToken();
  if (!token) { alert('Enter your GitHub token first (see below).'); return; }
  const btn = q('#s13-drive-restore');
  try {
    if (btn) btn.textContent = '↓ Fetching…';
    const headers = { Authorization: `token ${token}` };
    let gistId = localStorage.getItem(GIST_ID_KEY);

    if (!gistId) {
      // Search all gists for our filename
      const listResp = await fetch('https://api.github.com/gists?per_page=100', { headers });
      if (!listResp.ok) throw new Error(`GitHub API ${listResp.status}`);
      const list = await listResp.json();
      const found = list.find(g => g.files?.[GIST_FILENAME]);
      if (!found) { if (btn) btn.textContent = '↓ Restore from Gist'; alert('No backup gist found.'); return; }
      gistId = found.id;
      localStorage.setItem(GIST_ID_KEY, gistId);
    }

    const resp = await fetch(`https://api.github.com/gists/${gistId}`, { headers });
    if (!resp.ok) throw new Error(`GitHub API ${resp.status}`);
    const data = await resp.json();
    const text = data.files?.[GIST_FILENAME]?.content;
    if (!text) throw new Error('Backup file not found in gist.');
    if (btn) btn.textContent = '↓ Restore from Gist';
    applyBackupText(text);
  } catch (err) {
    if (btn) btn.textContent = '↓ Restore from Gist';
    alert('Gist restore failed: ' + err.message);
  }
}

// ─── Auto-backup ─────────────────────────────────────────
// Called silently after every session. Saves full state JSON to
// Downloads (Android) or triggers share sheet (iOS / Web Share API).
function autoBackup() {
  try {
    const payload = buildBackupPayload();
    const date    = new Date().toISOString().slice(0, 10);
    const filename = `ring-app-${date}.json`;
    const content  = JSON.stringify(payload, null, 2);

    // Web Share API — use when available (Android Chrome/Brave share sheet)
    const file = new File([content], filename, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: 'Ring App backup — ' + date }).catch(() => {
        // User dismissed share sheet — fall back to silent download
        silentDownload(filename, content, 'application/json');
      });
    } else {
      // Fallback: silent download to Downloads folder
      silentDownload(filename, content, 'application/json');
    }
  } catch (_) {}
}

function silentDownload(filename, content, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

function buildBackupPayload() {
  return {
    exportedAt:   new Date().toISOString(),
    week:         state.currentWeek,
    sessionCount: state.sessionCount,
    skillLevels:  state.skillLevels,
    log:          state.log,
  };
}

// ─── Import ───────────────────────────────────────────────
async function importJSON(file) {
  try {
    const text = typeof file.text === 'function'
      ? await file.text()
      : await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload  = e => res(e.target.result);
          r.onerror = () => rej(new Error('FileReader error'));
          r.readAsText(file);
        });
    applyBackupText(text);
  } catch (_) {
    alert('Could not read backup file. Use the Paste option below instead.');
  }
}

function pasteRestore() {
  const ta = q('#s13-paste-input');
  if (!ta) return;
  const text = ta.value.trim();
  if (!text) { alert('Paste your backup JSON first.'); return; }
  applyBackupText(text);
  ta.value = '';
}

function applyBackupText(text) {
  let data;
  try { data = JSON.parse(text); } catch (_) {
    alert('Invalid JSON — could not parse the backup.');
    return;
  }
  if (!data.log || !Array.isArray(data.log)) {
    alert('Invalid backup file — no log found.');
    return;
  }

  // Merge: existing IDs win, incoming fills the gaps
  const existingIds = new Set(state.log.map(e => e.id));
  const newEntries  = data.log.filter(e => !existingIds.has(e.id));
  state.log = [...state.log, ...newEntries]
    .sort((a, b) => a.date.localeCompare(b.date));

  // Restore week + count if backup is further ahead
  if ((data.sessionCount || 0) > state.sessionCount) {
    state.sessionCount = data.sessionCount;
    state.currentWeek  = data.week || state.currentWeek;
  }

  // Merge skill levels — keep the higher level for each skill
  if (data.skillLevels) {
    Object.entries(data.skillLevels).forEach(([id, lvl]) => {
      if ((lvl || 0) > (state.skillLevels[id] || 0)) {
        state.skillLevels[id] = lvl;
      }
    });
  }

  saveState();
  renderProgress();
  alert(`Restored ${newEntries.length} session${newEntries.length !== 1 ? 's' : ''} from backup.`);
}

// ─── Export ───────────────────────────────────────────────
function shareOrDownload(filename, content, mime) {
  const file = new File([content], filename, { type: mime });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({ files: [file], title: 'Ring App — workout log' }).catch(() => {});
  } else {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type: mime }));
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }
}

function exportJSON() {
  const date = new Date().toISOString().slice(0, 10);
  shareOrDownload(
    `ring-app-${date}.json`,
    JSON.stringify(buildBackupPayload(), null, 2),
    'application/json'
  );
}

function exportCSV() {
  if (!state.log.length) return;

  // Collect all exercise IDs seen across all sessions
  const allExIds = [...new Set(state.log.flatMap(e => Object.keys(e.exercises || {})))];

  const header = ['date', 'session', 'week', 'phase', 'duration_min', 'rpe', ...allExIds];
  const rows = state.log.map(entry => {
    const sess = SESSIONS.find(s => s.id === entry.sessionId);
    const mins = Math.round((entry.durationSecs || 0) / 60);
    const exCols = allExIds.map(id => {
      const sets = (entry.exercises[id] || { sets: [] }).sets;
      return sets.length ? sets.join(';') : '';
    });
    return [
      entry.date,
      sess ? sess.label : entry.sessionId,
      entry.week || '',
      entry.phase || '',
      mins,
      entry.rpe || '',
      ...exCols,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
  });

  const csv = [header.join(','), ...rows].join('\n');
  const date = new Date().toISOString().slice(0, 10);
  shareOrDownload(`ring-app-${date}.csv`, csv, 'text/csv');
}

// ═══════════════════════════════════════════════════════════
//  Audio cues + Voice input
// ═══════════════════════════════════════════════════════════

// ─── Toggle ───────────────────────────────────────────────
const AUDIO_KEY = 'ring-app-audio';

function isAudioOn() {
  return localStorage.getItem(AUDIO_KEY) !== 'off';
}

function setAudioOn(on) {
  localStorage.setItem(AUDIO_KEY, on ? 'on' : 'off');
  syncAudioToggleUI();
  if (!on) stopVoiceInput();
}

function syncAudioToggleUI() {
  const el = q('#s13-audio-toggle');
  if (el) el.checked = isAudioOn();
}

// ─── AudioContext (lazy) ──────────────────────────────────
let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {}
  }
  if (_audioCtx?.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// ─── Beep ─────────────────────────────────────────────────
function beep(freq = 880, duration = 120, type = 'sine', gain = 0.4) {
  if (!isAudioOn()) return Promise.resolve();
  const ctx = getAudioCtx();
  if (!ctx) return Promise.resolve();
  return new Promise(resolve => {
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    osc.connect(vol);
    vol.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    vol.gain.setValueAtTime(gain, ctx.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000);
    osc.onended = resolve;
  });
}

// ─── Named cues ───────────────────────────────────────────
function cueRestStart()   { beep(660, 180, 'sine'); }
function cueRestEnd()     { beep(1047, 220, 'sine'); }
function cueRestWarning() {
  beep(880, 100, 'sine')
    .then(() => new Promise(r => setTimeout(r, 120)))
    .then(() => beep(880, 100, 'sine'));
}
function cueCountdownTick(count) {
  const freqs = { 3: 440, 2: 554, 1: 660, 0: 880 };
  beep(freqs[count] ?? 440, count === 0 ? 200 : 120, 'sine');
}

// ─── TTS: announce pose (flexibility / cooldown) ─────────
function announcePose(name, duration) {
  if (!isAudioOn()) return;
  if (!('speechSynthesis' in window)) return;
  const utt = new SpeechSynthesisUtterance(`${name} — ${duration}`);
  utt.rate = 0.92;
  utt.pitch = 1;
  utt.volume = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
}

// ─── TTS: announce exercise ───────────────────────────────
function announceExercise(ex) {
  if (!isAudioOn()) return;
  if (!('speechSynthesis' in window)) return;
  const target = ex.type === 'hold'
    ? `${ex.targetSecs} seconds`
    : `${getEffectiveTarget(ex)} reps`;
  const utt = new SpeechSynthesisUtterance(`${ex.name} — ${target}`);
  utt.rate = 0.92;
  utt.pitch = 1;
  utt.volume = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
}

// ─── Voice input ──────────────────────────────────────────
let _recognition = null;
let _voiceMode   = null; // 'hold' | 'reps' | null

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

function startVoiceInput(mode) {
  if (!isAudioOn() || !SpeechRecognitionAPI) return;
  stopVoiceInput();
  _voiceMode = mode;
  _recognition = new SpeechRecognitionAPI();
  _recognition.lang = 'en-US';
  _recognition.continuous = true;
  _recognition.interimResults = false;
  _recognition.maxAlternatives = 1;

  _recognition.onresult = e => {
    const last = e.results[e.results.length - 1];
    if (!last.isFinal) return;
    handleVoiceResult(last[0].transcript.trim().toLowerCase());
  };

  // Android kills continuous recognition after silence — auto-restart
  _recognition.onend = () => {
    if (_voiceMode && isAudioOn()) {
      try { _recognition.start(); } catch (_) {}
    }
  };

  _recognition.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') stopVoiceInput();
  };

  try { _recognition.start(); } catch (_) {}
}

function stopVoiceInput() {
  _voiceMode = null;
  if (_recognition) {
    try { _recognition.stop(); } catch (_) {}
    _recognition = null;
  }
}

function handleVoiceResult(transcript) {
  if (_voiceMode === 'hold') {
    if (transcript.includes('stop')) {
      const btn = q('#s04-stop');
      if (btn && btn.style.display !== 'none') btn.click();
    }
  } else if (_voiceMode === 'reps') {
    const words = {
      'zero':0,'one':1,'two':2,'three':3,'four':4,'five':5,
      'six':6,'seven':7,'eight':8,'nine':9,'ten':10,
      'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,
      'sixteen':16,'seventeen':17,'eighteen':18,'nineteen':19,'twenty':20,
    };
    let val = null;
    for (const [word, num] of Object.entries(words)) {
      if (transcript.includes(word)) { val = num; break; }
    }
    if (val === null) { const m = transcript.match(/\d+/); if (m) val = parseInt(m[0], 10); }
    if (val !== null && val >= 0 && val <= 50) {
      const valEl = q('#s03-val');
      if (valEl) valEl.textContent = val;
      const doneBtn = q('#s03-done');
      if (doneBtn) doneBtn.click();
    }
  }
}
