import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Trash2,
  Edit2,
  Search,
  RotateCcw,
  X,
  FileText
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const DeliverablesManagement = () => {
  const [deliverables, setDeliverables] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeliverable, setEditingDeliverable] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    userId: '',
    projectTitle: '',
    fileUrl: '',
    fileName: '',
    status: 'delivered'
  });

  useEffect(() => {
    const unsubscribeDeliverables = adminService.getAllDeliverables((data) => {
      setDeliverables(data);
      setLoading(false);
    });
    const unsubscribeUsers = adminService.getAllUsers((data) => {
      setUsers(data);
    });
    return () => {
      unsubscribeDeliverables();
      unsubscribeUsers();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDeliverable) {
        await adminService.updateDeliverable(editingDeliverable.id, formData);
        toast.success('Deliverable updated');
      } else {
        await adminService.addDeliverable(formData);
        toast.success('Deliverable added');
      }
      setIsModalOpen(false);
      setEditingDeliverable(null);
      setFormData({ userId: '', projectTitle: '', fileUrl: '', fileName: '', status: 'delivered' });
    } catch (error) {
      toast.error('Failed to save deliverable');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this deliverable?')) return;
    try {
      await adminService.deleteDeliverable(id);
      toast.success('Deliverable deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const filteredDeliverables = deliverables.filter(d => 
    d.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl font-black uppercase tracking-tight">Deliverables</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search deliverables..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-xs text-white focus:outline-none focus:border-mocha/40 transition-all"
            />
          </div>
          <Button variant="glow" size="sm" onClick={() => {
            setEditingDeliverable(null);
            setFormData({ userId: '', projectTitle: '', fileUrl: '', fileName: '', status: 'delivered' });
            setIsModalOpen(true);
          }}>
            <Plus size={16} className="mr-2" />
            New
          </Button>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">File</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Project</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">User</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Date</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-8 py-24 text-center">
                  <RotateCcw className="animate-spin text-mocha mx-auto mb-4" size={24} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Loading deliverables...</p>
                </td>
              </tr>
            ) : filteredDeliverables.map((d) => (
              <tr key={d.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white truncate max-w-[200px]">{d.fileName}</p>
                      <a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-[10px] text-mocha hover:underline">Download</a>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-white/60 uppercase">{d.projectTitle}</span>
                </td>
                <td className="px-8 py-6 text-sm text-white/40">
                  {users.find(u => u.id === d.userId)?.displayName || 'Unknown User'}
                </td>
                <td className="px-8 py-6 text-sm text-white/40">
                  {d.createdAt ? format(d.createdAt.toDate(), 'MMM dd, yyyy') : 'Recently'}
                </td>
                <td className="px-8 py-6">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => {
                      setEditingDeliverable(d);
                      setFormData({
                        userId: d.userId,
                        projectTitle: d.projectTitle,
                        fileUrl: d.fileUrl,
                        fileName: d.fileName,
                        status: d.status
                      });
                      setIsModalOpen(true);
                    }}>
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(d.id)} className="text-red-500 hover:bg-red-500/10">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase italic">{editingDeliverable ? 'Edit Deliverable' : 'Add Deliverable'}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Client</label>
                    <select required value={formData.userId} onChange={e => setFormData({...formData, userId: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none">
                      <option value="">Select a client...</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>{u.displayName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Project Title</label>
                    <input required value={formData.projectTitle} onChange={e => setFormData({...formData, projectTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">File Name</label>
                    <input required value={formData.fileName} onChange={e => setFormData({...formData, fileName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">File URL</label>
                    <input required value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="glow" className="flex-1" type="submit">Save Deliverable</Button>
                  <Button variant="ghost" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
