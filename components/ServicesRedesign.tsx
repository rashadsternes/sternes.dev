'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import GrowthRingReveal from './GrowthRingReveal'

function ServiceCard({
  number,
  title,
  description,
  delay,
}: {
  number: string
  title: string
  description: string
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        padding: '2rem 0',
        borderTop: '1px solid var(--color-border)',
        position: 'relative',
      }}
    >
      {/* Number badge */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '9px',
          color: '#bbb',
          letterSpacing: '0.2em',
          marginBottom: '0.75rem',
        }}
      >
        {number}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          fontWeight: 400,
          color: '#111',
          lineHeight: 1.3,
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 300,
          color: '#777',
          lineHeight: 1.65,
          maxWidth: '560px',
        }}
      >
        {description}
      </p>
    </motion.div>
  )
}

export default function ServicesRedesign() {
  return (
    <section
      id="services"
      style={{
        background: 'var(--color-white)',
        padding: '4rem 2.5rem',
        position: 'relative',
        borderTop: '1px solid #eee',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section intro - asymmetric layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '3rem',
            marginBottom: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Portrait */}
          <GrowthRingReveal delay={0.1}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '3 / 4',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/rashad-forest.png"
                alt="Rashad Sternes"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
                sizes="(max-width: 768px) 90vw, 35vw"
              />
            </div>
          </GrowthRingReveal>

          {/* Right: Headline and description */}
          <GrowthRingReveal delay={0.2}>
            <div>
              {/* Eyebrow label */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#999',
                  marginBottom: '1.5rem',
                  fontWeight: 400,
                }}
              >
                How I Help
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 200,
                  color: '#111',
                  lineHeight: 1.15,
                  marginBottom: '2rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Going beneath the surface
                <br />
                <span style={{ fontStyle: 'italic', color: '#555' }}>
                  to find what you actually need
                </span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: 300,
                  color: '#444',
                  lineHeight: 1.6,
                  maxWidth: '600px',
                }}
              >
                I help business owners translate what they actually need into digital products that work. With AI built in from the start, not bolted on at the end.
              </p>
            </div>
          </GrowthRingReveal>
        </div>

        {/* Service cards */}
        <div>
          <ServiceCard
            number="01"
            title="Websites & Web Apps"
            description="Professional websites that establish credibility, capture leads, process payments, and automate the repetitive work. Whatever your business needs to succeed online."
            delay={0.3}
          />

          <ServiceCard
            number="02"
            title="AI Integration & Transformation"
            description="AI that actually works for your business. Streamlining workflows, automating data entry and follow-ups, eliminating repetitive tasks that drain your time."
            delay={0.4}
          />

          <ServiceCard
            number="03"
            title="Strategy & Discovery"
            description="Before a single line of code, we investigate. What's working? What's not? What are you actually trying to accomplish? This is where everything that follows gets its strength."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  )
}
