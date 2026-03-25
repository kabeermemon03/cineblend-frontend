import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const TeamMemberCard = ({ member, onEdit, onDelete }: any) => (
  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4 group">
    <div className="flex gap-4 items-center">
      <img src={member.imgURL} alt="" className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
      <div className="flex-1 overflow-hidden">
        <h4 className="font-black text-white uppercase truncate">{member.name}</h4>
        <p className="text-[10px] font-black text-mocha uppercase tracking-widest">{member.role}</p>
        {member.isFounder && (
          <span className="text-[8px] font-black bg-mocha/20 text-mocha px-2 py-0.5 rounded-full uppercase">Founder</span>
        )}
      </div>
    </div>
    <p className="text-xs text-white/40 line-clamp-2">{member.bio}</p>
    <div className="flex gap-2 pt-2">
      <Button variant="ghost" size="sm" className="flex-1" onClick={onEdit}>Edit</Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-red-500 hover:bg-red-500/10"
        onClick={onDelete}
      >
        <Trash2 size={14} />
      </Button>
    </div>
  </div>
);

export const TeamManagement = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    imgURL: '',
    isFounder: false
  });

  useEffect(() => {
    const unsubscribe = adminService.getAllTeam((data) => {
      setTeam(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await adminService.updateTeamMember(editingMember.id, formData, formData.isFounder);
        toast.success('Member updated');
      } else {
        await adminService.addTeamMember(formData, formData.isFounder);
        toast.success('Member added');
      }
      setIsModalOpen(false);
      setEditingMember(null);
      setFormData({ name: '', role: '', bio: '', imgURL: '', isFounder: false });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete member?')) return;
    try {
      await adminService.deleteTeamMember(id, team.find(m => m.id === id)?.isFounder ?? false);
      toast.success('Member removed');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const founders = team.filter(m => m.isFounder);
  const coreTeam = team.filter(m => !m.isFounder);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-tight">Team Management</h2>
        <Button variant="glow" size="sm" onClick={() => {
          setEditingMember(null);
          setFormData({ name: '', role: '', bio: '', imgURL: '', isFounder: false });
          setIsModalOpen(true);
        }}>
          <Plus size={16} className="mr-2" />
          Add Member
        </Button>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-mocha mb-6">Founders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((m) => (
              <TeamMemberCard key={m.id} member={m} onEdit={() => {
                setEditingMember(m);
                setFormData({ name: m.name, role: m.role, bio: m.bio, imgURL: m.imgURL, isFounder: true });
                setIsModalOpen(true);
              }} onDelete={() => handleDelete(m.id)} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Other Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((m) => (
              <TeamMemberCard key={m.id} member={m} onEdit={() => {
                setEditingMember(m);
                setFormData({ name: m.name, role: m.role, bio: m.bio, imgURL: m.imgURL, isFounder: false });
                setIsModalOpen(true);
              }} onDelete={() => handleDelete(m.id)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase italic">{editingMember ? 'Edit Member' : 'Add Member'}</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Role</label>
                    <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Image URL</label>
                    <input required value={formData.imgURL} onChange={e => setFormData({...formData, imgURL: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="flex items-center gap-3 ml-2">
                    <input type="checkbox" checked={formData.isFounder} onChange={e => setFormData({...formData, isFounder: e.target.checked})} className="w-4 h-4 rounded bg-white/5 border-white/10 text-mocha focus:ring-mocha" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Is Founder?</label>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Bio</label>
                    <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none resize-none" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="glow" className="flex-1" type="submit">Save Member</Button>
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
