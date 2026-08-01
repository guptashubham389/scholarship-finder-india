# IDEA_SCOPE.md

**Project:** Scholarship & Grant Finder (India) — engineering students
**Track:** 💰 Revenue
**Builder:** Shubham Gupta · L1 (first time writing code)
**Written:** Sat 1 Aug 2026
**Hard cutoff:** Sun 2 Aug 2026, 8:00pm IST

> This document is the referee. When Claude adds something I did not ask for, I point at this doc.
> When I get an idea at 11pm, it goes in the Parking Lot, not the build.
> **I am the manager. The AI is the intern.**

---

## 0. Reality check (read this first, every session)

| Fact | Value |
|---|---|
| Today | **Saturday 1 Aug — day 3 of 4** |
| Time to cutoff | **~34 hours wall-clock** |
| Real focused build time available | **Under 4 hours** |
| Handbook milestone already missed | Waitlist launch (was due Fri 11am) |
| Current state | ✅ M0 gate passed · ✅ M1 pipeline live |

**Live artifacts (verified 1 Aug 2026, 12:05 IST):**
- 🌐 **https://scholarships-india.vercel.app** ← **THE public URL. Use this one everywhere.**
- 🌐 https://my-first-project-two-peach.vercel.app — auto-following backup, always current
- 📦 **https://github.com/guptashubham389/scholarship-finder-india** — public
- 🚀 **Deploy with `./ship.sh "what changed"`** — never `git push` alone

> ⚠️ **Why `ship.sh` exists — this would have cost the submission.**
> `scholarships-india.vercel.app` is a *manual alias*, and a manual alias stays
> pinned to the deployment it was set on. Push new code and the site appears to
> update while the link you gave students still serves the old build. Silent
> failure, no error anywhere. `ship.sh` re-points the alias after every deploy and
> **fails loudly if the public URL is not HTTP 200.** Use it every time.
> *(`scholarshipfinder-india.vercel.app` is dead — stuck at 403. Do not use it.)*

> ⚠️ **Found and fixed:** the Vercel team had `ssoProtection: all_except_custom_domains`
> switched on, which puts a login wall in front of the site — strangers would have hit
> a sign-in screen instead of the product. Disabled via `vercel project protection
> disable --sso`. **Re-check this before submitting** — if a deploy ever turns it back
> on, the judges cannot open the URL and the submission is worthless.

**Consequence:** every hour is allocated below. Nothing gets added that is not in this file.

---

## 1. The product

**One sentence:** Five questions tell an Indian engineering student how much scholarship money they qualify for and which deadline hits first.

**User:** An engineering / professional-degree student in India, mid-course, who suspects money exists but has never found it.

**Job being completed:** *Not* "search scholarships." → **"Find out what I'm owed, and what closes first."**

**Creativity thesis — the inversion:** every existing tool, NSP included, makes you *search* — you must already know what you're looking for. This tells you what you're owed **before** you've searched. The number arrives before the effort does.

**Delight/pay thesis:** the number. **"₹3.2 lakh"** is what gets screenshotted into a college WhatsApp group. That screenshot is the distribution loop.

**Core end-to-end flow:**
```
5 questions → total ₹ + matched list sorted by deadline urgency → email captured → row in Convex
```

---

## 2. Verified stack constraints

| Capability | Status | Constraint |
|---|---|---|
| Claude Code (Claude Max) | ✅ Running | Writes the code. Does **not** power the deployed app. |
| **Runtime AI in the app** | 🔴 **FORBIDDEN** | Claude API is billed separately with its own card. **Not on the critical path.** |
| Scholarship data | ✅ Static JSON | **NSP 2.0 API is write-only** — it pushes beneficiary data *in*, it cannot list schemes. No public read API exists. Hand-curated only. |
| Convex (free tier) | ✅ Safe | 1M function calls · 0.5 GB DB · 1 GB files · 1,000 concurrent sessions. Orders of magnitude more than needed. |
| Vercel | ✅ Safe | Auto-deploys on every push to GitHub. |
| GitHub | ⚠️ Not created yet | Blocking. Milestone 1. |

