import type { Direction, DomainKey } from '../../lib/types'

interface ArchetypeIllustrationProps {
  domain: DomainKey
  direction: Direction
  className?: string
}

const SHARED_PROPS = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

// The Cartographer — a folded map with a plotted route
function CartographerGlyph() {
  return (
    <>
      <path d="M5 13 L18 8 L30 13 L43 8 L43 35 L30 40 L18 35 L5 40 Z" />
      <line x1="18" y1="8" x2="18" y2="35" />
      <line x1="30" y1="13" x2="30" y2="40" />
      <path d="M11 32 C15 25, 23 30, 25 20" strokeDasharray="3 3" />
      <circle cx="25.5" cy="18.5" r="2.5" fill="currentColor" stroke="none" />
    </>
  )
}

// The Homesteader — a house on settled ground
function HomesteaderGlyph() {
  return (
    <>
      <path d="M7 24 L24 10 L41 24" />
      <path d="M12 21 L12 39 L36 39 L36 21" />
      <rect x="21" y="29" width="6" height="10" />
      <rect x="15" y="26" width="5" height="5" />
      <rect x="28" y="26" width="5" height="5" />
      <line x1="5" y1="39" x2="43" y2="39" />
    </>
  )
}

// The Architect — a floor plan
function ArchitectGlyph() {
  return (
    <>
      <rect x="8" y="10" width="32" height="28" rx="1.5" />
      <line x1="8" y1="19" x2="40" y2="19" />
      <line x1="21" y1="19" x2="21" y2="38" />
      <line x1="30" y1="27" x2="40" y2="27" />
      <path d="M21 38 A7 7 0 0 0 28 31" strokeDasharray="2.5 2.5" />
    </>
  )
}

// The Improviser — a paper plane, mid-improvisation
function ImproviserGlyph() {
  return (
    <>
      <path d="M41 8 L11 21 L22 26 L26 38 Z" />
      <path d="M41 8 L22 26" />
      <path d="M6 39 C10 33, 15 37, 17 31" strokeDasharray="3 3" />
    </>
  )
}

// The Ringleader — the big top
function RingleaderGlyph() {
  return (
    <>
      <path d="M24 10 L7 34 L41 34 Z" />
      <path d="M24 10 L18 34" />
      <path d="M24 10 L30 34" />
      <path d="M20 34 L20 26 Q24 22 28 26 L28 34" />
      <path d="M24 10 L24 5 L30 6.5 L24 8" />
      <line x1="4" y1="34" x2="44" y2="34" />
    </>
  )
}

// The Lighthouse Keeper — a light kept on for other people
function LighthouseKeeperGlyph() {
  return (
    <>
      <path d="M18 12 L24 7 L30 12" />
      <rect x="19" y="12" width="10" height="7" />
      <line x1="16.5" y1="19.5" x2="31.5" y2="19.5" />
      <path d="M20.5 19.5 L18 39 L30 39 L27.5 19.5" />
      <line x1="18.6" y1="30" x2="29.4" y2="30" />
      <path d="M15 14 L10 12" />
      <path d="M15 17.5 L10 19.5" />
      <path d="M33 14 L38 12" />
      <path d="M33 17.5 L38 19.5" />
      <line x1="13" y1="39" x2="35" y2="39" />
    </>
  )
}

// The Confidant — something said, and something said back
function ConfidantGlyph() {
  return (
    <>
      <rect x="4" y="8" width="26" height="17" rx="4" />
      <path d="M12 25 L11 32 L19 25" />
      <rect x="23" y="26" width="21" height="14" rx="4" />
      <path d="M37 40 L38 45 L32 40" />
    </>
  )
}

// The Straight Shooter — dead center, no detour
function StraightShooterGlyph() {
  return (
    <>
      <circle cx="27" cy="21" r="14" />
      <circle cx="27" cy="21" r="7.5" />
      <circle cx="27" cy="21" r="2.5" fill="currentColor" stroke="none" />
      <path d="M6 42 L27 21" />
      <path d="M6 42 L6 35" />
      <path d="M6 42 L13 42" />
    </>
  )
}

// The Sentinel — picking up the signal early
function SentinelGlyph() {
  return (
    <>
      <circle cx="10" cy="38" r="2.5" fill="currentColor" stroke="none" />
      <path d="M10 28 A10 10 0 0 1 20 38" />
      <path d="M10 20 A18 18 0 0 1 28 38" />
      <path d="M10 12 A26 26 0 0 1 36 38" />
      <circle cx="31" cy="17" r="2.5" fill="currentColor" stroke="none" />
    </>
  )
}

// The Anchor — holds while everything else moves
function AnchorGlyph() {
  return (
    <>
      <circle cx="24" cy="9" r="4" />
      <line x1="24" y1="13" x2="24" y2="40" />
      <line x1="15" y1="19" x2="33" y2="19" />
      <path d="M10 28 C10 37, 17 41, 24 40" />
      <path d="M38 28 C38 37, 31 41, 24 40" />
    </>
  )
}

const GLYPHS: Record<string, () => JSX.Element> = {
  'O-high': CartographerGlyph,
  'O-low': HomesteaderGlyph,
  'C-high': ArchitectGlyph,
  'C-low': ImproviserGlyph,
  'E-high': RingleaderGlyph,
  'E-low': LighthouseKeeperGlyph,
  'A-high': ConfidantGlyph,
  'A-low': StraightShooterGlyph,
  'N-high': SentinelGlyph,
  'N-low': AnchorGlyph,
}

function ArchetypeIllustration({ domain, direction, className }: ArchetypeIllustrationProps) {
  const key = `${domain}-${direction}`
  const Glyph = GLYPHS[key]
  if (!Glyph) {
    throw new Error(`No archetype illustration for ${key}`)
  }
  return (
    <svg {...SHARED_PROPS} className={className} data-archetype={key} aria-hidden="true">
      <Glyph />
    </svg>
  )
}

export default ArchetypeIllustration
