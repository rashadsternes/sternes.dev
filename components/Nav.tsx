'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Main', 'Work', 'Services', 'Process', 'Contact']
const hrefs: Record<string, string> = {
  Main: '#',
  Work: '#work',
  Services: '#services',
  Process: '#process',
  Contact: '#contact',
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav style={{
        background: 'var(--color-black)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--padding-nav)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}>
        <div style={{
          color: '#fff',
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: 'var(--tracking-nav)',
          textTransform: 'uppercase',
          fontWeight: 400,
        }}>
          STERNES.DEV
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            cursor: 'pointer',
            padding: '6px',
            background: 'none',
            border: 'none',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '1px', background: '#fff' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: '#fff' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: '#fff' }} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '3rem 2.5rem',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '2.5rem',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.75rem',
                cursor: 'pointer',
                fontWeight: 200,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={hrefs[link]}
                  onClick={() => setOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    fontWeight: 200,
                    color: '#fff',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#666')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                >
                  {link}
                </motion.a>
              ))}
            </nav>

            <div style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#555',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-body)',
            }}>
              GET IN TOUCH
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#555',
              fontWeight: 300,
            }}>
              hello@sternes.dev
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
