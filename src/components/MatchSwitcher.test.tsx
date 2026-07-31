import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MatchSwitcher from './MatchSwitcher'
import type { CharacterEntry, Matches } from '../lib/types'

function makeCharacter(id: string, name: string, medium: CharacterEntry['medium']): CharacterEntry {
  return {
    id,
    name,
    source: 'Test Source',
    medium,
    blurb: `${name} blurb`,
    profile: { O: 50, C: 50, E: 50, A: 50, N: 50 },
  }
}

const matches: Matches = {
  book: makeCharacter('book-char', 'Book Character', 'book'),
  movie: makeCharacter('movie-char', 'Movie Character', 'movie'),
  tv: makeCharacter('tv-char', 'TV Character', 'tv'),
  isu: makeCharacter('isu-char', 'ISU Figure', 'isu'),
}

describe('MatchSwitcher', () => {
  it('shows the book match by default', () => {
    render(<MatchSwitcher matches={matches} />)
    expect(screen.getByText('Book Character')).toBeInTheDocument()
    expect(screen.queryByText('Movie Character')).not.toBeInTheDocument()
  })

  it('swaps to the movie match on hover', () => {
    render(<MatchSwitcher matches={matches} />)
    fireEvent.mouseEnter(screen.getByRole('tab', { name: 'Movie' }))
    expect(screen.getByText('Movie Character')).toBeInTheDocument()
    expect(screen.queryByText('Book Character')).not.toBeInTheDocument()
  })

  it('swaps to the tv match on click (touch fallback)', () => {
    render(<MatchSwitcher matches={matches} />)
    fireEvent.click(screen.getByRole('tab', { name: 'TV' }))
    expect(screen.getByText('TV Character')).toBeInTheDocument()
  })

  it('swaps to the isu match on focus (keyboard)', () => {
    render(<MatchSwitcher matches={matches} />)
    fireEvent.focus(screen.getByRole('tab', { name: 'ISU' }))
    expect(screen.getByText('ISU Figure')).toBeInTheDocument()
  })

  it('marks only the active tab as selected', () => {
    render(<MatchSwitcher matches={matches} />)
    fireEvent.click(screen.getByRole('tab', { name: 'TV' }))
    expect(screen.getByRole('tab', { name: 'TV' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Book' })).toHaveAttribute('aria-selected', 'false')
  })
})
