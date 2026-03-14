'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import SectionWrapper from './SectionWrapper'

const skills = [
  { label: 'React / Next.js', pct: 92 },
  { label: 'TypeScript', pct: 85 },
  { label: 'Supabase / Sanity CMS', pct: 88 },
  { label: 'AI Integration / Claude API', pct: 90 },
  { label: 'React Native / Expo', pct: 78 },
]

function SkillBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(pct), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [inView, pct, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 18, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: 'easeOut', delay }}
      style={{ marginBottom: '1.75rem' }}
    >
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#999',
        marginBottom: '0.5rem',
      }}>
        {label}
      </div>
      <div style={{ height: '5px', background: '#f0f0f0', width: '100%' }}>
        <div style={{
          height: '5px',
          background: 'linear-gradient(90deg, #111, #999)',
          width: `${width}%`,
          transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <SectionWrapper label="Stack" id="stack" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <SkillsContent />
    </SectionWrapper>
  )
}

function SkillsContent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <>
      <motion.h2
        ref={ref}
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-skills-hl)',
          fontWeight: 200,
          marginBottom: '2.5rem',
          letterSpacing: '-0.01em',
          color: '#111',
        }}
      >
        Skills
      </motion.h2>
      {skills.map((skill, i) => (
        <SkillBar key={skill.label} label={skill.label} pct={skill.pct} delay={i * 0.1} />
      ))}
    </>
  )
}
