import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuestionFlow from './QuestionFlow'
import type { ChoiceSet, QuestionItem } from '../lib/types'

const choices: ChoiceSet = {
  plus: [
    { text: 'Very Inaccurate', score: 1, color: 1 },
    { text: 'Moderately Inaccurate', score: 2, color: 2 },
    { text: 'Neither Accurate Nor Inaccurate', score: 3, color: 3 },
    { text: 'Moderately Accurate', score: 4, color: 4 },
    { text: 'Very Accurate', score: 5, color: 5 },
  ],
  minus: [
    { text: 'Very Inaccurate', score: 5, color: 1 },
    { text: 'Moderately Inaccurate', score: 4, color: 2 },
    { text: 'Neither Accurate Nor Inaccurate', score: 3, color: 3 },
    { text: 'Moderately Accurate', score: 2, color: 4 },
    { text: 'Very Accurate', score: 1, color: 5 },
  ],
}

function makeQuestions(count: number): QuestionItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `q${i}`,
    text: `Question ${i}`,
    keyed: i % 2 === 0 ? 'plus' : 'minus',
    domain: 'O',
    facet: 1,
  }))
}

describe('QuestionFlow', () => {
  it('disables the button until every question on the page is answered, then completes', () => {
    const onComplete = vi.fn()
    const questions = makeQuestions(2)
    render(<QuestionFlow questions={questions} choices={choices} onComplete={onComplete} />)

    const button = screen.getByRole('button', { name: /see results/i })
    expect(button).toBeDisabled()

    fireEvent.click(screen.getAllByLabelText('Very Accurate')[0])
    expect(button).toBeDisabled()

    fireEvent.click(screen.getAllByLabelText('Very Accurate')[1])
    expect(button).not.toBeDisabled()

    fireEvent.click(button)
    expect(onComplete).toHaveBeenCalledWith([
      { domain: 'O', facet: 1, score: 5 },
      { domain: 'O', facet: 1, score: 1 },
    ])
  })

  it('paginates when there are more than 10 questions', () => {
    const questions = makeQuestions(11)
    render(<QuestionFlow questions={questions} choices={choices} onComplete={vi.fn()} />)

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('Question 0')).toBeInTheDocument()
    expect(screen.queryByText('Question 10')).not.toBeInTheDocument()

    const accurateOptions = screen.getAllByLabelText('Very Accurate')
    accurateOptions.forEach((option) => fireEvent.click(option))

    fireEvent.click(screen.getByRole('button', { name: /next/i }))

    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
    expect(screen.getByText('Question 10')).toBeInTheDocument()
  })
})
