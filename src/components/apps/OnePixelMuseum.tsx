"use client";

import { useCallback, useMemo, useState } from "react";
import { AppDetailHero } from "@/components/apps/AppDetailHero";
import { CartoonCard } from "@/components/apps/CartoonCard";

const TITLES = [
  "Untitled (Pixel, Probably Important)",
  "Chromatic Whisper No. 7",
  "Study in Minimal Commitment",
  "The Bureaucracy of a Single Dot",
  "Emotional Residue (Digital)",
];

const MEDIUMS = ["Pixel on screen", "RGB ambition", "Compressed longing", "Hexadecimal mood"];

const CURATOR_NOTES = [
  "The pixel refuses to explain itself. We respect that.",
  "Some say it’s small. We say it’s concentrated genius.",
  "Please maintain silence while observing the pixel.",
  "This pixel changed the direction of modern minimalism.",
  "We insured it. The premium was hilarious.",
];

const REACTIONS = [
  "“I felt something.” — local visitor",
  "“Is this… art?” — someone’s uncle",
  "“Worth the queue.” — suspiciously enthusiastic teen",
  "“I’m calling my therapist.” — anonymous patron",
];

function hashHue(seed: number) {
  return (seed * 9973 + 11) % 360;
}

export function OnePixelMuseum() {
  const [seed, setSeed] = useState(414243);
  const [admireCount, setAdmireCount] = useState(0);
  const [zoom, setZoom] = useState(1);

  const hue = hashHue(seed);
  const title = TITLES[seed % TITLES.length]!;
  const medium = MEDIUMS[seed % MEDIUMS.length]!;
  const curator = CURATOR_NOTES[seed % CURATOR_NOTES.length]!;
  const reaction = REACTIONS[seed % REACTIONS.length]!;
  const emotionalImpact = useMemo(
    () => Math.min(100, (seed % 35) + 45 + Math.min(admireCount, 25)),
    [seed, admireCount],
  );
  const rarity = ["Common", "Uncommon", "Rare", "Legendary", "Cursed"][seed % 5];
  const estimatedValue = useMemo(
    () => `$${((seed % 900) + 100) * (admireCount + 1)} (imaginary)`,
    [seed, admireCount],
  );

  const nextPixel = useCallback(() => {
    setSeed((s) => s + Math.floor(Math.random() * 99999) + 1);
    setZoom(1);
  }, []);

  const admire = useCallback(() => {
    setAdmireCount((n) => n + 1);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(12, z + 1.5));
  }, []);

  return (
    <div className="relative pb-16 pt-2 sm:pb-20">
      <AppDetailHero
        title="One Pixel Museum"
        subtitle="An immersive cultural experience centered around exactly one pixel."
        decorations={
          <>
            <span className="absolute left-[5%] top-[10%] text-2xl motion-safe-wiggle">✦</span>
            <span className="absolute right-[10%] top-[22%] text-xl motion-safe-float">🖼</span>
          </>
        }
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <CartoonCard variant="cream">
          <div className="mx-auto max-w-md">
            <p className="text-center font-display text-xs font-bold uppercase tracking-wide text-text-muted">
              Exhibit A — The Pixel
            </p>
            <div
              className="relative mx-auto mt-6 flex min-h-[200px] items-center justify-center rounded-[24px] border-[3px] border-ink bg-bg-main p-8 shadow-cartoon sm:min-h-[240px]"
              aria-live="polite"
            >
              <div
                className="rounded-sm border border-ink/30 shadow-cartoon-sm transition-transform duration-300 ease-out"
                style={{
                  width: "1px",
                  height: "1px",
                  backgroundColor: `hsl(${hue} 85% 52%)`,
                  transform: `scale(${zoom})`,
                  boxShadow: `0 0 ${Math.min(24, zoom * 3)}px hsl(${hue} 90% 45%)`,
                }}
              />
            </div>
            <p className="mt-6 text-center font-display text-sm font-bold text-text-muted">
              Dimensions: 1×1 · Medium: light · Mood: judgmental
            </p>
          </div>

          <div className="mt-10 space-y-3 rounded-2xl border-[3px] border-ink bg-pink-soft/60 p-5 shadow-cartoon-sm">
            <p className="font-display text-xs font-bold uppercase text-text-muted">Artwork title</p>
            <p className="font-display text-xl font-bold text-text-main">{title}</p>
            <p className="font-semibold text-text-muted">
              <span className="font-display font-bold text-text-main">Medium:</span> {medium}
            </p>
            <p className="border-t-[3px] border-dashed border-ink/20 pt-3 font-semibold italic text-text-muted">
              Curator note: {curator}
            </p>
            <p className="font-display text-lg font-bold text-text-main">
              Emotional impact score:{" "}
              <span className="tabular-nums text-blue-hover">{emotionalImpact}</span> / 100
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={nextPixel}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-blue-main px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon hover:bg-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-none"
            >
              Next Pixel
            </button>
            <button
              type="button"
              onClick={admire}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-pink-main px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon hover:bg-pink-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-none"
            >
              Admire
            </button>
            <button
              type="button"
              onClick={zoomIn}
              className="btn-cartoon flex-1 rounded-full border-[3px] border-ink bg-tan px-6 py-3 font-display text-sm font-bold text-text-main shadow-cartoon hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-none"
            >
              Zoom In
            </button>
          </div>
          <p className="mt-3 font-display text-[11px] font-bold uppercase tracking-wide text-text-muted">
            PLEASE NO FLASH PHOTOGRAPHY · THE PIXEL IS SHY
          </p>
        </CartoonCard>

        <div className="grid gap-6 md:grid-cols-3">
          <CartoonCard variant="tan">
            <h2 className="font-display text-lg font-bold text-text-main">Museum facts</h2>
            <ul className="mt-4 space-y-2 font-semibold text-text-muted">
              <li>• Founded on principle: less is more, but also less.</li>
              <li>• Gift shop sells empty frames (sold out).</li>
              <li>• Security guard blinks once per hour.</li>
            </ul>
          </CartoonCard>
          <CartoonCard variant="pink">
            <h2 className="font-display text-lg font-bold text-text-main">Viewer reactions</h2>
            <p className="mt-4 font-semibold leading-relaxed text-text-muted">{reaction}</p>
          </CartoonCard>
          <CartoonCard variant="cream">
            <h2 className="font-display text-lg font-bold text-text-main">Provenance</h2>
            <dl className="mt-4 space-y-3 font-semibold text-text-muted">
              <div className="flex justify-between gap-2 border-b-[3px] border-dashed border-ink/15 pb-2">
                <dt>Rarity</dt>
                <dd className="font-display font-bold text-text-main">{rarity}</dd>
              </div>
              <div className="flex justify-between gap-2 border-b-[3px] border-dashed border-ink/15 pb-2">
                <dt>Est. value</dt>
                <dd className="font-display text-sm font-bold text-text-main">{estimatedValue}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Admiration count</dt>
                <dd className="font-display font-bold tabular-nums text-text-main">{admireCount}</dd>
              </div>
            </dl>
          </CartoonCard>
        </div>
      </div>
    </div>
  );
}
