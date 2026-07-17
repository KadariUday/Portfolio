import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to play immediately on load
    const attemptPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Browser blocked autoplay. Waiting for user interaction.");
          // Fallback: wait for first click if autoplay is blocked
          const handleFirstInteraction = () => {
            if (!isPlaying && audioRef.current) {
              audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
              document.removeEventListener('click', handleFirstInteraction);
            }
          };
          document.addEventListener('click', handleFirstInteraction);
          return () => document.removeEventListener('click', handleFirstInteraction);
        }
      }
    };

    attemptPlay();
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} autoPlay loop src="/bg-music.mp3" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="glass-card p-3 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center animate-pulse-glow"
        aria-label="Toggle Audio"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-primary" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
