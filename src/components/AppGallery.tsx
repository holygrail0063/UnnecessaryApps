import Link from "next/link";
import { apps, type App } from "@/data/apps";

function StatusBadge({ app }: { app: App }) {
  if (app.status === "live") {
    return (
      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
      Coming Soon
    </span>
  );
}

export function AppGallery() {
  return (
    <section
      id="all-apps"
      className="scroll-mt-24 border-b border-zinc-200/60 bg-[#FAFAF8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            All Unnecessary Apps
          </h2>
          <p className="mt-3 text-lg text-zinc-600">
            Some are live. Most are coming soon. None are needed.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const isLive = app.status === "live";
            return (
              <li key={app.id}>
                <article className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-900/5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge app={app} />
                    {app.featuredOrder ? (
                      <span className="inline-flex rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-800">
                        Featured
                      </span>
                    ) : null}
                    {app.accentBadge ? (
                      <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                        {app.accentBadge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-900">
                    {app.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                    {app.shortDescription}
                  </p>
                  <div className="mt-5">
                    {isLive && app.route ? (
                      <Link
                        href={app.route}
                        className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                      >
                        Try App
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-400"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
