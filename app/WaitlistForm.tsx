"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

type State = "idle" | "saving" | "done" | "error";

export function WaitlistForm() {
  const join = useMutation(api.waitlist.join);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "saving") return; // double-click guard

    const trimmed = email.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      setState("error");
      setMessage("That doesn't look like an email address.");
      return;
    }

    setState("saving");
    try {
      const result = await join({ email: trimmed, source: "landing" });
      setState("done");
      setMessage(
        result.alreadyJoined
          ? "You're already on the list. I'll be in touch."
          : "You're on the list. I'll email you the moment it's ready."
      );
    } catch {
      // Never leave the user staring at a dead button.
      setState("error");
      setMessage("Something broke on my end. Try again in a moment?");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-5 py-4">
        <p className="font-medium text-amber-300">{message}</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="your@email.com"
          aria-label="Your email address"
          className="flex-1 rounded-lg bg-white/5 border border-white/15 px-4 py-3
                     text-white placeholder:text-white/35 outline-none
                     focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={state === "saving"}
          className="rounded-lg bg-amber-400 px-6 py-3 font-medium text-black
                     hover:bg-amber-300 transition disabled:opacity-60
                     disabled:cursor-not-allowed"
        >
          {state === "saving" ? "Saving…" : "Notify me"}
        </button>
      </form>

      {state === "error" && (
        <p className="mt-3 text-sm text-red-400">{message}</p>
      )}
    </div>
  );
}
