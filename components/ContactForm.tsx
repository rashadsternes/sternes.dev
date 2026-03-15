'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SectionWrapper from './SectionWrapper'

export default function ContactForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    // Form submission — connect to Resend or Formspree
    // Placeholder: simulate submission
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
    padding: '0.5rem 0',
    outline: 'none',
    background: 'transparent',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '9px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#bbb',
    marginBottom: '0.5rem',
  }

  return (
    <SectionWrapper label="Start a project" id="contact" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <motion.h2
        ref={ref}
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          fontWeight: 300,
          maxWidth: '520px',
          marginBottom: '2.75rem',
          lineHeight: 1.45,
          color: '#111',
        }}
      >
        Tell me about your business and what you&apos;re trying to build.
      </motion.h2>

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
          Thank you. I&apos;ll be in touch soon.
        </motion.div>
      ) : (
        <motion.form
          initial={{ y: 18, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
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
              style={{ ...inputStyle, minHeight: '80px', resize: 'none' }}
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
              padding: '0.875rem 2.75rem',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: submitting ? 'wait' : 'pointer',
              marginTop: '0.5rem',
              opacity: submitting ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#333' }}
            onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = '#111' }}
          >
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </motion.form>
      )}
    </SectionWrapper>
  )
}
