# bigfive-fun Multi-Category Character Matching Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single overall character match with four independent matches — book, movie, TV, and a real ISU historical figure — each computed by nearest-neighbor within its own category.

**Architecture:** Add a `medium` field to `CharacterEntry`, grow the roster to 75 entries (18 book / 18 movie / 18 TV / 21 ISU), add a `findMatchesByMedium` function alongside the existing `findClosestCharacter`, and update `ResultsScreen`/`App` to display four labeled cards instead of one.

**Tech Stack:** Same as the existing app — React 18, TypeScript, Vite, Vitest + @testing-library/react.

---

## Reference: full replacement `src/data/characters.ts`

Task 2 below replaces the entire file with this content. Reproduced here once as the source of truth; Task 2 references it verbatim.

```ts
import type { CharacterEntry } from '../lib/types'

const characters: CharacterEntry[] = [
  // --- BOOK (18) ---
  {
    id: 'hermione-granger',
    name: 'Hermione Granger',
    source: 'Harry Potter',
    medium: 'book',
    profile: { O: 70, C: 92, E: 35, A: 60, N: 55 },
    blurb:
      "Enters every scene already having read the footnotes twice. Loyalty runs deep, but so does the conviction that there is, in fact, a correct answer.",
  },
  {
    id: 'sherlock-holmes',
    name: 'Sherlock Holmes',
    source: 'Sherlock Holmes',
    medium: 'book',
    profile: { O: 88, C: 60, E: 28, A: 22, N: 48 },
    blurb:
      'Notices everything except how the room feels about him. Brilliant company for exactly as long as the mystery lasts.',
  },
  {
    id: 'elizabeth-bennet',
    name: 'Elizabeth Bennet',
    source: 'Pride and Prejudice',
    medium: 'book',
    profile: { O: 75, C: 55, E: 62, A: 55, N: 38 },
    blurb:
      'Quick with a verdict and quicker to revise it once the evidence changes. Charming in a way that occasionally draws blood.',
  },
  {
    id: 'jay-gatsby',
    name: 'Jay Gatsby',
    source: 'The Great Gatsby',
    medium: 'book',
    profile: { O: 60, C: 40, E: 72, A: 45, N: 68 },
    blurb:
      'Threw the party so the one person who mattered would notice the lights. Reinvention as a lifestyle, longing as a foundation.',
  },
  {
    id: 'atticus-finch',
    name: 'Atticus Finch',
    source: 'To Kill a Mockingbird',
    medium: 'book',
    profile: { O: 55, C: 80, E: 35, A: 85, N: 18 },
    blurb:
      'Says the quiet, correct thing while the room says the loud, easy one. Unshakeable in a way that looks, from a distance, like calm.',
  },
  {
    id: 'ron-weasley',
    name: 'Ron Weasley',
    source: 'Harry Potter',
    medium: 'book',
    profile: { O: 42, C: 35, E: 65, A: 72, N: 52 },
    blurb:
      "Shows up, every time, without needing credit for it. Occasionally underestimates himself in a room full of people who don't.",
  },
  {
    id: 'frodo-baggins',
    name: 'Frodo Baggins',
    source: 'The Lord of the Rings',
    medium: 'book',
    profile: { O: 60, C: 60, E: 28, A: 80, N: 58 },
    blurb:
      'Volunteered for the job nobody else wanted and carried it further than anyone thought reasonable. Quietly worn down by the weight of doing the right thing.',
  },
  {
    id: 'gandalf',
    name: 'Gandalf',
    source: 'The Lord of the Rings',
    medium: 'book',
    profile: { O: 75, C: 70, E: 55, A: 70, N: 15 },
    blurb:
      'Arrives exactly when needed and never a moment before, which is either wisdom or excellent timing. Unbothered by chaos he clearly saw coming.',
  },
  {
    id: 'katniss-everdeen',
    name: 'Katniss Everdeen',
    source: 'The Hunger Games',
    medium: 'book',
    profile: { O: 45, C: 70, E: 20, A: 55, N: 66 },
    blurb:
      'Volunteers first, trusts last. Competent under pressure that would flatten most people, and allergic to being thanked for it.',
  },
  {
    id: 'jane-eyre',
    name: 'Jane Eyre',
    source: 'Jane Eyre',
    medium: 'book',
    profile: { O: 60, C: 75, E: 25, A: 58, N: 50 },
    blurb:
      "Small, plain, and entirely unwilling to be talked out of her own opinion. Keeps her own counsel and her own conscience, in that order.",
  },
  {
    id: 'tyrion-lannister',
    name: 'Tyrion Lannister',
    source: 'A Song of Ice and Fire',
    medium: 'book',
    profile: { O: 85, C: 50, E: 66, A: 60, N: 55 },
    blurb:
      "Reads the room, then the room's history, then says the one sentence that reframes both. Drinks and knows things, occasionally in the wrong order.",
  },
  {
    id: 'amy-march',
    name: 'Amy March',
    source: 'Little Women',
    medium: 'book',
    profile: { O: 55, C: 65, E: 60, A: 45, N: 50 },
    blurb:
      "Plans the future she wants with a precision everyone mistakes for ambition alone. Knows exactly what a room is worth before she walks in.",
  },
  {
    id: 'jo-march',
    name: 'Jo March',
    source: 'Little Women',
    medium: 'book',
    profile: { O: 82, C: 45, E: 70, A: 65, N: 55 },
    blurb:
      'Writes the story before living matches it. Generous, headstrong, and constitutionally unable to sit still for the ending everyone else expects.',
  },
  {
    id: 'mr-darcy',
    name: 'Mr. Darcy',
    source: 'Pride and Prejudice',
    medium: 'book',
    profile: { O: 50, C: 75, E: 20, A: 52, N: 44 },
    blurb:
      'Says almost nothing in company and means most of it. The good opinion, once lost, apparently takes a full novel to earn back.',
  },
  {
    id: 'draco-malfoy',
    name: 'Draco Malfoy',
    source: 'Harry Potter',
    medium: 'book',
    profile: { O: 40, C: 55, E: 55, A: 25, N: 66 },
    blurb:
      'Inherited the posture of superiority and none of the ease. Most dangerous when cornered, most interesting when the mask briefly slips.',
  },
  {
    id: 'winnie-the-pooh',
    name: 'Winnie-the-Pooh',
    source: 'Winnie-the-Pooh',
    medium: 'book',
    profile: { O: 38, C: 20, E: 50, A: 92, N: 18 },
    blurb:
      "Uncomplicated by design and better for it. Shows up for friends without an agenda, which turns out to be a rarer trait than it sounds.",
  },
  {
    id: 'matilda-wormwood',
    name: 'Matilda Wormwood',
    source: 'Matilda',
    medium: 'book',
    profile: { O: 88, C: 80, E: 40, A: 75, N: 35 },
    blurb:
      'Reads faster than the library can restock and quietly rearranges the furniture of unfair situations. Small, patient, and not remotely as harmless as she looks.',
  },
  {
    id: 'scout-finch',
    name: 'Scout Finch',
    source: 'To Kill a Mockingbird',
    medium: 'book',
    profile: { O: 72, C: 45, E: 68, A: 70, N: 40 },
    blurb:
      'Asks the question everyone else in the room already agreed not to ask. Still figuring out the rules, and unimpressed by most of them so far.',
  },

  // --- MOVIE (18) ---
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    source: 'Iron Man',
    medium: 'movie',
    profile: { O: 82, C: 35, E: 88, A: 42, N: 60 },
    blurb:
      'Solves the impossible problem overnight and the simple one never. The showmanship is real; so, inconveniently, is the anxiety underneath it.',
  },
  {
    id: 'elsa',
    name: 'Elsa',
    source: 'Frozen',
    medium: 'movie',
    profile: { O: 55, C: 75, E: 22, A: 55, N: 72 },
    blurb:
      "Kept the door shut for everyone's own good, including her own. Extraordinary under control, and exhausted by how much control that takes.",
  },
  {
    id: 'anna',
    name: 'Anna',
    source: 'Frozen',
    medium: 'movie',
    profile: { O: 65, C: 30, E: 90, A: 80, N: 45 },
    blurb:
      'Runs toward the problem, the stranger, and the avalanche with roughly equal enthusiasm. Optimism as a survival strategy, and it mostly works.',
  },
  {
    id: 'ferris-bueller',
    name: 'Ferris Bueller',
    source: "Ferris Bueller's Day Off",
    medium: 'movie',
    profile: { O: 70, C: 15, E: 96, A: 70, N: 14 },
    blurb:
      'Life moves fast enough that he built an entire philosophy around occasionally stopping to look at it. Impossible to stay annoyed with for long.',
  },
  {
    id: 'rocky-balboa',
    name: 'Rocky',
    source: 'Rocky',
    medium: 'movie',
    profile: { O: 35, C: 65, E: 55, A: 80, N: 35 },
    blurb:
      'Was never the most talented person in the room, so he simply outlasted everyone who was. Measures success in rounds survived, not trophies won.',
  },
  {
    id: 'marty-mcfly',
    name: 'Marty McFly',
    source: 'Back to the Future',
    medium: 'movie',
    profile: { O: 68, C: 40, E: 70, A: 68, N: 55 },
    blurb:
      "Improvises an entire plan on the way to the plan. Can't resist a dare, especially the ones with real consequences attached.",
  },
  {
    id: 'ellen-ripley',
    name: 'Ellen Ripley',
    source: 'Alien',
    medium: 'movie',
    profile: { O: 55, C: 78, E: 38, A: 55, N: 52 },
    blurb:
      "The one who reads the protocol manual and then follows it, even when everyone else has stopped bothering. Calm is a decision, not a personality trait, and she makes it repeatedly.",
  },
  {
    id: 'indiana-jones',
    name: 'Indiana Jones',
    source: 'Raiders of the Lost Ark',
    medium: 'movie',
    profile: { O: 80, C: 50, E: 62, A: 60, N: 38 },
    blurb:
      "Prefers a museum by day and a mild international incident by night. Improvises constantly and somehow still teaches Tuesday's class.",
  },
  {
    id: 'the-dude',
    name: 'The Dude',
    source: 'The Big Lebowski',
    medium: 'movie',
    profile: { O: 60, C: 12, E: 45, A: 78, N: 20 },
    blurb:
      'Has exactly one rug-related grievance and otherwise no interest in escalating anything. Achieves through sheer inertia what everyone else is trying to force.',
  },
  {
    id: 'buzz-lightyear',
    name: 'Buzz Lightyear',
    source: 'Toy Story',
    medium: 'movie',
    profile: { O: 62, C: 75, E: 70, A: 72, N: 35 },
    blurb:
      "Took an embarrassingly long time to realize he wasn't what he thought he was, then recalibrated completely and got back to the mission. Earnest to a fault.",
  },
  {
    id: 'dory',
    name: 'Dory',
    source: 'Finding Nemo',
    medium: 'movie',
    profile: { O: 82, C: 15, E: 85, A: 88, N: 35 },
    blurb:
      'Forgets the plan roughly every ninety seconds and somehow still gets everyone home. Talks to strangers, including the dangerous ones, purely out of enthusiasm.',
  },
  {
    id: 'wall-e',
    name: 'WALL-E',
    source: 'WALL-E',
    medium: 'movie',
    profile: { O: 70, C: 82, E: 30, A: 85, N: 25 },
    blurb:
      'Has been quietly doing the job long after everyone else gave up on it. Collects small treasures nobody else thought were worth keeping.',
  },
  {
    id: 'jack-sparrow',
    name: 'Captain Jack Sparrow',
    source: 'Pirates of the Caribbean',
    medium: 'movie',
    profile: { O: 85, C: 20, E: 75, A: 48, N: 42 },
    blurb:
      "Has a plan that looks exactly like no plan, right up until it isn't. Loyal to himself first, but not as disloyal to everyone else as he'd like you to think.",
  },
  {
    id: 'elle-woods',
    name: 'Elle Woods',
    source: 'Legally Blonde',
    medium: 'movie',
    profile: { O: 65, C: 70, E: 82, A: 75, N: 35 },
    blurb:
      'Underestimated in every room she walks into and correct about that being a mistake. Works twice as hard while making it look like no effort at all.',
  },
  {
    id: 'miranda-priestly',
    name: 'Miranda Priestly',
    source: 'The Devil Wears Prada',
    medium: 'movie',
    profile: { O: 70, C: 90, E: 45, A: 20, N: 48 },
    blurb:
      "Never raises her voice because she has never needed to. Notices the one thing that's wrong before anyone else has finished being impressed by everything that's right.",
  },
  {
    id: 'mia-thermopolis',
    name: 'Mia Thermopolis',
    source: 'The Princess Diaries',
    medium: 'movie',
    profile: { O: 62, C: 45, E: 35, A: 75, N: 62 },
    blurb:
      'Would rather disappear into the back row, and keeps getting handed the microphone anyway. Grows into the role faster than she expects to.',
  },
  {
    id: 'shrek',
    name: 'Shrek',
    source: 'Shrek',
    medium: 'movie',
    profile: { O: 45, C: 40, E: 30, A: 65, N: 38 },
    blurb:
      'Built the fence, posted the signs, and still ends up hosting everyone eventually. Gruff on purpose, soft by accident.',
  },
  {
    id: 'vito-corleone',
    name: 'Vito Corleone',
    source: 'The Godfather',
    medium: 'movie',
    profile: { O: 50, C: 85, E: 40, A: 52, N: 30 },
    blurb:
      'Speaks once, quietly, and the room rearranges itself around what he said. Treats every favor as a long-term investment.',
  },

  // --- TV (18) ---
  {
    id: 'michael-scott',
    name: 'Michael Scott',
    source: 'The Office',
    medium: 'tv',
    profile: { O: 60, C: 32, E: 92, A: 70, N: 58 },
    blurb:
      'Needs to be liked more than he needs almost anything else, and will say something regrettable trying to get there. Means well at a volume nobody asked for.',
  },
  {
    id: 'leslie-knope',
    name: 'Leslie Knope',
    source: 'Parks and Recreation',
    medium: 'tv',
    profile: { O: 72, C: 92, E: 85, A: 82, N: 42 },
    blurb:
      'Has a binder for the binder. Loves her town and her friends with an intensity most people reserve for emergencies.',
  },
  {
    id: 'walter-white',
    name: 'Walter White',
    source: 'Breaking Bad',
    medium: 'tv',
    profile: { O: 60, C: 88, E: 32, A: 22, N: 72 },
    blurb:
      'Was underestimated for decades and kept a precise mental ledger of it. Extremely good at exactly one terrible decision, applied consistently.',
  },
  {
    id: 'ted-lasso',
    name: 'Ted Lasso',
    source: 'Ted Lasso',
    medium: 'tv',
    profile: { O: 62, C: 58, E: 82, A: 95, N: 28 },
    blurb:
      "Brings biscuits to a fight nobody thought he could win. Believes in people slightly more than they believe in themselves, on purpose.",
  },
  {
    id: 'sheldon-cooper',
    name: 'Sheldon Cooper',
    source: 'The Big Bang Theory',
    medium: 'tv',
    profile: { O: 78, C: 92, E: 14, A: 28, N: 62 },
    blurb:
      'Has a spot, a schedule, and an extremely firm opinion about both. Correct more often than is socially convenient for anyone involved.',
  },
  {
    id: 'daenerys-targaryen',
    name: 'Daenerys Targaryen',
    source: 'Game of Thrones',
    medium: 'tv',
    profile: { O: 60, C: 64, E: 70, A: 48, N: 60 },
    blurb:
      'Arrives with a plan, a title, and increasingly less patience for people who doubt either. Believes the ends have earned some latitude on the means.',
  },
  {
    id: 'ron-swanson',
    name: 'Ron Swanson',
    source: 'Parks and Recreation',
    medium: 'tv',
    profile: { O: 32, C: 82, E: 14, A: 56, N: 14 },
    blurb:
      'Owns exactly the amount of furniture he needs and made most of it himself. Says less than everyone else in the room and means more of it.',
  },
  {
    id: 'monica-geller',
    name: 'Monica Geller',
    source: 'Friends',
    medium: 'tv',
    profile: { O: 42, C: 96, E: 64, A: 64, N: 60 },
    blurb:
      "Alphabetizes things that don't strictly need alphabetizing. Competitive about games nobody else realized were being played.",
  },
  {
    id: 'homer-simpson',
    name: 'Homer Simpson',
    source: 'The Simpsons',
    medium: 'tv',
    profile: { O: 28, C: 14, E: 70, A: 72, N: 42 },
    blurb:
      'Forgets the plan, forgets the consequences, never forgets where the food is. Loves his family loudly and imperfectly.',
  },
  {
    id: 'eleven',
    name: 'Eleven',
    source: 'Stranger Things',
    medium: 'tv',
    profile: { O: 55, C: 48, E: 24, A: 76, N: 66 },
    blurb:
      'Says the fewest words necessary and means every one of them. Fiercely protective of a small, strange found family.',
  },
  {
    id: 'jessica-fletcher',
    name: 'Jessica Fletcher',
    source: 'Murder, She Wrote',
    medium: 'tv',
    profile: { O: 75, C: 82, E: 60, A: 76, N: 24 },
    blurb:
      "Notices the detail everyone else walked past on the way to a much worse conclusion. Unbothered by how often people underestimate a quiet mystery writer.",
  },
  {
    id: 'tony-soprano',
    name: 'Tony Soprano',
    source: 'The Sopranos',
    medium: 'tv',
    profile: { O: 45, C: 54, E: 60, A: 30, N: 76 },
    blurb:
      'Runs two lives on two different sets of rules and is exhausted by both of them. Talks about his mother more than he’d like to admit.',
  },
  {
    id: 'phoebe-buffay',
    name: 'Phoebe Buffay',
    source: 'Friends',
    medium: 'tv',
    profile: { O: 92, C: 24, E: 66, A: 80, N: 48 },
    blurb:
      "Writes the song nobody asked for and performs it anyway, unbothered by the room's reaction. Says the true thing everyone else was too polite to say.",
  },
  {
    id: 'dwight-schrute',
    name: 'Dwight Schrute',
    source: 'The Office',
    medium: 'tv',
    profile: { O: 55, C: 90, E: 58, A: 34, N: 48 },
    blurb:
      'Has a contingency plan for the contingency plan. Extremely serious about things nobody else in the room considers serious at all.',
  },
  {
    id: 'olivia-benson',
    name: 'Olivia Benson',
    source: 'Law & Order: SVU',
    medium: 'tv',
    profile: { O: 52, C: 82, E: 54, A: 78, N: 44 },
    blurb:
      "Has done the same difficult job for decades without becoming numb to it. The person people trust with the thing they haven't told anyone else.",
  },
  {
    id: 'kim-possible',
    name: 'Kim Possible',
    source: 'Kim Possible',
    medium: 'tv',
    profile: { O: 66, C: 72, E: 76, A: 80, N: 28 },
    blurb:
      'Handles the villain, the homework, and the school dance in the same afternoon without breaking a sweat about any of it. Genuinely, unfairly good at everything.',
  },
  {
    id: 'cristina-yang',
    name: 'Cristina Yang',
    source: "Grey's Anatomy",
    medium: 'tv',
    profile: { O: 76, C: 86, E: 58, A: 38, N: 66 },
    blurb:
      "Wants to be the best in the room more than she wants to be liked in it, and generally gets both anyway. Doesn't do sentimental, except exactly once when it counts.",
  },
  {
    id: 'abed-nadir',
    name: 'Abed Nadir',
    source: 'Community',
    medium: 'tv',
    profile: { O: 85, C: 55, E: 35, A: 60, N: 40 },
    blurb:
      'Narrates the situation more clearly than anyone actually living through it. Notices the pattern three episodes before everyone else catches up.',
  },

  // --- ISU (21) — real historical figures. Blurbs are factual, sourced statements
  // about documented achievements, not invented psychological characterization.
  {
    id: 'george-washington-carver',
    name: 'George Washington Carver',
    source: "ISU's First Black Student & Faculty Member",
    medium: 'isu',
    profile: { O: 80, C: 85, E: 35, A: 80, N: 45 },
    blurb:
      "Iowa State's first Black student and, later, first Black faculty member, spent his career finding dozens of new uses for peanuts and sweet potatoes to help Southern farmers escape a one-crop cotton economy.",
  },
  {
    id: 'john-atanasoff',
    name: 'John Vincent Atanasoff',
    source: 'ISU Physics Professor',
    medium: 'isu',
    profile: { O: 82, C: 78, E: 30, A: 50, N: 45 },
    blurb:
      'As an Iowa State physics professor, built the Atanasoff-Berry Computer in a basement with graduate student Clifford Berry — now recognized as the first electronic digital computer.',
  },
  {
    id: 'george-beadle',
    name: 'George Beadle',
    source: 'ISU Alumnus, Class of 1926 & 1928',
    medium: 'isu',
    profile: { O: 75, C: 80, E: 45, A: 55, N: 40 },
    blurb:
      "Earned his bachelor's and master's degrees at Iowa State before going on to win the 1958 Nobel Prize in Physiology or Medicine for showing how genes control biochemical reactions.",
  },
  {
    id: 'theodore-schultz',
    name: 'Theodore W. Schultz',
    source: 'ISU Agricultural Economics Faculty, 1930–1943',
    medium: 'isu',
    profile: { O: 65, C: 80, E: 55, A: 55, N: 45 },
    blurb:
      "Taught agricultural economics at Iowa State for over a decade, then resigned in 1943 in protest of political interference with his department's research — and was on the Iowa State campus as a guest lecturer decades later when he learned he'd won the 1979 Nobel Prize in Economics.",
  },
  {
    id: 'henry-wallace',
    name: 'Henry A. Wallace',
    source: 'ISU Alumnus, Animal Husbandry',
    medium: 'isu',
    profile: { O: 78, C: 70, E: 55, A: 60, N: 45 },
    blurb:
      'Studied animal husbandry at Iowa State, went on to develop early hybrid corn varieties, and later served as U.S. Vice President under Franklin D. Roosevelt.',
  },
  {
    id: 'carrie-chapman-catt',
    name: 'Carrie Chapman Catt',
    source: 'ISU Alumna',
    medium: 'isu',
    profile: { O: 70, C: 85, E: 75, A: 60, N: 40 },
    blurb:
      'An Iowa State graduate who led the final push for the 19th Amendment as president of the National American Woman Suffrage Association, then founded the League of Women Voters.',
  },
  {
    id: 'dan-shechtman',
    name: 'Dan Shechtman',
    source: 'ISU Materials Science Professor',
    medium: 'isu',
    profile: { O: 85, C: 82, E: 50, A: 55, N: 40 },
    blurb:
      'An Iowa State materials science professor who spent years being dismissed — and was even asked to leave his research group — after discovering quasicrystals, a finding that eventually won him the 2011 Nobel Prize in Chemistry.',
  },
  {
    id: 'jack-trice',
    name: 'Jack Trice',
    source: "ISU's First Black Athlete",
    medium: 'isu',
    profile: { O: 55, C: 75, E: 60, A: 70, N: 40 },
    blurb:
      "Iowa State's first Black athlete, whose letter written the night before his final game — vowing to represent his race well — is still read at Iowa State events; the university's football stadium bears his name.",
  },
  {
    id: 'william-t-smith',
    name: 'William T. Smith',
    source: 'ISU Alumnus, Wrestling',
    medium: 'isu',
    profile: { O: 50, C: 80, E: 55, A: 60, N: 35 },
    blurb:
      'An Iowa State alum who won Olympic gold in freestyle wrestling at the 1952 Helsinki Games.',
  },
  {
    id: 'dan-gable',
    name: 'Dan Gable',
    source: 'ISU Alumnus, Wrestling',
    medium: 'isu',
    profile: { O: 45, C: 95, E: 55, A: 55, N: 40 },
    blurb:
      'Lost only one match in his entire Iowa State wrestling career, then went on to win Olympic gold in 1972 without surrendering a single point.',
  },
  {
    id: 'jay-hormel',
    name: 'Jay C. Hormel',
    source: 'ISU Alumnus, Class of 1905',
    medium: 'isu',
    profile: { O: 60, C: 80, E: 60, A: 55, N: 40 },
    blurb:
      'An Iowa State graduate who led Hormel Foods for decades, including introducing Spam in 1937.',
  },
  {
    id: 'clayton-anderson',
    name: 'Clayton Anderson',
    source: 'ISU Aerospace Engineering Alumnus',
    medium: 'isu',
    profile: { O: 65, C: 75, E: 60, A: 70, N: 35 },
    blurb:
      "Earned his master's in aerospace engineering at Iowa State before becoming a NASA astronaut, logging 167 days in space including a five-month stay aboard the International Space Station.",
  },
  {
    id: 'jane-smiley',
    name: 'Jane Smiley',
    source: 'ISU English Faculty',
    medium: 'isu',
    profile: { O: 88, C: 65, E: 45, A: 60, N: 50 },
    blurb:
      'Taught English at Iowa State for about fifteen years before winning the 1992 Pulitzer Prize for Fiction for A Thousand Acres, a novel reimagining King Lear on an Iowa farm.',
  },
  {
    id: 'harold-nichols',
    name: 'Harold Nichols',
    source: 'ISU Head Wrestling Coach',
    medium: 'isu',
    profile: { O: 50, C: 88, E: 50, A: 55, N: 35 },
    blurb:
      'Coached Iowa State wrestling for 32 seasons, winning six NCAA team championships and 38 individual titles before his 1997 induction into the National Wrestling Hall of Fame.',
  },
  {
    id: 'elmina-wilson',
    name: 'Elmina Wilson',
    source: "ISU's First Woman Engineering Professor",
    medium: 'isu',
    profile: { O: 75, C: 85, E: 45, A: 55, N: 40 },
    blurb:
      "Became Iowa State's first woman engineering professor after earning the first master's degree awarded to a woman in civil engineering in the United States.",
  },
  {
    id: 'terry-anderson',
    name: 'Terry Anderson',
    source: 'ISU Journalism Alumnus',
    medium: 'isu',
    profile: { O: 70, C: 70, E: 55, A: 60, N: 55 },
    blurb:
      'An Iowa State journalism graduate who covered conflicts across the Middle East for the Associated Press and was held hostage in Lebanon for nearly seven years, the longest-held American captive of the crisis.',
  },
  {
    id: 'robert-sennewald',
    name: 'Robert W. Sennewald',
    source: 'ISU Alumnus, U.S. Army',
    medium: 'isu',
    profile: { O: 50, C: 85, E: 60, A: 55, N: 35 },
    blurb:
      "An Iowa State graduate who rose to four-star general, commanding the U.S. Army's Forces Command and, later, the Eighth United States Army in Korea.",
  },
  {
    id: 'cael-sanderson',
    name: 'Cael Sanderson',
    source: 'ISU Alumnus, Wrestling',
    medium: 'isu',
    profile: { O: 50, C: 95, E: 50, A: 55, N: 30 },
    blurb:
      "Finished his Iowa State wrestling career a perfect 159-0 — still the only undefeated four-time NCAA champion in the sport's history — then won Olympic gold in 2004.",
  },
  {
    id: 'florence-kimball-stoufer',
    name: 'Florence Kimball Stoufer',
    source: 'ISU Alumna, Class of 1908',
    medium: 'isu',
    profile: { O: 75, C: 80, E: 55, A: 60, N: 35 },
    blurb:
      'Became the first woman to graduate from Iowa State with a degree in mechanical engineering in 1908, while also playing on the women’s varsity hockey team.',
  },
  {
    id: 'ross-rowell',
    name: 'Ross E. Rowell',
    source: 'ISU Alumnus, U.S. Marine Corps',
    medium: 'isu',
    profile: { O: 55, C: 80, E: 55, A: 50, N: 35 },
    blurb:
      'An Iowa State graduate who became a Marine Corps lieutenant general and a pioneer of Marine aviation, including early combat use of dive bombing.',
  },
  {
    id: 'harley-wilhelm',
    name: 'Harley A. Wilhelm',
    source: 'ISU Chemistry Professor',
    medium: 'isu',
    profile: { O: 78, C: 88, E: 40, A: 55, N: 35 },
    blurb:
      "An Iowa State chemistry professor who, with Frank Spedding, developed the 'Ames process' during the Manhattan Project — scaling up to produce a ton of pure uranium metal a day; Wilhelm Hall on campus is named for him.",
  },
]

export default characters
```

