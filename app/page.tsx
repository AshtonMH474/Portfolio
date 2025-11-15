'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import EnergyTrail from '@/components/EnergyTrail'
import EnergyLines from '@/components/EnergyLines'

import { useTheme } from '@/contexts/ThemeContext'


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const glowColor = theme === 'blue' 
    ? 'radial-gradient(circle, rgba(0,255,255,0.4) 0%, transparent 70%)'
    : 'radial-gradient(circle, rgba(255,0,64,0.4) 0%, transparent 70%)'

  return (
    <main className="relative min-h-screen">
      {/* Animated grid background */}
      <div className="grid-background" />
      
      {/* Energy lines moving across screen */}
      <EnergyLines />
      
      {/* Energy trail following mouse cursor */}
      <EnergyTrail />
      
      {/* Mouse follower glow effect */}
      <div 
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          background: glowColor,
        }}
      />

      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}

