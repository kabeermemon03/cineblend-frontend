import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import teamService, { TeamMember } from '@/lib/team-service';
import { cn } from '@/lib/utils';
import BorderGlow from '@/components/ui/BorderGlow';

// ✅ Skeleton Loader
const TeamCardSkeleton = ({ isFounder = false }: { isFounder?: boolean }) => (
  <div className={cn("group relative text-center", isFounder ? "max-w-md mx-auto" : "")}>
    <div className={cn(
      "aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/5 mb-8 animate-pulse",
      isFounder ? "rounded-[3rem]" : ""
    )} />
    <div className="space-y-4">
      <div className="h-8 w-3/4 mx-auto bg-white/5 rounded-full animate-pulse" />
      <div className="h-4 w-1/2 mx-auto bg-white/5 rounded-full animate-pulse" />
    </div>
  </div>
);

// ✅ Redesigned Team Card
const TeamCard = memo(({ member, delay, isFounder = false }: { member: TeamMember; delay: number; isFounder?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={cn("group relative", isFounder ? "max-w-md mx-auto" : "")}
  >
    <Link to={`/team/${member.id}`} className="block">
      <BorderGlow 
        className={cn(
          "relative overflow-hidden bg-white/5 backdrop-blur-xl transition-all duration-500",
          isFounder ? "rounded-[3rem] p-4" : "rounded-[2rem] p-3",
          "hover:scale-105 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(150,105,76,0.15)]"
        )}
        glowColor="rgba(150, 105, 76, 0.3)"
        duration={3}
      >
        <div className={cn(
          "aspect-[4/5] overflow-hidden relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.05]",
          isFounder ? "rounded-[2.5rem]" : "rounded-2xl"
        )}>
          <img
            loading="lazy"
            src={member.imgURL}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          {/* Subtle Mocha Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        </div>

        <div className="pt-8 pb-4 text-center space-y-2 relative z-10">
          <h4 className={cn(
            "font-black text-white tracking-tighter uppercase transition-colors duration-300 group-hover:text-mocha",
            isFounder ? "text-3xl md:text-4xl" : "text-2xl"
          )}>
            {member.name}
          </h4>
          <p className={cn(
            "font-black uppercase tracking-[0.4em] text-white/30",
            isFounder ? "text-xs" : "text-[9px]"
          )}>
            {member.role}
          </p>
        </div>
      </BorderGlow>
    </Link>
  </motion.div>
));

const TeamSection = () => {
  const [founders, setFounders] = useState<TeamMember[]>([]);
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [foundersData, coreTeamData] = await Promise.all([
          teamService.getFounders(),
          teamService.getCoreTeam()
        ]);
        setFounders(foundersData);
        setCoreTeam(coreTeamData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="p-10 rounded-[2rem] bg-red-500/5 border border-red-500/10 backdrop-blur-md max-w-2xl mx-auto">
            <p className="text-red-400 font-black uppercase tracking-widest text-xs mb-2">System Error</p>
            <p className="text-white/40 font-medium">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 py-32 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        {/* Founders Section */}
        <div className="mb-32">
          <div className="space-y-4 mb-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-mocha/10 border border-mocha/20 text-mocha backdrop-blur-md"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Founders</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.85]"
            >
              The Visionaries
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => <TeamCardSkeleton key={i} isFounder />)
            ) : (
              founders.map((member, i) => (
                <TeamCard key={member.id} member={member} delay={i * 0.1} isFounder />
              ))
            )}
          </div>
        </div>

        {/* Core Team Section */}
        <div>
          <div className="space-y-4 mb-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 backdrop-blur-md"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Team</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-[0.85]"
            >
              The Core Collective
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <TeamCardSkeleton key={i} />)
            ) : (
              coreTeam.map((member, i) => (
                <TeamCard key={member.id} member={member} delay={i * 0.1} />
              ))
            )}
            
            {!loading && coreTeam.length === 0 && (
              <div className="col-span-full text-center p-20 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
                <p className="text-white/40 font-medium italic">Our team is growing. New visionaries joining soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TeamSection);
