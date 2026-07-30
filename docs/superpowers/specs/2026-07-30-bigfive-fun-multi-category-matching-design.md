# bigfive-fun: Multi-Category Character Matching — Design Addendum

Date: 2026-07-30

Extends [2026-07-30-bigfive-fun-design.md](./2026-07-30-bigfive-fun-design.md). That spec covered a single overall character match; this addendum replaces it with four independent matches, one per category, so a test-taker gets several characters to consider rather than one.

## Goals

- Instead of one nearest-neighbor match across the whole roster, split the roster into four categories and find the nearest match *within each category independently*.
- Categories: **book**, **movie**, **tv**, and **isu** (a real, historical Iowa State University figure).
- Grow the roster so each category has enough spread that similar scorers can still land on different characters.

## Real people vs. fictional characters

The book/movie/TV categories keep working exactly as before: fictional characters, editorial trait profiles, original (non-quoted) blurbs written in a playful "dust jacket" voice.

The `isu` category is different in kind — these are real, historical, named individuals — and is held to a different content standard:

- Every person included must be verifiably connected to Iowa State University (as alumnus or faculty), confirmed via research rather than recalled from memory. (Two initial candidates, Clyde Tombaugh and Norman Borlaug, were dropped after verification showed no ISU connection.)
- The written text for each person is a factual, sourced statement about their real, documented achievement — not an invented psychological characterization. Where the fictional categories get a whimsical blurb, the ISU category gets a real fact.
- Trait profiles for this category are kept conservative and grounded in well-documented public behavior (career persistence, leadership style, public record) rather than speculation about someone's private psychology. Neuroticism in particular is kept near-neutral across this category, since the public record doesn't support confident claims either way about someone's emotional life.
- The roster favors historical/deceased figures. A few long-retired or decades-established public figures are included only where their entire public reputation is already built on the achievement being cited (e.g., a Nobel laureate, an Olympic champion) — never a currently active private individual whose reputation isn't already fully public.

## Data model changes

`CharacterEntry` (in `src/lib/types.ts`) gains a `medium` field:

```ts
export type Medium = 'book' | 'movie' | 'tv' | 'isu'

export interface CharacterEntry {
  id: string
  name: string
  source: string
  medium: Medium
  profile: CharacterProfile
  blurb: string
}
```

`source` continues to hold the short subtitle shown under the name — for book/movie/TV entries that's the title of the work; for `isu` entries it's their role/era at ISU (e.g., "ISU Chemistry Professor, 1930s–1960s").

No new fields are needed beyond `medium` — the existing `blurb` field is reused for both the whimsical fictional blurbs and the factual ISU statements, just written in a different register. `DustJacketCard` itself doesn't need to change; `ResultsScreen` adds a small heading above each card identifying its category ("Book Match", "Movie Match", "TV Match", "ISU Connection").

## Roster size

- Book: 18 (16 existing + 2 new)
- Movie: 18 (4 existing + 14 new)
- TV: 18 (new category, 18 new)
- ISU: 21 (new category, all new, all individually verified)

Total roster: 75 characters.

## Matching

```ts
export type Matches = Record<Medium, CharacterEntry>

export function findMatchesByMedium(scores: Scores, roster: CharacterEntry[]): Matches
```

For each medium, filters the roster to that medium and applies the existing `findClosestCharacter` nearest-neighbor logic unchanged. Throws (via the existing empty-roster check) if any medium's bucket is empty — which also acts as a safety net ensuring every category actually has entries before shipping.

## UI changes

- `ResultsScreen` accepts `matches: Matches` instead of a single `character`. It renders four `DustJacketCard`s in a fixed order (book, movie, tv, isu), each preceded by a small section label naming the category.
- `App.tsx` calls `findMatchesByMedium` instead of `findClosestCharacter` and passes the result down.
- The five real trait-score bars are unchanged.

## Non-goals

- No UI for the user to "pick a favorite" match — just showing all four is enough for them to find the one they identify with, per the original request.
- No further verification tooling beyond the research already done for this list; if the roster is extended later, the same "verify before including" standard applies to any new `isu` entries.
