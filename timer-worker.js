// Timer Web Worker
// Messages in:  { type: 'start-countdown', seconds: N }
//               { type: 'start-stopwatch' }
//               { type: 'stop' }
//               { type: 'add', seconds: N }   — add time to countdown
// Messages out: { type: 'tick', seconds: N }
//               { type: 'done' }              — countdown hit 0

let intervalId = null;
let seconds = 0;
let mode = null; // 'countdown' | 'stopwatch'

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'start-countdown':
      clearInterval(intervalId);
      seconds = data.seconds;
      mode = 'countdown';
      tick();
      intervalId = setInterval(tick, 1000);
      break;

    case 'start-stopwatch':
      clearInterval(intervalId);
      seconds = 0;
      mode = 'stopwatch';
      tick();
      intervalId = setInterval(tick, 1000);
      break;

    case 'stop':
      clearInterval(intervalId);
      intervalId = null;
      mode = null;
      break;

    case 'add':
      if (mode === 'countdown') seconds += data.seconds;
      break;
  }
};

function tick() {
  if (mode === 'countdown') {
    self.postMessage({ type: 'tick', seconds });
    if (seconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      self.postMessage({ type: 'done' });
    } else {
      seconds--;
    }
  } else if (mode === 'stopwatch') {
    self.postMessage({ type: 'tick', seconds });
    seconds++;
  }
}
