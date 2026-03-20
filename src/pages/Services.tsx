import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, Palette, Code, Star, Zap, Play } from 'lucide-react'
import Button from '@/components/ui/Button'

const servicesData = [
  {
    id: 'video',
    title: 'Video Production',
    icon: Video,
    color: 'from-blue-500 to-blue-700',
    description: 'Cinematic storytelling and professional video editing for all platforms.',
    features: ['YouTube & Long-form Editing', 'Cinematic Reels & Shorts', 'Commercial & Ad Production', 'Professional Color Grading', 'Advanced Sound Design', 'VFX & Motion Graphics'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80'
  },
  {
    id: 'graphic',
    title: 'Brand Identity',
    icon: Palette,
    color: 'from-mocha to-mocha-dark',
    description: 'Comprehensive design solutions to establish and elevate your visual presence.',
    features: ['Minimalist Logo Design', 'Full Brand Identity Kits', 'Social Media Branding', 'Marketing Assets', 'Business Stationery', 'Presentation Design'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80'
  },
  {
    id: 'web',
    title: 'Web Engineering',
    icon: Code,
    color: 'from-emerald-500 to-emerald-700',
    description: 'High-performance, modern web applications built for the next generation.',
    features: ['Custom Portfolio Sites', 'UI/UX Prototyping', 'Full-stack SaaS Platforms', 'Performance Optimization', 'Interactive React Apps', 'SEO & Digital Strategy'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'
  }
]

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-32 py-20 relative min-h-screen bg-black"
    >
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mocha/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-dark/5 blur-[150px] animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-12 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-xl"
          >
            <Zap className="w-4 h-4 fill-mocha" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              The CineBlend Standard
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white"
          >
            Mastering the <br />
            <span className="text-mocha">Digital</span> <span className="text-gradient">Arts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/40 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            We don't just provide services; we craft legacies. From cinematic video 
            to high-performance engineering, our studio is where vision meets reality.
          </motion.p>
        </section>

        {/* Services List */}
        <section className="container mx-auto px-6 md:px-12 space-y-60 pb-40">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 lg:gap-32`}
            >
              <div className="lg:w-1/2 space-y-12">
                <div className="space-y-6">
                  <span className="text-6xl font-black text-white/5 tracking-tighter">0{index + 1}</span>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                    {service.title}
                  </h2>
                  <p className="text-xl text-white/40 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-4 text-white/60 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-mocha group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                  <Link to="/contact">
                    <Button variant="glow" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg font-black uppercase tracking-widest">
                      Initialize Project
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative group">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass-card border-white/5 relative z-10 shadow-2xl transition-all duration-1000 group-hover:border-mocha/20">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {service.id === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-24 h-24 rounded-full bg-mocha/20 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white group-hover:bg-mocha/40 transition-colors"
                      >
                        <Play className="w-8 h-8 fill-white" />
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {/* Decorative Accents */}
                <div className={`absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-[100px] -z-0 group-hover:opacity-20 transition-opacity duration-1000`} />
              </div>
            </motion.div>
          ))}
        </section>

        {/* Enhanced FAQ Section - Essential for Service Sites */}
        <section className="container mx-auto px-6 md:px-12 py-40 border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Common <span className="text-mocha">Inquiries</span></h2>
              <p className="text-white/30 text-xl font-medium">Everything you need to know about partnering with CineBlend.</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What is the typical project timeline?", a: "Timelines vary by scope, but most cinematic edits take 5-10 business days, while full web builds range from 3-6 weeks." },
                { q: "Do you offer priority delivery?", a: "Yes, our 'Express CineBit' service guarantees a 48-hour turnaround for select video and design projects." },
                { q: "Can I request revisions?", a: "Absolutely. Every project includes 2-3 rounds of revisions to ensure the final result perfectly matches your vision." },
                { q: "What files will I receive?", a: "You'll receive all final assets in high-resolution industry formats (4K Video, Vector Logos, Source Code) along with full usage rights." }
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-mocha/20 transition-all duration-500 group"
                >
                  <h4 className="text-xl font-black text-white group-hover:text-mocha transition-colors mb-4 flex items-center gap-4">
                    <span className="text-mocha/30">0{i+1}</span>
                    {faq.q}
                  </h4>
                  <p className="text-white/40 leading-relaxed font-medium pl-10">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & CTA Section */}
        <section className="container mx-auto px-6 md:px-12 pb-40">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-16 md:p-32 rounded-[4rem] bg-gradient-to-br from-mocha-dark/5 via-purple-dark/5 to-transparent border border-white/5 relative overflow-hidden text-center backdrop-blur-3xl shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-mocha/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-3xl mx-auto space-y-12 relative z-10">
              <div className="inline-flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-mocha fill-mocha" />
                ))}
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                Ready to create <br />
                <span className="text-gradient">Legendary</span> results?
              </h2>
              <p className="text-xl text-white/40 font-medium">
                Join the visionary creators who have redefined their digital presence with us.
              </p>
              <div className="pt-8">
                <Link to="/contact">
                  <Button variant="glow" size="lg" className="px-16 py-8 text-xl font-black uppercase tracking-widest shadow-2xl">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  )
}

export default Services
