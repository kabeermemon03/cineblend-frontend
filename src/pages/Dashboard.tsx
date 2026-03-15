import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { LayoutDashboard, History, Clock, CheckCircle, Zap } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    { label: 'Total CineBits', value: '0', icon: <Zap className="w-5 h-5 text-mocha" /> },
    { label: 'Pending', value: '0', icon: <Clock className="w-5 h-5 text-yellow-500" /> },
    { label: 'Completed', value: '0', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome, <span className="text-mocha">{user?.username}</span>
            </h1>
            <p className="text-white/40">Manage your project requests and view progress.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-8 rounded-3xl border-white/5 space-y-4">
                <div className="p-3 rounded-2xl bg-white/5 w-fit">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                  <p className="text-4xl font-black mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          <div className="glass-card p-12 rounded-[2.5rem] border-white/5 text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <History className="w-10 h-10 text-white/20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No CineBits yet</h2>
              <p className="text-white/40 max-w-sm mx-auto text-sm leading-relaxed">
                You haven't submitted any project requests. Once you do, they'll appear here for you to track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
