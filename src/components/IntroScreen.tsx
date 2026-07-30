interface IntroScreenProps {
  questionCount: number
  onStart: () => void
}

function IntroScreen({ questionCount, onStart }: IntroScreenProps) {
  return (
    <div className="intro">
      <h1>bigfive-fun</h1>
      <p>
        Answer {questionCount} short statements about yourself. Takes about 10 minutes. At the end
        you&rsquo;ll get your real Big Five trait scores — plus the fictional character you match
        closest to.
      </p>
      <button type="button" onClick={onStart}>
        Start the test
      </button>
    </div>
  )
}

export default IntroScreen
