import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Also listen for window load event as a fallback/safety
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mocha/20 blur-[150px] rounded-full"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-12">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              <img 
                src="/logo.png" 
                alt="CineBlend Logo" 
                className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4"
              />
              <div className="text-4xl md:text-6xl font-black tracking-tighter text-white flex items-center gap-2">
                CINE<span className="text-mocha">BLEND</span>
              </div>
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-mocha to-purple-brand rounded-full"
              />
            </motion.div>

            {/* Loading Text */}
            <div className="flex flex-col items-center space-y-4">
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40"
              >
                CineBlend is mixing magic... 🎬
              </motion.p>
              
              <div className="flex items-center gap-4">
                <span className="text-white/20 text-[10px] font-black w-8">{Math.round(progress)}%</span>
                <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
                  <motion.div 
                    animate={{ x: `${progress - 100}%` }}
                    className="absolute inset-0 bg-mocha"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 text-[8px] font-black uppercase tracking-[0.4em] text-white"
          >
            Creative Excellence Since 2024
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;