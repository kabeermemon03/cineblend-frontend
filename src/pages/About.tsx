import { memo, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Camera, 
  Palette, 
  Layout, 
  Code, 
  Zap, 
  ArrowRight,
  Globe,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Button from '@/components/ui/Button';
import LogoLoop from '@/components/ui/LogoLoop';
import BorderGlow from '@/components/ui/BorderGlow';
import { cn } from '@/lib/utils';

// Lazy Load Team Section
const TeamSection = lazy(() => import('@/sections/About/TeamSection'));

// ✅ Animation Variants - Minimal & Smooth
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

// Section Header
const SectionHeader = memo(({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) => (
  <div className={cn("space-y-4 mb-16", className)}>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.4em]">{subtitle}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.85]"
    >
      {title}
    </motion.h2>
  </div>
));

// Loading Placeholder
const TeamSkeleton = () => (
  <div className="py-20 flex flex-col items-center justify-center space-y-8">
    <div className="w-12 h-12 border-2 border-mocha/20 border-t-mocha rounded-full animate-spin" />
    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Loading Collective...</span>
  </div>
);

// ✅ Hero Section - High-End Agency Identity
const Hero = memo(() => (
  <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
    {/* Subtle Background Elements (Absolute, not fixed) */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-mocha/5 blur-3xl opacity-20 rounded-full translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-[20%] left-0 w-[40vw] h-[40vh] bg-purple-dark/5 blur-3xl opacity-20 rounded-full -translate-x-1/4" />
    </div>

    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-3/5 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-mocha/5 border border-mocha/10 text-mocha/80">
              <div className="w-1.5 h-1.5 rounded-full bg-mocha animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cinematic Heritage</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] text-white">
              Redefining <br />
              <span className="text-mocha">The Frame</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl font-medium">
              CineBlend Studios is a premium creative agency dedicated to the intersection of 
              high-fidelity cinematic artistry and modern digital engineering. We offer 
              <span className="text-white/60"> Video Editing</span>, 
              <span className="text-white/60"> Photo Editing</span>, 
              <span className="text-white/60"> Graphic Design</span>, 
              <span className="text-white/60"> Logo Design</span>, and 
              <span className="text-white/60"> Web Development</span>.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/request-cinebit">
                <Button variant="glow" size="lg" className="px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl">
                  Request a CineBit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:w-2/5 relative"
        >
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl relative group bg-white/5">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
              alt="CineBlend Agency"
              className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

// ✅ Who We Are - Compact & Clean
const WhoWeAre = memo(() => (
  <section className="relative py-32 bg-white/[0.005] border-y border-white/5">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <SectionHeader title="The Collective" subtitle="Who We Are" className="mb-8" />
          <p className="text-lg text-white/40 leading-relaxed font-medium">
            Born from a passion for storytelling and a drive for technical perfection, 
            CineBlend Studios is a collective of visionaries, artists, and engineers. 
            We don't just create content; we build digital legacies that resonate.
          </p>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-2">
              <h4 className="text-4xl font-black text-white tracking-tighter">50+</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mocha">Projects Delivered</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-black text-white tracking-tighter">25+</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mocha">Happy Clients</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5">
              <img loading="lazy" src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5">
              <img loading="lazy" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

// ✅ What We Do - Service Highlights
const WhatWeDo = memo(() => (
  <section className="py-32 relative overflow-hidden">
    <div className="container mx-auto px-6 md:px-12">
      <SectionHeader title="Premium Services" subtitle="What We Do" className="text-center" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Video Editing", icon: Video, color: "text-mocha" },
          { title: "Photo Editing", icon: Camera, color: "text-purple-light" },
          { title: "Graphic Design", icon: Palette, color: "text-blue-brand" },
          { title: "Logo Design", icon: Layout, color: "text-mocha" },
          { title: "Web Development", icon: Code, color: "text-purple-light" },
          { title: "Visual Identity", icon: Sparkles, color: "text-blue-brand" }
        ].map((service, i) => (
          <motion.div
            key={service.title}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: i * 0.05 }}
            className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-mocha/20 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <service.icon className={cn("w-8 h-8", service.color)} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-4">{service.title}</h3>
            <p className="text-sm text-white/30 leading-relaxed font-medium group-hover:text-white/50 transition-colors">
              High-fidelity solutions tailored to your brand's unique narrative and vision.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

// ✅ Why Choose Us - Optimized BorderGlow
const WhyChooseUs = memo(() => (
  <section className="py-32 relative bg-white/[0.005] border-y border-white/5">
    <div className="container mx-auto px-6 md:px-12">
      <SectionHeader title="The Studio Edge" subtitle="Why Choose Us" className="text-center" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {[
          { 
            title: "Elite Quality", 
            icon: ShieldCheck, 
            text: "We maintain uncompromising standards of quality in every frame and every line of code.",
            glow: "rgba(150, 105, 76, 0.15)"
          },
          { 
            title: "Unmatched Creativity", 
            icon: Zap, 
            text: "Our visionaries push boundaries to deliver unique, high-impact digital experiences.",
            glow: "rgba(168, 85, 247, 0.15)"
          },
          { 
            title: "Global Expertise", 
            icon: Globe, 
            text: "We leverage modern technologies to build scalable solutions for a global audience.",
            glow: "rgba(59, 130, 246, 0.15)"
          }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
            className="group"
          >
            <BorderGlow 
              className="p-10 space-y-8 h-full bg-black/40 backdrop-blur-sm" 
              glowColor={item.glow}
              duration={3} // Only animates on hover
            >
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-500">
                <item.icon className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{item.title}</h3>
                <p className="text-base text-white/30 leading-relaxed font-medium group-hover:text-white/50 transition-colors">
                  {item.text}
                </p>
              </div>
            </BorderGlow>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const About = () => {
  return (
    <div className="relative w-full bg-black selection:bg-mocha selection:text-white overflow-x-hidden">
      <div className="relative z-10">
        {/* 1. HERO */}
        <Hero />

        {/* 2. TRUSTED TOOLS */}
        <LogoLoop 
          speed={40} 
          title="Our Production Toolkit" 
          subtitle="A high-fidelity arsenal of industry-standard tools and modern frameworks designed for excellence."
        />

        {/* 3. WHO WE ARE */}
        <WhoWeAre />

        {/* 4. WHAT WE DO */}
        <WhatWeDo />

        {/* 5. WHY CHOOSE US */}
        <WhyChooseUs />

        {/* 6. TEAM SECTION */}
        <Suspense fallback={<TeamSkeleton />}>
          <TeamSection />
        </Suspense>

        {/* 7. FINAL CTA */}
        <section className="relative z-10 py-40 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <div className="max-w-4xl mx-auto space-y-12">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.8]">
                Ready to <span className="text-mocha">Innovate?</span>
              </h2>
              <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
                Join the ranks of elite creators who have transformed their digital 
                presence with CineBlend Studios.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Link to="/request-cinebit">
                  <Button variant="glow" size="lg" className="px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl group">
                    Request a CineBit
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="px-12 py-6 rounded-2xl border-white/10 text-white/40 hover:text-white transition-all">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(About);
