import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Zap, Instagram, Twitter, Linkedin } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type FormData = {
  name: string
  email: string
  service: string
  message: string
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    // Hide success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  const services = [
    'Video Editing',
    'Photo Editing',
    'Graphic Design',
    'Logo Design',
    'Web Development',
    'Full Branding Package',
    'Other'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-32 py-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Contact Us
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Let's Create <span className="text-mocha">Something</span> <span className="text-gradient">Iconic</span>
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          Have a general inquiry or want to discuss a partnership? We're here to help. 
          For new project requests, please use our <Link to="/request-cinebit" className="text-mocha hover:underline font-bold">CineBit Portal</Link> for faster processing.
        </p>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Column */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Get in touch</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Whether you have a specific project in mind or just want to 
                say hello, we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'hello@cineblendstudios.com', href: 'mailto:hello@cineblendstudios.com' },
                { icon: Phone, label: 'Phone', value: '+92 337 2585944', href: 'https://wa.me/923372585944' },
                { icon: MapPin, label: 'Studio', value: 'Karachi, Pakistan', href: '#' }
              ].map((info) => (
                <a 
                  key={info.label} 
                  href={info.href}
                  className="group flex items-center space-x-6 p-6 rounded-3xl glass-card border-white/5 hover:border-mocha/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-mocha group-hover:bg-mocha/10 transition-colors">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">{info.label}</h4>
                    <p className="text-lg font-medium text-white group-hover:text-mocha transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Follow our journey</h4>
              <div className="flex space-x-4">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-mocha hover:border-mocha hover:bg-mocha/5 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="relative">
            <div className="p-8 md:p-12 rounded-[2.5rem] glass-card border-white/5 relative z-10">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center space-y-6 py-20"
                  >
                    <div className="w-20 h-20 bg-mocha/10 rounded-full flex items-center justify-center mx-auto text-mocha">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                      <p className="text-white/60">
                        Thank you for reaching out. We'll get back to you 
                        within 24-48 hours to discuss your project.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSuccess(false)}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Your Name"
                          className={cn(
                            "w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-mocha/50 transition-colors",
                            errors.name && "border-red-500/50"
                          )}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-400 mt-1 flex items-center ml-4">
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                        <input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                          })}
                          placeholder="your@email.com"
                          className={cn(
                            "w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-mocha/50 transition-colors",
                            errors.email && "border-red-500/50"
                          )}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-400 mt-1 flex items-center ml-4">
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Requested Service</label>
                      <select
                        {...register('service', { required: 'Please select a service' })}
                        className={cn(
                          "w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-mocha/50 transition-colors appearance-none",
                          errors.service && "border-red-500/50"
                        )}
                      >
                        <option value="" className="bg-background">Select a service...</option>
                        {services.map(s => (
                          <option key={s} value={s} className="bg-background">{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-xs text-red-400 mt-1 flex items-center ml-4">
                          <AlertCircle className="w-3 h-3 mr-1" /> {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Project Details</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        placeholder="Tell us about your vision..."
                        rows={6}
                        className={cn(
                          "w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-mocha/50 transition-colors resize-none",
                          errors.message && "border-red-500/50"
                        )}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-400 mt-1 flex items-center ml-4">
                          <AlertCircle className="w-3 h-3 mr-1" /> {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      variant="glow" 
                      size="lg" 
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-mocha/20 rounded-full blur-[80px] -z-0" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-dark/30 rounded-full blur-[100px] -z-0" />
          </div>
        </div>
      </section>

      {/* Map/Studio Section Placeholder */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden glass-card border-white/5 grayscale opacity-50 relative group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516216628859-9bccecad13fc?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-12 h-12 text-mocha mx-auto" />
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Visit our studio</h3>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
