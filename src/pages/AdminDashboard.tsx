import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Briefcase, Users2, MessageSquare, RefreshCcw, Bell, FileText, LogOut, Menu, X, Mail, RotateCcw } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { adminService } from '@/lib/firebase-services';
import { SidebarItem } from '@/components/admin/Common';

// --- Lazy Load Sections ---
const Overview = lazy(() => import('@/components/admin/Overview').then(m => ({ default: m.Overview })));
const Requests = lazy(() => import('@/components/admin/Requests').then(m => ({ default: m.Requests })));
const UserManagement = lazy(() => import('@/components/admin/UserManagement').then(m => ({ default: m.UserManagement })));
const PortfolioManagement = lazy(() => import('@/components/admin/PortfolioManagement').then(m => ({ default: m.PortfolioManagement })));
const TestimonialsManagement = lazy(() => import('@/components/admin/TestimonialsManagement').then(m => ({ default: m.TestimonialsManagement })));
const RevisionsManagement = lazy(() => import('@/components/admin/RevisionsManagement').then(m => ({ default: m.RevisionsManagement })));
const NotificationsAdmin = lazy(() => import('@/components/admin/NotificationsAdmin').then(m => ({ default: m.NotificationsAdmin })));
const DeliverablesManagement = lazy(() => import('@/components/admin/DeliverablesManagement').then(m => ({ default: m.DeliverablesManagement })));
const EmailSettingsAdmin = lazy(() => import('@/components/admin/EmailSettingsAdmin').then(m => ({ default: m.EmailSettingsAdmin })));
const TeamManagement = lazy(() => import('@/components/admin/TeamManagement').then(m => ({ default: m.TeamManagement })));

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeRequests: 0,
    pendingRevisions: 0,
    completedProjects: 0
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = adminService.getStats((newStats) => {
      setStats(newStats);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isMobile = windowWidth < 768;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: Users2 },
    { id: 'revisions', label: 'Revisions', icon: RefreshCcw },
    { id: 'deliverables', label: 'Deliverables', icon: FileText },
    { id: 'team', label: 'Team', icon: MessageSquare },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'notifications', label: 'Push Notify', icon: Bell },
    { id: 'email-settings', label: 'Email Config', icon: Mail },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview stats={stats} />;
      case 'requests': return <Requests />;
      case 'users': return <UserManagement />;
      case 'portfolio': return <PortfolioManagement />;
      case 'revisions': return <RevisionsManagement />;
      case 'deliverables': return <DeliverablesManagement />;
      case 'team': return <TeamManagement />;
      case 'testimonials': return <TestimonialsManagement />;
      case 'notifications': return <NotificationsAdmin />;
      case 'email-settings': return <EmailSettingsAdmin />;
      default: return <Overview stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (isMobile ? '85%' : 280) : 0,
          x: isSidebarOpen ? 0 : (isMobile ? -280 : 0),
          opacity: isSidebarOpen ? 1 : (isMobile ? 0 : 1)
        }}
        className={cn(
          "fixed md:relative z-50 bg-[#080808]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col h-full transition-all duration-500 ease-[0.16,1,0.3,1]",
          !isSidebarOpen && "md:border-r-0"
        )}
      >
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mocha flex items-center justify-center font-black text-xl italic shadow-[0_0_20px_rgba(183,148,110,0.3)]">
                CB
              </div>
              <span className="text-xl font-black uppercase italic tracking-tighter">Admin <span className="text-mocha">Panel</span></span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
              />
            ))}
          </nav>
        </div>

        <div className="p-8 border-t border-white/5 bg-white/[0.01]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <LogOut size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 md:px-12 border-b border-white/5 bg-black/20 backdrop-blur-md relative z-40">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/5 group"
          >
            {isSidebarOpen ? <X size={20} className="group-hover:rotate-90 transition-transform" /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-black uppercase italic tracking-tight">{user?.displayName || 'Administrator'}</p>
              <p className="text-[10px] font-black text-mocha uppercase tracking-widest opacity-60">Master Admin</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-mocha/20 border border-mocha/20 flex items-center justify-center text-mocha font-bold overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.displayName?.[0] || 'A'
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto pb-24">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <RotateCcw className="animate-spin text-mocha" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Loading Dashboard Section...</p>
              </div>
            }>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mocha/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