**The app makes zero API calls at runtime.** No key, no billing, no latency, no rate limit, nothing to break in front of a user.

---

## 3. Rubric contract — Revenue track

Points = **(L − 1) × weight**. Base cap 176. Parameter names are verbatim from Scoring §10.

| Parameter | Weight | Now | Target | The proof |
|---|---|---|---|---|
| **Signups** | 20x | L1 | **L2 → stretch L3** | Convex rows: email **+ ran the core flow**. 1–50 = L2 (20 pts). 51+ = L3 (40 pts). |
| **Live product quality** | 8x | L1 | **L3 → L4** | Flow works on a phone, no bugs, looks deliberate. L3 = 16 pts, L4 = 24. |
| **Pain point severity** | 2x | L1 | **L4 → L5** | 5+ student conversations, quotes pasted into submission. |
| **Right to win** | 2x | L1 | **L4 → L5** | I lived this pain + I can reach these users. Visible in the build. |
| **Waitlist** | 4x | L1 | **L2** | Email-only rows (no product touch). 1–150 = L2 (4 pts). |
| **SOM (bottoms-up math)** | 2x | L1 | **L3–L4** | Users × ACV, math shown. |
| **Why now** | 1x | L1 | **L3** | Written. |
| **Moat and defensibility** | 1x | L1 | **L2** | Written. |
| **Revenue generated (USD)** | 4x* | L1 | **L1 — deliberately** | Not chasing money. Wrong use of 4 hours. |

*\*Open question for hosts: this row states weight 15x but Max 16, and the track total sums it as 16. Ask at Q&A.*

**Realistic total: ~59–93 / 176.**

**Note:** the Virality anti-spoof ratios do **not** apply to this track. High conversion from direct shares is safe here.

**Evidence discipline:** waitlist emails and signups are **different rows proving different things** — an email with no product use is Waitlist; an email from someone who ran the flow is Signups. Never count one row as both.

---

## 4. Requirements vs. optional

### MUST HAVE — this is the weekend
1. Live Vercel URL that a stranger can open on a phone
2. Public GitHub repo
3. Landing page with **my own words** (vision framing)
4. Email capture writing into Convex
5. Five-question form
6. Result: **total ₹ number** + matched list sorted by deadline urgency
7. 12 hand-verified scholarships in static JSON, each with official source URL + verification date

### NICE TO HAVE — only if must-haves are done and working
- "Document needed" line per scholarship
- Share button that copies the result text
- Empty-state handling that still feels good

### PARKING LOT — not this weekend
Near-miss / eligibility-gap logic (**this is what kills the submission — 3–4× curation time**) · user accounts · saved profiles · payments · scraping · deadline reminder emails actually sending · other states · other segments (non-engineering) · all-India coverage · admin panel · analytics dashboard

---

## 5. Non-goals (say these out loud to Claude)

**No login. No auth. No payments. No scraping. No runtime AI calls. No application submission. No document upload. No coverage beyond engineering/professional-degree students. No near-miss logic.**

> When Claude proposes any of the above: **"That's in the parking lot. Do not build it."**

---

## 6. Data integrity rule — non-negotiable

A wrong deadline means a real student misses real money.

- Every scholarship entry **must** carry: official source URL + `verifiedOn: "2026-08-01"`
- **Claude drafts. I verify.** I personally open the official URL for every entry before it ships.
- **12 I have checked beats 40 Claude invented.** Claude will produce confident, plausible, wrong listings if allowed to.
- Any entry I cannot verify in 60 seconds gets **deleted**, not guessed at.
- The UI shows the verification date and links to the official page on every row.

---

## 7. MILESTONE 0 — POC GATE (20 min, **NO CODE**)

**Per handbook Build Process step 05. Nothing gets built until this passes.**

**Riskiest assumption:**
> There are enough real, currently-open scholarships for Indian engineering students that a 5-question filter produces a non-embarrassing match — and the total ₹ is big enough to be worth screenshotting.

**The test (no code, no app, 20 minutes):**

