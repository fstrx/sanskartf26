'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import Button from '@/components/ui/Button'

const HeroScene = dynamic(() => import('@/components/three/hero/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0d0010] via-[#020818] to-[#03131d]" />
  ),
})

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050611]"
    >
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(3,5,12,0.5)_62%,rgba(3,5,12,0.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#0d0208]" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-24 text-center sm:px-8">
        <motion.p
          className="mb-6 text-xs font-semibold uppercase tracking-[0.42em] text-cyan-100/60"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          A Journey from Chaos to Harmony
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="max-w-4xl"
        >
          <AnimatedText
            as="h1"
            text="Peace and Global Harmony"
            className="justify-center text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[8rem]"
          />
        </motion.div>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.9}
        >
          Trace how division takes hold, how understanding begins, and how shared human choices can
          still bend the future toward peace.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.1}
        >
          <Button href="#chaos" variant="primary" className="px-8 py-4 text-base">
            Start the Journey
          </Button>
          <Button href="#cta" variant="ghost" className="px-8 py-4 text-base">
            Add Your Voice
          </Button>
        </motion.div>

        <motion.div
          className="mt-10 grid w-full max-w-3xl gap-3 rounded-[2rem] border border-white/10 bg-slate-950/35 p-4 text-left backdrop-blur-xl sm:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.35}
        >
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/75">Move</p>
            <p className="mt-2 text-sm text-slate-200">Shift the camera and bend the field around your cursor.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-300/75">Click</p>
            <p className="mt-2 text-sm text-slate-200">Pull the particles toward unity for a brief moment.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/75">Continue</p>
            <p className="mt-2 text-sm text-slate-200">Follow the story from fracture, to repair, to participation.</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center text-white/35"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.55}
      >
        <p className="text-[10px] uppercase tracking-[0.42em]">Scroll</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
