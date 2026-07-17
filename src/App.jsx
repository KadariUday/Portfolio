import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  // Prevent scrolling while overlay is active
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [hasEntered]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white relative">
      <CustomCursor />
      
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-center px-4">
                Welcome to My Portfolio
              </h1>
              
              <button 
                onClick={() => setHasEntered(true)}
                className="px-10 py-4 rounded-full bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 hover:scale-105 transition-all text-xl font-medium tracking-wider backdrop-blur-sm shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] cursor-pointer"
              >
                Enter Site
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero hasEntered={hasEntered} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
