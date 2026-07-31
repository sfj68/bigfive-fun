import { describe, it, expect } from 'vitest'
import { buildCode, findArchetype } from './archetype'
import archetypes from '../data/archetypes'
import type { DomainKey, Scores } from './types'

const DOMAINS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

function makeScores(normalized: Record<DomainKey, number>): Scores {
  const scores = {} as Scores
  for (const domain of DOMAINS) {
    const value = normalized[domain]
    const average = (value / 100) * 4 + 1
    scores[domain] = {
      average,
      normalized: value,
      result: average > 3.5 ? 'high' : average < 2.5 ? 'low' : 'neutral',
    }
  }
  return scores
}

describe('buildCode', () => {
  it('renders one signed letter per domain in OCEAN order', () => {
    const scores = makeScores({ O: 100, C: 50, E: 0, A: 100, N: 0 })
    expect(buildCode(scores)).toBe('O+ C= E- A+ N-')
  })
})

describe('findArchetype', () => {
  it('leads with the trait furthest from the midpoint', () => {
    const scores = makeScores({ O: 55, C: 95, E: 52, A: 48, N: 45 })
    const result = findArchetype(scores, archetypes)
    expect(result.leadDomain).toBe('C')
    expect(result.title).toBe('The Architect')
  })

  it('picks the direction from which side of the midpoint the trait falls on', () => {
    const high = findArchetype(makeScores({ O: 95, C: 50, E: 50, A: 50, N: 50 }), archetypes)
    expect(high.title).toBe('The Cartographer')

    const low = findArchetype(makeScores({ O: 5, C: 50, E: 50, A: 50, N: 50 }), archetypes)
    expect(low.title).toBe('The Homesteader')
  })

  it('uses the second most distinctive trait as the wing', () => {
    const scores = makeScores({ O: 50, C: 50, E: 90, A: 50, N: 10 })
    const result = findArchetype(scores, archetypes)
    expect(result.leadDomain).toBe('E')
    expect(result.wingDomain).toBe('N')
    expect(result.wingTitle).toBe('The Anchor')
    expect(result.wingPhrase).toBe('with steady hands')
  })

  it('never picks the same trait for the lead and the wing', () => {
    const scores = makeScores({ O: 100, C: 0, E: 100, A: 0, N: 100 })
    const result = findArchetype(scores, archetypes)
    expect(result.wingDomain).not.toBe(result.leadDomain)
  })

  it('stays deterministic for a perfectly average profile', () => {
    const scores = makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 })
    expect(findArchetype(scores, archetypes).leadDomain).toBe('O')
    expect(findArchetype(scores, archetypes).wingDomain).toBe('C')
  })

  it('throws when there are no archetypes to choose from', () => {
    expect(() => findArchetype(makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 }), [])).toThrow()
  })
})
