import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const RevisionsManagement = () => {
  const [revisions, setRevisions] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [selectedRevision, setSelectedRevision] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = adminService.getAllRevisions((data) => {
      setRevisions(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: string, userId: string, projectTitle: string, userName: string) => {
    try {
      await adminService.updateRevisionStatus(id, status, userId, projectTitle);
      
      // Trigger Email Notification for revision status update
      await adminService.emailService.send('status_update', {
        clientName: userName,
        requestId: id,
        projectName: projectTitle,
        newStatus: status,
      });

      toast.success('Revision status updated');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black uppercase tracking-tight">Revisions</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Project</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Details</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Date</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {revisions.map((rev) => (
              <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-white uppercase">{rev.projectTitle}</p>
                  <p className="text-[10px] text-white/30">ID: {rev.id.slice(0,8)}</p>
                </td>
                <td className="px-8 py-6 max-w-xs">
                  <p className="text-xs text-white/60 truncate">{rev.description || rev.message}</p>
                </td>
                <td className="px-8 py-6 text-sm text-white/60">
                  {rev.createdAt ? format(rev.createdAt.toDate(), 'MMM dd, yyyy') : 'N/A'}
                </td>
                <td className="px-8 py-6">
                  <select 
                    value={rev.status}
                    onChange={(e) => handleStatusUpdate(rev.id, e.target.value, rev.userId, rev.projectTitle, rev.userName || 'Client')}
                    className="bg-black border border-white/10 rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white/60 focus:outline-none focus:border-mocha/40"
                  >
                    <option value="requested">Requested</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="px-8 py-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRevision(rev)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedRevision && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRevision(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase italic">Revision Details</h3>
                <button onClick={() => setSelectedRevision(null)} className="text-white/40 hover:text-white"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Project</p>
                  <p className="text-sm font-bold text-white uppercase">{selectedRevision.projectTitle}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Request Details</p>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{selectedRevision.description}</p>
                  </div>
                </div>
                {selectedRevision.referenceLinks && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Reference Links</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRevision.referenceLinks.split(',').map((link: string, i: number) => (
                        <a key={i} href={link.trim()} target="_blank" rel="noreferrer" className="text-[10px] text-mocha hover:underline">
                          Link {i + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <Button variant="ghost" className="w-full" onClick={() => setSelectedRevision(null)}>Close</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
