'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export default function EnergyTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Create new particles at mouse position
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 30 + Math.random() * 20,
          size: 2 + Math.random() * 3,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        
        const alpha = particle.life / particle.maxLife
        const size = particle.size * alpha
        
        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        
        // Create gradient for energy effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        )
        
        if (theme === 'blue') {
          gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha * 0.8})`)
          gradient.addColorStop(0.5, `rgba(0, 217, 255, ${alpha * 0.4})`)
          gradient.addColorStop(1, 'transparent')
          ctx.shadowColor = 'rgba(0, 255, 255, 0.8)'
        } else {
          gradient.addColorStop(0, `rgba(255, 0, 64, ${alpha * 0.8})`)
          gradient.addColorStop(0.5, `rgba(255, 51, 51, ${alpha * 0.4})`)
          gradient.addColorStop(1, 'transparent')
          ctx.shadowColor = 'rgba(255, 0, 64, 0.8)'
        }
        
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Add outer glow
        ctx.shadowBlur = 15
        ctx.fill()
        ctx.shadowBlur = 0
        
        return particle.life > 0
      })
      
      // Draw trail lines connecting nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.3
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = theme === 'blue' 
              ? `rgba(0, 255, 255, ${alpha})`
              : `rgba(255, 0, 64, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

