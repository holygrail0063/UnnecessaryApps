import Link from "next/link";
import { getFeaturedApps } from "@/data/apps";

export function FeaturedApps() {
  const featured = getFeaturedApps();

  return (
    <section
      id="featured"
      className="scroll-mt-24 border-b border-zinc-200/60 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Featured Unnecessary Apps
          </h2>
          <p className="mt-3 text-lg text-zinc-600">
            Start with the apps that are the least useful, most clickable, and
            dangerously overbuilt.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((app) => (
            <li key={app.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/80 p-6 shadow-md shadow-zinc-900/5 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10">
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-violet-400/20" />
                </div>
                <div className="relative flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-800">
                      Featured
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-900">
                    {app.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                    {app.featuredDescription}
                  </p>
                  {app.featuredExample ? (
                    <p className="mt-4 rounded-2xl border border-dashed border-zinc-200 bg-white/80 px-4 py-3 text-xs leading-relaxed text-zinc-500">
                      {app.featuredExample}
                    </p>
                  ) : null}
                  <div className="mt-6">
                    <Link
                      href={app.route!}
                      className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:w-auto"
                    >
                      Open App
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
