'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function About() {
  const { theme } = useTheme()
  const interests = [
    { icon: '🎮', title: 'Video Games', description: 'Video games taught me strategy' },
    { icon: '🏂', title: 'Snowboarding', description: 'Chasing powder and perfect runs' },
    { icon: '💻', title: 'Coding', description: 'Building the future, one commit at a time' },
  ]

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            About Me
          </h2>
          <div 
            className={`w-24 h-1 mx-auto mb-8 ${theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'}`} 
            style={{ boxShadow: theme === 'blue' ? '0 0 10px rgba(0, 255, 255, 0.8)' : '0 0 10px rgba(255, 0, 64, 0.8)' }} 
          />
        </motion.div>

        <div className="grid xl:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="tron-border p-8 bg-tron-dark/30"
          >
            <p className={`text-lg mb-6 leading-relaxed ${theme === 'blue' ? 'text-tron-blue/90' : 'text-tron-red/90'}`}>
              I'm a passionate full-stack developer who loves creating digital experiences that push boundaries.
              My journey in tech started with curiosity and has evolved into a deep passion for building
              innovative solutions.
            </p>
            <p className={`text-lg mb-6 leading-relaxed ${theme === 'blue' ? 'text-tron-blue/90' : 'text-tron-red/90'}`}>
            When I'm not coding, you'll find me grinding through video games or carving fresh tracks on the mountain. These passions fuel my creativity and help me approach problems from unique angles.
            </p>
            <p className={`text-lg leading-relaxed ${theme === 'blue' ? 'text-tron-blue/90' : 'text-tron-red/90'}`}>
              I believe in writing clean, maintainable code and staying on the cutting edge of
              technology. Every project is an opportunity to learn something new and create something
              amazing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="tron-border p-6 bg-tron-dark/30 flex items-start gap-4"
              >
                <div className="text-4xl">{interest.icon}</div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'blue' ? 'text-tron-cyan' : 'text-tron-orange'}`}>{interest.title}</h3>
                  <p className={theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}>{interest.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

