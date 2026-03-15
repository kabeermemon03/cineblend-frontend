import { motion } from 'framer-motion'
import { Check, Zap, Star, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const pricingTiers = [
  {
    name: 'Starter',
    price: '$499',
    description: 'Perfect for individual content creators and small brands looking for professional visuals.',
    features: [
      '2 Video Edits (up to 5 min)',
      '5 Graphic Design Assets',
      'Basic Color Grading',
      'Standard Support',
      '2 Revision Rounds'
    ],
    icon: Zap,
    color: 'text-blue-electric',
    highlight: false
  },
  {
    name: 'Standard',
    price: '$1,299',
    description: 'Ideal for growing startups and established creators needing regular creative output.',
    features: [
      '5 Video Edits (up to 15 min)',
      '15 Graphic Design Assets',
      'Advanced Color Grading',
      'Priority Support',
      '4 Revision Rounds',
      'Source Files Included'
    ],
    icon: Star,
    color: 'text-mocha',
    highlight: true
  },
  {
    name: 'Pro',
    price: '$2,999',
    description: 'Full-service creative partnership for businesses and large-scale brands.',
    features: [
      'Unlimited Video Edits',
      'Unlimited Graphic Design',
      'Custom Branding Package',
      'Dedicated Project Manager',
      'Unlimited Revision Rounds',
      'Commercial Usage License',
      'Priority Turnaround'
    ],
    icon: ShieldCheck,
    color: 'text-purple-light',
    highlight: false
  }
]

const Pricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-32 py-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Pricing Plans
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Transparent <span className="text-mocha">Pricing</span> for <span className="text-gradient">Every Vision</span>
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          Choose a plan that fits your creative needs and budget. 
          No hidden fees, just premium quality results.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-10 rounded-[2.5rem] glass-card border flex flex-col justify-between transition-all duration-500",
                tier.highlight 
                  ? "bg-mocha/5 border-mocha/30 shadow-2xl shadow-mocha/10 scale-105 z-10" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mocha text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                    <tier.icon className={`w-7 h-7 ${tier.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-extrabold text-white">{tier.price}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-white/40 mt-1">/ Month</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">{tier.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-4 py-8 border-y border-white/5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 group">
                      <div className="mt-1 w-5 h-5 rounded-full bg-mocha/10 flex items-center justify-center flex-shrink-0 group-hover:bg-mocha/30 transition-colors">
                        <Check className="w-3 h-3 text-mocha" />
                      </div>
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10">
                <Link to="/contact">
                  <Button 
                    variant={tier.highlight ? "glow" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    Select {tier.name}
                  </Button>
                </Link>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 text-center mt-6 flex items-center justify-center">
                  <HelpCircle className="w-3 h-3 mr-2" />
                  Custom options available
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <div className="p-12 md:p-16 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="space-y-4 max-w-xl">
            <h3 className="text-3xl font-bold text-white">Need a custom enterprise solution?</h3>
            <p className="text-white/60">
              We offer bespoke creative services for larger agencies and enterprise 
              businesses. Let's discuss your specific requirements.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="px-12 group whitespace-nowrap">
              Talk to Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </motion.div>
  )
}

export default Pricing
