import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, Info, ArrowRight, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const RequestCineBit = () => {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const services = [
    { id: 'editing', name: 'Video Editing', icon: <Zap className="w-5 h-5" /> },
    { id: 'programming', name: 'Programming', icon: <Zap className="w-5 h-5" /> },
    { id: 'graphic_design', name: 'Graphic Designing', icon: <Zap className="w-5 h-5" /> },
    { id: 'logo_design', name: 'Logo Designing', icon: <Zap className="w-5 h-5" /> },
    { id: 'content_promotion', name: 'Content Promotion', icon: <Zap className="w-5 h-5" /> },
  ]

  const onSubmit = (data: any) => {
    console.log('CineBit Request:', data)
    setStep(2)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">
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
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  Request a <span className="text-mocha">CineBit</span>
                </h1>
                <p className="text-white/60 text-lg">
                  Tell us about your project. Our team will review your request and get back to you with pricing and timeline.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-8">
                {/* Service Type */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Select Service</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <label key={service.id} className="relative group cursor-pointer">
                        <input
                          type="radio"
                          value={service.id}
                          {...register('service_type', { required: 'Please select a service' })}
                          className="peer sr-only"
                        />
                        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 peer-checked:border-mocha peer-checked:bg-mocha/10 transition-all hover:bg-white/10">
                          <div className="p-2 rounded-lg bg-white/5 text-mocha group-hover:scale-110 transition-transform">
                            {service.icon}
                          </div>
                          <span className="font-bold text-sm">{service.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.service_type && <p className="text-red-500/80 text-xs ml-1">{errors.service_type.message as string}</p>}
                </div>

                {/* Project Title */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Project Title</label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    placeholder="e.g., Summer Travel Vlog Edit"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-mocha/50 transition-all"
                  />
                  {errors.title && <p className="text-red-500/80 text-xs ml-1">{errors.title.message as string}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Project Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={5}
                    placeholder="Describe your vision, requirements, and any specific details..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-mocha/50 transition-all resize-none"
                  />
                  {errors.description && <p className="text-red-500/80 text-xs ml-1">{errors.description.message as string}</p>}
                </div>

                <Button variant="glow" size="lg" className="w-full py-4 rounded-2xl text-lg font-bold bg-mocha text-background border-none hover:bg-mocha/90">
                  Submit Request
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-20"
            >
              <div className="w-24 h-24 bg-mocha/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-mocha/30">
                <CheckCircle className="w-12 h-12 text-mocha" />
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight">Request <span className="text-mocha">Received!</span></h2>
              <p className="text-white/60 text-lg max-w-md mx-auto">
                Thank you for your interest! Our team has received your CineBit request. We'll review it and contact you shortly with more details.
              </p>
              <div className="pt-8">
                <Button onClick={() => setStep(1)} variant="outline" size="lg">
                  Submit Another Request
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
