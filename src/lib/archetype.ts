import type { ArchetypeEntry, ArchetypeResult, Direction, DomainKey, Scores } from './types'

const DOMAIN_ORDER: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
const MIDPOINT = 50

export function buildCode(scores: Scores): string {
  return DOMAIN_ORDER.map((domain) => {
    const { result } = scores[domain]
    const sign = result === 'high' ? '+' : result === 'low' ? '-' : '='
    return `${domain}${sign}`
  }).join(' ')
}

export function findArchetype(scores: Scores, entries: ArchetypeEntry[]): ArchetypeResult {
  if (entries.length === 0) {
    throw new Error('Archetype list is empty')
  }

  // Rank domains by how far they sit from the midpoint. Array.sort is stable, so
  // equal deviations keep O/C/E/A/N order and the result stays deterministic.
  const ranked = DOMAIN_ORDER.map((domain) => ({
    domain,
    direction: (scores[domain].normalized >= MIDPOINT ? 'high' : 'low') as Direction,
    deviation: Math.abs(scores[domain].normalized - MIDPOINT),
  })).sort((a, b) => b.deviation - a.deviation)

  const [lead, wing] = ranked

  const leadEntry = entries.find((e) => e.domain === lead.domain && e.direction === lead.direction)
  const wingEntry = entries.find((e) => e.domain === wing.domain && e.direction === wing.direction)

  if (!leadEntry || !wingEntry) {
    throw new Error(`Missing archetype for ${lead.domain}-${lead.direction} or ${wing.domain}-${wing.direction}`)
  }

  return {
    title: leadEntry.title,
    tagline: leadEntry.tagline,
    description: leadEntry.description,
    wingPhrase: wingEntry.wingPhrase,
    wingTitle: wingEntry.title,
    leadDomain: lead.domain,
    wingDomain: wing.domain,
    code: buildCode(scores),
  }
}
