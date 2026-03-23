import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Clock, MessageSquare, Check } from 'lucide-react';

const ComparisonSection = () => {
  const comparisons = [
    {
      feature: 'Production Quality',
      typical: 'Standard HD with basic color correction',
      cineblend: 'Cinematic 4K+ with Hollywood-grade color grading',
      icon: Zap
    },
    {
      feature: 'Turnaround Time',
      typical: '2-4 weeks with unpredictable delays',
      cineblend: 'Optimized 72-hour initial draft delivery',
      icon: Clock
    },
    {
      feature: 'Communication',
      typical: 'Email-only with slow response times',
      cineblend: 'Dedicated dashboard & instant studio updates',
      icon: MessageSquare
    },
    {
      feature: 'Creative Vision',
      typical: 'Template-based, repetitive designs',
      cineblend: 'Avant-garde, custom-crafted visual storytelling',
      icon: ShieldCheck
    }
  ];

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
            <span className="text-[10px] font-black uppercase tracking-widest">The CineBlend Edge</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            Why Choose <span className="text-mocha italic">CineBlend?</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 mb-8 px-8 hidden md:grid">
            <div className="col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Feature</div>
            <div className="col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Typical Services</div>
            <div className="col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-mocha/60">CineBlend Studios</div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-mocha/20 hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Mobile Feature Label */}
                <div className="md:hidden text-[10px] font-black uppercase tracking-[0.3em] text-mocha/60 mb-2">
                  {item.feature}
                </div>

                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-mocha transition-colors">
                    <item.icon size={20} />
                  </div>
                  <span className="text-lg font-black text-white/80 group-hover:text-white transition-colors">{item.feature}</span>
                </div>

                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                  </div>
                  <p className="text-sm text-white/30 font-medium leading-relaxed">{item.typical}</p>
                </div>

                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-mocha/20 border border-mocha/30 flex items-center justify-center flex-shrink-0 text-mocha shadow-[0_0_15px_rgba(150,105,76,0.2)]">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-black leading-relaxed italic">{item.cineblend}</p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-mocha/0 via-mocha/0 to-mocha/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-mocha/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-dark/5 blur-[120px] rounded-full translate-x-1/4 pointer-events-none" />
    </section>
  );
};

export default ComparisonSection;
