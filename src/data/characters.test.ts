import { describe, it, expect } from 'vitest'
import characters from './characters'

describe('characters data', () => {
  it('has at least 20 characters', () => {
    expect(characters.length).toBeGreaterThanOrEqual(20)
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
