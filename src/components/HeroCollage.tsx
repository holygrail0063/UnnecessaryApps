import type { ReactNode } from "react";

/** Playful floating preview cards for hero (decorative). */
export function HeroCollage() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:aspect-[4/3] lg:max-w-none"
      aria-hidden
    >
      {/* decorative */}
      <svg
        className="absolute left-[6%] top-[4%] z-0 h-12 w-12 text-ua-yellow motion-safe-sparkle opacity-90"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 4 L28 18 L42 18 L30 26 L36 40 L24 32 L12 40 L18 26 L6 18 L20 18 Z"
          fill="currentColor"
        />
      </svg>
      <span className="absolute right-[8%] top-[10%] text-2xl motion-safe-float">✨</span>
      <span
        className="absolute bottom-[12%] left-[4%] text-xl motion-safe-orbit"
        style={{ animationDelay: "200ms" }}
      >
        ☁️
      </span>
      <svg
        className="absolute right-[20%] bottom-[6%] z-0 h-16 w-16 text-ua-coral/70 motion-safe-float"
        style={{ animationDelay: "500ms" }}
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M12 40 Q32 18 52 40"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 mx-auto h-full w-[92%] rounded-[32px] bg-gradient-to-br from-ua-lavender/70 via-ua-bg to-ua-mint/35 p-5 shadow-[var(--shadow-ua-float)] ring-1 ring-ua-border/60 sm:p-6">
        {/* grid of mini app cards */}
        <div className="relative h-full min-h-[280px] sm:min-h-[320px]">
          <HeroMiniCard
            position="left-[2%] top-[4%] w-[44%] sm:w-[42%]"
            delay="0ms"
            hue="from-[#FFD6E8] to-[#FFE5F0]"
            title="Is It Monday Yet?"
            icon={<IconCalendar />}
          />
          <HeroMiniCard
            position="right-[2%] top-[14%] w-[48%] sm:w-[46%]"
            delay="120ms"
            hue="from-[#FFD6E8] to-[#FFCEE0]"
            title="Button Clicker"
            icon={<IconCursor />}
          />
          <HeroMiniCard
            position="left-[10%] bottom-[22%] w-[46%] sm:w-[44%]"
            delay="240ms"
            hue="from-[#D7EEFF] to-[#EAF6FF]"
            title="Bread Weather"
            icon={<IconToast />}
          />
          <HeroMiniCard
            position="right-[8%] bottom-[6%] w-[48%] sm:w-[44%]"
            delay="360ms"
            hue="from-[#E8F9F0] to-[#DDF8EA]"
            title="Excuse Generator"
            icon={<IconBubble />}
          />
          <HeroMiniCard
            position="left-[22%] top-[38%] z-20 w-[42%] sm:left-[20%] sm:top-[34%] sm:w-[40%]"
            delay="180ms"
            hue="from-[#EDE7FF] to-[#FFF4FF]"
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
  hue,
  title,
  icon,
  lift,
}: {
  position: string;
  delay: string;
  hue: string;
  title: string;
  icon: ReactNode;
  lift?: boolean;
}) {
  return (
    <div
      className={`hero-float absolute rounded-[20px] border border-ua-border/50 bg-gradient-to-br p-3 shadow-[var(--shadow-ua-soft-sm)] sm:p-4 ${position} ${lift ? "rotate-[-2deg]" : "rotate-[1deg]"}`}
      style={{ animationDelay: delay }}
    >
      <div
        className={`flex flex-col gap-2 rounded-2xl bg-gradient-to-br p-2.5 ${hue} sm:gap-3 sm:p-3`}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 shadow-sm sm:h-12 sm:w-12">
            {icon}
          </span>
          <div className="min-w-0 flex-1 rounded-xl bg-white/60 px-2 py-2">
            <p className="truncate text-[11px] font-extrabold text-ua-text sm:text-xs">{title}</p>
            <div className="mt-1.5 h-1 rounded-full bg-white/80">
              <div className="h-full w-2/3 rounded-full bg-ua-coral/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-ua-coral">
      <rect x="4" y="5" width="16" height="15" rx="2" fill="#FF9AA2" opacity="0.35" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 9h16" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="14" r="1.2" fill="currentColor" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconCursor() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-ua-text">
      <path
        d="M5 4l6 14 2-6 6-1-14-7z"
        fill="#FF9AA2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconToast() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ua-text">
      <path
        d="M4 17c0-5 3-9 8-9s8 4 8 9H4z"
        fill="#FFE8A3"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M7 8c1-2 3-3 5-3" stroke="#A7D8FF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconBubble() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ua-text">
      <path
        d="M5 6h12a2 2 0 012 2v5a2 2 0 01-2 2H10l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z"
        fill="#EDE7FF"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPixel() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ua-text">
      <rect x="5" y="5" width="14" height="14" rx="2" fill="#A7D8FF" stroke="currentColor" strokeWidth="1.2" />
      <rect x="11" y="11" width="2" height="2" fill="#2E223A" />
    </svg>
  );
}
