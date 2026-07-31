import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FacetBreakdown from './FacetBreakdown'
import type { FacetInfo, FacetScores } from '../lib/types'

const facetInfos: FacetInfo[] = [
  { domain: 'O', facet: 1, title: 'Imagination', text: 'Imagination text' },
  { domain: 'O', facet: 2, title: 'Artistic Interests', text: 'Artistic Interests text' },
  { domain: 'C', facet: 1, title: 'Self-Efficacy', text: 'Self-Efficacy text' },
]

const facetScores: FacetScores = {
  O1: { average: 5, normalized: 100, result: 'high' },
  O2: { average: 1, normalized: 0, result: 'low' },
  C1: { average: 3, normalized: 50, result: 'neutral' },
}

describe('FacetBreakdown', () => {
  it('renders only the facets belonging to the given domain, in facet order', () => {
    render(<FacetBreakdown domain="O" facetInfos={facetInfos} facetScores={facetScores} />)

    expect(screen.getByText('Imagination')).toBeInTheDocument()
    expect(screen.getByText('Artistic Interests')).toBeInTheDocument()
    expect(screen.queryByText('Self-Efficacy')).not.toBeInTheDocument()
  })

  it('shows each facet result and description text', () => {
    render(<FacetBreakdown domain="O" facetInfos={facetInfos} facetScores={facetScores} />)

    expect(screen.getByText('high')).toBeInTheDocument()
    expect(screen.getByText('low')).toBeInTheDocument()
    expect(screen.getByText('Imagination text')).toBeInTheDocument()
  })

  it('skips a facet if no score exists for it', () => {
    const partialScores: FacetScores = { O1: facetScores.O1 }
    render(<FacetBreakdown domain="O" facetInfos={facetInfos} facetScores={partialScores} />)

    expect(screen.getByText('Imagination')).toBeInTheDocument()
    expect(screen.queryByText('Artistic Interests')).not.toBeInTheDocument()
  })
})
