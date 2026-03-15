import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@/components/common/Navbar.tsx'
import Footer from '@/components/common/Footer.tsx'
import { motion, useScroll, useSpring } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Mouse move effect for glowing background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      document.documentElement.style.setProperty('--mouse-x', `${x}%`)
      document.documentElement.style.setProperty('--mouse-y', `${y}%`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-mocha via-purple-brand to-blue-electric origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Global Background Accents */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-mocha/10 rounded-full blur-[120px] animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
        <div 
          className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-dark/20 rounded-full blur-[100px] animate-pulse" 
          style={{ animationDuration: '12s' }}
        />
        <div 
          className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-blue-brand/5 rounded-full blur-[150px] animate-pulse" 
          style={{ animationDuration: '10s' }}
        />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-20">
        {children}
      </main>

      <Footer />

      {/* Cursor Glow Effect */}
      <div 
        className="fixed inset-0 z-[100] pointer-events-none opacity-50 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(150, 105, 76, 0.08), transparent 80%)`
        }}
      />
    </div>
  )
}

export default Layout
