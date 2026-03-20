import { motion } from 'framer-motion'
import { useState } from 'react'
import { Zap, ArrowRight, MessageSquare, Clock, Shield, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const OurSolutionsPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-32 py-20 bg-black"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-8 relative z-10 pt-16">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md">
          <Zap className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Studio Solutions
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
          Our <br />
          <span className="text-mocha text-glow">Premium Packages</span>
        </h1>
        <p className="text-xl text-white/40 leading-relaxed max-w-2xl mx-auto font-medium">
          We believe every creative project is unique. Instead of fixed tiers, 
          we offer personalized solutions via our CineBit request system, 
          ensuring you only pay for exactly what you need.
        </p>
      </section>

      {/* Why Custom Flow */}
      <section className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Tailored Strategy",
              description: "We analyze your brand's specific needs to create a custom service plan that drives results.",
              icon: MessageSquare,
              color: "text-blue-400"
            },
            {
              title: "Flexible Scalability",
              description: "Whether it's a one-off request or an ongoing partnership, we scale our services to fit your growth.",
              icon: Clock,
              color: "text-mocha"
            },
            {
              title: "Premium Quality",
              description: "Every project gets our full cinematic attention, regardless of size or complexity.",
              icon: Shield,
              color: "text-purple-400"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseMove={handleMouseMove}
              viewport={{ once: true }}
              className="group relative p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-mocha/30 transition-all duration-700 overflow-hidden backdrop-blur-3xl"
            >
              {/* Glare Hover Effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
                }}
              />

              <div className="relative z-20 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">{item.title}</h3>
                  <p className="text-base text-white/30 leading-relaxed font-medium group-hover:text-white/50 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Package Categories Section */}
      <section className="container mx-auto px-6 md:px-12 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Value-Driven <span className="text-mocha">Solutions</span></h2>
            <p className="text-white/30 text-lg font-medium">Explore how we bring your vision to life across multiple creative fronts.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {[
              {
                category: "Video Production",
                features: ["4K Cinematic Editing", "Sound Design & Scoring", "Color Grading", "VFX & Motion Graphics"],
                cta: "Request Video Service"
              },
              {
                category: "Brand Identity",
                features: ["Logo & Style Guides", "Social Media Kits", "Print & Digital Assets", "Marketing Collateral"],
                cta: "Request Design Service"
              },
              {
                category: "Digital Presence",
                features: ["Portfolio Websites", "Custom SaaS Platforms", "Performance Optimization", "UI/UX Prototyping"],
                cta: "Request Web Service"
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-between p-10 md:p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all duration-700 group"
              >
                <div className="space-y-8 text-center md:text-left">
                  <h3 className="text-4xl font-black text-white tracking-tight">{pkg.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pkg.features.map((f, j) => (
                      <div key={j} className="flex items-center space-x-3 text-white/40 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-mocha/40 group-hover:bg-mocha transition-colors" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/request-cinebit" className="mt-10 md:mt-0">
                  <Button variant="glow" className="px-10 py-5 rounded-2xl group-hover:scale-105 transition-transform">
                    {pkg.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <div className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-mocha-dark/10 via-purple-dark/10 to-background border border-white/5 relative overflow-hidden text-center backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-mocha/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-10 relative z-10">
            <div className="inline-flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
              Ready to request <br />
              <span className="text-mocha text-glow">your next project?</span>
            </h2>
            <p className="text-xl text-white/40 leading-relaxed font-medium">
              Fill out our service request form and we'll get back to you with a 
              custom proposal tailored to your vision within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link to="/request-cinebit">
                <Button variant="glow" size="lg" className="px-12 py-5 rounded-2xl">
                  Initialize Request
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="px-12 py-5 rounded-2xl border-white/10 text-white/40 hover:text-white">
                  Contact Studio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default OurSolutionsPage
