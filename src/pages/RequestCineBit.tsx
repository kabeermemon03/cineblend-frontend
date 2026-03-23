import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Send, CheckCircle, Zap, Video, Palette, Code, Upload } from 'lucide-react'
import { cinebitsService, adminService } from '@/lib/firebase-services'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'

const RequestCineBit = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // Load preferences
  useEffect(() => {
    const savedPrefs = localStorage.getItem(`prefs_${user?.uid}`);
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        if (prefs.lastService) setValue('service_type', prefs.lastService);
      } catch (e) {
        console.error('Error loading preferences:', e);
      }
    }
  }, [user, setValue]);

  const services = [
    { id: 'video_production', name: 'Video Production', icon: <Video className="w-5 h-5" /> },
    { id: 'brand_identity', name: 'Brand Identity', icon: <Palette className="w-5 h-5" /> },
    { id: 'web_engineering', name: 'Web Engineering', icon: <Code className="w-5 h-5" /> },
  ]

  const onSubmit = async (data: any) => {
    if (!user) return
    setLoading(true)
    setError(null)
    
    // Save preference
    localStorage.setItem(`prefs_${user.uid}`, JSON.stringify({
      lastService: data.service_type,
      updatedAt: new Date().toISOString()
    }));
    
    try {
      await cinebitsService.create({
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        serviceType: data.service_type,
        projectTitle: data.title,
        description: data.description,
      })

      // Trigger Email Notification
      await adminService.emailService.send('new_request', {
        clientName: user.displayName,
        clientEmail: user.email,
        serviceType: data.service_type,
        projectTitle: data.title,
        description: data.description,
      });

      setStep(2)
    } catch (err: any) {
      console.error('Error submitting request:', err)
      setError(err.message || 'Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-mocha/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-dark/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha mb-4">
                  <Zap className="w-4 h-4 fill-mocha" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Service Portal</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                  Request a <span className="text-mocha">CineBit</span>
                </h1>
                <p className="text-white/40 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                  Initialize your creative project with CineBlend Studios. Our team of experts is ready to bring your vision to life.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-10 md:p-16 rounded-[3.5rem] border-white/5 space-y-12 bg-white/[0.02] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-mocha/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Service Type */}
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Select Service Category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <label key={service.id} className="relative group cursor-pointer">
                        <input
                          type="radio"
                          value={service.id}
                          {...register('service_type', { required: 'Please select a service' })}
                          className="peer sr-only"
                        />
                        <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/10 peer-checked:border-mocha peer-checked:bg-mocha/10 transition-all hover:bg-white/10 group-hover:border-white/20">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-mocha transition-all group-hover:scale-110">
                            {service.icon}
                          </div>
                          <span className="font-bold text-sm text-white/70 group-hover:text-white peer-checked:text-white transition-colors">{service.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.service_type && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.service_type.message as string}</p>}
                </div>

                {/* Project Title */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Project Identifier</label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    placeholder="e.g., Cinematic Brand Reveal 2026"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all"
                  />
                  {errors.title && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.title.message as string}</p>}
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Project Vision & Requirements</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={6}
                    placeholder="Describe your creative goals, technical requirements, and visual style..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 px-8 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all resize-none"
                  />
                  {errors.description && <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.description.message as string}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Project Assets (Optional)</label>
                  <div className="w-full aspect-video rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center space-y-4 hover:border-mocha/30 hover:bg-mocha/5 transition-all cursor-pointer group/upload">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover/upload:text-mocha transition-all">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Drop files or click to upload</p>
                  </div>
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
                  className="w-full py-8 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl"
                >
                  {loading ? 'Submitting Request...' : 'Initialize Request'}
                  {!loading && <Send className="ml-3 w-6 h-6" />}
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
                Request <span className="text-mocha text-glow">Initialized</span>
              </h2>
              <p className="text-white/40 text-xl font-medium max-w-md mx-auto leading-relaxed">
                Your CineBit request has been successfully queued. Our production team will review your project and contact you via email within 24 hours.
              </p>
              <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button onClick={() => navigate('/history')} variant="glow" size="lg" className="px-12">
                  View My CineBits
                </Button>
                <Button onClick={() => setStep(1)} variant="ghost" size="lg" className="text-white/50 hover:text-white">
                  New Request
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestCineBit
