'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const stats = [
  { n: '7+', d: 'Years building websites', photo: true, img: '/images/bark-rings.png', alt: 'Ancient bark with growth rings — years of accumulated depth' },
  { n: '3', d: 'Live client sites deployed', photo: true, img: '/images/roots-deep.png', alt: 'Ancient root system — deep and sprawling' },
  { n: 'AWS', d: 'Solutions Architect certified', photo: true, img: '/images/bark-ancient.png', alt: 'Ancient bark texture — tactile and premium' },
  { n: '30', d: 'Days from kickoff to live', photo: true, img: '/images/bark-sprout.png', alt: 'New growth emerging from ancient bark' },
]

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section style={{ background: '#111' }}>
      <motion.div
        ref={ref}
        initial={{ y: 18, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="stats-grid"
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
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-stat)',
                fontWeight: 200,
                color: '#fff',
                lineHeight: 1,
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}>
                {stat.n}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: '#ffffff',
                fontWeight: 300,
                lineHeight: 1.45,
              }}>
                {stat.d}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
