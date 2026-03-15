import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Video/Image Placeholder with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 scale-105 animate-float"
          style={{ animationDuration: '20s' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md">
            <Zap className="w-4 h-4 text-mocha fill-mocha" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Digital Studio & Creative Agency
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter">
            Cinematic <span className="text-mocha">Creativity</span> <br /> 
            Meets <span className="text-gradient">Technology</span>
          </h1>

          {/* Tagline */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed">
            Crafting stunning visuals, powerful brands, and modern digital experiences 
            that captivate audiences and drive results for the world's best creators.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <Link to="/portfolio">
              <Button variant="glow" size="lg" className="w-full sm:w-auto group">
                View Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
            </Link>
          </div>

          {/* Floating Play Button */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pt-12"
          >
            <button className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors group">
              <Play className="w-6 h-6 text-white fill-white group-hover:scale-110 transition-transform" />
            </button>
            <p className="text-xs font-medium uppercase tracking-widest text-white/40 mt-4">
              Watch Showreel
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-mocha/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-dark/30 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}

export default Hero
