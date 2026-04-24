'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { conflictCases, type ConflictCase, type ConflictRegion, type ConflictStatus } from '@/lib/content'
import { useTheme } from '@/components/theme/ThemeProvider'

const regions: Array<ConflictRegion | 'All'> = ['All', 'Africa', 'Middle East', 'Europe', 'Asia', 'Americas']

const severityTone: Record<ConflictCase['severity'], string> = {
  Extreme: 'border-rose-300/35 bg-rose-400/12 text-rose-100',
  High: 'border-orange-300/30 bg-orange-400/10 text-orange-100',
  Turbulent: 'border-amber-300/30 bg-amber-400/10 text-amber-100',
  Repairing: 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100',
}

const statusCopy: Record<ConflictStatus, string> = {
  active: 'Places in conflict',
  repair: 'Places rebuilding',
}

function getMarkerOffset(id: string) {
  const offsets: Record<string, [number, number]> = {
    sudan: [-0.9, -0.6],
    'south-sudan': [1.1, 0.4],
    'central-african-republic': [-1.2, 0.8],
    'turkey-kurdish': [-1, -0.8],
    iraq: [0.8, 0.1],
    syria: [-0.5, 0.7],
    'hezbollah-lebanon': [0.9, -0.7],
    'israeli-palestinian': [-0.9, 0.4],
    'iran-israel-us': [1, -0.5],
    afghanistan: [-0.8, -0.3],
    'pakistan-instability': [0.8, 0.5],
    'india-pakistan': [-0.8, 0.7],
    taiwan: [0.9, -0.6],
    'north-korea': [-0.6, -0.7],
    'south-china-sea': [0.7, 0.6],
    'northern-triangle': [-0.7, -0.4],
    mexico: [-1.1, 0.6],
    haiti: [0.8, 0.5],
  }

  return offsets[id] ?? [0, 0]
}

