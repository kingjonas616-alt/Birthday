import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Play, Pause, Image as ImageIcon, FastForward, Rewind } from 'lucide-react';

function ConfettiBurst() {
  const particles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth * 1.2,
    y: (Math.random() - 0.5) * window.innerHeight * 1.5,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.6 + 0.4,
    color: ['#FFFFFF', '#A5B4FC', '#93C5FD', '#E0E7FF', '#C7D2FE'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center fixed">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ 
            x: p.x, 
            y: p.y, 
            rotate: p.rotation, 
            scale: p.scale,
            opacity: 0
          }}
          transition={{ duration: 3 + Math.random() * 2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function PhotoFrame({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.03, rotate: (Math.random() - 0.5) * 4 }}
      className="bg-white/5 backdrop-blur-md p-3 pb-12 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center aspect-[3/4] relative group cursor-pointer"
    >
      <div className="w-full h-full bg-white/5 border border-white/5 rounded-lg flex flex-col items-center justify-center gap-3 group-hover:bg-white/10 transition-colors">
        <ImageIcon className="w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" strokeWidth={1.5} />
        <span className="text-white/20 text-xs font-medium uppercase tracking-wider group-hover:text-white/40 transition-colors">
          Add a photo
        </span>
      </div>
    </motion.div>
  );
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl mt-8 mb-24"
    >
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-400/20 flex items-center justify-center flex-shrink-0 border border-white/10 relative overflow-hidden group shadow-inner">
            <motion.div 
               animate={{ rotate: isPlaying ? 360 : 0 }} 
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNCIvPjwvc3ZnPg==')] bg-center opacity-50"
            />
            <div className="w-4 h-4 bg-white/30 rounded-full z-10 backdrop-blur-sm shadow-sm" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate text-lg tracking-tight">Add your song here</h4>
          <p className="text-white/40 text-sm truncate">Artist Placeholder</p>
          
          <div className="mt-3 flex items-center gap-3">
            <span className="text-[10px] text-white/30 font-mono">0:00</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                 className="absolute left-0 top-0 bottom-0 bg-white/50"
                 initial={{ width: "0%" }}
                 animate={{ width: isPlaying ? "100%" : "0%" }}
                 transition={{ duration: 180, ease: "linear" }}
              />
            </div>
            <span className="text-[10px] text-white/30 font-mono">-3:00</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-8 mt-8">
        <button className="text-white/40 hover:text-white/80 transition-colors">
          <Rewind className="w-5 h-5 fill-current" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 flex items-center justify-center bg-white text-[#0B1021] rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
        <button className="text-white/40 hover:text-white/80 transition-colors">
          <FastForward className="w-5 h-5 fill-current" />
        </button>
      </div>
    </motion.div>
  );
}

export function SceneReveal() {
  const message = "I wanted to make something special just for you. You bring so much light into the lives of everyone around you, and today is all about celebrating that light. I hope this year is filled with as much joy, beauty, and love as you give to the world. Happy Birthday.";
  const words = message.split(" ");

  return (
    <motion.div 
      className="relative z-10 min-h-[100dvh] w-full px-4 pt-24 pb-12 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <ConfettiBurst />
      
      <div className="max-w-3xl mx-auto text-center mt-12 mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", damping: 25 }}
        >
          <Heart className="w-8 h-8 mx-auto text-blue-200/40 mb-8" strokeWidth={1.5} />
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-medium text-white tracking-tight mb-10 drop-shadow-2xl">
            Happy Birthday
          </h1>
        </motion.div>
        
        <motion.div 
          className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 1.5,
                staggerChildren: 0.05
              }
            }
          }}
        >
          <p>
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-1.5"
                variants={{
                  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 px-4">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center mb-16"
        >
            <div className="inline-flex items-center gap-6">
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/20" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white/90 italic">Our Memories</h3>
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/20" />
            </div>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <PhotoFrame delay={0.1} />
          <PhotoFrame delay={0.2} />
          <PhotoFrame delay={0.3} />
          <PhotoFrame delay={0.4} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 mt-32 px-4">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center mb-16"
        >
            <div className="inline-flex items-center gap-6">
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/20" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white/90 italic">Our Song</h3>
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/20" />
            </div>
        </motion.div>

        <MusicPlayer />
      </div>
    </motion.div>
  );
}
