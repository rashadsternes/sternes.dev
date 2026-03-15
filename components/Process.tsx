'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

const steps = [
  { n: '01', title: 'Discovery', desc: 'A focused conversation to understand your business, goals, and what success actually looks like.' },
  { n: '02', title: 'Scope & Plan', desc: 'I define features, timeline, and deliverables clearly, in writing, before a line of code is written.' },
  { n: '03', title: 'Design', desc: 'Visual direction and wireframes presented for your approval before development begins.' },
  { n: '04', title: 'Build', desc: 'Production-grade development using React, Next.js, Supabase, and Claude Code.' },
  { n: '05', title: 'Launch & Handover', desc: "Deployed, tested, and handed over with documentation, so you're never dependent on me to update your own site." },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <SectionWrapper label="Project map" id="process" style={{ background: 'var(--color-off-white)', borderTop: '1px solid #eee' }}>
      <motion.p
        ref={ref}
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          fontWeight: 300,
          maxWidth: '500px',
          marginBottom: '2.5rem',
          lineHeight: 1.45,
          color: '#555',
        }}
      >
        The work process consists of several clear stages.
      </motion.p>

      <div className="process-grid">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ y: 18, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: 'easeOut', delay: i * 0.1 }}
            style={{
              padding: '1.5rem 1.5rem 2rem 0',
              borderTop: '1px solid #ddd',
              ...(i >= 3 ? { paddingTop: '1.5rem', marginTop: '1.5rem' } : {}),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 200,
              color: '#e0e0e0',
              lineHeight: 1,
              marginBottom: '0.75rem',
            }}>
              {step.n}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: '#111',
              marginBottom: '0.5rem',
            }}>
              {step.title}
            </div>
            <div style={{ width: '100%', height: '1px', background: '#e0e0e0', marginBottom: '0.75rem' }} />
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#999',
              fontWeight: 300,
              lineHeight: 1.55,
            }}>
              {step.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
