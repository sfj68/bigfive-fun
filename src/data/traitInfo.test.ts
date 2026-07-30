import { describe, it, expect } from 'vitest'
import traitInfo from './traitInfo'

describe('traitInfo data', () => {
  it('has exactly one entry per domain', () => {
    expect(traitInfo.map((t) => t.domain).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
  })

  it('gives every domain a label and description', () => {
    for (const info of traitInfo) {
      expect(info.label.trim().length).toBeGreaterThan(0)
      expect(info.description.trim().length).toBeGreaterThan(0)
    }
  })
})
