# Submission — Scholarship Finder India

**Track:** 💰 Revenue
**Live URL:** https://scholarships-india.vercel.app
**Core flow:** https://scholarships-india.vercel.app/find
**Repo:** https://github.com/guptashubham389/scholarship-finder-india

> ⚠️ **DRAFT — Shubham must edit before submitting.**
> Everything below is a starting point built from facts already established, not
> finished copy. Two rules:
> 1. **Section 1 (Pain severity) cannot be drafted by AI.** It needs real quotes from
>    real conversations. Fabricating them would be inventing evidence.
> 2. Rewrite the rest in your own voice. Assessors can smell generated text, and the
>    handbook is explicit about it.

---

## 1. Pain point severity — 2x · YOU MUST FILL THIS IN

**Rubric ladder:** L3 = named user + 1–2 conversations · L4 = 3+ conversations with
quotes · **L5 = 5+ conversations and at least one "can I pay for this now" moment.**

**Currently: L1 — zero points.** This is the cheapest 8 points available and it needs
no code.

You already have six people who gave you their email. Message them. Ask:

> "Have you ever missed a scholarship you qualified for? What did you do instead?"

Then paste the answers here, verbatim, with a first name and year of study:

| Who | Year / college | What they actually said |
|---|---|---|
| | | |
| | | |
| | | |
| | | |
| | | |

**Do not paraphrase.** Their exact words are the evidence. Ugly, unpolished quotes are
more credible than tidy ones.

---

## 2. Right to win — 2x · DRAFT, MAKE IT TRUE

**Rubric:** L4 = direct operator or domain experience, clear insight ·
L5 = deep founder–market fit, unfair advantage visible in the build itself.

> I missed scholarships I actually qualified for. Not because I was ineligible —
> because nobody told me they existed, and by the time I found out, the deadline had
> gone. That is the entire reason this exists.
>
> I am not guessing at this problem from the outside. I sat in it. And the students I
> built this for are people I can reach directly — the first users came from my own
> network within hours of the product going live.
>
> The insight the product is built on: **students don't have a search problem, they
> have an awareness problem.** Every existing tool — NSP included — assumes you already
> know what you're looking for. That assumption is why the money goes unclaimed.

**→ Edit this so it's literally true.** If you didn't personally miss one, say what did
happen. A smaller true story beats a bigger invented one, and it's the kind of claim
that gets probed.

---

## 3. SOM — bottoms-up math — 2x · CHECK MY ASSUMPTIONS

**Rubric:** L3 = correct math, under ₹10 cr · L4 = correct math, ₹10 cr–₹1,000 cr ·
L5 = over ₹1,000 cr with a defensible beachhead named.
**The rubric punishes a wrong base or wrong units harder than a small number.**

### Verified base (AICTE, 2025)
- **15.98 lakh** B.Tech seats approved for 2025–26
- **12.53 lakh** seats filled in 2024–25 — highest in eight years
- **5,875** AICTE-approved institutions

→ Roughly **50 lakh (5 million)** engineering students enrolled in India at any moment
(12.53 lakh intake × 4 year-groups).

### The math

```
Enrolled engineering students in India            50,00,000
× share under the ₹8L family income cap
  that need-based scholarships target      × 60%  30,00,000   ← ASSUMPTION, see below
= serviceable market                              30,00,000 students

× realistic paid conversion                × 10%   3,00,000 paying users
× annual price (deadline alerts +
  document checklist)                    × ₹199

SOM = ₹5.97 crore
```

**Lands at L3** — correct math, under ₹10 cr. **4 points.**

### The one assumption that swings it

Paid conversion is the soft number. At **10% → ₹5.97 cr (L3)**. At **20% → ₹11.9 cr
(L4)**, which is +2 points.

**My recommendation: submit the L3 number.** A defensible ₹5.97 cr scores 4 points. A
₹11.9 cr that collapses under one question about consumer conversion rates in India
risks scoring 2 — and it costs you credibility on every other claim.

### Alternative framing, if you'd rather argue L4

Institutions pay instead of students — colleges have student-welfare budgets and
scholarship facilitation is a real service:

```
5,875 AICTE institutions × 50% adoption × ₹1,00,000/yr licence = ₹29.4 crore   (L4)
```

Defensible, but you'd need to actually believe the B2B story. **Pick one. Don't submit
both.**

---

## 4. Why now — 1x · DRAFT

**Rubric:** L3 = clear tailwind in last 2 years · L4 = specific unlock in last 12 months
· L5 = window opened under 6 months ago, visible in the product.

> The National Scholarship Portal for 2026–27 opened on 1 June 2026 and closes
> 31 October. Right now, today, there is a live window with lakhs of crores in schemes
> open and most eligible students unaware of them. That window is the product — every
> result screen is sorted by how many days are left before a specific deadline shuts.
>
> What changed: a coding agent means one person can verify, structure and ship a
> working matcher over a weekend. This did not need a team or funding. It needed one
> person who had personally missed the money.

**Honest read: this is L3, maybe L4.** It's your weakest parameter and worth at most
4 points. Write it, don't agonise over it.

---

## 5. Moat and defensibility — 1x · DRAFT

**Rubric:** L2 = thin, first-mover only · L3 = workflow lock-in, integrations, taste.

> Thin today, and I'd rather say so. What exists: every entry is hand-verified against
> the official government or company source and stamped with the date it was checked.
> Aggregator sites carry stale deadlines constantly — a wrong date means a student
> misses real money. Being the one source a student can trust is a position that
> compounds, because trust is the whole purchase.
>
> Where it grows: as students set deadline reminders, the product learns which schemes
> actually pay out and which are dead ends — data no scraper collects.

**Honest read: L2, arguing toward L3.** Worth 1–2 points. Don't oversell it; a
transparent "thin today" reads better than an invented flywheel.

---

## 6. Metrics — FILL IN AT 6:45PM, NOT BEFORE

Run `npx convex run admin:counts` and paste the real output:

```
signups:  ___    (email + completed the five-question flow)
waitlist: ___    (email only, never used the product)
```

**Exclude guptashubham389@gmail.com from both counts** — the rubric excludes the
builder. State the adjusted numbers explicitly; being visibly honest about this is
worth more than the one row.

**Screenshots to attach:**
- [ ] Convex dashboard → Data tab → `signups` table
- [ ] Convex dashboard → Data tab → `waitlist` table
- [ ] GitHub repo, public, showing commit history
- [ ] The live product open on a phone

---

## 7. What I'd tell the reviewer

> Built in about three hours of focused time, starting on day three after missing the
> first two days entirely. No runtime AI calls — the matching is deterministic
> arithmetic over hand-verified data, because a student who is told the wrong deadline
> loses real money. Nine scholarships, each checked against its official source on
> 1 August 2026 and stamped with that date in the UI.
>
> The headline says "at least ₹X" and deliberately excludes any scheme with a
> requirement I can't verify from five questions. It would have been easy to make the
> number bigger. It would also have been a lie.

**→ Edit into your own words.**
