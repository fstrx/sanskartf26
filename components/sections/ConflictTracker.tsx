'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { conflictCases, type ConflictCase, type ConflictRegion, type ConflictStatus } from '@/lib/content'

const regions: Array<ConflictRegion | 'All'> = ['All', 'Africa', 'Middle East', 'Europe', 'Asia', 'Americas']

const severityTone: Record<ConflictCase['severity'], string> = {
  Extreme: 'border-rose-300/35 bg-rose-400/12 text-rose-100',
  High: 'border-orange-300/30 bg-orange-400/10 text-orange-100',
  Turbulent: 'border-amber-300/30 bg-amber-400/10 text-amber-100',
  Repairing: 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100',
}

const statusCopy: Record<ConflictStatus, string> = {
  active: 'Active conflicts',
  repair: 'Repair cases',
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
        <path d="M7.8 18.8 13.6 12.7l7.5-4.1 6.5 3.8 8.1 1.9 2.8 4.5-5.4 3.7-4.3 4.5-1.8 5.6-4.7 2.8-5.6-1.5-3.7-4.4-4.7-2.1 1.8-4.6-4.8-1 2.5-3Z" />
        <path d="M22.8 31.9 28.1 32.7l5.4 3.4 3.4 5.9-3.2 6.5-2.9 8.3-4.2-3.2-1.3-7.6-3.8-4.4.2-5.8 1.1-3.9Z" />
        <path d="M35.1 14.4 41.2 8.8l8.1 2.6 8 3.5 8.7-5.5 14.8.6 9.4-1 5.8 4.7-.6 5.4-8.2 4.6-3.6 6.9-5.4-.5-5.8 4.9-5.5-4.2-5.7-1.4-4.4 3.5-7.5-2.4-5.1-4.9-7.1 1.2-5.1-4 3.1-8.4Z" />
        <path d="M48.1 27.7 54.5 27.4l5.8 3.4 4.2 6.2-.7 8.4-3.7 6.8-5 4.5-4.5-4.8-2.8-7.4-3.6-5.1 1-6.6 2.9-5.1Z" />
        <path d="M74.2 39.7 82.2 38.1l7.2 3.1 3.3 4.7-3.6 5.1-7.6 2.1-7.7-3.5-2-5.6 2.4-4.3Z" />
        <path d="M39.8 7.2 45.5 5.4l5.3 1.4-3.6 3.1-6.4.7-1-3.4Z" />
        <path d="M63.7 44.2 67.6 45.3l1.1 4.6-3.1 2.2-2.7-3.5.8-4.4Z" />
      </g>

      <g fill="rgba(125,211,252,0.18)" stroke="rgba(203,213,225,0.22)" strokeWidth="0.22">
        <path d="M33.2 13.6 36 12.4l2.3.8-1.9 1.8-3.2-1.4Z" />
        <path d="M89.2 30.5 92.7 29.8l2 2.5-3.7 1.7-1.8-3.5Z" />
        <path d="M84.6 52.2 88 51.8l2.3 1.5-3.1 1.5-2.6-2.6Z" />
        <path d="M5.6 16.2 8.3 14.4l2.3.7-2.9 2.8-2.1-1.7Z" />
        <path d="M30.3 51.4 32.9 50.8l1.6 1.8-2.7 1.6-1.5-2.8Z" />
        <path d="M69.2 31.9 72 30.8l1.9 1.6-2.8 1.5-1.9-2Z" />
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

  return (
    <button
      type="button"
      onClick={() => onSelect(conflict)}
      className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      style={{ left: `${conflict.mapX}%`, top: `${conflict.mapY}%` }}
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
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<ConflictStatus>('active')
  const [region, setRegion] = useState<ConflictRegion | 'All'>('All')
  const [selectedId, setSelectedId] = useState(conflictCases.find((conflict) => conflict.status === 'active')?.id ?? conflictCases[0].id)
  const launcherRef = useRef<HTMLButtonElement>(null)

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
    <>
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-rose-300/20 bg-slate-950/78 px-4 py-3 text-left text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/25 bg-rose-400/10 text-rose-100">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="absolute h-7 w-7 animate-ping rounded-full bg-rose-400/15" />
        </span>
        <span>
          <span className="section-kicker block text-[9px] font-semibold text-rose-200/80">Conflict Tracker</span>
          <span className="mt-0.5 block text-xs text-slate-300">{activeCount} active cases tracked</span>
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
            className="fixed inset-0 z-[70] bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5"
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
                  <p className="section-kicker text-[10px] font-semibold text-rose-200/75">Global Conflict Tracker</p>
                  <h2 className="premium-heading mt-2 text-3xl leading-tight text-white sm:text-4xl">Map of rupture and repair</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                    Curated static overview of active conflicts and repair cases. Last reviewed: {lastReviewed}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-lg leading-none text-slate-200 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  aria-label="Close conflict tracker"
                >
                  ×
                </button>
              </header>

              <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1fr_24rem]">
                <div className="flex min-h-0 flex-col p-4 sm:p-6">
                  <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex w-full rounded-full border border-white/10 bg-white/5 p-1 sm:w-fit">
                      {(['active', 'repair'] as ConflictStatus[]).map((nextStatus) => {
                        const isSelected = status === nextStatus

                        return (
                          <button
                            key={nextStatus}
                            type="button"
                            onClick={() => handleStatusChange(nextStatus)}
                            className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                              isSelected ? 'text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {isSelected ? (
                              <motion.span
                                layoutId="conflict-status-pill"
                                className={`absolute inset-0 rounded-full ${nextStatus === 'active' ? 'bg-rose-400/14' : 'bg-cyan-400/14'}`}
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
                                ? 'border-cyan-300/35 bg-cyan-400/10 text-cyan-100'
                                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                            }`}
                          >
                            {nextRegion}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="relative min-h-[23rem] flex-1 overflow-hidden rounded-[0.75rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,0.12),transparent_28%),linear-gradient(145deg,rgba(2,6,23,0.92),rgba(15,23,42,0.72))]">
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

                    <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-[0.5rem] border border-white/10 bg-slate-950/62 px-4 py-3 text-xs text-slate-300 backdrop-blur-md">
                      <span>{mapCases.length} visible cases</span>
                      <span className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-400" /> Active</span>
                        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-cyan-300" /> Repair</span>
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
                            <p className="section-kicker text-[10px] font-semibold text-slate-400">{selectedConflict.region}</p>
                            <h3 className="mt-2 text-2xl font-bold leading-tight text-white">{selectedConflict.name}</h3>
                            <p className="mt-2 text-sm text-slate-400">{selectedConflict.location}</p>
                          </div>
                          <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${severityTone[selectedConflict.severity]}`}>
                            {selectedConflict.severity}
                          </span>
                        </div>

                        <div className="mt-6 space-y-5">
                          <section>
                            <p className="section-kicker mb-2 text-[10px] font-semibold text-rose-200/70">Situation</p>
                            <p className="text-sm leading-7 text-slate-300">{selectedConflict.summary}</p>
                          </section>
                          <section>
                            <p className="section-kicker mb-2 text-[10px] font-semibold text-orange-200/70">Human cost</p>
                            <p className="text-sm leading-7 text-slate-300">{selectedConflict.humanitarianNote}</p>
                          </section>
                          <section className="rounded-[0.5rem] border border-cyan-300/15 bg-cyan-400/8 p-4">
                            <p className="section-kicker mb-2 text-[10px] font-semibold text-cyan-100/80">Repair lens</p>
                            <p className="text-sm leading-7 text-cyan-50/88">{selectedConflict.repairLesson}</p>
                          </section>
                        </div>

                        <div className="mt-7">
                          <p className="section-kicker mb-3 text-[10px] font-semibold text-slate-400">Sources</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedConflict.sources.map((source) => (
                              <a
                                key={`${selectedConflict.id}-${source.href}`}
                                href={source.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300 transition-colors duration-200 hover:border-cyan-300/30 hover:text-white"
                              >
                                {source.label}
                              </a>
                            ))}
                          </div>
                          <p className="mt-4 text-xs leading-5 text-slate-500">
                            Static v1 dataset. Use linked trackers for current reporting before making decisions.
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">No cases match this filter.</div>
                  )}
                </aside>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
