import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Signups = email AND the person ran the core flow (they have a result on screen).
// Scores the "Signups" parameter (20x) — the heaviest on the Revenue track.
// Distinct from the waitlist table, which is email only. Never count one as both.
export const create = mutation({
  args: {
    email: v.string(),
    year: v.string(),
    state: v.string(),
    income: v.number(),
    category: v.string(),
    gender: v.string(),
    matchedTotal: v.number(),
    matchedCount: v.number(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      throw new Error("That doesn't look like an email address.");
    }

    const existing = await ctx.db
      .query("signups")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      // Refresh their latest result rather than creating a duplicate row.
      // Duplicate rows would inflate the signup count and make it unusable
      // as evidence.
      await ctx.db.patch(existing._id, {
        matchedTotal: args.matchedTotal,
        matchedCount: args.matchedCount,
      });
      return { ok: true, alreadySignedUp: true };
    }

    await ctx.db.insert("signups", {
      email,
      year: args.year,
      state: args.state,
      income: args.income,
      category: args.category,
      gender: args.gender,
      matchedTotal: args.matchedTotal,
      matchedCount: args.matchedCount,
    });

    return { ok: true, alreadySignedUp: false };
  },
});
