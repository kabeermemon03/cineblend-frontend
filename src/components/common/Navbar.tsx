import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play, User as UserIcon, LogOut, History, Settings, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Request', path: '/request-cinebit' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
    setShowProfileMenu(false)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12',
        scrolled ? 'glass-morphism py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-mocha to-purple-dark rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            CINE<span className="text-mocha">BLEND</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-mocha',
                isActive(link.path) ? 'text-mocha' : 'text-white/70'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-mocha to-purple-dark flex items-center justify-center border border-white/10 hover:scale-105 transition-transform"
              >
                <UserIcon className="w-5 h-5 text-white" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50"
                  >
                    <div className="pb-4 mb-4 border-b border-white/10">
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user?.username}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <Link to="/dashboard" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
                        <LayoutDashboard className="w-4 h-4 text-white/40 group-hover:text-mocha" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>
                      <Link to="/history" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
                        <History className="w-4 h-4 text-white/40 group-hover:text-mocha" />
                        <span className="text-sm font-medium">Request History</span>
                      </Link>
                      <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
                        <Settings className="w-4 h-4 text-white/40 group-hover:text-mocha" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-red-500/10 transition-colors group text-red-500/80">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="glow" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-lg font-medium transition-colors',
                    isActive(link.path) ? 'text-mocha' : 'text-white/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button variant="glow" className="w-full">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/request-cinebit" onClick={() => setIsOpen(false)}>
                  <Button variant="glow" className="w-full bg-mocha text-background hover:bg-mocha/90 border-none">
                    Request a CineBit
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
