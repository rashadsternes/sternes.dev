'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

const tiers = [
  {
    name: 'Foundation',
    price: '$2,000',
    features: ['Business website', 'AI-generated photography', 'Contact & inquiry form', 'Mobile responsive', 'Production ready'],
  },
  {
    name: 'Growth',
    price: '$3,000',
    features: ['Everything in Foundation', 'Sanity CMS', 'Multi-page architecture', 'Lead capture & forms', 'Third-party integrations'],
  },
  {
    name: 'Transformation',
    price: '$5,000',
    features: ['Everything in Growth', 'Full e-commerce + Stripe', 'Custom business logic', 'AI workflow automations', 'Advanced CMS'],
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <SectionWrapper label="Services" id="pricing" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
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
        Three tiers built for different stages of a business — each one complete in itself.
      </motion.p>

      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
        className="pricing-grid"
      >
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            style={{
              padding: '2rem 1.5rem',
              borderRight: i < 2 ? '1px solid #ddd' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#bbb',
              marginBottom: '0.875rem',
            }}>
              {tier.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#ccc',
              marginBottom: '0.2rem',
            }}>
              From
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-price)',
              fontWeight: 200,
              color: '#111',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              {tier.price}
            </div>
            <div style={{ height: '1px', background: '#eee', margin: '1.5rem 0' }} />
            <ul style={{ listStyle: 'none' }}>
              {tier.features.map(f => (
                <li key={f} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: '#777',
                  fontWeight: 300,
                  padding: '0.375rem 0',
                  borderBottom: '1px solid #f8f8f8',
                  display: 'flex',
                  gap: '0.5rem',
                  lineHeight: 1.4,
                }}>
                  <span style={{ color: '#ddd', flexShrink: 0 }}>—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
