import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Send, CheckCircle, Briefcase, User, Mail, Link as LinkIcon, FileText } from 'lucide-react'
import { careersService } from '@/lib/firebase-services'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

const Careers = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      await careersService.submit(data)
      setStep(2)
    } catch (err: any) {
      console.error('Error submitting application:', err)
      setError(err.message || 'Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-mocha/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-purple-dark/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <div className="text-center space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-dark/10 border border-purple-light/20 text-purple-light">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Join the Collective</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                  Shape the <span className="text-mocha">Future</span>
                </h1>
                <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  We are always looking for visionary creators, elite developers, and cinematic artists to join our world-class studio.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-10 md:p-16 rounded-[4rem] border-white/5 space-y-10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-mocha/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                    <div className="relative group/input">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within/input:text-mocha transition-colors" />
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.fullName.message as string}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Email Address</label>
                    <div className="relative group/input">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within/input:text-mocha transition-colors" />
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                        })}
                        type="email"
                        placeholder="hello@creator.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    {errors.email && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.email.message as string}</p>}
                  </div>

                  {/* Role */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Target Role</label>
                    <div className="relative group/input">
                      <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within/input:text-mocha transition-colors" />
                      <select
                        {...register('role', { required: 'Please select a role' })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-black">Select Role</option>
                        <option value="intern" className="bg-black">Join as Intern</option>
                        <option value="video_editor" className="bg-black">Video Editor</option>
                        <option value="vfx_artist" className="bg-black">VFX Artist</option>
                        <option value="web_developer" className="bg-black">Web Developer</option>
                        <option value="ui_ux_designer" className="bg-black">UI/UX Designer</option>
                        <option value="graphic_designer" className="bg-black">Graphic Designer</option>
                        <option value="freelance" className="bg-black">Freelance Partner</option>
                      </select>
                    </div>
                    {errors.role && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.role.message as string}</p>}
                  </div>

                  {/* Portfolio Link */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Portfolio / Reel Link</label>
                    <div className="relative group/input">
                      <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within/input:text-mocha transition-colors" />
                      <input
                        {...register('portfolio', { required: 'Portfolio link is required' })}
                        type="url"
                        placeholder="https://behance.net/you"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    {errors.portfolio && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.portfolio.message as string}</p>}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Experience & Vision</label>
                  <div className="relative group/input">
                    <FileText className="absolute left-6 top-6 w-5 h-5 text-white/10 group-focus-within/input:text-mocha transition-colors" />
                    <textarea
                      {...register('experience', { required: 'Please describe your experience' })}
                      rows={6}
                      placeholder="Tell us about your creative journey, your philosophy, and why you want to work with CineBlend Studios..."
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-14 pr-8 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all resize-none"
                    />
                  </div>
                  {errors.experience && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.experience.message as string}</p>}
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit"
                  variant="glow" 
                  size="lg" 
                  disabled={loading}
                  className="w-full py-8 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl group"
                >
                  {loading ? 'Submitting Application...' : 'Initialize Application'}
                  {!loading && <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-32"
            >
              <div className="w-32 h-32 bg-mocha/10 rounded-full flex items-center justify-center mx-auto mb-12 border border-mocha/20 shadow-[0_0_50px_rgba(150,105,76,0.2)]">
                <CheckCircle className="w-16 h-16 text-mocha" />
              </div>
              <h2 className="text-6xl font-black tracking-tighter text-white">
                Application <span className="text-mocha text-glow">Received</span>
              </h2>
              <p className="text-white/40 text-xl font-medium max-w-md mx-auto leading-relaxed">
                Your credentials have been successfully transmitted. Our talent acquisition team will review your portfolio and contact you if your vision aligns with ours.
              </p>
              <div className="pt-12">
                <Link to="/">
                  <Button variant="outline" size="lg" className="px-12 border-white/10 text-white/40 hover:text-white">
                    Return to Studio
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Careers