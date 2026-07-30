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
}

export interface DomainResult {
  average: number // 1-5
  normalized: number // 0-100
  result: 'low' | 'neutral' | 'high'
}

export type Scores = Record<DomainKey, DomainResult>

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

export type Matches = Record<Medium, CharacterEntry>
