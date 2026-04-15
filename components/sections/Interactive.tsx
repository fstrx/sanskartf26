'use client'

import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { interactivePrompts, peaceMessages } from '@/lib/content'
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations'
import SectionWrapper from '@/components/ui/SectionWrapper'

const CenterpieceScene = dynamic(() => import('@/components/three/centerpiece/CenterpieceScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 rounded-[2rem] bg-[#010d1a]" />,
})

const themeAccents = {
  dialogue: 'text-cyan-200 border-cyan-300/25 bg-cyan-400/10',
  empathy: 'text-violet-100 border-violet-300/25 bg-violet-400/10',
  justice: 'text-emerald-100 border-emerald-300/25 bg-emerald-400/10',
  unity: 'text-amber-100 border-amber-300/25 bg-amber-400/10',
} as const

const storyStages = [
  {
    label: 'Phase 01',
    title: 'Disorder resists contact',
    body: 'At first the field pushes back. Move your cursor through it and feel how fragile systems react to pressure.',
  },
  {
    label: 'Phase 02',
    title: 'Choice changes the force',
    body: 'Click to switch from repelling to attracting. The same hand that disrupts can also begin to gather.',
  },
  {
    label: 'Phase 03',
    title: 'Harmony becomes visible',
    body: 'Keep scrolling and the field aligns into a shared peace symbol, turning individual motion into collective form.',
  },
] as const

const desktopSlideCount = storyStages.length + 1
const DESKTOP_STAGE_STEP = 48

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function getPanelProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start))
}

