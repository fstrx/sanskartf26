'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
}

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

export default function AnimatedText({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(' ')

  const wrapperClass = `flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`

  const content = words.map((word, i) => (
    <motion.span
      key={`${word}-${i}`}
      className="inline-block"
      variants={wordVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={i + delay / 0.06}
    >
      {word}
    </motion.span>
  ))

  if (Tag === 'h1') return <h1 className={wrapperClass} aria-label={text}>{content}</h1>
  if (Tag === 'h2') return <h2 className={wrapperClass} aria-label={text}>{content}</h2>
  if (Tag === 'h3') return <h3 className={wrapperClass} aria-label={text}>{content}</h3>
  if (Tag === 'h4') return <h4 className={wrapperClass} aria-label={text}>{content}</h4>
  if (Tag === 'span') return <span className={wrapperClass} aria-label={text}>{content}</span>
  return <p className={wrapperClass} aria-label={text}>{content}</p>
}
