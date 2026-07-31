import { describe, it, expect } from 'vitest'
import { findClosestCharacter, findMatchesByMedium, populationPercentile } from './matching'
import realCharacters from '../data/characters'
import type { CharacterEntry, DomainKey, Medium, Scores } from './types'

const DOMAINS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

function makeScores(normalized: Record<DomainKey, number>): Scores {
  const scores = {} as Scores
  for (const d of DOMAINS) {
    scores[d] = { average: 0, normalized: normalized[d], result: 'neutral' }
  }
  return scores
}

function character(id: string, medium: Medium, p: Record<DomainKey, number>): CharacterEntry {
  return { id, name: id, source: 'Test', medium, blurb: '', profile: p }
}

const roster: CharacterEntry[] = [
  character('a', 'book', { O: 10, C: 10, E: 10, A: 10, N: 10 }),
  character('b', 'book', { O: 90, C: 90, E: 90, A: 90, N: 90 }),
  character('c', 'book', { O: 50, C: 50, E: 50, A: 50, N: 50 }),
]

describe('populationPercentile', () => {
  it('puts the midpoint at the 50th percentile', () => {
    expect(populationPercentile(50)).toBeCloseTo(0.5, 3)
  })

  it('increases monotonically and stays inside 0-1', () => {
    let prev = -1
    for (let v = 0; v <= 100; v += 5) {
      const p = populationPercentile(v)
      expect(p).toBeGreaterThan(prev)
      expect(p).toBeGreaterThanOrEqual(0)
      expect(p).toBeLessThanOrEqual(1)
      prev = p
    }
  })
})

describe('findClosestCharacter', () => {
  it('matches a high scorer to the top-ranked character', () => {
    expect(findClosestCharacter(makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 }), roster).id).toBe('b')
  })

  it('matches a low scorer to the bottom-ranked character', () => {
    expect(findClosestCharacter(makeScores({ O: 12, C: 8, E: 15, A: 10, N: 11 }), roster).id).toBe('a')
  })

  it('matches an average scorer to the middle-ranked character', () => {
    expect(findClosestCharacter(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 }), roster).id).toBe('c')
  })

  it('picks the first roster entry on an exact tie', () => {
    const tied = [
      character('first', 'book', { O: 50, C: 50, E: 50, A: 50, N: 50 }),
      character('second', 'book', { O: 50, C: 50, E: 50, A: 50, N: 50 }),
    ]
    expect(findClosestCharacter(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 }), tied).id).toBe('first')
  })

  it('only considers the domains it is asked to consider', () => {
    const pair = [
      character('matches-on-O', 'book', { O: 90, C: 10, E: 10, A: 10, N: 10 }),
      character('matches-on-N', 'book', { O: 10, C: 10, E: 10, A: 10, N: 90 }),
    ]
    const scores = makeScores({ O: 95, C: 50, E: 50, A: 50, N: 95 })
    expect(findClosestCharacter(scores, pair, ['O']).id).toBe('matches-on-O')
    expect(findClosestCharacter(scores, pair, ['N']).id).toBe('matches-on-N')
  })

  it('throws on an empty roster', () => {
    expect(() => findClosestCharacter(makeScores({ O: 0, C: 0, E: 0, A: 0, N: 0 }), [])).toThrow()
  })
})

