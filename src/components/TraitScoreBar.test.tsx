import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TraitScoreBar from './TraitScoreBar'
import type { DomainResult, FacetInfo, FacetScores, TraitInfo, TraitNote } from '../lib/types'

const info: TraitInfo = { domain: 'O', label: 'Openness', description: 'Neutral description text' }
const note: TraitNote = { domain: 'O', high: 'High note text', low: 'Low note text' }
const facetInfos: FacetInfo[] = [
  { domain: 'O', facet: 1, title: 'Imagination', text: 'Imagination text' },
  { domain: 'C', facet: 1, title: 'Self-Efficacy', text: 'Self-Efficacy text' },
]
const facetScores: FacetScores = {
  O1: { average: 5, normalized: 100, result: 'high' },
  C1: { average: 5, normalized: 100, result: 'high' },
}

describe('TraitScoreBar', () => {
  it('shows the high note when the result is high', () => {
    const score: DomainResult = { average: 4.5, normalized: 87.5, result: 'high' }
    render(<TraitScoreBar info={info} score={score} note={note} facetInfos={facetInfos} facetScores={facetScores} />)
    expect(screen.getByText('Openness')).toBeInTheDocument()
    expect(screen.getByText('High note text')).toBeInTheDocument()
  })

  it('falls back to the neutral description when the result is neutral', () => {
    const score: DomainResult = { average: 3, normalized: 50, result: 'neutral' }
    render(<TraitScoreBar info={info} score={score} note={note} facetInfos={facetInfos} facetScores={facetScores} />)
    expect(screen.getByText('Neutral description text')).toBeInTheDocument()
  })

  it('reveals only this domain\'s facets after clicking the toggle', () => {
    const score: DomainResult = { average: 3, normalized: 50, result: 'neutral' }
    render(<TraitScoreBar info={info} score={score} note={note} facetInfos={facetInfos} facetScores={facetScores} />)

    expect(screen.queryByText('Imagination')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /show the six sub-traits/i }))

    expect(screen.getByText('Imagination')).toBeInTheDocument()
    expect(screen.queryByText('Self-Efficacy')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /hide the six sub-traits/i }))
    expect(screen.queryByText('Imagination')).not.toBeInTheDocument()
  })
})
