import raw from "../data/scholarships.json";

export type Profile = {
  year: number;
  state: string;
  income: number;
  category: "General" | "OBC" | "SC" | "ST";
  gender: "male" | "female" | "other";
};

export type Scholarship = (typeof raw)[number];

export type Match = Scholarship & {
  daysLeft: number;
  /** Conditional matches are shown but NOT counted in the headline total,
   *  because we cannot verify the extra condition from five questions. */
  conditional: boolean;
};

export const scholarships = raw as Scholarship[];

export const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other",
];

export function daysUntil(deadline: string, today = new Date()): number {
  const end = new Date(deadline + "T23:59:59");
  return Math.ceil((end.getTime() - today.getTime()) / 86_400_000);
}

function eligible(s: Scholarship, p: Profile): boolean {
  const e = s.eligibility;

  if (!e.years.includes(p.year)) return false;
  if (p.income > e.maxIncome) return false;

  const genderOk =
    e.gender.includes("any") || e.gender.includes(p.gender);
  if (!genderOk) return false;

  const categoryOk =
    e.categories.includes("any") || e.categories.includes(p.category);
  if (!categoryOk) return false;

  const stateOk = e.states.includes("ALL") || e.states.includes(p.state);
  if (!stateOk) return false;

  return true;
}

export function match(p: Profile, today = new Date()) {
  const open = scholarships.filter((s) => daysUntil(s.deadline, today) > 0);

  const matches: Match[] = open
    .filter((s) => eligible(s, p))
    .map((s) => ({
      ...s,
      daysLeft: daysUntil(s.deadline, today),
      conditional: s.requiresUnverified,
    }))
    // Urgency first — the closest deadline is the thing that actually
    // causes someone to act today.
    .sort((a, b) => a.daysLeft - b.daysLeft);

  // Only unconditional matches go into the headline number. A student who
  // does not have 80% in Class 12 must not be told they qualify for money
  // they cannot claim.
  const guaranteed = matches.filter((m) => !m.conditional);
  const total = guaranteed.reduce((sum, m) => sum + m.amountPerYear, 0);
  const conditionalTotal = matches
    .filter((m) => m.conditional)
    .reduce((sum, m) => sum + m.amountPerYear, 0);

  return {
    matches,
    total,
    conditionalTotal,
    count: matches.length,
    guaranteedCount: guaranteed.length,
    soonest: matches[0] ?? null,
  };
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
