import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, Briefcase, Zap } from 'lucide-react'

const stats = [
  { label: 'Projects Completed', value: '250+', icon: Briefcase, color: 'text-mocha' },
  { label: 'Happy Clients', value: '120+', icon: Users, color: 'text-purple-light' },
  { label: 'Awards Won', value: '15+', icon: Trophy, color: 'text-blue-electric' },
  { label: 'Design Hours', value: '12K+', icon: Zap, color: 'text-amber-500' },
]

const Stats = () => {
  const ref = React.useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mocha/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center space-y-4 group"
            >
              <div className="flex justify-center">
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
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
