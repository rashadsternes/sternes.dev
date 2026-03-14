'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'

const reviews = [
  { text: 'Placeholder — replace with real testimonial from KNGDM MVMT client.', attr: '— Client Name, KNGDM MVMT' },
  { text: 'Placeholder — replace with real testimonial from Wendell Bowdre, XVI.', attr: '— Wendell Bowdre, XVI' },
  { text: 'Placeholder — replace with real testimonial from DG on the Move client.', attr: '— Client Name, DG on the Move' },
  { text: 'Placeholder — replace with real testimonial from Renee, Portugal Group Trip.', attr: '— Renee, Portugal Group Trip' },
]

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <SectionWrapper label="Reviews" style={{ background: 'var(--color-gray-light)', borderTop: '1px solid #eee' }}>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ y: 18, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: 'easeOut', delay: i * 0.1 }}
            style={{
              background: '#fff',
              padding: '2rem',
            }}
          >
            <div style={{
              fontSize: '3rem',
              color: '#e8e8e8',
              lineHeight: 0.8,
              marginBottom: '0.75rem',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
            }}>
              &ldquo;
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: '#555',
              lineHeight: 1.75,
              marginBottom: '1.25rem',
            }}>
              {review.text}
            </p>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              color: '#bbb',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {review.attr}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
