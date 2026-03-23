import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock, AlertCircle, Info } from 'lucide-react';
import { notificationService } from '@/lib/firebase-services';
import { useAuthStore } from '@/store/authStore';
import { formatDistanceToNow } from 'date-fns';

const NotificationSystem = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    // Real-time unread count
    const unsubscribeCount = notificationService.getUnreadCount(user.uid, setUnreadCount);
    
    // Real-time notifications
    const unsubscribeNotifications = notificationService.getUserNotifications(user.uid, setNotifications);

    return () => {
      unsubscribeCount();
      unsubscribeNotifications();
    };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="text-emerald-500" size={16} />;
      case 'warning': return <AlertCircle className="text-amber-500" size={16} />;
      case 'error': return <AlertCircle className="text-rose-500" size={16} />;
      default: return <Info className="text-mocha" size={16} />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-mocha/40 transition-all group"
      >
        <Bell size={20} className="group-hover:rotate-12 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-mocha text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-black animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-80 md:w-96 glass-card bg-black/90 backdrop-blur-3xl border-white/5 rounded-3xl overflow-hidden z-[100] shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Notifications</h3>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                      className={`p-6 hover:bg-white/[0.02] transition-colors cursor-pointer relative group ${!notif.read ? 'bg-white/[0.01]' : ''}`}
                    >
                      {!notif.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-mocha" />
                      )}
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          {getIcon(notif.type)}
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-sm font-bold tracking-tight ${!notif.read ? 'text-white' : 'text-white/60'}`}>
                            {notif.title}
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed font-medium">
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-2 pt-1 text-[10px] font-black uppercase tracking-widest text-white/20">
                            <Clock size={10} />
                            {notif.timestamp ? formatDistanceToNow(notif.timestamp.toDate(), { addSuffix: true }) : 'just now'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/10">
                    <Bell size={32} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/20">All caught up!</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 bg-white/[0.02] text-center">
                <button className="text-[10px] font-black uppercase tracking-widest text-mocha hover:text-mocha-light transition-colors">
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
