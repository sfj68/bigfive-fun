import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IntroScreen from './IntroScreen'
import type { TraitExplainer } from '../lib/types'

const traitExplainers: TraitExplainer[] = [
  { domain: 'O', label: 'Openness', description: 'Openness description', highSummary: 'Openness high', lowSummary: 'Openness low' },
  { domain: 'C', label: 'Conscientiousness', description: 'Conscientiousness description', highSummary: 'Conscientiousness high', lowSummary: 'Conscientiousness low' },
  { domain: 'E', label: 'Extraversion', description: 'Extraversion description', highSummary: 'Extraversion high', lowSummary: 'Extraversion low' },
  { domain: 'A', label: 'Agreeableness', description: 'Agreeableness description', highSummary: 'Agreeableness high', lowSummary: 'Agreeableness low' },
  { domain: 'N', label: 'Neuroticism', description: 'Neuroticism description', highSummary: 'Neuroticism high', lowSummary: 'Neuroticism low' },
]

describe('IntroScreen', () => {
  it('shows the question count and calls onStart when clicked', () => {
    const onStart = vi.fn()
    render(<IntroScreen questionCount={120} traitExplainers={traitExplainers} onStart={onStart} />)

    expect(screen.getByText(/120 short statements/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /start the test/i }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('shows a detailed explanation of all five trait categories, including what higher and lower scores mean', () => {
    render(<IntroScreen questionCount={120} traitExplainers={traitExplainers} onStart={vi.fn()} />)

    for (const explainer of traitExplainers) {
      expect(screen.getByText(explainer.label)).toBeInTheDocument()
      expect(screen.getByText(explainer.description)).toBeInTheDocument()
      expect(screen.getByText(explainer.highSummary)).toBeInTheDocument()
      expect(screen.getByText(explainer.lowSummary)).toBeInTheDocument()
    }
  })
})
