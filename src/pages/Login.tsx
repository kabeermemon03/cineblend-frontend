import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Chrome, Github, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { authService } from '@/lib/auth-service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: authError } = await authService.login(email, password);

    if (authError) {
      const msg = authService.getErrorMessage(authError);
      setError(msg);
      toast.error(msg);
      setLoading(false);
    } else {
      toast.success('Welcome back to CineBlend!');
      navigate('/dashboard');
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
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-20 relative overflow-hidden">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-mocha/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-dark/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          {/* Subtle Border Glow */}
          <div className="absolute inset-0 border border-mocha/20 rounded-[2.5rem] pointer-events-none group-hover:border-mocha/40 transition-colors duration-500" />
          
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-black text-white tracking-tighter mb-3">Welcome Back</h1>
              <p className="text-white/40 font-medium">Log in to your CineBlend account</p>
            </motion.div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest overflow-hidden"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-mocha text-white/10">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-mocha/5 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-mocha text-white/10">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-mocha/5 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="glow" 
              size="lg" 
              className="w-full rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.3em] group"
              disabled={loading || !!socialLoading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-[#0a0a0a] px-4 text-white/20">Or continue with</span>
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-mocha hover:text-mocha-light transition-colors font-black uppercase tracking-widest text-[10px]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;