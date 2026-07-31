import type { Answer, DomainKey, FacetScores, Scores } from './types'

const DOMAIN_KEYS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

export function calculateResult(average: number): 'low' | 'neutral' | 'high' {
  if (average > 3.5) return 'high'
  if (average < 2.5) return 'low'
  return 'neutral'
}

export function scoreAnswers(answers: Answer[]): Scores {
  const totals: Record<DomainKey, { sum: number; count: number }> = {
    O: { sum: 0, count: 0 },
    C: { sum: 0, count: 0 },
    E: { sum: 0, count: 0 },
    A: { sum: 0, count: 0 },
    N: { sum: 0, count: 0 },
  }

  for (const answer of answers) {
    totals[answer.domain].sum += answer.score
    totals[answer.domain].count += 1
  }

  const scores = {} as Scores
  for (const key of DOMAIN_KEYS) {
    const { sum, count } = totals[key]
    const average = count === 0 ? 0 : sum / count
    const normalized = ((average - 1) / 4) * 100
    scores[key] = {
      average,
      normalized,
      result: calculateResult(average),
    }
  }
  return scores
}

export function scoreFacets(answers: Answer[]): FacetScores {
  const totals: Record<string, { sum: number; count: number }> = {}

  for (const answer of answers) {
    if (answer.facet === undefined) continue
    const key = `${answer.domain}${answer.facet}`
    if (totals[key] === undefined) {
      totals[key] = { sum: 0, count: 0 }
    }
    totals[key].sum += answer.score
    totals[key].count += 1
  }

  const scores: FacetScores = {}
  for (const key of Object.keys(totals)) {
    const { sum, count } = totals[key]
    const average = sum / count
    const normalized = ((average - 1) / 4) * 100
    scores[key] = {
      average,
      normalized,
      result: calculateResult(average),
    }
  }
  return scores
}
