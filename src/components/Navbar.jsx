import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Vision Verse', href: '#vision-verse', highlight: true },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-lg shadow-primary/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <Code2 className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
          <span className="font-mono font-bold text-xl tracking-tighter">
            Kadari<span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                link.highlight 
                  ? 'text-pink-300 hover:text-white px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20' 
                  : 'text-gray-300 hover:text-white hover:text-gradient'
              }`}
            >
              {link.highlight && <Rocket className="w-3.5 h-3.5 text-pink-400" />}
              <span>{link.name}</span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-surface shadow-xl border-t border-white/5 py-4 flex flex-col items-center gap-4"
          >
            {navLinks.map((link) => (
               <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors text-lg font-medium flex items-center gap-2 ${
                  link.highlight ? 'text-pink-400 font-bold' : 'text-gray-300 hover:text-primary'
                }`}
               >
                 {link.highlight && <Rocket className="w-4 h-4" />}
                 {link.name}
               </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
