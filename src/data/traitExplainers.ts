import type { TraitExplainer } from '../lib/types'

const traitExplainers: TraitExplainer[] = [
  {
    domain: 'O',
    label: 'Openness',
    description:
      "How much you're pulled toward new ideas, art, and unfamiliar experiences, versus sticking with what already works. People sometimes mix this up with raw intelligence, but it's really just an appetite for the new.",
    highSummary: 'Curious, imaginative, drawn to art, ideas, and novelty.',
    lowSummary: 'Practical, conventional, prefers the familiar and concrete.',
  },
  {
    domain: 'C',
    label: 'Conscientiousness',
    description:
      "Whether you're a planner or a play-it-by-ear type. High scorers make lists and stick to them; low scorers keep their options open and figure it out as they go. Neither one is a moral failing, just a different relationship with structure.",
    highSummary: 'Organized, disciplined, plans ahead, follows through.',
    lowSummary: 'Spontaneous, flexible, less concerned with structure.',
  },
  {
    domain: 'E',
    label: 'Extraversion',
    description:
      'Where your energy comes from. Some people recharge at a party; other people recharge by skipping the party entirely. This tracks how much you seek out company and stimulation versus quiet and solitude.',
    highSummary: 'Outgoing, energized by people, seeks excitement.',
    lowSummary: 'Reserved, energized by solitude, prefers calm settings.',
  },
  {
    domain: 'A',
    label: 'Agreeableness',
    description:
      "How much weight you give other people's feelings when they bump up against your own interests. High scorers default to trust and cooperation. Low scorers default to skepticism and looking out for themselves first.",
    highSummary: 'Cooperative, trusting, empathetic, puts others first.',
    lowSummary: 'Skeptical, competitive, prioritizes own interests.',
  },
  {
    domain: 'N',
    label: 'Neuroticism',
    description:
      "How much stress and worry tend to follow you around, and how fast you shake it off once it shows up. This isn't a diagnosis of anything; it's just a measure of emotional weather, calm and steady or stormy and reactive.",
    highSummary: 'Sensitive to stress, prone to worry, emotionally reactive.',
    lowSummary: 'Calm under pressure, emotionally stable, even-keeled.',
  },
]

export default traitExplainers
