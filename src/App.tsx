import { useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import IntroScreen from './components/IntroScreen'
import QuestionFlow from './components/QuestionFlow'
import ResultsScreen from './components/ResultsScreen'
import questions from './data/questions'
import choices from './data/choices'
import characters from './data/characters'
import traitInfo from './data/traitInfo'
import traitNotes from './data/traitNotes'
import traitExplainers from './data/traitExplainers'
import facetInfo from './data/facetInfo'
import archetypes from './data/archetypes'
import { scoreAnswers, scoreFacets } from './lib/scoring'
import { findMatchesByMedium } from './lib/matching'
import { findArchetype } from './lib/archetype'
import type { Answer, ArchetypeResult, FacetScores, Matches, Scores } from './lib/types'

type Stage = 'intro' | 'quiz' | 'results'

function App() {
  const [stage, setStage] = useState<Stage>('intro')
  const [scores, setScores] = useState<Scores | null>(null)
  const [facetScores, setFacetScores] = useState<FacetScores | null>(null)
  const [matches, setMatches] = useState<Matches | null>(null)
  const [archetype, setArchetype] = useState<ArchetypeResult | null>(null)

  function handleComplete(answers: Answer[]) {
    const computedScores = scoreAnswers(answers)
    const computedFacetScores = scoreFacets(answers)
    const foundMatches = findMatchesByMedium(computedScores, characters)
    const foundArchetype = findArchetype(computedScores, archetypes)
    setScores(computedScores)
    setFacetScores(computedFacetScores)
    setMatches(foundMatches)
    setArchetype(foundArchetype)
    setStage('results')
  }

  return (
    <div className="app">
      <div className="app-header">
        <ThemeToggle />
      </div>
      {stage === 'intro' && (
        <IntroScreen
          questionCount={questions.length}
          traitExplainers={traitExplainers}
          onStart={() => setStage('quiz')}
        />
      )}
      {stage === 'quiz' && <QuestionFlow questions={questions} choices={choices} onComplete={handleComplete} />}
      {stage === 'results' && scores && facetScores && matches && archetype && (
        <ResultsScreen
          scores={scores}
          matches={matches}
          archetype={archetype}
          traitInfos={traitInfo}
          traitNotes={traitNotes}
          facetInfos={facetInfo}
          facetScores={facetScores}
        />
      )}
    </div>
  )
}

export default App
