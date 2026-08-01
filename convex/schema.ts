import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Two separate tables on purpose — they prove two different rubric parameters.
//   waitlist = email only, never touched the product      -> "Waitlist" (4x)
//   signups  = email AND ran the core flow                -> "Signups" (20x)
// Never count one row as both. See IDEA_SCOPE.md section 3.
export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    source: v.optional(v.string()),
  }).index("by_email", ["email"]),

  signups: defineTable({
    email: v.string(),
    year: v.optional(v.string()),
    state: v.optional(v.string()),
    income: v.optional(v.number()),
    category: v.optional(v.string()),
    gender: v.optional(v.string()),
    matchedTotal: v.optional(v.number()),
    matchedCount: v.optional(v.number()),
  }).index("by_email", ["email"]),
});
