# Frontend Assignment — AudienceRate

Thanks for taking the time to do this. AudienceRate is a tech startup building
AI-driven tools that help companies manage their marketing strategy, outbound, and
**programmatic** activities. Internally that means customers ingest data from many
sources, build **audience segments**, see how well those audiences resolve against
our identity graph (**match rate**), and **activate** them to advertising
destinations (Google Ads, Meta, DV360, …).

This exercise asks you to build a small slice of that product: an **Audience
Segments dashboard**. We work fast, with direct ownership and a strong focus on the
quality of what we build — so we care far more about *how* you build this than about
how much. We want to see realistic, production-minded frontend work.

---

## The stack (required)

Please use exactly this stack, since it mirrors ours:

- **React + TypeScript**, single-page app built with **Vite**
- **Tailwind CSS** for styling
- **Redux Toolkit** for client/UI state and **RTK Query** for all data fetching
- **Git** with a real commit history

You consume the provided mock REST API (`/api`); **do not build your own backend**.
Router, chart lib, form lib, test runner, icons: your choice.

---

## What to build

### 1. Overview dashboard
- Fetch `GET /api/overview`.
- Show the KPIs as cards (total profiles, segments, active segments, avg match
  rate, identities resolved, activations). Format big numbers nicely (e.g. `40.8M`,
  `67%`).
- Render the `profilesTrend` 30-day series as a chart.
- Show the segments-by-status breakdown.

### 2. Segments list
- Fetch `GET /api/segments` as a paginated table or card grid.
- Support, **driven by the API** (server-side via query params, not just
  client-side filtering of a single page):
  - **Search** by name (debounced).
  - **Filter** by status (and ideally by tag and/or data source).
  - **Sort** by at least audience size and last updated.
  - **Pagination** using the `pagination` metadata.
- Handle **loading, error and empty** states deliberately (the API has built-in
  latency; you can also force errors — see `api/README.md`).

### 3. Segment detail
- A route like `/segments/:id` that loads the segment, its **trend**
  (`/segments/:id/trend`) and its **activations** (`/segments/:id/activations`).
- Show key metrics, a trend chart with a **range selector** (7 / 30 / 90 days),
  the linked data sources, and the activation list.

### 4. Create / edit a segment
- A form to create a segment (`POST /api/segments`) and to edit one
  (`PATCH /api/segments/:id`), with client-side validation.
- On the API's `400` response, **map `error.details` back onto the form fields**.
- After a successful mutation the **list and detail must reflect the change**
  without a full page reload (RTK Query cache invalidation / tags).

> Aim to complete 1–3 solidly and at least the create path of 4. A polished subset
> beats a rushed everything.

---

## Stretch goals (optional, pick what interests you)

- **Activate a segment** to a destination (`POST /api/activations`) and
  **pause/resume** it (`PATCH`), ideally with an **optimistic update**.
- **Delete** a segment with a confirmation step and correct cache handling.
- **URL-synced** filters / pagination so a filtered view is shareable & refresh-safe.
- A few **tests** (Vitest + React Testing Library) on a component or the api slice.
- Accessibility (keyboard nav, focus, aria), refined responsive layout, or a
  tasteful dark mode.

Don't do all of these — depth over breadth.

---

## What we're evaluating

- **RTK Query / data layer** — a clean api slice, sensible `tagTypes` / invalidation,
  query args driving server-side search/sort/pagination, good cache behaviour.
- **TypeScript quality** — API responses and domain models are typed; props are
  typed; `any` is rare and justified.
- **State separation** — server data stays in RTK Query; Redux slices hold only UI
  state (filters, modals…). Server data isn't duplicated into slices.
- **UI craft & UX** — clean, responsive interfaces; deliberate loading skeletons,
  error + retry, empty states; number/percent formatting; no layout-shift jank.
- **Component design** — readable, reusable components; sensible structure.
- **Styling** — consistent, maintainable Tailwind; a clean, professional look.
- **Engineering hygiene** — meaningful commits, a short README, no dead code.

We are **not** judging pixel perfection or how many stretch goals you hit. Clear,
correct, well-structured code wins.

---

## Time & scope

Please cap this at roughly **4–6 hours**. If you run out of time, stop and write in
your README what you'd do next and why — we read that closely. Use AI tools if you
normally do; just be ready to explain any line of your submission.

---

## Submitting

1. Put your frontend in a top-level `web/` folder of this repo (or your own repo).
2. Fill in the provided **[SUBMISSION.md](./SUBMISSION.md)** template: how to run it,
   key decisions & trade-offs, what you'd improve with more time, and — since this is
   a freelance engagement — your **typical daily rate** and availability (CET/CEST).
3. `npm install && npm run dev` in `web/` must Just Work against the API running on
   `http://localhost:4000`.
4. Send us a zip or a link to a git repo (with commit history).

Questions about the task are welcome — email us; asking good questions is a positive
signal, not a negative one. Have fun with it.
