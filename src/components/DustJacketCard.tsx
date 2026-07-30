import type { CharacterEntry } from '../lib/types'

interface DustJacketCardProps {
  character: CharacterEntry
}

function DustJacketCard({ character }: DustJacketCardProps) {
  return (
    <div className="dust-jacket">
      <p className="dust-jacket-label">About this character</p>
      <h2 className="dust-jacket-name">{character.name}</h2>
      <p className="dust-jacket-source">{character.source}</p>
      <p className="dust-jacket-blurb">{character.blurb}</p>
    </div>
  )
}

export default DustJacketCard
