import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO at TechStream',
    content: "CineBlend transformed our brand's video content. Their attention to cinematic detail and modern editing style is unmatched. They don't just edit; they tell stories.",
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Founder of CloudNine',
    content: "The web development team at CineBlend built us a site that's as beautiful as it is functional. Their use of modern technologies like React and Framer Motion really shows.",
    avatar: 'https://i.pravatar.cc/150?u=michael',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Creative Director',
    content: "Working with CineBlend on our rebranding was a seamless experience. Their logo and graphic design work captured our vision perfectly with a premium, high-end feel.",
    avatar: 'https://i.pravatar.cc/150?u=emma',
    rating: 5
  }
]

const Testimonials = () => {
  return (
    <section className="py-20 relative bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Loved by <span className="text-mocha">Visionaries</span>
          </h2>
          <p className="text-white/60 text-lg">
            Don't just take our word for it. Here's what some of the world's most 
            innovative brands and creators have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative p-8 glass-card border border-white/5 hover:border-mocha/20 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-mocha/20 group-hover:text-mocha/40 transition-colors">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                
                <p className="text-white/80 italic leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-mocha/30 group-hover:border-mocha transition-colors">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-mocha transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-dark/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
