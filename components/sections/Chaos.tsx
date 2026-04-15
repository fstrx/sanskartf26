'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { chaosContent } from '@/lib/content'
import { fadeUp, staggerContainer, scaleIn, viewportConfig } from '@/lib/animations'
import SectionWrapper from '@/components/ui/SectionWrapper'

const ChaosScene = dynamic(() => import('@/components/three/chaos/ChaosScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0d0208]" />,
})

export default function Chaos() {
  return (
    <SectionWrapper id="chaos" className="min-h-screen bg-[#0d0208] py-24">
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
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow-label mb-3 text-xs font-bold text-red-400"
          >
            Where Peace Breaks Down
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            How Harmony <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Unravels</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-300">
            Conflict rarely erupts from one cause. It grows through patterns that turn tension into fear,
            fear into separation, and separation into violence.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {chaosContent.map((card) => (
            <motion.article
              key={card.id}
              variants={scaleIn}
              whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(20,5,5,0.72),rgba(12,4,4,0.92))] p-6 backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.15),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-red-200/80">
                    Pattern {card.id}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-red-100">
                  {card.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-300">{card.description}</p>

                {card.stat && (
                  <p className="mb-4 border-l border-red-400/35 pl-4 text-xs font-semibold uppercase tracking-[0.18em] text-red-200/85">
                    {card.stat}
                  </p>
                )}

                <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-200/70">Path Forward</p>
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
          className="mt-16 text-center"
        >
          <p className="text-lg text-slate-300">
            If chaos is constructed, it can be unmade.{' '}
            <a
              href="#understanding"
              className="text-violet-300 underline underline-offset-4 transition-colors duration-200 hover:text-violet-200"
            >
              See how peace gets rebuilt.
            </a>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
