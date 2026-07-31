import type { TraitInfo } from '../lib/types'

interface IntroScreenProps {
  questionCount: number
  traitInfos: TraitInfo[]
  onStart: () => void
}

function IntroScreen({ questionCount, traitInfos, onStart }: IntroScreenProps) {
  return (
    <div className="intro">
      <h1>bigfive-fun</h1>
      <p>
        Answer {questionCount} short statements about yourself. Takes about 10 minutes. At the end
        you&rsquo;ll get your real Big Five trait scores — plus the fictional character (and real ISU
        connection) you match closest to.
      </p>

      <div className="trait-preview">
        {traitInfos.map((info) => (
          <div className="trait-preview-item" key={info.domain}>
            <p className="trait-preview-label">{info.label}</p>
            <p className="trait-preview-description">{info.description}</p>
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
