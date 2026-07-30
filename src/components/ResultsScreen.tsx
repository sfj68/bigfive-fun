import type { DomainKey, Matches, Medium, Scores, TraitInfo, TraitNote } from '../lib/types'
import TraitScoreBar from './TraitScoreBar'
import DustJacketCard from './DustJacketCard'

const DOMAIN_ORDER: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

const MEDIUM_SECTIONS: { medium: Medium; label: string }[] = [
  { medium: 'book', label: 'Book Match' },
  { medium: 'movie', label: 'Movie Match' },
  { medium: 'tv', label: 'TV Match' },
  { medium: 'isu', label: 'ISU Connection' },
]

interface ResultsScreenProps {
  scores: Scores
  matches: Matches
  traitInfos: TraitInfo[]
  traitNotes: TraitNote[]
}

function ResultsScreen({ scores, matches, traitInfos, traitNotes }: ResultsScreenProps) {
  return (
    <div className="results">
      <div className="matches">
        {MEDIUM_SECTIONS.map(({ medium, label }) => (
          <div className="match-section" key={medium}>
            <p className="match-label">{label}</p>
            <DustJacketCard character={matches[medium]} />
          </div>
        ))}
      </div>
      <div className="trait-bars">
        {DOMAIN_ORDER.map((domain) => {
          const info = traitInfos.find((t) => t.domain === domain)
          const note = traitNotes.find((t) => t.domain === domain)
          if (!info || !note) {
            throw new Error(`Missing trait content for domain: ${domain}`)
          }
          return <TraitScoreBar key={domain} info={info} score={scores[domain]} note={note} />
        })}
      </div>
    </div>
  )
}

export default ResultsScreen
