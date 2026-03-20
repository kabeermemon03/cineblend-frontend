import { motion } from 'framer-motion'
import { Play, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const Showreel = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mocha/5 blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-dark/5 blur-[150px] animate-pulse" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          {/* Text Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha"
              >
                <Star className="w-4 h-4 fill-mocha" />
                <span className="text-[10px] font-black uppercase tracking-widest">Featured Work</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]"
              >
                Cinematic <br />
                <span className="text-mocha">Showreel</span> 2026
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-white/40 text-xl font-medium max-w-xl leading-relaxed"
              >
                Experience the peak of visual storytelling. Our 2026 showreel highlights our best 
                work in video production, motion design, and digital experiences.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <Link to="/portfolio">
                <Button variant="glow" size="lg" className="px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl group">
                  View Portfolio
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/request-cinebit">
                <Button variant="outline" size="lg" className="px-12 py-6 rounded-2xl border-white/10 text-white/40 hover:text-white transition-all">
                  Start Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative group aspect-video rounded-[4rem] overflow-hidden glass-card border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl"
          >
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
            
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full bg-mocha/20 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white group-hover:bg-mocha/40 transition-all duration-700"
              >
                <Play className="w-8 h-8 fill-white" />
              </motion.div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white/40">
                  <Play className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Watch Reel</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Duration: 1:45</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Showreel