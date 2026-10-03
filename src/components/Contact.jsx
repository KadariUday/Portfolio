import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, Globe, Rocket } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/06ee993ffe03f2cb3dcc43fd2f696bfc", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Contact from ${formData.name}`
        })
      });
      
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Oops! Something went wrong.');
      }
    } catch (error) {
      setStatus('Oops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-surface/30 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Let's <span className="text-gradient">Connect</span>
            </h2>
          </div>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            I'm currently looking for new opportunities, building exciting AI projects, and leading <strong className="text-white">Vision Verse 24</strong>. 
            Whether you have a question, a project proposal, need a tailored website, or want student mentorship, feel free to reach out!
          </p>

          <div className="space-y-4">
            <a href="mailto:23951A66N4@iare.ac.in" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-mono block">Email</span>
                <span className="text-base text-gray-200 group-hover:text-primary font-mono">23951A66N4@iare.ac.in</span>
              </div>
            </a>

            <a href="https://www.instagram.com/vision_verse24/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-pink-400 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-pink-500/30 flex items-center justify-center group-hover:border-pink-500 group-hover:bg-pink-500/20 transition-all text-pink-400">
                <FaInstagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-pink-400 font-mono block">Founder &bull; Vision Verse 24</span>
                <span className="text-base text-gray-200 group-hover:text-pink-300 font-mono">@vision_verse24 (Instagram)</span>
              </div>
            </a>

            <a href="https://www.youtube.com/@VisionVerse-2233" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-red-500/30 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-500/20 transition-all text-red-400">
                <FaYoutube className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-red-400 font-mono block">Vision Verse Tutorials</span>
                <span className="text-base text-gray-200 group-hover:text-red-300 font-mono">@VisionVerse-2233 (YouTube)</span>
              </div>
            </a>
            
            <a href="https://github.com/KadariUday" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <FaGithub className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-mono block">Code</span>
                <span className="text-base text-gray-200 group-hover:text-primary">github.com/KadariUday</span>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/kadariuday" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <FaLinkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-mono block">Professional</span>
                <span className="text-base text-gray-200 group-hover:text-primary">linkedin.com/in/kadariuday</span>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface rounded-3xl p-6 lg:p-10 border border-white/10 shadow-2xl shadow-primary/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="Your Name / Organization"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message or Project Requirement</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                placeholder="Tell me about your project, website idea, or student project guidance needs..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-pink-500 text-white font-medium hover:opacity-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
            
            {status && (
              <p className="text-accent text-center mt-4 text-sm font-medium">{status}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
