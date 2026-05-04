import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    setStatus('Message sent successfully!');
    setTimeout(() => setStatus(''), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-surface/30 border-t border-white/5 relative">
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
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            I'm currently looking for new opportunities to build exciting projects and push the boundaries of AI integration. 
            Whether you have a question, a project proposal, or just want to say hi, my inbox is always open!
          </p>

          <div className="space-y-6">
            <a href="mailto:kadariuday@example.com" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg">kadariuday@example.com</span>
            </a>
            
            <a href="https://github.com/KadariUday" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <FaGithub className="w-5 h-5" />
              </div>
              <span className="text-lg">GitHub Profile</span>
            </a>
            
            <a href="https://www.linkedin.com/in/kadariuday" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <FaLinkedin className="w-5 h-5" />
              </div>
              <span className="text-lg">LinkedIn Profile</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl shadow-primary/5"
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
                placeholder="John Doe"
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
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                placeholder="How can we work together?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
