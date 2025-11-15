'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface EnergyLine {
  x: number
  y: number
  length: number
  angle: number
  speed: number
  opacity: number
  life: number
}

export default function EnergyLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

    const lines: EnergyLine[] = []
    
    // Create initial energy lines
    for (let i = 0; i < 8; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 50 + Math.random() * 100,
        angle: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
        life: 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw lines
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i]
        
        // Move line
        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed
        
        // Wrap around screen
        if (line.x < 0) line.x = canvas.width
        if (line.x > canvas.width) line.x = 0
        if (line.y < 0) line.y = canvas.height
        if (line.y > canvas.height) line.y = 0
        
        // Draw energy line with glow
        const gradient = ctx.createLinearGradient(
          line.x,
          line.y,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        )
        
        if (theme === 'blue') {
          gradient.addColorStop(0, `rgba(0, 255, 255, ${line.opacity})`)
          gradient.addColorStop(0.5, `rgba(0, 217, 255, ${line.opacity * 0.8})`)
          gradient.addColorStop(1, `rgba(0, 255, 255, ${line.opacity * 0.3})`)
          ctx.shadowColor = 'rgba(0, 255, 255, 0.8)'
        } else {
          gradient.addColorStop(0, `rgba(255, 0, 64, ${line.opacity})`)
          gradient.addColorStop(0.5, `rgba(255, 51, 51, ${line.opacity * 0.8})`)
          gradient.addColorStop(1, `rgba(255, 0, 64, ${line.opacity * 0.3})`)
          ctx.shadowColor = 'rgba(255, 0, 64, 0.8)'
        }
        
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        )
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0
        
        // Add energy particles along the line
        for (let j = 0; j < 3; j++) {
          const t = Math.random()
          const px = line.x + Math.cos(line.angle) * line.length * t
          const py = line.y + Math.sin(line.angle) * line.length * t
          
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = theme === 'blue'
            ? `rgba(0, 255, 255, ${line.opacity * 0.6})`
            : `rgba(255, 0, 64, ${line.opacity * 0.6})`
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }
      
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

