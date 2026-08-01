import Link from "next/link";
import { Finder } from "./Finder";

export const metadata = {
  title: "Find your scholarships — Scholarship Finder India",
  description:
    "Five questions. Find out how much scholarship money you qualify for and which deadline closes first.",
};

export default function FindPage() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white px-6">
      <div className="w-full max-w-xl mx-auto py-16">
        <Link
          href="/"
          className="text-sm text-white/40 hover:text-white/70 mb-8 inline-block"
        >
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-3">
          Five questions.
        </h1>
        <p className="text-white/60 mb-10">
          No account, no documents. Find out what you already qualify for.
        </p>

        <Finder />
      </div>
    </main>
  );
}
