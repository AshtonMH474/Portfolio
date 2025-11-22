'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface EnergyNode {
  x: number
  y: number
  phase: number
  connections: Array<{ x: number; y: number }>
  energyLevel: number
  lastPulse: number
}

interface EnergyParticle {
  x: number
  y: number
  progress: number
  path: Array<{ x: number; y: number }>
  speed: number
  nodeIndex: number
  connIndex: number
}

interface GridRipple {
  x: number
  y: number
  radius: number
  opacity: number
  startFrame: number
}

export default function GridBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [frameCount, setFrameCount] = useState(0)
  const [energyParticles, setEnergyParticles] = useState<EnergyParticle[]>([])
  const [gridRipples, setGridRipples] = useState<GridRipple[]>([])
  const gridSize = 50

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
      setFrameCount((prev) => {
        const newCount = prev + 1
        
        // Spawn energy particles randomly along connections
        if (newCount % 30 === 0 && energyNodes.length > 0) {
          const randomNodeIndex = Math.floor(Math.random() * energyNodes.length)
          const node = energyNodes[randomNodeIndex]
          
          if (node.connections.length > 0) {
            const randomConnIndex = Math.floor(Math.random() * node.connections.length)
            const target = node.connections[randomConnIndex]
            
            // Create path for particle
            const dx = target.x - node.x
            const dy = target.y - node.y
            const distance = Math.sqrt(dx ** 2 + dy ** 2)
            const isHorizontal = Math.abs(dy) < 5
            const segments = Math.floor(distance / 10)
            const path: Array<{ x: number; y: number }> = []
            
            for (let i = 0; i <= segments; i++) {
              const t = i / segments
              let x, y
              if (isHorizontal) {
                x = node.x + dx * t
                y = node.y + Math.sin(t * Math.PI * 4) * 3
              } else {
                x = node.x + Math.sin(t * Math.PI * 4) * 3
                y = node.y + dy * t
              }
              path.push({ x, y })
            }
            
            const particle: EnergyParticle = {
              x: node.x,
              y: node.y,
              progress: 0,
              path,
              speed: 0.015 + Math.random() * 0.01,
              nodeIndex: randomNodeIndex,
              connIndex: randomConnIndex,
            }
            
            setEnergyParticles((prev) => [...prev, particle])
            
            // Create ripple effect at node
            const ripple: GridRipple = {
              x: node.x,
              y: node.y,
              radius: 0,
              opacity: 0.6,
              startFrame: newCount,
            }
            setGridRipples((prev) => [...prev, ripple])
            
            // Clean up ripple after animation
            setTimeout(() => {
              setGridRipples((prev) => prev.filter((r) => r.startFrame !== ripple.startFrame))
            }, 2000)
          }
        }
        
        return newCount
      })
      
      // Update particle positions
      setEnergyParticles((prev) => 
        prev.map((particle) => {
          const newProgress = particle.progress + particle.speed
          if (newProgress >= 1) {
            // Particle reached destination, remove it
            return null
          }
          return { ...particle, progress: newProgress }
        }).filter((p): p is EnergyParticle => p !== null)
      )
      
      // Update ripple animations
      setGridRipples((prev) =>
        prev.map((ripple) => ({
          ...ripple,
          radius: (frameCount - ripple.startFrame) * 2,
          opacity: Math.max(0, ripple.opacity - 0.02),
        })).filter((r) => r.opacity > 0)
      )
      
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

  const horizontalLines: number[] = []
  const verticalLines: number[] = []
  const [energyNodes, setEnergyNodes] = useState<EnergyNode[]>([])
  
  // Generate energy nodes at grid intersections
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return
    
    // Generate grid lines first
    const hLines: number[] = []
    const vLines: number[] = []
    
    for (let i = 0; i <= Math.ceil(dimensions.height / gridSize); i++) {
      hLines.push(i * gridSize)
    }
    for (let i = 0; i <= Math.ceil(dimensions.width / gridSize); i++) {
      vLines.push(i * gridSize)
    }
    
    const nodes: EnergyNode[] = []
    const nodeSpacing = 4 // Every 4th grid intersection
    
    // First pass: create all nodes
    const nodePositions: Array<{ x: number; y: number; i: number; j: number }> = []
    for (let i = nodeSpacing; i < hLines.length; i += nodeSpacing) {
      for (let j = nodeSpacing; j < vLines.length; j += nodeSpacing) {
        // Random chance to create a node (70% chance)
        if (Math.random() > 0.3) {
          const x = vLines[j]
          const y = hLines[i]
          nodePositions.push({ x, y, i, j })
        }
      }
    }
    
    // Second pass: create nodes with connections only to existing nodes
    nodePositions.forEach((pos) => {
      const connections: Array<{ x: number; y: number }> = []
      
      // Check for nearby nodes that actually exist
      nodePositions.forEach((otherPos) => {
        if (otherPos.x === pos.x && otherPos.y === pos.y) return
        
        const dx = Math.abs(otherPos.x - pos.x)
        const dy = Math.abs(otherPos.y - pos.y)
        
        // Only connect if it's perfectly horizontal or vertical (follows grid lines)
        const isHorizontal = dy < 5 && dx > 0
        const isVertical = dx < 5 && dy > 0
        
        if (!isHorizontal && !isVertical) return
        
        const distance = Math.sqrt(dx ** 2 + dy ** 2)
        
        // Connect if within reasonable distance and random chance
        if (distance < gridSize * nodeSpacing * 2 && Math.random() > 0.6) {
          connections.push({ x: otherPos.x, y: otherPos.y })
        }
      })
      
      // Only add node if it has connections to actual existing nodes
      if (connections.length > 0) {
        nodes.push({
          x: pos.x,
          y: pos.y,
          phase: Math.random() * Math.PI * 2,
          connections,
          energyLevel: Math.random(),
          lastPulse: 0,
        })
      }
    })
    
    setEnergyNodes(nodes)
  }, [dimensions.width, dimensions.height])
  
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
        
        {/* Radial gradient for energy nodes */}
        <radialGradient id={`nodeGradient-${theme}`}>
          <stop offset="0%" stopColor={pulseColor} stopOpacity="1" />
          <stop offset="50%" stopColor={pulseColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={pulseColor} stopOpacity="0" />
        </radialGradient>
        
        {/* Gradient for energy particles */}
        <radialGradient id={`particleGradient-${theme}`}>
          <stop offset="0%" stopColor={pulseColor} stopOpacity="1" />
          <stop offset="100%" stopColor={pulseColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grid lines with subtle pulsing */}
      {horizontalLines.map((y, i) => {
        const gridPulse = Math.sin(frameCount * 0.01 + i * 0.1) * 0.05 + 0.95
        return (
          <line
            key={`h-${i}`}
            x1="0"
            y1={y}
            x2={dimensions.width}
            y2={y}
            stroke={gridColor}
            strokeWidth="1"
            opacity={gridPulse}
          />
        )
      })}
      
      {verticalLines.map((x, i) => {
        const gridPulse = Math.sin(frameCount * 0.01 + i * 0.1) * 0.05 + 0.95
        return (
          <line
            key={`v-${i}`}
            x1={x}
            y1="0"
            x2={x}
            y2={dimensions.height}
            stroke={gridColor}
            strokeWidth="1"
            opacity={gridPulse}
          />
        )
      })}
      
      {/* Grid intersection highlights - pulse when energy passes */}
      {horizontalLines.map((y, hi) => {
        return verticalLines.map((x, vi) => {
          // Check if any energy node is at this intersection
          const hasNode = energyNodes.some((node) => 
            Math.abs(node.x - x) < 2 && Math.abs(node.y - y) < 2
          )
          
          if (!hasNode) return null
          
          const intersectionPulse = Math.sin(frameCount * 0.05 + hi * 0.2 + vi * 0.2) * 0.3 + 0.7
          
          return (
            <circle
              key={`intersection-${hi}-${vi}`}
              cx={x}
              cy={y}
              r={2}
              fill={pulseColor}
              opacity={intersectionPulse * 0.2}
              style={{ filter: `drop-shadow(0 0 3px ${pulseColor})` }}
            />
          )
        })
      })}
      
      {/* Grid ripples from energy pulses */}
      {gridRipples.map((ripple, i) => (
        <circle
          key={`ripple-${i}`}
          cx={ripple.x}
          cy={ripple.y}
          r={ripple.radius}
          fill="none"
          stroke={pulseColor}
          strokeWidth="2"
          opacity={ripple.opacity * 0.4}
          style={{ filter: `drop-shadow(0 0 8px ${pulseColor})` }}
        />
      ))}

      {/* Energy Nodes and Connections - Wavy energy flows through grid */}
      {energyNodes.map((node, nodeIndex) => {
        const pulsePhase = (frameCount * 0.03 + node.phase) % (Math.PI * 2)
        const nodePulse = Math.sin(pulsePhase) * 0.3 + 0.7
        const nodeOpacity = nodePulse * 0.4 // Subtle opacity
        
        // Check if particle is at this node
        const particleAtNode = energyParticles.some(
          (p) => p.nodeIndex === nodeIndex && p.progress < 0.1
        )
        const nodeIntensity = particleAtNode ? 1.5 : 1
        
        return (
          <g key={`node-${nodeIndex}`}>
            {/* Outer glow ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill={`url(#nodeGradient-${theme})`}
              opacity={nodeOpacity * 0.3 * nodeIntensity}
            />
            {/* Energy node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={4 * nodeIntensity}
              fill={`url(#nodeGradient-${theme})`}
              opacity={nodeOpacity * nodeIntensity}
              style={{ filter: `drop-shadow(0 0 8px ${pulseColor})` }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={2 * nodeIntensity}
              fill={pulseColor}
              opacity={nodeOpacity * 1.5 * nodeIntensity}
            />
            
            {/* Orbiting particles around active nodes */}
            {particleAtNode && [0, 1, 2].map((i) => {
              const angle = (frameCount * 0.05 + i * Math.PI * 0.67) % (Math.PI * 2)
              const radius = 12
              return (
                <circle
                  key={`orbit-${nodeIndex}-${i}`}
                  cx={node.x + Math.cos(angle) * radius}
                  cy={node.y + Math.sin(angle) * radius}
                  r={1.5}
                  fill={pulseColor}
                  opacity={nodeOpacity * 0.8}
                  style={{ filter: `drop-shadow(0 0 4px ${pulseColor})` }}
                />
              )
            })}
            
            {/* Wavy energy connections through grid lines */}
            {node.connections.map((target, connIndex) => {
              const dx = target.x - node.x
              const dy = target.y - node.y
              const distance = Math.sqrt(dx ** 2 + dy ** 2)
              
              // Only draw if connection follows grid lines (horizontal or vertical)
              const isHorizontal = Math.abs(dy) < 5
              const isVertical = Math.abs(dx) < 5
              
              if (!isHorizontal && !isVertical) return null
              
              // Create wavy path along grid line with more variation
              const segments = Math.floor(distance / 8)
              const points: Array<{ x: number; y: number }> = []
              const waveFrequency = 3 + Math.sin(nodeIndex * 0.5) * 2
              const waveAmplitude = 2 + Math.sin(connIndex * 0.3) * 2
              
              for (let i = 0; i <= segments; i++) {
                const t = i / segments
                let x, y
                
                if (isHorizontal) {
                  x = node.x + dx * t
                  y = node.y + Math.sin(t * Math.PI * waveFrequency + frameCount * 0.05 + connIndex) * waveAmplitude
                } else {
                  x = node.x + Math.sin(t * Math.PI * waveFrequency + frameCount * 0.05 + connIndex) * waveAmplitude
                  y = node.y + dy * t
                }
                
                points.push({ x, y })
              }
              
              const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
              
              // Multiple energy pulses traveling along the connection
              const numPulses = 2
              const connectionOpacity = nodeOpacity * 0.5
              
              return (
                <g key={`conn-${nodeIndex}-${connIndex}`}>
                  {/* Base connection line (very subtle) */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={pulseColor}
                    strokeWidth="1"
                    opacity={connectionOpacity * 0.15}
                    strokeLinecap="round"
                  />
                  
                  {/* Multiple traveling energy pulses */}
                  {Array.from({ length: numPulses }).map((_, pulseIndex) => {
                    const travelProgress = ((frameCount * 0.02 + nodeIndex * 0.1 + connIndex * 0.2 + pulseIndex * 0.5) % 1)
                    const energyLength = distance * 0.25
                    const energyStart = travelProgress * (distance + energyLength) - energyLength
                    const energyEnd = energyStart + energyLength
                    
                    let visibleStart = Math.max(0, energyStart)
                    let visibleEnd = Math.min(distance, energyEnd)
                    
                    if (visibleEnd <= visibleStart) return null
                    
                    const visibleStartT = visibleStart / distance
                    const visibleEndT = visibleEnd / distance
                    
                    const visiblePoints: Array<{ x: number; y: number }> = []
                    for (let i = 0; i <= segments; i++) {
                      const t = i / segments
                      if (t >= visibleStartT && t <= visibleEndT) {
                        let x, y
                        if (isHorizontal) {
                          x = node.x + dx * t
                          y = node.y + Math.sin(t * Math.PI * waveFrequency + frameCount * 0.05 + connIndex) * waveAmplitude
                        } else {
                          x = node.x + Math.sin(t * Math.PI * waveFrequency + frameCount * 0.05 + connIndex) * waveAmplitude
                          y = node.y + dy * t
                        }
                        visiblePoints.push({ x, y })
                      }
                    }
                    
                    if (visiblePoints.length < 2) return null
                    
                    const visiblePathData = visiblePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
                    const pulseIntensity = Math.sin(travelProgress * Math.PI) * 0.5 + 0.5
                    
                    return (
                      <path
                        key={`pulse-${pulseIndex}`}
                        d={visiblePathData}
                        fill="none"
                        stroke={pulseColor}
                        strokeWidth="2"
                        opacity={connectionOpacity * nodePulse * pulseIntensity}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 4px ${pulseColor})` }}
                      />
                    )
                  })}
                </g>
              )
            })}
          </g>
        )
      })}

      {/* Energy particles traveling along connections */}
      {energyParticles.map((particle, i) => {
        if (particle.path.length === 0) return null
        
        const pathIndex = Math.floor(particle.progress * (particle.path.length - 1))
        const nextIndex = Math.min(pathIndex + 1, particle.path.length - 1)
        const segmentProgress = (particle.progress * (particle.path.length - 1)) % 1
        
        const currentPoint = particle.path[pathIndex]
        const nextPoint = particle.path[nextIndex]
        
        const x = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress
        const y = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress
        
        const particlePulse = Math.sin(frameCount * 0.2 + i) * 0.3 + 0.7
        
        return (
          <g key={`particle-${i}`}>
            {/* Particle trail */}
            <circle
              cx={x}
              cy={y}
              r={3}
              fill={`url(#particleGradient-${theme})`}
              opacity={particlePulse * 0.6}
              style={{ filter: `drop-shadow(0 0 6px ${pulseColor})` }}
            />
            {/* Bright core */}
            <circle
              cx={x}
              cy={y}
              r={1.5}
              fill={pulseColor}
              opacity={particlePulse}
            />
          </g>
        )
      })}

    </svg>
  )
}