describe('findMatchesByMedium', () => {
  const mixed: CharacterEntry[] = (['book', 'movie', 'tv', 'isu'] as Medium[]).flatMap((m) => [
    character(`${m}-low`, m, { O: 10, C: 10, E: 10, A: 10, N: 10 }),
    character(`${m}-high`, m, { O: 90, C: 90, E: 90, A: 90, N: 90 }),
  ])

  it('finds a match independently within each medium', () => {
    const matches = findMatchesByMedium(makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 }), mixed)
    expect(matches.book.id).toBe('book-high')
    expect(matches.movie.id).toBe('movie-high')
    expect(matches.tv.id).toBe('tv-high')
    expect(matches.isu.id).toBe('isu-high')
  })

  it('does not let one medium leak into another', () => {
    const matches = findMatchesByMedium(makeScores({ O: 12, C: 12, E: 12, A: 12, N: 12 }), mixed)
    for (const medium of ['book', 'movie', 'tv', 'isu'] as Medium[]) {
      expect(matches[medium].medium).toBe(medium)
    }
  })

  it('ignores Neuroticism for the ISU roster, since we never claimed to know it', () => {
    // Two ISU figures identical except on N. Because ISU is not matched on N,
    // a strongly high-N or low-N test taker must not be steered by that trait.
    const withIsuPair: CharacterEntry[] = [
      ...mixed.filter((c) => c.medium !== 'isu'),
      character('isu-lowN', 'isu', { O: 50, C: 50, E: 50, A: 50, N: 10 }),
      character('isu-highN', 'isu', { O: 50, C: 50, E: 50, A: 50, N: 90 }),
    ]
    const highN = findMatchesByMedium(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 99 }), withIsuPair)
    const lowN = findMatchesByMedium(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 1 }), withIsuPair)
    expect(highN.isu.id).toBe(lowN.isu.id)

    // Sanity: the same pair in a medium that IS matched on N does discriminate.
    const withBookPair: CharacterEntry[] = [
      ...mixed.filter((c) => c.medium !== 'book'),
      character('book-lowN', 'book', { O: 50, C: 50, E: 50, A: 50, N: 10 }),
      character('book-highN', 'book', { O: 50, C: 50, E: 50, A: 50, N: 90 }),
    ]
    expect(findMatchesByMedium(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 99 }), withBookPair).book.id).toBe(
      'book-highN',
    )
    expect(findMatchesByMedium(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 1 }), withBookPair).book.id).toBe(
      'book-lowN',
    )
  })
})

/**
 * Regression guard for the "everyone gets Terry Anderson" bug.
 *
 * The ISU roster is real people whose trait estimates are range-restricted
 * (they are all accomplished, so nobody has low Conscientiousness). Matching on
 * raw distance made the single most central figure absorb 37% of realistic test
 * takers. Matching on relative standing within the roster fixes it — these
 * bounds fail loudly if the distribution ever collapses again.
 */
describe('match distribution over a realistic population', () => {
  function simulate() {
    let seed = 20260731
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    const gaussian = () => {
      const u = Math.max(rand(), 1e-9)
      const v = rand()
      return Math.min(100, Math.max(0, 50 + Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * 15))
    }

    const counts: Record<Medium, Record<string, number>> = { book: {}, movie: {}, tv: {}, isu: {} }
    const runs = 4000
    for (let i = 0; i < runs; i++) {
      const vals = {} as Record<DomainKey, number>
      for (const d of DOMAINS) vals[d] = gaussian()
      const m = findMatchesByMedium(makeScores(vals), realCharacters)
      for (const medium of ['book', 'movie', 'tv', 'isu'] as Medium[]) {
        counts[medium][m[medium].id] = (counts[medium][m[medium].id] ?? 0) + 1
      }
    }
    return { counts, runs }
  }

  const { counts, runs } = simulate()

  for (const medium of ['book', 'movie', 'tv', 'isu'] as Medium[]) {
    it(`spreads ${medium} matches across the roster`, () => {
      const rosterSize = realCharacters.filter((c) => c.medium === medium).length
      const tally = Object.values(counts[medium])
      const topShare = Math.max(...tally) / runs

      // No single character may dominate. Even split would be 1/rosterSize;
      // 20% leaves generous headroom while still catching a collapse.
      expect(topShare).toBeLessThan(0.2)
      // And most of the roster should actually be reachable.
      expect(tally.length).toBeGreaterThanOrEqual(Math.ceil(rosterSize * 0.7))
    })
  }
})
