import { motion } from 'framer-motion'
import { Play, Camera, Palette, Box, TrendingUp } from 'lucide-react'

const portfolioItems = [
  {
    title: 'Neon Nights Cinematic',
    category: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80',
    icon: <Play className="w-5 h-5" />,
    description: 'High-energy cinematic edit with color grading and sound design.'
  },
  {
    title: 'Modern Minimal Branding',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
    icon: <Palette className="w-5 h-5" />,
    description: 'Clean and modern brand identity for a tech startup.'
  },
  {
    title: 'Full Stack Applications',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    icon: <Box className="w-5 h-5" />,
    description: 'Full-stack mobile application with real-time tracking.'
  },
  {
    title: 'Creative Agency Logo',
    category: 'Logo Design',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80',
    icon: <Camera className="w-5 h-5" />,
    description: 'Memorable logo design that captures brand essence.'
  },
  {
    title: 'Social Media Growth',
    category: 'Content Promotion',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Strategic content campaign that drove 200% engagement.'
  }
]

const PortfolioSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-mocha mb-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Our Portfolio</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Featured <span className="text-gradient">Masterpieces</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore our latest work across all creative services. Each project is a 
            blend of artistic vision and technical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-[450px] rounded-3xl overflow-hidden glass-card border-white/5"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-mocha/20 text-mocha border border-mocha/30 backdrop-blur-md">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-mocha transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-mocha/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Glows - Reduced blur/opacity for performance */}
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-mocha/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-80 h-80 bg-purple-dark/5 rounded-full blur-[80px] pointer-events-none" />
    </section>
  )
}

export default PortfolioSection
