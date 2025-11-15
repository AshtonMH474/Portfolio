'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Hero() {
  const { theme } = useTheme()
  const [displayText, setDisplayText] = useState('')
  const phrases = [
    "Solutions Engineer at Recro Corporation",
    "Full-Stack Developer",
    "Passionate about building scalable digital experiences",
    "Always learning, always improving",
  ];
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentPhrase = phrases[phraseIndex]

    const type = () => {
      const currentIndex = currentIndexRef.current
      const typingSpeed = isDeleting ? 50 : 100

      if (!isDeleting && currentIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, currentIndex + 1))
        currentIndexRef.current = currentIndex + 1
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(currentPhrase.substring(0, currentIndex - 1))
        currentIndexRef.current = currentIndex - 1
      } else if (!isDeleting && currentIndex === currentPhrase.length) {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
        return
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false)
        // Move to next phrase
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
        currentIndexRef.current = 0
      }

      timeout = setTimeout(type, typingSpeed)
    }

    timeout = setTimeout(type, 100)
    return () => clearTimeout(timeout)
  }, [isDeleting, phraseIndex, phrases])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to the Grid, I&apos;m Ashton Howard.
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-4xl mb-8 glow-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className={theme === 'blue' ? 'text-tron-cyan' : 'text-tron-orange'}>{displayText}</span>
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.p
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Building digital experiences with React, Next.js, Python, and cutting-edge technologies.
            Passionate about clean code, video games, and hitting the slopes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: theme === 'blue' 
                  ? '0 0 30px rgba(0, 255, 255, 0.8)' 
                  : '0 0 30px rgba(255, 0, 64, 0.8)' 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/Resume.pdf', '_blank')}
              className={`px-8 py-3 tron-border energy-border-animated energy-trail-button bg-tron-dark/50 hover:bg-tron-dark font-semibold transition-all relative overflow-hidden ${
                theme === 'blue' ? 'text-tron-blue' : 'text-tron-red'
              }`}
            >
              Resume Here
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: theme === 'blue' 
                  ? '0 0 30px rgba(0, 255, 255, 0.8)' 
                  : '0 0 30px rgba(255, 0, 64, 0.8)' 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-3 energy-trail-button font-semibold transition-all relative overflow-hidden ${
                theme === 'blue' 
                  ? 'bg-tron-blue text-tron-darker hover:bg-tron-cyan' 
                  : 'bg-tron-red text-tron-red-darker hover:bg-tron-orange'
              }`}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Subtle energy particles instead of lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => {
            // Pre-calculate random values to avoid re-renders
            const size = 4 + (i % 5) * 1.5
            const left = 10 + (i % 7) * 12
            const top = 15 + (i % 6) * 14
            const duration = 3 + (i % 3) * 0.8
            const xOffset = (i % 4 - 1.5) * 50
            const yOffset = (i % 3 - 1) * 60
            
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  theme === 'blue' ? 'bg-tron-blue/20' : 'bg-tron-red/20'
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  x: [0, xOffset],
                  y: [0, yOffset],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  filter: theme === 'blue' 
                    ? 'blur(2px) drop-shadow(0 0 4px rgba(0, 255, 255, 0.5))' 
                    : 'blur(2px) drop-shadow(0 0 4px rgba(255, 0, 64, 0.5))',
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