---

### Task 1: Add `Medium` type and `medium` field

**Goal:** Extend the shared types so every character can be tagged with which of the four categories it belongs to.

**Files:**
- Modify: `src/lib/types.ts`

**Acceptance Criteria:**
- [ ] `Medium` type exported as `'book' | 'movie' | 'tv' | 'isu'`
- [ ] `CharacterEntry` has a required `medium: Medium` field
- [ ] `Matches` type exported as `Record<Medium, CharacterEntry>`

**Verify:** `npm run build` (type errors will surface immediately since `characters.ts` doesn't have `medium` yet at this point — that's expected and fixed in Task 2)

**Steps:**

- [ ] **Step 1: Edit `src/lib/types.ts`**

Add this new type just above the `CharacterEntry` interface:

```ts
export type Medium = 'book' | 'movie' | 'tv' | 'isu'
```

Change the `CharacterEntry` interface from:

```ts
export interface CharacterEntry {
  id: string
  name: string
  source: string
  profile: CharacterProfile
  blurb: string
}
```

to:

```ts
export interface CharacterEntry {
  id: string
  name: string
  source: string
  medium: Medium
  profile: CharacterProfile
  blurb: string
}
```

Add this new type at the end of the file:

```ts
export type Matches = Record<Medium, CharacterEntry>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "Add Medium type and medium field to CharacterEntry"
```

