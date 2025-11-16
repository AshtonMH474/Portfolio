'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { theme } = useTheme()

  const skillCategories = [
    {
      category: 'LANGUAGES',
      icon: '[CODE]',
      skills: ['JavaScript', 'Python', 'TypeScript', 'SQL'],
    },
    {
      category: 'FRONTEND',
      icon: '[UI]',
      skills: ['HTML5', 'CSS', 'React', 'Redux', 'Next.js', 'Tailwind', 'Framer Motion'],
    },
    {
      category: 'BACKEND',
      icon: '[API]',
      skills: ['Flask', 'Express', 'Sequelize', 'NextAuth', 'Nodemailer'],
    },
    {
      category: 'DATABASES',
      icon: '[DATA]',
      skills: ['SQLite3', 'SQLAlchemy', 'PostgreSQL', 'MongoDB', 'AWS S3', 'Cloudinary'],
    },
    {
      category: 'TOOLS',
      icon: '[DEV]',
      skills: ['Git', 'AWS', 'Linux', 'GraphQL', 'Docker', 'Postman', 'Figma', 'Visual Studio Code', 'TinaCMS'],
    },
  ]

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold mb-4 glow-text">
            SYSTEM CAPABILITIES
          </h2>
          <div 
            className={`w-24 h-1 mx-auto mb-12 ${theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'}`} 
            style={{ boxShadow: theme === 'blue' ? '0 0 10px rgba(0, 255, 255, 0.8)' : '0 0 10px rgba(255, 0, 64, 0.8)' }} 
          />
          <p className={`text-lg ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}>
            Technologies integrated into my digital framework
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="tron-border energy-border-animated p-6 bg-tron-dark/30 relative overflow-hidden group"
            >
              {/* Energy corner accents */}
              <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-60 ${theme === 'blue' ? 'border-tron-blue' : 'border-tron-red'}`} />
              <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-60 ${theme === 'blue' ? 'border-tron-blue' : 'border-tron-red'}`} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-sm font-mono ${theme === 'blue' ? 'text-tron-blue/60' : 'text-tron-red/60'}`}>{category.icon}</span>
                  <h3 className={`text-xl font-semibold glow-text ${theme === 'blue' ? 'text-tron-cyan' : 'text-tron-orange'}`}>
                    {category.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                      onHoverStart={() => setHoveredSkill(skill)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="relative"
                    >
                      <div
                        className={`px-3 py-1.5 text-sm border transition-all ${
                          hoveredSkill === skill
                            ? theme === 'blue'
                              ? 'border-tron-blue bg-tron-blue/20 text-tron-blue energy-glow'
                              : 'border-tron-red bg-tron-red/20 text-tron-red energy-glow'
                            : theme === 'blue'
                              ? 'border-tron-blue/40 bg-tron-dark/50 text-tron-blue/80 hover:border-tron-blue/60'
                              : 'border-tron-red/40 bg-tron-dark/50 text-tron-red/80 hover:border-tron-red/60'
                        }`}
                        style={{
                          boxShadow: hoveredSkill === skill 
                            ? theme === 'blue'
                              ? '0 0 15px rgba(0, 255, 255, 0.6)' 
                              : '0 0 15px rgba(255, 0, 64, 0.6)'
                            : theme === 'blue'
                              ? '0 0 5px rgba(0, 255, 255, 0.2)'
                              : '0 0 5px rgba(255, 0, 64, 0.2)',
                        }}
                      >
                        {skill}
                        {hoveredSkill === skill && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            className={`absolute bottom-0 left-0 h-0.5 ${theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'}`}
                            style={{ boxShadow: theme === 'blue' ? '0 0 5px rgba(0, 255, 255, 0.8)' : '0 0 5px rgba(255, 0, 64, 0.8)' }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover energy effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === 'blue' ? 'from-tron-blue/5' : 'from-tron-red/5'
                } to-transparent`}
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* Energy grid pattern overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={`relative mt-16 pt-12 border-t ${theme === 'blue' ? 'border-tron-blue/30' : 'border-tron-red/30'}`}
        >
          <div className="text-center">
            <motion.p
              className={`text-sm mb-6 ${theme === 'blue' ? 'text-tron-blue/60' : 'text-tron-red/60'}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <span className={theme === 'blue' ? 'text-tron-cyan' : 'text-tron-orange'}>[SYSTEM STATUS]</span> All modules operational
            </motion.p>
            
            {/* Animated energy line */}
            <motion.div
              className={`h-px bg-gradient-to-r from-transparent to-transparent mx-auto ${
                theme === 'blue' ? 'via-tron-blue' : 'via-tron-red'
              }`}
              style={{ 
                width: '200px', 
                boxShadow: theme === 'blue' ? '0 0 10px rgba(0, 255, 255, 0.8)' : '0 0 10px rgba(255, 0, 64, 0.8)' 
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
