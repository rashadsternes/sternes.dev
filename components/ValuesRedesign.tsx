'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const values = [
  {
    n: 'I',
    title: 'I build websites that solve real business problems.',
    desc: 'Your site should help you sell, inform, or convert—not just exist. I figure out what your business needs, then build for that.',
  },
  {
    n: 'II',
    title: 'Design that serves your business goals.',
    desc: 'I design to help you sell, convert, and communicate clearly with the people who matter to your business. Every decision serves a purpose.',
  },
  {
    n: 'III',
    title: "The future is here. Your business should be too.",
    desc: "AI is changing the playing field. I build so your business is positioned for what's coming, not catching up to it.",
  },
]

export default function ValuesRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      style={{
        background: '#0d0d0d',
        padding: '4rem 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Golden hour forest background */}
      <Image
        src="/images/clearing-golden-hour.png"
        alt="Forest clearing at golden hour"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      {/* Values grid */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem',
        }}
      >
        {values.map((val, i) => (
          <motion.div
            key={val.n}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.1 }}
            style={{
              borderTop: '1px solid #333',
              paddingTop: '1.75rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#666',
                marginBottom: '0.75rem',
              }}
            >
              {val.n}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                fontWeight: 200,
                color: '#fff',
                lineHeight: 1.45,
                marginBottom: '0.75rem',
              }}
            >
              {val.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#ccc',
                fontWeight: 300,
                lineHeight: 1.65,
              }}
            >
              {val.desc}
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
