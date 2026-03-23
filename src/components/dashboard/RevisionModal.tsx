import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, History, AlertCircle } from 'lucide-react';
import { revisionsService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  projectTitle: string;
  userId: string;
}

const RevisionModal: React.FC<RevisionModalProps> = ({ 
  isOpen, 
  onClose, 
  requestId, 
  projectTitle,
  userId 
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await revisionsService.create({
        requestId,
        projectTitle,
        userId,
        message: message.trim(),
      });

      // Trigger Email Notification for revision request
      try {
        const { adminService } = await import('@/lib/firebase-services');
        await adminService.emailService.send('revision_requested', {
          clientName: 'Client', // In a real app, you'd get this from the auth store
          projectTitle,
          message: message.trim(),
        });
      } catch (e) {
        console.error('Failed to send revision email:', e);
      }

      toast.success('Revision request sent!');
      setMessage('');
      onClose();
    } catch (error) {
      toast.error('Failed to send revision request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl glass-card bg-black border-white/5 rounded-[3rem] p-10 md:p-12 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-mocha">
                  <History size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Revision Workflow</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight uppercase italic">Request Revision</h3>
                <p className="text-white/30 text-xs font-medium italic">Project: {projectTitle}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-mocha ml-1">Changes Required</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the changes you'd like to see in detail..."
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-mocha/40 transition-all resize-none font-medium placeholder:text-white/10"
                  required
                />
              </div>

              <div className="flex items-center gap-4 p-6 rounded-2xl bg-mocha/5 border border-mocha/10">
                <AlertCircle size={20} className="text-mocha shrink-0" />
                <p className="text-[10px] text-mocha font-bold uppercase tracking-wider leading-relaxed">
                  Our studio lead will review your request and update the project timeline within 24 hours.
                </p>
              </div>

              <Button
                type="submit"
                variant="glow"
                disabled={loading || !message.trim()}
                className="w-full py-6 rounded-2xl group"
              >
                <span className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                  {loading ? 'Submitting...' : 'Send Revision Request'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RevisionModal;
