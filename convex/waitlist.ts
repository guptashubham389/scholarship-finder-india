import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Waitlist = email only, has NOT used the product.
// Scores the "Waitlist" parameter (4x). See IDEA_SCOPE.md section 3.
// Signups (20x) is a separate table, written only after someone runs the matcher.
export const join = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    // Basic shape check. The client validates too, but never trust the client.
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      throw new Error("That doesn't look like an email address.");
    }

    // Don't create duplicate rows — a double-click must not inflate the count.
    // Inflated numbers are worse than small ones: they are unusable as evidence.
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return { ok: true, alreadyJoined: true };
    }

    await ctx.db.insert("waitlist", {
      email,
      source: args.source ?? "landing",
    });

    return { ok: true, alreadyJoined: false };
  },
});
