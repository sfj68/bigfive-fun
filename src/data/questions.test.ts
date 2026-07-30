import { describe, it, expect } from 'vitest'
import questions from './questions'

describe('questions data', () => {
  it('has exactly 120 questions', () => {
    expect(questions).toHaveLength(120)
  })

  it('has 24 questions per domain', () => {
    const counts: Record<string, number> = {}
    for (const q of questions) {
      counts[q.domain] = (counts[q.domain] ?? 0) + 1
    }
    expect(counts).toEqual({ O: 24, C: 24, E: 24, A: 24, N: 24 })
  })

  it('has unique ids', () => {
    const ids = new Set(questions.map((q) => q.id))
    expect(ids.size).toBe(120)
  })

  it('only uses plus/minus keying', () => {
    expect(questions.every((q) => q.keyed === 'plus' || q.keyed === 'minus')).toBe(true)
  })
})
