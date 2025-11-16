'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? `bg-tron-darker/90 backdrop-blur-sm border-b ${
              theme === 'blue' ? 'border-tron-blue/30' : 'border-tron-red/30'
            }`
          : '' 
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold glow-text cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            {'<Ashton Howard />'}
          </motion.div>
          
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? theme === 'blue' ? 'text-tron-blue glow-text' : 'text-tron-red glow-text'
                      : theme === 'blue' ? 'text-tron-blue/60 hover:text-tron-blue' : 'text-tron-red/60 hover:text-tron-red'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'}`}
                      style={{ boxShadow: theme === 'blue' ? '0 0 10px rgba(0, 255, 255, 0.8)' : '0 0 10px rgba(255, 0, 64, 0.8)' }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

