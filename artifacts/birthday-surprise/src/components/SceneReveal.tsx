import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Heart, Play, Pause, FastForward, Rewind, Gift, Sparkles } from 'lucide-react';

import photo1 from '../assets/photo-1.jpg';
import photo2 from '../assets/photo-2.jpg';
import photo3 from '../assets/photo-3.jpg';
import songSrc from '../assets/our-song.mp3';

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

function PhotoFrame({ delay, src, alt }: { delay: number; src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.03, rotate: (Math.random() - 0.5) * 4 }}
      className="bg-white/5 backdrop-blur-md p-3 pb-6 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center aspect-[3/4] relative group cursor-pointer overflow-hidden"
    >
      <div className="w-full h-full rounded-lg overflow-hidden border border-white/5">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </div>
    </motion.div>
  );
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.7;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const formatTime = (t: number) => {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || audio.duration || 0);
  };

  const pct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl mt-8 mb-24"
    >
      <audio
        ref={audioRef}
        src={songSrc}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />
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
          <h4 className="text-white font-medium truncate text-lg tracking-tight">Our Song</h4>
          <p className="text-white/40 text-sm truncate">Playing just for you</p>
          
          <div className="mt-3 flex items-center gap-3">
            <span className="text-[10px] text-white/30 font-mono">{formatTime(progress)}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                 className="absolute left-0 top-0 bottom-0 bg-white/50"
                 animate={{ width: `${pct}%` }}
                 transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            <span className="text-[10px] text-white/30 font-mono">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-8 mt-8">
        <button onClick={() => skip(-10)} className="text-white/40 hover:text-white/80 transition-colors">
          <Rewind className="w-5 h-5 fill-current" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center bg-white text-[#0B1021] rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
        <button onClick={() => skip(10)} className="text-white/40 hover:text-white/80 transition-colors">
          <FastForward className="w-5 h-5 fill-current" />
        </button>
      </div>
    </motion.div>
  );
}

function Candle({ delay, x }: { delay: number; x: number }) {
  return (
    <div className="absolute bottom-full flex flex-col items-center" style={{ left: `${x}%`, transform: 'translateX(-50%)' }}>
      <motion.div
        className="w-2.5 h-4 rounded-full mb-0.5"
        style={{ background: 'radial-gradient(circle, #FFE9A8 0%, #FDBA3B 55%, #F97316 100%)', filter: 'drop-shadow(0 0 6px rgba(253,186,59,0.8))' }}
        animate={{ scaleY: [1, 1.15, 0.95, 1.1, 1], opacity: [1, 0.9, 1, 0.85, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <div className="w-1.5 h-8 bg-gradient-to-b from-blue-200 to-blue-400 rounded-sm" />
    </div>
  );
}

function BirthdayCake() {
  const candleX = [20, 35, 50, 65, 80];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, type: "spring", damping: 18 }}
      className="flex flex-col items-center mt-10"
    >
      <div className="relative w-64 sm:w-80">
        {candleX.map((x, i) => (
          <Candle key={i} x={x} delay={i * 0.15} />
        ))}

        <div className="w-full h-10 sm:h-12 rounded-t-3xl bg-gradient-to-b from-blue-100 to-blue-200 relative z-10 shadow-inner" />
        <div className="w-full h-14 sm:h-16 bg-gradient-to-b from-blue-300 to-blue-400 relative -mt-1">
          <div className="absolute inset-x-0 top-1/2 h-2 bg-white/30" />
        </div>
        <div className="w-[105%] -ml-[2.5%] h-14 sm:h-16 rounded-b-2xl bg-gradient-to-b from-indigo-400 to-indigo-600 shadow-2xl relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-white/20" />
        </div>

        <div className="absolute -inset-x-6 top-8 sm:top-10 h-4 bg-blue-300/0" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-white/70 text-sm mt-8 tracking-wide italic font-serif"
      >
        Make a wish, Lewan.
      </motion.p>
    </motion.div>
  );
}

function GiftSection() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="max-w-3xl mx-auto relative z-10 mt-32 mb-24 px-4 flex flex-col items-center text-center">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="gift-button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpened(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0B1021] font-medium text-lg shadow-[0_0_25px_rgba(255,255,255,0.25)]"
          >
            <Gift className="w-5 h-5" />
            Open a Gift
          </motion.button>
        ) : (
          <motion.div
            key="gift-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 text-blue-200/70 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Surprise</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <BirthdayCake />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SceneReveal() {
  const messages = [
    "I wanted to make something special just for you. You bring so much light into the lives of everyone around you, and today is all about celebrating that light. I hope this year is filled with as much joy, beauty, and love as you give to the world. Happy Birthday.",
    "Happy Birthday! I'm really grateful to have you in my life. I hope this year brings you everything you've been hoping for. You deserve an amazing day, and I'm always here for you. Enjoy every moment!",
  ];

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
            Happy Birthday Lewan
          </h1>
        </motion.div>
        
        <motion.div 
          className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto px-4 space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 1.5,
                staggerChildren: 0.03
              }
            }
          }}
        >
          {messages.map((message, mIndex) => (
            <p key={mIndex}>
              {message.split(" ").map((word, index) => (
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
          ))}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center mb-16"
        >
            <div className="inline-flex items-center gap-6">
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/20" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white/90 italic">Your Memories</h3>
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/20" />
            </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <PhotoFrame delay={0.1} src={photo1} alt="Memory 1" />
          <PhotoFrame delay={0.2} src={photo2} alt="Memory 2" />
          <PhotoFrame delay={0.3} src={photo3} alt="Memory 3" />
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

      <GiftSection />
    </motion.div>
  );
}
