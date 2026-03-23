import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Palette, 
  Code, 
  Target, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const Onboarding = () => {
  const { user, setOnboardingStatus } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    serviceInterest: '',
    goal: '',
    budgetRange: '',
    timeline: '',
  });

  const steps = [
    {
      id: 1,
      title: "What's your focus?",
      subtitle: "Select the primary service you're interested in.",
      options: [
        { id: 'video', label: 'Video Production', icon: Video, description: 'Cinematic editing, color grading, and motion graphics.' },
        { id: 'design', label: 'Brand Design', icon: Palette, description: 'Logos, social media kits, and visual identity.' },
        { id: 'web', label: 'Web Development', icon: Code, description: 'Modern, high-performance websites and apps.' },
      ],
      field: 'serviceInterest' as const
    },
    {
      id: 2,
      title: "What's your main goal?",
      subtitle: "Help us understand what you want to achieve.",
      options: [
        { id: 'growth', label: 'Social Growth', icon: TrendingUp, description: 'Increase reach and engagement across platforms.' },
        { id: 'business', label: 'Business Website', icon: Globe, description: 'Professional digital presence for your company.' },
        { id: 'branding', label: 'Elite Branding', icon: Target, description: 'Stand out with a unique and powerful identity.' },
        { id: 'content', label: 'Content Creation', icon: Briefcase, description: 'Consistent, high-quality output for your brand.' },
      ],
      field: 'goal' as const
    },
    {
      id: 3,
      title: "Budget & Timeline",
      subtitle: "Let's align on scope and expectations.",
      isInput: true,
      field: undefined
    }
  ];

  const handleSelect = (field: 'serviceInterest' | 'goal' | undefined, value: string) => {
    if (!field) return;
    setData(prev => ({ ...prev, [field]: value }));
    if (step < 3) setStep(step + 1);
  };

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await userService.updateProfile(user.uid, {
        ...data,
        onboardingCompleted: true,
        updatedAt: new Date()
      });
      setOnboardingStatus(true);
      toast.success('Welcome to the Studio!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save preferences.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-mocha/5 blur-[150px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-purple-dark/10 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full z-10"
      >
        {/* Progress Bar */}
        <div className="flex justify-center gap-3 mb-12">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                step >= i ? 'w-12 bg-mocha' : 'w-6 bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">
                {steps[step-1].title}
              </h1>
              <p className="text-white/40 text-xl font-medium italic">
                {steps[step-1].subtitle}
              </p>
            </div>

            {step < 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {steps[step-1].options?.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(steps[step-1].field, opt.id)}
                    className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-mocha/40 transition-all duration-500 text-left space-y-6"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-mocha group-hover:bg-mocha/10 transition-all duration-500">
                      <opt.icon size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">{opt.label}</h3>
                      <p className="text-sm text-white/30 font-medium leading-relaxed group-hover:text-white/50 transition-colors">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-mocha ml-1">Budget Range</label>
                    <select 
                      value={data.budgetRange}
                      onChange={(e) => setData({...data, budgetRange: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-mocha/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select Range</option>
                      <option value="basic" className="bg-black">$500 - $1,500</option>
                      <option value="standard" className="bg-black">$1,500 - $5,000</option>
                      <option value="premium" className="bg-black">$5,000 - $15,000</option>
                      <option value="enterprise" className="bg-black">$15,000+</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-mocha ml-1">Timeline</label>
                    <select 
                      value={data.timeline}
                      onChange={(e) => setData({...data, timeline: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-mocha/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select Timeline</option>
                      <option value="asap" className="bg-black">ASAP (1-2 weeks)</option>
                      <option value="standard" className="bg-black">Standard (3-6 weeks)</option>
                      <option value="flexible" className="bg-black">Flexible (2+ months)</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleComplete}
                  disabled={loading || !data.budgetRange || !data.timeline}
                  variant="glow"
                  className="w-full py-8 rounded-[2rem] group"
                >
                  <span className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                    {loading ? 'Finalizing...' : 'Enter the Studio'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Back Button */}
        {step > 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setStep(step - 1)}
            className="mt-12 text-white/20 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-colors"
          >
            Go Back
          </motion.button>
        )}
      </motion.div>

      {/* Studio Footer Tag */}
      <div className="absolute bottom-10 flex items-center gap-4 opacity-20 select-none">
        <div className="w-12 h-[1px] bg-white" />
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white">Authorized Access</span>
        <div className="w-12 h-[1px] bg-white" />
      </div>
    </div>
  );
};

export default Onboarding;
