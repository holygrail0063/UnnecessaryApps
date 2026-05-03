/** Reserved hero visual area — empty until we replace with real artwork. */
export function HeroCollage() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:aspect-[4/3] lg:max-w-none"
      aria-hidden
    >
      <div className="h-full min-h-[280px] w-full rounded-[28px] border-[3px] border-ink bg-bg-cream shadow-cartoon sm:min-h-[320px]" />
    </div>
  );
}
