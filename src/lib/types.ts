export type DomainKey = 'O' | 'C' | 'E' | 'A' | 'N'

export interface QuestionItem {
  id: string
  text: string
  keyed: 'plus' | 'minus'
  domain: DomainKey
  facet: number
}

export interface Choice {
  text: string
  score: number
  color: number
}

export interface ChoiceSet {
  plus: Choice[]
  minus: Choice[]
}

export interface Answer {
  domain: DomainKey
  score: number
  facet?: number
}

export interface DomainResult {
  average: number // 1-5
  normalized: number // 0-100
  result: 'low' | 'neutral' | 'high'
}

export type Scores = Record<DomainKey, DomainResult>

export interface FacetInfo {
  domain: DomainKey
  facet: number
  title: string
  text: string
}

export type FacetResult = DomainResult

export type FacetScores = Record<string, FacetResult>

export interface CharacterProfile {
  O: number
  C: number
  E: number
  A: number
  N: number
}

export type Medium = 'book' | 'movie' | 'tv' | 'isu'

export interface CharacterEntry {
  id: string
  name: string
  source: string
  medium: Medium
  profile: CharacterProfile
  blurb: string
}

export interface TraitInfo {
  domain: DomainKey
  label: string
  description: string
}

export interface TraitNote {
  domain: DomainKey
  high: string
  low: string
}

export interface TraitExplainer {
  domain: DomainKey
  label: string
  description: string
  highSummary: string
  lowSummary: string
}

export type Matches = Record<Medium, CharacterEntry>

export type Direction = 'high' | 'low'

export interface ArchetypeEntry {
  domain: DomainKey
  direction: Direction
  title: string
  tagline: string
  description: string
  wingPhrase: string
}

export interface ArchetypeResult {
  title: string
  tagline: string
  description: string
  wingPhrase: string
  wingTitle: string
  leadDomain: DomainKey
  leadDirection: Direction
  wingDomain: DomainKey
  code: string
}
