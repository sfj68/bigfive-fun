import { describe, it, expect } from 'vitest'
import { calculateResult, scoreAnswers, scoreFacets } from './scoring'
import type { Answer } from './types'

describe('calculateResult', () => {
  it('returns "high" above 3.5', () => {
    expect(calculateResult(3.51)).toBe('high')
    expect(calculateResult(5)).toBe('high')
  })

  it('returns "low" below 2.5', () => {
    expect(calculateResult(2.49)).toBe('low')
    expect(calculateResult(1)).toBe('low')
  })

  it('returns "neutral" at the boundaries and in between', () => {
    expect(calculateResult(3.5)).toBe('neutral')
    expect(calculateResult(2.5)).toBe('neutral')
    expect(calculateResult(3)).toBe('neutral')
  })
})

function makeAnswers(domain: Answer['domain'], scores: number[]): Answer[] {
  return scores.map((score) => ({ domain, score }))
}

describe('scoreAnswers', () => {
  it('averages scores per domain and classifies the result', () => {
    const answers: Answer[] = [
      ...makeAnswers('O', [5, 5, 5, 5]),
      ...makeAnswers('C', [1, 1, 1, 1]),
      ...makeAnswers('E', [3, 3, 3, 3]),
      ...makeAnswers('A', [4, 4, 4, 4]),
      ...makeAnswers('N', [2, 2, 2, 2]),
    ]

    const scores = scoreAnswers(answers)

    expect(scores.O).toEqual({ average: 5, normalized: 100, result: 'high' })
    expect(scores.C).toEqual({ average: 1, normalized: 0, result: 'low' })
    expect(scores.E).toEqual({ average: 3, normalized: 50, result: 'neutral' })
    expect(scores.A.result).toBe('high')
    expect(scores.N.result).toBe('low')
  })

  it('returns all five domains even if a domain has no answers', () => {
    const scores = scoreAnswers(makeAnswers('O', [5]))
    expect(Object.keys(scores).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
    expect(scores.C.average).toBe(0)
  })
})

describe('scoreFacets', () => {
  it('averages scores per domain-facet pair and classifies the result', () => {
    const answers: Answer[] = [
      { domain: 'O', facet: 1, score: 5 },
      { domain: 'O', facet: 1, score: 5 },
      { domain: 'O', facet: 2, score: 1 },
      { domain: 'C', facet: 1, score: 3 },
      { domain: 'C', facet: 1, score: 3 },
    ]

    const scores = scoreFacets(answers)

    expect(scores.O1).toEqual({ average: 5, normalized: 100, result: 'high' })
    expect(scores.O2).toEqual({ average: 1, normalized: 0, result: 'low' })
    expect(scores.C1).toEqual({ average: 3, normalized: 50, result: 'neutral' })
  })

  it('ignores answers with no facet', () => {
    const answers: Answer[] = [{ domain: 'O', score: 5 }]
    expect(scoreFacets(answers)).toEqual({})
  })

  it('only returns keys for facets that actually appeared in the answers', () => {
    const answers: Answer[] = [{ domain: 'N', facet: 6, score: 4 }]
    expect(Object.keys(scoreFacets(answers))).toEqual(['N6'])
  })
})
