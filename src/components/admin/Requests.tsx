import React, { useState, useEffect } from 'react';
import { 
  Search,
  RotateCcw,
  X
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = adminService.getAllCinebits((data) => {
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: string, userId: string, projectName: string, userName: string) => {
    try {
      await adminService.updateCinebitStatus(id, status, userId, projectName);
      
      // Trigger Email Notification
      await adminService.emailService.send('status_update', {
        clientName: userName,
        requestId: id,
        projectName: projectName,
        newStatus: status,
      });

      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl font-black uppercase tracking-tight">Client Requests</h2>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              placeholder="Search requests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-xs text-white focus:outline-none focus:border-mocha/40 transition-all w-full md:w-64"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs text-white/60 focus:outline-none focus:border-mocha/40 transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="in_progress">In Progress</option>
            <option value="waiting_for_files">Waiting for Files</option>
            <option value="revision_requested">Revision Requested</option>
            <option value="completed">Completed</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Client</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Service</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Budget</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Deadline</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-8 py-24 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <RotateCcw className="animate-spin text-mocha" size={24} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Loading requests...</p>
                  </div>
                </td>
              </tr>
            ) : filteredRequests.length > 0 ? filteredRequests.map((req) => (
              <tr key={req.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-mocha/20 flex items-center justify-center text-mocha font-bold">
                      {req.userName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{req.userName || 'Anonymous'}</p>
                      <p className="text-[10px] text-white/30">{req.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                    {req.serviceType}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-white">{req.budget}</td>
                <td className="px-8 py-6 text-sm text-white/60">{req.deadline}</td>
                <td className="px-8 py-6">
                  <select 
                    value={req.status}
                    onChange={(e) => handleStatusUpdate(req.id, e.target.value, req.userId, req.projectName || req.serviceType, req.userName || 'Anonymous')}
                    className="bg-black border border-white/10 rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white/60 focus:outline-none focus:border-mocha/40"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="in_progress">In Progress</option>
                    <option value="waiting_for_files">Waiting for Files</option>
                    <option value="revision_requested">Revision Requested</option>
                    <option value="completed">Completed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-8 py-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRequest(req)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-8 py-24 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No requests found matching your criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase italic tracking-tight">Request Details</h3>
                <button onClick={() => setSelectedRequest(null)} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Client</p>
                    <p className="text-sm font-bold text-white">{selectedRequest.userName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Service</p>
                    <p className="text-sm font-bold text-white uppercase">{selectedRequest.serviceType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Budget</p>
                    <p className="text-sm font-bold text-mocha">{selectedRequest.budget}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Deadline</p>
                    <p className="text-sm font-bold text-white">{selectedRequest.deadline}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Description / Message</p>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                      {selectedRequest.message || 'No description provided.'}
                    </p>
                  </div>
                </div>

                {selectedRequest.requirements && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Requirements</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.requirements.map((req: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-mocha/10 border border-mocha/20 rounded-full text-[10px] font-bold text-mocha uppercase">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/5 flex gap-4">
                  <Button 
                    variant="glow" 
                    className="flex-1"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, 'approved', selectedRequest.userId, selectedRequest.serviceType, selectedRequest.userName || 'Anonymous');
                      setSelectedRequest(null);
                    }}
                  >
                    Approve Request
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1 text-red-500 hover:bg-red-500/10"
                    onClick={() => setSelectedRequest(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
