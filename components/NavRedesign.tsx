'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NavRedesign() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scrolled ? '0.9rem 2.5rem' : '1.2rem 2.5rem',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: scrolled
          ? '1px solid rgba(0, 0, 0, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '100px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minWidth: '90%',
        maxWidth: '1400px',
        boxShadow: scrolled
          ? '0 4px 24px rgba(0, 0, 0, 0.06)'
          : '0 2px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: scrolled ? '#111' : '#fff',
          fontWeight: 400,
          transition: 'color 0.4s ease',
        }}
      >
        Sternes.dev
      </div>

      {/* Navigation links */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 300,
        }}
      >
        {['Services', 'Work', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: scrolled ? '#444' : 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              position: 'relative',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = scrolled ? '#111' : '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = scrolled ? '#444' : 'rgba(255, 255, 255, 0.8)'
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
