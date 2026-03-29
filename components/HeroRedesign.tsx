'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroRedesign() {
  return (
    <section
      style={{
        background: 'var(--color-near-black)',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 2.5rem',
      }}
    >
      {/* Macro forest background - wood grain, moss, deep textures */}
      <Image
        src="/images/forest-cathedral2.png"
        alt="Deep forest macro detail"
        fill
        priority
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.4,
        }}
        sizes="100vw"
      />

      {/* Layered depth overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1100px',
        width: '100%',
      }}>
        {/* Growth ring reveal for main headline */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          style={{
            transformOrigin: 'center center',
          }}
        >
          {/* Decorative element */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            style={{
              width: '120px',
              height: '1px',
              background: '#444',
              marginBottom: '2rem',
              transformOrigin: 'left center',
            }}
          />

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 200,
              color: '#fff',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Built for your business.
            <br />
            <span style={{
              fontStyle: 'italic',
              color: '#c8bfaa',
            }}>
              Designed for what's next.
            </span>
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.6,
              maxWidth: '620px',
              marginBottom: '2rem',
            }}
          >
            Website design & AI integration for business owners who want success in a modern world.
          </div>

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#666',
              fontWeight: 400,
            }}
          >
            Web Design · AI Integration
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.8,
        }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#444',
        }}
      >
        Scroll
      </motion.div>
    </section>
  )
}
