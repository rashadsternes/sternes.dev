'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

const points = [
  "I understand the business owner's intent, not just the brief",
  "I don't just leverage AI — I integrate it into your business",
  "An eye for design that earns trust before a word is read",
  "Deep technical know-how, production-grade delivery",
  "Real deployed client work — not portfolio mockups",
  "AWS certified & actively building with Claude Code",
]

export default function WhyChooseMe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <SectionWrapper label="Why choose me" style={{ background: 'var(--color-off-white)', borderTop: '1px solid #eee' }}>
      <motion.h2
        ref={ref}
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          fontWeight: 300,
          maxWidth: '580px',
          marginBottom: '2.5rem',
          lineHeight: 1.45,
          color: '#333',
        }}
      >
        Understanding your intent is the foundation of everything I build.
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ y: 18, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: 'easeOut', delay: (i % 4) * 0.1 }}
            style={{
              padding: '1.1rem 1.5rem 1.1rem 0',
              borderTop: '1px solid var(--color-border)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: '#444',
              display: 'flex',
              gap: '0.875rem',
              lineHeight: 1.5,
              ...(i % 2 === 1 ? { paddingLeft: '1.5rem', borderLeft: '1px solid var(--color-border)' } : {}),
            }}
          >
            <span style={{ color: '#ccc', flexShrink: 0, marginTop: '0.05em' }}>—</span>
            {point}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
