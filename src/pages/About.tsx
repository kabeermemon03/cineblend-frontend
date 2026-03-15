import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Linkedin, Target, Eye } from 'lucide-react'
import Button from '@/components/ui/Button'

const team = [
  {
    name: 'Alex Rivera',
    role: 'Creative Director',
    image: 'https://i.pravatar.cc/150?u=alex',
    links: { instagram: '#', twitter: '#', linkedin: '#' }
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Web Developer',
    image: 'https://i.pravatar.cc/150?u=sarahc',
    links: { instagram: '#', twitter: '#', linkedin: '#' }
  },
  {
    name: 'David Miller',
    role: 'Senior Video Editor',
    image: 'https://i.pravatar.cc/150?u=david',
    links: { instagram: '#', twitter: '#', linkedin: '#' }
  },
  {
    name: 'Elena Vance',
    role: 'Brand Designer',
    image: 'https://i.pravatar.cc/150?u=elena',
    links: { instagram: '#', twitter: '#', linkedin: '#' }
  }
]

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-32 py-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md">
              <span className="text-xs font-semibold uppercase tracking-widest">
                Our Story
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
              Blending <span className="text-mocha">Cinema</span> with <span className="text-gradient">Technology</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              CineBlend Studios was born from a passion for cinematic storytelling and a deep 
              understanding of modern digital landscapes. We believe that every brand has 
              a story to tell, and we use the power of high-end visuals and cutting-edge 
              technology to bring those stories to life.
            </p>
            <div className="flex space-x-4">
              <Link to="/contact">
                <Button variant="glow" size="lg">Join the Journey</Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass-card border-white/5 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
                alt="Our Creative Space" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
            {/* Background Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-mocha/20 rounded-full blur-[80px] -z-0" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-dark/30 rounded-full blur-[100px] -z-0" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 glass-card border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-mocha/10 group-hover:text-mocha/20 transition-colors">
              <Target className="w-24 h-24" />
            </div>
            <h3 className="text-3xl font-bold flex items-center space-x-3">
              <span className="w-10 h-10 rounded-xl bg-mocha/20 flex items-center justify-center text-mocha">
                <Target className="w-5 h-5" />
              </span>
              <span>Our Mission</span>
            </h3>
            <p className="text-white/60 leading-relaxed relative z-10">
              To empower creators, startups, and established brands with cinematic digital experiences 
              that leave a lasting impression. We strive to bridge the gap between imagination 
              and reality through technical excellence and creative mastery.
            </p>
          </div>
          <div className="p-10 glass-card border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-purple-light/10 group-hover:text-purple-light/20 transition-colors">
              <Eye className="w-24 h-24" />
            </div>
            <h3 className="text-3xl font-bold flex items-center space-x-3">
              <span className="w-10 h-10 rounded-xl bg-purple-light/20 flex items-center justify-center text-purple-light">
                <Eye className="w-5 h-5" />
              </span>
              <span>Our Vision</span>
            </h3>
            <p className="text-white/60 leading-relaxed relative z-10">
              To become the global leader in cinematic digital storytelling, recognized for our 
              unique blend of artistic vision and technological innovation. We envision a future 
              where every digital interaction is a beautiful, immersive story.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Meet the <span className="text-mocha">Creative Minds</span>
          </h2>
          <p className="text-white/60 text-lg">
            A diverse group of designers, editors, and developers united by a passion 
            for excellence and a love for cinematic storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card border-white/5 mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex space-x-3">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-full bg-mocha/80 backdrop-blur-md flex items-center justify-center hover:bg-mocha transition-colors">
                        <Icon className="w-4 h-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white group-hover:text-mocha transition-colors">
                {member.name}
              </h4>
              <p className="text-xs uppercase tracking-widest text-white/40 font-bold mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default About
