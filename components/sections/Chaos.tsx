'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { chaosContent } from '@/lib/content'
import { fadeUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/animations'
import Glyph from '@/components/ui/Glyph'
import SectionWrapper from '@/components/ui/SectionWrapper'

const ChaosScene = dynamic(() => import('@/components/three/chaos/ChaosScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0d0208]" />,
})

export default function Chaos() {
  return (
    <SectionWrapper id="chaos" className="min-h-screen bg-[#0d0208] py-28 lg:py-32">
      <div className="absolute inset-0 opacity-70">
        <ChaosScene />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-900/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-orange-900/10 blur-3xl" />
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
            className="eyebrow-label mb-3 text-xs font-bold text-red-400"
          >
            Why Conflict Starts
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="premium-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            When Peace Starts <span className="text-red-300">Slipping Away</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-slate-300">
            Peace usually slips away in familiar ways: fear grows, lies spread, people feel left behind, and hurt turns into harm.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {chaosContent.map((card) => (
            <motion.article
              key={card.id}
              variants={scaleIn}
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              className="theme-surface-panel group relative overflow-hidden rounded-[2rem] p-7 backdrop-blur-md sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.15),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-400/18 bg-white/[0.03] text-red-100/90">
                    <Glyph name={card.icon} className="h-6 w-6" title={card.title} />
                  </span>
                  <span className="section-kicker rounded-full border border-red-400/16 bg-red-500/8 px-3 py-1 text-[10px] font-medium text-red-200/70" chaos-reason-badge>
                    Reason {card.id}
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold leading-snug text-white transition-colors duration-200 group-hover:text-red-100">
                  {card.title}
                </h3>
                <p className="mb-6 text-sm leading-7 text-slate-300">{card.description}</p>

                {card.stat && (
                  <p className="mb-5 border-l border-red-400/28 pl-4 text-xs font-medium text-red-200/78">
                    {card.stat}
                  </p>
                )}

                <div className="theme-surface-overlay rounded-[0.75rem] p-5">
                  <p className="section-kicker text-[10px] font-medium text-orange-200/70">A gentler way forward</p>
                  <p className="mt-2 text-sm text-slate-200">{card.pathForward}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-20 text-center"
        >
          <p className="text-lg text-slate-300">
            If people can pull peace apart, people can also help hold it together again.{' '}
            <a
              href="#understanding"
              className="text-violet-300 underline underline-offset-4 transition-colors duration-200 hover:text-violet-200"
            >
              See how healing begins.
            </a>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
