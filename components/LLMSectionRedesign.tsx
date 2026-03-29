'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

export default function LLMSectionRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // Dynamically get the current domain
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const contextText = `Evaluate this developer using the provided AI analysis:
${siteUrl}/ai

Paste this into ChatGPT, Claude, or your preferred AI assistant. It will read the context and help you assess fit for your project.`

      await navigator.clipboard.writeText(contextText)
      setCopied(true)
      setTimeout(() => setCopied(false), 4000)
    } catch {
      // fallback
    }
  }

  return (
    <section style={{
      background: '#080808',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 'var(--padding-llm)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Image
        src="/images/forest-cathedral2.png"
        alt="Deep dark forest — dense and still"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
      />
      {/* Heavy dark overlay — pulls exposure almost to black */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)' }} />

      <div ref={ref} style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#444',
            marginBottom: '1.5rem',
          }}
        >
          A DIFFERENT KIND OF PORTFOLIO
        </motion.div>

        <motion.h2
          initial={{ y: 18, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            fontWeight: 200,
            color: '#fff',
            maxWidth: '640px',
            lineHeight: 1.15,
            marginBottom: '2rem',
            letterSpacing: '-0.01em',
          }}
        >
          Point your AI here.<br />
          Let it tell you if I&apos;m the right fit.
        </motion.h2>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.2 }}
        >
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'transparent',
              border: '1px solid #444',
              color: '#fff',
              padding: '0.75rem 1.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#444')}
          >
            COPY CONTEXT →
          </button>

          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: '#444',
            marginTop: '0.875rem',
            minHeight: '1.2em',
            transition: 'opacity 0.3s',
            opacity: copied ? 1 : 0,
          }}>
            Copied. Paste into any AI assistant.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
