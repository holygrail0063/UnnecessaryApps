/**
 * Short “pop” blip via Web Audio API — call from a user gesture only.
 */

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!AudioContextCtor) return null;

    if (!sharedCtx || sharedCtx.state === "closed") {
      sharedCtx = new AudioContextCtor();
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

function schedulePop(audioCtx: AudioContext, gainPeak: number) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const t0 = audioCtx.currentTime;
  const duration = 0.14;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(160, t0);
  oscillator.frequency.exponentialRampToValueAtTime(620, t0 + 0.08);

  gainNode.gain.setValueAtTime(gainPeak, t0);
  gainNode.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(t0);
  oscillator.stop(t0 + duration);
}

/** Default peak gain — tuned for laptop / phone speakers; override for rapid “Pop all”. */
const DEFAULT_POP_GAIN = 0.22;

export function playPopSound(options?: { gain?: number }): void {
  const gainPeak = options?.gain ?? DEFAULT_POP_GAIN;
  try {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    if (audioCtx.state === "suspended") {
      void audioCtx.resume().then(() => {
        try {
          schedulePop(audioCtx, gainPeak);
        } catch (error) {
          console.warn("Pop sound could not play:", error);
        }
      });
      return;
    }

    schedulePop(audioCtx, gainPeak);
  } catch (error) {
    console.warn("Pop sound could not play:", error);
  }
}
