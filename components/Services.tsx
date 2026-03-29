'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
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
        <div className="services-intro-grid">
          <div className="services-intro-photo">
            <Image
              src="/images/rashad-forest.png"
              alt="Rashad Sternes in a forest"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 640px) 60vw, 28vw"
            />
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-h2)',
            fontWeight: 300,
            color: '#111',
            lineHeight: 1.45,
            margin: 0,
          }}>
            I help business owners translate what they actually need into digital products that work. With AI built in from the start, not bolted on at the end.
          </p>
        </div>
      </AnimateIn>

      <div className="services-cards-grid">
        <AnimateIn delay={0.1}>
          <div className="service-card">
            <div style={{ fontSize: '9px', color: '#bbb', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'var(--font-body)' }}>01</div>
            <div style={{ width: '148px', height: '1px', background: 'var(--color-border)', marginBottom: '1.25rem' }} />
            <div style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.5rem', color: '#111', fontFamily: 'var(--font-body)' }}>Websites &amp; Web Apps</div>
            <div style={{ fontSize: '13px', color: '#777', fontWeight: 300, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              Professional websites that establish credibility, capture leads, process payments, and automate the repetitive work. Whatever your business needs to succeed online.
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="service-card--right">
            <div style={{ fontSize: '9px', color: '#bbb', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'var(--font-body)' }}>02</div>
            <div style={{ width: '148px', height: '1px', background: 'var(--color-border)', marginBottom: '1.25rem' }} />
            <div style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.5rem', color: '#111', fontFamily: 'var(--font-body)' }}>AI Integration &amp; Transformation</div>
            <div style={{ fontSize: '13px', color: '#777', fontWeight: 300, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              AI that actually works for your business. Streamlining workflows, automating data entry and follow-ups, eliminating repetitive tasks that drain your time.
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <div className="service-card">
            <div style={{ fontSize: '9px', color: '#bbb', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'var(--font-body)' }}>03</div>
            <div style={{ width: '148px', height: '1px', background: 'var(--color-border)', marginBottom: '1.25rem' }} />
            <div style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.5rem', color: '#111', fontFamily: 'var(--font-body)' }}>Strategy &amp; Discovery</div>
            <div style={{ fontSize: '13px', color: '#777', fontWeight: 300, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              Before a single line of code, we investigate. What&apos;s working? What&apos;s not? What are you actually trying to accomplish? This is where everything that follows gets its strength.
            </div>
          </div>
        </AnimateIn>
      </div>
    </SectionWrapper>
  )
}
