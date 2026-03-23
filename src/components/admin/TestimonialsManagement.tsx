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

export const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    service: '',
    message: '',
    image: ''
  });

  useEffect(() => {
    const unsubscribe = adminService.getAllTestimonials((data) => {
      setTestimonials(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await adminService.updateTestimonial(editingTestimonial.id, formData);
        toast.success('Testimonial saved');
      } else {
        await adminService.addTestimonial(formData);
        toast.success('Testimonial added');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      await adminService.deleteTestimonial(id);
      toast.success('Deleted');
    } catch (error) {
      toast.error('Failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-tight">Testimonials</h2>
        <Button variant="glow" size="sm" onClick={() => {
          setEditingTestimonial(null);
          setFormData({ name: '', role: '', service: '', message: '', image: '' });
          setIsModalOpen(true);
        }}>
          <Plus size={16} className="mr-2" />
          Add New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex gap-6 items-start group">
            <img src={t.image} alt="" className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <h4 className="font-black text-white uppercase">{t.name}</h4>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white/20 hover:text-white" onClick={() => {
                    setEditingTestimonial(t);
                    setFormData({ name: t.name, role: t.role, service: t.service, message: t.message, image: t.image });
                    setIsModalOpen(true);
                  }}><Edit2 size={14} /></button>
                  <button className="text-white/20 hover:text-red-500" onClick={() => handleDelete(t.id)}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-[10px] font-black text-mocha uppercase tracking-widest">{t.role} • {t.service}</p>
              <p className="text-sm text-white/60 italic leading-relaxed">"{t.message}"</p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <h3 className="text-xl font-black uppercase italic">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Client Name</label>
                      <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Role/Company</label>
                      <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Service Used</label>
                    <input required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Image URL</label>
                    <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-mocha/40 outline-none resize-none" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="glow" className="flex-1" type="submit">Save Testimonial</Button>
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
