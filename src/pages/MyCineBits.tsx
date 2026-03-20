import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { History, Video, Palette, Code, ChevronRight, Zap } from 'lucide-react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CineBit {
  id: string
  projectTitle: string
  serviceType: string
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: any
}

const MyCineBits = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
  const navigate = useNavigate()
  const [cinebits, setCinebits] = useState<CineBit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, authLoading, navigate])

  useEffect(() => {
    const fetchCineBits = async () => {
      if (!user) return
      
      try {
        const q = query(
          collection(db, 'cinebits'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
        
        const querySnapshot = await getDocs(q)
        const items: CineBit[] = []
        querySnapshot.forEach((doc) => {
          items.push({ ...(doc.data() as CineBit), id: doc.id })
        })
        setCinebits(items)
      } catch (error) {
        console.error('Error fetching cinebits:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchCineBits()
    }
  }, [user])

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'video_production': return <Video className="w-4 h-4" />
      case 'brand_identity': return <Palette className="w-4 h-4" />
      case 'web_engineering': return <Code className="w-4 h-4" />
      default: return <Zap className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'in_progress': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      case 'completed': return 'text-green-500 bg-green-500/10 border-green-500/20'
      default: return 'text-white/40 bg-white/5 border-white/10'
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-mocha/20 border-t-mocha rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black relative overflow-hidden">
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-mocha/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-dark/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha">
                <History className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Request History</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                My <span className="text-mocha">CineBits</span>
              </h1>
              <p className="text-white/40 text-lg font-medium">Track all your project requests and their current status.</p>
            </div>
            <Link to="/request-cinebit">
              <Button variant="glow" size="lg" className="px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
                New Request
              </Button>
            </Link>
          </div>

          {cinebits.length > 0 ? (
            <div className="glass-card rounded-[3rem] border-white/5 overflow-hidden bg-white/[0.02] backdrop-blur-3xl">
              <div className="divide-y divide-white/5">
                {cinebits.map((bit, i) => (
                  <motion.div 
                    key={bit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-mocha transition-colors">
                        {getServiceIcon(bit.serviceType)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-mocha transition-colors">{bit.projectTitle}</h4>
                        <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mt-1">{bit.serviceType.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className={cn("px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border", getStatusColor(bit.status))}>
                        {bit.status}
                      </div>
                      <div className="text-white/10 text-[10px] font-black uppercase tracking-widest">
                        {bit.createdAt?.toDate ? bit.createdAt.toDate().toLocaleDateString() : 'Recent'}
                      </div>
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card p-24 rounded-[4rem] border-white/5 text-center space-y-8 bg-white/[0.01] backdrop-blur-3xl">
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto">
                <History className="w-10 h-10 text-white/10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white tracking-tight">No CineBits Found</h3>
                <p className="text-white/30 max-w-sm mx-auto font-medium leading-relaxed">
                  You haven't submitted any project requests yet.
                </p>
              </div>
              <Link to="/request-cinebit">
                <Button variant="outline" className="px-10 border-white/10 text-white/40 hover:text-mocha hover:border-mocha">
                  Start Your First Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyCineBits