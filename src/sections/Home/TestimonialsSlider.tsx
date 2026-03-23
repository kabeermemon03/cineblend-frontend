import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import reviewsService, { Review } from '@/lib/reviews-service';
import { cn } from '@/lib/utils';

const TestimonialsSlider = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await reviewsService.getAll();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-slide
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length, next]);

  if (loading) return null;
  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="py-32 relative bg-black overflow-hidden border-y border-white/5">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mocha/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Client Voices</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
              Studio <span className="text-mocha">Reputation</span>
            </h2>
            <p className="text-white/30 text-lg max-w-2xl font-medium italic">
              Trusted by creators and visionaries worldwide to deliver high-impact digital excellence.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto relative px-12 md:px-20">
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="absolute inset-0 flex flex-col items-center text-center space-y-8"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 text-mocha/20">
                    <Quote size={80} fill="currentColor" />
                  </div>
                  <p className="text-xl md:text-3xl font-black text-white/80 leading-relaxed italic tracking-tight relative z-10 max-w-3xl">
                    "{current.review}"
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={cn(i < current.rating ? "text-mocha fill-mocha" : "text-white/10")} 
                      />
                    ))}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight italic">{current.name}</h4>
                    <p className="text-[10px] font-black text-mocha uppercase tracking-[0.3em]">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <button
              onClick={prev}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-mocha/40 transition-all pointer-events-auto group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-mocha/40 transition-all pointer-events-auto group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === currentIndex ? "w-8 bg-mocha" : "w-4 bg-white/10 hover:bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
