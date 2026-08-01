"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { match, formatINR, STATES, type Profile } from "../../lib/match";

const YEARS = [
  { label: "1st year", value: 1 },
  { label: "2nd year", value: 2 },
  { label: "3rd year", value: 3 },
  { label: "4th year", value: 4 },
];

const INCOMES = [
  { label: "Under ₹1.5 lakh", value: 150000 },
  { label: "₹1.5 – 2.5 lakh", value: 250000 },
  { label: "₹2.5 – 4 lakh", value: 400000 },
  { label: "₹4 – 8 lakh", value: 800000 },
  { label: "Above ₹8 lakh", value: 1500000 },
];

const CATEGORIES = ["General", "OBC", "SC", "ST"] as const;
const GENDERS = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Other", value: "other" },
] as const;

const SITE = "https://scholarships-india.vercel.app/find";

function ShareRow({ total, count }: { total: number; count: number }) {
  const [copied, setCopied] = useState(false);

  const text =
    `I just found out I qualify for ${formatINR(total)} in scholarships ` +
    `across ${count} ${count === 1 ? "scheme" : "schemes"} I didn't know existed. ` +
    `Took 5 questions. Check yours: ${SITE}`;

  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <p className="font-medium mb-1">Someone you know is missing this money.</p>
      <p className="text-sm text-white/60 mb-4">
        Most students never find out these exist. Takes one message.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-[#25D366] px-5 py-3 text-center
                     font-medium text-black hover:brightness-110 transition"
        >
          Share on WhatsApp
        </a>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
            }
          }}
          className="rounded-lg border border-white/20 px-5 py-3 font-medium
                     text-white/80 hover:border-white/40 transition"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

const label = "block text-sm font-medium text-white/60 mb-2";
const field =
  "w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white " +
  "outline-none focus:border-amber-400 appearance-none";

