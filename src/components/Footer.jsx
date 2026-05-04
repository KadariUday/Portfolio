import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-surface/80 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Kadari Uday. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
          <span>Designed & Built with</span>
          <span className="text-primary animate-pulse">❤</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
