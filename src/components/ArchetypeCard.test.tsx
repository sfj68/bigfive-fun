import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ArchetypeCard from './ArchetypeCard'
import type { ArchetypeResult, TraitInfo } from '../lib/types'

const traitInfos: TraitInfo[] = [
  { domain: 'O', label: 'Openness', description: 'Openness description' },
  { domain: 'N', label: 'Neuroticism', description: 'Neuroticism description' },
]

const archetype: ArchetypeResult = {
  title: 'The Cartographer',
  tagline: 'Tagline text',
  description: 'Description text',
  wingPhrase: 'with a live wire underneath',
  wingTitle: 'The Sentinel',
  leadDomain: 'O',
  leadDirection: 'high',
  wingDomain: 'N',
  code: 'O+ C= E- A+ N-',
}

describe('ArchetypeCard', () => {
  it('renders the title, wing phrase, tagline, and description', () => {
    render(<ArchetypeCard archetype={archetype} traitInfos={traitInfos} />)

    expect(screen.getByText('The Cartographer')).toBeInTheDocument()
    expect(screen.getByText('with a live wire underneath')).toBeInTheDocument()
    expect(screen.getByText('Tagline text')).toBeInTheDocument()
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('shows the illustration for the leading trait and direction', () => {
    const { container } = render(<ArchetypeCard archetype={archetype} traitInfos={traitInfos} />)
    expect(container.querySelector('svg')?.getAttribute('data-archetype')).toBe('O-high')
  })

  it('shows the OCEAN code and which traits drove the type', () => {
    render(<ArchetypeCard archetype={archetype} traitInfos={traitInfos} />)

    expect(screen.getByText('O+ C= E- A+ N-')).toBeInTheDocument()
    expect(screen.getByText('Led by Openness, wing Neuroticism')).toBeInTheDocument()
  })
})
