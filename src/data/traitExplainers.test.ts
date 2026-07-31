import { describe, it, expect } from 'vitest'
import traitExplainers from './traitExplainers'

describe('traitExplainers data', () => {
  it('has exactly one entry per domain', () => {
    expect(traitExplainers.map((t) => t.domain).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
  })

  it('gives every domain a label, description, and high/low summary', () => {
    for (const explainer of traitExplainers) {
      expect(explainer.label.trim().length).toBeGreaterThan(0)
      expect(explainer.description.trim().length).toBeGreaterThan(0)
      expect(explainer.highSummary.trim().length).toBeGreaterThan(0)
      expect(explainer.lowSummary.trim().length).toBeGreaterThan(0)
    }
  })

  it('writes fuller descriptions than the compact trait info used on the results screen', () => {
    for (const explainer of traitExplainers) {
      expect(explainer.description.length).toBeGreaterThan(100)
    }
  })
})
