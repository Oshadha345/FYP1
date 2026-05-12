import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[65vh] max-w-2xl place-items-center text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">This page does not exist.</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          The page may have been moved, renamed, or not published yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md border border-cyan-300/40 bg-cyan-300 px-4 text-sm font-medium text-zinc-950 shadow-[0_0_24px_rgba(103,232,249,0.22)] transition hover:bg-cyan-200"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
