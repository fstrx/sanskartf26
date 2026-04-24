'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { understandingSteps } from '@/lib/content'
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations'
import SectionWrapper from '@/components/ui/SectionWrapper'

const UnderstandingScene = dynamic(() => import('@/components/three/understanding/UnderstandingScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 rounded-[2rem] bg-[#060812]" />,
})



const repairVisuals = [
  {
    label: 'Listening stays open',
    marker: 'Same room',
    description: 'People stay in the same space long enough for trust to begin again.',
  },
  {
    label: 'The human being comes first',
    marker: 'Shared humanity',
    description: 'Different sides begin to gather around the same human center.',
  },
  {
    label: 'Fear is questioned',
    marker: 'Learning path',
    description: 'Hidden stories are named clearly so they can be challenged with care.',
  },
  {
    label: 'Trust is built into daily life',
    marker: 'Shared support',
    description: 'Separate supports begin to act like one bridge carrying people together.',
  },
  {
    label: 'Truth is faced with care',
    marker: 'Making things right',
    description: 'The hurt is not hidden while the circle slowly closes around it.',
  },
]

function RepairVisual({ activeIndex }: { activeIndex: number }) {
  const visual = repairVisuals[activeIndex]

  return (
    <div className="relative min-h-[18rem] overflow-hidden rounded-[0.5rem] border border-cyan-200/10 bg-[radial-gradient(circle_at_50%_18%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(145deg,rgba(15,23,42,0.7),rgba(2,6,23,0.86))] p-5 sm:min-h-[20rem] sm:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-indigo-200/20 to-transparent" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker text-[10px] font-medium text-cyan-200/70">{visual.marker}</p>
          <p className="mt-2 max-w-[18rem] text-sm leading-6 text-slate-300">{visual.description}</p>
        </div>
        <div className="rounded-full border border-cyan-200/15 bg-cyan-300/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-100/80">
          0{activeIndex + 1}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-5 bottom-14 top-24 sm:inset-x-8 sm:bottom-16"
        >
          {activeIndex === 0 && <DialogueVisual />}
          {activeIndex === 1 && <EmpathyVisual />}
          {activeIndex === 2 && <LearningVisual />}
          {activeIndex === 3 && <BridgeVisual />}
          {activeIndex === 4 && <JusticeVisual />}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-4 sm:left-6 sm:right-6">
        <p className="max-w-[15rem] text-sm font-semibold text-white">{visual.label}</p>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-white/8">
          <motion.div
            key={`meter-${activeIndex}`}
            initial={{ width: '18%' }}
            animate={{ width: `${34 + activeIndex * 14}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-cyan-200"
          />
        </div>
      </div>
    </div>
  )
}

function SignalPoint({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.76, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute flex h-16 w-16 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.16)] ${className}`}
    >
      <span className="h-3 w-3 rounded-full bg-cyan-100" />
    </motion.div>
  )
}

function DialogueVisual() {
  return (
    <div className="absolute inset-0 mx-auto max-w-[26rem]">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 h-24 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] border border-cyan-100/18"
      />
      <SignalPoint className="left-[14%] top-1/2 -translate-y-1/2" delay={0.08} />
      <SignalPoint className="right-[14%] top-1/2 -translate-y-1/2" delay={0.16} />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.28, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[28%] right-[28%] top-1/2 h-px origin-left bg-gradient-to-r from-cyan-200 via-white to-cyan-200"
      />
      <motion.div
        animate={{ opacity: [0.18, 0.42, 0.18] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/14 blur-2xl"
      />
    </div>
  )
}

function EmpathyVisual() {
  return (
    <div className="absolute inset-0 mx-auto max-w-[26rem]">
      <motion.div
        initial={{ x: -18, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[15%] top-1/2 h-24 w-20 -translate-y-1/2 rounded-[48%_52%_45%_55%] border border-indigo-200/28 bg-indigo-300/8 sm:h-28 sm:w-24"
      />
      <motion.div
        initial={{ x: 18, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[15%] top-1/2 h-24 w-20 -translate-y-1/2 rounded-[52%_48%_55%_45%] border border-cyan-200/28 bg-cyan-300/8 sm:h-28 sm:w-24"
      />
      <motion.div
        initial={{ scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/8"
      >
        <span className="h-8 w-8 rounded-full bg-cyan-100/90" />
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.38, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[28%] right-[28%] top-[72%] h-px origin-center bg-gradient-to-r from-indigo-200 via-white to-cyan-200"
      />
    </div>
  )
}

function LearningVisual() {
  const rows = ['Identity', 'Source', 'Pattern']

  return (
    <div className="absolute inset-0 mx-auto max-w-[26rem]">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, rotate: -14, y: 12 }}
          animate={{ opacity: 1, rotate: index % 2 === 0 ? 6 : -5, y: 0 }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
          className="absolute h-8 w-2 rounded-full bg-rose-300/55"
          style={{ left: `${12 + index * 8}%`, top: `${24 + (index % 3) * 13}%` }}
        />
      ))}

      <div className="absolute right-[6%] top-1/2 w-[58%] -translate-y-1/2 space-y-3 sm:space-y-4">
        {rows.map((row, index) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300/10 text-[10px] font-bold text-cyan-100">
              {index + 1}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-cyan-100/80 to-cyan-100/10" />
            <span className="w-16 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-300 sm:w-20 sm:text-[10px] sm:tracking-[0.18em]">{row}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BridgeVisual() {
  return (
    <div className="absolute inset-0 mx-auto max-w-[26rem]">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[12%] right-[12%] top-1/2 h-2 origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-200 via-cyan-100 to-emerald-200"
      />
      {[18, 34, 50, 66, 82].map((left, index) => (
        <motion.div
          key={left}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.08 + index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 h-[36%] w-3 origin-top rounded-b-full border border-cyan-200/18 bg-white/8"
          style={{ left: `${left}%` }}
        />
      ))}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.25, ease: 'easeInOut' }}
          className="absolute top-[26%] h-4 w-4 rounded-full bg-cyan-100/80"
          style={{ left: `${31 + index * 18}%` }}
        />
      ))}
    </div>
  )
}

function JusticeVisual() {
  return (
    <div className="absolute inset-0 mx-auto max-w-[26rem]">
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/24 sm:h-32 sm:w-32"
      />
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <svg className="h-full w-full" viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <motion.path
            d="M160 36 L148 67 L173 91 L151 121 L165 148"
            stroke="rgb(252 165 165 / 0.82)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M103 91 C125 71 148 63 160 67 C177 72 190 86 217 79"
            stroke="rgb(165 243 252 / 0.92)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.26, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-100 text-[10px] font-black uppercase tracking-[0.14em] text-slate-950 sm:h-16 sm:w-16 sm:text-xs sm:tracking-[0.16em]"
      >
        Truth
      </motion.div>
    </div>
  )
}

export default function Understanding() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = understandingSteps[activeIndex]

  return (
    <SectionWrapper id="understanding" className="min-h-screen bg-[#060812] py-28 lg:py-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow-label mb-3 text-xs font-bold text-indigo-300"
          >
            Healing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="premium-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            How <span className="text-cyan-200">Healing Begins</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-slate-300">
            Healing begins when people tell the truth about hurt, keep listening, and choose a kinder way forward.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="theme-surface-panel grid gap-10 rounded-[2.25rem] p-6 backdrop-blur-xl lg:grid-cols-[1.02fr_1.18fr] lg:p-8"
        >
          <div className="theme-surface-card flex flex-col justify-between rounded-[0.75rem] p-5 sm:p-7">
            <div>
              <RepairVisual activeIndex={activeIndex} />

              <p className="section-kicker mt-8 text-[10px] font-medium text-cyan-200/70">How healing starts</p>
              <h3 className="premium-heading mt-4 text-3xl text-white sm:text-4xl">{activeStep.title}</h3>
              <p className="mt-5 text-base leading-8 text-slate-300">{activeStep.description}</p>

              {activeStep.quote && (
                <blockquote className="mt-6 border-l border-cyan-200/30 pl-5 text-slate-300">
                  <p className="text-sm italic leading-7">&ldquo;{activeStep.quote}&rdquo;</p>
                  {activeStep.author && <footer className="mt-3 text-sm text-slate-400">{activeStep.author}</footer>}
                </blockquote>
              )}
            </div>

            <div className="mt-10">
              <p className="section-kicker text-[10px] font-medium text-indigo-200/65">Small practices that rebuild trust</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {quickPractices.map((practice, index) => (
                  <span
                    key={practice}
                    className={`max-w-full break-words rounded-2xl border px-3 py-2 text-xs font-semibold whitespace-normal text-pretty ${
                      index === activeIndex
                        ? 'border-cyan-300/35 bg-cyan-400/10 text-cyan-100'
                        : 'theme-surface-card text-slate-300'
                     }`}
                  >
                    {practice}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative min-h-[20rem] overflow-hidden rounded-[0.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)] sm:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <UnderstandingScene
                steps={understandingSteps}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />

              <div className="theme-surface-overlay pointer-events-none absolute left-4 top-4 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-200 backdrop-blur-md sm:left-6 sm:top-6">
                Tap a step
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {understandingSteps.map((step, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                      className={`rounded-[0.75rem] border px-5 py-4 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-cyan-300/35 bg-cyan-400/10 text-white shadow-[0_0_30px_rgba(34,211,238,0.12)]'
                        : 'theme-surface-card text-slate-300 hover:border-white/20 hover:text-white'
                     }`}
                  >
                    <p className="section-kicker text-[10px] font-medium text-slate-400">Step {step.step}</p>
                    <p className="mt-2 text-sm font-semibold leading-snug">{step.title}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-20 text-center"
        >
          <p className="text-lg text-slate-300">
            Healing only matters if it changes how we act.{' '}
            <a
              href="#interactive"
              className="text-indigo-300 underline underline-offset-4 transition-colors duration-200 hover:text-indigo-200"
            >
              Try the choices section.
            </a>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
