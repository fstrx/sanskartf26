'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { globalRegions } from '@/lib/content'
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations'
import Glyph from '@/components/ui/Glyph'
import SectionWrapper from '@/components/ui/SectionWrapper'

const REGION_SCROLL_STEP = 48

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export default function Global() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] })

  const stageHeight = `calc(100svh + ${(globalRegions.length - 1) * REGION_SCROLL_STEP}svh)`

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(globalRegions.length - 1, Math.floor(clamp(value) * globalRegions.length))
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
  })

  function handleRegionSelect(index: number) {
    setActiveIndex(index)

    if (typeof window === 'undefined' || !stageRef.current) {
      return
    }

    const stageTop = window.scrollY + stageRef.current.getBoundingClientRect().top
    const scrollRange = Math.max(stageRef.current.offsetHeight - window.innerHeight, 0)
    const segmentProgress = index / Math.max(1, globalRegions.length - 1)

    window.scrollTo({
      top: stageTop + scrollRange * segmentProgress,
      behavior: 'smooth',
    })
  }

  const active = globalRegions[activeIndex]

  return (
    <SectionWrapper id="global" className="min-h-screen bg-[#030b10] py-28 lg:py-32 !overflow-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/2 h-96 w-96 rounded-full bg-cyan-900/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-900/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow-label mb-3 text-xs font-bold text-cyan-400"
          >
            Repair in Practice
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="premium-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            How the World Practices <span className="text-cyan-200">Repair</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            No region heals the same way, but each shows that repair becomes real when people keep choosing it.
          </motion.p>
        </motion.div>
      </div>

      <div ref={stageRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ height: stageHeight }}>
        <div className="sticky top-20 flex min-h-[calc(100svh-5rem)] items-start py-4 lg:items-center lg:py-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex w-full flex-col gap-10 lg:flex-row"
          >
            <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:w-60 lg:flex-shrink-0 lg:flex-col lg:overflow-visible lg:pb-0">
              <div className="theme-surface-card hidden rounded-[0.75rem] p-5 lg:block">
                <p className="section-kicker text-[10px] font-medium text-cyan-200/65">Scroll to move</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">Tap any region to see how repair takes root there.</p>
              </div>

              {globalRegions.map((region, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={region.id}
                    onClick={() => handleRegionSelect(index)}
                    className={`flex flex-shrink-0 items-center gap-4 rounded-[0.5rem] border px-5 py-4 text-left whitespace-nowrap transition-all duration-250 lg:whitespace-normal ${
                      isActive
                        ? 'border-white/15 text-white shadow-[0_0_28px_rgba(34,211,238,0.06)]'
                        : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${region.color}15 0%, transparent 100%)`,
                            borderColor: region.color + '30',
                          }
                        : undefined
                    }
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[0.375rem] border border-white/10 bg-white/[0.03] text-slate-200">
                      <Glyph name={region.glyph} className="h-5 w-5" title={region.name} />
                    </span>
                    <div>
                      <p className="section-kicker text-[10px] font-medium text-slate-500">{String(index + 1).padStart(2, '0')}</p>
                      <p className="text-sm font-semibold">{region.name}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="region-indicator"
                        className="ml-auto hidden h-1.5 w-1.5 rounded-full lg:block"
                        style={{ background: region.color }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="min-h-[440px] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                   className="theme-surface-panel h-full rounded-[2rem] p-7 sm:p-9 lg:p-11"
                   style={{
                     backdropFilter: 'blur(16px)',
                   }}
                >
                  <div className="section-kicker mb-5 flex items-center justify-between gap-4 text-[10px] font-medium text-slate-400">
                    <span>Global Lesson {activeIndex + 1} / {globalRegions.length}</span>
                    <span>Scroll or tap</span>
                  </div>

                  <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full transition-[width] duration-300"
                      style={{ width: `${((activeIndex + 1) / globalRegions.length) * 100}%`, background: active.color }}
                    />
                  </div>

                  <div className="mb-8 flex items-start gap-5">
                    <span className="flex h-16 w-16 items-center justify-center rounded-[0.75rem] border bg-white/[0.03]" style={{ borderColor: active.color + '30', color: active.color }}>
                      <Glyph name={active.glyph} className="h-8 w-8" title={active.name} />
                    </span>
                    <div>
                      <p className="section-kicker mb-1 text-xs font-medium" style={{ color: active.color }}>
                        {active.name}
                      </p>
                      <h3 className="premium-heading text-2xl leading-tight text-white sm:text-3xl">{active.title}</h3>
                    </div>
                  </div>

                  <div
                    className="mb-6 h-px w-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${active.color}60, transparent)` }}
                  />

                  <p className="mb-10 max-w-3xl text-base leading-8 text-slate-300">{active.description}</p>

                  <div>
                    <p className="section-kicker mb-4 text-xs font-medium" style={{ color: active.color + 'cc' }}>
                      What This Region Reveals
                    </p>
                    <ul className="space-y-4">
                      {active.efforts.map((effort, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                          className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: active.color }} />
                          {effort}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                   <div className="theme-surface-card mt-10 rounded-[0.5rem] p-6">
                    <p className="section-kicker mb-2 text-xs font-medium" style={{ color: active.color + 'cc' }}>
                      Carry Forward
                    </p>
                    <p className="text-sm leading-relaxed text-slate-300">{active.lesson}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
