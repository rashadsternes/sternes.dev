'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GrowthRingReveal from './GrowthRingReveal'

const points = [
  "Sites designed to convert visitors into customers",
  "Built to win Google searches in your industry",
  "I ask why before I ask how",
  "I leverage AI and integrate it into your business.",
  "An eye for design that earns trust before a word is read",
  "Deep technical know-how, production-grade delivery",
]

export default function WhyChooseMeRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      style={{
        background: 'var(--color-off-white)',
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
              Why Choose Me
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 300,
                color: '#333',
                lineHeight: 1.45,
                maxWidth: '580px',
              }}
            >
              Your goals guide everything I build.
            </h2>
          </div>
        </GrowthRingReveal>

        {/* Points grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}
        >
          {points.map((point, i) => (
            <motion.div
              key={i}
              ref={ref}
              initial={{ y: 18, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: (i % 2) * 0.1 }}
              style={{
                padding: i % 2 === 0 ? '1.1rem 1.5rem 1.1rem 0' : '1.1rem 0 1.1rem 1.5rem',
                borderTop: '1px solid var(--color-border)',
                borderLeft: i % 2 === 1 ? '1px solid var(--color-border)' : 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 300,
                color: '#444',
                display: 'flex',
                gap: '0.875rem',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: '#ccc', flexShrink: 0, marginTop: '0.05em' }}>—</span>
              {point}
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
