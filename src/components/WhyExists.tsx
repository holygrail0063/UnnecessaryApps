const cards = [
  {
    title: "Tiny and fun",
    text: "Quick little apps you can open and enjoy instantly.",
  },
  {
    title: "Beautifully useless",
    text: "Made with care, for no important reason.",
  },
  {
    title: "Always expanding",
    text: "More unnecessary apps coming soon.",
  },
] as const;

export function WhyExists() {
  return (
    <section className="border-b border-zinc-200/60 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Why would anyone build this?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            Because the internet needs more delightful nonsense. Unnecessary Apps
            is a collection of tiny experiments, jokes, distractions, and oddly
            satisfying tools that do not improve your life in any measurable way,
            but might improve your mood for a minute.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <article className="h-full rounded-2xl border border-zinc-200/80 bg-[#FAFAF8] p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {card.text}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
