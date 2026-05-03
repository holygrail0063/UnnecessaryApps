/**
 * Short microwave-style triple beep via Web Audio API (no external files).
 * Must be called from a user gesture for browsers that suspend AudioContext.
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

function scheduleTripleBeep(audioCtx: AudioContext) {
  const playSingleBeep = (startTime: number) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(880, startTime);

    gainNode.gain.setValueAtTime(0.06, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.18);
  };

  const now = audioCtx.currentTime;
  playSingleBeep(now);
  playSingleBeep(now + 0.25);
  playSingleBeep(now + 0.5);
}

export function playMicrowaveBeep(): void {
  try {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    if (audioCtx.state === "suspended") {
      void audioCtx.resume().then(() => {
        try {
          scheduleTripleBeep(audioCtx);
        } catch (error) {
          console.warn("Beep sound could not play:", error);
        }
      });
      return;
    }

    scheduleTripleBeep(audioCtx);
  } catch (error) {
    console.warn("Beep sound could not play:", error);
  }
}
