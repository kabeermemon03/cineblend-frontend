import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import LogoLoop from '@/components/ui/LogoLoop'

const Hero = () => {
  return (
    <>
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Overlay with Optimized Blurs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-10" />
          <img 
            src="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80" 
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-15 scale-100 animate-slow-zoom"
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md">
              <Zap className="w-4 h-4 text-mocha fill-mocha" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Digital Studio & Creative Agency
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white">
              Cinematic <span className="text-mocha">Creativity</span> <br /> 
              Meets <span className="text-gradient">Technology</span>
            </h1>

            {/* Tagline */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 leading-relaxed font-medium">
              Crafting stunning visuals, powerful brands, and modern digital experiences 
              that captivate audiences and drive results for the world's best creators.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
              <Link to="/request-cinebit">
                <Button variant="glow" size="lg" className="w-full sm:w-auto px-10 group">
                  Request a CineBit
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 border-white/10 text-white/40 hover:text-white">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements - Reduced blur/opacity */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-mocha/10 rounded-full blur-[80px] pointer-events-none opacity-30" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-dark/20 rounded-full blur-[100px] pointer-events-none opacity-30" />
      </section>

      {/* Tech Stack Loop - Enhanced and Consolidated */}
      <LogoLoop 
        speed={35} 
        title="Our Elite Tech Stack" 
        subtitle="We leverage the world's most powerful technologies to craft high-performance digital solutions and cinematic content."
        showTitle={true} 
        className="bg-black" 
      />
    </>
  )
}

export default Hero
