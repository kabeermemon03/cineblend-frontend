import { useEffect, useState, memo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import teamService, { TeamMember } from '@/lib/team-service';
import Button from '@/components/ui/Button';
import BorderGlow from '@/components/ui/BorderGlow';

const TeamProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await teamService.getById(id);
        if (data) {
          setMember(data);
        } else {
          setError("Member not found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-mocha/20 border-t-mocha rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6 px-6">
        <div className="p-10 rounded-[2rem] bg-red-500/5 border border-red-500/10 backdrop-blur-md text-center max-w-md">
          <p className="text-red-400 font-black uppercase tracking-widest text-xs mb-2">Error</p>
          <p className="text-white/40 font-medium">{error || "Member profile not found"}</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/about')} className="rounded-full px-8">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Team
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black selection:bg-mocha selection:text-white pb-32">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-mocha/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-32 relative z-10">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/about" className="inline-flex items-center space-x-2 text-white/30 hover:text-mocha transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Collective</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <BorderGlow 
              className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white/5 p-4 backdrop-blur-2xl border border-white/5 shadow-2xl"
              glowColor="rgba(150, 105, 76, 0.2)"
            >
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden">
                <img 
                  src={member.imgURL} 
                  alt={member.name}
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                />
              </div>
            </BorderGlow>
          </motion.div>

          {/* Right: Info */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-mocha/10 border border-mocha/20 text-mocha"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">{member.role}</span>
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                  {member.name}
                </h1>
              </div>

              <div className="flex items-center space-x-6">
                {member.socialLinks?.twitter && (
                  <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                    <Twitter size={20} />
                  </a>
                )}
                {member.socialLinks?.linkedin && (
                  <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                    <Linkedin size={20} />
                  </a>
                )}
                {member.socialLinks?.github && (
                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/15">Biography</h3>
                <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium">
                  {member.bio || `${member.name} is a key member of the CineBlend Studios collective, bringing expertise and visionary thinking to every project.`}
                </p>
              </div>

              {/* Stats or extra info could go here */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-mocha">Expertise</p>
                  <p className="text-white font-bold">{member.role.split(' ')[0]}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-mocha">Location</p>
                  <p className="text-white font-bold">Remote / Global</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-mocha">Status</p>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-white font-bold uppercase text-[10px]">Available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <Link to="/contact">
                <Button variant="glow" size="lg" className="px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-widest group">
                  Work with {member.name.split(' ')[0]}
                  <Globe className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(TeamProfile);