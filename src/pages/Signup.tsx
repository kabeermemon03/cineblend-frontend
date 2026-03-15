import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User, Mail, Lock, ArrowRight, Play, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const Signup = () => {
  const [step, setStep] = useState(1) // 1: Info, 2: OTP
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const onSendOTP = async (data: any) => {
    setLoading(true)
    setError('')
    setEmail(data.email)
    
    // Simulate API call to /api/send-otp/
    console.log('Sending OTP to:', data.email)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const onVerifyOTP = async (data: any) => {
    setLoading(true)
    setError('')
    
    // Simulate API call to /api/register/
    console.log('Verifying OTP and Registering:', data.otp)
    setTimeout(() => {
      setLoading(false)
      // Mock successful registration response
      const mockUser = { id: 1, username: getValues('username'), email: email }
      const mockToken = 'mock-jwt-token'
      setAuth(mockUser, mockToken)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-mocha/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-dark/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border-white/5 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-mocha to-purple-dark rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    Join <span className="text-mocha">CineBlend</span>
                  </h1>
                  <p className="text-white/60">Start requesting your first CineBit today.</p>
                </div>

                <form onSubmit={handleSubmit(onSendOTP)} className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Username</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-mocha transition-colors" />
                      <input
                        {...register('username', { required: 'Username is required' })}
                        type="text"
                        placeholder="creative_mind"
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:border-mocha/50 transition-all",
                          errors.username && "border-red-500/50"
                        )}
                      />
                    </div>
                    {errors.username && <p className="text-red-500/80 text-xs ml-1">{errors.username.message as string}</p>}
                  </div>

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
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-mocha transition-colors" />
                      <input
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
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
                    {loading ? 'Sending OTP...' : 'Send Verification Code'}
                    {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-mocha/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-mocha" />
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Verify <span className="text-mocha">Email</span></h1>
                  <p className="text-white/60 text-sm px-4">We've sent a 6-digit code to <span className="text-white font-bold">{email}</span></p>
                </div>

                <form onSubmit={handleSubmit(onVerifyOTP)} className="space-y-6">
                  <div className="space-y-2 text-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Enter 6-digit Code</label>
                    <input
                      {...register('otp', { required: 'OTP is required', minLength: 6, maxLength: 6 })}
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 text-center text-3xl font-black tracking-[1em] text-mocha outline-none focus:border-mocha/50 transition-all"
                    />
                    {errors.otp && <p className="text-red-500/80 text-xs mt-2">{errors.otp.message as string}</p>}
                  </div>

                  <Button variant="glow" size="lg" disabled={loading} className="w-full py-4 rounded-2xl text-lg font-bold">
                    {loading ? 'Verifying...' : 'Verify & Create Account'}
                  </Button>

                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-xs font-bold text-white/40 hover:text-mocha transition-colors uppercase tracking-widest"
                  >
                    Change Email
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-white/40 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-mocha hover:underline font-bold transition-all">Log In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
