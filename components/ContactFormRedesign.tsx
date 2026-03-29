'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import GrowthRingReveal from './GrowthRingReveal'

export default function ContactFormRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    // Form submission — connect to Resend or Formspree
    await new Promise(r => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 300,
    color: '#111',
    padding: '0.625rem 0',
    outline: 'none',
    background: 'transparent',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '0.5rem',
    fontWeight: 400,
  }

  return (
    <section
      id="contact"
      style={{
        background: 'var(--color-white)',
        padding: '4rem 2.5rem',
        borderTop: '1px solid #eee',
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
              Start a Project
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 200,
                color: '#111',
                lineHeight: 1.35,
                maxWidth: '520px',
                letterSpacing: '-0.01em',
              }}
            >
              Tell me about your business and what you're trying to build.
            </h2>
          </div>
        </GrowthRingReveal>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              color: '#555',
              maxWidth: '580px',
            }}
          >
            Thank you. I'll be in touch soon.
          </motion.div>
        ) : (
          <motion.form
            ref={ref}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              maxWidth: '580px',
            }}
          >
            <div>
              <label style={labelStyle}>Describe your project</label>
              <textarea
                required
                placeholder="What does your business do, and what are you trying to solve?"
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#111')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#e0e0e0')}
              />
            </div>

            <div>
              <label style={labelStyle}>Type of project</label>
              <select
                required
                style={{ ...inputStyle }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#111')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#e0e0e0')}
              >
                <option value="">Select a tier</option>
                <option>Foundation — $2,000</option>
                <option>Growth — $3,000</option>
                <option>Transformation — $5,000</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Ideal timeline</label>
              <input
                type="text"
                placeholder="e.g. 4 weeks, end of Q2, ASAP"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#111')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#e0e0e0')}
              />
            </div>

            <div>
              <label style={labelStyle}>Target audience</label>
              <input
                type="text"
                placeholder="Who is your customer?"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#111')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#e0e0e0')}
              />
            </div>

            <div>
              <label style={labelStyle}>Your email</label>
              <input
                type="email"
                required
                placeholder="Where should I reply?"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#111')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = '#e0e0e0')}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                alignSelf: 'flex-start',
                background: '#111',
                color: '#fff',
                border: 'none',
                padding: '0.875rem 2.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: submitting ? 'wait' : 'pointer',
                marginTop: '0.5rem',
                opacity: submitting ? 0.7 : 1,
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#333' }}
              onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = '#111' }}
            >
              {submitting ? 'Sending...' : 'Send'}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
