import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TraitScoreBar from './TraitScoreBar'
import type { DomainResult, TraitInfo, TraitNote } from '../lib/types'

const info: TraitInfo = { domain: 'O', label: 'Openness', description: 'Neutral description text' }
const note: TraitNote = { domain: 'O', high: 'High note text', low: 'Low note text' }

describe('TraitScoreBar', () => {
  it('shows the high note when the result is high', () => {
    const score: DomainResult = { average: 4.5, normalized: 87.5, result: 'high' }
    render(<TraitScoreBar info={info} score={score} note={note} />)
    expect(screen.getByText('Openness')).toBeInTheDocument()
    expect(screen.getByText('High note text')).toBeInTheDocument()
  })

  it('falls back to the neutral description when the result is neutral', () => {
    const score: DomainResult = { average: 3, normalized: 50, result: 'neutral' }
    render(<TraitScoreBar info={info} score={score} note={note} />)
    expect(screen.getByText('Neutral description text')).toBeInTheDocument()
  })
})
