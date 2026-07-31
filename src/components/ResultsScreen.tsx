import type { DomainKey, FacetInfo, FacetScores, Matches, Scores, TraitInfo, TraitNote } from '../lib/types'
import TraitScoreBar from './TraitScoreBar'
import MatchSwitcher from './MatchSwitcher'

const DOMAIN_ORDER: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

interface ResultsScreenProps {
  scores: Scores
  matches: Matches
  traitInfos: TraitInfo[]
  traitNotes: TraitNote[]
  facetInfos: FacetInfo[]
  facetScores: FacetScores
}

function ResultsScreen({ scores, matches, traitInfos, traitNotes, facetInfos, facetScores }: ResultsScreenProps) {
  return (
    <div className="results">
      <MatchSwitcher matches={matches} />
      <div className="trait-bars">
        {DOMAIN_ORDER.map((domain) => {
          const info = traitInfos.find((t) => t.domain === domain)
          const note = traitNotes.find((t) => t.domain === domain)
          if (!info || !note) {
            throw new Error(`Missing trait content for domain: ${domain}`)
          }
          return (
            <TraitScoreBar
              key={domain}
              info={info}
              score={scores[domain]}
              note={note}
              facetInfos={facetInfos}
              facetScores={facetScores}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ResultsScreen
