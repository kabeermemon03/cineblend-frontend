import { motion } from 'framer-motion'
import { Video, Camera, Palette, Code, Layers, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const services = [
  {
    title: 'Video Editing',
    description: 'Cinematic storytelling, YouTube edits, reels, shorts, and professional commercial color grading.',
    icon: Video,
    color: 'from-blue-500 to-blue-700',
    link: '/services#video'
  },
  {
    title: 'Photo Editing',
    description: 'High-end retouching, restoration, color correction, and creative photo manipulations.',
    icon: Camera,
    color: 'from-purple-500 to-purple-700',
    link: '/services#photo'
  },
  {
    title: 'Graphic Design',
    description: 'Social media assets, banners, marketing materials, and print-ready designs.',
    icon: Palette,
    color: 'from-mocha to-mocha-dark',
    link: '/services#graphic'
  },
  {
    title: 'Logo Design',
    description: 'Minimalist logos, brand identity systems, and comprehensive business branding.',
    icon: Layers,
    color: 'from-amber-500 to-amber-700',
    link: '/services#logo'
  },
  {
    title: 'Web Development',
    description: 'Modern, high-performance websites built with React, TypeScript, and the latest technologies.',
    icon: Code,
    color: 'from-emerald-500 to-emerald-700',
    link: '/services#web'
  }
]

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Premium Digital <span className="text-mocha">Services</span>
            </h2>
            <p className="text-white/60 text-lg">
              We offer a wide range of creative and technical services designed to elevate 
              your brand and tell your story in a unique, cinematic way.
            </p>
          </div>
          <Link to="/services">
            <Button variant="outline" className="group">
              Explore All Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 glass-card border border-white/5 hover:border-mocha/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-mocha/10 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-100 opacity-0 transition-opacity" />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-mocha transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                {service.description}
              </p>

              <Link 
                to={service.link}
                className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-mocha transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
