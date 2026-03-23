import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/sections/Home/Hero.tsx'

// Lazy load sections below the fold
const ServicesPreview = lazy(() => import('@/sections/Home/ServicesPreview.tsx'))
const ProjectShowcase = lazy(() => import('@/sections/Home/ProjectShowcase.tsx'))
const HowWeWork = lazy(() => import('@/sections/Home/HowWeWork.tsx'))
const Showreel = lazy(() => import('@/sections/Home/Showreel.tsx'))
const Testimonials = lazy(() => import('@/sections/Home/Testimonials.tsx'))
const Stats = lazy(() => import('@/sections/Home/Stats.tsx'))
const FAQ = lazy(() => import('@/sections/Home/FAQ.tsx'))
const ComparisonSection = lazy(() => import('@/sections/Home/ComparisonSection.tsx'))
const CaseStudiesSection = lazy(() => import('@/sections/Home/CaseStudiesSection.tsx'))
const TestimonialsSlider = lazy(() => import('@/sections/Home/TestimonialsSlider.tsx'))

// Loading Skeleton for sections
const SectionSkeleton = () => (
  <div className="w-full h-[400px] flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-mocha/20 border-t-mocha rounded-full animate-spin" />
  </div>
)

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-32"
    >
      <Hero />
      
      <Suspense fallback={<SectionSkeleton />}>
        <Showreel />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesPreview />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HowWeWork />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProjectShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ComparisonSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CaseStudiesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSlider />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>
    </motion.div>
  )
}

export default Home