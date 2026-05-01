import Link from "next/link";

export function HomeViewAllCta() {
  return (
    <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
      <Link
        href="#featured-apps"
        className="inline-flex items-center justify-center rounded-full border-2 border-ua-border bg-ua-bg-secondary/85 px-10 py-3.5 text-base font-bold text-ua-text shadow-[var(--shadow-ua-soft-sm)] transition hover:-translate-y-0.5 hover:border-ua-coral/50 hover:bg-ua-yellow/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB7C5]"
      >
        View All Apps
      </Link>
      <p className="mx-auto mt-4 max-w-md text-sm font-medium text-ua-muted">
        More delightful nonsense awaits — curated with care (and giggles).
      </p>
    </div>
  );
}
