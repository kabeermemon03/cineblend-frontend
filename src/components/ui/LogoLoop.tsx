import React from 'react';
import { cn } from '@/lib/utils';

interface Logo {
  id: string;
  url: string;
  name: string;
}

const STATIC_LOGOS: Logo[] = [
  // Adobe
  { id: 'premiere', name: 'Adobe Premiere Pro', url: 'https://cdn.worldvectorlogo.com/logos/adobe-premiere-pro-cc-2020.svg' },
  { id: 'aftereffects', name: 'After Effects', url: 'https://cdn.worldvectorlogo.com/logos/adobe-after-effects-cc-2020.svg' },
  { id: 'photoshop', name: 'Photoshop', url: 'https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg' },
  { id: 'illustrator', name: 'Illustrator', url: 'https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-icon.svg' },
  // Video/Post
  { id: 'davinci', name: 'DaVinci Resolve', url: 'https://cdn.worldvectorlogo.com/logos/davinci-resolve.svg' },
  { id: 'blender', name: 'Blender', url: 'https://cdn.worldvectorlogo.com/logos/blender-2.svg' },
  // Web Dev
  { id: 'react', name: 'React', url: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
  { id: 'typescript', name: 'TypeScript', url: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
  { id: 'tailwind', name: 'TailwindCSS', url: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
  { id: 'nodejs', name: 'Node.js', url: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
  { id: 'flask', name: 'Flask', url: 'https://cdn.worldvectorlogo.com/logos/flask.svg' },
  { id: 'firebase', name: 'Firebase', url: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg' },
  { id: 'mongodb', name: 'MongoDB', url: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
  // Tools
  { id: 'figma', name: 'Figma', url: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg' },
  { id: 'github', name: 'GitHub', url: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg' },
  { id: 'vscode', name: 'VS Code', url: 'https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg' },
];

interface LogoLoopProps {
  speed?: number;
  className?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({ 
  speed = 40, 
  className 
}) => {
  // Use pure CSS animation for smooth scrolling
  // Duplicate logos array to ensure seamless loop
  const logos = [...STATIC_LOGOS, ...STATIC_LOGOS];

  return (
    <div className={cn("relative w-full overflow-hidden py-12 select-none", className)}>
      {/* Side Fades for cinematic blend */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div 
        className="flex whitespace-nowrap gap-20 items-center w-max animate-logo-loop"
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
            <div className="absolute inset-0 bg-mocha/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <img
              src={logo.url}
              alt={logo.name}
              className="h-12 md:h-14 w-auto object-contain pointer-events-none drop-shadow-2xl transition-all duration-500 group-hover:brightness-110"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(LogoLoop);
