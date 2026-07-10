import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export function StarryBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stars = useMemo(() => {
    if (windowSize.width === 0) return [];
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
  }, [windowSize]);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#060a16] via-[#0B1021] to-[#121b33]">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.1, star.opacity],
            scale: [1, 0.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#060a16]/40 to-[#060a16] opacity-90 mix-blend-multiply" />
    </div>
  );
}
