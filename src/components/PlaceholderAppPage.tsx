import Link from "next/link";

type PlaceholderAppPageProps = {
  title: string;
  description: string;
};

export function PlaceholderAppPage({ title, description }: PlaceholderAppPageProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-500 shadow-sm">
        Placeholder
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h1>
      <p className="mt-3 text-zinc-600">{description}</p>
      <p className="mt-6 text-sm text-zinc-500">
        The real experience is coming soon. For now, enjoy the landing page guilt.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
        Back to Unnecessary Apps
      </Link>
    </div>
  );
}
