# bigfive-fun: Design Spec

Date: 2026-07-30

## Overview

A standalone web app that administers the real 120-item IPIP-NEO Big Five personality test and, in addition to the standard trait scores, shows a "dust jacket" result: an invented book-blurb-style write-up matching the test-taker to the fictional character their results most resemble.

The scientific instrument (questions + scoring) is ported from [rubynor/bigfive-web](https://github.com/rubynor/bigfive-web) (MIT licensed). Everything else — the character roster, matching, and result presentation — is original to this project.

## Goals

- Run the genuine 120-item IPIP-NEO test and produce accurate domain-level trait scores.
- Present those scores alongside a fun, well-written character match — additive to the real results, not a replacement for them.
- Ship as a simple static, client-side app with no backend, accounts, or stored user data.

## Non-goals (v1)

- Facet-level (30 sub-facet) scoring — domain-level (5 traits) only.
- Sharing, permalinks, or image export.
- Accounts, saved history, or analytics.
- Multiple languages (English only, even though the source question bank supports ~30).

## Content model

### Character roster

A curated, static dataset of ~20-30 characters spanning books, movies, and TV. Each entry:

```ts
type CharacterEntry = {
  id: string;
  name: string;
  source: string; // e.g. "Harry Potter"
  profile: { O: number; C: number; E: number; A: number; N: number }; // 0-100, editorial estimate
  blurb: string; // original dust-jacket-style write-up, NOT quoted from source material
};
```

Blurbs are original writing inspired by the character's well-known personality — never verbatim quotes or reproduced text from the source work, to stay clear of copyright concerns. The roster should span a reasonably even spread across the five-dimensional trait space so matches feel distinct rather than clustering on a handful of "default" characters.

### Matching algorithm

Nearest-neighbor match: compute the test-taker's normalized domain scores, then find the roster entry with the smallest Euclidean distance across the 5 dimensions. Ties broken by roster order (stable, not random) — acceptable for v1 given a large enough roster makes exact ties rare.

### Per-trait notes

Independent of the character match: a short one-line fun note per domain, keyed off whether the test-taker scored high or low on that trait (10 short write-ups total: 5 traits × 2 levels).

## Test flow

1. **Intro screen** — brief explanation, start button.
2. **Question flow** — 120 items, paginated in batches (mirroring the source test's pacing), 5-point Likert scale.
3. **Results screen** — two parts:
   - Real trait scores: domain-level bars/percentiles for O, C, E, A, N.
   - Dust jacket card: character name/source, the original blurb, plus the 5 per-trait one-liners.

## Architecture

- New standalone repo (this one), not a fork of bigfive-web.
- Port `packages/score` and the English data from `packages/questions` out of bigfive-web into this project, with attribution/license notice (MIT).
- Simple client-side app (React/Next.js static export or similar lightweight setup) — scoring and matching run entirely in the browser. No API routes, no database.
- Character roster ships as a static JSON/TS data file bundled with the app.
- Deployable as a static site (e.g. Vercel) with zero server-side runtime needs.

## Testing

- Unit tests for the ported scoring logic against known fixture answer sets (to confirm the port didn't drift from the source behavior).
- Unit tests for the nearest-neighbor matching function against fixed profile inputs with known expected matches.
- Manual verification of the question flow and results screen in the browser.

## Open questions / future phases

- Facet-level detail (phase 2, if wanted).
- Shareable image export of the result card (cheap add-on later).
- Expanding/rebalancing the character roster over time as more characters get written.
