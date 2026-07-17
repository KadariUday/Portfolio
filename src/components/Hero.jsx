import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Volume2, VolumeX } from 'lucide-react';
import heroImg from '../assets/profile.jpg';

const Hero = ({ hasEntered }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (hasEntered && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Audio play failed:", e));
    }
  }, [hasEntered]);

  const toggleAudio = () => {
    // User requested only a manual OFF option
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 lg:py-0 overflow-hidden" id="home">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 bg-background overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          onEnded={(e) => { e.target.play().catch(()=>{}); }}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Ambient glow behind everything */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background/60 to-background"></div>
        {/* Fallback gradient if video is missing */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10"></div>
        {/* Animated Gradient Overlays for extra depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-mono text-gray-200"
          >
            <span className="text-[#A855F7] font-bold">{`>_`}</span>
            <span>Hello, World!</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1]">
            <span className="block text-white mb-2">Hi, I'm</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#3B82F6] to-[#2DD4BF] drop-shadow-lg">
              Kadari Uday
            </span>
          </h1>
          
          <div className="flex flex-col space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 tracking-wide flex items-center">
              B.Tech Engineering Student<span className="animate-pulse opacity-50">_</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Bridging the gap between traditional full-stack development and advanced AI integrations to build scalable, intelligent web applications.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-6 w-full sm:w-auto">
            <a 
              href="#projects" 
              className="w-full sm:w-auto justify-center px-8 py-3.5 rounded-xl bg-[#8B5CF6] text-white font-medium hover:bg-[#7C3AED] transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
            >
              View My Work
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto justify-center px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Profile Image Presentation on Right Side */}
        <div className="relative h-[350px] sm:h-[400px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 flex items-center justify-center group lg:translate-x-12 xl:translate-x-20"
          >
            <audio 
              ref={audioRef} 
              src="/bg-music.mp3" 
              autoPlay 
              loop 
              onEnded={(e) => { e.target.play().catch(()=>{}); }}
            />
            
            {/* Outer dashed ring (purple/secondary theme) */}
            <div className={`absolute inset-[-35%] rounded-full border-[2px] border-dashed transition-all duration-500 ${isPlaying ? 'animate-[spin_10s_linear_infinite] scale-110 border-secondary/80 shadow-[0_0_40px_rgba(139,92,246,0.4)]' : 'border-secondary/30 animate-[spin_20s_linear_infinite]'}`}></div>
            
            {/* Middle dotted ring (cyan/primary theme) */}
            <div className={`absolute inset-[-20%] rounded-full border-[2px] border-dotted transition-all duration-500 ${isPlaying ? 'animate-[spin_8s_linear_infinite_reverse] scale-110 border-primary shadow-[0_0_30px_rgba(0,240,255,0.5)]' : 'border-primary/50 animate-[spin_15s_linear_infinite_reverse]'}`}></div>
            
            {/* Inner solid ring with glow */}
            <div className={`absolute inset-[-5%] rounded-full border transition-all duration-500 ${isPlaying ? 'border-primary shadow-[0_0_60px_rgba(0,240,255,0.8)] scale-110 animate-pulse' : 'border-primary/40 shadow-[0_0_30px_rgba(0,240,255,0.3)]'}`}></div>

            {/* Extra Audio Pulsing Rings (Only visible when playing) */}
            {isPlaying && (
              <>
                <div className="absolute inset-[-40%] rounded-full border border-primary/30 animate-ping pointer-events-none" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-[-50%] rounded-full border border-secondary/30 animate-ping pointer-events-none" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
              </>
            )}

            {/* Profile Image Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white z-10 border-2 border-background shadow-2xl">
              <img 
                src={heroImg} 
                alt="Kadari Uday" 
                className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ${isPlaying ? 'scale-110' : 'group-hover:scale-105'}`}
              />
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Audio Mute Button (Only visible while playing) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleAudio}
            className="absolute bottom-8 right-8 z-50 p-3 rounded-full hover:bg-white/10 border border-white/10 bg-white/5 backdrop-blur-md transition-all flex items-center justify-center hover:scale-110 shadow-lg group"
            title="Mute Audio"
          >
            <Volume2 className="w-6 h-6 text-[#A855F7] group-hover:hidden" />
            <VolumeX className="w-6 h-6 text-gray-400 hidden group-hover:block" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
