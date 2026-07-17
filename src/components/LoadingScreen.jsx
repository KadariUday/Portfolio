import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white"
        >
          KADARI <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">UDAY</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="text-gray-400 text-sm md:text-lg tracking-widest text-center max-w-md px-4"
        >
          BUILDING INTELLIGENT PRODUCTS THAT SOLVE REAL PROBLEMS.
        </motion.div>

        <motion.div 
          className="w-48 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 500);
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
