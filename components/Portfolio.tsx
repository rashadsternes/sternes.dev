'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SectionWrapper from './SectionWrapper'

const projects = [
  { tier: 'Transformation — E-Commerce', name: 'KNGDM MVMT — Meal Prep & Delivery' },
  { tier: 'Growth — Service Business', name: 'XVI — Christian Singles Dining' },
  { tier: 'Foundation — Service Business', name: 'DG on the Move — Moving Company' },
]

function PortfolioItem({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ y: 18, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: 'easeOut', delay }}
      style={{ cursor: 'pointer', borderRight: '1px solid #eee' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        height: '175px',
        background: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#333',
        transition: 'opacity 0.2s',
        opacity: hovered ? 0.75 : 1,
        borderBottom: '1px solid #1c1c1c',
        fontFamily: 'var(--font-body)',
      }}>
        [ screenshot ]
      </div>
      <div style={{
        fontSize: '11px',
        color: '#aaa',
        padding: '0.6rem 1rem 0.25rem',
        fontWeight: 300,
        fontFamily: 'var(--font-body)',
      }}>
        {project.tier}
      </div>
      <div style={{
        fontSize: '13px',
        fontWeight: 400,
        padding: '0.1rem 1rem 0.875rem',
        color: '#111',
        fontFamily: 'var(--font-body)',
      }}>
        {project.name}
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  return (
    <SectionWrapper label="Work" id="work" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid #eee' }}>
        {projects.map((project, i) => (
          <PortfolioItem key={i} project={project} delay={i * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  )
}
