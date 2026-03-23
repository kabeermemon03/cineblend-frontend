import React, { useState, useEffect } from 'react';
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
  const [, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

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

      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden overflow-x-auto">
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
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}`} alt="" className="w-10 h-10 rounded-full border border-white/10" />
                    <div>
                      <p className="text-sm font-bold text-white">{u.displayName}</p>
                      <p className="text-[10px] text-white/30">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    u.role === 'admin' ? "bg-mocha/20 text-mocha" : "bg-white/5 text-white/40"
                  )}>
                    {u.role || 'client'}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm text-white/60">
                  {u.createdAt ? format(u.createdAt.toDate(), 'MMM dd, yyyy') : 'N/A'}
                </td>
                <td className="px-8 py-6">
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRoleToggle(u.id, u.role || 'client')}
                      className="px-4"
                    >
                      {u.role === 'admin' ? <UserX size={14} className="mr-2" /> : <UserCheck size={14} className="mr-2" />}
                      {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteUser(u.id)}
                      className="px-4 text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
