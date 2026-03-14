'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const values = [
  {
    n: 'I',
    title: 'Work with the business, not just the brief.',
    desc: 'Your technology should reflect your purpose. I take time to understand what you\'re building before I build anything for you.',
  },
  {
    n: 'II',
    title: 'Built to last, like old growth.',
    desc: "Durable, intentional, designed to carry weight over time. Clean code and clear architecture you won't outgrow.",
  },
  {
    n: 'III',
    title: "The future is here — your business should be too.",
    desc: "AI is changing the playing field. I build so your business is positioned for what's coming, not catching up to it.",
  },
]

export default function Values() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section style={{
      background: '#0d0d0d',
      padding: 'var(--padding-values)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Image
        src="/images/clearing-golden-hour.png"
        alt="Forest clearing at golden hour — warm light through the canopy"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      <div ref={ref} style={{
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3rem',
      }}>
        {values.map((val, i) => (
          <motion.div
            key={val.n}
            initial={{ y: 18, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: 'easeOut', delay: i * 0.1 }}
            style={{
              borderTop: '1px solid #222',
              paddingTop: '1.75rem',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}>
              {val.n}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: 200,
              color: '#fff',
              lineHeight: 1.45,
              marginBottom: '0.625rem',
            }}>
              {val.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#ffffff',
              fontWeight: 300,
              lineHeight: 1.65,
            }}>
              {val.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
