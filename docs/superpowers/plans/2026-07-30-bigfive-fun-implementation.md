# bigfive-fun Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client-side Big Five personality test that shows real trait scores alongside a "dust jacket" fictional-character match.

**Architecture:** A single Vite + React + TypeScript static app with no backend. The 120-item IPIP-NEO question bank and scoring rules are ported from the MIT-licensed [bigfive-web](https://github.com/rubynor/bigfive-web) project; the character roster, matching algorithm, and result UI are original to this project.

**Tech Stack:** React 18, TypeScript, Vite, Vitest + @testing-library/react for tests.

---

## Reference: shared types

Every task below imports from `src/lib/types.ts`, created in Task 2. For reference, its final shape is:

```ts
export type DomainKey = 'O' | 'C' | 'E' | 'A' | 'N'

export interface QuestionItem {
  id: string
  text: string
  keyed: 'plus' | 'minus'
  domain: DomainKey
  facet: number
}

export interface Choice {
  text: string
  score: number
  color: number
}

export interface ChoiceSet {
  plus: Choice[]
  minus: Choice[]
}

export interface Answer {
  domain: DomainKey
  score: number
}

export interface DomainResult {
  average: number // 1-5
  normalized: number // 0-100
  result: 'low' | 'neutral' | 'high'
}

export type Scores = Record<DomainKey, DomainResult>

export interface CharacterProfile {
  O: number
  C: number
  E: number
  A: number
  N: number
}

export interface CharacterEntry {
  id: string
  name: string
  source: string
  profile: CharacterProfile
  blurb: string
}

export interface TraitInfo {
  domain: DomainKey
  label: string
  description: string
}

export interface TraitNote {
  domain: DomainKey
  high: string
  low: string
}
```

---

### Task 1: Project scaffold

**Goal:** A working Vite + React + TypeScript + Vitest project that builds and has one passing test.

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/setupTests.ts`
- Create: `src/index.css`
- Create: `src/App.tsx`
- Test: `src/App.test.tsx`
- Modify: `.gitignore`

**Acceptance Criteria:**
- [ ] `npm run build` succeeds and produces a `dist/` directory
- [ ] `npm test` runs and passes

**Verify:** `npm test` → 1 passed; `npm run build` → exits 0

**Steps:**

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "bigfive-fun",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.0",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
})
```

- [ ] **Step 4: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>bigfive-fun</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `src/setupTests.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Create `src/index.css`**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background: #faf7f0;
  color: #222;
}

.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}
```

- [ ] **Step 7: Create `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 8: Install dependencies**

Run: `npm install`

- [ ] **Step 9: Write the failing test**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'bigfive-fun' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./App`

- [ ] **Step 11: Create `src/App.tsx`**

```tsx
function App() {
  return (
    <div className="app">
      <h1>bigfive-fun</h1>
    </div>
  )
}

export default App
```

- [ ] **Step 12: Run test to verify it passes**

Run: `npm test`
Expected: PASS — 1 passed

- [ ] **Step 13: Update `.gitignore`**

Add `dist/` to the existing `.gitignore` (alongside `node_modules/`, `.next/`, `.superpowers/`, `.DS_Store`).

- [ ] **Step 14: Verify build**

Run: `npm run build`
Expected: exits 0, `dist/index.html` exists

- [ ] **Step 15: Commit**

```bash
git add package.json tsconfig.json vite.config.ts index.html src .gitignore package-lock.json
git commit -m "Scaffold Vite + React + TypeScript project"
```

---

### Task 2: Port question and choice data

**Goal:** The real 120-item IPIP-NEO question bank and 5-point Likert choice set, typed and verified for integrity.

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/data/questions.ts` (ported)
- Create: `src/data/choices.ts` (ported)
- Test: `src/data/questions.test.ts`
- Test: `src/data/choices.test.ts`
- Create: `THIRD_PARTY_NOTICES.md`

**Acceptance Criteria:**
- [ ] `questions.ts` contains exactly 120 items, 24 per domain, unique ids
- [ ] `choices.ts` contains `plus` (scores 1→5) and `minus` (scores 5→1) sets
- [ ] Source attribution recorded in `THIRD_PARTY_NOTICES.md`

**Verify:** `npm test` → all tests pass, including the new data tests

**Steps:**

- [ ] **Step 1: Create `src/lib/types.ts`**

Use the full type definitions from the "Reference: shared types" section at the top of this plan.

- [ ] **Step 2: Download the ported data files**

These are pinned to a specific commit of `rubynor/bigfive-web` (MIT licensed) for reproducibility:

```bash
mkdir -p src/data
curl -s "https://raw.githubusercontent.com/rubynor/bigfive-web/9d7ff09d4ff01769ef8882809d1c1c9ca1bdc8d7/packages/questions/src/data/en/questions.ts" -o src/data/questions.ts
curl -s "https://raw.githubusercontent.com/rubynor/bigfive-web/9d7ff09d4ff01769ef8882809d1c1c9ca1bdc8d7/packages/questions/src/data/en/choices.ts" -o src/data/choices.ts
```

- [ ] **Step 3: Add types to the downloaded files**

Edit `src/data/questions.ts` — replace the first line:

```
const questions = [
```

with:

```ts
import type { QuestionItem } from '../lib/types'

const questions: QuestionItem[] = [
```

Edit `src/data/choices.ts` — replace the first line:

```
const choices = {
```

with:

```ts
import type { ChoiceSet } from '../lib/types'

const choices: ChoiceSet = {
```

- [ ] **Step 4: Write the data integrity tests**

```ts
// src/data/questions.test.ts
import { describe, it, expect } from 'vitest'
import questions from './questions'

describe('questions data', () => {
  it('has exactly 120 questions', () => {
    expect(questions).toHaveLength(120)
  })

  it('has 24 questions per domain', () => {
    const counts: Record<string, number> = {}
    for (const q of questions) {
      counts[q.domain] = (counts[q.domain] ?? 0) + 1
    }
    expect(counts).toEqual({ O: 24, C: 24, E: 24, A: 24, N: 24 })
  })

  it('has unique ids', () => {
    const ids = new Set(questions.map((q) => q.id))
    expect(ids.size).toBe(120)
  })

  it('only uses plus/minus keying', () => {
    expect(questions.every((q) => q.keyed === 'plus' || q.keyed === 'minus')).toBe(true)
  })
})
```

```ts
// src/data/choices.test.ts
import { describe, it, expect } from 'vitest'
import choices from './choices'

describe('choices data', () => {
  it('has 5 choices for plus and minus', () => {
    expect(choices.plus).toHaveLength(5)
    expect(choices.minus).toHaveLength(5)
  })

  it('plus scores run 1 to 5 in order', () => {
    expect(choices.plus.map((c) => c.score)).toEqual([1, 2, 3, 4, 5])
  })

  it('minus scores are the reverse of plus', () => {
    expect(choices.minus.map((c) => c.score)).toEqual([5, 4, 3, 2, 1])
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all data tests green

- [ ] **Step 6: Create `THIRD_PARTY_NOTICES.md`**

```md
# Third-Party Notices

This project ports data and logic from [bigfive-web](https://github.com/rubynor/bigfive-web)
(commit `9d7ff09d4ff01769ef8882809d1c1c9ca1bdc8d7`), used under the MIT License:

- `src/data/questions.ts` — ported from `packages/questions/src/data/en/questions.ts`
- `src/data/choices.ts` — ported from `packages/questions/src/data/en/choices.ts`
- `src/lib/scoring.ts` — adapted from `packages/score/src/index.ts`

## bigfive-web license

MIT License

Copyright (c) 2024 B5 Holding AS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/types.ts src/data/questions.ts src/data/choices.ts src/data/questions.test.ts src/data/choices.test.ts THIRD_PARTY_NOTICES.md
git commit -m "Port IPIP-NEO question and choice data from bigfive-web"
```

---

### Task 3: Scoring logic

**Goal:** Compute per-domain average, 0-100 normalized score, and high/neutral/low classification from a list of answers.

**Files:**
- Create: `src/lib/scoring.ts`
- Test: `src/lib/scoring.test.ts`

**Acceptance Criteria:**
- [ ] `calculateResult` classifies `>3.5` as `high`, `<2.5` as `low`, else `neutral` (matches the source `@bigfive-org/score` thresholds)
- [ ] `scoreAnswers` returns all five domains even if some have no answers

**Verify:** `npm test` → scoring tests pass

**Steps:**

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/scoring.test.ts
import { describe, it, expect } from 'vitest'
import { calculateResult, scoreAnswers } from './scoring'
import type { Answer } from './types'

describe('calculateResult', () => {
  it('returns "high" above 3.5', () => {
    expect(calculateResult(3.51)).toBe('high')
    expect(calculateResult(5)).toBe('high')
  })

  it('returns "low" below 2.5', () => {
    expect(calculateResult(2.49)).toBe('low')
    expect(calculateResult(1)).toBe('low')
  })

  it('returns "neutral" at the boundaries and in between', () => {
    expect(calculateResult(3.5)).toBe('neutral')
    expect(calculateResult(2.5)).toBe('neutral')
    expect(calculateResult(3)).toBe('neutral')
  })
})

function makeAnswers(domain: Answer['domain'], scores: number[]): Answer[] {
  return scores.map((score) => ({ domain, score }))
}

describe('scoreAnswers', () => {
  it('averages scores per domain and classifies the result', () => {
    const answers: Answer[] = [
      ...makeAnswers('O', [5, 5, 5, 5]),
      ...makeAnswers('C', [1, 1, 1, 1]),
      ...makeAnswers('E', [3, 3, 3, 3]),
      ...makeAnswers('A', [4, 4, 4, 4]),
      ...makeAnswers('N', [2, 2, 2, 2]),
    ]

    const scores = scoreAnswers(answers)

    expect(scores.O).toEqual({ average: 5, normalized: 100, result: 'high' })
    expect(scores.C).toEqual({ average: 1, normalized: 0, result: 'low' })
    expect(scores.E).toEqual({ average: 3, normalized: 50, result: 'neutral' })
    expect(scores.A.result).toBe('high')
    expect(scores.N.result).toBe('low')
  })

  it('returns all five domains even if a domain has no answers', () => {
    const scores = scoreAnswers(makeAnswers('O', [5]))
    expect(Object.keys(scores).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
    expect(scores.C.average).toBe(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find module `./scoring`

- [ ] **Step 3: Create `src/lib/scoring.ts`**

```ts
import type { Answer, DomainKey, Scores } from './types'

const DOMAIN_KEYS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

export function calculateResult(average: number): 'low' | 'neutral' | 'high' {
  if (average > 3.5) return 'high'
  if (average < 2.5) return 'low'
  return 'neutral'
}

export function scoreAnswers(answers: Answer[]): Scores {
  const totals: Record<DomainKey, { sum: number; count: number }> = {
    O: { sum: 0, count: 0 },
    C: { sum: 0, count: 0 },
    E: { sum: 0, count: 0 },
    A: { sum: 0, count: 0 },
    N: { sum: 0, count: 0 },
  }

  for (const answer of answers) {
    totals[answer.domain].sum += answer.score
    totals[answer.domain].count += 1
  }

  const scores = {} as Scores
  for (const key of DOMAIN_KEYS) {
    const { sum, count } = totals[key]
    const average = count === 0 ? 0 : sum / count
    const normalized = ((average - 1) / 4) * 100
    scores[key] = {
      average,
      normalized,
      result: calculateResult(average),
    }
  }
  return scores
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/scoring.ts src/lib/scoring.test.ts
git commit -m "Add domain scoring logic ported from @bigfive-org/score"
```

---

### Task 4: Character roster and trait content

**Goal:** The curated content that powers the fun layer — 20 characters with editorial OCEAN profiles and original dust-jacket blurbs, 10 per-trait one-liners, and 5 neutral trait descriptions.

**Files:**
- Create: `src/data/characters.ts`
- Create: `src/data/traitNotes.ts`
- Create: `src/data/traitInfo.ts`
- Test: `src/data/characters.test.ts`
- Test: `src/data/traitNotes.test.ts`
- Test: `src/data/traitInfo.test.ts`

**Acceptance Criteria:**
- [ ] 20 characters, unique ids, all profile values within 0-100
- [ ] All blurbs are original text (no verbatim quotes from source material)
- [ ] Exactly one trait note entry and one trait info entry per domain

**Verify:** `npm test` → content tests pass

**Steps:**

- [ ] **Step 1: Write the failing tests**

```ts
// src/data/characters.test.ts
import { describe, it, expect } from 'vitest'
import characters from './characters'

describe('characters data', () => {
  it('has at least 20 characters', () => {
    expect(characters.length).toBeGreaterThanOrEqual(20)
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

```ts
// src/data/traitNotes.test.ts
import { describe, it, expect } from 'vitest'
import traitNotes from './traitNotes'

describe('traitNotes data', () => {
  it('has exactly one entry per domain', () => {
    expect(traitNotes.map((t) => t.domain).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
  })

  it('gives every domain a non-empty high and low note', () => {
    for (const note of traitNotes) {
      expect(note.high.trim().length).toBeGreaterThan(0)
      expect(note.low.trim().length).toBeGreaterThan(0)
    }
  })
})
```

```ts
// src/data/traitInfo.test.ts
import { describe, it, expect } from 'vitest'
import traitInfo from './traitInfo'

describe('traitInfo data', () => {
  it('has exactly one entry per domain', () => {
    expect(traitInfo.map((t) => t.domain).sort()).toEqual(['A', 'C', 'E', 'N', 'O'])
  })

  it('gives every domain a label and description', () => {
    for (const info of traitInfo) {
      expect(info.label.trim().length).toBeGreaterThan(0)
      expect(info.description.trim().length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find modules `./characters`, `./traitNotes`, `./traitInfo`

- [ ] **Step 3: Create `src/data/characters.ts`**

```ts
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
```

- [ ] **Step 4: Create `src/data/traitNotes.ts`**

```ts
import type { TraitNote } from '../lib/types'

const traitNotes: TraitNote[] = [
  {
    domain: 'O',
    high: "You'd rather read the unfamiliar menu than order the usual.",
    low: "You've found what works and see no reason to renovate it.",
  },
  {
    domain: 'C',
    high: "Your future self already thanked you for today's to-do list.",
    low: "Plans are more of a suggestion than a schedule, and that's fine by you.",
  },
  {
    domain: 'E',
    high: 'A quiet room feels like a problem waiting to be solved.',
    low: 'One good conversation outlasts ten good parties.',
  },
  {
    domain: 'A',
    high: 'You assume good faith first and make people prove you wrong.',
    low: "You'd rather be right than be liked, and usually you're both anyway.",
  },
  {
    domain: 'N',
    high: "You've rehearsed the worst-case scenario enough times to have notes.",
    low: 'Very little keeps you up at night, including the things that probably should.',
  },
]

export default traitNotes
```

- [ ] **Step 5: Create `src/data/traitInfo.ts`**

```ts
import type { TraitInfo } from '../lib/types'

const traitInfo: TraitInfo[] = [
  {
    domain: 'O',
    label: 'Openness',
    description: 'How much you seek out new ideas, art, and experience versus the familiar and concrete.',
  },
  {
    domain: 'C',
    label: 'Conscientiousness',
    description: 'How organized, disciplined, and goal-directed you tend to be.',
  },
  {
    domain: 'E',
    label: 'Extraversion',
    description: 'How much you draw energy from other people and social activity versus solitude.',
  },
  {
    domain: 'A',
    label: 'Agreeableness',
    description: "How much you prioritize cooperation and others' feelings versus your own agenda.",
  },
  {
    domain: 'N',
    label: 'Neuroticism',
    description: 'How readily you experience stress, worry, and negative emotion.',
  },
]

export default traitInfo
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/data/characters.ts src/data/traitNotes.ts src/data/traitInfo.ts src/data/characters.test.ts src/data/traitNotes.test.ts src/data/traitInfo.test.ts
git commit -m "Add curated character roster and trait content"
```

---

### Task 5: Matching algorithm

**Goal:** Find the character whose profile is nearest (Euclidean distance) to a test-taker's normalized scores.

**Files:**
- Create: `src/lib/matching.ts`
- Test: `src/lib/matching.test.ts`

**Acceptance Criteria:**
- [ ] Returns the roster entry with the smallest 5-dimensional distance
- [ ] Ties resolve to the earlier roster entry (stable order)
- [ ] Throws on an empty roster

**Verify:** `npm test` → matching tests pass

**Steps:**

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/matching.test.ts
import { describe, it, expect } from 'vitest'
import { findClosestCharacter } from './matching'
import type { CharacterEntry, DomainKey, Scores } from './types'

function makeScores(normalized: Record<DomainKey, number>): Scores {
  const domains: DomainKey[] = ['O', 'C', 'E', 'A', 'N']
  const scores = {} as Scores
  for (const d of domains) {
    scores[d] = { average: 0, normalized: normalized[d], result: 'neutral' }
  }
  return scores
}

const roster: CharacterEntry[] = [
  { id: 'a', name: 'A', source: 'Test', blurb: '', profile: { O: 10, C: 10, E: 10, A: 10, N: 10 } },
  { id: 'b', name: 'B', source: 'Test', blurb: '', profile: { O: 90, C: 90, E: 90, A: 90, N: 90 } },
  { id: 'c', name: 'C', source: 'Test', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
]

describe('findClosestCharacter', () => {
  it('returns the character with the smallest distance', () => {
    const scores = makeScores({ O: 88, C: 92, E: 85, A: 91, N: 89 })
    expect(findClosestCharacter(scores, roster).id).toBe('b')
  })

  it('picks the first roster entry on an exact tie', () => {
    const tiedRoster: CharacterEntry[] = [
      { id: 'first', name: 'First', source: 'Test', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
      { id: 'second', name: 'Second', source: 'Test', blurb: '', profile: { O: 50, C: 50, E: 50, A: 50, N: 50 } },
    ]
    const scores = makeScores({ O: 50, C: 50, E: 50, A: 50, N: 50 })
    expect(findClosestCharacter(scores, tiedRoster).id).toBe('first')
  })

  it('throws on an empty roster', () => {
    expect(() => findClosestCharacter(makeScores({ O: 0, C: 0, E: 0, A: 0, N: 0 }), [])).toThrow()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find module `./matching`

- [ ] **Step 3: Create `src/lib/matching.ts`**

```ts
import type { CharacterEntry, DomainKey, Scores } from './types'

const DOMAIN_KEYS: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

export function findClosestCharacter(scores: Scores, roster: CharacterEntry[]): CharacterEntry {
  if (roster.length === 0) {
    throw new Error('Character roster is empty')
  }

  let closest = roster[0]
  let minDistanceSquared = Infinity

  for (const character of roster) {
    let distanceSquared = 0
    for (const key of DOMAIN_KEYS) {
      const diff = scores[key].normalized - character.profile[key]
      distanceSquared += diff * diff
    }
    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared
      closest = character
    }
  }

  return closest
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/matching.ts src/lib/matching.test.ts
git commit -m "Add nearest-neighbor character matching"
```

---

### Task 6: IntroScreen component

**Goal:** The test's landing screen — explains the test and starts it.

**Files:**
- Create: `src/components/IntroScreen.tsx`
- Test: `src/components/IntroScreen.test.tsx`

**Acceptance Criteria:**
- [ ] Shows the question count
- [ ] Calls `onStart` when the start button is clicked

**Verify:** `npm test` → IntroScreen tests pass

**Steps:**

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/IntroScreen.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import IntroScreen from './IntroScreen'

describe('IntroScreen', () => {
  it('shows the question count and calls onStart when clicked', () => {
    const onStart = vi.fn()
    render(<IntroScreen questionCount={120} onStart={onStart} />)

    expect(screen.getByText(/120 short statements/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /start the test/i }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./IntroScreen`

- [ ] **Step 3: Create `src/components/IntroScreen.tsx`**

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/IntroScreen.tsx src/components/IntroScreen.test.tsx
git commit -m "Add IntroScreen component"
```

---

### Task 7: QuestionFlow component

**Goal:** Paginated question flow (10 per page) that collects one answer per question and hands off the full answer set on completion.

**Files:**
- Create: `src/components/QuestionFlow.tsx`
- Test: `src/components/QuestionFlow.test.tsx`

**Acceptance Criteria:**
- [ ] Next/See results button is disabled until every question on the current page is answered
- [ ] Paginates at 10 questions per page
- [ ] Calls `onComplete` with one `{ domain, score }` answer per question, in question order

**Verify:** `npm test` → QuestionFlow tests pass

**Steps:**

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/QuestionFlow.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuestionFlow from './QuestionFlow'
import type { ChoiceSet, QuestionItem } from '../lib/types'

const choices: ChoiceSet = {
  plus: [
    { text: 'Very Inaccurate', score: 1, color: 1 },
    { text: 'Moderately Inaccurate', score: 2, color: 2 },
    { text: 'Neither Accurate Nor Inaccurate', score: 3, color: 3 },
    { text: 'Moderately Accurate', score: 4, color: 4 },
    { text: 'Very Accurate', score: 5, color: 5 },
  ],
  minus: [
    { text: 'Very Inaccurate', score: 5, color: 1 },
    { text: 'Moderately Inaccurate', score: 4, color: 2 },
    { text: 'Neither Accurate Nor Inaccurate', score: 3, color: 3 },
    { text: 'Moderately Accurate', score: 2, color: 4 },
    { text: 'Very Accurate', score: 1, color: 5 },
  ],
}

function makeQuestions(count: number): QuestionItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `q${i}`,
    text: `Question ${i}`,
    keyed: i % 2 === 0 ? 'plus' : 'minus',
    domain: 'O',
    facet: 1,
  }))
}

describe('QuestionFlow', () => {
  it('disables the button until every question on the page is answered, then completes', () => {
    const onComplete = vi.fn()
    const questions = makeQuestions(2)
    render(<QuestionFlow questions={questions} choices={choices} onComplete={onComplete} />)

    const button = screen.getByRole('button', { name: /see results/i })
    expect(button).toBeDisabled()

    fireEvent.click(screen.getAllByLabelText('Very Accurate')[0])
    expect(button).toBeDisabled()

    fireEvent.click(screen.getAllByLabelText('Very Accurate')[1])
    expect(button).not.toBeDisabled()

    fireEvent.click(button)
    expect(onComplete).toHaveBeenCalledWith([
      { domain: 'O', score: 5 },
      { domain: 'O', score: 1 },
    ])
  })

  it('paginates when there are more than 10 questions', () => {
    const questions = makeQuestions(11)
    render(<QuestionFlow questions={questions} choices={choices} onComplete={vi.fn()} />)

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('Question 0')).toBeInTheDocument()
    expect(screen.queryByText('Question 10')).not.toBeInTheDocument()

    const accurateOptions = screen.getAllByLabelText('Very Accurate')
    accurateOptions.forEach((option) => fireEvent.click(option))

    fireEvent.click(screen.getByRole('button', { name: /next/i }))

    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
    expect(screen.getByText('Question 10')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find module `./QuestionFlow`

- [ ] **Step 3: Create `src/components/QuestionFlow.tsx`**

```tsx
import { useState } from 'react'
import type { Answer, ChoiceSet, QuestionItem } from '../lib/types'

const PAGE_SIZE = 10

interface QuestionFlowProps {
  questions: QuestionItem[]
  choices: ChoiceSet
  onComplete: (answers: Answer[]) => void
}

function QuestionFlow({ questions, choices, onComplete }: QuestionFlowProps) {
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const pageCount = Math.ceil(questions.length / PAGE_SIZE)
  const pageQuestions = questions.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined)
  const isLastPage = page === pageCount - 1

  function selectAnswer(question: QuestionItem, score: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: score }))
  }

  function goNext() {
    if (!pageComplete) return
    if (isLastPage) {
      const finalAnswers: Answer[] = questions.map((q) => ({
        domain: q.domain,
        score: answers[q.id],
      }))
      onComplete(finalAnswers)
    } else {
      setPage((p) => p + 1)
    }
  }

  return (
    <div className="quiz">
      <p className="progress">
        Page {page + 1} of {pageCount}
      </p>
      {pageQuestions.map((question) => {
        const options = choices[question.keyed]
        return (
          <fieldset key={question.id} className="question">
            <legend>{question.text}</legend>
            {options.map((choice) => (
              <label key={choice.text}>
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === choice.score}
                  onChange={() => selectAnswer(question, choice.score)}
                />
                {choice.text}
              </label>
            ))}
          </fieldset>
        )
      })}
      <button type="button" disabled={!pageComplete} onClick={goNext}>
        {isLastPage ? 'See results' : 'Next'}
      </button>
    </div>
  )
}

export default QuestionFlow
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/QuestionFlow.tsx src/components/QuestionFlow.test.tsx
git commit -m "Add paginated QuestionFlow component"
```

---

### Task 8: TraitScoreBar and DustJacketCard components

**Goal:** The two visual building blocks of the results screen — a real trait score bar, and the fun character card.

**Files:**
- Create: `src/components/TraitScoreBar.tsx`
- Create: `src/components/DustJacketCard.tsx`
- Test: `src/components/TraitScoreBar.test.tsx`
- Test: `src/components/DustJacketCard.test.tsx`

**Acceptance Criteria:**
- [ ] `TraitScoreBar` shows the trait label, a fill bar sized to the normalized score, and the matching high/low note (or the neutral description when the result is neutral)
- [ ] `DustJacketCard` shows the character's name, source, and blurb

**Verify:** `npm test` → both component tests pass

**Steps:**

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/TraitScoreBar.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TraitScoreBar from './TraitScoreBar'
import type { DomainResult, TraitInfo, TraitNote } from '../lib/types'

const info: TraitInfo = { domain: 'O', label: 'Openness', description: 'Neutral description text' }
const note: TraitNote = { domain: 'O', high: 'High note text', low: 'Low note text' }

describe('TraitScoreBar', () => {
  it('shows the high note when the result is high', () => {
    const score: DomainResult = { average: 4.5, normalized: 87.5, result: 'high' }
    render(<TraitScoreBar info={info} score={score} note={note} />)
    expect(screen.getByText('Openness')).toBeInTheDocument()
    expect(screen.getByText('High note text')).toBeInTheDocument()
  })

  it('falls back to the neutral description when the result is neutral', () => {
    const score: DomainResult = { average: 3, normalized: 50, result: 'neutral' }
    render(<TraitScoreBar info={info} score={score} note={note} />)
    expect(screen.getByText('Neutral description text')).toBeInTheDocument()
  })
})
```

```tsx
// src/components/DustJacketCard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DustJacketCard from './DustJacketCard'
import type { CharacterEntry } from '../lib/types'

const character: CharacterEntry = {
  id: 'test-character',
  name: 'Test Character',
  source: 'Test Source',
  blurb: 'An original blurb about the test character.',
  profile: { O: 50, C: 50, E: 50, A: 50, N: 50 },
}

describe('DustJacketCard', () => {
  it('renders the character name, source, and blurb', () => {
    render(<DustJacketCard character={character} />)
    expect(screen.getByText('Test Character')).toBeInTheDocument()
    expect(screen.getByText('Test Source')).toBeInTheDocument()
    expect(screen.getByText('An original blurb about the test character.')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find modules `./TraitScoreBar`, `./DustJacketCard`

- [ ] **Step 3: Create `src/components/TraitScoreBar.tsx`**

```tsx
import type { DomainResult, TraitInfo, TraitNote } from '../lib/types'

interface TraitScoreBarProps {
  info: TraitInfo
  score: DomainResult
  note: TraitNote
}

function TraitScoreBar({ info, score, note }: TraitScoreBarProps) {
  const noteText = score.result === 'neutral' ? info.description : note[score.result]

  return (
    <div className="trait-bar">
      <div className="trait-bar-header">
        <span className="trait-bar-label">{info.label}</span>
        <span className="trait-bar-result">{score.result}</span>
      </div>
      <div className="trait-bar-track">
        <div className="trait-bar-fill" style={{ width: `${score.normalized}%` }} />
      </div>
      <p className="trait-bar-note">{noteText}</p>
    </div>
  )
}

export default TraitScoreBar
```

- [ ] **Step 4: Create `src/components/DustJacketCard.tsx`**

```tsx
import type { CharacterEntry } from '../lib/types'

interface DustJacketCardProps {
  character: CharacterEntry
}

function DustJacketCard({ character }: DustJacketCardProps) {
  return (
    <div className="dust-jacket">
      <p className="dust-jacket-label">About this character</p>
      <h2 className="dust-jacket-name">{character.name}</h2>
      <p className="dust-jacket-source">{character.source}</p>
      <p className="dust-jacket-blurb">{character.blurb}</p>
    </div>
  )
}

export default DustJacketCard
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/TraitScoreBar.tsx src/components/DustJacketCard.tsx src/components/TraitScoreBar.test.tsx src/components/DustJacketCard.test.tsx
git commit -m "Add TraitScoreBar and DustJacketCard components"
```

---

### Task 9: ResultsScreen component

**Goal:** Compose the dust jacket card and all five trait bars into the full results view.

**Files:**
- Create: `src/components/ResultsScreen.tsx`
- Test: `src/components/ResultsScreen.test.tsx`

**Acceptance Criteria:**
- [ ] Renders the matched character's dust jacket card
- [ ] Renders one `TraitScoreBar` per domain, in O/C/E/A/N order

**Verify:** `npm test` → ResultsScreen tests pass

**Steps:**

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ResultsScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResultsScreen from './ResultsScreen'
import type { CharacterEntry, DomainKey, Scores, TraitInfo, TraitNote } from '../lib/types'

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

const character: CharacterEntry = {
  id: 'test',
  name: 'Test Character',
  source: 'Test Source',
  blurb: 'Blurb text',
  profile: { O: 50, C: 50, E: 50, A: 50, N: 50 },
}

describe('ResultsScreen', () => {
  it('renders the character card and all five trait bars', () => {
    render(
      <ResultsScreen scores={scores} character={character} traitInfos={traitInfos} traitNotes={traitNotes} />,
    )

    expect(screen.getByText('Test Character')).toBeInTheDocument()
    for (const domain of domains) {
      expect(screen.getByText(labels[domain])).toBeInTheDocument()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./ResultsScreen`

- [ ] **Step 3: Create `src/components/ResultsScreen.tsx`**

```tsx
import type { CharacterEntry, DomainKey, Scores, TraitInfo, TraitNote } from '../lib/types'
import TraitScoreBar from './TraitScoreBar'
import DustJacketCard from './DustJacketCard'

const DOMAIN_ORDER: DomainKey[] = ['O', 'C', 'E', 'A', 'N']

interface ResultsScreenProps {
  scores: Scores
  character: CharacterEntry
  traitInfos: TraitInfo[]
  traitNotes: TraitNote[]
}

function ResultsScreen({ scores, character, traitInfos, traitNotes }: ResultsScreenProps) {
  return (
    <div className="results">
      <DustJacketCard character={character} />
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

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ResultsScreen.tsx src/components/ResultsScreen.test.tsx
git commit -m "Add ResultsScreen component"
```

---

### Task 10: Wire the full app together

**Goal:** `App.tsx` drives the real intro → quiz → results flow using the real data files, scoring, and matching.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Acceptance Criteria:**
- [ ] Starting on the intro screen, clicking Start moves to the quiz
- [ ] Completing all 120 questions computes scores, finds the closest character, and shows the results screen
- [ ] Full flow works with the real (non-fixture) question, choice, character, and trait data

**Verify:** `npm test` → full App integration test passes

**Steps:**

- [ ] **Step 1: Write the failing integration test**

```tsx
// src/App.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `App` does not yet render `IntroScreen`/`QuestionFlow`/`ResultsScreen`

- [ ] **Step 3: Rewrite `src/App.tsx`**

```tsx
import { useState } from 'react'
import IntroScreen from './components/IntroScreen'
import QuestionFlow from './components/QuestionFlow'
import ResultsScreen from './components/ResultsScreen'
import questions from './data/questions'
import choices from './data/choices'
import characters from './data/characters'
import traitInfo from './data/traitInfo'
import traitNotes from './data/traitNotes'
import { scoreAnswers } from './lib/scoring'
import { findClosestCharacter } from './lib/matching'
import type { Answer, CharacterEntry, Scores } from './lib/types'

type Stage = 'intro' | 'quiz' | 'results'

function App() {
  const [stage, setStage] = useState<Stage>('intro')
  const [scores, setScores] = useState<Scores | null>(null)
  const [character, setCharacter] = useState<CharacterEntry | null>(null)

  function handleComplete(answers: Answer[]) {
    const computedScores = scoreAnswers(answers)
    const match = findClosestCharacter(computedScores, characters)
    setScores(computedScores)
    setCharacter(match)
    setStage('results')
  }

  return (
    <div className="app">
      {stage === 'intro' && <IntroScreen questionCount={questions.length} onStart={() => setStage('quiz')} />}
      {stage === 'quiz' && <QuestionFlow questions={questions} choices={choices} onComplete={handleComplete} />}
      {stage === 'results' && scores && character && (
        <ResultsScreen scores={scores} character={character} traitInfos={traitInfo} traitNotes={traitNotes} />
      )}
    </div>
  )
}

export default App
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — both App tests green

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "Wire intro, quiz, and results into the full app flow"
```

---

### Task 11: Styling, attribution, and final verification

**Goal:** Apply the approved dust-jacket visual style, finish project docs, and confirm the whole app builds and tests cleanly.

**Files:**
- Modify: `src/index.css`
- Create: `README.md`

**Acceptance Criteria:**
- [ ] Dust jacket card uses the dark parchment/serif treatment approved during design
- [ ] `npm test` and `npm run build` both succeed
- [ ] `npm run dev` serves a working app end-to-end (manual check)

**Verify:** `npm test` → all tests pass; `npm run build` → exits 0

**Steps:**

- [ ] **Step 1: Replace `src/index.css`**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background: #faf7f0;
  color: #222;
}

.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}

.intro h1,
.quiz h1 {
  font-family: Georgia, serif;
}

.intro button,
.quiz button {
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: #3a2f1a;
  color: #f4ecd8;
  cursor: pointer;
}

.intro button:disabled,
.quiz button:disabled {
  background: #b8a888;
  cursor: not-allowed;
}

.progress {
  font-size: 0.85rem;
  color: #6b5b3a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.question {
  border: none;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
}

.question legend {
  font-weight: 600;
  margin-bottom: 8px;
}

.question label {
  display: block;
  margin: 4px 0;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dust-jacket {
  background: #3a2f1a;
  color: #f4ecd8;
  border: 1px solid #6b5b3a;
  border-radius: 4px;
  padding: 24px;
  font-family: Georgia, serif;
}

.dust-jacket-label {
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-align: center;
  color: #c9b896;
  margin: 0 0 12px;
}

.dust-jacket-name {
  text-align: center;
  margin: 0 0 4px;
}

.dust-jacket-source {
  text-align: center;
  font-style: italic;
  color: #c9b896;
  margin: 0 0 16px;
}

.dust-jacket-blurb {
  line-height: 1.6;
}

.trait-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trait-bar-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.trait-bar-result {
  text-transform: capitalize;
  color: #6b5b3a;
}

.trait-bar-track {
  background: #eee;
  border-radius: 4px;
  height: 8px;
  margin: 6px 0;
  overflow: hidden;
}

.trait-bar-fill {
  background: #3a2f1a;
  height: 100%;
}

.trait-bar-note {
  font-size: 0.9rem;
  color: #444;
  margin: 0;
}
```

- [ ] **Step 2: Create `README.md`**

```md
# bigfive-fun

A client-side Big Five personality test. Answer 120 real IPIP-NEO items and get your
actual trait scores, plus the fictional character your results match closest to.

The question bank and scoring rules are ported from [bigfive-web](https://github.com/rubynor/bigfive-web)
(MIT licensed — see `THIRD_PARTY_NOTICES.md`). The character roster and result presentation
are original to this project.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## Building

\`\`\`bash
npm run build
\`\`\`
```

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS — all tests across every task green

- [ ] **Step 4: Run the build**

Run: `npm run build`
Expected: exits 0

- [ ] **Step 5: Manual check**

Run: `npm run dev`, open the printed local URL, click through Start → answer all 120 questions → confirm the results screen shows real trait bars and a dust jacket character card.

- [ ] **Step 6: Commit**

```bash
git add src/index.css README.md
git commit -m "Apply dust-jacket styling and finish project docs"
```

---

## Self-Review Notes

- **Spec coverage:** intro/quiz/results flow (Tasks 6, 7, 9, 10), real trait scores (Task 3, 9), character match + per-trait notes (Tasks 4, 5, 8, 9), lean port of `score`/`questions` with attribution (Task 2), no backend/no persistence (entire app is client-only React state — confirmed no server code anywhere in the plan), domain-level only / no facets (Task 3 deliberately drops the `facet` field from `Answer`).
- **Type consistency:** `DomainKey`, `Answer`, `Scores`, `CharacterEntry`, `TraitInfo`, `TraitNote`, `QuestionItem`, `Choice`, `ChoiceSet` are defined once in Task 2's `src/lib/types.ts` and used with identical shapes in every later task.
- **No placeholders:** all data (120 questions via pinned-commit download + verified integrity tests, 20 characters, 10 trait notes, 5 trait infos) and all component/logic code is written out in full.
