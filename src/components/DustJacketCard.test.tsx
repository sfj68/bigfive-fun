import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DustJacketCard from './DustJacketCard'
import type { CharacterEntry } from '../lib/types'

const character: CharacterEntry = {
  id: 'test-character',
  name: 'Test Character',
  source: 'Test Source',
  medium: 'book',
  blurb: 'An original blurb about the test character.',
  profile: { O: 50, C: 50, E: 50, A: 50, N: 50 },
}

describe('DustJacketCard', () => {
  it('renders the character name, source, and blurb', () => {
    render(<DustJacketCard character={character} />)
    expect(screen.getByText('Test Character')).toBeInTheDocument()
    expect(screen.getByText('Test Source')).toBeInTheDocument()
    expect(screen.getByText('An original blurb about the test character.')).toBeInTheDocument()
  })
})
