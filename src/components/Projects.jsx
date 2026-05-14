import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, CloudSun, Users, Video } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: "Aura Health AI Chatbot",
      description: "A disease prediction chatbot utilizing specialized medical datasets. Integrated an NLP pipeline to process symptoms and offer diagnostic suggestions accurately.",
      tech: ["React", "FastAPI", "NLP", "Scikit-Learn"],
      icon: <Activity className="w-8 h-8 text-primary" />,
      github: "https://github.com/KadariUday/Aura-Health-Chatbot.git",
      demo: "https://aura-health-chatbot.vercel.app/"
    },
    {
      title: "Lumina Weather AI",
      description: "A full-stack application featuring AI-powered weather analysis to provide intelligent insights, localized forecasts, and dynamic visual reporting.",
      tech: ["React", "Node.js", "AI APIs", "Tailwind CSS"],
      icon: <CloudSun className="w-8 h-8 text-secondary" />,
      github: "https://github.com/KadariUday/Lumina-Weather-AI",
      demo: "https://lumina-weather-ai.vercel.app/"
    },
    {
      title: "Samvidha Attendance",
      description: "A robust, deployed full-stack attendance management website optimized for fast backend logins and seamless real-time tracking for academic environments.",
      tech: ["React", "Express", "MongoDB", "JWT"],
      icon: <Users className="w-8 h-8 text-accent" />,
      github: "https://github.com/KadariUday/Samvidha_Attendance.git",
      demo: "https://samvidha-attendance-98tm.vercel.app/"
    },
    {
      title: "Smart AI Video Summarizer",
      description: "An NLP-driven tool designed to automate video content analysis, transcribing audio streams and generating concise, structured text summaries instantly.",
      tech: ["Python", "Transformers", "React", "Video Processing"],
      icon: <Video className="w-8 h-8 text-primary" />,
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400">Some of the impactful things I've built.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-surface rounded-2xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                {project.icon}
              </div>
              
              <div className="mb-6">
                {project.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
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
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
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
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
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
