'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface PulsePath {
  id: string
  direction: 'horizontal' | 'vertical'
  position: number // grid line position
  reverse: boolean
  speed: number
  length: number
  delay: number // delay in frames before starting
  cycleDuration: number // total frames for one complete cycle
}

export default function GridBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [frameCount, setFrameCount] = useState(0)
  const gridSize = 50
  const bikeSize = 8 // size of the bike - smaller like arcade

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    let animationFrame: number
    const animate = () => {
      setFrameCount((prev) => prev + 1)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [dimensions])

  const gridColor = theme === 'blue' 
    ? 'rgba(0, 255, 255, 0.1)' 
    : 'rgba(255, 0, 64, 0.1)'
  
  const pulseColor = theme === 'blue'
    ? '#00FFFF'
    : '#FF0040'

  // Define specific pulse paths - these will loop consistently
  const pulsePaths: PulsePath[] = []
  
  if (dimensions.width > 0 && dimensions.height > 0) {
    const horizontalLines = Math.ceil(dimensions.height / gridSize)
    const verticalLines = Math.ceil(dimensions.width / gridSize)
    
    // Create 6 consistent pulse paths
    // Horizontal pulses
    pulsePaths.push({
      id: 'h1',
      direction: 'horizontal',
      position: Math.floor(horizontalLines * 0.2) * gridSize,
      reverse: false,
      speed: 0.8,
      length: 60,
      delay: 0,
      cycleDuration: Math.ceil((dimensions.width + 120) / 0.8),
    })
    
    pulsePaths.push({
      id: 'h2',
      direction: 'horizontal',
      position: Math.floor(horizontalLines * 0.5) * gridSize,
      reverse: true,
      speed: 0.8,
      length: 60,
      delay: Math.ceil((dimensions.width + 120) / 0.8) / 2,
      cycleDuration: Math.ceil((dimensions.width + 120) / 0.8),
    })
    
    pulsePaths.push({
      id: 'h3',
      direction: 'horizontal',
      position: Math.floor(horizontalLines * 0.8) * gridSize,
      reverse: false,
      speed: 0.8,
      length: 60,
      delay: Math.ceil((dimensions.width + 120) / 0.8) / 3,
      cycleDuration: Math.ceil((dimensions.width + 120) / 0.8),
    })
    
    // Vertical pulses
    pulsePaths.push({
      id: 'v1',
      direction: 'vertical',
      position: Math.floor(verticalLines * 0.25) * gridSize,
      reverse: false,
      speed: 0.8,
      length: 60,
      delay: Math.ceil((dimensions.width + 120) / 0.8) / 4,
      cycleDuration: Math.ceil((dimensions.height + 120) / 0.8),
    })
    
    pulsePaths.push({
      id: 'v2',
      direction: 'vertical',
      position: Math.floor(verticalLines * 0.75) * gridSize,
      reverse: true,
      speed: 0.8,
      length: 60,
      delay: Math.ceil((dimensions.width + 120) / 0.8) / 5,
      cycleDuration: Math.ceil((dimensions.height + 120) / 0.8),
    })
    
    pulsePaths.push({
      id: 'v3',
      direction: 'vertical',
      position: Math.floor(verticalLines * 0.5) * gridSize,
      reverse: false,
      speed: 0.8,
      length: 60,
      delay: Math.ceil((dimensions.width + 120) / 0.8) / 6,
      cycleDuration: Math.ceil((dimensions.height + 120) / 0.8),
    })
  }

  const horizontalLines = []
  const verticalLines = []
  
  if (dimensions.width > 0 && dimensions.height > 0) {
    for (let i = 0; i <= Math.ceil(dimensions.height / gridSize); i++) {
      horizontalLines.push(i * gridSize)
    }
    for (let i = 0; i <= Math.ceil(dimensions.width / gridSize); i++) {
      verticalLines.push(i * gridSize)
    }
  }

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      width={dimensions.width || '100%'}
      height={dimensions.height || '100%'}
      style={{ backgroundColor: 'transparent' }}
    >
      <defs>
        <filter id={`glow-${theme}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {horizontalLines.map((y, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={y}
          x2={dimensions.width}
          y2={y}
          stroke={gridColor}
          strokeWidth="1"
        />
      ))}
      
      {verticalLines.map((x, i) => (
        <line
          key={`v-${i}`}
          x1={x}
          y1="0"
          x2={x}
          y2={dimensions.height}
          stroke={gridColor}
          strokeWidth="1"
        />
      ))}

      {/* Consistent looping energy pulses */}
      {/* Render all trails first */}
      {pulsePaths.map((path) => {
        const cyclePosition = (frameCount - path.delay + path.cycleDuration) % path.cycleDuration
        const progress = cyclePosition * path.speed
        
        if (path.direction === 'horizontal') {
          const startX = path.reverse 
            ? dimensions.width + 60 - progress
            : -60 + progress
          const endX = startX + (path.reverse ? -path.length : path.length)
          
          if (endX < -60 || startX > dimensions.width + 60) return null
          
          return (
            <line
              key={`trail-${path.id}`}
              x1={Math.max(-60, Math.min(dimensions.width + 60, startX))}
              y1={path.position}
              x2={Math.max(-60, Math.min(dimensions.width + 60, endX))}
              y2={path.position}
              stroke={pulseColor}
              strokeWidth="3"
              opacity="0.7"
              strokeLinecap="round"
              style={{ 
                filter: `drop-shadow(0 0 6px ${pulseColor})`,
              }}
            />
          )
        } else {
          const startY = path.reverse 
            ? dimensions.height + 60 - progress
            : -60 + progress
          const endY = startY + (path.reverse ? -path.length : path.length)
          
          if (endY < -60 || startY > dimensions.height + 60) return null
          
          return (
            <line
              key={`trail-${path.id}`}
              x1={path.position}
              y1={Math.max(-60, Math.min(dimensions.height + 60, startY))}
              x2={path.position}
              y2={Math.max(-60, Math.min(dimensions.height + 60, endY))}
              stroke={pulseColor}
              strokeWidth="3"
              opacity="0.7"
              strokeLinecap="round"
              style={{ 
                filter: `drop-shadow(0 0 6px ${pulseColor})`,
              }}
            />
          )
        }
      })}
      
      {/* Render all bikes after trails so they're always on top */}
      {pulsePaths.map((path) => {
        const cyclePosition = (frameCount - path.delay + path.cycleDuration) % path.cycleDuration
        const progress = cyclePosition * path.speed
        
        if (path.direction === 'horizontal') {
          const startX = path.reverse 
            ? dimensions.width + 60 - progress
            : -60 + progress
          const endX = startX + (path.reverse ? -path.length : path.length)
          
          if (endX < -60 || startX > dimensions.width + 60) return null
          
          // Bike should be at the leading edge (where it's heading)
          // endX is always the leading edge: left when moving left, right when moving right
          const bikeX = endX
          const bikeY = path.position
          const isBikeVisible = bikeX >= -bikeSize && bikeX <= dimensions.width + bikeSize &&
                                bikeY >= -bikeSize && bikeY <= dimensions.height + bikeSize
          
          if (!isBikeVisible) return null
          
          return (
            <g key={`bike-${path.id}`}>
              {/* Classic Tron arcade bike - simple horizontal rectangle */}
              <rect
                x={bikeX - bikeSize * 0.75}
                y={bikeY - bikeSize * 0.5}
                width={bikeSize * 1.5}
                height={bikeSize}
                fill={pulseColor}
                opacity="0.9"
                style={{ 
                  filter: `drop-shadow(0 0 4px ${pulseColor})`,
                }}
              />
              {/* Brighter front section - like arcade game */}
              <rect
                x={path.reverse ? bikeX - bikeSize * 0.75 : bikeX + bikeSize * 0.75 - bikeSize * 0.4}
                y={bikeY - bikeSize * 0.5}
                width={bikeSize * 0.4}
                height={bikeSize}
                fill={pulseColor}
                opacity="1"
                style={{ 
                  filter: `drop-shadow(0 0 8px ${pulseColor})`,
                }}
              />
            </g>
          )
        } else {
          const startY = path.reverse 
            ? dimensions.height + 60 - progress
            : -60 + progress
          const endY = startY + (path.reverse ? -path.length : path.length)
          
          if (endY < -60 || startY > dimensions.height + 60) return null
          
          // Bike should be at the leading edge (where it's heading)
          // endY is always the leading edge: top when moving up, bottom when moving down
          const bikeX = path.position
          const bikeY = endY
          const isBikeVisible = bikeX >= -bikeSize && bikeX <= dimensions.width + bikeSize &&
                                bikeY >= -bikeSize && bikeY <= dimensions.height + bikeSize
          
          if (!isBikeVisible) return null
          
          return (
            <g key={`bike-${path.id}`}>
              {/* Classic Tron arcade bike - simple vertical rectangle */}
              <rect
                x={bikeX - bikeSize * 0.5}
                y={bikeY - bikeSize * 0.75}
                width={bikeSize}
                height={bikeSize * 1.5}
                fill={pulseColor}
                opacity="0.9"
                style={{ 
                  filter: `drop-shadow(0 0 4px ${pulseColor})`,
                }}
              />
              {/* Brighter front section - like arcade game */}
              <rect
                x={bikeX - bikeSize * 0.5}
                y={path.reverse ? bikeY - bikeSize * 0.75 : bikeY + bikeSize * 0.75 - bikeSize * 0.4}
                width={bikeSize}
                height={bikeSize * 0.4}
                fill={pulseColor}
                opacity="1"
                style={{ 
                  filter: `drop-shadow(0 0 8px ${pulseColor})`,
                }}
              />
            </g>
          )
        }
      })}
    </svg>
  )
}
