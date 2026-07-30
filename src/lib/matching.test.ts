import { describe, it, expect } from 'vitest'
import { findClosestCharacter, findMatchesByMedium } from './matching'
import type { CharacterEntry, DomainKey, Medium, Scores } from './types'

function makeScores(normalized: Record<DomainKey, number>): Scores {
  const domains: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
  const scores = {} as Scores
  for (const d of domains) {
    scores[d] = { average: 0, normalized: normalized[d], result: 'neutral' }
  }
  return scores
}

const roster: CharacterEntry[] = [
  { id: 'a', name: 'A', source: 'Test', medium: 'book', blurb: '', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
  { id: 'b', name: 'B', source: 'Test', medium: 'book', blurb: '', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
  { id: 'c', name: 'C', source: 'Test', medium: 'book', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
]

describe('findClosestCharacter', () => {
  it('returns the character with the smallest distance', () => {
    const scores = makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 })
    expect(findClosestCharacter(scores, roster).id).toBe('b')
  })

  it('picks the first roster entry on an exact tie', () => {
    const tiedRoster: CharacterEntry[] = [
      { id: 'first', name: 'First', source: 'Test', medium: 'book', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
      { id: 'second', name: 'Second', source: 'Test', medium: 'book', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
    ]
    const scores = makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 })
    expect(findClosestCharacter(scores, tiedRoster).id).toBe('first')
  })

  it('throws on an empty roster', () => {
    expect(() => findClosestCharacter(makeScores({ O: 0, C: 0, E: 0, A: 0, N: 0 }), [])).toThrow()
  })
})

describe('findMatchesByMedium', () => {
  const mixedRoster: CharacterEntry[] = [
    { id: 'book-a', name: 'Book A', source: 'Test', blurb: '', medium: 'book', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'book-b', name: 'Book B', source: 'Test', blurb: '', medium: 'book', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
    { id: 'movie-a', name: 'Movie A', source: 'Test', blurb: '', medium: 'movie', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'movie-b', name: 'Movie B', source: 'Test', blurb: '', medium: 'movie', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
    { id: 'tv-a', name: 'TV A', source: 'Test', blurb: '', medium: 'tv', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'tv-b', name: 'TV B', source: 'Test', blurb: '', medium: 'tv', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
    { id: 'isu-a', name: 'ISU A', source: 'Test', blurb: '', medium: 'isu', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'isu-b', name: 'ISU B', source: 'Test', blurb: '', medium: 'isu', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
  ]

  it('finds the nearest match independently within each medium', () => {
    const scores = makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 })
    const matches = findMatchesByMedium(scores, mixedRoster)

    expect(matches.book.id).toBe('book-b')
    expect(matches.movie.id).toBe('movie-b')
    expect(matches.tv.id).toBe('tv-b')
    expect(matches.isu.id).toBe('isu-b')
  })

  it('does not let one medium leak into another', () => {
    const scores = makeScores({ O: 12, C: 12, E: 12, A: 12, N: 12 })
    const matches = findMatchesByMedium(scores, mixedRoster)

    const mediums: Medium[] = ['book', 'movie', 'tv', 'isu']
    for (const medium of mediums) {
      expect(matches[medium].medium).toBe(medium)
    }
  })
})
