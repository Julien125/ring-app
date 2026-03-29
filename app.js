// ─────────────────────────────────────────────────────────
//  Ring App — Main Logic
// ─────────────────────────────────────────────────────────

import { SESSIONS, PHASES, VOLUME } from './data/program.js';

// ─── Constants ────────────────────────────────────────────
const STORAGE_KEY  = 'ring-app-state';
const ACTIVE_KEY   = 'ring-app-active';
const CIRC         = 2 * Math.PI * 88; // SVG timer ring circumference

// ─── State ────────────────────────────────────────────────
let state = { currentWeek: 1, sessionCount: 0, log: [] };

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

// ─── Boot ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
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
    const a = localStorage.getItem(ACTIVE_KEY);
    if (a) A = JSON.parse(a);
  } catch (_) {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  const screen = currentScreen();
  if (screen === 's-05') updateRestUI('s05', secs);
  if (screen === 's-06') updateRestUI('s06', secs);
}

function onTimerDone() {
  const screen = currentScreen();
  if (screen === 's-05' || screen === 's-06') {
    // flash the timer value red briefly, user taps to continue
    const valEl = screen === 's-05' ? q('#s05-val') : q('#s06-val');
    if (valEl) valEl.classList.add('overtime');
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

function getTargetReps(ex) {
  const mult = phase().repMult;
  if (ex.type === 'hold') return ex.targetSecs;
  return Math.round((ex.targetReps || 5) * mult);
}

// ─── Nav ──────────────────────────────────────────────────
function bindNav() {
  q('#nav-today').addEventListener('click', () => {
    stopTimer(); stopStopwatch();
    goHome();
  });
  q('#nav-live').addEventListener('click', () => {
    if (!A || A.complete) return;
    resumeSession();
  });
  q('#nav-progress').addEventListener('click', () => {
    stopTimer(); stopStopwatch();
    renderProgress();
  });
}

// activeTab: 'today' | 'live' | 'progress'
function updateNav(activeTab) {
  const hasSession = A !== null && !A.complete;

  ['today', 'live', 'progress'].forEach(tab => {
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

  // Skip dialog
  q('#ds-cancel').addEventListener('click', () => hideDialog('dialog-skip'));
  q('#ds-skip').addEventListener('click', () => {
    hideDialog('dialog-skip');
    doSkipExercise();
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

// ─── S-01 Home ────────────────────────────────────────────
function goHome() {
  stopTimer();
  stopStopwatch();
  renderHome();
  showScreen('s-01');
  updateNav('today');
}

function renderHome() {
  const today = getTodaySession();
  const ph    = phase();

  // Date + week
  const now = new Date();
  q('#s01-date').textContent = now.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  q('#s01-week').textContent = `Week ${state.currentWeek} · ${ph.label}`;

  // Week progress dots — Mon / Wed / Thu / Sat
  renderWeekDots();

  if (!today) {
    // Rest day
    q('#s01-phase').textContent = ph.label;
    q('#s01-label').textContent = 'Rest day';
    q('#s01-focus').textContent = 'Recovery · mobility · sleep';
    q('#s01-cta').textContent = 'No session today';
    q('#s01-cta').disabled = true;
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
    skillsDone:  false,
    warmupDone:  false,
    startTime:   Date.now(),
    complete:    false,
  };
  saveActive();
  renderWarmup();
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

  refresh();
  showScreen('s-15');
  updateNav('live');
}

// ─── S-08 Skills ──────────────────────────────────────────
function renderSkills() {
  const sess = A.session;
  q('#s08-session').textContent = sess.label;

  const list = q('#s08-list');
  list.innerHTML = '';
  const doneSet = new Set();

  sess.skills.forEach((name, i) => {
    const el = document.createElement('div');
    el.className = 'skill-item';
    el.innerHTML = `
      <div class="skill-item__name">${name}</div>
      <div class="skill-badge" data-i="${i}">Mark done</div>`;
    const badge = el.querySelector('.skill-badge');
    badge.addEventListener('click', () => {
      if (doneSet.has(i)) { doneSet.delete(i); badge.textContent = 'Mark done'; badge.classList.remove('done'); }
      else { doneSet.add(i); badge.textContent = 'Done ✓'; badge.classList.add('done'); }
    });
    list.appendChild(el);
  });

  q('#s08-cta').onclick = () => { A.skillsDone = true; saveActive(); renderOverview(); };
  showScreen('s-08');
  updateNav('live');
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
      exRowsHtml += `<div class="${cls}">
        <div class="dot dot--${ex.category}"></div>
        <div class="ss-ex-row__name">${ex.name}</div>
        <div class="t-label-xs">${target}</div>
      </div>`;
    });

    col.innerHTML = `
      <div class="ss-col__head">
        <div class="ss-col__letter">${ss.id}</div>
        <div class="ss-col__name">${ss.label}</div>
      </div>
      <div class="round-dots" style="padding:6px 10px; border-bottom:1px solid var(--line)">${dotsHtml}</div>
      <div style="padding:4px 0">${exRowsHtml}</div>`;

    if (isCurrent) {
      col.style.cursor = 'pointer';
      col.addEventListener('click', enterSuperset);
    }
    grid.appendChild(col);
  });

  // CTA button
  const cta = q('#s02-cta');
  const ss  = sess.supersets[A.ssIdx];
  cta.textContent = A.ssIdx === 0 ? 'Start first superset →' : `Start ${ss.id} — ${ss.label} →`;
  cta.onclick = enterSuperset;

  showScreen('s-02');
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

function renderReps(ex, ss, totalRounds) {
  const target = getTargetReps(ex);
  let currentReps = target;

  q('#s03-breadcrumb').textContent = buildBreadcrumb(ss, totalRounds);
  q('#s03-dots').innerHTML         = buildExDots(ss);
  q('#s03-cat').className          = `cat-tag cat-tag--${ex.category}`;
  q('#s03-cat').textContent        = ex.category;
  q('#s03-name').textContent       = ex.name;
  q('#s03-target').textContent     = `${target}`;
  q('#s03-setnum').textContent     = `${A.round}/${totalRounds}`;
  q('#s03-pills').innerHTML        = buildSetPills(ex, ss);
  q('#s03-muscles').innerHTML      = buildMuscleChips(ex);
  q('#s03-note').textContent       = ex.note || '';
  q('#s03-val').textContent        = currentReps;

  // "Last set" reference — show previous round's value if on round 2+
  const lastSetWrap = q('#s03-lastset-wrap');
  const lastSetEl   = q('#s03-lastset');
  const logged = (A.log[ex.id] || { sets: [] }).sets;
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
  updateNav('live');
}

function renderHold(ex, ss, totalRounds) {
  const target = ex.targetSecs;

  q('#s04-breadcrumb').textContent = buildBreadcrumb(ss, totalRounds);
  q('#s04-dots').innerHTML         = buildExDots(ss);
  q('#s04-cat').className          = `cat-tag cat-tag--${ex.category}`;
  q('#s04-cat').textContent        = ex.category;
  q('#s04-name').textContent       = ex.name;
  q('#s04-target').textContent     = `${target}s`;
  q('#s04-setnum').textContent     = `${A.round}/${totalRounds}`;
  q('#s04-pills').innerHTML        = buildSetPills(ex, ss);
  q('#s04-muscles').innerHTML      = buildMuscleChips(ex);
  q('#s04-note').textContent       = ex.note || '';

  resetStopwatch();

  q('#s04-start').style.display = '';
  q('#s04-stop').style.display  = 'none';

  q('#s04-start').onclick = () => {
    startStopwatch();
    q('#s04-start').style.display = 'none';
    q('#s04-stop').style.display  = '';
  };

  q('#s04-stop').onclick = () => {
    const elapsed = stopStopwatch();
    logSet(elapsed);
  };

  q('#s04-skip').onclick = () => {
    q('#ds-body').textContent = `Skip "${ex.name}"? This hold won't be logged.`;
    showDialog('dialog-skip');
  };

  showScreen('s-04');
  updateNav('live');
}

// ─── Stopwatch (S-04) ─────────────────────────────────────
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
  const el = q('#s04-sw');
  if (el) el.textContent = secs;
}

// ─── Log set & advance ────────────────────────────────────
function logSet(value) {
  const ss  = A.session.supersets[A.ssIdx];
  const ex  = ss.exercises[A.exIdx];
  const totalRounds = Math.round(ss.rounds * phase().roundMult);

  if (!A.log[ex.id]) A.log[ex.id] = { sets: [] };
  A.log[ex.id].sets.push(value);
  saveActive();

  advance(ss, totalRounds);
}

function doSkipExercise() {
  const ss  = A.session.supersets[A.ssIdx];
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
  const isIntra   = type === 'intra';
  const pfx       = isIntra ? 's05' : 's06';
  const screenId  = isIntra ? 's-05' : 's-06';
  const secs      = isIntra ? ss.restIntra : ss.restRound;
  const totalRounds = Math.round(ss.rounds * phase().roundMult);

  // Confirmed line
  const confirmed = q(`#${pfx}-confirmed`);
  const prevEx    = ss.exercises[isIntra ? A.exIdx - 1 : ss.exercises.length - 1];
  const prevSets  = prevEx ? (A.log[prevEx.id] || { sets: [] }).sets : [];
  const prevVal   = prevSets.length ? prevSets[prevSets.length - 1] : null;
  const prevLabel = prevVal !== null
    ? (prevEx.type === 'hold' ? `${prevVal}s` : `${prevVal} reps`)
    : 'done';

  confirmed.innerHTML = `
    <strong>${prevEx ? prevEx.name : ''}</strong>
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

  // Buttons
  q(`#${pfx}-add`).onclick = () => addTime(isIntra ? 15 : 30);
  q(`#${pfx}-next`).onclick = () => {
    stopTimer();
    renderExercise();
  };

  startCountdown(secs);
  showScreen(screenId);
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
    date:       new Date().toISOString().slice(0, 10),
    sessionId:  A.sessionId,
    week:       state.currentWeek,
    phase:      phase().label,
    durationSecs: Math.round((A.endTime - A.startTime) / 1000),
    complete:   true,
    skillsDone: A.skillsDone,
    exercises:  A.log,
  };
  state.log.push(entry);
  state.sessionCount++;

  // Advance week every 4 sessions
  if (state.sessionCount % 4 === 0) {
    state.currentWeek = state.currentWeek < 4 ? state.currentWeek + 1 : 1;
  }

  saveState();
  clearActive();
  renderSummary(entry);
}

function renderSummary(entry) {
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

  q('#s07-done').onclick = goHome;
  showScreen('s-07');
  updateNav('today');  // session complete — live no longer active
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
  q('#s13-week').textContent = `Week ${state.currentWeek} · ${ph.label}`;

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

    const card = document.createElement('div');
    card.className = 'prog-session-card';
    card.innerHTML = `
      <div class="prog-session-card__header">
        <div class="prog-session-card__label">${label}</div>
        <div class="prog-session-card__date">${entry.date}</div>
      </div>
      <div class="prog-session-card__meta">
        ${mins}min · ${totalSets} sets · ${totalReps} reps/secs · ${entry.phase || ''}
      </div>`;
    list.appendChild(card);
  });

  showScreen('s-13');
  updateNav('progress');
}
