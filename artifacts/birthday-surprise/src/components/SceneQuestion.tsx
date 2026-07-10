import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const NO_PHRASES = [
  "No",
  "Nice try",
  "Not an option",
  "Nope",
  "Too slow",
  "Oops",
  "Still no",
];

export function SceneQuestion({ onYes }: { onYes: () => void }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noTextIndex, setNoTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleNoDodge = () => {
    // Generate chaotic random movements bounded locally
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 150;
    
    setNoPosition({ x, y });
    setNoScale(prev => Math.max(0.7, prev - 0.05));
    setNoTextIndex(prev => (prev + 1) % NO_PHRASES.length);
  };

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] w-full px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      ref={containerRef}
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 sm:p-14 rounded-3xl shadow-2xl max-w-md w-full text-center relative">
        <h2 className="font-serif text-4xl sm:text-5xl font-medium text-white mb-12 drop-shadow-md">
          Are you happy?
        </h2>
        
        <div className="flex items-center justify-center relative w-full h-16">
          <div className="w-1/2 flex justify-end pr-3">
            <motion.button
              onClick={onYes}
              className="px-8 py-3 bg-white text-[#0B1021] rounded-full border border-transparent hover:bg-white/90 transition-colors font-semibold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes
            </motion.button>
          </div>
          <div className="w-1/2 flex justify-start pl-3 relative">
            <motion.button
              onMouseEnter={handleNoDodge}
              onClick={handleNoDodge}
              onTouchStart={handleNoDodge}
              animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute left-3 px-8 py-3 bg-white/5 text-white/70 rounded-full border border-white/10 font-medium tracking-wide whitespace-nowrap backdrop-blur-md shadow-lg"
              style={{ zIndex: 50 }}
            >
              {NO_PHRASES[noTextIndex]}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
