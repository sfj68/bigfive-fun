import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResultsScreen from './ResultsScreen'
import type { CharacterEntry, DomainKey, FacetInfo, FacetScores, Matches, Scores, TraitInfo, TraitNote } from '../lib/types'

const domains: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
const labels: Record<DomainKey, string> = {
  O: 'Openness',
  C: 'Conscientiousness',
  E: 'Extraversion',
  A: 'Agreeableness',
  N: 'Neuroticism',
}

const scores: Scores = domains.reduce((acc, d) => {
  acc[d] = { average: 3, normalized: 50, result: 'neutral' }
  return acc
}, {} as Scores)

const traitInfos: TraitInfo[] = domains.map((d) => ({
  domain: d,
  label: labels[d],
  description: `${labels[d]} description`,
}))
const traitNotes: TraitNote[] = domains.map((d) => ({
  domain: d,
  high: `${labels[d]} high`,
  low: `${labels[d]} low`,
}))

function makeCharacter(id: string, name: string, medium: CharacterEntry['medium']): CharacterEntry {
  return { id, name, source: 'Test Source', medium, blurb: 'Blurb text', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } }
}

const matches: Matches = {
  book: makeCharacter('book-char', 'Book Character', 'book'),
  movie: makeCharacter('movie-char', 'Movie Character', 'movie'),
  tv: makeCharacter('tv-char', 'TV Character', 'tv'),
  isu: makeCharacter('isu-char', 'ISU Figure', 'isu'),
}

const facetInfos: FacetInfo[] = [{ domain: 'O', facet: 1, title: 'Imagination', text: 'Imagination text' }]
const facetScores: FacetScores = { O1: { average: 5, normalized: 100, result: 'high' } }

describe('ResultsScreen', () => {
  it('renders the match switcher tabs, the default match, and all five trait bars', () => {
    render(
      <ResultsScreen
        scores={scores}
        matches={matches}
        traitInfos={traitInfos}
        traitNotes={traitNotes}
        facetInfos={facetInfos}
        facetScores={facetScores}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Book' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Movie' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'TV' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'ISU' })).toBeInTheDocument()
    expect(screen.getByText('Book Character')).toBeInTheDocument()

    for (const domain of domains) {
      expect(screen.getByText(labels[domain])).toBeInTheDocument()
    }
  })

  it('drills down into a domain\'s facets when its toggle is clicked', () => {
    render(
      <ResultsScreen
        scores={scores}
        matches={matches}
        traitInfos={traitInfos}
        traitNotes={traitNotes}
        facetInfos={facetInfos}
        facetScores={facetScores}
      />,
    )

    const toggles = screen.getAllByRole('button', { name: /show the six sub-traits/i })
    fireEvent.click(toggles[0])
    expect(screen.getByText('Imagination')).toBeInTheDocument()
  })
})
