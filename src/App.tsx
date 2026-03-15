import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './layout/Layout.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Services from './pages/Services.tsx'
import Pricing from './pages/Pricing.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import RequestCineBit from './pages/RequestCineBit.tsx'
import Dashboard from './pages/Dashboard.tsx'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-cinebit" element={<RequestCineBit />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