Paste into Claude Code:
```
Do NOT write any code. Research only.

Find 12 scholarships currently open to engineering / professional-degree
students in India. For each, give me:
  name | who qualifies (year, income cap, category, state) | amount in ₹
  | deadline | official government or company URL

Rules:
- Official sources only (.gov.in, .nic.in, or the company's own site).
- If you are not confident a scholarship is currently open, say so. Do not guess.
- Return it as a plain table.
```

**Then I do this myself:**
1. Open **3** of those official URLs in a browser.
2. Confirm the scholarship exists and the deadline is real.
3. Invent one realistic student profile (e.g. *2nd-year BTech, Maharashtra, family income ₹4L, OBC*) and count how many of the 12 they'd match and the total ₹.

**Gate criteria:**

| Result | Action |
|---|---|
| ≥8 of 12 verify, and a typical profile totals **> ₹50,000** | ✅ **PASS** → Milestone 1 |
| 4–7 verify, or total is small | ⚠️ Widen: allow all-India + any-year schemes. Re-test once. |
| <4 verify | 🔴 **STOP.** Reframe as "Deadline Tracker" — fewer schemes, urgency is the product. Update this doc before building. |

**Stop condition: 20 minutes. Hard.** If unresolved, take the ⚠️ path and move.

### ✅ GATE RESULT — PASSED (1 Aug 2026)

Shubham opened AICTE, Reliance Foundation and Kotak Education Foundation officially
and confirmed the schemes are live and the deadlines are correct.

**Verified pool (10 usable):** AICTE Pragati · AICTE Saksham · Central Sector Scheme
(CSSS) · Post Matric SC · Post Matric ST · Post Matric OBC · Reliance Foundation UG ·
Kotak Kanya · Sitaram Jindal · AICTE Swanath *(low confidence — verify or drop)*.
**Excluded:** HDFC Parivartan ECSS — 2026-27 cycle not open yet.

**Deadline spread is healthy:** Kotak Kanya 20 Aug (19 days) → NSP schemes 31 Oct
(91 days). The NSP window opened 1 June and runs to 31 Oct, so the "closes in N days"
mechanic has real urgency to work with.

**⚠️ Finding that changes the design — the total ₹ swings hard on three fields:**

| Test profile | Matches | Total |
|---|---|---|
| 2nd yr, Maharashtra, ₹4L, OBC, **male** | 2 | **~₹36,000** |
| 2nd yr, Maharashtra, ₹1.4L, OBC, **female** | 4 | **~₹1,00,000+** |

