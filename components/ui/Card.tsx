'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function Card({ children, className = '', glowColor }: CardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)' }}
      whileHover={{
        scale: 1.03,
        borderColor: glowColor ? `${glowColor}55` : 'rgba(255,255,255,0.18)',
        boxShadow: glowColor
          ? `0 0 30px ${glowColor}33, 0 0 60px ${glowColor}18`
          : '0 0 30px rgba(255,255,255,0.08)',
        transition: { duration: 0.25 },
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
