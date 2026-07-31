import { useLayoutEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'bigfive-fun-theme'

function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  )
}

export default ThemeToggle
