import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { History, Video, Palette, Code, ChevronRight, Zap, Search, Clock, CheckCircle2 } from 'lucide-react'
import { cinebitsService } from '@/lib/firebase-services'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import RevisionModal from '@/components/dashboard/RevisionModal'

interface CineBit {
  id: string
  projectTitle: string
  serviceType: string
  status: string
  createdAt: any
}

const MyCineBits = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore()
  const navigate = useNavigate()
  const [cinebits, setCinebits] = useState<CineBit[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [revisionModal, setRevisionModal] = useState<{ isOpen: boolean; requestId: string; projectTitle: string }>({
    isOpen: false,
    requestId: '',
    projectTitle: ''
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, authLoading, navigate])

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = cinebitsService.getByUser(user.uid, (data) => {
      setCinebits(data);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user])

  const filteredCinebits = cinebits.filter(bit => {
    const matchesSearch = bit.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bit.serviceType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      case 'approved': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'in_progress': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      case 'completed': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      case 'revision_requested': return 'text-red-500 bg-red-500/10 border-red-500/20'
      default: return 'text-white/40 bg-white/5 border-white/10'
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-mocha/20 border-t-mocha rounded-full animate-spin shadow-[0_0_30px_rgba(183,148,110,0.2)]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-40 pb-20 bg-black relative overflow-hidden selection:bg-mocha/30">
      <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] bg-mocha/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-purple-dark/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-mocha/10 border border-mocha/20 text-mocha"
              >
                <History className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Project Engine</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none"
              >
                My <span className="text-mocha italic">CineBits</span>
              </motion.h1>
              <p className="text-white/30 text-lg font-medium max-w-xl leading-relaxed tracking-tight">Track, manage, and scale your creative vision with real-time project updates and seamless revision control.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <Link to="/request-cinebit">
                <Button variant="glow" size="lg" className="px-12 py-7 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-mocha/20">
                  Initialize New Project
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-sm text-white focus:border-mocha/40 focus:bg-white/[0.08] transition-all outline-none"
              />
            </div>
            <div className="flex gap-4">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 focus:border-mocha/40 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="revision_requested">Revision</option>
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredCinebits.length > 0 ? (
              <motion.div 
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden"
              >
                <div className="divide-y divide-white/5">
                  {filteredCinebits.map((bit, i) => (
                    <motion.div 
                      key={bit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-10 flex flex-col gap-10 hover:bg-white/[0.02] transition-all group"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex items-center space-x-8">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-mocha group-hover:border-mocha/30 transition-all duration-500 shadow-xl">
                            {getServiceIcon(bit.serviceType)}
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white group-hover:text-mocha transition-all duration-500 uppercase tracking-tight italic">{bit.projectTitle}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{bit.serviceType.replace('_', ' ')}</p>
                              <div className="w-1 h-1 rounded-full bg-white/10" />
                              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                {bit.createdAt?.toDate ? bit.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Processing'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                          <div className={cn("px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg", getStatusColor(bit.status))}>
                            {bit.status.replace('_', ' ')}
                          </div>
                          
                          {bit.status === 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setRevisionModal({ 
                                isOpen: true, 
                                requestId: bit.id, 
                                projectTitle: bit.projectTitle 
                              })}
                              className="px-8 py-3.5 rounded-xl border-mocha/20 text-mocha hover:bg-mocha hover:text-white transition-all text-[10px] font-black tracking-widest uppercase shadow-xl shadow-mocha/10"
                            >
                              Request Revision
                            </Button>
                          )}
                          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-mocha hover:border-mocha hover:shadow-xl hover:shadow-mocha/20 transition-all duration-500">
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Timeline */}
                      <div className="relative pt-6 pb-2 px-4 max-w-4xl mx-auto w-full">
                        <div className="absolute top-[34px] left-4 right-4 h-0.5 bg-white/5" />
                        <div className="relative flex justify-between">
                          {[
                            { label: 'Submitted', key: 'pending', icon: Clock },
                            { label: 'Approved', key: 'approved', icon: CheckCircle2 },
                            { label: 'Production', key: 'in_progress', icon: Video },
                            { label: 'Delivered', key: 'completed', icon: CheckCircle2 }
                          ].map((step, idx) => {
                            const statuses = ['pending', 'approved', 'in_progress', 'completed'];
                            const currentIdx = statuses.indexOf(bit.status);
                            const isPast = idx < currentIdx;
                            const isCurrent = idx === currentIdx;
                            
                            return (
                              <div key={step.key} className="flex flex-col items-center gap-4 relative z-10 group/step">
                                <div className={cn(
                                  "w-4 h-4 rounded-full transition-all duration-700 flex items-center justify-center",
                                  isPast ? "bg-mocha shadow-[0_0_20px_rgba(183,148,110,0.6)]" : 
                                  isCurrent ? "bg-mocha scale-125 shadow-[0_0_25px_rgba(183,148,110,0.8)]" : 
                                  "bg-white/10"
                                )}>
                                  {(isPast || isCurrent) && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                  <span className={cn(
                                    "text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-700",
                                    isPast || isCurrent ? "text-white" : "text-white/10"
                                  )}>
                                    {step.label}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {/* Progress Line */}
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(Math.max(0, ['pending', 'approved', 'in_progress', 'completed'].indexOf(bit.status)) / 3) * 100}%` }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="absolute top-[34px] left-4 h-0.5 bg-mocha shadow-[0_0_15px_rgba(183,148,110,0.4)]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.01] border border-white/5 p-24 rounded-[4rem] text-center space-y-10 backdrop-blur-3xl"
              >
                <div className="w-28 h-28 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
                  <History className="w-12 h-12 text-white/5" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white tracking-tight uppercase italic">Engine Idle</h3>
                  <p className="text-white/20 max-w-sm mx-auto font-medium text-lg tracking-tight">
                    {searchTerm || statusFilter !== 'all' ? "No projects match your active search criteria." : "You haven't initialized any creative projects yet."}
                  </p>
                </div>
                {(!searchTerm && statusFilter === 'all') && (
                  <Link to="/request-cinebit">
                    <Button variant="outline" className="px-12 py-5 border-white/10 text-white/30 hover:text-mocha hover:border-mocha hover:bg-mocha/5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500">
                      Initialize Your First CineBit
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RevisionModal 
        isOpen={revisionModal.isOpen}
        onClose={() => setRevisionModal(prev => ({ ...prev, isOpen: false }))}
        requestId={revisionModal.requestId}
        projectTitle={revisionModal.projectTitle}
        userId={user?.uid || ''}
      />
    </div>
  )
}

export default MyCineBits