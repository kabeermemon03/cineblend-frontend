import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'

const projects = [
  {
    title: 'Neon Nights Cinematic',
    category: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80',
    link: '/portfolio#1'
  },
  {
    title: 'Modern Minimal Branding',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
    link: '/portfolio#2'
  },
  {
    title: 'Urban Explorer App',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    link: '/portfolio#3'
  },
  {
    title: 'Creative Agency Logo',
    category: 'Logo Design',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80',
    link: '/portfolio#4'
  }
]

const PortfolioPreview = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our <span className="text-gradient">Masterpieces</span>
            </h2>
            <p className="text-white/60 text-lg">
              A curated selection of our most impactful creative work across video, 
              design, and modern web technology.
            </p>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" className="group">
              View All Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden glass-card border-white/5"
            >
              {/* Project Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-mocha/20 text-mocha border border-mocha/30 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-mocha transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <Link to={project.link}>
                      <Button variant="glow" size="sm" className="px-6">
                        Explore Project
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    {project.category === 'Video Editing' && (
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-mocha/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioPreview
