import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, CloudSun, Users, Compass, HeartPulse } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const headerRef = useRef(null);
  
  const projects = [
    {
      title: "CareerForge AI",
      description: "An AI-driven career guidance platform offering personalized college predictions, intelligent resume analysis, and comprehensive educational insights.",
      tech: ["React", "FastAPI", "MongoDB", "AI/ML"],
      icon: <Compass className="w-8 h-8 text-primary" />,
      github: "https://github.com/KadariUday/CareerForge-AI.git",
      demo: "https://career-forge-ai-orpin.vercel.app/"
    },
    {
      title: "Aura Health Chatbot",
      description: "A disease prediction chatbot utilizing specialized medical datasets. Integrated an NLP pipeline to process symptoms and offer diagnostic suggestions accurately.",
      tech: ["React", "FastAPI", "NLP", "Scikit-Learn"],
      icon: <Activity className="w-8 h-8 text-cyan-400" />,
      github: "https://github.com/KadariUday/Aura-Health-Chatbot.git",
      demo: "https://aura-health-chatbot.vercel.app/"
    },
    {
      title: "Sri Karuna Hospital Management",
      description: "A comprehensive hospital management system for seamless patient onboarding, appointment scheduling, and digital medical records.",
      tech: ["React", "Node.js", "Express", "PostgreSQL"],
      icon: <Users className="w-8 h-8 text-secondary" />,
      github: "#",
      demo: "#"
    },
    {
      title: "Samvidha Attendance",
      description: "A robust, deployed full-stack attendance management website optimized for fast backend logins and seamless real-time tracking for academic environments.",
      tech: ["React", "Express", "MongoDB", "JWT"],
      icon: <Users className="w-8 h-8 text-emerald-400" />,
      github: "https://github.com/KadariUday/Samvidha-Attendance",
      demo: "https://samvidha-attendance.vercel.app/"
    },
    {
      title: "Lumina Weather AI",
      description: "A full-stack application featuring AI-powered weather analysis to provide intelligent insights, localized forecasts, and dynamic visual reporting.",
      tech: ["React", "Node.js", "AI APIs", "Tailwind CSS"],
      icon: <CloudSun className="w-8 h-8 text-cyan-400" />,
      github: "https://github.com/KadariUday/Lumina-Weather-AI",
      demo: "https://lumina-weather-ai.vercel.app/"
    },
    {
      title: "Diabetic Diet & Insulin Management",
      description: "Personalized ML-driven system to track insulin levels, dietary intake, and provide predictive insights for diabetic patient care.",
      tech: ["Python", "TensorFlow", "React Native"],
      icon: <HeartPulse className="w-8 h-8 text-secondary" />,
      github: "#",
      demo: "#"
    }
  ];

  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="projects" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-12 lg:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building intelligent, scalable solutions that merge modern web technologies with artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group glass-card glass-card-hover p-8 flex flex-col h-full relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-all group-hover:scale-125 duration-700">
                {project.icon}
              </div>
              
              <div className="mb-6">
                {project.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10 group-hover:border-primary/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.github !== "#" && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-cyan-400 text-gray-300 transition-all transform hover:scale-110 border border-white/10 hover:border-cyan-400/50"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {project.demo !== "#" && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary text-gray-300 transition-all transform hover:scale-110 border border-white/10 hover:border-primary/50"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
