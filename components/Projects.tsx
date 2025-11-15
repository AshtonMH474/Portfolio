'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const { theme } = useTheme()
  const sendToURL = (url: string) => {
    window.open(url, '_blank')
  }

  const projects = [
    {
      title: 'Recro.com',
      description: 'Full-stack content-driven platform built with Next.js, featuring a Framer Motion parallax UI, Google OAuth authentication, and a self-hosted MongoDB backend on AWS.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'NextAuth', 'TinaCMS'],
      status: 'Completed',
      projectURL: 'https://recro-website.vercel.app/',
      sourceCode: 'https://github.com/AshtonMH474/RecroWebsite',
    },
    {
      title: 'Recro\'s Partner Portal',
      description: 'Partner portal platform built with Next.js, featuring real-time HubSpot deal syncing, automated CRM-backed deal submission, and a personalized dashboard powered by a dynamic CMS workflow.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'NextAuth', 'TinaCMS'],
      status: 'Completed',
      projectURL: 'https://recro-partner-portal.vercel.app/',
      sourceCode: 'https://github.com/AshtonMH474/RecroPartnerPortal',
    },
    {
      title: 'Popcorn-Palette',
      description: 'Interactive movie discovery app built with React and Flask, featuring real-time search, dynamic watchlist management, animated UI elements, and seamless API-driven navigation.',
      tech: ['React', 'Redux', 'SQLAlchemy', 'Flask','Docker','CSS'],
      status: 'Completed',
      projectURL: 'https://popcorn-palette.onrender.com/',
      sourceCode: 'https://github.com/AshtonMH474/Popcorn-Palette',
    },
    {
      title: 'KANA',
      description: 'Gamified task-management app built with React and Flask, featuring customizable avatars, interactive modals, a dynamic rewards system, and streamlined global styling for a cohesive user experience.',
      tech: ['React', 'Redux', 'SQLAlchemy', 'Flask','Docker','CSS'],
      status: 'Completed',
      projectURL: 'https://kana-45i8.onrender.com/',
      sourceCode: 'https://github.com/AnthonyBotha/KANA',
    },
  ]

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Featured Projects
          </h2>
          <div 
            className={`w-24 h-1 mx-auto mb-8 ${theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'}`} 
            style={{ boxShadow: theme === 'blue' ? '0 0 10px rgba(0, 255, 255, 0.8)' : '0 0 10px rgba(255, 0, 64, 0.8)' }} 
          />
          <p className={`text-lg ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}>
            A showcase of my recent work and projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="relative tron-border energy-border-animated bg-tron-dark/30 p-6 group cursor-pointer overflow-hidden"
            >
              {/* Hover glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === 'blue' ? 'from-tron-blue/10' : 'from-tron-red/10'
                } to-transparent`}
                animate={{
                  boxShadow: hoveredProject === index 
                    ? theme === 'blue'
                      ? '0 0 40px rgba(0, 255, 255, 0.4)' 
                      : '0 0 40px rgba(255, 0, 64, 0.4)'
                    : theme === 'blue'
                      ? '0 0 20px rgba(0, 255, 255, 0.2)'
                      : '0 0 20px rgba(255, 0, 64, 0.2)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-2xl font-semibold transition-colors ${
                    theme === 'blue' 
                      ? 'text-tron-cyan group-hover:text-tron-blue' 
                      : 'text-tron-orange group-hover:text-tron-red'
                  }`}>
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-semibold border ${
                    project.status === 'Completed' 
                      ? theme === 'blue'
                        ? 'bg-tron-blue/20 text-tron-blue border-tron-blue' 
                        : 'bg-tron-red/20 text-tron-red border-tron-red'
                      : theme === 'blue'
                        ? 'bg-tron-cyan/20 text-tron-cyan border-tron-cyan'
                        : 'bg-tron-orange/20 text-tron-orange border-tron-orange'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className={`mb-6 leading-relaxed ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-sm border bg-tron-dark/50 ${
                        theme === 'blue' 
                          ? 'border-tron-blue/30 text-tron-blue/80' 
                          : 'border-tron-red/30 text-tron-red/80'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`transition-colors font-medium energy-trail-button relative overflow-hidden ${
                      theme === 'blue' 
                        ? 'text-tron-cyan hover:text-tron-blue' 
                        : 'text-tron-orange hover:text-tron-red'
                    }`}
                    onClick={() => sendToURL(project.projectURL)}
                  >
                    View Project →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`transition-colors energy-trail-button relative overflow-hidden ${
                      theme === 'blue' 
                        ? 'text-tron-blue/60 hover:text-tron-blue' 
                        : 'text-tron-red/60 hover:text-tron-red'
                    }`}
                    onClick={() => sendToURL(project.sourceCode)}
                  >
                    Source Code
                  </motion.button>
                </div>
              </div>

              {/* Animated corner accents */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-50 ${theme === 'blue' ? 'border-tron-blue' : 'border-tron-red'}`} />
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-50 ${theme === 'blue' ? 'border-tron-blue' : 'border-tron-red'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

