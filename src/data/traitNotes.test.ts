import { describe, it, expect } from 'vitest'
import traitNotes from './traitNotes'

describe('traitNotes data', () => {
  it('has exactly one entry per domain', () => {
    expect(traitNotes.map((t) => t.domain).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
  })

  it('gives every domain a non-empty high and low note', () => {
    for (const note of traitNotes) {
      expect(note.high.trim().length).toBeGreaterThan(0)
      expect(note.low.trim().length).toBeGreaterThan(0)
    }
  })
})
