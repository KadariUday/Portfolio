import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Globe, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  ArrowUpRight, 
  CheckCircle2 
} from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const VisionVerse = () => {
  const solutions = [
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Websites",
      desc: "Fast, responsive, and modern websites tailored for businesses and ideas.",
      bg: "hover:border-primary/40"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-secondary" />,
      title: "Portfolios",
      desc: "Interactive developer portfolios that effectively showcase skills and projects.",
      bg: "hover:border-secondary/40"
    },
    {
      icon: <FileText className="w-6 h-6 text-pink-400" />,
      title: "Web Resumes",
      desc: "Professional digital resumes designed to make a strong impression on recruiters.",
      bg: "hover:border-pink-400/40"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      title: "College Projects",
      desc: "End-to-end academic project solutions with clean code, architecture, and documentation.",
      bg: "hover:border-emerald-400/40"
    }
  ];

  return (
    <section id="vision-verse" className="py-16 lg:py-24 relative overflow-hidden bg-background">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-primary/10 via-secondary/15 to-pink-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Simple & Clean Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-surface/90 border border-white/10 backdrop-blur-xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono mb-3">
                <Rocket className="w-3.5 h-3.5 text-pink-400" />
                <span>FOUNDER & CREATOR</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pink-400">Verse</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Built and managed a digital services platform offering websites, portfolios, resumes, and college project solutions.
              </p>
            </div>

            {/* Social handles */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://www.instagram.com/vision_verse24/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] border border-pink-500/30 text-white transition-all text-xs font-mono flex items-center gap-2 group shadow-md"
              >
                <FaInstagram className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
                <span>@vision_verse24</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.youtube.com/@VisionVerse-2233"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600 border border-red-500/30 text-white transition-all text-xs font-mono flex items-center gap-2 group shadow-md"
              >
                <FaYoutube className="w-4 h-4 text-red-400 group-hover:text-white transition-colors" />
                <span>YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Simple 4-Card Solution Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
            {solutions.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-white/5 border border-white/5 ${item.bg} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-gray-500 group-hover:text-primary transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Student & Business Ready</span>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default VisionVerse;
