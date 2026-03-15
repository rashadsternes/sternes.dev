'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import SectionWrapper from './SectionWrapper'

const projects = [
  {
    tier: 'Transformation — E-Commerce',
    name: 'KNGDM MVMT — Meal Prep & Delivery',
    img: '/images/portfolio-kngdm-full.png',
    w: 1428, h: 8273, scrollDuration: 10,
    url: 'https://kngdmmvmt.com/',
  },
  {
    tier: 'Growth — Service Business',
    name: 'Christian Singles Matchmaking',
    img: '/images/portfolio-xvi-full.png',
    w: 1434, h: 10592, scrollDuration: 13,
    url: 'https://the-xvi-elegant-red.vercel.app/',
  },
  {
    tier: 'Foundation — Service Business',
    name: 'DG on the Go Movers — Daniel Graafsma',
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
      initial={{ y: 18, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: 'easeOut', delay }}
      style={{ cursor: 'pointer', borderRight: '1px solid #eee', textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={thumbRef}
        className="portfolio-thumb"
        style={{ background: '#111', borderBottom: '1px solid #eee' }}
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
    </motion.a>
  )
}

export default function Portfolio() {
  return (
    <SectionWrapper label="Work" id="work" style={{ background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <div className="portfolio-grid">
        {projects.map((project, i) => (
          <PortfolioItem key={i} project={project} delay={i * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  )
}
