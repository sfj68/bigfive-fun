import type { TraitExplainer } from '../lib/types'

interface IntroScreenProps {
  questionCount: number
  traitExplainers: TraitExplainer[]
  onStart: () => void
}

function IntroScreen({ questionCount, traitExplainers, onStart }: IntroScreenProps) {
  return (
    <div className="intro">
      <h1>bigfive-fun</h1>
      <p>
        Answer {questionCount} short statements about yourself. Takes about 10 minutes. At the end
        you&rsquo;ll get your real Big Five trait scores — plus the fictional character (and real ISU
        connection) you match closest to.
      </p>
      <p>
        The test measures five independent dimensions of personality — here&rsquo;s what each one
        actually means before you start:
      </p>

      <div className="trait-preview">
        {traitExplainers.map((explainer) => (
          <div className="trait-preview-item" key={explainer.domain}>
            <p className="trait-preview-label">{explainer.label}</p>
            <p className="trait-preview-description">{explainer.description}</p>
            <div className="trait-preview-poles">
              <p className="trait-preview-pole">
                <span className="trait-preview-pole-tag trait-preview-pole-tag-high">Higher</span>
                {explainer.highSummary}
              </p>
              <p className="trait-preview-pole">
                <span className="trait-preview-pole-tag trait-preview-pole-tag-low">Lower</span>
                {explainer.lowSummary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={onStart}>
        Start the test
      </button>
    </div>
  )
}

export default IntroScreen
