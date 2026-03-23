import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@/components/common/Navbar.tsx'
import Footer from '@/components/common/Footer.tsx'
import FloatingCTA from '@/components/ui/FloatingCTA'
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

  // Mouse move effect for glowing background - Optimized with requestAnimationFrame
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100
        const y = (e.clientY / window.innerHeight) * 100
        document.documentElement.style.setProperty('--mouse-x', `${x}%`)
        document.documentElement.style.setProperty('--mouse-y', `${y}%`)
      });
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId);
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Scroll Progress Bar - Lowered z-index to stay below navbar if needed, or moved to avoid overlap */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-mocha via-purple-brand to-mocha origin-left z-40"
        style={{ scaleX }}
      />

      {/* Global Background Accents - Optimized for Performance */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
        <div 
          className="absolute top-0 -left-[10%] w-[50%] h-[30%] bg-mocha/5 rounded-full blur-[80px]" 
        />
        <div 
          className="absolute top-[40%] -right-[10%] w-[40%] h-[20%] bg-purple-dark/10 rounded-full blur-[70px]" 
        />
        <div 
          className="absolute bottom-0 left-[20%] w-[60%] h-[40%] bg-blue-brand/5 rounded-full blur-[100px]" 
        />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-20">
        {children}
      </main>

      <Footer />

      <FloatingCTA />

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
