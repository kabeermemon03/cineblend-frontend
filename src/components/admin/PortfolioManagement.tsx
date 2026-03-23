import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const PortfolioManagement = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    tech: ''
  });

  useEffect(() => {
    const unsubscribe = adminService.getAllProjects((data) => {
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await adminService.updateProject(editingProject.id, formData);
        toast.success('Project updated');
      } else {
        await adminService.addProject(formData);
        toast.success('Project added');
      }
      setIsModalOpen(false);
      setEditingProject(null);
      setFormData({ title: '', category: '', image: '', description: '', tech: '' });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete project?')) return;
    try {
      await adminService.deleteProject(id);
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-tight">Portfolio</h2>
        <Button variant="glow" size="sm" onClick={() => {
          setEditingProject(null);
          setFormData({ title: '', category: '', image: '', description: '', tech: '' });
          setIsModalOpen(true);
        }}>
          <Plus size={16} className="mr-2" />
          Add Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -5 }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden group"
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button variant="ghost" size="sm" className="bg-white/10 backdrop-blur-md" onClick={() => {
                  setEditingProject(project);
                  setFormData({
                    title: project.title,
                    category: project.category,
                    image: project.image,
                    description: project.description || '',
                    tech: project.tech || ''
                  });
                  setIsModalOpen(true);
                }}>
                  <Edit2 size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="bg-red-500/20 backdrop-blur-md text-red-500" onClick={() => handleDelete(project.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-black text-mocha uppercase tracking-widest mb-1">{project.category}</p>
              <h4 className="text-lg font-black text-white uppercase truncate">{project.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <h3 className="text-xl font-black uppercase italic">{editingProject ? 'Edit Project' : 'Add Project'}</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Category</label>
                    <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Image URL</label>
                    <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Description</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none resize-none" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="glow" className="flex-1" type="submit">Save Project</Button>
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
