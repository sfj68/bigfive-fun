import type { CharacterEntry, DomainKey, Scores, TraitInfo, TraitNote } from '../lib/types'
import TraitScoreBar from './TraitScoreBar'
import DustJacketCard from './DustJacketCard'

const DOMAIN_ORDER: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

interface ResultsScreenProps {
  scores: Scores
  character: CharacterEntry
  traitInfos: TraitInfo[]
  traitNotes: TraitNote[]
}

function ResultsScreen({ scores, character, traitInfos, traitNotes }: ResultsScreenProps) {
  return (
    <div className="results">
      <DustJacketCard character={character} />
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
