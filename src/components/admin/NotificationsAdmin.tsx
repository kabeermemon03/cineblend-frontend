import { useState, useEffect } from 'react';
import { 
  Send
} from 'lucide-react';
import { adminService, notificationService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export const NotificationsAdmin = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [targetType, setTargetType] = useState<'all' | 'specific'>('all');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = adminService.getAllUsers((data) => {
      setUsers(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!title || !message) return toast.error('Please fill all fields');
    if (targetType === 'specific' && !selectedUser) return toast.error('Please select a user');
    
    setLoading(true);
    try {
      if (targetType === 'all') {
        await notificationService.sendToAll(title, message);
        toast.success('Broadcast sent successfully');
      } else {
        await notificationService.create(selectedUser, title, message);
        toast.success('Notification sent to user');
      }
      setTitle('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="text-3xl font-black uppercase tracking-tight">Send Notifications</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-6">
        <div className="flex gap-4 p-1 bg-white/5 rounded-2xl">
          <button 
            onClick={() => setTargetType('all')}
            className={cn(
              "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
              targetType === 'all' ? "bg-mocha text-white" : "text-white/40 hover:text-white"
            )}
          >
            All Users
          </button>
          <button 
            onClick={() => setTargetType('specific')}
            className={cn(
              "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
              targetType === 'specific' ? "bg-mocha text-white" : "text-white/40 hover:text-white"
            )}
          >
            Specific User
          </button>
        </div>

        {targetType === 'specific' && (
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Select User</label>
            <select 
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-mocha/40 outline-none transition-all"
            >
              <option value="">Choose a user...</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.displayName} ({u.email})</option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Notification Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Important Update"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-mocha/40 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-mocha/40 outline-none transition-all resize-none"
          />
        </div>
        <Button 
          variant="glow" 
          className="w-full" 
          onClick={handleSend}
          isLoading={loading}
        >
          <Send size={18} className="mr-2" />
          {targetType === 'all' ? 'Broadcast to All Users' : 'Send to User'}
        </Button>
      </div>
    </div>
  );
};
