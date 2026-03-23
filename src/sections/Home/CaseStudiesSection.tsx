import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Target, CheckCircle2, Zap } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  problem: string;
  solution: string;
  impact: string;
  image: string;
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'The Future of Urban Mobility',
    client: 'EcoMotion',
    category: 'Cinematic Video',
    problem: 'EcoMotion struggled to communicate the emotional impact of their new electric scooter line beyond just technical specs.',
    solution: 'CineBlend crafted a narrative-driven film focusing on the freedom of movement, using high-speed drone shots and custom soundscapes.',
    impact: 'Increased website conversion by 60% and secured $2M in seed funding following the campaign launch.',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80',
    color: 'text-blue-400'
  },
  {
    id: '2',
    title: 'Digital First Branding',
    client: 'Nexus AI',
    category: 'Visual Identity',
    problem: 'Nexus AI had a generic tech look that failed to reflect their avant-garde approach to artificial intelligence.',
    solution: 'We developed a recursive visual system inspired by neural networks, featuring a dynamic logo and deep purple palette.',
    impact: 'Rebranded identity resulted in a 3x increase in enterprise inquiries within the first quarter.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80',
    color: 'text-mocha'
  }
];

const CaseStudiesSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeStudy = caseStudies.find(s => s.id === selectedId);

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Case Studies</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            >
              From Vision to <span className="text-mocha italic">Victory.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedId(study.id)}
              className="group relative h-[600px] rounded-[3.5rem] overflow-hidden cursor-pointer bg-[#0a0a0a] border border-white/5"
            >
              <img 
                src={study.image} 
                alt={study.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-mocha/80">{study.category}</span>
                  <h3 className="text-4xl font-black text-white tracking-tight leading-none group-hover:text-mocha transition-colors">{study.title}</h3>
                </div>
                
                <p className="text-white/40 font-medium line-clamp-2 max-w-md group-hover:text-white/60 transition-colors">
                  {study.problem}
                </p>

                <div className="pt-4 flex items-center gap-2 text-mocha font-black uppercase tracking-widest text-[10px]">
                  <span>Analyze Impact</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && activeStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/95 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-card border-white/10 rounded-[3rem] p-8 md:p-16 custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-mocha hover:border-mocha transition-all duration-300 z-50"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mocha">Case Study</span>
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">{activeStudy.title}</h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Client: {activeStudy.client}</p>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-mocha">
                        <Target size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">The Problem</span>
                      </div>
                      <p className="text-lg text-white/60 font-medium leading-relaxed italic">"{activeStudy.problem}"</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-mocha">
                        <Zap size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">The Solution</span>
                      </div>
                      <p className="text-lg text-white/60 font-medium leading-relaxed">{activeStudy.solution}</p>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-mocha/5 border border-mocha/10 space-y-4">
                      <div className="flex items-center gap-3 text-mocha">
                        <CheckCircle2 size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Final Impact</span>
                      </div>
                      <p className="text-2xl font-black text-white tracking-tight">{activeStudy.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="sticky top-0 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10">
                    <img src={activeStudy.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CaseStudiesSection;
