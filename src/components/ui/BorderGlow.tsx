import React from 'react';
import { cn } from '@/lib/utils';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowColor?: string;
  duration?: number;
  borderWidth?: number;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className,
  containerClassName,
  glowColor = "rgba(150, 105, 76, 0.3)", // Mocha glow
  duration = 3,
  borderWidth = 1,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const shouldAnimate = duration > 0 && isHovered;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-[1px] overflow-hidden rounded-[2.5rem]",
        containerClassName
      )}
    >
      {/* Animated Glow Layer */}
      <div
        className={cn(
          "absolute inset-[-1000%] opacity-50",
          shouldAnimate && "animate-spin-slow"
        )}
        style={{
          background: `conic-gradient(from 0deg, transparent, ${glowColor}, transparent 25%)`,
          animationDuration: shouldAnimate ? `${duration}s` : undefined,
        }}
      />
      
      {/* Content Container */}
      <div
        className={cn(
          "relative bg-black rounded-[2.5rem] h-full w-full",
          className
        )}
        style={{ margin: borderWidth }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