(This commit will leave `characters.ts` failing to type-check against the now-required `medium` field — that's expected and resolved by Task 2, which replaces the whole file. Do not attempt to patch `characters.ts` in this task.)

---

### Task 2: Replace the character roster with the full 75-entry, medium-tagged version

**Goal:** Grow the roster from 20 to 75 characters (18 book / 18 movie / 18 TV / 21 ISU), with every entry tagged by `medium`.

**Files:**
- Modify: `src/data/characters.ts`
- Modify: `src/data/characters.test.ts`

**Acceptance Criteria:**
- [ ] Exactly 75 characters total
- [ ] Exactly 18 `book`, 18 `movie`, 18 `tv`, 21 `isu`
- [ ] Unique ids across all 75
- [ ] All profile values within 0-100
- [ ] Every character has a non-empty blurb

**Verify:** `npm test` → all tests pass

**Steps:**

- [ ] **Step 1: Replace `src/data/characters.ts` entirely**

Use the complete file content from the "Reference: full replacement `src/data/characters.ts`" section at the top of this plan. Copy it verbatim — do not paraphrase or re-derive the character data.

- [ ] **Step 2: Update `src/data/characters.test.ts`**

Replace the file entirely with:

```ts
import { describe, it, expect } from 'vitest'
import characters from './characters'

describe('characters data', () => {
  it('has exactly 75 characters', () => {
    expect(characters).toHaveLength(75)
  })

  it('has 18 book, 18 movie, 18 tv, and 21 isu characters', () => {
    const counts: Record<string, number> = {}
    for (const c of characters) {
      counts[c.medium] = (counts[c.medium] ?? 0) + 1
    }
    expect(counts).toEqual({ book: 18, movie: 18, tv: 18, isu: 21 })
  })

  it('has unique ids', () => {
    const ids = new Set(characters.map((c) => c.id))
    expect(ids.size).toBe(characters.length)
  })

  it('keeps every profile value within 0-100', () => {
    const domains = ['O', 'C', 'E', 'A', 'N'] as const
    for (const character of characters) {
      for (const domain of domains) {
        expect(character.profile[domain]).toBeGreaterThanOrEqual(0)
        expect(character.profile[domain]).toBeLessThanOrEqual(100)
      }
    }
  })

  it('gives every character a non-empty blurb', () => {
    expect(characters.every((c) => c.blurb.trim().length > 0)).toBe(true)
  })
})
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: PASS — all tests including the updated `characters.test.ts`

- [ ] **Step 4: Run the build**

Run: `npm run build`
Expected: exits 0 (the `medium` field type error from Task 1 is now resolved)

- [ ] **Step 5: Commit**

```bash
git add src/data/characters.ts src/data/characters.test.ts
git commit -m "Grow character roster to 75 entries across book/movie/tv/isu"
```

---

### Task 3: Add `findMatchesByMedium`

**Goal:** Given a test-taker's scores, return the nearest character within each of the four media, independently.

**Files:**
- Modify: `src/lib/matching.ts`
- Modify: `src/lib/matching.test.ts`

**Acceptance Criteria:**
- [ ] Returns one `CharacterEntry` per medium (`book`, `movie`, `tv`, `isu`)
- [ ] Each is the nearest match within that medium's subset of the roster, not the whole roster
- [ ] Reuses the existing `findClosestCharacter` function rather than duplicating its logic

**Verify:** `npm test` → matching tests pass

**Steps:**

- [ ] **Step 1: Add the failing tests**

Append to `src/lib/matching.test.ts` (keep the existing `findClosestCharacter` describe block and tests exactly as they are; add this new block below them):

```ts
import { findMatchesByMedium } from './matching'
import type { Medium } from './types'

describe('findMatchesByMedium', () => {
  const mixedRoster: CharacterEntry[] = [
    { id: 'book-a', name: 'Book A', source: 'Test', blurb: '', medium: 'book', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'book-b', name: 'Book B', source: 'Test', blurb: '', medium: 'book', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
    { id: 'movie-a', name: 'Movie A', source: 'Test', blurb: '', medium: 'movie', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'movie-b', name: 'Movie B', source: 'Test', blurb: '', medium: 'movie', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
    { id: 'tv-a', name: 'TV A', source: 'Test', blurb: '', medium: 'tv', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'tv-b', name: 'TV B', source: 'Test', blurb: '', medium: 'tv', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
    { id: 'isu-a', name: 'ISU A', source: 'Test', blurb: '', medium: 'isu', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
    { id: 'isu-b', name: 'ISU B', source: 'Test', blurb: '', medium: 'isu', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
  ]

  it('finds the nearest match independently within each medium', () => {
    const scores = makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 })
    const matches = findMatchesByMedium(scores, mixedRoster)

    expect(matches.book.id).toBe('book-b')
    expect(matches.movie.id).toBe('movie-b')
    expect(matches.tv.id).toBe('tv-b')
    expect(matches.isu.id).toBe('isu-b')
  })

  it('does not let one medium leak into another', () => {
    const scores = makeScores({ O: 12, C: 12, E: 12, A: 12, N: 12 })
    const matches = findMatchesByMedium(scores, mixedRoster)

    const mediums: Medium[] = ['book', 'movie', 'tv', 'isu']
    for (const medium of mediums) {
      expect(matches[medium].medium).toBe(medium)
    }
  })
})
```

Note: this reuses the `makeScores` helper already defined earlier in the file for the `findClosestCharacter` tests — don't redefine it. Also add `CharacterEntry` to the existing type-only import from `./types` at the top of the file if it isn't already imported.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `findMatchesByMedium` is not exported from `./matching`

- [ ] **Step 3: Add `findMatchesByMedium` to `src/lib/matching.ts`**

Add this below the existing `findClosestCharacter` function (keep `findClosestCharacter` unchanged):

```ts
import type { CharacterEntry, DomainKey, Medium, Matches, Scores } from './types'

const MEDIUMS: Medium[] = ['book', 'movie', 'tv', 'isu']

export function findMatchesByMedium(scores: Scores, roster: CharacterEntry[]): Matches {
  const matches = {} as Matches
  for (const medium of MEDIUMS) {
    const subset = roster.filter((character) => character.medium === medium)
    matches[medium] = findClosestCharacter(scores, subset)
  }
  return matches
}
```

Update the file's existing top import line to include `Medium` and `Matches`:

```ts
import type { CharacterEntry, DomainKey, Medium, Matches, Scores } from './types'
```

(Remove the duplicate import line if you added a second one in Step 3 above — there should be exactly one `import type` line at the top of the file.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/matching.ts src/lib/matching.test.ts
git commit -m "Add findMatchesByMedium for per-category character matching"
```

---

### Task 4: Update `ResultsScreen` to show four labeled matches

**Goal:** Replace the single dust-jacket card with four, each labeled by category.

**Files:**
- Modify: `src/components/ResultsScreen.tsx`
- Modify: `src/components/ResultsScreen.test.tsx`
- Modify: `src/index.css`

**Acceptance Criteria:**
- [ ] Renders four `DustJacketCard`s: book, movie, tv, isu (in that order)
- [ ] Each is preceded by a visible label naming its category ("Book Match", "Movie Match", "TV Match", "ISU Connection")
- [ ] The five trait-score bars are unchanged
- [ ] `DustJacketCard.tsx` itself is NOT modified — reuse it as-is

**Verify:** `npm test` → ResultsScreen tests pass

**Steps:**

- [ ] **Step 1: Replace `src/components/ResultsScreen.test.tsx` entirely**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResultsScreen from './ResultsScreen'
import type { CharacterEntry, DomainKey, Matches, Scores, TraitInfo, TraitNote } from '../lib/types'

const domains: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
const labels: Record<DomainKey, string> = {
  O: 'Openness',
  C: 'Conscientiousness',
  E: 'Extraversion',
  A: 'Agreeableness',
  N: 'Neuroticism',
}

const scores: Scores = domains.reduce((acc, d) => {
  acc[d] = { average: 3, normalized: 50, result: 'neutral' }
  return acc
}, {} as Scores)

const traitInfos: TraitInfo[] = domains.map((d) => ({
  domain: d,
  label: labels[d],
  description: `${labels[d]} description`,
}))
const traitNotes: TraitNote[] = domains.map((d) => ({
  domain: d,
  high: `${labels[d]} high`,
  low: `${labels[d]} low`,
}))

function makeCharacter(id: string, name: string, medium: CharacterEntry['medium']): CharacterEntry {
  return { id, name, source: 'Test Source', medium, blurb: 'Blurb text', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } }
}

const matches: Matches = {
  book: makeCharacter('book-char', 'Book Character', 'book'),
  movie: makeCharacter('movie-char', 'Movie Character', 'movie'),
  tv: makeCharacter('tv-char', 'TV Character', 'tv'),
  isu: makeCharacter('isu-char', 'ISU Figure', 'isu'),
}

describe('ResultsScreen', () => {
  it('renders all four category matches, labeled, plus all five trait bars', () => {
    render(
      <ResultsScreen scores={scores} matches={matches} traitInfos={traitInfos} traitNotes={traitNotes} />,
    )

    expect(screen.getByText('Book Match')).toBeInTheDocument()
    expect(screen.getByText('Book Character')).toBeInTheDocument()
    expect(screen.getByText('Movie Match')).toBeInTheDocument()
    expect(screen.getByText('Movie Character')).toBeInTheDocument()
    expect(screen.getByText('TV Match')).toBeInTheDocument()
    expect(screen.getByText('TV Character')).toBeInTheDocument()
    expect(screen.getByText('ISU Connection')).toBeInTheDocument()
    expect(screen.getByText('ISU Figure')).toBeInTheDocument()

    for (const domain of domains) {
      expect(screen.getByText(labels[domain])).toBeInTheDocument()
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `ResultsScreen` doesn't yet accept a `matches` prop

- [ ] **Step 3: Replace `src/components/ResultsScreen.tsx` entirely**

```tsx
import type { DomainKey, Matches, Medium, Scores, TraitInfo, TraitNote } from '../lib/types'
import TraitScoreBar from './TraitScoreBar'
import DustJacketCard from './DustJacketCard'

const DOMAIN_ORDER: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

const MEDIUM_SECTIONS: { medium: Medium; label: string }[] = [
  { medium: 'book', label: 'Book Match' },
  { medium: 'movie', label: 'Movie Match' },
  { medium: 'tv', label: 'TV Match' },
  { medium: 'isu', label: 'ISU Connection' },
]

interface ResultsScreenProps {
  scores: Scores
  matches: Matches
  traitInfos: TraitInfo[]
  traitNotes: TraitNote[]
}

function ResultsScreen({ scores, matches, traitInfos, traitNotes }: ResultsScreenProps) {
  return (
    <div className="results">
      <div className="matches">
        {MEDIUM_SECTIONS.map(({ medium, label }) => (
          <div className="match-section" key={medium}>
            <p className="match-label">{label}</p>
            <DustJacketCard character={matches[medium]} />
          </div>
        ))}
      </div>
      <div className="trait-bars">
        {DOMAIN_ORDER.map((domain) => {
          const info = traitInfos.find((t) => t.domain === domain)
          const note = traitNotes.find((t) => t.domain === domain)
          if (!info || !note) {
            throw new Error(`Missing trait content for domain: ${domain}`)
          }
          return <TraitScoreBar key={domain} info={info} score={scores[domain]} note={note} />
        })}
      </div>
    </div>
  )
}

export default ResultsScreen
```

- [ ] **Step 4: Add styles for the new sections to `src/index.css`**

Append to the end of the file:

```css
.matches {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.match-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #6b5b3a;
  margin: 0 0 6px;
}

@media (min-width: 700px) {
  .matches {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/ResultsScreen.tsx src/components/ResultsScreen.test.tsx src/index.css
git commit -m "Show four labeled category matches in ResultsScreen"
```

---

### Task 5: Wire `App.tsx` to the new matches object

**Goal:** `App.tsx` calls `findMatchesByMedium` instead of `findClosestCharacter` and passes `matches` through to `ResultsScreen`.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Acceptance Criteria:**
- [ ] Full 120-question flow reaches a results screen showing all four category matches
- [ ] Uses `findMatchesByMedium`, not the old single-match `findClosestCharacter`

**Verify:** `npm test` → full App integration test passes

**Steps:**

- [ ] **Step 1: Replace `src/App.test.tsx` entirely**

```tsx
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

  it('walks through the full quiz to a results screen with all four category matches', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /start the test/i }))

    const pageCount = Math.ceil(questions.length / 10)
    for (let i = 0; i < pageCount; i++) {
      answerAllVisibleQuestions('Very Accurate')
      const buttonName = i === pageCount - 1 ? /see results/i : /next/i
      fireEvent.click(screen.getByRole('button', { name: buttonName }))
    }

    expect(screen.getByText('Book Match')).toBeInTheDocument()
    expect(screen.getByText('Movie Match')).toBeInTheDocument()
    expect(screen.getByText('TV Match')).toBeInTheDocument()
    expect(screen.getByText('ISU Connection')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `App.tsx` still calls `findClosestCharacter` and passes `character`, not `matches`

- [ ] **Step 3: Update `src/App.tsx`**

Change the import line:

```ts
import { findClosestCharacter } from './lib/matching'
```

to:

```ts
import { findMatchesByMedium } from './lib/matching'
```

Change the type import line:

```ts
import type { Answer, CharacterEntry, Scores } from './lib/types'
```

to:

```ts
import type { Answer, Matches, Scores } from './lib/types'
```

Change the state declaration:

```ts
const [character, setCharacter] = useState<CharacterEntry | null>(null)
```

to:

```ts
const [matches, setMatches] = useState<Matches | null>(null)
```

Change `handleComplete`:

```ts
function handleComplete(answers: Answer[]) {
  const computedScores = scoreAnswers(answers)
  const match = findClosestCharacter(computedScores, characters)
  setScores(computedScores)
  setCharacter(match)
  setStage('results')
}
```

to:

```ts
function handleComplete(answers: Answer[]) {
  const computedScores = scoreAnswers(answers)
  const foundMatches = findMatchesByMedium(computedScores, characters)
  setScores(computedScores)
  setMatches(foundMatches)
  setStage('results')
}
```

Change the results render block:

```tsx
{stage === 'results' && scores && character && (
  <ResultsScreen scores={scores} character={character} traitInfos={traitInfo} traitNotes={traitNotes} />
)}
```

to:

```tsx
{stage === 'results' && scores && matches && (
  <ResultsScreen scores={scores} matches={matches} traitInfos={traitInfo} traitNotes={traitNotes} />
)}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — both App tests green

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "Wire App to per-category matches instead of a single overall match"
```

---

### Task 6: Final verification

**Goal:** Confirm the whole app builds, tests cleanly, and visually shows four distinct, correctly-labeled matches.

**Files:** None (verification only)

**Acceptance Criteria:**
- [ ] `npm test` and `npm run build` both succeed
- [ ] Manual run-through in the browser shows four different, correctly-labeled cards

**Verify:** `npm test && npm run build` → both succeed

**Steps:**

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — all tests across every task green

- [ ] **Step 2: Run the build**

Run: `npm run build`
Expected: exits 0

- [ ] **Step 3: Manual check**

Start the dev server (`npm run dev`), click through Start → answer all 120 questions → confirm the results screen shows four labeled cards (Book Match, Movie Match, TV Match, ISU Connection), each with a different character/name, plus the five trait bars below. Stop the dev server when done.

- [ ] **Step 4: No commit needed for this task** (verification only — nothing to stage)

---

## Self-Review Notes

- **Spec coverage:** four independent per-medium matches (Task 3), 75-entry roster with correct 18/18/18/21 split (Task 2), real ISU figures held to a factual (not invented-psychology) content standard with conservative Neuroticism (all ISU entries authored per the addendum's stated standard), four labeled result cards with `DustJacketCard` reused unchanged (Task 4), full wiring (Task 5).
- **Type consistency:** `Medium`, `Matches` types defined once in Task 1's `types.ts` and used identically in `matching.ts`, `ResultsScreen.tsx`, and `App.tsx`.
- **No placeholders:** all 75 character entries, all new tests, and all component/logic code are written out in full above.
