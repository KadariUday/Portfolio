import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ChevronRight, Download, Terminal, Code2 } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import heroImg from '../assets/profile.jpg';

const Hero = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
      {/* Background Particles */}
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0"
          options={{
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: ["#8b5cf6", "#3b82f6", "#10b981"] },
              links: {
                color: "#4b5563",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: { enable: true, area: 800 },
                value: 40,
              },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-accent/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-300">
            <Terminal className="w-4 h-4 text-primary" />
            <span>Hello, World!</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <br />
            <span className="text-gradient">Kadari Uday</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-gray-400 h-8">
            <Typewriter
              words={['B.Tech Engineering Student', 'Full-Stack Developer', 'AI Enthusiast']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>
          
          <p className="text-gray-400 max-w-lg leading-relaxed text-lg">
            Bridging the gap between traditional full-stack development and advanced AI integrations to build scalable, intelligent web applications.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center gap-2 group"
            >
              View My Work
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[500px] flex justify-center items-center"
        >
          {/* Abstract Tech Graphic / Profile Placeholder */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border-2 border-secondary/30 border-dotted animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-8 rounded-full border border-accent/40 animate-[spin_20s_linear_infinite]"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-surface border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src={heroImg} alt="Kadari Uday" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default Hero;
