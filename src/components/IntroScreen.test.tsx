import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IntroScreen from './IntroScreen'

describe('IntroScreen', () => {
  it('shows the question count and calls onStart when clicked', () => {
    const onStart = vi.fn()
    render(<IntroScreen questionCount={120} onStart={onStart} />)

    expect(screen.getByText(/120 short statements/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /start the test/i }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })
})
