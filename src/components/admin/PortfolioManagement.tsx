import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Link as LinkIcon,
  X
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CATEGORIES = ['Web Development', 'Video Editing', 'Graphics', 'Other'];

export const PortfolioManagement = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    image: '',
    description: '',
    tech: '',
    link: '',
    client: ''
  });

  useEffect(() => {
    const unsubscribe = adminService.getAllProjects((data) => {
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Paginated Projects
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Please provide an image URL');
      return;
    }

    const submitToast = toast.loading(editingProject ? 'Updating project...' : 'Adding project...');
    try {
      if (editingProject) {
        await adminService.updateProject(editingProject.id, formData);
        toast.success('Project updated successfully', { id: submitToast });
      } else {
        await adminService.addProject(formData);
        toast.success('Project added successfully', { id: submitToast });
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Operation failed', { id: submitToast });
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({ 
      title: '', 
      category: CATEGORIES[0], 
      image: '', 
      description: '', 
      tech: '',
      link: '',
      client: ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
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
        <div className="space-y-1">
          <h2 className="text-3xl font-black uppercase tracking-tight">Portfolio</h2>
          <p className="text-white/40 text-sm">Manage your dynamic project showcase</p>
        </div>
        <Button variant="glow" size="sm" onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}>
          <Plus size={16} className="mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-[300px] bg-white/5 rounded-[2.5rem] animate-pulse" />
          ))
        ) : paginatedProjects.length > 0 ? (
          paginatedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="group relative h-[300px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/5 hover:border-mocha/20 transition-all"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-mocha mb-2">{project.category}</span>
                <h3 className="text-xl font-black text-white mb-4 line-clamp-1">{project.title}</h3>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 py-3 text-[10px]"
                    onClick={() => {
                      setEditingProject(project);
                      setFormData({
                        title: project.title,
                        category: project.category,
                        image: project.image,
                        description: project.description || '',
                        tech: project.tech || '',
                        link: project.link || '',
                        client: project.client || ''
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 size={14} className="mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="py-3 px-4 hover:bg-red-500/10 hover:text-red-500"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-white/20 font-black uppercase tracking-[0.3em]">
            No projects in portfolio
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 flex items-center justify-between">
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="p-8 space-y-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                    {editingProject ? 'Edit' : 'Add New'} <span className="text-mocha">Project</span>
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Project Title</label>
                      <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Modern Minimal Branding" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Category</label>
                      <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none transition-all appearance-none">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Description</label>
                    <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the project goals and outcome..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none resize-none transition-all" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Tools / Tech (comma separated)</label>
                      <input value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} placeholder="e.g. Photoshop, React, Premiere" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Client Name (Optional)</label>
                      <input value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} placeholder="e.g. Venture Labs" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Project Link (Optional)</label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-mocha/40 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Project Image URL</label>
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input 
                        required 
                        value={formData.image} 
                        onChange={e => setFormData({...formData, image: e.target.value})} 
                        placeholder="https://images.unsplash.com/..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-mocha/40 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  {formData.image && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Preview</label>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/0a0a0a/white?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button variant="glow" className="flex-1" type="submit">
                      {editingProject ? 'Update Project' : 'Publish Project'}
                    </Button>
                    <Button variant="ghost" className="px-8" type="button" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
