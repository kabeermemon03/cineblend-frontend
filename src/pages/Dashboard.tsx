import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Bell, ChevronRight, Zap, History, PlusCircle, Clock, CheckCircle2, Layout, ArrowRight, Video, Code, Palette } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/lib/auth-service';
import { cinebitsService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import NotificationSystem from '@/components/dashboard/NotificationSystem';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = cinebitsService.getByUser(user.uid, (data) => {
      setStats({
        total: data.length,
        pending: data.filter(d => d.status === 'pending').length,
        inProgress: data.filter(d => d.status === 'in_progress').length,
        completed: data.filter(d => d.status === 'completed').length
      });
      setRecentProjects(data.slice(0, 3));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-20 px-6 selection:bg-mocha/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-mocha/10 border border-mocha/20 text-mocha shadow-xl shadow-mocha/5">
              <Layout size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Command Center</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Studio <span className="text-mocha italic">Console</span>
            </h1>
            <p className="text-white/30 text-xl font-medium tracking-tight max-w-xl">Welcome back, <span className="text-white">{user?.displayName?.split(' ')[0]}</span>. Your creative engine is primed and ready.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <NotificationSystem />
            <Link to="/request-cinebit">
              <Button variant="glow" className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mocha/20">
                <PlusCircle size={16} className="mr-2" />
                Initialize Project
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="border-white/5 bg-white/5 text-white/40 hover:text-red-500 hover:border-red-500/40 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Profile & Quick Links */}
          <div className="lg:col-span-4 space-y-12">
            {/* Profile Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-mocha/5 blur-[80px] pointer-events-none group-hover:bg-mocha/10 transition-all duration-700" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="relative group/avatar">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border border-white/10 p-1 group-hover/avatar:border-mocha/40 transition-all duration-700">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-full h-full object-cover scale-110 group-hover/avatar:scale-100 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/5 bg-white/5">
                          <User size={48} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-2xl border-4 border-black flex items-center justify-center shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white italic">{user?.displayName || 'Creative Partner'}</h3>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">{user?.email}</p>
                </div>

                <div className="w-full pt-8 border-t border-white/5 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Studio Status</span>
                    <span className="px-3 py-1 rounded-lg bg-mocha/10 text-mocha text-[10px] font-black uppercase tracking-widest border border-mocha/20">Active Member</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Current Load</span>
                    <span className="text-white font-black text-sm tracking-tighter">{stats.pending + stats.inProgress} PROJECTS</span>
                  </div>
                </div>

                <Button onClick={() => navigate('/settings')} variant="outline" className="w-full py-5 rounded-2xl border-white/10 text-white/40 hover:text-white hover:border-mocha/40 transition-all text-[10px] font-black uppercase tracking-widest">
                  Manage Account Settings
                </Button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-4"
            >
              {[
                { label: 'Project Archive', icon: History, path: '/my-cinebits', color: 'text-mocha' },
                { label: 'Studio Credits', icon: Zap, path: '/pricing', color: 'text-yellow-500' },
                { label: 'Technical Support', icon: Bell, path: '/contact', color: 'text-blue-500' },
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full p-6 flex items-center justify-between rounded-[2rem] hover:bg-white/5 transition-all group",
                    i !== 0 && "mt-2"
                  )}
                >
                  <div className="flex items-center gap-5">
                    <div className={cn("w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", item.color)}>
                      <item.icon size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ArrowRight size={18} className="text-white/5 group-hover:text-mocha group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Stats & Recent Projects */}
          <div className="lg:col-span-8 space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/5' },
                { label: 'In Work', value: stats.inProgress, icon: Zap, color: 'text-mocha', bg: 'bg-mocha/5' },
                { label: 'Finished', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                { label: 'Lifetime', value: stats.total, icon: History, color: 'text-purple-500', bg: 'bg-purple-500/5' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 group hover:border-white/10 transition-all relative overflow-hidden"
                >
                  <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 pointer-events-none transition-opacity group-hover:opacity-20", stat.bg)} />
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", stat.bg, stat.color)}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">{stat.label}</p>
                      <h4 className="text-4xl font-black text-white tracking-tighter">{loading ? '...' : stat.value}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Projects List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 space-y-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white italic">Recent Projects</h3>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Live from the Engine</p>
                </div>
                <Link to="/my-cinebits" className="text-[10px] font-black uppercase tracking-widest text-mocha hover:text-white transition-colors flex items-center gap-2 group">
                  View Full Archive
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-10 h-10 border-2 border-mocha/20 border-t-mocha rounded-full animate-spin mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Syncing Workspace...</p>
                  </div>
                ) : recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-mocha/30 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-mocha transition-colors border border-white/5 group-hover:border-mocha/30">
                          {project.serviceType === 'video_production' ? <Video size={20} /> : project.serviceType === 'web_engineering' ? <Code size={20} /> : <Palette size={20} />}
                        </div>
                        <div>
                          <h5 className="font-black text-white uppercase tracking-tight group-hover:text-mocha transition-colors italic">{project.projectTitle}</h5>
                          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">{project.serviceType.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className={cn(
                          "px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border shadow-lg",
                          project.status === 'pending' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' :
                          project.status === 'in_progress' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' :
                          'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
                        )}>
                          {project.status.replace('_', ' ')}
                        </div>
                        <ChevronRight size={18} className="text-white/5 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center bg-white/[0.01] rounded-[2rem] border border-dashed border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No active projects found in workspace</p>
                    <Link to="/request-cinebit">
                      <Button variant="ghost" className="mt-6 text-mocha hover:bg-mocha/5">Initialize First Project</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
