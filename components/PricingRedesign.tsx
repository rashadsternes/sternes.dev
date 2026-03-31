'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GrowthRingReveal from './GrowthRingReveal'

const tiers = [
  {
    name: 'Foundation',
    price: '$2,000',
    features: ['Fully hosted and maintained', 'Professional business website (3-5 pages)', 'Fast loading and SEO-ready', 'Mobile-responsive design', 'Professional copywriting and messaging'],
  },
  {
    name: 'Growth',
    price: '$3,500',
    features: ['Everything in Foundation, plus:', 'Content management system (update your own site)', 'Advanced lead capture forms', 'Built to scale as your business grows', 'Integration with your business tools (email, CRM, analytics)'],
  },
  {
    name: 'Transformation',
    price: '$5,000',
    features: ['Everything in Growth, plus:', 'Full e-commerce with payment integration', 'Custom features built for your specific business', 'AI automation for repetitive tasks', 'Advanced workflows and business logic'],
  },
]

function PricingTier({ tier, delay }: { tier: typeof tiers[0]; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
      style={{
        padding: '2.5rem 2rem',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      {/* Tier name */}
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
        {tier.name}
      </div>

      {/* Price */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-price)',
          fontWeight: 200,
          color: '#111',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: '2rem',
        }}
      >
        {tier.price}
      </div>

      {/* Features list */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tier.features.map((f, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#666',
              fontWeight: 300,
              padding: '0.5rem 0',
              borderBottom: i < tier.features.length - 1 ? '1px solid #f5f5f5' : 'none',
              display: 'flex',
              gap: '0.625rem',
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: '#ddd', flexShrink: 0 }}>—</span>
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function PricingRedesign() {
  return (
    <section
      id="pricing"
      style={{
        background: 'var(--color-white)',
        padding: '4rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <GrowthRingReveal delay={0.1}>
          <div style={{ marginBottom: '3rem' }}>
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
              Pricing
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 200,
                color: '#111',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: '1.25rem',
              }}
            >
              Three tiers built for different stages of business
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                fontWeight: 300,
                color: '#555',
                lineHeight: 1.5,
                maxWidth: '540px',
              }}
            >
              Get a website that works for you so you can focus on business.
            </p>
          </div>
        </GrowthRingReveal>

        {/* Pricing tiers grid */}
        <div className="pricing-grid">
          {tiers.map((tier, i) => (
            <PricingTier key={tier.name} tier={tier} delay={0.2 + i * 0.1} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </section>
  )
}