export function Finder() {
  const createSignup = useMutation(api.signups.create);

  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [saveMsg, setSaveMsg] = useState("");

  const complete =
    profile.year !== undefined &&
    profile.state !== undefined &&
    profile.income !== undefined &&
    profile.category !== undefined &&
    profile.gender !== undefined;

  const result = complete ? match(profile as Profile) : null;

  async function saveEmail(e: React.FormEvent) {
    e.preventDefault();
    if (saveState === "saving" || !result) return;

    const trimmed = email.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      setSaveState("error");
      setSaveMsg("That doesn't look like an email address.");
      return;
    }

    setSaveState("saving");
    try {
      await createSignup({
        email: trimmed,
        year: String(profile.year),
        state: profile.state!,
        income: profile.income!,
        category: profile.category!,
        gender: profile.gender!,
        matchedTotal: result.total,
        matchedCount: result.count,
      });
      setSaveState("done");
      setSaveMsg("Saved. I'll email you before each deadline closes.");
    } catch {
      setSaveState("error");
      setSaveMsg("Something broke on my end. Try again?");
    }
  }

  // ---------------------------------------------------------------- questions
  if (!showResult) {
    return (
      <div className="space-y-6">
        <div>
          <label className={label}>What year are you in?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {YEARS.map((y) => (
              <button
                key={y.value}
                onClick={() => setProfile({ ...profile, year: y.value })}
                className={`rounded-lg border px-3 py-3 text-sm transition ${
                  profile.year === y.value
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                }`}
              >
                {y.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={label}>Which state are you from?</label>
          <select
            className={field}
            value={profile.state ?? ""}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          >
            <option value="" disabled>
              Select your state
            </option>
            {STATES.map((s) => (
              <option key={s} value={s} className="bg-[#0d0f12]">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Your family&apos;s yearly income</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {INCOMES.map((i) => (
              <button
                key={i.value}
                onClick={() => setProfile({ ...profile, income: i.value })}
                className={`rounded-lg border px-3 py-3 text-sm transition ${
                  profile.income === i.value
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                }`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={label}>Your category</label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setProfile({ ...profile, category: c })}
                className={`rounded-lg border px-3 py-3 text-sm transition ${
                  profile.category === c
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={label}>Gender</label>
          <div className="grid grid-cols-3 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => setProfile({ ...profile, gender: g.value })}
                className={`rounded-lg border px-3 py-3 text-sm transition ${
                  profile.gender === g.value
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!complete}
          onClick={() => setShowResult(true)}
          className="w-full rounded-lg bg-amber-400 px-6 py-4 font-semibold text-black
                     hover:bg-amber-300 transition disabled:opacity-40
                     disabled:cursor-not-allowed"
        >
          {complete ? "Show me what I qualify for" : "Answer all five to continue"}
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------------ results
  const r = result!;

  return (
    <div className="space-y-8">
      <button
        onClick={() => setShowResult(false)}
        className="text-sm text-white/50 hover:text-white/80"
      >
        ← change my answers
      </button>

      {r.count === 0 ? (
        <div className="rounded-xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Nothing open matches you right now.
          </h2>
          <p className="text-white/60">
            That is not a dead end — most scholarships for your profile open at
            specific times of year, and new ones appear constantly. Leave your
            email and I&apos;ll tell you the moment one opens that you qualify for.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm uppercase tracking-widest text-white/40 mb-3">
            You qualify for at least
          </p>
          <p className="text-5xl sm:text-6xl font-bold text-amber-400 mb-3">
            {formatINR(r.total)}
          </p>
          <p className="text-white/70">
            across {r.guaranteedCount}{" "}
            {r.guaranteedCount === 1 ? "scholarship" : "scholarships"} you can apply
            for right now.
            {r.soonest && (
              <>
                {" "}The nearest one closes in{" "}
                <span className="font-semibold text-white">
                  {r.soonest.daysLeft} days
                </span>
                .
              </>
            )}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {r.matches.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-white/15 bg-white/5 p-5"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-white">{m.name}</h3>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  m.daysLeft <= 21
                    ? "bg-red-500/20 text-red-300"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {m.daysLeft} days left
              </span>
            </div>

            <p className="text-amber-400 font-medium mb-1">
              {formatINR(m.amountPerYear)} / year
            </p>
            <p className="text-sm text-white/50 mb-3">{m.amountNote}</p>

            {m.condition && (
              <p className="text-sm text-amber-300/80 mb-3">
                ⚠ {m.condition}
              </p>
            )}

            <p className="text-sm text-white/60 mb-4">
              You&apos;ll need: {m.documentNeeded}
            </p>

            <div className="flex items-center gap-4 text-sm">
              <a
                href={m.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Apply on the official site →
              </a>
              <span className="text-white/30">
                verified {m.verifiedOn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Share — the number is the most forwardable thing here. Without this
          it dies on screen and every user is a dead end. */}
      {r.count > 0 && <ShareRow total={r.total} count={r.guaranteedCount} />}

      {/* Email capture — this is what makes a signup, not just a visit. */}
      {saveState === "done" ? (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-5 py-4">
          <p className="font-medium text-amber-300">{saveMsg}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/15 bg-white/5 p-5">
          <p className="font-medium mb-1">Don&apos;t lose these deadlines.</p>
          <p className="text-sm text-white/60 mb-4">
            Leave your email and I&apos;ll remind you before each one closes.
          </p>
          <form onSubmit={saveEmail} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (saveState === "error") setSaveState("idle");
              }}
              placeholder="your@email.com"
              aria-label="Your email address"
              className="flex-1 rounded-lg bg-white/5 border border-white/15 px-4 py-3
                         text-white placeholder:text-white/35 outline-none
                         focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={saveState === "saving"}
              className="rounded-lg bg-amber-400 px-6 py-3 font-medium text-black
                         hover:bg-amber-300 transition disabled:opacity-60"
            >
              {saveState === "saving" ? "Saving…" : "Remind me"}
            </button>
          </form>
          {saveState === "error" && (
            <p className="mt-3 text-sm text-red-400">{saveMsg}</p>
          )}
        </div>
      )}

      <p className="text-xs text-white/35">
        Amounts and deadlines were checked against official sources on 1 Aug 2026.
        Always confirm on the official page before applying — schemes change.
      </p>
    </div>
  );
}
