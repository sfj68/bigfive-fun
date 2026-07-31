import { useState } from 'react'
import IntroScreen from './components/IntroScreen'
import QuestionFlow from './components/QuestionFlow'
import ResultsScreen from './components/ResultsScreen'
import questions from './data/questions'
import choices from './data/choices'
import characters from './data/characters'
import traitInfo from './data/traitInfo'
import traitNotes from './data/traitNotes'
import traitExplainers from './data/traitExplainers'
import { scoreAnswers } from './lib/scoring'
import { findMatchesByMedium } from './lib/matching'
import type { Answer, Matches, Scores } from './lib/types'

type Stage = 'intro' | 'quiz' | 'results'

function App() {
  const [stage, setStage] = useState<Stage>('intro')
  const [scores, setScores] = useState<Scores | null>(null)
  const [matches, setMatches] = useState<Matches | null>(null)

  function handleComplete(answers: Answer[]) {
    const computedScores = scoreAnswers(answers)
    const foundMatches = findMatchesByMedium(computedScores, characters)
    setScores(computedScores)
    setMatches(foundMatches)
    setStage('results')
  }

  return (
    <div className="app">
      {stage === 'intro' && (
        <IntroScreen
          questionCount={questions.length}
          traitExplainers={traitExplainers}
          onStart={() => setStage('quiz')}
        />
      )}
      {stage === 'quiz' && <QuestionFlow questions={questions} choices={choices} onComplete={handleComplete} />}
      {stage === 'results' && scores && matches && (
        <ResultsScreen scores={scores} matches={matches} traitInfos={traitInfo} traitNotes={traitNotes} />
      )}
    </div>
  )
}

export default App
