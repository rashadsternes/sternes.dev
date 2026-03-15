'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

const terms = [
  {
    pct: '25%',
    desc: 'Deposit required before any work begins — after our exploratory call and written agreement on scope.',
  },
  {
    pct: '25%',
    desc: 'At the midpoint milestone, after the first stage is reviewed, revised, and approved by you.',
  },
  {
    pct: '50%',
    desc: 'Final payment before handover, after full project approval and before transferring files and access.',
  },
]

export default function Terms() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <SectionWrapper label="Terms of work" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <motion.p
        ref={ref}
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          fontWeight: 300,
          maxWidth: '600px',
          marginBottom: '2.5rem',
          lineHeight: 1.45,
          color: '#555',
        }}
      >
        I work on a prepaid basis, divided into clear stages. No surprises, no scope creep.
      </motion.p>

      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
        className="terms-grid"
      >
        {terms.map((term, i) => (
          <div
            key={i}
            style={{
              padding: '2rem 1.5rem',
              borderRight: i < 2 ? '1px solid #eee' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-term-pct)',
              fontWeight: 200,
              color: '#111',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              paddingBottom: '1rem',
              marginBottom: '1rem',
              borderBottom: '1px solid #eee',
            }}>
              {term.pct}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#999',
              fontWeight: 300,
              lineHeight: 1.65,
            }}>
              {term.desc}
            </div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
