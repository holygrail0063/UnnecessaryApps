import { RandomAppButton } from "@/components/RandomAppButton";

export function RandomAppCTA() {
  return (
    <section className="border-b border-zinc-200/60 bg-gradient-to-br from-violet-50 via-white to-amber-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Feeling unproductive? Perfect.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
          Press the button and we’ll send you somewhere completely unnecessary.
        </p>
        <RandomAppButton
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-10 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition hover:-translate-y-0.5 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          label="Launch a random live app"
        >
          Launch Random App
        </RandomAppButton>
      </div>
    </section>
  );
}
