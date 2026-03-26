import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ArrowRight, Zap, Filter, Loader2, Briefcase } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { adminService } from '@/lib/firebase-services'

const categories = ['All', 'Web Development', 'Video Editing', 'Graphics', 'Other']

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tools?: string[];
  tech?: string; // Some might use tech instead of tools
  client?: string;
  link?: string;
  createdAt?: any;
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = adminService.getAllProjects((data) => {
      try {
        setProjects(data as PortfolioItem[])
        setIsLoading(false)
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const filteredItems = activeCategory === 'All' 
    ? projects 
    : projects.filter(item => item.category === activeCategory)

  // Extract tools/tech array safely
  const getTools = (item: PortfolioItem) => {
    if (item.tools && Array.isArray(item.tools)) return item.tools;
    if (item.tech) return item.tech.split(',').map(t => t.trim());
    return [];
  }

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
      <section className="container mx-auto px-6 md:px-12 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-mocha animate-spin" />
            <p className="text-white/40 font-bold uppercase tracking-widest animate-pulse">Loading Projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 space-y-6">
            <p className="text-red-400 text-lg">{error}</p>
            <Button variant="ghost" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 space-y-6 bg-white/[0.02] border border-white/5 rounded-[3rem]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold text-white/60">No Projects Found</h3>
            <p className="text-white/40 max-w-md mx-auto">
              We haven't added any projects to this category yet. Check back soon for new masterpieces!
            </p>
            {activeCategory !== 'All' && (
              <Button variant="ghost" onClick={() => setActiveCategory('All')}>Show All Projects</Button>
            )}
          </div>
        ) : (
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
        )}
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
                      <p className="text-white font-bold">{selectedProject.client || 'CineBlend Partner'}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Date</h4>
                      <p className="text-white font-bold">
                        {selectedProject.createdAt?.toDate ? selectedProject.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recent Project'}
                      </p>
                    </div>
                  </div>

                  {getTools(selectedProject).length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Tools & Tech</h4>
                      <div className="flex flex-wrap gap-3">
                        {getTools(selectedProject).map((tool) => (
                          <span key={tool} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/80">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.link && (
                    <div className="pt-6">
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="glow" size="lg" className="w-full sm:w-auto">
                          View Project
                          <ExternalLink className="ml-2 w-5 h-5" />
                        </Button>
                      </a>
                    </div>
                  )}
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
