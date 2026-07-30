import type { CharacterEntry, DomainKey, Medium, Matches, Scores } from './types'

const DOMAIN_KEYS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

export function findClosestCharacter(scores: Scores, roster: CharacterEntry[]): CharacterEntry {
  if (roster.length === 0) {
    throw new Error('Character roster is empty')
  }

  let closest = roster[0]
  let minDistanceSquared = Infinity

  for (const character of roster) {
    let distanceSquared = 0
    for (const key of DOMAIN_KEYS) {
      const diff = scores[key].normalized - character.profile[key]
      distanceSquared += diff * diff
    }
    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared
      closest = character
    }
  }

  return closest
}

const MEDIUMS: Medium[] = ['book', 'movie', 'tv', 'isu']

export function findMatchesByMedium(scores: Scores, roster: CharacterEntry[]): Matches {
  const matches = {} as Matches
  for (const medium of MEDIUMS) {
    const subset = roster.filter((character) => character.medium === medium)
    matches[medium] = findClosestCharacter(scores, subset)
  }
  return matches
}
