import Link from "next/link";
import { WaitlistForm } from "./WaitlistForm";

export default function Home() {
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
