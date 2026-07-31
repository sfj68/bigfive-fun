import type { DomainKey } from '../../lib/types'

interface TraitIconProps {
  domain: DomainKey
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

function OpennessGlyph() {
  return (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6 L14 12 L12 18 L10 12 Z" fill="currentColor" stroke="none" />
    </>
  )
}

function ConscientiousnessGlyph() {
  return (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <rect x="9" y="2" width="6" height="3" rx="1" />
      <path d="M8 11 L10 13 L14 9" />
      <line x1="8" y1="16" x2="16" y2="16" />
    </>
  )
}

function ExtraversionGlyph() {
  return (
    <>
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="4.9" x2="7.8" y2="7.8" />
      <line x1="16.2" y1="16.2" x2="19.1" y2="19.1" />
      <line x1="19.1" y1="4.9" x2="16.2" y2="7.8" />
      <line x1="7.8" y1="16.2" x2="4.9" y2="19.1" />
    </>
  )
}

function AgreeablenessGlyph() {
  return (
    <>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </>
  )
}

function NeuroticismGlyph() {
  return (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M5 12 L8 12 L10 7 L13 17 L15 12 L19 12" />
    </>
  )
}

const GLYPHS: Record<DomainKey, () => JSX.Element> = {
  O: OpennessGlyph,
  C: ConscientiousnessGlyph,
  E: ExtraversionGlyph,
  A: AgreeablenessGlyph,
  N: NeuroticismGlyph,
}

function TraitIcon({ domain, className }: TraitIconProps) {
  const Glyph = GLYPHS[domain]
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <Glyph />
    </svg>
  )
}

export default TraitIcon
