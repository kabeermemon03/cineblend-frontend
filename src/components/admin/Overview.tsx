import { useState, useEffect } from 'react';
import { Users, Briefcase, RefreshCcw, CheckCircle2, Clock, Bell } from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';
import { StatCard } from './Common';

interface OverviewProps {
  stats: {
    totalUsers: number;
    activeRequests: number;
    pendingRevisions: number;
    completedProjects: number;
  };
}

export const Overview = ({ stats }: OverviewProps) => {
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = adminService.getRecentActivity((data) => {
      setActivity(data);
    });
    return () => unsubscribe();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'request': return <Briefcase size={20} />;
      case 'user': return <Users size={20} />;
      case 'revision': return <RefreshCcw size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Clients" value={stats.totalUsers} icon={Users} color="bg-blue-500" trend="+12% this month" />
        <StatCard label="Active Requests" value={stats.activeRequests} icon={Clock} color="bg-orange-500" />
        <StatCard label="Pending Revisions" value={stats.pendingRevisions} icon={RefreshCcw} color="bg-red-500" />
        <StatCard label="Completed" value={stats.completedProjects} icon={CheckCircle2} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-black uppercase tracking-tight mb-8">Recent Activity</h3>
          <div className="space-y-6">
            {activity.length > 0 ? activity.map((item) => (
              <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-mocha/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-mocha/10 flex items-center justify-center text-mocha">
                  {getActivityIcon(item.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">
                    {item.date ? format(item.date.toDate(), 'MMM dd, HH:mm') : 'Recently'} • {item.user || 'System'}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="px-4">View</Button>
              </div>
            )) : (
              <div className="py-12 text-center text-white/20">
                <p className="text-sm font-black uppercase tracking-widest">No recent activity</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-black uppercase tracking-tight mb-8">System Status</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/60">Firebase Auth</span>
              <span className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/60">Firestore DB</span>
              <span className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/60">Cloud Storage</span>
              <span className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
