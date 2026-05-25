import { useState, useEffect, memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play, User as UserIcon, LogOut, History, Settings, LayoutDashboard, ChevronRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)
      });
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId);
    }
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
    ...(user?.role === 'admin' ? [{ name: 'Admin Panel', icon: ShieldCheck, path: '/admin' }] : []),
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

  const logoUrl = "/logo.png";

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
              className="relative w-12 h-12 overflow-hidden rounded-xl bg-transparent flex items-center justify-center"
            >
              <img 
                src={logoUrl} 
                alt="CineBlend Logo" 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <Play className="fallback-icon hidden w-5 h-5 text-white fill-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter text-white hidden sm:block">
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
            <>
              {/* Backdrop for Mobile Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
              />
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="flex flex-col p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
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
                          'text-3xl font-black tracking-tighter transition-all flex items-center justify-between group py-2',
                          isActive(link.path) ? 'text-mocha' : 'text-white/40 hover:text-white'
                        )}
                      >
                        <span className="relative">
                          {link.name}
                          {isActive(link.path) && (
                            <motion.div 
                              layoutId="mobile-nav-indicator"
                              className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-mocha"
                            />
                          )}
                        </span>
                        <motion.div
                          animate={{ x: isActive(link.path) ? 0 : -10, opacity: isActive(link.path) ? 1 : 0 }}
                        >
                          <Play className="w-5 h-5 fill-current" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="flex flex-col space-y-4 pt-8 border-t border-white/5">
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setShowSidebar(true);
                        }}
                        className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mocha to-purple-dark flex items-center justify-center">
                            {user?.photoURL ? (
                              <img src={user.photoURL} alt="" className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                              <UserIcon className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-black text-white uppercase tracking-tight">Account Console</p>
                            <p className="text-[10px] font-bold text-mocha uppercase tracking-widest">Manage Projects</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20" />
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full py-5 text-sm border-white/10 rounded-2xl">
                            Log In
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <Button variant="glow" className="w-full py-5 text-sm rounded-2xl">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    )}
                    <Link to="/request-cinebit" onClick={() => setIsOpen(false)}>
                      <Button variant="glow" className="w-full py-6 text-base bg-mocha text-white hover:bg-mocha/90 border-none rounded-[2rem] shadow-xl shadow-mocha/20">
                        Request a CineBit
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
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
              transition={{ type: 'spring', damping: 28, stiffness: 220, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-background/80 backdrop-blur-3xl border-l border-white/10 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-mocha/40 to-purple-dark/40 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-[1.3rem] bg-black/50 backdrop-blur-md flex items-center justify-center overflow-hidden border border-white/10">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-6 h-6 text-mocha/70" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tighter">{user?.displayName || 'Studio Member'}</h3>
                    <p className="text-[10px] font-bold text-mocha uppercase tracking-widest opacity-60">Creative Partner</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-3 custom-scrollbar">
                <div className="px-4 mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Studio Workspace</p>
                </div>
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setShowSidebar(false)}
                    className="flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-mocha/40 hover:bg-mocha/10 transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-mocha/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center space-x-5 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-mocha group-hover:scale-110 group-hover:bg-mocha/10 transition-all duration-500">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white/70 group-hover:text-white transition-colors tracking-tight">{link.name}</span>
                        <span className="text-[9px] font-medium text-white/20 group-hover:text-white/40 uppercase tracking-widest transition-colors">Access Console</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-mocha group-hover:translate-x-1 transition-all duration-500" />
                  </Link>
                ))}
              </div>

              <div className="p-8 border-t border-white/5 space-y-6 bg-white/[0.01]">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-3 p-5 rounded-[2rem] bg-red-500/5 border border-red-500/10 text-red-500/60 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all duration-500 group"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Terminate Session</span>
                </button>
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-[9px] font-black text-white/10 tracking-[0.4em] uppercase">
                    CineBlend Studios © 2026
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 rounded-full bg-mocha/20" />
                    <div className="w-1 h-1 rounded-full bg-mocha/40" />
                    <div className="w-1 h-1 rounded-full bg-mocha/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
})

export default Navbar