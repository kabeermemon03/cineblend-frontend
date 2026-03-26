import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'
import Layout from '@/layout/Layout'
import { AuthStateListener } from '@/components/auth/AuthStateListener'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Preloader from '@/components/ui/Preloader'

// Lazy load all pages for maximum performance and code splitting
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const Contact = lazy(() => import('@/pages/Contact'))
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const Onboarding = lazy(() => import('@/pages/Onboarding'))
const Settings = lazy(() => import('@/pages/Settings'))
const RequestCineBit = lazy(() => import('@/pages/RequestCineBit'))
const Careers = lazy(() => import('@/pages/Careers'))
const MyCineBits = lazy(() => import('@/pages/MyCineBits'))
const TeamProfile = lazy(() => import('@/pages/TeamProfile'))

const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-mocha/20 border-t-mocha rounded-full animate-spin" />
  </div>
)

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Preloader />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(150, 105, 76, 0.2)',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '16px 24px',
          },
          success: {
            iconTheme: {
              primary: '#96694c',
              secondary: '#fff',
            },
          },
        }}
      />
      <AuthStateListener />
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Team Profile Route */}
            <Route path="/team/:id" element={<TeamProfile />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/request-cinebit" element={<ProtectedRoute><RequestCineBit /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><MyCineBits /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
