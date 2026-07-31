import type { TraitExplainer } from '../lib/types'
import TraitIcon from './icons/TraitIcon'

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
        you&rsquo;ll get your real Big Five trait scores, plus the fictional character (and real ISU
        connection) your results land closest to.
      </p>
      <p>Big Five tests measure five separate traits. Here&rsquo;s what each one covers before you dive in:</p>

      <div className="trait-preview">
        {traitExplainers.map((explainer) => (
          <div className="trait-preview-item" key={explainer.domain}>
            <div className="trait-preview-header">
              <TraitIcon domain={explainer.domain} className="trait-icon" />
              <p className="trait-preview-label">{explainer.label}</p>
            </div>
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
