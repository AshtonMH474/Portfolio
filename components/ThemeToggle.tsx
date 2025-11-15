'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-1.5 border-2 bg-tron-dark/50 backdrop-blur-sm transition-all rounded ${
        theme === 'blue' ? 'border-tron-blue' : 'border-tron-red'
      }`}
      style={{
        boxShadow: theme === 'blue' 
          ? '0 0 10px rgba(0, 255, 255, 0.4)' 
          : '0 0 10px rgba(255, 0, 64, 0.4)',
      }}
    >
      <div className="flex items-center gap-2">
        <span 
          className={`text-xs font-mono font-semibold inline ${
            theme === 'blue' ? 'text-tron-blue' : 'text-tron-red'
          }`}
        >
          {theme === 'blue' ? '[USER]' : '[PROGRAM]'}
        </span>
        <div 
          className={`relative w-10 h-5 border-2 rounded-full ${
            theme === 'blue' ? 'border-tron-blue' : 'border-tron-red'
          }`}
          style={{
            backgroundColor: theme === 'blue' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 0, 64, 0.1)',
          }}
        >
          <motion.div
            className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full ${
              theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'
            }`}
            animate={{
              x: theme === 'blue' ? 0 : 16,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              boxShadow: theme === 'blue'
                ? '0 0 8px rgba(0, 255, 255, 0.8)'
                : '0 0 8px rgba(255, 0, 64, 0.8)',
            }}
          />
        </div>
      </div>
    </motion.button>
  )
}

