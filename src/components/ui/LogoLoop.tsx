import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Logo {
  id: string;
  url: string;
  name: string;
}

const STATIC_LOGOS: Logo[] = [
  // Frontend
  { id: 'html5', name: 'HTML5', url: 'https://cdn.simpleicons.org/html5/white' },
  { id: 'css3', name: 'CSS3', url: 'https://cdn.simpleicons.org/css3/white' },
  { id: 'javascript', name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/white' },
  { id: 'react', name: 'React', url: 'https://cdn.simpleicons.org/react/white' },
  { id: 'bootstrap', name: 'Bootstrap', url: 'https://cdn.simpleicons.org/bootstrap/white' },
  { id: 'tailwind', name: 'TailwindCSS', url: 'https://cdn.simpleicons.org/tailwindcss/white' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { id: 'express', name: 'Express.js', url: 'https://cdn.simpleicons.org/express/white' },
  { id: 'mongodb', name: 'MongoDB', url: 'https://cdn.simpleicons.org/mongodb/white' },
  { id: 'mysql', name: 'MySQL', url: 'https://cdn.simpleicons.org/mysql/white' },
  { id: 'firebase', name: 'Firebase', url: 'https://cdn.simpleicons.org/firebase/white' },
  { id: 'python', name: 'Python', url: 'https://cdn.simpleicons.org/python/white' },
  { id: 'django', name: 'Django', url: 'https://cdn.simpleicons.org/django/white' },
  { id: 'flask', name: 'Flask', url: 'https://cdn.simpleicons.org/flask/white' },

  // Creative Tools
  { id: 'premiere', name: 'Premiere Pro', url: 'https://cdn.simpleicons.org/adobepremiere/white' },
  { id: 'aftereffects', name: 'After Effects', url: 'https://cdn.simpleicons.org/adobeaftereffects/white' },
  { id: 'photoshop', name: 'Photoshop', url: 'https://cdn.simpleicons.org/adobephotoshop/white' },
  { id: 'illustrator', name: 'Illustrator', url: 'https://cdn.simpleicons.org/adobeillustrator/white' },
  { id: 'canva', name: 'Canva', url: 'https://cdn.simpleicons.org/canva/white' },
  { id: 'figma', name: 'Figma', url: 'https://cdn.simpleicons.org/figma/white' },

  // Business/Web Tools
  { id: 'wordpress', name: 'WordPress', url: 'https://cdn.simpleicons.org/wordpress/white' },
  { id: 'shopify', name: 'Shopify', url: 'https://cdn.simpleicons.org/shopify/white' },
  { id: 'vercel', name: 'Vercel', url: 'https://cdn.simpleicons.org/vercel/white' },
  { id: 'netlify', name: 'Netlify', url: 'https://cdn.simpleicons.org/netlify/white' },
  { id: 'git', name: 'Git', url: 'https://cdn.simpleicons.org/git/white' },
  { id: 'github', name: 'GitHub', url: 'https://cdn.simpleicons.org/github/white' },
];

interface LogoLoopProps {
  speed?: number;
  className?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
}

const LogoLoop: React.FC<LogoLoopProps> = React.memo(({ 
  speed = 40, 
  className,
  title = "Technologies & Tools We Use",
  subtitle = "Our production workflow is powered by industry-leading technologies and professional tools to deliver elite results.",
  showTitle = true
}) => {
  // Use pure CSS animation for smooth scrolling
  // Duplicate logos array multiple times to ensure seamless loop on any screen size
  // Using 4 sets ensures that even on massive screens, the transition point (-50%) 
  // is always reached without showing any empty space at the end of the track.
  const logos = React.useMemo(() => [...STATIC_LOGOS, ...STATIC_LOGOS, ...STATIC_LOGOS, ...STATIC_LOGOS], []);

  return (
    <section className={cn("relative w-full overflow-hidden py-32 select-none bg-[#050505] border-y border-white/5", className)}>
      {showTitle && (
        <div className="container mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-mocha font-black">Elite Production Toolkit</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">{title}</h3>
            <p className="text-white/30 text-lg max-w-2xl mx-auto font-medium leading-relaxed italic">
              {subtitle}
            </p>
          </motion.div>
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        {/* Side Fades for cinematic blend - Improved with multi-stop gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-80 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-80 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

        <div 
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center w-max animate-logo-loop hover:[animation-play-state:paused]"
          style={{ 
            animationDuration: `${speed}s`,
            willChange: 'transform'
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex-shrink-0 flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer px-4 group relative"
            >
              {/* Subtle glow behind logo on hover */}
              <div className="absolute inset-0 bg-mocha/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative flex flex-col items-center gap-6">
                <div className="h-12 md:h-16 w-auto flex items-center justify-center">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="h-full w-auto object-contain pointer-events-none transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(150,105,76,0.4)]"
                    loading="lazy"
                    onError={(e) => {
                      // Remove the parent if the logo fails to load to prevent gaps
                      const target = e.target as HTMLImageElement;
                      if (target.parentElement?.parentElement?.parentElement) {
                        target.parentElement.parentElement.parentElement.style.display = 'none';
                      }
                    }}
                  />
                </div>
                
                {/* Technology name tooltip/label that appears on hover */}
                <span className="absolute -bottom-10 text-[10px] font-black uppercase tracking-widest text-mocha opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default LogoLoop;
