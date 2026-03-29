'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GrowthRingReveal from './GrowthRingReveal'

const terms = [
  {
    pct: '25%',
    desc: 'Deposit required before any work begins. After our exploratory call and written agreement on scope.',
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

export default function TermsRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      style={{
        background: 'var(--color-white)',
        padding: '4rem 2.5rem',
        borderTop: '1px solid #eee',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <GrowthRingReveal delay={0.1}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '1rem',
                fontWeight: 400,
              }}
            >
              Terms of Work
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: 300,
                color: '#555',
                lineHeight: 1.45,
                maxWidth: '600px',
              }}
            >
              I work on a prepaid basis, divided into clear stages. No surprises, no scope creep.
            </p>
          </div>
        </GrowthRingReveal>

        {/* Terms grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
        >
          {terms.map((term, i) => (
            <motion.div
              key={i}
              ref={ref}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.1 }}
              style={{
                padding: '2rem 0',
                borderTop: '1px solid #eee',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-term-pct)',
                  fontWeight: 200,
                  color: '#111',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  paddingBottom: '1rem',
                  marginBottom: '1rem',
                  borderBottom: '1px solid #eee',
                }}
              >
                {term.pct}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: '#999',
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {term.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
