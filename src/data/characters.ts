import type { CharacterEntry } from '../lib/types'

const characters: CharacterEntry[] = [
  {
    id: 'hermione-granger',
    name: 'Hermione Granger',
    source: 'Harry Potter',
    profile: { O: 70, C: 92, E: 35, A: 60, N: 55 },
    blurb:
      "Enters every scene already having read the footnotes twice. Loyalty runs deep, but so does the conviction that there is, in fact, a correct answer.",
  },
  {
    id: 'sherlock-holmes',
    name: 'Sherlock Holmes',
    source: 'Sherlock Holmes',
    profile: { O: 88, C: 60, E: 28, A: 22, N: 48 },
    blurb:
      'Notices everything except how the room feels about him. Brilliant company for exactly as long as the mystery lasts.',
  },
  {
    id: 'elizabeth-bennet',
    name: 'Elizabeth Bennet',
    source: 'Pride and Prejudice',
    profile: { O: 75, C: 55, E: 62, A: 55, N: 38 },
    blurb:
      'Quick with a verdict and quicker to revise it once the evidence changes. Charming in a way that occasionally draws blood.',
  },
  {
    id: 'jay-gatsby',
    name: 'Jay Gatsby',
    source: 'The Great Gatsby',
    profile: { O: 60, C: 40, E: 72, A: 45, N: 68 },
    blurb:
      'Threw the party so the one person who mattered would notice the lights. Reinvention as a lifestyle, longing as a foundation.',
  },
  {
    id: 'atticus-finch',
    name: 'Atticus Finch',
    source: 'To Kill a Mockingbird',
    profile: { O: 55, C: 80, E: 35, A: 85, N: 18 },
    blurb:
      'Says the quiet, correct thing while the room says the loud, easy one. Unshakeable in a way that looks, from a distance, like calm.',
  },
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    source: 'Iron Man',
    profile: { O: 82, C: 35, E: 88, A: 42, N: 60 },
    blurb:
      'Solves the impossible problem overnight and the simple one never. The showmanship is real; so, inconveniently, is the anxiety underneath it.',
  },
  {
    id: 'ron-weasley',
    name: 'Ron Weasley',
    source: 'Harry Potter',
    profile: { O: 42, C: 35, E: 65, A: 72, N: 52 },
    blurb:
      "Shows up, every time, without needing credit for it. Occasionally underestimates himself in a room full of people who don't.",
  },
  {
    id: 'frodo-baggins',
    name: 'Frodo Baggins',
    source: 'The Lord of the Rings',
    profile: { O: 60, C: 60, E: 28, A: 80, N: 58 },
    blurb:
      'Volunteered for the job nobody else wanted and carried it further than anyone thought reasonable. Quietly worn down by the weight of doing the right thing.',
  },
  {
    id: 'gandalf',
    name: 'Gandalf',
    source: 'The Lord of the Rings',
    profile: { O: 75, C: 70, E: 55, A: 70, N: 15 },
    blurb:
      'Arrives exactly when needed and never a moment before, which is either wisdom or excellent timing. Unbothered by chaos he clearly saw coming.',
  },
  {
    id: 'elsa',
    name: 'Elsa',
    source: 'Frozen',
    profile: { O: 55, C: 75, E: 22, A: 55, N: 72 },
    blurb:
      "Kept the door shut for everyone's own good, including her own. Extraordinary under control, and exhausted by how much control that takes.",
  },
  {
    id: 'anna',
    name: 'Anna',
    source: 'Frozen',
    profile: { O: 65, C: 30, E: 90, A: 80, N: 45 },
    blurb:
      'Runs toward the problem, the stranger, and the avalanche with roughly equal enthusiasm. Optimism as a survival strategy, and it mostly works.',
  },
  {
    id: 'katniss-everdeen',
    name: 'Katniss Everdeen',
    source: 'The Hunger Games',
    profile: { O: 45, C: 70, E: 20, A: 55, N: 66 },
    blurb:
      'Volunteers first, trusts last. Competent under pressure that would flatten most people, and allergic to being thanked for it.',
  },
  {
    id: 'jane-eyre',
    name: 'Jane Eyre',
    source: 'Jane Eyre',
    profile: { O: 60, C: 75, E: 25, A: 58, N: 50 },
    blurb:
      "Small, plain, and entirely unwilling to be talked out of her own opinion. Keeps her own counsel and her own conscience, in that order.",
  },
  {
    id: 'tyrion-lannister',
    name: 'Tyrion Lannister',
    source: 'A Song of Ice and Fire',
    profile: { O: 85, C: 50, E: 66, A: 60, N: 55 },
    blurb:
      "Reads the room, then the room's history, then says the one sentence that reframes both. Drinks and knows things, occasionally in the wrong order.",
  },
  {
    id: 'amy-march',
    name: 'Amy March',
    source: 'Little Women',
    profile: { O: 55, C: 65, E: 60, A: 45, N: 50 },
    blurb:
      "Plans the future she wants with a precision everyone mistakes for ambition alone. Knows exactly what a room is worth before she walks in.",
  },
  {
    id: 'jo-march',
    name: 'Jo March',
    source: 'Little Women',
    profile: { O: 82, C: 45, E: 70, A: 65, N: 55 },
    blurb:
      'Writes the story before living matches it. Generous, headstrong, and constitutionally unable to sit still for the ending everyone else expects.',
  },
  {
    id: 'mr-darcy',
    name: 'Mr. Darcy',
    source: 'Pride and Prejudice',
    profile: { O: 50, C: 75, E: 20, A: 52, N: 44 },
    blurb:
      'Says almost nothing in company and means most of it. The good opinion, once lost, apparently takes a full novel to earn back.',
  },
  {
    id: 'ferris-bueller',
    name: 'Ferris Bueller',
    source: "Ferris Bueller's Day Off",
    profile: { O: 70, C: 15, E: 96, A: 70, N: 14 },
    blurb:
      'Life moves fast enough that he built an entire philosophy around occasionally stopping to look at it. Impossible to stay annoyed with for long.',
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Malfoy',
    source: 'Harry Potter',
    profile: { O: 40, C: 55, E: 55, A: 25, N: 66 },
    blurb:
      'Inherited the posture of superiority and none of the ease. Most dangerous when cornered, most interesting when the mask briefly slips.',
  },
  {
    id: 'winnie-the-pooh',
    name: 'Winnie-the-Pooh',
    source: 'Winnie-the-Pooh',
    profile: { O: 38, C: 20, E: 50, A: 92, N: 18 },
    blurb:
      "Uncomplicated by design and better for it. Shows up for friends without an agenda, which turns out to be a rarer trait than it sounds.",
  },
]

export default characters
