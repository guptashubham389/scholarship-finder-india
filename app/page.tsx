import Link from "next/link";
import { WaitlistForm } from "./WaitlistForm";
import { scholarships, daysUntil, formatINR } from "../lib/match";

// Re-render hourly so "days left" stays truthful instead of freezing at build time.
export const revalidate = 3600;

export default function Home() {
  const open = scholarships
    .map((s) => ({ ...s, daysLeft: daysUntil(s.deadline) }))
    .filter((s) => s.daysLeft > 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const soonest = open[0];
  const closingSoon = open.filter((s) => s.daysLeft <= 30).length;
  const biggest = Math.max(...open.map((s) => s.amountPerYear));

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl py-20">
        <p className="text-sm uppercase tracking-widest text-amber-400 mb-6">
          For engineering students in India
        </p>

        {/* Copy written by Shubham. Do not let AI rewrite this. */}
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-6">
          You could already qualify for thousands in scholarships&mdash;and never
          know it.
        </h1>

        <p className="text-lg text-white/70 mb-10">
          Stop relying on luck and endless Google searches. Get personalized
          scholarship matches delivered to you.
        </p>

        <Link
          href="/find"
          className="block w-full rounded-lg bg-amber-400 px-6 py-4 text-center
                     font-semibold text-black hover:bg-amber-300 transition"
        >
          Find out in 5 questions →
        </Link>

        <p className="mt-4 text-center text-sm text-white/40">
          Free. No account. Takes 30 seconds.
        </p>

        {/* Live data, not marketing claims. Proves there is a real dataset
            behind this and that the deadlines are the point. */}
        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-white">{open.length}</p>
              <p className="text-xs text-white/45 mt-1">schemes tracked</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-300">{closingSoon}</p>
              <p className="text-xs text-white/45 mt-1">close within 30 days</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-amber-400">
                {formatINR(biggest)}
              </p>
              <p className="text-xs text-white/45 mt-1">largest, per year</p>
            </div>
          </div>

          {soonest && (
            <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/60">
              Closing soonest:{" "}
              <span className="text-white">{soonest.name}</span> &mdash;{" "}
              <span className="text-red-300 font-medium">
                {soonest.daysLeft} days left
              </span>
            </p>
          )}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-white/50 mb-4">
            Not ready? Leave your email and I&apos;ll tell you when new
            scholarships open for your profile.
          </p>
          <WaitlistForm />
        </div>

        <p className="mt-10 text-sm text-white/40">
          Built by a student who missed scholarships he qualified for.
        </p>
      </div>
    </main>
  );
}
