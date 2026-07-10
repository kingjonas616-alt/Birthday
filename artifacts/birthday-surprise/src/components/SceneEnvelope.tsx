import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';

export function SceneEnvelope({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] w-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative cursor-pointer group"
        animate={isOpening ? {} : { y: [0, -10, 0] }}
        transition={isOpening ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleOpen}
      >
        <div className="relative w-[280px] h-[180px] sm:w-[360px] sm:h-[240px] bg-slate-800/80 backdrop-blur-sm rounded-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center">
            
          {/* Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full origin-top z-30 pointer-events-none"
            style={{ perspective: 1000 }}
          >
            <motion.div 
               className="w-full h-1/2 bg-slate-700/90 backdrop-blur-md origin-top border-b border-white/10"
               style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
               animate={isOpening ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
               transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Letter inside */}
          <motion.div
            className="absolute bg-[#f8fafc] rounded-sm shadow-inner flex flex-col items-center pt-6 sm:pt-10 z-10 w-[85%] h-[90%]"
            initial={{ y: 0 }}
            animate={isOpening ? { y: -150, opacity: 0, scale: 1.05 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.4, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 mb-4 flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400/70" strokeWidth={2} />
            </div>
            <div className="w-1/2 h-1 bg-slate-200 rounded-full mb-3" />
            <div className="w-3/4 h-1 bg-slate-200 rounded-full mb-3" />
            <div className="w-2/3 h-1 bg-slate-200 rounded-full" />
          </motion.div>

          {/* Front folds (left/right/bottom) */}
          <div className="absolute inset-0 pointer-events-none z-20 rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-md border-r border-white/5" style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }} />
            <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-md border-l border-white/5" style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }} />
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md border-t border-white/5" style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }} />
            
            {/* Wax seal */}
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-900 rounded-full shadow-lg border border-indigo-400/30 flex items-center justify-center z-50"
               animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
               transition={{ duration: 0.4 }}
            >
                <div className="w-8 h-8 rounded-full border border-indigo-400/20 flex items-center justify-center">
                   <Heart className="w-4 h-4 text-indigo-300/80" fill="currentColor" strokeWidth={0} />
                </div>
            </motion.div>
          </div>

          <div className="absolute inset-0 border border-white/5 rounded-md z-40 pointer-events-none" />
        </div>

        {/* Floating instruction text */}
        <motion.div 
            className="absolute -bottom-20 left-0 w-full text-center"
            animate={isOpening ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <span className="text-white/60 tracking-widest text-xs sm:text-sm uppercase font-medium bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
            Open Me
          </span>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