**Gender, category and family income are the biggest swing factors** — all three are
non-negotiable in the five questions. And the low-match screen is a *common* state for
general-category higher-income male students, not an edge case. **Design it properly
(M3 acceptance test #3), or the product feels broken for a large share of users.**

---

## 8. MILESTONE 1 — Pipeline alive (50 min)

**Goal: an ugly, hardcoded, complete page live on a real URL — before any feature exists.**

This is the single highest-risk milestone because I have never done it. Everything after this is just editing.

**Tasks:**
1. In Claude Code, one sentence (handbook Go Live §):
   ```
   ship this to vercel. set up github and vercel from scratch and make it
   auto-deploy. ask me the repo name and whether it's public.
   ```
   Repo name: `scholarship-finder-india` · **Public** (the repo is submission evidence).
2. Let it scaffold a Next.js app, `git init`, create the repo, push, wire Vercel, deploy.
3. Set up Convex: `npx convex dev` — sign in with **GitHub**, same account.

**Skill to lean on:** `convex-setup-auth` — **for the Convex scaffold ONLY.**
> Tell Claude explicitly: *"Use convex-setup-auth to set up Convex, but **do not add authentication**. No login, no users table. I only need one table for email capture."*

**Acceptance test:**
- [ ] I open `https://<name>.vercel.app` **on my phone** and see the page
- [ ] The GitHub repo is public and has ≥1 commit
- [ ] Convex dashboard shows my project

**Failure handling (handbook one-liners):**
- Build failed → *"my vercel build just failed. use the vercel api to pull the latest deployment's build log, find the actual error, and fix it. when you're confident the fix will build, push it."*
- Push rejected → *"my push was rejected. pull the latest and push my work."*
- 500 on the live site → *"my live site is showing an error. pull the vercel runtime logs and fix whatever broke."*

**Stop condition:** 60 minutes. If the URL is not live, **stop building features** and bring this exact blocker to the Q&A.

**If I am behind, cut to this:** a single static HTML page with my headline and an email box. Nothing else. **A live URL with one working thing beats a perfect local app.**

---

## 9. MILESTONE 2 — Waitlist live + LAUNCHED 🚨 (40 min + launch)

**This is the most urgent item in the document. Already ~22 hours past the handbook's milestone.**

**Tasks:**
1. Convex table `waitlist`: `{ email, source, createdAt }`
2. Landing page: headline, what it does, who it's for, email box, thank-you state
3. **I write the copy myself.** Handbook §Go Live: *"do not summarize and rewrite in chatgpt or claude. do not use ai. your words, your conviction. ai copy has no pulse and everyone can smell it."*
   - The frame: **imagine the product is fully live today.** Write the vision, not the MVP.
   - What I missed out on → what I'm building so nobody else does.
4. Commit, push, verify the deploy.

**Skills:** `frontend-design` + `interface-design` for layout and hierarchy.
`copywriting` is **BANNED** for the hero/vision copy and the launch post. Microcopy only (button labels, error text).

**Acceptance test:**
- [ ] I submit my own email **from my phone** on the live URL
- [ ] The row appears in the Convex dashboard → Data tab
- [ ] I submit a second time — no crash
- [ ] Empty email and garbage input (`asdf`) show a clear error, not a crash

**🚩 DISTRIBUTION — do this the moment the acceptance test passes. Do not wait for the product.**
- **D1 — Student group.** Send the link to the group I said I can reach. My words, honestly: what I missed, what I built, one ask.
- **D2 — Cohort Slack.** *"I have this. please boost, share, give feedback."* Handbook: *"asking for a push is part of the discipline."*

**Stop condition:** if it isn't launched by **6pm Saturday**, launch whatever exists. A rough page in front of people beats a good page nobody sees.

**If I am behind, cut to this:** email box + one honest sentence. Ship it. Send it.

---

## 10. MILESTONE 3 — Core flow, ugly and complete (60 min)

**Goal: one complete flow end to end. Ugly is fine. Complete is not optional.**

**Tasks:**
1. `data/scholarships.json` — the 12 verified entries from M0:
   ```json
   {
     "id": "aicte-pragati-2026",
     "name": "...",
     "amount": 50000,
     "deadline": "2026-09-30",
     "eligibility": { "years": [1,2,3,4], "maxIncome": 800000,
                      "categories": ["OBC","SC","ST"], "states": ["ALL"],
                      "gender": "any" },
     "documentNeeded": "Income certificate",
     "sourceUrl": "https://...",
     "verifiedOn": "2026-08-01"
   }
   ```
2. Five questions: **year of study · state · family income · category · branch**
3. Matching = plain filtering over the JSON. **No AI. No API. Pure arithmetic.**
4. Result screen:
   - **The number first, large:** `You qualify for ₹X across N scholarships`
   - **Nearest deadline:** `Closes in D days`
   - List sorted by days-remaining ascending: name · ₹ · days left · document needed · official link · `verified 1 Aug 2026`
5. **Email capture on the result screen** → Convex table `signups` `{ email, profile, matchedTotal, matchedCount, createdAt }`

> **Why a separate table:** `signups` = ran the flow (20x parameter). `waitlist` = email only (4x parameter). Different evidence, different parameters, never double-counted.

**Skills:** `writing-plans` **before** building — make Claude state the plan first. `vercel-react-best-practices` while writing components.

**Rule:** *"Tell me your build plan first, mapped to these tasks. Do not write code until I say go."* If it jumps to code without asking anything, it is guessing — stop it.

**Test inputs (run all five):**

| # | Profile | Expect |
|---|---|---|
| 1 | 2nd yr, Maharashtra, ₹4L, OBC, CSE | Several matches, ₹ total > 0 |
| 2 | 4th yr, Bihar, ₹1.5L, SC, Mechanical | Matches, high total |
| 3 | 1st yr, Goa, ₹25L, General, Civil | **Few or zero — must not crash** |
| 4 | All fields empty | Clear validation message |
| 5 | Income = `abc` / negative | Handled, no crash |

**Acceptance test:**
- [ ] All five inputs produce a sensible screen — **including the zero-match case**
- [ ] Zero-match shows something useful ("nothing matched — leave your email and I'll tell you when something opens"), never a blank page
- [ ] Every row links to a working official URL
- [ ] Email on the result screen lands in Convex `signups`
- [ ] Works on my phone
- [ ] Deployed and live — not just running locally

**Stop condition:** 75 minutes. Then stop and ship whatever works.

**If I am behind, cut to this:** drop to **3 questions** (year, income, category) and 8 scholarships. The number and the list still work.

---

## 11. MILESTONE 4 — Quality pass (Sunday, 45 min)

**This is the one that moves Live product quality 8x from L3 (16 pts) to L4 (24 pts).** Only start once M3's acceptance test fully passes.

**Tasks (in priority order — stop when time runs out):**
1. Mobile layout — most students will open this on a phone
2. Make the ₹ number the visual hero of the result screen
3. Deadline urgency visible at a glance (closest first, days-left prominent)
4. Loading and empty states that don't look broken
5. Remove anything that looks like a default template

**Skills:** `frontend-design` then `interface-design`. Handbook note: these exist specifically to avoid the generic AI look — purple gradients, Inter font, cookie-cutter layout.

**Fresh-eyes review (handbook Build Process step 06):** open a **new** Claude Code session and paste:
```
Review this build against my plan. [paste IDEA_SCOPE.md sections 10-11]
For each acceptance test: does it actually work?
Bad input test: empty fields, garbage text, double-click, very long input.
Mobile vs desktop. List blockers only — not improvements.
```
A fresh session has no memory of building it and no attachment. It catches what the builder session never will.

**Acceptance test:**
- [ ] A stranger could use it with no explanation
- [ ] Nothing on screen looks like placeholder text
- [ ] Fresh-eyes review returns zero blockers

---

## 12. Distribution schedule — first-class tasks, not leftovers

| When | Action | Parameter it moves |
|---|---|---|
| **Sat, immediately after M2** | **D1** — send link to student group | Waitlist 4x |
| **Sat, same hour** | **D2** — cohort Slack, ask for a boost | Waitlist 4x |
| **Sat evening** | **D3** — message 5 students individually. Ask: *have you ever missed a scholarship you qualified for? what did you do instead?* **Save their exact words.** | **Pain point severity 2x → L4/L5** |
| **Sun morning** | **D4** — re-share to the same group: *"it's live, it works, try it"* — this is what converts waitlist emails into **signups (20x)** | **Signups 20x** |
| **Sun afternoon** | **D5** — 30-second screen recording of the flow, post it | Signups, product quality |

**D3 is the highest points-per-minute task in this entire document.** Five conversations, zero code, and it's the difference between L2 (2 pts) and L5 (8 pts) on Pain point severity — plus the quotes are submission evidence.

---

## 13. Writing tasks — 32 points, zero build cost

Do these while Claude is building. They compete with nothing.

| Task | Parameter | What "good" looks like |
|---|---|---|
| **SOM math** | SOM 2x | `[engineering students in India] × [realistic annual ₹]`. Show the multiplication. Use the **GrowthX TAM/SAM/SOM calculator** linked from the Scoring page. Correct math under ₹10 cr = L3; ₹10–1,000 cr = L4. Do not inflate the base — wrong base scores L1. |
| **Pain severity** | 2x | Named user + **5+ conversations** + quotes in the submission = L5. Comes free from D3. |
| **Right to win** | 2x | *I lived this — I missed scholarships I qualified for — and I can reach these students directly.* Deep founder-market fit visible in the build = L5. |
| **Why now** | 1x | Needs a specific unlock in the last ~12 months, not "AI is hot." Weakest parameter — write it, don't agonise. |
| **Moat** | 1x | Verified-data trust + workflow lock-in. L2–L3 honestly. Don't oversell. |

---

## 14. MILESTONE 5 — Submission window (Sunday 6:00–8:00pm) 🔒

**Protected. No new features. No "one more thing." Building stops at 6:00pm.**

| Time | Action |
|---|---|
| 6:00 | **Stop building.** Final commit and push. Confirm Vercel deployed green. |
| 6:15 | Open the live URL in an **incognito window on mobile data** — not my browser, not my wifi. Prove a stranger can use it. |
| 6:30 | Run all 5 test profiles again on the **live** URL. Fix only crashes. |
| 6:45 | **Screenshot the Convex Data tab** — `waitlist` rows and `signups` rows. These are the metrics. |
| 7:00 | Screenshot the GitHub repo (public, commit history). Screenshot the Vercel deployment. |
| 7:15 | Assemble submission: **live URL · repo URL · signup count · waitlist count · 5 pain quotes · SOM math** |
| **7:30** | **SUBMIT.** Thirty minutes early. |
| 7:30–8:00 | Buffer. If something breaks, I still have time. |

**A submitted imperfect product beats an unsubmitted better one. Submitting is what puts me in the 20%.**

---

## 15. Evidence map — what proves each claimed level

| Parameter | Level claimed | The exact artifact |
|---|---|---|
| Signups (20x) | L2 / L3 | Convex `signups` table screenshot — row count, each row has email + matched result |
| Live product quality (8x) | L3 / L4 | Live URL working on mobile in incognito + 5 test profiles passing + fresh-eyes review clean |
| Pain point severity (2x) | L4 / L5 | 5 student conversations, quotes pasted verbatim into the submission |
| Right to win (2x) | L4 / L5 | My own story + the fact that the users came from a group I could reach |
| Waitlist (4x) | L2 | Convex `waitlist` table screenshot — email-only rows |
| SOM (2x) | L3 / L4 | The written multiplication, base segment named |
| Why now (1x) | L3 | Written paragraph |
| Moat (1x) | L2 | Written paragraph |
| Revenue generated | L1 | $0 — deliberate, stated in the submission |

**No artifact is used twice.** A `waitlist` row proves Waitlist. A `signups` row proves Signups. A quote proves Pain severity. A working flow proves Product quality.

---

## 16. Status tracker — update as I go

| State | M1 pipeline | M2 waitlist | M3 core flow | M4 quality |
|---|---|---|---|---|
| Implemented | ✅ | ☐ | ☐ | ☐ |
| Working locally | ✅ | ☐ | ☐ | ☐ |
| **Deployed & verified at public URL** | ✅ | ☐ | ☐ | ☐ |
| **Metrics moving** | — | ☐ | ☐ | — |

**Checkpoint questions — ask at every milestone:**
1. Does the core flow still work at the live URL?
2. What parameter evidence improved?
3. Which distribution action is due?
4. What is now the largest submission risk?
5. What should be cut?

---

## 17. Open questions for the hosts (11am Q&A)

1. **Revenue rubric contradiction:** "Revenue generated (USD)" states weight **15x** and overflow "+1 pt × 15x", but the same row says **Max 16** and the track total sums it as 16 — and the cross-track bonus table lists its original weight as **4x**. Which is correct? *(Decides whether chasing real payments is worth any time at all.)*
2. Does **hand-curated static data** cap the "Live product quality" parameter, or is a product with no runtime AI judged the same?
3. For **Signups**, do cohort peers count, or are they excluded the way team members are?

---

## ▶️ NEXT SINGLE ACTION

**Run Milestone 0 — the POC gate. Paste the research prompt from §7 into Claude Code. 20 minutes, no code.**

Do not create the repo. Do not open Vercel. Do not write a line of code until 8 of those 12 scholarships verify.

If they don't verify, this document changes before anything gets built — and that 20-minute check just saved the weekend.
