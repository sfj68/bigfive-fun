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
