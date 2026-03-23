import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, Phone, X } from 'lucide-react';
import { useState } from 'react';

const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      label: 'WhatsApp Chat',
      icon: MessageSquare,
      color: 'bg-[#25D366]',
      link: 'https://wa.me/923372585944',
      desc: 'Instant studio support'
    },
    {
      label: 'Email Us',
      icon: Mail,
      color: 'bg-mocha',
      link: 'mailto:hello@cineblendstudios.com',
      desc: 'Project inquiries'
    },
    {
      label: 'Book a Call',
      icon: Phone,
      color: 'bg-purple-600',
      link: 'https://calendly.com/mknadeem721/30min',
      desc: 'Vision consultation'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-mocha/10 blur-[60px] pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-black text-white tracking-tight">Studio Access</h4>
                <p className="text-white/40 text-xs font-medium">How can we blend your vision?</p>
              </div>

              <div className="space-y-3">
                {contactOptions.map((option, i) => (
                  <motion.a
                    key={option.label}
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-mocha/20 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${option.color} flex items-center justify-center text-white shadow-lg`}>
                      <option.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white/80 group-hover:text-white">{option.label}</p>
                      <p className="text-[10px] text-white/30 font-medium">{option.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(150,105,76,0.3)] transition-all duration-500 border-2 ${
          isOpen ? 'bg-black border-mocha text-mocha' : 'bg-mocha border-transparent text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Effect when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-mocha animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingCTA;
