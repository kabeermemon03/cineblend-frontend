import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, Lock, ArrowRight, Play, Zap } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError('')
    
    // Simulate API call to /api/login/
    console.log('Login Data:', data)
    setTimeout(() => {
      setLoading(false)
      // Mock successful login response
      const mockUser = { id: 1, username: 'testuser', email: data.email }
      const mockToken = 'mock-jwt-token'
      setAuth(mockUser, mockToken)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-mocha/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-dark/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border-white/5 space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-mocha to-purple-dark rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 group transition-transform hover:rotate-6 duration-300">
              <Zap className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome <span className="text-mocha">Back</span>
            </h1>
            <p className="text-white/60">Log in to manage your CineBits.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-mocha transition-colors" />
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                  type="email"
                  placeholder="hello@cineblend.com"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:border-mocha/50 transition-all",
                    errors.email && "border-red-500/50"
                  )}
                />
              </div>
              {errors.email && <p className="text-red-500/80 text-xs ml-1">{errors.email.message as string}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
                <Link to="/forgot-password" onClick={() => {}} className="text-xs font-bold text-mocha hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-mocha transition-colors" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:border-mocha/50 transition-all",
                    errors.password && "border-red-500/50"
                  )}
                />
              </div>
              {errors.password && <p className="text-red-500/80 text-xs ml-1">{errors.password.message as string}</p>}
            </div>

            <Button variant="glow" size="lg" disabled={loading} className="w-full py-4 rounded-2xl text-lg font-bold">
              {loading ? 'Logging in...' : 'Log In'}
              {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-white/40 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-mocha hover:underline font-bold">Sign Up</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
