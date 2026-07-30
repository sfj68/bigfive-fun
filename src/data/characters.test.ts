import { describe, it, expect } from 'vitest'
import characters from './characters'

describe('characters data', () => {
  it('has exactly 75 characters', () => {
    expect(characters).toHaveLength(75)
  })

  it('has 18 book, 18 movie, 18 tv, and 21 isu characters', () => {
    const counts: Record<string, number> = {}
    for (const c of characters) {
      counts[c.medium] = (counts[c.medium] ?? 0) + 1
    }
    expect(counts).toEqual({ book: 18, movie: 18, tv: 18, isu: 21 })
  })

  it('has unique ids', () => {
    const ids = new Set(characters.map((c) => c.id))
    expect(ids.size).toBe(characters.length)
  })

  it('keeps every profile value within 0-100', () => {
    const domains = ['O', 'C', 'E', 'A', 'N'] as const
    for (const character of characters) {
      for (const domain of domains) {
        expect(character.profile[domain]).toBeGreaterThanOrEqual(0)
        expect(character.profile[domain]).toBeLessThanOrEqual(100)
      }
    }
  })

  it('gives every character a non-empty blurb', () => {
    expect(characters.every((c) => c.blurb.trim().length > 0)).toBe(true)
  })
})
