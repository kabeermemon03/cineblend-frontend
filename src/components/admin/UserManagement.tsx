import { useState, useEffect } from 'react';
import { 
  Search,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const unsubscribe = adminService.getAllUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRoleToggle = async (uid: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'client' : 'admin';
    try {
      await adminService.updateUserRole(uid, newRole as any);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action is irreversible.')) return;
    try {
      await adminService.deleteUser(uid);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.displayName?.toLowerCase().includes(search.toLowerCase()) || 
                          u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ? true : u.role === filter;
    return matchesSearch && matchesFilter;
  });

  // Paginated Users
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl font-black uppercase tracking-tight">User Management</h2>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-xs text-white focus:outline-none focus:border-mocha/40 transition-all"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 focus:outline-none focus:border-mocha/40"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="client">Clients</option>
          </select>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">User</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Role</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Joined</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-white/20 font-black uppercase tracking-widest text-xs italic">
                    Loading users...
                  </td>
                </tr>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}`} 
                          alt="" 
                          className="w-10 h-10 rounded-full border border-white/10 object-cover" 
                          loading="lazy"
                        />
                        <div>
                          <p className="text-sm font-bold text-white">{u.displayName}</p>
                          <p className="text-[10px] text-white/30">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                        u.role === 'admin' ? "bg-mocha/10 text-mocha border-mocha/20" : "bg-white/5 text-white/40 border-white/10"
                      )}>
                        {u.role || 'client'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      {u.createdAt ? format(u.createdAt.toDate(), 'MMM dd, yyyy') : 'Recently'}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRoleToggle(u.id, u.role || 'client')}
                          className="p-3"
                        >
                          {u.role === 'admin' ? <UserX size={16} /> : <UserCheck size={16} />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-3 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-white/20 font-black uppercase tracking-widest text-xs italic">
                    No users found
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
    </div>
  );
};
