'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const stats = [
  { n: '7+', d: 'Years building websites', photo: true, img: '/images/bark-rings.png', alt: 'Growth rings' },
  { n: '3', d: 'Live client sites deployed', photo: true, img: '/images/roots-deep.png', alt: 'Root system' },
  { n: 'AWS', d: 'Solutions Architect certified', photo: true, img: '/images/bark-ancient.png', alt: 'Bark texture' },
  { n: '2-4', d: 'Days from kickoff to live', photo: true, img: '/images/bark-sprout.png', alt: 'New growth' },
]

export default function StatsRedesign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section style={{ background: '#111' }}>
      <motion.div
        ref={ref}
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: '#1c1c1c',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: stat.photo ? '#0d0d0d' : '#111',
              padding: '2rem 1.5rem',
              minHeight: '130px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'relative',
            }}
          >
            {stat.photo && stat.img && (
              <>
                <Image
                  src={stat.img}
                  alt={stat.alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
              </>
            )}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-stat)',
                  fontWeight: 200,
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.n}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  color: '#ffffff',
                  fontWeight: 200,
                  lineHeight: 1.45,
                }}
              >
                {stat.d}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
