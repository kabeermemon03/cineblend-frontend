import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Bell, ChevronRight, Zap, History, PlusCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/lib/auth-service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Button from '@/components/ui/Button';

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'cinebits'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => doc.data());
        
        setStats({
          total: docs.length,
          pending: docs.filter(d => d.status === 'pending').length,
          inProgress: docs.filter(d => d.status === 'in_progress').length,
          completed: docs.filter(d => d.status === 'completed').length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">Studio Dashboard</h1>
            <p className="text-white/40 font-medium">Manage your projects and studio access</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/request-cinebit">
              <Button variant="glow" size="sm" className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">
                <PlusCircle size={14} className="mr-2" />
                New Request
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="border-white/10 text-white/60 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">
              <LogOut size={14} className="mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-mocha/20 rounded-full flex items-center justify-center text-mocha overflow-hidden border-2 border-mocha/20">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <User size={48} />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{user?.displayName || 'Studio Member'}</h3>
                <p className="text-white/40 text-sm">{user?.email}</p>
              </div>
              <div className="w-full pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/30 uppercase font-black tracking-widest text-[10px]">Account Type</span>
                  <span className="text-mocha font-bold">Standard Account</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/30 uppercase font-black tracking-widest text-[10px]">Active Requests</span>
                  <span className="text-white/60 font-bold">{stats.pending + stats.inProgress}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions & Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Pending Requests', value: stats.pending, icon: Zap, color: 'text-mocha' },
                { title: 'In Progress', value: stats.inProgress, icon: History, color: 'text-blue-electric' },
                { title: 'Completed', value: stats.completed, icon: ChevronRight, color: 'text-green-500' },
                { title: 'Total Requests', value: stats.total, icon: Bell, color: 'text-purple-400' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex items-center gap-6"
                >
                  <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{stat.title}</p>
                    <h4 className="text-3xl font-black text-white">{loading ? '...' : stat.value}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Menu Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden"
            >
              {[
                { label: 'Project History', icon: History, desc: 'View your completed and pending works', path: '/history' },
                { label: 'Request a CineBit', icon: PlusCircle, desc: 'Initialize a new creative project', path: '/request-cinebit' },
                { label: 'Account Settings', icon: Settings, desc: 'Update your profile and preferences', path: '/settings' },
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full p-8 flex items-center justify-between group hover:bg-white/5 transition-all ${i !== 0 ? 'border-t border-white/5' : ''}`}
                >
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/20 group-hover:text-mocha transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h5 className="font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">{item.label}</h5>
                      <p className="text-sm text-white/30">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
