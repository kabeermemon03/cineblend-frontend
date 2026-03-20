import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Briefcase, Clock } from 'lucide-react'

const stats = [
  { label: 'Projects Completed', value: '50+', icon: Briefcase, color: 'text-mocha' },
  { label: 'Happy Clients', value: '25+', icon: Users, color: 'text-purple-light' },
  { label: 'Working Hours', value: '24 hrs', icon: Clock, color: 'text-blue-electric' },
]

const Stats = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-background">
      {/* Background Glow - Reduced blur for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mocha/5 blur-[100px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center space-y-6 group"
            >
              <div className="flex justify-center">
                <div className={`w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-2xl`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                {stat.value}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-mocha transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
