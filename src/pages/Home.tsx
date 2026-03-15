import { motion } from 'framer-motion'
import Hero from '@/sections/Home/Hero.tsx'
import ServicesPreview from '@/sections/Home/ServicesPreview.tsx'
import PortfolioSection from '@/sections/Home/PortfolioSection.tsx'
import Testimonials from '@/sections/Home/Testimonials.tsx'
import Stats from '@/sections/Home/Stats.tsx'
import FAQ from '@/sections/Home/FAQ.tsx'

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
      <ServicesPreview />
      <PortfolioSection />
      <Stats />
      <Testimonials />
      <FAQ />
    </motion.div>
  )
}

export default Home
