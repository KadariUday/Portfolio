import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronRight, 
  Rocket, 
  Sparkles, 
  Code2, 
  Brain, 
  ArrowUpRight, 
  Layers, 
  ShieldCheck, 
  Briefcase,
  Terminal
} from 'lucide-react';
import heroImg from '../assets/profile.jpg';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const stats = [
    { value: "10+", label: "Live & AI Projects" },
    { value: "Founder", label: "Vision Verse 24" },
    { value: "Full-Stack", label: "React • Node • Python" },
    { value: "Active", label: "Student Mentorship" }
  ];

  return (
    <section 
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-0 overflow-hidden" 
      id="home"
    >
      {/* High-End Tech Grid & Ambient Glow Background */}
      <div className="absolute inset-0 z-0 bg-[#05070c] overflow-hidden pointer-events-none">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)]"></div>
        
        {/* Luxury Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-primary/15 via-secondary/15 to-pink-500/10 rounded-full filter blur-[140px] opacity-70"></div>
        <div className="absolute -top-24 right-10 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[58%_42%] gap-12 lg:gap-16 items-center"
      >
        {/* Left Column: Text Content & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 text-left"
        >
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Projects & Roles</span>
            </div>

            <a 
              href="#vision-verse"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 transition-all backdrop-blur-md text-xs font-mono text-pink-300 group shadow-[0_0_15px_rgba(236,72,153,0.15)]"
            >
              <Rocket className="w-3.5 h-3.5 text-pink-400 group-hover:-translate-y-0.5 transition-transform" />
              <span>Founder &bull; <strong className="text-white">Vision Verse 24</strong></span>
            </a>
          </div>
          
          {/* Main Headline */}
          <div className="space-y-3">
            <p className="text-sm md:text-base font-mono text-gray-400 tracking-wider uppercase">
              Full-Stack Software Engineer & AI Innovator
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.08] text-white">
              Kadari <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#60a5fa] to-secondary">Uday</span>
            </h1>
          </div>
          
          {/* Professional Narrative */}
          <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
            I engineer high-performance web applications, modern full-stack systems, and practical AI integrations. 
            As the <strong className="text-white">Founder of Vision Verse 24</strong>, I deliver tailored digital platforms, mentor engineering peers, and turn complex ideas into production-ready software.
          </p>
          
          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2">
            <a 
              href="#projects" 
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-pink-500 text-white font-semibold hover:opacity-95 transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] cursor-pointer"
            >
              <span>Explore Projects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#contact" 
              className="px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white font-medium hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group backdrop-blur-md cursor-pointer"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-primary" />
            </a>

            <a 
              href="#vision-verse" 
              className="px-6 py-3.5 rounded-xl bg-pink-500/10 border border-pink-500/25 hover:border-pink-500/50 text-pink-300 hover:text-white hover:bg-pink-500/20 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Rocket className="w-4 h-4 text-pink-400" />
              <span>Vision Verse 24</span>
            </a>
          </div>

          {/* Key Metrics / Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            {stats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-1.5">
                  <span className="text-primary">{item.value}</span>
                </div>
                <div className="text-xs text-gray-400 font-mono leading-tight">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Professional Portrait Frame with Live Tech Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Subtle Ambient Back Glow */}
          <div className="absolute inset-0 max-w-sm mx-auto bg-gradient-to-tr from-primary/20 via-secondary/20 to-pink-500/20 rounded-3xl filter blur-3xl opacity-60 pointer-events-none"></div>

          {/* Profile Card Container */}
          <div className="relative w-72 sm:w-80 lg:w-[22rem] p-3 rounded-3xl bg-surface/80 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-primary/10 group">
            
            {/* Image Container with Border Glow */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
              <img 
                src={heroImg} 
                alt="Kadari Uday" 
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle bottom gradient shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* In-Frame Status Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Kadari Uday</h3>
                    <p className="text-[11px] text-gray-300 font-mono">B.Tech Engineering &bull; Founder</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Badge Top-Left */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-4 -left-4 sm:-left-6 px-3.5 py-2 rounded-2xl bg-[#0e121a]/95 border border-primary/40 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono text-white"
            >
              <Brain className="w-4 h-4 text-primary" />
              <span>AI Integration</span>
            </motion.div>

            {/* Floating Live Badge Bottom-Right */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 sm:-right-6 px-3.5 py-2 rounded-2xl bg-[#0e121a]/95 border border-pink-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-mono text-white"
            >
              <Rocket className="w-4 h-4 text-pink-400" />
              <span>Vision Verse 24</span>
            </motion.div>

          </div>
        </motion.div>

      </motion.div>

      {/* Professional Minimal Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">
          Explore
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center p-1 group-hover:border-primary transition-colors bg-white/5 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full shadow-[0_0_6px_rgba(0,240,255,0.8)]"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
