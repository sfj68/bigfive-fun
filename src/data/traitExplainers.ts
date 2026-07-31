import type { TraitExplainer } from '../lib/types'

const traitExplainers: TraitExplainer[] = [
  {
    domain: 'O',
    label: 'Openness',
    description:
      "Openness to Experience measures your appetite for novelty, imagination, and intellectual or aesthetic curiosity. It isn't about intelligence — it's about how drawn you are to new ideas, unconventional thinking, and creative or abstract experiences versus the familiar and concrete.",
    highSummary: 'Curious, imaginative, drawn to art, ideas, and novelty.',
    lowSummary: 'Practical, conventional, prefers the familiar and concrete.',
  },
  {
    domain: 'C',
    label: 'Conscientiousness',
    description:
      'Conscientiousness measures how organized, disciplined, and goal-directed you are. It captures your relationship with planning, follow-through, and self-control — whether you tend to think ahead and stick to a plan, or prefer to stay flexible and go with the flow.',
    highSummary: 'Organized, disciplined, plans ahead, follows through.',
    lowSummary: 'Spontaneous, flexible, less concerned with structure.',
  },
  {
    domain: 'E',
    label: 'Extraversion',
    description:
      'Extraversion measures where you draw your energy from — other people and social stimulation, or solitude and quiet reflection. It covers sociability, assertiveness, and how much you seek out excitement and company.',
    highSummary: 'Outgoing, energized by people, seeks excitement.',
    lowSummary: 'Reserved, energized by solitude, prefers calm settings.',
  },
  {
    domain: 'A',
    label: 'Agreeableness',
    description:
      "Agreeableness measures how much you prioritize cooperation, trust, and others' feelings versus your own interests and opinions. It reflects your default posture toward other people — warm and accommodating, or skeptical and self-interested.",
    highSummary: 'Cooperative, trusting, empathetic, puts others first.',
    lowSummary: 'Skeptical, competitive, prioritizes own interests.',
  },
  {
    domain: 'N',
    label: 'Neuroticism',
    description:
      "Neuroticism measures how readily you experience stress, worry, and negative emotion, and how quickly you recover from it. It isn't about mental illness — it's about emotional reactivity and how much day-to-day life tends to unsettle you.",
    highSummary: 'Sensitive to stress, prone to worry, emotionally reactive.',
    lowSummary: 'Calm under pressure, emotionally stable, even-keeled.',
  },
]

export default traitExplainers
