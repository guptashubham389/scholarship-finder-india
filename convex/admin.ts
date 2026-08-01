import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Admin helpers. internal* = callable only from the CLI/dashboard, never from
// the browser. Used to keep the metrics tables honest before Sunday's
// screenshots: test rows must not be counted as real signups.

export const counts = internalQuery({
  args: {},
  handler: async (ctx) => {
    const waitlist = await ctx.db.query("waitlist").collect();
    const signups = await ctx.db.query("signups").collect();
    return {
      waitlist: waitlist.length,
      signups: signups.length,
      waitlistEmails: waitlist.map((r) => r.email),
    };
  },
});

export const purgeSignupByEmail = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("signups")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();
    if (!row) return { deleted: 0 };
    await ctx.db.delete(row._id);
    return { deleted: 1 };
  },
});

export const purgeBySource = internalMutation({
  args: { source: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db.query("waitlist").collect();
    let deleted = 0;
    for (const row of rows) {
      if (row.source === args.source) {
        await ctx.db.delete(row._id);
        deleted++;
      }
    }
    return { deleted };
  },
});
