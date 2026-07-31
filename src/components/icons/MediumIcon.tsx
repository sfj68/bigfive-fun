import type { Medium } from '../../lib/types'

interface MediumIconProps {
  medium: Medium
  className?: string
}

const SHARED_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function BookGlyph() {
  return (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="7.5" y1="8" x2="10" y2="8" />
      <line x1="14" y1="8" x2="16.5" y2="8" />
      <line x1="7.5" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="16.5" y2="12" />
    </>
  )
}

function MovieGlyph() {
  return (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="10" r="1.4" fill="currentColor" stroke="none" />
    </>
  )
}

function TvGlyph() {
  return (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <line x1="12" y1="17" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </>
  )
}

function IsuGlyph() {
  return (
    <>
      <path d="M4 10 L12 4 L20 10" />
      <line x1="3" y1="20" x2="21" y2="20" />
      <line x1="6" y1="10" x2="6" y2="19" />
      <line x1="10" y1="10" x2="10" y2="19" />
      <line x1="14" y1="10" x2="14" y2="19" />
      <line x1="18" y1="10" x2="18" y2="19" />
    </>
  )
}

const GLYPHS: Record<Medium, () => JSX.Element> = {
  book: BookGlyph,
  movie: MovieGlyph,
  tv: TvGlyph,
  isu: IsuGlyph,
}

function MediumIcon({ medium, className }: MediumIconProps) {
  const Glyph = GLYPHS[medium]
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <Glyph />
    </svg>
  )
}

export default MediumIcon
