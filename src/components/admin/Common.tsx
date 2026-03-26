import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SidebarItem = memo(({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group relative overflow-hidden",
      active 
        ? "bg-mocha text-white shadow-[0_10px_30px_-10px_rgba(183,148,110,0.4)]" 
        : "text-white/40 hover:text-white hover:bg-white/5"
    )}
  >
    {active && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute inset-0 bg-mocha"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <Icon size={20} className={cn("relative z-10 transition-all duration-500", active ? "text-white scale-110" : "text-white/40 group-hover:text-white group-hover:scale-110")} />
    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
));

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: string;
}

export const StatCard = memo(({ label, value, icon: Icon, trend, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group"
  >
    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-30", color)} />
    <div className="relative z-10 flex justify-between items-start">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{label}</p>
          <h3 className="text-4xl font-black text-white mt-1 tracking-tighter">{value}</h3>
        </div>
        {trend && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-mocha">
            <TrendingUp size={12} />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
));