function WorldMapBackdrop() {
  return (
    <svg viewBox="0 0 100 58" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="conflict-map-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(125,211,252,0.2)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0.09)" />
        </linearGradient>
        <radialGradient id="hot-zone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(244,63,94,0.42)" />
          <stop offset="58%" stopColor="rgba(244,63,94,0.18)" />
          <stop offset="100%" stopColor="rgba(244,63,94,0)" />
        </radialGradient>
        <radialGradient id="cold-zone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
          <stop offset="62%" stopColor="rgba(34,211,238,0.12)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </radialGradient>
      </defs>

      <g stroke="rgba(125,211,252,0.09)" strokeWidth="0.18">
        {[10, 25, 40, 55, 70, 85].map((x) => (
          <path key={`lon-${x}`} d={`M${x} 6v47`} />
        ))}
        {[13, 23, 33, 43].map((y) => (
          <path key={`lat-${y}`} d={`M5 ${y}h90`} />
        ))}
      </g>

      <g opacity="0.85">
        <ellipse cx="55" cy="49" rx="12" ry="6" fill="url(#cold-zone)" />
        <ellipse cx="27" cy="50" rx="9" ry="7" fill="url(#cold-zone)" />
        <ellipse cx="54" cy="47" rx="10" ry="10" fill="url(#hot-zone)" />
        <ellipse cx="58" cy="43" rx="9" ry="6" fill="url(#hot-zone)" />
        <ellipse cx="72" cy="52" rx="8" ry="6" fill="url(#hot-zone)" />
        <ellipse cx="28" cy="53" rx="7" ry="5" fill="url(#hot-zone)" />
      </g>

      <g fill="url(#conflict-map-fill)" stroke="rgba(203,213,225,0.28)" strokeWidth="0.28" strokeLinejoin="round">
        <path d="M7.7 19.1 C11.2 15.3 15.5 11.8 21.4 8.8 C24.5 10.7 28 12.4 32.6 13.5 C35.4 14.1 38.1 16.1 39.1 18.9 C36.1 20.5 34.6 23.1 32.3 25.1 C29.6 27.3 28.4 30.3 27.6 33.4 C24.6 36.4 20.7 37.3 16.6 34.6 C13.8 31.3 11.1 29.6 8.1 28.1 C9.1 25.7 9 23.7 6.4 22.5 C6.7 21.4 7.1 20.3 7.7 19.1Z" />
        <path d="M22.9 32.4 C26.7 32.8 31.6 34.3 34.3 38.2 C37.1 42.2 36.4 46.5 33.7 49.8 C31.4 52.6 30.7 55.4 29.9 57.1 C27.3 55.4 25.8 52.3 25.2 48.3 C24.8 45.6 22.7 43.7 20.9 41.4 C20.8 38.1 21.4 35.3 22.9 32.4Z" />
        <path d="M34.8 14.3 C38.9 11.8 42.6 8.9 47.7 8.3 C53.6 10.8 58.3 13.9 64.8 10.2 C71.9 9.2 80.3 10.7 88.5 9.6 C92.7 9.1 95.9 11.4 96.6 14.2 C93.4 17.1 89.9 19.4 86.4 22.1 C84.1 24.2 83.1 27.1 81.8 30.3 C79.3 30.1 76.5 29.8 74.3 31.8 C72 33.7 69.9 35 67.4 35.3 C65 32.8 62.5 30.5 58.6 30.1 C55.4 29.8 52.8 32.2 49.7 31.1 C47.2 30.1 45.2 27.3 42.8 26.5 C40.4 25.6 37.7 27 35.4 25.6 C33.6 24.4 32.1 22.9 30.4 21.7 C31.1 18.9 32.5 16.6 34.8 14.3Z" />
        <path d="M47.5 27.9 C51.8 27.1 56.8 28.5 61.2 32.4 C65.8 36.4 66.6 42.6 63.6 48.2 C61.7 51.6 58.5 54.4 55.1 56.9 C51.6 53.2 49.1 49.2 48 44.4 C46.7 39 42.7 36.7 44.5 32.5 C45.2 30.8 46.2 29.3 47.5 27.9Z" />
        <path d="M73.7 39.8 C78.2 38.4 84.2 37.7 89.4 40.9 C92.5 42.9 94 46.2 92.2 49.2 C90.1 52.5 85.7 53.5 81.4 53.4 C77.2 52.5 73.8 50.5 71.5 47.6 C71.3 44.5 72.1 41.9 73.7 39.8Z" />
        <path d="M39.9 7.4 C43.5 5.4 47.1 5.1 50.9 6.7 C49.5 8.8 47.2 10.1 43.9 10.6 C41.6 10.5 40.2 9.4 39.9 7.4Z" />
        <path d="M64.1 44.3 C66.7 44.7 68.5 46.3 69 49.5 C67.7 51.2 66.2 52.2 64.4 52.2 C62.6 49.5 62.5 47 64.1 44.3Z" />
      </g>

      <g fill="rgba(125,211,252,0.18)" stroke="rgba(203,213,225,0.22)" strokeWidth="0.22">
        <path d="M33.2 13.6 36 12.4l2.3.8-1.9 1.8-3.2-1.4Z" />
        <path d="M89.2 30.5 92.7 29.8l2 2.5-3.7 1.7-1.8-3.5Z" />
        <path d="M84.6 52.2 88 51.8l2.3 1.5-3.1 1.5-2.6-2.6Z" />
        <path d="M5.6 16.2 8.3 14.4l2.3.7-2.9 2.8-2.1-1.7Z" />
        <path d="M30.3 51.4 32.9 50.8l1.6 1.8-2.7 1.6-1.5-2.8Z" />
        <path d="M69.2 31.9 72 30.8l1.9 1.6-2.8 1.5-1.9-2Z" />
      </g>

      <g fill="rgba(226,232,240,0.34)" fontSize="2.2" fontWeight="700" letterSpacing="0.18em">
        <text x="16" y="25">AMERICAS</text>
        <text x="46" y="21">EURASIA</text>
        <text x="52" y="41">AFRICA</text>
        <text x="76" y="48">OCEANIA</text>
      </g>
    </svg>
  )
}

function ConflictMarker({
  conflict,
  selected,
  onSelect,
}: {
  conflict: ConflictCase
  selected: boolean
  onSelect: (conflict: ConflictCase) => void
}) {
  const isActive = conflict.status === 'active'
  const [offsetX, offsetY] = getMarkerOffset(conflict.id)

  return (
    <button
      type="button"
      onClick={() => onSelect(conflict)}
      className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      style={{ left: `${conflict.mapX + offsetX}%`, top: `${conflict.mapY + offsetY}%` }}
      aria-label={`Open ${conflict.name}`}
    >
      <motion.span
        animate={{ scale: selected ? 1.18 : 1 }}
        className={`relative z-10 h-3.5 w-3.5 rounded-full border ${
          isActive ? 'border-rose-100 bg-rose-400' : 'border-cyan-100 bg-cyan-300'
        } shadow-[0_0_24px_currentColor]`}
      />
      <motion.span
        animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: isActive ? 1.8 : 2.6, repeat: Infinity, ease: 'easeOut' }}
        className={`absolute h-7 w-7 rounded-full ${isActive ? 'bg-rose-400/24' : 'bg-cyan-300/20'}`}
      />
      {selected ? <span className="absolute h-8 w-8 rounded-full border border-white/50" /> : null}
    </button>
  )
}

