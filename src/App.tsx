import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './layout/Layout.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Services from './pages/Services.tsx'
import Portfolio from './pages/Portfolio.tsx'
import Pricing from './pages/Pricing.tsx'
import Contact from './pages/Contact.tsx'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
