import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Video, Palette, Code, ArrowRight, X, Play, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

const projects = [
  {
    id: 1,
    title: 'Cinematic Brand Reveal',
    category: 'Video Editing',
    description: 'A high-energy, cinematic brand reveal for a premium lifestyle label.',
    outcome: 'Increased brand engagement by 45% and established a cohesive visual identity across platforms.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder
    icon: Video,
    color: 'text-blue-400'
  },
  {
    id: 2,
    title: 'Visual Identity System',
    category: 'Graphic Design',
    description: 'A comprehensive branding package including logo, typography, and color systems.',
    outcome: 'Successfully launched the brand across 12 countries with a unified visual language.',
    tools: ['Illustrator', 'Photoshop', 'Figma'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
    icon: Palette,
    color: 'text-mocha'
  },
  {
    id: 3,
    title: 'Enterprise SaaS Dashboard',
    category: 'Web Development',
    description: 'A high-performance, real-time data visualization dashboard built with React.',
    outcome: 'Reduced data processing time by 60% and improved user retention by 30%.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    icon: Code,
    color: 'text-emerald-400'
  }
]

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Project Showcase</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            Elite <span className="text-mocha">Productions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 text-lg font-medium max-w-xl mx-auto"
          >
            Explore our finest work across multiple creative domains.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer aspect-[4/5] rounded-[3.5rem] overflow-hidden glass-card border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-mocha/30 transition-all duration-700"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${project.color}`}>
                    <project.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{project.category}</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight leading-none">{project.title}</h3>
                <p className="text-sm text-white/30 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
                  {project.description}
                </p>
                <div className="pt-4 flex items-center space-x-2 text-mocha font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-background/95 border border-white/10 rounded-[4rem] z-[201] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="lg:w-1/2 relative bg-black">
                {selectedProject.video ? (
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-full object-cover opacity-60"
                  >
                    <source src={selectedProject.video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-12 left-12 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${selectedProject.color}`}>
                    <selectedProject.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="lg:w-1/2 p-10 md:p-16 overflow-y-auto space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Project Goal</span>
                  <p className="text-xl text-white/60 font-medium leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Final Outcome</span>
                  <div className="p-6 rounded-[2rem] bg-mocha/5 border border-mocha/10 flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-mocha flex-shrink-0 mt-1" />
                    <p className="text-lg text-white font-medium leading-relaxed">{selectedProject.outcome}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Tools Utilized</span>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tools.map((tool, i) => (
                      <div key={i} className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Button variant="glow" size="lg" className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
                    Request Similar Project
                    <Play className="ml-3 w-4 h-4 fill-white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectShowcase