import { describe, it, expect } from 'vitest'
import { findClosestCharacter } from './matching'
import type { CharacterEntry, DomainKey, Scores } from './types'

function makeScores(normalized: Record<DomainKey, number>): Scores {
  const domains: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
  const scores = {} as Scores
  for (const d of domains) {
    scores[d] = { average: 0, normalized: normalized[d], result: 'neutral' }
  }
  return scores
}

const roster: CharacterEntry[] = [
  { id: 'a', name: 'A', source: 'Test', blurb: '', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
  { id: 'b', name: 'B', source: 'Test', blurb: '', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
  { id: 'c', name: 'C', source: 'Test', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
]

describe('findClosestCharacter', () => {
  it('returns the character with the smallest distance', () => {
    const scores = makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 })
    expect(findClosestCharacter(scores, roster).id).toBe('b')
  })

  it('picks the first roster entry on an exact tie', () => {
    const tiedRoster: CharacterEntry[] = [
      { id: 'first', name: 'First', source: 'Test', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
      { id: 'second', name: 'Second', source: 'Test', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
    ]
    const scores = makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 })
    expect(findClosestCharacter(scores, tiedRoster).id).toBe('first')
  })

  it('throws on an empty roster', () => {
    expect(() => findClosestCharacter(makeScores({ O: 0, C: 0, E: 0, A: 0, N: 0 }), [])).toThrow()
  })
})
