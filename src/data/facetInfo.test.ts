import { describe, it, expect } from 'vitest'
import facetInfo from './facetInfo'

describe('facetInfo data', () => {
  it('has exactly 30 entries', () => {
    expect(facetInfo).toHaveLength(30)
  })

  it('has exactly 6 facets per domain', () => {
    const counts: Record<string, number> = {}
    for (const f of facetInfo) {
      counts[f.domain] = (counts[f.domain] ?? 0) + 1
    }
    expect(counts).toEqual({ O: 6, C: 6, E: 6, A: 6, N: 6 })
  })

  it('has unique domain-facet combinations numbered 1 through 6', () => {
    const keys = facetInfo.map((f) => `${f.domain}${f.facet}`)
    expect(new Set(keys).size).toBe(30)
    const domains = ['O', 'C', 'E', 'A', 'N'] as const
    for (const domain of domains) {
      const facetsForDomain = facetInfo
        .filter((f) => f.domain === domain)
        .map((f) => f.facet)
        .sort((a, b) => a - b)
      expect(facetsForDomain).toEqual([1, 2, 3, 4, 5, 6])
    }
  })

  it('gives every facet a non-empty title and text', () => {
    for (const f of facetInfo) {
      expect(f.title.trim().length).toBeGreaterThan(0)
      expect(f.text.trim().length).toBeGreaterThan(0)
    }
  })
})
