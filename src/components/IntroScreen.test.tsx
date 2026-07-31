import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IntroScreen from './IntroScreen'
import type { TraitInfo } from '../lib/types'

const traitInfos: TraitInfo[] = [
  { domain: 'O', label: 'Openness', description: 'Openness description' },
  { domain: 'C', label: 'Conscientiousness', description: 'Conscientiousness description' },
  { domain: 'E', label: 'Extraversion', description: 'Extraversion description' },
  { domain: 'A', label: 'Agreeableness', description: 'Agreeableness description' },
  { domain: 'N', label: 'Neuroticism', description: 'Neuroticism description' },
]

describe('IntroScreen', () => {
  it('shows the question count and calls onStart when clicked', () => {
    const onStart = vi.fn()
    render(<IntroScreen questionCount={120} traitInfos={traitInfos} onStart={onStart} />)

    expect(screen.getByText(/120 short statements/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /start the test/i }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('shows a breakdown of all five trait categories', () => {
    render(<IntroScreen questionCount={120} traitInfos={traitInfos} onStart={vi.fn()} />)

    for (const info of traitInfos) {
      expect(screen.getByText(info.label)).toBeInTheDocument()
      expect(screen.getByText(info.description)).toBeInTheDocument()
    }
  })
})
