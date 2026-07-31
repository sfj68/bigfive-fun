import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import ThemeToggle from './ThemeToggle'

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('ThemeToggle', () => {
  it('defaults to light mode and sets data-theme on the document', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('switches to dark mode when clicked, and back to light on a second click', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    fireEvent.click(screen.getByRole('button', { name: /light mode/i }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('persists the choice to localStorage and restores it on remount', () => {
    const { unmount } = render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    expect(window.localStorage.getItem('bigfive-fun-theme')).toBe('dark')
    unmount()

    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
  })
})
