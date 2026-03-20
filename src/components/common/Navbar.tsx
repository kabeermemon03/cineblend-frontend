import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play, User as UserIcon, LogOut, History, Settings, LayoutDashboard, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()

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
    { name: 'Solutions', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
  ]

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Request a CineBit', icon: Play, path: '/request-cinebit' },
    { name: 'My Requests', icon: History, path: '/history' },
    { name: 'Account Settings', icon: Settings, path: '/settings' },
  ]

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
      setIsOpen(false)
      setShowSidebar(false)
    } catch (error) {
      console.error('Logout Error:', error)
    }
  }

  const isActive = (path: string) => location.pathname === path

  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/cineblend-studios.appspot.com/o/assets%2Flogo.png?alt=media";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12',
          scrolled ? 'backdrop-blur-md py-3' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-mocha to-purple-dark flex items-center justify-center"
            >
              <img 
                src={logoUrl} 
                alt="CineBlend Logo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <Play className="fallback-icon hidden w-5 h-5 text-white fill-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter text-white">
              CINE<span className="text-mocha">BLEND</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'relative text-sm font-medium transition-colors py-2 group',
                    isActive(link.path) ? 'text-white' : 'text-white/50 hover:text-white'
                  )}
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                  >
                    {link.name}
                  </motion.span>
                  
                  {/* Hover/Active Indicator */}
                  {isActive(link.path) ? (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mocha rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mocha/50 rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-4 pl-4 border-l border-white/10"
            >
              {isAuthenticated ? (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="group relative flex items-center space-x-3 p-1 pr-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mocha/30 transition-all duration-500"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mocha to-purple-dark flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <UserIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-widest">
                    Account
                  </span>
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="glow" size="sm" className="px-6">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-8 space-y-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-2xl font-bold tracking-tight transition-colors flex items-center justify-between group',
                        isActive(link.path) ? 'text-mocha' : 'text-white/60 hover:text-white'
                      )}
                    >
                      {link.name}
                      <motion.div
                        animate={{ x: isActive(link.path) ? 0 : -10, opacity: isActive(link.path) ? 1 : 0 }}
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                <div className="flex flex-col space-y-4 pt-8 border-t border-white/10">
                  {!isAuthenticated && (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full py-4 text-lg border-white/10">
                          Log In
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        <Button variant="glow" className="w-full py-4 text-lg">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link to="/request-cinebit" onClick={() => setIsOpen(false)}>
                    <Button variant="glow" className="w-full py-4 text-lg bg-mocha text-background hover:bg-mocha/90 border-none">
                      Request a CineBit
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Account Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
            />
            
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-background/95 backdrop-blur-2xl border-l border-white/10 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mocha to-purple-dark flex items-center justify-center p-0.5">
                    <div className="w-full h-full rounded-[0.9rem] bg-black flex items-center justify-center overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-5 h-5 text-mocha" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{user?.displayName || 'Studio Member'}</h3>
                    <p className="text-xs font-medium text-white/30 truncate max-w-[180px]">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                <p className="px-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Workspace</p>
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setShowSidebar(false)}
                    className="flex items-center justify-between p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-mocha/30 hover:bg-mocha/5 transition-all group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-mocha transition-colors">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-white/70 group-hover:text-white transition-colors">{link.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-mocha group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              <div className="p-8 border-t border-white/5 space-y-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-3 p-5 rounded-[1.5rem] bg-red-500/5 border border-red-500/10 text-red-500/70 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Terminate Session</span>
                </button>
                <p className="text-center text-[9px] font-medium text-white/10 tracking-widest uppercase">
                  CineBlend Studios © 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar