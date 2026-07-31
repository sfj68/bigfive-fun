import type { CharacterEntry, DomainKey, Medium, Matches, Scores } from './types'

const DOMAIN_KEYS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
const MEDIUMS: Medium[] = ['book', 'movie', 'tv', 'isu']

// Big Five domain scores in a population sit roughly normal around the midpoint.
// Real personality reports express a result as a percentile against a norm group
// rather than as a raw number, which is what these constants are for.
const POPULATION_MEAN = 50
const POPULATION_SD = 15

/**
 * Which traits each roster is matched on.
 *
 * The ISU roster is real historical people. Their Openness, Conscientiousness,
 * Extraversion and Agreeableness estimates come from documented biography, but
 * there is no public record of how emotionally reactive any of them were, so we
 * never claimed to know it. We therefore do not match on it either — scoring
 * against a number we invented is worse than leaving the trait out.
 */
const MATCH_DOMAINS: Record<Medium, DomainKey[]> = {
  book: DOMAIN_KEYS,
  movie: DOMAIN_KEYS,
  tv: DOMAIN_KEYS,
  isu: ['O', 'C', 'E', 'A'],
}

/** Where a raw 0-100 trait score falls in the population, as a 0-1 percentile. */
export function populationPercentile(normalized: number): number {
  const z = (normalized - POPULATION_MEAN) / POPULATION_SD
  // Zelen & Severo approximation of the normal CDF; accurate to ~1e-7.
  const sign = z < 0 ? -1 : 1
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp((-z * z) / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return sign > 0 ? 1 - p : p
}

/**
 * Where each character sits within their own roster on a trait, as a 0-1 rank.
 *
 * Ranking within the roster is what keeps a lopsided roster usable. Every ISU
 * figure is an accomplished person, so their raw Conscientiousness only spans
 * 65-95 — but their relative ordering still spreads across the full range, so
 * the roster stops collapsing everyone onto whichever entry sits nearest the
 * middle. Ties share the average of the positions they occupy.
 */
function rankWithinRoster(roster: CharacterEntry[], domain: DomainKey): Map<string, number> {
  const ranks = new Map<string, number>()
  if (roster.length === 1) {
    ranks.set(roster[0].id, 0.5)
    return ranks
  }

  const sorted = [...roster].sort((a, b) => a.profile[domain] - b.profile[domain])
  let i = 0
  while (i < sorted.length) {
    let j = i
    while (j + 1 < sorted.length && sorted[j + 1].profile[domain] === sorted[i].profile[domain]) j++
    const shared = (i + j) / 2 / (sorted.length - 1)
    for (let k = i; k <= j; k++) ranks.set(sorted[k].id, shared)
    i = j + 1
  }
  return ranks
}

/**
 * Nearest character by relative standing: your percentile among people against
 * their percentile among their own roster, over the traits that roster claims.
 * Ties resolve to the earlier roster entry, so the result is deterministic.
 */
export function findClosestCharacter(
  scores: Scores,
  roster: CharacterEntry[],
  domains: DomainKey[] = DOMAIN_KEYS,
): CharacterEntry {
  if (roster.length === 0) {
    throw new Error('Character roster is empty')
  }

  const rankTables = new Map<DomainKey, Map<string, number>>()
  for (const domain of domains) rankTables.set(domain, rankWithinRoster(roster, domain))

  let closest = roster[0]
  let minDistanceSquared = Infinity

  for (const character of roster) {
    let distanceSquared = 0
    for (const domain of domains) {
      const mine = populationPercentile(scores[domain].normalized)
      const theirs = rankTables.get(domain)!.get(character.id)!
      const diff = mine - theirs
      distanceSquared += diff * diff
    }
    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared
      closest = character
    }
  }

  return closest
}

export function findMatchesByMedium(scores: Scores, roster: CharacterEntry[]): Matches {
  const matches = {} as Matches
  for (const medium of MEDIUMS) {
    const subset = roster.filter((character) => character.medium === medium)
    matches[medium] = findClosestCharacter(scores, subset, MATCH_DOMAINS[medium])
  }
  return matches
}
