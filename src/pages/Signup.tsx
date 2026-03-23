import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff, Chrome, Github, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth-service';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Real-time validation
  const isEmailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = confirmPassword.length > 0 && password === confirmPassword;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: authError } = await authService.signup(email, password);

    if (authError) {
      const msg = authService.getErrorMessage(authError);
      setError(msg);
      toast.error(msg);
      setLoading(false);
    } else {
      setSuccess(true);
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    setSocialLoading(provider);
    setError(null);

    let result;
    if (provider === 'google') result = await authService.loginWithGoogle();
    else if (provider === 'github') result = await authService.loginWithGithub();
    else result = await authService.loginWithFacebook();

    if (result.error) {
      const msg = authService.getErrorMessage(result.error);
      setError(msg);
      toast.error(msg);
      setSocialLoading(null);
    } else {
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex bg-black relative overflow-hidden font-sans selection:bg-mocha/30 selection:text-white">
      {/* Film Grain/Noise Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]" />
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-mocha/5 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-dark/5 blur-[150px] rounded-full" 
        />
      </div>

      {/* Branding Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-center px-24 z-10 overflow-hidden border-r border-white/5 bg-[#050505] order-2">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12 relative"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-mocha" />
              <span className="text-mocha font-black uppercase tracking-[0.5em] text-[10px]">CineBlend Studios</span>
            </motion.div>
            
            <h2 className="text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter italic">
              CREATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mocha via-mocha-light to-white/20">WITHOUT</span> <br />
              LIMITS.
            </h2>
          </div>

          <p className="text-white/30 text-xl max-w-sm font-medium leading-relaxed tracking-tight italic">
            "The blend of art and technology is where the future is written."
          </p>
          
          <div className="flex flex-col gap-6 pt-10">
            {[
              { label: 'Studio', value: 'Blend-01' },
              { label: 'Status', value: 'Ready' }
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="text-white/10 font-black uppercase tracking-widest text-[10px] w-16">{stat.label}</span>
                <span className="text-xl font-black text-white/40 tracking-tighter uppercase italic">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scanline Effect Overlay for Branding Panel */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-[11]" />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-16 z-10 order-1 bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg"
        >
          <div className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
            {/* Soft Border Glow */}
            <div className="absolute inset-0 border border-mocha/10 rounded-[3rem] pointer-events-none group-hover:border-mocha/20 transition-colors duration-700" />

            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-black text-white tracking-tighter mb-3">Join CineBlend</h1>
                <p className="text-white/40 font-medium">Create your studio account</p>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-20 h-20 bg-mocha/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-mocha" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Account Created!</h2>
                    <p className="text-white/40 font-medium">Mixing your creative space...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: 'auto', scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest overflow-hidden"
                        >
                          <AlertCircle size={14} />
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-5">
                      {/* Email Field */}
                      <div className="space-y-2 group">
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-mocha text-white/10 z-10">
                            <Mail size={18} />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className={`peer w-full bg-white/5 border rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-transparent outline-none transition-all duration-300 ${
                              email && !isEmailValid ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/5' : 'border-white/10 focus:border-mocha/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-mocha/5'
                            }`}
                            required
                          />
                          <label className={`absolute left-14 top-1/2 -translate-y-1/2 text-sm font-medium transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest bg-transparent px-1 ${
                            email && !isEmailValid ? 'text-red-500' : 'text-white/20 peer-focus:text-mocha peer-[:not(:placeholder-shown)]:text-mocha'
                          }`}>
                            Email Address
                          </label>
                          <AnimatePresence>
                            {email && !isEmailValid && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-red-500 font-black uppercase tracking-widest pointer-events-none"
                              >
                                Invalid
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2 group">
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-mocha text-white/10 z-10">
                            <Lock size={18} />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={`peer w-full bg-white/5 border rounded-2xl py-4 pl-14 pr-14 text-white placeholder:text-transparent outline-none transition-all duration-300 ${
                              password && !isPasswordValid ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/5' : 'border-white/10 focus:border-mocha/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-mocha/5'
                            }`}
                            required
                          />
                          <label className={`absolute left-14 top-1/2 -translate-y-1/2 text-sm font-medium transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest bg-transparent px-1 ${
                            password && !isPasswordValid ? 'text-red-500' : 'text-white/20 peer-focus:text-mocha peer-[:not(:placeholder-shown)]:text-mocha'
                          }`}>
                            Password
                          </label>
                          <AnimatePresence>
                            {password && !isPasswordValid && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute right-14 top-1/2 -translate-y-1/2 text-[10px] text-red-500 font-black uppercase tracking-widest pointer-events-none"
                              >
                                Too Short
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors z-10"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2 group">
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-mocha text-white/10 z-10">
                            <Lock size={18} />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className={`peer w-full bg-white/5 border rounded-2xl py-4 pl-14 pr-14 text-white placeholder:text-transparent outline-none transition-all duration-300 ${
                              confirmPassword && !isConfirmValid ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/5' : 'border-white/10 focus:border-mocha/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-mocha/5'
                            }`}
                            required
                          />
                          <label className={`absolute left-14 top-1/2 -translate-y-1/2 text-sm font-medium transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest bg-transparent px-1 ${
                            confirmPassword && !isConfirmValid ? 'text-red-500' : 'text-white/20 peer-focus:text-mocha peer-[:not(:placeholder-shown)]:text-mocha'
                          }`}>
                            Confirm Password
                          </label>
                          <AnimatePresence>
                            {confirmPassword && !isConfirmValid && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute right-14 top-1/2 -translate-y-1/2 text-[10px] text-red-500 font-black uppercase tracking-widest pointer-events-none"
                              >
                                Mismatch
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="glow" 
                      size="lg" 
                      className="w-full rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.3em] group relative overflow-hidden"
                      disabled={loading || !!socialLoading}
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.div 
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center"
                          >
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          </motion.div>
                        ) : (
                          <motion.span 
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </form>

                  <div className="mt-8 space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5"></div>
                      </div>
                      <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                        <span className="bg-[#0a0a0a] px-4 text-white/20">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => handleSocialLogin('google')}
                        disabled={loading || !!socialLoading}
                        className="flex items-center justify-center py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50"
                      >
                        {socialLoading === 'google' ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Chrome size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        )}
                      </button>
                      <button
                        onClick={() => handleSocialLogin('github')}
                        disabled={loading || !!socialLoading}
                        className="flex items-center justify-center py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50"
                      >
                        {socialLoading === 'github' ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Github size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        )}
                      </button>
                      <button
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={loading || !!socialLoading}
                        className="flex items-center justify-center py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50"
                      >
                        {socialLoading === 'facebook' ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Facebook size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        )}
                      </button>
                    </div>

                    <p className="text-center text-white/30 text-xs font-medium">
                      Already have an account?{' '}
                      <Link to="/login" className="text-mocha hover:text-mocha-light transition-colors font-black uppercase tracking-widest text-[10px]">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;