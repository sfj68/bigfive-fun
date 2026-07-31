import { useState } from 'react'
import type { DomainResult, FacetInfo, FacetScores, TraitInfo, TraitNote } from '../lib/types'
import TraitIcon from './icons/TraitIcon'
import FacetBreakdown from './FacetBreakdown'

interface TraitScoreBarProps {
  info: TraitInfo
  score: DomainResult
  note: TraitNote
  facetInfos: FacetInfo[]
  facetScores: FacetScores
}

function TraitScoreBar({ info, score, note, facetInfos, facetScores }: TraitScoreBarProps) {
  const [showFacets, setShowFacets] = useState(false)
  const noteText = score.result === 'neutral' ? info.description : note[score.result]

  return (
    <div className="trait-bar">
      <div className="trait-bar-header">
        <span className="trait-bar-label">
          <TraitIcon domain={info.domain} className="trait-icon" />
          {info.label}
        </span>
        <span className="trait-bar-result">{score.result}</span>
      </div>
      <div className="trait-bar-track">
        <div className="trait-bar-fill" style={{ width: `${score.normalized}%` }} />
      </div>
      <p className="trait-bar-note">{noteText}</p>
      <button type="button" className="facet-toggle" onClick={() => setShowFacets((prev) => !prev)}>
        {showFacets ? 'Hide the six sub-traits' : 'Show the six sub-traits'}
      </button>
      {showFacets && (
        <FacetBreakdown domain={info.domain} facetInfos={facetInfos} facetScores={facetScores} />
      )}
    </div>
  )
}

export default TraitScoreBar
