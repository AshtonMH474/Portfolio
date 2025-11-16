'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Contact() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      alert('Message sent!')
    } else {
      alert('Failed to send message.')
    }
    setFormData({ name: '', email: '', message: '' })
    return;
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/AshtonMH474', icon: '💻' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ashton-howard-9a7b43305/', icon: '🔗' },
    { name: 'Email', url: 'mailto:ashtonhowa@gmail.com', icon: '✉️' },
  ]

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Get In Touch
          </h2>
          <div 
            className={`w-24 h-1 mx-auto mb-12 ${theme === 'blue' ? 'bg-tron-blue' : 'bg-tron-red'}`} 
            style={{ boxShadow: theme === 'blue' ? '0 0 10px rgba(0, 255, 255, 0.8)' : '0 0 10px rgba(255, 0, 64, 0.8)' }} 
          />
          <p className={`text-lg ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}>
            Have a project in mind? Let&apos;s build something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="tron-border p-8 bg-tron-dark/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block mb-2 font-medium ${theme === 'blue' ? 'text-tron-blue' : 'text-tron-red'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-3 border transition-all focus:outline-none focus:ring-2 ${
                    theme === 'blue' 
                      ? 'border-tron-blue/30 bg-tron-dark text-tron-blue focus:border-tron-blue focus:ring-tron-blue/50' 
                      : 'border-tron-red/30 bg-tron-red-dark text-tron-red focus:border-tron-red focus:ring-tron-red/50'
                  }`}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block mb-2 font-medium ${theme === 'blue' ? 'text-tron-blue' : 'text-tron-red'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`w-full px-4 py-3 border transition-all focus:outline-none focus:ring-2 ${
                    theme === 'blue' 
                      ? 'border-tron-blue/30 bg-tron-dark text-tron-blue focus:border-tron-blue focus:ring-tron-blue/50' 
                      : 'border-tron-red/30 bg-tron-red-dark text-tron-red focus:border-tron-red focus:ring-tron-red/50'
                  }`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block mb-2 font-medium ${theme === 'blue' ? 'text-tron-blue' : 'text-tron-red'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 border transition-all focus:outline-none focus:ring-2 resize-none ${
                    theme === 'blue' 
                      ? 'border-tron-blue/30 bg-tron-dark text-tron-blue focus:border-tron-blue focus:ring-tron-blue/50' 
                      : 'border-tron-red/30 bg-tron-red-dark text-tron-red focus:border-tron-red focus:ring-tron-red/50'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: theme === 'blue' 
                    ? '0 0 30px rgba(0, 255, 255, 0.8)' 
                    : '0 0 30px rgba(255, 0, 64, 0.8)' 
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-full px-8 py-3 font-semibold transition-all ${
                  theme === 'blue' 
                    ? 'bg-tron-blue text-tron-darker hover:bg-tron-cyan' 
                    : 'bg-tron-red text-tron-red-darker hover:bg-tron-orange'
                }`}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="tron-border p-8 bg-tron-dark/30">
              <h3 className={`text-2xl font-semibold mb-6 ${theme === 'blue' ? 'text-tron-cyan' : 'text-tron-orange'}`}>Let&apos;s Connect</h3>
              <p className={`mb-6 leading-relaxed ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}>
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <p className={`leading-relaxed ${theme === 'blue' ? 'text-tron-blue/80' : 'text-tron-red/80'}`}>
                Whether you&apos;re looking for a developer, want to collaborate, or just want to chat about video games or
                the best snowboarding spots, feel free to reach out!
              </p>
            </div>

            <div className="tron-border p-8 bg-tron-dark/30">
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'blue' ? 'text-tron-cyan' : 'text-tron-orange'}`}>Follow Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 border bg-tron-dark/50 transition-all ${
                      theme === 'blue' 
                        ? 'border-tron-blue/30 hover:border-tron-blue hover:bg-tron-dark text-tron-blue' 
                        : 'border-tron-red/30 hover:border-tron-red hover:bg-tron-dark text-tron-red'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`mt-20 text-center border-t pt-8 ${theme === 'blue' ? 'border-tron-blue/30' : 'border-tron-red/30'}`}
      >
        <p className={theme === 'blue' ? 'text-tron-blue/60' : 'text-tron-red/60'}>
          © {new Date().getFullYear()} Portfolio. Built with Next.js, React, and Tailwind CSS.
        </p>
        <p className={`text-sm mt-2 ${theme === 'blue' ? 'text-tron-blue/40' : 'text-tron-red/40'}`}>
             May your aim stay true 🎮⭐
        </p>
      </motion.footer>
    </section>
  )
}

