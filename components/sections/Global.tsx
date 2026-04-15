'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { globalRegions } from '@/lib/content'
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations'
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
    <SectionWrapper id="global" className="min-h-screen bg-[#030b10] py-24 !overflow-visible">
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
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow-label mb-3 text-xs font-bold text-cyan-400"
          >
            GLOBAL PERSPECTIVES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            How the World Practices{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Peace
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            No single culture owns peace-building. Scroll through each region to see how peace is practiced differently around the world.
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
            className="flex w-full flex-col gap-8 lg:flex-row"
          >
            <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:w-60 lg:flex-shrink-0 lg:flex-col lg:overflow-visible lg:pb-0">
              <div className="theme-surface-card hidden rounded-2xl p-4 lg:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/65">Scroll to move</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">Tap any region to jump directly to it.</p>
              </div>

              {globalRegions.map((region, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={region.id}
                    onClick={() => handleRegionSelect(index)}
                    className={`flex flex-shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left whitespace-nowrap transition-all duration-250 lg:whitespace-normal ${
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
                    <span className="text-xl">{region.flag}</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{String(index + 1).padStart(2, '0')}</p>
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
                   className="theme-surface-panel h-full rounded-2xl p-6 sm:p-8 lg:p-10"
                   style={{
                     backdropFilter: 'blur(16px)',
                   }}
                >
                  <div className="mb-5 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                    <span>Global Practice {activeIndex + 1} / {globalRegions.length}</span>
                    <span>Scroll or tap</span>
                  </div>

                  <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full transition-[width] duration-300"
                      style={{ width: `${((activeIndex + 1) / globalRegions.length) * 100}%`, background: active.color }}
                    />
                  </div>

                  <div className="mb-6 flex items-start gap-4">
                    <span className="text-4xl">{active.flag}</span>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: active.color }}>
                        {active.name}
                      </p>
                      <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{active.title}</h3>
                    </div>
                  </div>

                  <div
                    className="mb-6 h-px w-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${active.color}60, transparent)` }}
                  />

                  <p className="mb-8 text-base leading-relaxed text-slate-300">{active.description}</p>

                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: active.color + 'cc' }}>
                      What This Region Teaches
                    </p>
                    <ul className="space-y-3">
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

                   <div className="theme-surface-card mt-8 rounded-2xl p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: active.color + 'cc' }}>
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
