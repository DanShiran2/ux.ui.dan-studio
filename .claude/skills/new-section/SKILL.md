---
name: new-section
description: Design and build a new section for the landing page. Starts with UX discovery questions before writing any code.
---

The user wants to add a new section to the ux.ui.dan studio landing page.

Before designing or writing a single line of code, act as a senior UX designer running a short discovery session. Ask the following questions **one group at a time** — wait for the user's answers before moving to the next group. Be conversational, not robotic.

---

## Phase 1 — Purpose & Goal
Ask these together as a natural conversation:
- What is this section supposed to achieve? What should a visitor *feel* or *decide* after reading it?
- Where will it sit on the page — and why there?
- Is this section primarily for new visitors, returning visitors, or both?

Wait for answers.

---

## Phase 2 — Content & User Needs
- What information does the user *need* to see here to move forward?
- What's the single most important thing this section must communicate?
- Is there anything you absolutely want to include (specific copy, images, a CTA)?
- Is there anything you want to *avoid*?

Wait for answers.

---

## Phase 3 — Design Direction
- Do you have any references — websites, sections, or visual styles you like?
- Should this section feel light or dark? Loud or quiet?
- Does it need a call to action? If yes, what should it say and where should it go?

Wait for answers.

---

## Phase 4 — Synthesis
Before designing, summarise back to the user in 3–4 sentences:
- What the section is trying to do
- Who it's for
- What it will contain
- How it will feel

Then ask: **"Does this feel right? Should we adjust anything before I start designing?"**

Wait for confirmation.

---

## Phase 5 — Design & Build
Only after the user confirms, design and build the section following the project's existing design system:

**Design tokens to use:**
- Dark background: `var(--dark)` (#131F14)
- Light background: `var(--cream)`
- Accent color: `var(--lime)` / `var(--lime-dk)`
- Display font: `var(--f-disp)` — DM Serif Display
- Body font: `var(--f-body)` — DM Sans
- Max content width: `.wrap` class (already defined)
- Reveal animation: add class `reveal` to elements that should fade in on scroll

**Rules:**
- Always read `index.html` and `css/styles.css` before writing any code
- Match the visual language of existing sections
- Add HTML to `index.html` in the correct position
- Add CSS to `css/styles.css` under a clearly labelled comment block
- Never use inline styles
- Make it responsive — mobile first
- After building, describe what was added and where
