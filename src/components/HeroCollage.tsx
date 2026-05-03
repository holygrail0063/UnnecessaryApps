import type { ReactNode } from "react";

/** Cartoon shop-window collage — thick outlines, flat fills. */
export function HeroCollage() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:aspect-[4/3] lg:max-w-none"
      aria-hidden
    >
      <span className="absolute left-[4%] top-[6%] text-3xl motion-safe-float">★</span>
      <span className="absolute right-[6%] top-[10%] text-2xl font-black motion-safe-float">
        ✨
      </span>
      <svg
        className="absolute bottom-[8%] left-[8%] z-0 h-12 w-12 text-text-main motion-safe-orbit"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 4 L28 18 L42 18 L30 26 L36 40 L24 32 L12 40 L18 26 L6 18 L20 18 Z"
          fill="#FFE8A3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute bottom-[14%] right-[12%] text-3xl motion-safe-wiggle">☁️</span>

      {/* scribble arrow */}
      <svg
        className="absolute right-[18%] top-[38%] z-30 h-16 w-16 rotate-12 text-text-main"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M8 48 Q40 8 52 20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M46 12 L54 22 L44 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="relative z-10 mx-auto min-h-[300px] w-[94%] rounded-[28px] border-[3px] border-ink bg-bg-cream p-4 shadow-cartoon sm:min-h-[340px] sm:p-5">
        <div className="relative h-full min-h-[260px] sm:min-h-[300px]">
          <HeroMiniCard
            position="left-[2%] top-[4%] w-[44%] sm:w-[42%]"
            delay="0ms"
            bg="bg-pink-soft"
            title="Is It Monday Yet?"
            icon={<IconCalendar />}
          />
          <HeroMiniCard
            position="right-[0%] top-[12%] w-[50%] sm:w-[48%]"
            delay="120ms"
            bg="bg-pink-main"
            title="Button Clicker"
            icon={<IconCursor />}
          />
          <HeroMiniCard
            position="left-[8%] bottom-[18%] w-[46%] sm:w-[44%]"
            delay="240ms"
            bg="bg-blue-main"
            title="Bread Weather"
            icon={<IconToast />}
          />
          <HeroMiniCard
            position="right-[4%] bottom-[4%] w-[48%] sm:w-[46%]"
            delay="360ms"
            bg="bg-bg-cream"
            title="Excuse Generator"
            icon={<IconBubble />}
          />
          <HeroMiniCard
            position="left-[20%] top-[34%] z-20 w-[44%] sm:left-[18%] sm:top-[30%] sm:w-[42%]"
            delay="180ms"
            bg="bg-tan"
            title="One Pixel Museum"
            icon={<IconPixel />}
            lift
          />
        </div>
      </div>
    </div>
  );
}

function HeroMiniCard({
  position,
  delay,
  bg,
  title,
  icon,
  lift,
}: {
  position: string;
  delay: string;
  bg: string;
  title: string;
  icon: ReactNode;
  lift?: boolean;
}) {
  return (
    <div
      className={`hero-float absolute rounded-[18px] border-[3px] border-ink bg-bg-cream p-2 shadow-cartoon-sm sm:p-3 ${position} ${lift ? "rotate-[-3deg]" : "rotate-[2deg]"}`}
      style={{ animationDelay: delay }}
    >
      <div
        className={`flex flex-col gap-2 rounded-xl border-[3px] border-ink ${bg} p-2.5 sm:gap-2 sm:p-3`}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-ink bg-bg-cream shadow-cartoon-sm sm:h-14 sm:w-14">
            {icon}
          </span>
          <div className="min-w-0 flex-1 rounded-lg border-2 border-ink bg-bg-cream/95 px-2 py-2">
            <p className="truncate font-display text-[11px] font-bold text-text-main sm:text-xs">
              {title}
            </p>
            <div className="mt-2 h-2 rounded-full border border-ink bg-white">
              <div className="h-full w-2/3 rounded-full bg-blue-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconCalendar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-text-main">
      <rect x="4" y="5" width="16" height="15" rx="2" fill="#FFC1C5" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9h16" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconCursor() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-text-main">
      <path
        d="M5 4l7 16 2.5-7 8-2.5L5 4z"
        fill="#F9A3A8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconToast() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-text-main">
      <path
        d="M4 17c0-5 3-9 8-9s8 4 8 9H4z"
        fill="#FFF8EA"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M7 8c1-2 3-3 5-3" stroke="#27B5E8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBubble() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-text-main">
      <path
        d="M5 6h12a2 2 0 012 2v5a2 2 0 01-2 2H10l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z"
        fill="#E8BD82"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
      <circle cx="14" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconPixel() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-text-main">
      <rect x="5" y="5" width="14" height="14" rx="2" fill="#27B5E8" stroke="currentColor" strokeWidth="2" />
      <rect x="11" y="11" width="2" height="2" fill="#171717" />
    </svg>
  );
}
