import { describe, it, expect } from 'vitest'
import archetypes from './archetypes'

describe('archetypes data', () => {
  it('has one entry for every domain and direction pair', () => {
    expect(archetypes).toHaveLength(10)
    const keys = archetypes.map((a) => `${a.domain}-${a.direction}`).sort()
    expect(keys).toEqual([
      'A-high',
      'A-low',
      'C-high',
      'C-low',
      'E-high',
      'E-low',
      'N-high',
      'N-low',
      'O-high',
      'O-low',
    ])
  })

  it('gives every archetype a unique title', () => {
    const titles = archetypes.map((a) => a.title)
    expect(new Set(titles).size).toBe(10)
  })

  it('gives every archetype a tagline, description, and wing phrase', () => {
    for (const entry of archetypes) {
      expect(entry.title.trim().length).toBeGreaterThan(0)
      expect(entry.tagline.trim().length).toBeGreaterThan(0)
      expect(entry.description.trim().length).toBeGreaterThan(0)
      expect(entry.wingPhrase.trim().length).toBeGreaterThan(0)
    }
  })
})
