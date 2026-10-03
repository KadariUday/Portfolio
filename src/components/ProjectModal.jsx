import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Cpu, 
  Layers, 
  UserCheck, 
  BookOpen, 
  ArrowRight, 
  Globe, 
  ShieldCheck,
  GitBranch,
  Star
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-surface border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header Ambient Glow */}
            <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${project.gradient || 'from-primary/20 to-transparent'} pointer-events-none opacity-40`}></div>

            {/* Sticky Header Bar */}
            <div className="relative z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {project.badge && (
                    <span className="px-3 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-medium">
                      {project.badge}
                    </span>
                  )}
                  {project.isLive && (
                    <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Live Deployment
                    </span>
                  )}
                  {project.stars > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-yellow-300 text-xs font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {project.stars}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.displayName || project.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  {project.tagline || project.description}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-gray-400 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 relative z-10 text-gray-300 text-sm sm:text-base leading-relaxed">
              
              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* The Problem */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2.5 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.problem || "Addressing real-world workflow inefficiencies and technical gaps."}
                  </p>
                </div>

                {/* The Solution */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.solution || project.description}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-3 flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Key Technical Features</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {project.keyFeatures.map((feat, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture & Flow */}
              {project.architecture && project.architecture.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary mb-3 flex items-center gap-2 font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>System Architecture & Data Flow</span>
                  </h4>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                      {project.architecture.map((node, i) => (
                        <React.Fragment key={i}>
                          <div className="flex-1 p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                            <span className="text-xs font-mono text-primary font-bold block mb-1">
                              {node.step}
                            </span>
                            <span className="text-[11px] text-gray-400 leading-tight block">
                              {node.detail}
                            </span>
                          </div>
                          {i < project.architecture.length - 1 && (
                            <div className="hidden md:flex text-gray-500 justify-center">
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* My Role & Contribution */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-400 mb-2 flex items-center gap-2 font-bold">
                  <UserCheck className="w-4 h-4" />
                  <span>My Contribution & Role</span>
                </h4>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-300">
                  {project.myRole || "Designed, developed, and deployed the application architecture."}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4" />
                  <span>Technology Stack</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-200 hover:border-primary/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Takeaways / Learning */}
              {project.learning && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent border border-white/10 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-1">
                      Engineering Takeaway
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {project.learning}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Sticky Footer Actions */}
            <div className="relative z-10 px-6 sm:px-8 py-5 border-t border-white/10 bg-surface flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-gray-400">
                Source: <span className="text-gray-200">KadariUday/{project.repoName}</span>
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>View Source Code</span>
                  </a>
                )}

                {project.isLive && project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
