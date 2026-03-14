'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

function AnimateIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ y: 18, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Services() {
  return (
    <SectionWrapper label="How can I help" id="services" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <AnimateIn>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-h2)',
          fontWeight: 300,
          color: '#111',
          maxWidth: '620px',
          lineHeight: 1.45,
          marginBottom: '3rem',
        }}>
          I help business owners translate what they actually need into digital products that work — with AI built in from the start, not bolted on at the end.
        </p>
      </AnimateIn>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <AnimateIn delay={0.1}>
          <div style={{
            padding: '2rem 2rem 2.5rem 0',
            borderTop: '1px solid var(--color-border)',
          }}>
            <div style={{ fontSize: '9px', color: '#bbb', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'var(--font-body)' }}>01</div>
            <div style={{ width: '148px', height: '1px', background: 'var(--color-border)', marginBottom: '1.25rem' }} />
            <div style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.5rem', color: '#111', fontFamily: 'var(--font-body)' }}>Websites &amp; Web Apps</div>
            <div style={{ fontSize: '13px', color: '#777', fontWeight: 300, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              From a clean service business site to full e-commerce with custom business logic — built on Next.js, Sanity CMS, and Stripe.
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div style={{
            padding: '2rem 0 2.5rem 2rem',
            borderTop: '1px solid var(--color-border)',
            borderLeft: '1px solid var(--color-border)',
          }}>
            <div style={{ fontSize: '9px', color: '#bbb', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'var(--font-body)' }}>02</div>
            <div style={{ width: '148px', height: '1px', background: 'var(--color-border)', marginBottom: '1.25rem' }} />
            <div style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.5rem', color: '#111', fontFamily: 'var(--font-body)' }}>AI Integration &amp; Transformation</div>
            <div style={{ fontSize: '13px', color: '#777', fontWeight: 300, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              I don&apos;t just build with AI — I integrate it into your business workflows, customer touchpoints, and internal tools so you&apos;re not left behind.
            </div>
          </div>
        </AnimateIn>
      </div>
    </SectionWrapper>
  )
}
