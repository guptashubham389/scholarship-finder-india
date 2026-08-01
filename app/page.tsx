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

        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg bg-white/5 border border-white/15 px-4 py-3
                       text-white placeholder:text-white/35 outline-none
                       focus:border-amber-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-amber-400 px-6 py-3 font-medium text-black
                       hover:bg-amber-300 transition"
          >
            Notify me
          </button>
        </form>

        <p className="mt-6 text-sm text-white/40">
          Milestone 1 — pipeline check. The form is not wired up yet.
        </p>
      </div>
    </main>
  );
}
