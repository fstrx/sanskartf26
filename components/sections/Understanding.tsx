'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { understandingSteps } from '@/lib/content'
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations'
import SectionWrapper from '@/components/ui/SectionWrapper'

const UnderstandingScene = dynamic(() => import('@/components/three/understanding/UnderstandingScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 rounded-[2rem] bg-[#060812]" />,
})

const quickPractices = ['Listen before reacting', 'Name shared stakes', 'Build trust in public', 'Protect dignity', 'Repair harm']

export default function Understanding() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = understandingSteps[activeIndex]

  return (
    <SectionWrapper id="understanding" className="min-h-screen bg-[#060812] py-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/12 blur-3xl" />
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
            className="eyebrow-label mb-3 text-xs font-bold text-indigo-300"
          >
            How Peace Takes Shape
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            From Understanding to <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">Repair</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-300">
            Peace is not accidental. It grows through choices, habits, and institutions that rebuild trust
            after fear has done its work.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="theme-surface-panel grid gap-8 rounded-[2rem] p-5 backdrop-blur-xl lg:grid-cols-[1.05fr_1.15fr] lg:p-7"
        >
          <div className="theme-surface-card flex flex-col justify-between rounded-[1.75rem] p-6 sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200/70">Turning Point</p>
              <h3 className="font-display mt-4 text-3xl text-white sm:text-4xl">{activeStep.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{activeStep.description}</p>

              {activeStep.quote && (
                <blockquote className="theme-surface-overlay mt-6 rounded-2xl p-5 text-slate-200">
                  <p className="text-lg italic leading-relaxed">&ldquo;{activeStep.quote}&rdquo;</p>
                  {activeStep.author && <footer className="mt-3 text-sm text-slate-400">{activeStep.author}</footer>}
                </blockquote>
              )}
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-200/65">Practices of Repair</p>
              <div className="mt-4 flex flex-wrap gap-2">
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

          <div className="flex flex-col gap-4">
            <div className="relative min-h-[20rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)] sm:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <UnderstandingScene
                steps={understandingSteps}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />

              <div className="theme-surface-overlay pointer-events-none absolute left-4 top-4 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-200 backdrop-blur-md sm:left-6 sm:top-6">
                Tap or hover the network
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {understandingSteps.map((step, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-cyan-300/35 bg-cyan-400/10 text-white shadow-[0_0_30px_rgba(34,211,238,0.12)]'
                        : 'theme-surface-card text-slate-300 hover:border-white/20 hover:text-white'
                     }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Step {step.step}</p>
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
          className="mt-16 text-center"
        >
          <p className="text-lg text-slate-300">
            The next step is participation.{' '}
            <a
              href="#interactive"
              className="text-indigo-300 underline underline-offset-4 transition-colors duration-200 hover:text-indigo-200"
            >
              Take part in the story.
            </a>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
