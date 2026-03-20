import { motion } from 'framer-motion'
import { Send, Search, Palette, CheckCircle } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Request',
    description: 'Submit your project vision through our CineBit portal with specific requirements.',
    icon: Send,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 2,
    title: 'Analysis',
    description: 'Our creative directors review your request and build a custom production strategy.',
    icon: Search,
    color: 'text-mocha',
    bg: 'bg-mocha/10'
  },
  {
    id: 3,
    title: 'Creation',
    description: 'Our expert team brings your vision to life using industry-leading tools and techniques.',
    icon: Palette,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Receive your high-quality final assets, ready to redefine your digital presence.',
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  }
]

const HowWeWork = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Our Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            How We <span className="text-mocha">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 text-lg font-medium max-w-xl mx-auto"
          >
            A seamless workflow designed to transform your ideas into cinematic reality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 group"
            >
              <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-mocha/30 transition-all duration-500 h-full flex flex-col items-center text-center space-y-8">
                <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl relative`}>
                  <step.icon className="w-10 h-10" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40 group-hover:text-mocha transition-colors">
                    0{step.id}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">{step.title}</h3>
                  <p className="text-sm text-white/30 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork