'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import Button from '@/components/ui/Button'

const HeroScene = dynamic(() => import('@/components/three/hero/HeroScene'), {
  ssr: false,
  loading: () => <div className="theme-hero-fallback absolute inset-0" />,
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
  const pointerRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    motion: 0,
    active: false,
  })
  const pulseRef = useRef({ x: 0, y: 0, strength: 0 })
  const convergenceRef = useRef(0)

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    const pointer = pointerRef.current
    const deltaX = x - pointer.targetX
    const deltaY = y - pointer.targetY
    const motion = Math.min(1, Math.hypot(deltaX, deltaY) * 3.2)

    pointer.targetX = x
    pointer.targetY = y
    pointer.vx = THREE.MathUtils.clamp(deltaX * 2.4, -1, 1)
    pointer.vy = THREE.MathUtils.clamp(deltaY * 2.4, -1, 1)
    pointer.motion = Math.max(pointer.motion, motion)
    pointer.active = true
  }

  function handlePointerLeave() {
    const pointer = pointerRef.current

    pointer.targetX = 0
    pointer.targetY = 0
    pointer.motion = Math.min(pointer.motion, 0.18)
    pointer.active = false
  }

  function handleSceneClick(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement

    if (target.closest('a, button, input, textarea, select, label')) {
      return
    }

    const pointer = pointerRef.current
    pulseRef.current.x = pointer.x * 2.6
    pulseRef.current.y = pointer.y * 1.45
    pulseRef.current.strength = 1
    convergenceRef.current = 1
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050611]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleSceneClick}
    >
      <div className="absolute inset-0 z-0">
        <HeroScene pointerRef={pointerRef} pulseRef={pulseRef} convergenceRef={convergenceRef} />
      </div>

      <div className="theme-hero-overlay pointer-events-none absolute inset-0 z-10" />
      <div className="theme-hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40" />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-28 pb-20 text-center sm:px-8 lg:pt-32">
        <motion.p
          className="hero-eyebrow eyebrow-label theme-surface-overlay mb-8 rounded-full px-4 py-2 text-xs font-semibold text-cyan-50/85 backdrop-blur-md"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          Peace, Examined Under Pressure
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="relative max-w-5xl"
        >
          <div className="pointer-events-none absolute inset-x-6 top-1/2 -z-10 h-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(8,14,28,0.8)_0%,rgba(8,14,28,0.38)_58%,transparent_100%)] blur-3xl sm:h-36 xl:h-44" />
          <h1 className="hero-headline font-display text-5xl leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[8rem]">
            <span className="block whitespace-nowrap">Peace and</span>
            <span className="block whitespace-nowrap">Global Harmony</span>
          </h1>
        </motion.div>

        <motion.p
          className="hero-copy mt-8 max-w-2xl text-base leading-8 text-slate-200 sm:mt-9 sm:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.9}
        >
          Conflict spreads fast. Peace survives when people choose each other under pressure.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5"
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
          className="theme-surface-panel mt-14 grid w-full max-w-4xl gap-4 rounded-[2rem] p-5 text-left backdrop-blur-xl sm:grid-cols-3 sm:p-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.35}
        >
          <div className="theme-surface-card rounded-[1.5rem] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/75">Move</p>
            <p className="mt-2 text-sm text-slate-200">Disturb the field. Feel how fragile order can be.</p>
          </div>
          <div className="theme-surface-card rounded-[1.5rem] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-300/75">Click</p>
            <p className="mt-2 text-sm text-slate-200">Pull the system toward alignment, for a moment.</p>
          </div>
          <div className="theme-surface-card rounded-[1.5rem] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/75">Scroll</p>
            <p className="mt-2 text-sm text-slate-200">Follow the shift from fracture to repair.</p>
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
