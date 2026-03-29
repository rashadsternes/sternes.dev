'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function QuoteBreakRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section style={{
      minHeight: '300px',
      background: '#141414',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      padding: '3rem 2.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Image
        src="/images/canopy-crown.png"
        alt="Forest canopy showing crown shyness — trees reaching but not touching"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        sizes="100vw"
      />
      {/* Gradient anchored to bottom-left for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 100%)',
      }} />

      <motion.div
        ref={ref}
        initial={{ y: 16, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(0,0,0,0.72)',
          padding: '1.5rem 2rem',
          maxWidth: '560px',
          borderRadius: '6px',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          fontWeight: 200,
          color: '#fff',
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
        }}>
          &ldquo;I focus on understanding what a business owner actually needs. Then building something durable enough to last.&rdquo;
        </p>
      </motion.div>
    </section>
  )
}
