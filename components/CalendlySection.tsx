'use client'

import { useEffect } from 'react'
import GrowthRingReveal from './GrowthRingReveal'

export default function CalendlySection() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

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
              Let's Talk
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 200,
                color: '#111',
                lineHeight: 1.3,
                maxWidth: '720px',
                letterSpacing: '-0.01em',
                marginBottom: '1.5rem',
              }}
            >
              Not sure what you need? Let's figure it out together.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                fontWeight: 300,
                color: '#555',
                lineHeight: 1.6,
                maxWidth: '640px',
                marginBottom: '2rem',
              }}
            >
              Book a discovery call. We'll take 30 – 45 minutes to discuss what's working, what's not, and whether a website or AI integration can help your business succeed. I'll ask questions, you'll get answers, and we'll see if it makes sense to work together.
            </p>

            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 400,
                color: '#111',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              → Schedule Your Discovery Call
            </div>
          </div>
        </GrowthRingReveal>

        {/* Calendly inline widget */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/rashadsternes/discovery-call"
          style={{
            minWidth: '320px',
            height: '1050px', // Increased to show full calendar without internal scroll
          }}
        />
      </div>
    </section>
  )
}
