import { useState } from 'react'
import type { Matches, Medium } from '../lib/types'
import DustJacketCard from './DustJacketCard'
import MediumIcon from './icons/MediumIcon'

const TABS: { medium: Medium; label: string }[] = [
  { medium: 'book', label: 'Book' },
  { medium: 'movie', label: 'Movie' },
  { medium: 'tv', label: 'TV' },
  { medium: 'isu', label: 'ISU' },
]

interface MatchSwitcherProps {
  matches: Matches
}

function MatchSwitcher({ matches }: MatchSwitcherProps) {
  const [active, setActive] = useState<Medium>('book')

  return (
    <div className="match-switcher">
      <div className="match-tabs" role="tablist">
        {TABS.map(({ medium, label }) => (
          <button
            key={medium}
            type="button"
            role="tab"
            aria-selected={active === medium}
            className={`match-tab${active === medium ? ' match-tab-active' : ''}`}
            onMouseEnter={() => setActive(medium)}
            onFocus={() => setActive(medium)}
            onClick={() => setActive(medium)}
          >
            <MediumIcon medium={medium} className="match-tab-icon" />
            {label}
          </button>
        ))}
      </div>
      <DustJacketCard character={matches[active]} />
    </div>
  )
}

export default MatchSwitcher