export default function Interactive() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [harmonyProgress, setHarmonyProgress] = useState(0)
  const [forceMode, setForceMode] = useState<'repel' | 'attract'>('repel')
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setHarmonyProgress(clamp(value))
  })

  const highlightedMessage = peaceMessages[Math.min(peaceMessages.length - 1, Math.floor(harmonyProgress * (peaceMessages.length - 1)))]
  const activeStageIndex = Math.min(storyStages.length - 1, Math.floor(harmonyProgress * storyStages.length))
  const desktopPanelShift = harmonyProgress * (desktopSlideCount - 1) * 100
  const desktopStageHeight = `calc(100svh + ${(desktopSlideCount - 1) * DESKTOP_STAGE_STEP}svh)`
  const endingReveal = getPanelProgress(harmonyProgress, 0.82, 1)

  const panelStates = useMemo(
    () => [
      getPanelProgress(harmonyProgress, 0.02, 0.34),
      getPanelProgress(harmonyProgress, 0.3, 0.67),
      getPanelProgress(harmonyProgress, 0.62, 1),
    ],
    [harmonyProgress]
  )

  const renderEndingContent = (className = '') => (
    <div className={className}>
      <div className="mx-auto mb-6 flex max-w-4xl flex-wrap justify-center gap-3">
        {interactivePrompts.map((prompt) => (
          <div key={prompt} className="theme-surface-card rounded-full px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
            {prompt}
          </div>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="text-base text-slate-300"
      >
        Peace becomes real when people participate in it.{' '}
        <a
          href="#cta"
          className="text-violet-300 underline underline-offset-4 transition-colors duration-200 hover:text-violet-200"
        >
          Contribute your own message or suggestion.
        </a>
      </motion.p>
    </div>
  )

  return (
    <SectionWrapper id="interactive" className="min-h-screen bg-[#010d1a] py-24 !overflow-visible">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-900/12 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-900/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow-label mb-3 text-xs font-bold text-purple-300"
          >
            Add to the Chorus
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            A Field of{' '}
            <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Voices Choosing Peace
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-300">
            Move through disorder, click to change the force you exert, and scroll through the stage until scattered particles align into a shared symbol of harmony.
          </motion.p>
        </motion.div>
      </div>

      <div ref={stageRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <div className="theme-surface-panel w-full overflow-hidden rounded-[2rem] backdrop-blur-xl">
            <div className="grid gap-6 p-5 lg:p-6">
              <div className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_48%)] sm:min-h-[34rem]">
                <CenterpieceScene harmonyProgress={harmonyProgress} onModeChange={setForceMode} />

                <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                  <span className="theme-surface-overlay rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-100 backdrop-blur-md">
                    Move to {forceMode}
                  </span>
                  <span className="theme-surface-overlay rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-100 backdrop-blur-md">
                    Click for ripple
                  </span>
                </div>

                <div className="theme-surface-overlay pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-300">
                    <span>{storyStages[activeStageIndex].label}</span>
                    <span>{Math.round(harmonyProgress * 100)}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-300 transition-[width] duration-300"
                      style={{ width: `${Math.max(8, harmonyProgress * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {storyStages.map((stage, index) => {
                  const intensity = panelStates[index]

                  return (
                    <motion.div
                      key={stage.label}
                      animate={{
                        opacity: 0.24 + intensity * 0.76,
                        y: 28 - intensity * 28,
                        scale: 0.97 + intensity * 0.03,
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`rounded-[1.75rem] border p-6 ${
                        activeStageIndex === index
                          ? 'border-white/16 bg-white/8 shadow-[0_0_50px_rgba(34,211,238,0.08)]'
                          : 'theme-surface-card'
                       }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200/70">{stage.label}</p>
                      <h3 className="mt-3 text-2xl font-bold text-white">{stage.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{stage.body}</p>
                    </motion.div>
                  )
                })}

                <motion.div
                  animate={{ opacity: 0.25 + panelStates[2] * 0.75, y: 30 - panelStates[2] * 30 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="theme-surface-card rounded-[1.75rem] p-6"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-200/70">Message in focus</p>
                   <div className="theme-surface-overlay mt-4 rounded-[1.5rem] p-5">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${themeAccents[highlightedMessage.theme]}`}>
                      {highlightedMessage.theme}
                    </span>
                    <p className="mt-4 text-xl font-semibold leading-relaxed text-white">{highlightedMessage.text}</p>
                    <p className="mt-3 text-sm text-slate-400">{highlightedMessage.origin}</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 0.18 + panelStates[2] * 0.82, y: 34 - panelStates[2] * 34 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {peaceMessages.slice(0, 4).map((message) => (
                    <div
                      key={message.text}
                      className={`rounded-2xl border p-4 text-sm leading-relaxed backdrop-blur-md ${themeAccents[message.theme]}`}
                    >
                      <p className="font-medium">{message.text}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">{message.origin}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block" style={{ height: desktopStageHeight }}>
          <div className="lg:sticky lg:top-6 lg:flex lg:min-h-[calc(100svh-3rem)] lg:flex-col lg:justify-center lg:gap-5 lg:py-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
               className="theme-surface-panel w-full overflow-hidden rounded-[2rem] backdrop-blur-xl lg:h-[calc(100svh-12rem)]"
            >
              <div className="grid gap-6 p-5 lg:h-full lg:grid-cols-[1.2fr_0.8fr] lg:p-6">
                <div className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_48%)] sm:min-h-[34rem] lg:h-full lg:min-h-0">
                  <CenterpieceScene harmonyProgress={harmonyProgress} onModeChange={setForceMode} />

                  <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                    <span className="theme-surface-overlay rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-100 backdrop-blur-md">
                      Move to {forceMode}
                    </span>
                    <span className="theme-surface-overlay rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-100 backdrop-blur-md">
                      Click for ripple
                    </span>
                  </div>

                  <div className="theme-surface-overlay pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-300">
                      <span>{storyStages[activeStageIndex].label}</span>
                      <span>{Math.round(harmonyProgress * 100)}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-300 transition-[width] duration-300"
                        style={{ width: `${Math.max(8, harmonyProgress * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="theme-surface-card relative h-full overflow-hidden rounded-[1.75rem]">
                    <motion.div
                      animate={{ y: `-${desktopPanelShift}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex h-full flex-col"
                    >
                      {storyStages.map((stage, index) => (
                        <div key={stage.label} className="flex h-full min-h-0 shrink-0 flex-col justify-center p-8">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200/70">{stage.label}</p>
                          <h3 className="mt-4 text-3xl font-bold text-white">{stage.title}</h3>
                          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300">{stage.body}</p>

                          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-300 transition-[width] duration-300"
                              style={{ width: `${Math.max(8, panelStates[index] * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}

                      <div className="flex h-full min-h-0 shrink-0 flex-col justify-center gap-5 p-6 xl:p-8">
                        <div className="theme-surface-overlay rounded-[1.75rem] p-5 xl:p-6">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-200/70">Message in focus</p>
                          <span className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${themeAccents[highlightedMessage.theme]}`}>
                            {highlightedMessage.theme}
                          </span>
                          <p className="mt-4 text-xl font-semibold leading-relaxed text-white">{highlightedMessage.text}</p>
                          <p className="mt-3 text-sm text-slate-400">{highlightedMessage.origin}</p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {peaceMessages.slice(0, 4).map((message) => (
                            <div
                              key={message.text}
                              className={`rounded-2xl border p-4 text-sm leading-relaxed backdrop-blur-md ${themeAccents[message.theme]}`}
                            >
                              <p className="font-medium">{message.text}</p>
                              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">{message.origin}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ opacity: endingReveal, y: 28 - endingReveal * 28 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              {renderEndingContent('mx-auto max-w-5xl px-4 text-center')}
            </motion.div>
          </div>
        </div>
      </div>

      {renderEndingContent('relative z-10 mx-auto mt-8 max-w-7xl px-4 text-center sm:px-6 lg:hidden lg:px-8')}
    </SectionWrapper>
  )
}
