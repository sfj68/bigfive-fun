import type { ArchetypeResult, DomainKey, TraitInfo } from '../lib/types'
import ArchetypeIllustration from './icons/ArchetypeIllustration'

interface ArchetypeCardProps {
  archetype: ArchetypeResult
  traitInfos: TraitInfo[]
}

function ArchetypeCard({ archetype, traitInfos }: ArchetypeCardProps) {
  function labelFor(domain: DomainKey) {
    return traitInfos.find((t) => t.domain === domain)?.label ?? domain
  }

  return (
    <div className="archetype">
      <p className="archetype-label">Your type</p>
      <ArchetypeIllustration
        domain={archetype.leadDomain}
        direction={archetype.leadDirection}
        className="archetype-illustration"
      />
      <h2 className="archetype-title">{archetype.title}</h2>
      <p className="archetype-wing">{archetype.wingPhrase}</p>
      <p className="archetype-tagline">{archetype.tagline}</p>
      <p className="archetype-description">{archetype.description}</p>
      <p className="archetype-derivation">
        <span className="archetype-code">{archetype.code}</span>
        <span className="archetype-derivation-note">
          Led by {labelFor(archetype.leadDomain)}, wing {labelFor(archetype.wingDomain)}
        </span>
      </p>
    </div>
  )
}

export default ArchetypeCard