export default function ConflictTracker() {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<ConflictStatus>('active')
  const [region, setRegion] = useState<ConflictRegion | 'All'>('All')
  const [selectedId, setSelectedId] = useState(conflictCases.find((conflict) => conflict.status === 'active')?.id ?? conflictCases[0].id)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const isLight = theme === 'light'

  const activeCount = conflictCases.filter((conflict) => conflict.status === 'active').length
  const filteredCases = useMemo(
    () => conflictCases.filter((conflict) => conflict.status === status && (region === 'All' || conflict.region === region)),
    [region, status]
  )
  const selectedConflict = filteredCases.find((conflict) => conflict.id === selectedId) ?? filteredCases[0] ?? conflictCases[0]
  const mapCases = filteredCases.length > 0 ? filteredCases : conflictCases.filter((conflict) => conflict.status === status)
  const lastReviewed = conflictCases[0]?.lastReviewed ?? 'April 23, 2026'

  useEffect(() => {
    if (!open) {
      return
    }

    const launcher = launcherRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      launcher?.focus()
    }
  }, [open])

  function handleStatusChange(nextStatus: ConflictStatus) {
    setStatus(nextStatus)
    setSelectedId(conflictCases.find((conflict) => conflict.status === nextStatus)?.id ?? conflictCases[0].id)
  }

  return (
    <div className="conflict-tracker-root">
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border px-4 py-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 ${
          isLight
            ? 'border-slate-900/10 bg-white/88 text-slate-950 shadow-[0_18px_50px_rgba(148,163,184,0.28)]'
            : 'border-rose-300/20 bg-slate-950/78 text-white'
        }`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${isLight ? 'border-rose-300/35 bg-rose-100 text-rose-700' : 'border-rose-300/25 bg-rose-400/10 text-rose-100'}`}>
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="absolute h-7 w-7 animate-ping rounded-full bg-rose-400/15" />
        </span>
        <span>
          <span className={`section-kicker block text-[9px] font-semibold ${isLight ? 'text-rose-700' : 'text-rose-200/80'}`}>Conflict Tracker</span>
          <span className={`mt-0.5 block text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{activeCount} CFR cases to explore</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Global conflict tracker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[70] p-3 backdrop-blur-xl sm:p-5 ${isLight ? 'bg-slate-900/22' : 'bg-slate-950/82'}`}
          >
            <button
              type="button"
              aria-label="Close conflict tracker"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="theme-surface-panel relative z-10 mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[1.25rem] backdrop-blur-xl"
            >
              <header className="flex flex-col gap-5 border-b border-white/10 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div>
                  <p className={`section-kicker text-[10px] font-semibold ${isLight ? 'text-rose-700' : 'text-rose-200/75'}`}>World Conflict Tracker</p>
                  <h2 className={`premium-heading mt-2 text-3xl leading-tight sm:text-4xl ${isLight ? 'text-slate-950' : 'text-white'}`}>Where families are hurting, and where healing is being tried</h2>
                  <p className={`mt-3 max-w-2xl text-sm leading-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    This is a static, source-backed overview based mainly on the CFR Global Conflict Tracker, with a separate view for places trying to rebuild trust. Last reviewed: {lastReviewed}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`h-10 w-10 rounded-full border text-lg leading-none transition-colors duration-200 ${
                    isLight
                      ? 'border-slate-900/10 bg-white/80 text-slate-600 hover:bg-white hover:text-slate-950'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label="Close conflict tracker"
                >
                  ×
                </button>
              </header>

              <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1fr_24rem]">
                <div className="flex min-h-0 flex-col p-4 sm:p-6">
                  <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className={`flex w-full rounded-full border p-1 sm:w-fit ${isLight ? 'border-slate-900/10 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                      {(['active', 'repair'] as ConflictStatus[]).map((nextStatus) => {
                        const isSelected = status === nextStatus

                        return (
                          <button
                            key={nextStatus}
                            type="button"
                            onClick={() => handleStatusChange(nextStatus)}
                            className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                              isSelected
                                ? isLight
                                  ? 'text-slate-950'
                                  : 'text-white'
                                : isLight
                                  ? 'text-slate-500 hover:text-slate-950'
                                  : 'text-slate-400 hover:text-white'
                             }`}
                          >
                            {isSelected ? (
                              <motion.span
                                layoutId="conflict-status-pill"
                                className={`absolute inset-0 rounded-full ${
                                  nextStatus === 'active'
                                    ? isLight
                                      ? 'bg-rose-100'
                                      : 'bg-rose-400/14'
                                    : isLight
                                      ? 'bg-cyan-100'
                                      : 'bg-cyan-400/14'
                                }`}
                                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                              />
                            ) : null}
                            <span className="relative z-10">{statusCopy[nextStatus]}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 xl:pb-0">
                      {regions.map((nextRegion) => {
                        const isSelected = region === nextRegion

                        return (
                          <button
                            key={nextRegion}
                            type="button"
                            onClick={() => setRegion(nextRegion)}
                            className={`shrink-0 rounded-full border px-3 py-2 text-[11px] font-semibold transition-colors duration-200 ${
                              isSelected
                                ? isLight
                                  ? 'border-cyan-300/40 bg-cyan-100 text-cyan-800'
                                  : 'border-cyan-300/35 bg-cyan-400/10 text-cyan-100'
                                : isLight
                                  ? 'border-slate-900/10 bg-white/68 text-slate-500 hover:text-slate-950'
                                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                             }`}
                          >
                            {nextRegion}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className={`relative min-h-[23rem] flex-1 overflow-hidden rounded-[0.75rem] border ${
                    isLight
                      ? 'border-slate-900/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,0.10),transparent_28%),linear-gradient(145deg,rgba(15,23,42,0.96),rgba(30,41,59,0.88))]'
                      : 'border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,0.12),transparent_28%),linear-gradient(145deg,rgba(2,6,23,0.92),rgba(15,23,42,0.72))]'
                  }`}>
                    <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(125,211,252,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />
                    <WorldMapBackdrop />
                    {mapCases.map((conflict) => (
                      <ConflictMarker
                        key={conflict.id}
                        conflict={conflict}
                        selected={selectedConflict?.id === conflict.id}
                        onSelect={(nextConflict) => setSelectedId(nextConflict.id)}
                      />
                    ))}

                    <div className={`pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-[0.5rem] border px-4 py-3 text-xs backdrop-blur-md ${
                      isLight
                        ? 'border-white/12 bg-slate-950/72 text-slate-100'
                        : 'border-white/10 bg-slate-950/62 text-slate-300'
                    }`}>
                      <span>{mapCases.length} visible cases</span>
                      <span className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-400" /> Hurting now</span>
                        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-cyan-300" /> Rebuilding trust</span>
                      </span>
                    </div>
                  </div>
                </div>

                <aside className="min-h-0 overflow-y-auto border-t border-white/10 p-4 sm:p-6 lg:border-l lg:border-t-0">
                  {selectedConflict ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedConflict.id}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className={`section-kicker text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{selectedConflict.region}</p>
                            <h3 className={`mt-2 text-2xl font-bold leading-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>{selectedConflict.name}</h3>
                            <p className={`mt-2 text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{selectedConflict.location}</p>
                          </div>
                          <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                            isLight
                              ? {
                                  Extreme: 'border-rose-300/45 bg-rose-100 text-rose-800',
                                  High: 'border-orange-300/45 bg-orange-100 text-orange-800',
                                  Turbulent: 'border-amber-300/45 bg-amber-100 text-amber-800',
                                  Repairing: 'border-cyan-300/45 bg-cyan-100 text-cyan-800',
                                }[selectedConflict.severity]
                              : severityTone[selectedConflict.severity]
                          }`}>
                            {selectedConflict.severity}
                          </span>
                        </div>

                        <div className="mt-6 space-y-5">
                          <section>
                            <p className={`section-kicker mb-2 text-[10px] font-semibold ${isLight ? 'text-rose-700' : 'text-rose-200/70'}`}>What is happening</p>
                            <p className={`text-sm leading-7 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{selectedConflict.summary}</p>
                          </section>
                          <section>
                            <p className={`section-kicker mb-2 text-[10px] font-semibold ${isLight ? 'text-orange-700' : 'text-orange-200/70'}`}>What families are carrying</p>
                            <p className={`text-sm leading-7 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{selectedConflict.humanitarianNote}</p>
                          </section>
                          <section className={`rounded-[0.5rem] border p-4 ${isLight ? 'border-cyan-300/30 bg-cyan-50' : 'border-cyan-300/15 bg-cyan-400/8'}`}>
                            <p className={`section-kicker mb-2 text-[10px] font-semibold ${isLight ? 'text-cyan-800' : 'text-cyan-100/80'}`}>What may help healing</p>
                            <p className={`text-sm leading-7 ${isLight ? 'text-cyan-900/90' : 'text-cyan-50/88'}`}>{selectedConflict.repairLesson}</p>
                          </section>
                        </div>

                        <div className="mt-7">
                          <p className={`section-kicker mb-3 text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Sources</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedConflict.sources.map((source) => (
                              <a
                                key={`${selectedConflict.id}-${source.href}`}
                                href={source.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                                  isLight
                                    ? 'border-slate-900/10 bg-white/78 text-slate-700 hover:border-cyan-300/40 hover:text-slate-950'
                                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30 hover:text-white'
                                }`}
                              >
                                {source.label}
                              </a>
                            ))}
                          </div>
                          <p className={`mt-4 text-xs leading-5 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                            This is a static learning dataset. Please use the linked trackers for the most current reporting before making real-world decisions.
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                     <div className={`flex h-full items-center justify-center text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>No cases match this filter right now.</div>
                  )}
                </aside>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
