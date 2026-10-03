import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 bg-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-gray-300 text-sm font-medium">
            &copy; {new Date().getFullYear()} Kadari Uday. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs font-mono flex items-center gap-1.5">
            <Rocket className="w-3 h-3 text-pink-400" />
            <span>Founder &bull; Vision Verse 24</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/vision_verse24/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-gray-400 hover:text-pink-400 transition-all flex items-center justify-center text-sm"
            title="Vision Verse Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@VisionVerse-2233"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all flex items-center justify-center text-sm"
            title="Vision Verse YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://github.com/KadariUday"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-gray-400 hover:text-primary transition-all flex items-center justify-center text-sm"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/kadariuday"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-gray-400 hover:text-primary transition-all flex items-center justify-center text-sm"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span>Crafted with</span>
          <span className="text-pink-500 animate-pulse">❤</span>
          <span>& Modern AI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
