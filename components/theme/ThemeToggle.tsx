'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/theme/ThemeProvider'

type ThemeToggleProps = {
  compact?: boolean
  className?: string
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M21 12.8A8.98 8.98 0 0 1 11.2 3a9 9 0 1 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ThemeToggle({ compact = false, className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'
  const label = isLight ? 'Switch to dark mode' : 'Switch to light mode'
  const surface = isLight
    ? 'border-slate-900/10 bg-white/78 text-slate-900 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.35)] hover:bg-white'
    : 'border-white/12 bg-white/8 text-white hover:bg-white/12'
  const iconSurface = isLight ? 'bg-slate-900/8 text-slate-900' : 'bg-white/10 text-white'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      aria-label={label}
      className={`theme-toggle group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 ${surface} ${
        compact ? 'justify-center' : ''
      } ${className}`}
    >
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${iconSurface}`}>
        {isLight ? <MoonIcon /> : <SunIcon />}
      </span>
      {!compact && <span>{isLight ? 'Dark mode' : 'Light mode'}</span>}
    </motion.button>
  )
}
