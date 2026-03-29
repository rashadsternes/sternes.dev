'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface GrowthRingRevealProps {
  children: React.ReactNode
  delay?: number
}

export default function GrowthRingReveal({ children, delay = 0 }: GrowthRingRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 0.61, 0.36, 1], // Custom easing for organic feel
      }}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  )
}
