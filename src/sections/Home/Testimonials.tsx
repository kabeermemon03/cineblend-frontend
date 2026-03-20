import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, AlertTriangle } from 'lucide-react';
import reviewsService, { Review } from '@/lib/reviews-service';

// ✅ Skeleton Loader for a polished loading state
const TestimonialSkeleton = () => (
  <div className="group relative p-8 glass-card border border-white/5 animate-pulse">
    <div className="space-y-6">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-white/10 rounded-sm" />
        ))}
      </div>
      <div className="h-20 bg-white/5 rounded-lg" />
      <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
        <div className="w-12 h-12 rounded-full bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-white/10 rounded-md" />
          <div className="h-3 w-1/2 bg-white/10 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

// ✅ Memoized Testimonial Card for performance
const TestimonialCard = memo(({ review, delay }: { review: Review; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative p-8 glass-card border border-white/5 hover:border-mocha/20 transition-all duration-500 flex flex-col justify-between h-full"
  >
    {/* Quote Icon */}
    <div className="absolute top-6 right-8 text-mocha/20 group-hover:text-mocha/40 transition-colors">
      <Quote className="w-12 h-12 rotate-180" />
    </div>

    <div className="space-y-6 relative z-10">
      {/* Dynamic Star Rating */}
      <div className="flex space-x-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
        ))}
      </div>
      
      <p className="text-white/80 italic leading-relaxed text-lg">
        `&ldquo;{review.review}&rdquo;`
      </p>

      <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-mocha/30 group-hover:border-mocha transition-colors">
          <img 
            loading="lazy"
            src={review.imageUrl || `https://ui-avatars.com/api/?name=${review.name.replace(/\s/g, '+')}&background=1a1a1a&color=96694c`}
            alt={review.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-white group-hover:text-mocha transition-colors">
            {review.name}
          </h4>
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium">
            {review.role}
          </p>
        </div>
      </div>
    </div>

    {/* Decorative Corner Glow */}
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-dark/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </motion.div>
));

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const fetchedData = await reviewsService.getAll();
        setReviews(fetchedData);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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
          {loading && (
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          )}

          {!loading && error && (
            <div className="col-span-full text-center p-10 rounded-[2rem] bg-red-500/5 border border-red-500/10 backdrop-blur-md">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 font-black uppercase tracking-widest text-xs mb-2">Error Loading Reviews</p>
              <p className="text-white/40 font-medium">Could not connect to the database. Please try again later.</p>
            </div>
          )}

          {!loading && !error && reviews.length === 0 && (
            <div className="col-span-full text-center p-20 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <p className="text-white/40 font-medium">Be the first to leave a review for CineBlend Studios!</p>
            </div>
          )}

          {!loading && !error && reviews.map((review, index) => (
            <TestimonialCard key={review.id} review={review} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;