import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResultsScreen from './ResultsScreen'
import type { CharacterEntry, DomainKey, Scores, TraitInfo, TraitNote } from '../lib/types'

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

const character: CharacterEntry = {
  id: 'test',
  name: 'Test Character',
  source: 'Test Source',
  blurb: 'Blurb text',
  profile: { O: 50, C: 50, E: 50, A: 50, N: 50 },
}

describe('ResultsScreen', () => {
  it('renders the character card and all five trait bars', () => {
    render(
      <ResultsScreen scores={scores} character={character} traitInfos={traitInfos} traitNotes={traitNotes} />,
    )

    expect(screen.getByText('Test Character')).toBeInTheDocument()
    for (const domain of domains) {
      expect(screen.getByText(labels[domain])).toBeInTheDocument()
    }
  })
})
