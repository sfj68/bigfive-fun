import { useState } from 'react'
import type { Answer, ChoiceSet, QuestionItem } from '../lib/types'

const PAGE_SIZE = 10

interface QuestionFlowProps {
  questions: QuestionItem[]
  choices: ChoiceSet
  onComplete: (answers: Answer[]) => void
}

function QuestionFlow({ questions, choices, onComplete }: QuestionFlowProps) {
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const pageCount = Math.ceil(questions.length / PAGE_SIZE)
  const pageQuestions = questions.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)
  const isLastPage = page === pageCount - 1

  function selectAnswer(question: QuestionItem, score: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: score }))
  }

  function goNext() {
    if (!pageComplete) return
    if (isLastPage) {
      const finalAnswers: Answer[] = questions.map((q) => ({
        domain: q.domain,
        score: answers[q.id],
      }))
      onComplete(finalAnswers)
    } else {
      setPage((p) => p + 1)
    }
  }

  return (
    <div className="quiz">
      <p className="progress">
        Page {page + 1} of {pageCount}
      </p>
      {pageQuestions.map((question) => {
        const options = choices[question.keyed]
        return (
          <fieldset key={question.id} className="question">
            <legend>{question.text}</legend>
            {options.map((choice) => (
              <label key={choice.text}>
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === choice.score}
                  onChange={() => selectAnswer(question, choice.score)}
                />
                {choice.text}
              </label>
            ))}
          </fieldset>
        )
      })}
      <button type="button" disabled={!pageComplete} onClick={goNext}>
        {isLastPage ? 'See results' : 'Next'}
      </button>
    </div>
  )
}

export default QuestionFlow
