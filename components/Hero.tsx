'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="main"
      style={{
        background: 'var(--color-near-black)',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--padding-hero)',
      }}
    >
      <Image
        src="/images/forest-cathedral.png"
        alt="Dense forest with dramatic shafts of light"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
      />
      {/* Dark overlay to deepen the mood */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            width: '40px',
            height: '1px',
            background: '#444',
            margin: '0 auto 2rem',
          }}
        />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.85, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 200,
            color: '#fff',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}
        >
          Built for your business.
          <em style={{ color: '#c8bfaa', fontStyle: 'normal', display: 'block' }}>
            Designed for what&apos;s next.
          </em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7a7268',
            marginTop: '2rem',
            fontWeight: 400,
          }}
        >
          Web Site Design &nbsp;·&nbsp; AI Integration
        </motion.div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-body)',
        fontSize: '9px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#333',
      }}>
        Scroll
      </div>
    </section>
  )
}
