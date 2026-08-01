import { match, formatINR, type Profile } from "../lib/match";

// Frozen "today" so results don't drift as the weekend passes.
const TODAY = new Date("2026-08-01T12:00:00");

const cases: { name: string; p: Profile }[] = [
  {
    name: "1. 2nd yr, Maharashtra, ₹4L, OBC, male",
    p: { year: 2, state: "Maharashtra", income: 400000, category: "OBC", gender: "male" },
  },
  {
    name: "2. 4th yr, Bihar, ₹1.5L, SC, male",
    p: { year: 4, state: "Bihar", income: 150000, category: "SC", gender: "male" },
  },
  {
    name: "3. 1st yr, Goa, ₹15L, General, male  (expect few/zero)",
    p: { year: 1, state: "Goa", income: 1500000, category: "General", gender: "male" },
  },
  {
    name: "4. 2nd yr, Maharashtra, ₹1.5L, OBC, female",
    p: { year: 2, state: "Maharashtra", income: 150000, category: "OBC", gender: "female" },
  },
  {
    name: "5. 1st yr, Kerala, ₹2.5L, General, female",
    p: { year: 1, state: "Kerala", income: 250000, category: "General", gender: "female" },
  },
];

let failures = 0;

for (const c of cases) {
  const r = match(c.p, TODAY);
  console.log(`\n${c.name}`);
  console.log(`   headline total : ${formatINR(r.total)}`);
  console.log(`   matches        : ${r.count} (${r.guaranteedCount} unconditional)`);
  console.log(`   soonest        : ${r.soonest ? `${r.soonest.name} — ${r.soonest.daysLeft}d` : "none"}`);
  for (const m of r.matches) {
    console.log(`     - ${m.daysLeft}d  ${formatINR(m.amountPerYear)}  ${m.name}${m.conditional ? "  [conditional]" : ""}`);
  }

  // Invariants that must always hold.
  if (r.matches.some((m) => m.daysLeft <= 0)) {
    console.log("   ✖ FAIL: a closed scholarship was shown");
    failures++;
  }
  const sorted = r.matches.every(
    (m, i) => i === 0 || r.matches[i - 1].daysLeft <= m.daysLeft
  );
  if (!sorted) {
    console.log("   ✖ FAIL: not sorted by urgency");
    failures++;
  }
  const guaranteedSum = r.matches
    .filter((m) => !m.conditional)
    .reduce((s, m) => s + m.amountPerYear, 0);
  if (guaranteedSum !== r.total) {
    console.log("   ✖ FAIL: headline total includes conditional scholarships");
    failures++;
  }
  for (const m of r.matches) {
    if (c.p.income > m.eligibility.maxIncome) {
      console.log(`   ✖ FAIL: ${m.name} shown despite income over cap`);
      failures++;
    }
    if (!m.eligibility.gender.includes("any") && !m.eligibility.gender.includes(c.p.gender)) {
      console.log(`   ✖ FAIL: ${m.name} shown to wrong gender`);
      failures++;
    }
    if (!m.eligibility.categories.includes("any") && !m.eligibility.categories.includes(c.p.category)) {
      console.log(`   ✖ FAIL: ${m.name} shown to wrong category`);
      failures++;
    }
    if (!m.eligibility.years.includes(c.p.year)) {
      console.log(`   ✖ FAIL: ${m.name} shown to wrong year`);
      failures++;
    }
  }
}

console.log(
  failures === 0
    ? "\n\n✅ ALL INVARIANTS PASSED"
    : `\n\n❌ ${failures} FAILURE(S)`
);
process.exit(failures === 0 ? 0 : 1);
