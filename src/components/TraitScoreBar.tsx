import type { DomainResult, TraitInfo, TraitNote } from '../lib/types'

interface TraitScoreBarProps {
  info: TraitInfo
  score: DomainResult
  note: TraitNote
}

function TraitScoreBar({ info, score, note }: TraitScoreBarProps) {
  const noteText = score.result === 'neutral' ? info.description : note[score.result]

  return (
    <div className="trait-bar">
      <div className="trait-bar-header">
        <span className="trait-bar-label">{info.label}</span>
        <span className="trait-bar-result">{score.result}</span>
      </div>
      <div className="trait-bar-track">
        <div className="trait-bar-fill" style={{ width: `${score.normalized}%` }} />
      </div>
      <p className="trait-bar-note">{noteText}</p>
    </div>
  )
}

export default TraitScoreBar
