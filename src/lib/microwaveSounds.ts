/**
 * Lightweight microwave-style beeps via Web Audio API (no asset files).
 * Respects mute flag in localStorage; AudioContext resumes after user gesture.
 */

const STORAGE_KEY = "unnecessaryApps-microwave-muted";
const MIN_BUTTON_GAP_MS = 55;

let audioCtx: AudioContext | null = null;
let lastButtonBeepAt = 0;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

export async function resumeMicrowaveAudio(): Promise<void> {
  const c = getContext();
  if (c?.state === "suspended") {
    try {
      await c.resume();
    } catch {
      /* ignore */
    }
  }
}

export function isMicrowaveSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMicrowaveSoundMuted(muted: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function triggerSoftButtonBeep(): void {
  const now = Date.now();
  if (now - lastButtonBeepAt < MIN_BUTTON_GAP_MS) return;
  lastButtonBeepAt = now;

  const c = getContext();
  if (!c) return;
  void resumeMicrowaveAudio();

  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(920, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.09, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.072);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + 0.08);
}

/** Short soft click — throttled so rapid taps don’t stack harshly */
export function playButtonBeep(): void {
  if (isMicrowaveSoundMuted()) return;
  triggerSoftButtonBeep();
}

/** Classic triple “done” pattern — call once when timer hits zero */
export function playFinishBeeps(): void {
  if (isMicrowaveSoundMuted()) return;

  const c = getContext();
  if (!c) return;
  void resumeMicrowaveAudio();

  const base = c.currentTime;
  const peaks = [0, 0.32, 0.64];

  peaks.forEach((offset, i) => {
    const t0 = base + offset;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(i === 1 ? 1100 : 1050, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.11, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + 0.15);
  });
}
