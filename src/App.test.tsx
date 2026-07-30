import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import questions from './data/questions'

function answerAllVisibleQuestions(choiceLabel: string) {
  const options = screen.getAllByLabelText(choiceLabel)
  options.forEach((option) => fireEvent.click(option))
}

describe('App', () => {
  it('renders the intro heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'bigfive-fun' })).toBeInTheDocument()
  })

  it('walks through the full quiz to a results screen', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /start the test/i }))

    const pageCount = Math.ceil(questions.length / 10)
    for (let i = 0; i < pageCount; i++) {
      answerAllVisibleQuestions('Very Accurate')
      const buttonName = i === pageCount - 1 ? /see results/i : /next/i
      fireEvent.click(screen.getByRole('button', { name: buttonName }))
    }

    expect(screen.getByText('About this character')).toBeInTheDocument()
  })
})
