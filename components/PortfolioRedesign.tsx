'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import GrowthRingReveal from './GrowthRingReveal'

const projects = [
  {
    tier: 'Transformation — E-Commerce',
    name: 'KNGDM MVMT — Premium Meal Prep & Delivery',
    img: '/images/portfolio-kngdm-full.png',
    w: 1428, h: 8273, scrollDuration: 10,
    url: 'https://kngdmmvmt.com/',
  },
  {
    tier: 'Growth — Relationship & Events Service',
    name: 'The XVI - Christian Singles Matchmaking',
    img: '/images/portfolio-xvi-full.png',
    w: 1434, h: 10592, scrollDuration: 13,
    url: 'https://the-xvi-elegant-red.vercel.app/',
  },
  {
    tier: 'Foundation — Professional Services Business',
    name: 'DG on the Go Movers — Moving Company',
    img: '/images/portfolio-dg-full.png',
    w: 1425, h: 4616, scrollDuration: 5,
    url: 'https://dgonthegomovers.com/',
  },
]

function PortfolioItem({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const ref = useRef(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hovered, setHovered] = useState(false)
  const [thumbHeight, setThumbHeight] = useState(0)

  useEffect(() => {
    if (!thumbRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      setThumbHeight(entry.contentRect.height)
    })
    ro.observe(thumbRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        transition: 'border-color 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#111'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = '#e0e0e0'
      }}
    >
      {/* Thumbnail with scroll effect */}
      <div
        ref={thumbRef}
        style={{
          position: 'relative',
          aspectRatio: '3 / 2',
          overflow: 'hidden',
          background: '#111',
        }}
      >
        <Image
          src={project.img}
          alt={project.name}
          width={project.w}
          height={project.h}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transform: hovered && thumbHeight > 0
              ? `translateY(calc(-100% + ${thumbHeight}px))`
              : 'translateY(0)',
            transition: hovered ? `transform ${project.scrollDuration}s ease-in-out` : 'transform 0.6s ease-out',
            willChange: 'transform',
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Project info */}
      <div style={{ padding: '1.25rem 1.5rem' }}>
        {/* Tier label */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '0.5rem',
            fontWeight: 400,
          }}
        >
          {project.tier}
        </div>

        {/* Project name */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 400,
            color: hovered ? '#111' : '#444',
            lineHeight: 1.4,
            transition: 'color 0.3s ease',
          }}
        >
          {project.name}
        </div>
      </div>
    </motion.a>
  )
}

export default function PortfolioRedesign() {
  return (
    <section
      id="work"
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
              Selected Work
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 200,
                color: '#111',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Real projects, real results
            </h2>
          </div>
        </GrowthRingReveal>

        {/* Portfolio grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
        >
          {projects.map((project, i) => (
            <PortfolioItem key={i} project={project} delay={0.2 + i * 0.1} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
