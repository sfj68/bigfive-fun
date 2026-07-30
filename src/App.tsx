import { useState } from 'react'
import IntroScreen from './components/IntroScreen'
import QuestionFlow from './components/QuestionFlow'
import ResultsScreen from './components/ResultsScreen'
import questions from './data/questions'
import choices from './data/choices'
import characters from './data/characters'
import traitInfo from './data/traitInfo'
import traitNotes from './data/traitNotes'
import { scoreAnswers } from './lib/scoring'
import { findClosestCharacter } from './lib/matching'
import type { Answer, CharacterEntry, Scores } from './lib/types'

type Stage = 'intro' | 'quiz' | 'results'

function App() {
  const [stage, setStage] = useState<Stage>('intro')
  const [scores, setScores] = useState<Scores | null>(null)
  const [character, setCharacter] = useState<CharacterEntry | null>(null)

  function handleComplete(answers: Answer[]) {
    const computedScores = scoreAnswers(answers)
    const match = findClosestCharacter(computedScores, characters)
    setScores(computedScores)
    setCharacter(match)
    setStage('results')
  }

  return (
    <div className="app">
      {stage === 'intro' && <IntroScreen questionCount={questions.length} onStart={() => setStage('quiz')} />}
      {stage === 'quiz' && <QuestionFlow questions={questions} choices={choices} onComplete={handleComplete} />}
      {stage === 'results' && scores && character && (
        <ResultsScreen scores={scores} character={character} traitInfos={traitInfo} traitNotes={traitNotes} />
      )}
    </div>
  )
}

export default App
