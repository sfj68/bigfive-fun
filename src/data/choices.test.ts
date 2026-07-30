import { describe, it, expect } from 'vitest'
import choices from './choices'

describe('choices data', () => {
  it('has 5 choices for plus and minus', () => {
    expect(choices.plus).toHaveLength(5)
    expect(choices.minus).toHaveLength(5)
  })

  it('plus scores run 1 to 5 in order', () => {
    expect(choices.plus.map((c) => c.score)).toEqual([1, 2, 3, 4, 5])
  })

  it('minus scores are the reverse of plus', () => {
    expect(choices.minus.map((c) => c.score)).toEqual([5, 4, 3, 2, 1])
  })
})
