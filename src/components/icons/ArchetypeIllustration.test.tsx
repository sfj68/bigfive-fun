import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ArchetypeIllustration from './ArchetypeIllustration'
import archetypes from '../../data/archetypes'

describe('ArchetypeIllustration', () => {
  it('renders a distinct illustration for every archetype in the roster', () => {
    const seen = new Set<string>()

    for (const entry of archetypes) {
      const { container, unmount } = render(
        <ArchetypeIllustration domain={entry.domain} direction={entry.direction} />,
      )
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()

      const key = svg?.getAttribute('data-archetype')
      expect(key).toBe(`${entry.domain}-${entry.direction}`)

      // Every glyph should be its own drawing, not a shared placeholder.
      const markup = svg?.innerHTML ?? ''
      expect(markup.length).toBeGreaterThan(0)
      expect(seen.has(markup)).toBe(false)
      seen.add(markup)

      unmount()
    }

    expect(seen.size).toBe(10)
  })

  it('is hidden from screen readers, since the type name is already text', () => {
    const { container } = render(<ArchetypeIllustration domain="O" direction="high" />)
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })
})
