import type { ReactNode } from "react";

type AppDetailHeroProps = {
  title: ReactNode;
  subtitle: string;
  /** Optional tiny decorations (arrows, clouds) */
  decorations?: ReactNode;
};

export function AppDetailHero({ title, subtitle, decorations }: AppDetailHeroProps) {
  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-10 text-center sm:px-6 lg:px-8 lg:pt-14">
      {decorations ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {decorations}
        </div>
      ) : null}
      <h1 className="relative font-display text-3xl font-bold leading-tight tracking-tight text-text-main sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
        {title}
      </h1>
      <p className="relative mx-auto mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-text-muted sm:text-xl">
        {subtitle}
      </p>
    </div>
  );
}
