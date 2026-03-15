import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, Camera, Palette, Code, Layers, ArrowRight, Play, CheckCircle2, Star, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

const servicesData = [
  {
    id: 'video',
    title: 'Video Editing',
    icon: Video,
    color: 'from-blue-500 to-blue-700',
    description: 'Cinematic storytelling, YouTube edits, reels, shorts, and professional commercial color grading.',
    features: ['YouTube & Social Media Editing', 'Cinematic Color Grading', 'Reels, Shorts & TikTok Edits', 'Commercial & Ad Video Production', 'Sound Design & Mixing'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80'
  },
  {
    id: 'photo',
    title: 'Photo Editing',
    icon: Camera,
    color: 'from-purple-500 to-purple-700',
    description: 'High-end retouching, restoration, color correction, and creative photo manipulations.',
    features: ['Professional Retouching', 'Advanced Color Correction', 'Photo Restoration', 'Product Photography Editing', 'Creative Compositing'],
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80'
  },
  {
    id: 'graphic',
    title: 'Graphic Design',
    icon: Palette,
    color: 'from-mocha to-mocha-dark',
    description: 'Social media assets, banners, marketing materials, and print-ready designs.',
    features: ['Social Media Graphics', 'Marketing Banners & Ads', 'Business Stationery', 'Presentation Design', 'Custom Illustrations'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80'
  },
  {
    id: 'logo',
    title: 'Logo Design',
    icon: Layers,
    color: 'from-amber-500 to-amber-700',
    description: 'Minimalist logos, brand identity systems, and comprehensive business branding.',
    features: ['Minimal & Modern Logos', 'Full Brand Identity Kits', 'Typography & Color Systems', 'Brand Style Guides', 'Logo Motion Design'],
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80'
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: Code,
    color: 'from-emerald-500 to-emerald-700',
    description: 'Modern, high-performance websites built with React, TypeScript, and the latest technologies.',
    features: ['Custom React & TypeScript Apps', 'Responsive Modern Design', 'Performance Optimization', 'SEO-friendly Architecture', 'Interactive Animations'],
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
      className="space-y-32 py-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Our Expertise
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Crafting <span className="text-mocha">Excellence</span> Across Every Digital Dimension
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          From cinematic video production to high-performance web applications, 
          we combine artistic vision with technical precision to help you 
          achieve your most ambitious creative goals.
        </p>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 md:px-12 space-y-40">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}
          >
            <div className="lg:w-1/2 space-y-8">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {service.title}
              </h2>
              <p className="text-xl text-white/60 leading-relaxed">
                {service.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3 text-white/80 group">
                    <CheckCircle2 className="w-5 h-5 text-mocha flex-shrink-0" />
                    <span className="group-hover:text-mocha transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/contact">
                  <Button variant="glow" size="lg" className="w-full sm:w-auto">
                    Start {service.title} Project
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                    View Portfolio
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative group">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden glass-card border-white/5 relative z-10 shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Overlay Play Button for Video Service */}
                {service.id === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 rounded-full bg-mocha/80 backdrop-blur-md flex items-center justify-center text-white"
                    >
                      <Play className="w-8 h-8 fill-white" />
                    </motion.button>
                  </div>
                )}
              </div>
              
              {/* Decorative Background Elements */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${service.color} opacity-20 rounded-full blur-[80px] -z-0 group-hover:opacity-30 transition-opacity duration-700`} />
              <div className={`absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-[100px] -z-0 group-hover:opacity-20 transition-opacity duration-700`} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Trust & CTA Section */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-mocha-dark/40 via-purple-dark/40 to-background border border-white/10 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-mocha/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-brand/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to create something <span className="text-gradient">legendary?</span>
            </h2>
            <p className="text-lg text-white/60">
              Join hundreds of successful creators and brands who have transformed 
              their digital presence with CineBlend Studios.
            </p>
            <Link to="/contact">
              <Button variant="glow" size="lg" className="px-12">
                Get Your Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Services
