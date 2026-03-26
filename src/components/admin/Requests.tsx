import { useState, useEffect } from 'react';
import { 
  Search,
  X
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Paginated Requests
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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

      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
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
                  <td colSpan={6} className="px-8 py-12 text-center text-white/20 font-black uppercase tracking-widest text-xs italic">
                    Loading requests...
                  </td>
                </tr>
              ) : paginatedRequests.length > 0 ? (
                paginatedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-mocha/20 flex items-center justify-center text-mocha font-black text-xs">
                          {req.userName?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{req.userName || 'Anonymous'}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">{req.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{req.serviceType}</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">{req.projectScope || 'Standard'}</p>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-mocha tracking-tighter">
                      {req.budget || 'Custom'}
                    </td>
                    <td className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      {req.deadline || 'Flexible'}
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border",
                        req.status === 'completed' || req.status === 'delivered' 
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : req.status === 'pending'
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-mocha/10 text-mocha border-mocha/20"
                      )}>
                        {req.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedRequest(req)}
                        className="text-[9px] font-black uppercase tracking-widest py-2 px-4"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-white/20 font-black uppercase tracking-widest text-xs italic">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between bg-black/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 border-white/5 text-[10px]"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 border-white/5 text-[10px]"
              >
                Next
              </Button>
            </div>
          </div>
        )}
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
