import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ArrowRight, Zap, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const categories = ['All', 'Video Editing', 'Graphic Design', 'Web Development', 'Logo Design']

const portfolioItems = [
  {
    id: 1,
    title: 'Neon Nights Cinematic',
    category: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80',
    description: 'A high-energy cinematic montage showcasing urban nightlife with advanced color grading and sound design.',
    tools: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    client: 'Urban Explorers'
  },
  {
    id: 2,
    title: 'Modern Minimal Branding',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
    description: 'Complete visual identity system for a tech startup, focusing on minimalist aesthetics and powerful typography.',
    tools: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    client: 'CloudNine Tech'
  },
  {
    id: 3,
    title: 'Full Stack Applications',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    description: 'A fully responsive, modern progressive web application built with React and Framer Motion for smooth interactions.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    client: 'Venture Labs'
  },
  {
    id: 4,
    title: 'Creative Agency Logo',
    category: 'Logo Design',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80',
    description: 'A unique, versatile logo design that combines geometric precision with artistic flair.',
    tools: ['Adobe Illustrator'],
    client: 'Studio X'
  },
  {
    id: 5,
    title: 'Mountain Peaks Documentary',
    category: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
    description: 'Breath-taking cinematic documentary edit focusing on the majesty of mountain landscapes.',
    tools: ['Adobe Premiere Pro', 'After Effects'],
    client: 'Nature Channel'
  },
  {
    id: 6,
    title: 'Social Media Kit',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    description: 'Cohesive set of social media assets designed to boost engagement and brand awareness.',
    tools: ['Photoshop', 'Canva Pro', 'Illustrator'],
    client: 'Influence Media'
  }
]

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null)

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-20 py-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Portfolio
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Showcasing Our <span className="text-gradient">Masterpieces</span>
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          Explore our curated selection of creative work, where every project 
          is a testament to our commitment to cinematic quality and technical innovation.
        </p>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="hidden sm:flex items-center mr-4 text-white/40">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold uppercase tracking-widest">Filter by:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-widest transition-all duration-300",
                activeCategory === category 
                  ? "bg-mocha border-mocha text-white shadow-lg shadow-mocha/20" 
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden glass-card border-white/5 cursor-pointer"
                onClick={() => setSelectedProject(item)}
              >
                {/* Project Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 rounded-full bg-mocha/20 text-mocha border border-mocha/30 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-mocha transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-sm text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      View Project Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-mocha/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-background/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-card border-white/10 rounded-[2.5rem] p-8 md:p-12 custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-mocha hover:border-mocha transition-all duration-300 z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="aspect-video rounded-3xl overflow-hidden border border-white/10">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                      <img src={selectedProject.image} className="w-full h-full object-cover opacity-50 grayscale" />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                      <img src={selectedProject.image} className="w-full h-full object-cover opacity-50 grayscale" />
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-mocha/10 text-mocha border border-mocha/20 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">The Project</h4>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Client</h4>
                      <p className="text-white font-bold">{selectedProject.client}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Year</h4>
                      <p className="text-white font-bold">2024</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Tools Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tools.map((tool) => (
                        <span key={tool} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/80">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button variant="glow" size="lg" className="w-full sm:w-auto">
                      View Full Project
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Portfolio
