import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Zap, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    category: 'Website / App Development', 
    message: '' 
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const recipientEmail = "kadariudaycl@gmail.com";

  const categories = [
    "Website / App Development",
    "Vision Verse 24 Guidance",
    "AI / ML Project Consultation",
    "Freelance / Hiring",
    "Other Inquiry"
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      // Primary delivery to kadariudaycl@gmail.com via FormSubmit AJAX with instant autoresponder
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
          _subject: `⚡ Urgent Portfolio Inquiry from ${formData.name} [${formData.category}]`,
          _replyto: formData.email,
          _captcha: "false",
          _template: "table",
          _autoresponse: `Hi ${formData.name},\n\nThank you for reaching out to Kadari Uday! Your message regarding "${formData.category}" has been received immediately.\n\nI review all messages promptly and will get back to you shortly.\n\nIn the meantime, feel free to explore Vision Verse 24:\n• YouTube: https://www.youtube.com/@VisionVerse-2233\n• Instagram: https://www.instagram.com/vision_verse24/\n• GitHub: https://github.com/KadariUday\n\nBest regards,\nKadari Uday\nFounder, Vision Verse 24\nDirect Email: ${recipientEmail}`
        })
      });
      
      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true || response.status === 200)) {
        setStatus({
          type: 'success',
          message: `Your message has been sent immediately to ${recipientEmail}! An automated confirmation has also been dispatched to ${formData.email}.`
        });
        setFormData({ 
          name: '', 
          email: '', 
          category: 'Website / App Development', 
          message: '' 
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        type: 'error',
        message: 'Direct transmission encountered an issue. You can click below to send directly using your email client.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mailtoHref = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    `Portfolio Inquiry: ${formData.category || 'General'} - ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-surface/30 border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Direct Contact Details & Fast Responder Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for New Projects & Mentorship</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pink-400">Connect</span>
            </h2>

            <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
              Have a question, web development requirement, AI project idea, or need student project guidance from <strong className="text-white">Vision Verse 24</strong>? 
              Reach out below and I will get back to you promptly.
            </p>
          </div>

          {/* Fast Responder Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-pink-500/10 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white font-mono">Fast Responder</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/20 text-primary border border-primary/30 font-semibold">Instant Alert</span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Emails are instantly delivered to <span className="text-primary font-mono font-semibold">{recipientEmail}</span> with automated acknowledgment.
              </p>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-3.5">
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-4 rounded-2xl bg-surface border border-primary/30 hover:border-primary/60 transition-all group flex items-center justify-between gap-4 shadow-lg shadow-primary/5">
              <a 
                href={`mailto:${recipientEmail}`} 
                className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors flex-1 min-w-0"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-gray-400 font-mono block">Primary Email (Direct Inbox)</span>
                  <span className="text-sm sm:text-base text-white font-mono font-semibold truncate block group-hover:text-primary transition-colors">
                    {recipientEmail}
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                title="Copy Email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-primary" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Vision Verse Instagram */}
            <a 
              href="https://www.instagram.com/vision_verse24/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 rounded-2xl bg-surface border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                <FaInstagram className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-pink-400 font-mono block">Founder &bull; Vision Verse 24</span>
                <span className="text-sm sm:text-base text-gray-200 group-hover:text-pink-300 font-mono font-medium truncate block">
                  @vision_verse24
                </span>
              </div>
            </a>

            {/* Vision Verse YouTube */}
            <a 
              href="https://www.youtube.com/@VisionVerse-2233" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 rounded-2xl bg-surface border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 transition-all group flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 group-hover:scale-105 transition-transform">
                <FaYoutube className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-red-400 font-mono block">Vision Verse Channel</span>
                <span className="text-sm sm:text-base text-gray-200 group-hover:text-red-300 font-mono font-medium truncate block">
                  @VisionVerse-2233
                </span>
              </div>
            </a>
            
            {/* GitHub & LinkedIn Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <a 
                href="https://github.com/KadariUday" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3.5 rounded-2xl bg-surface border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 text-gray-300 group-hover:text-primary transition-all shrink-0">
                  <FaGithub className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-gray-400 font-mono block">GitHub</span>
                  <span className="text-xs sm:text-sm text-gray-200 font-medium group-hover:text-primary truncate block">KadariUday</span>
                </div>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/kadariuday" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3.5 rounded-2xl bg-surface border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 text-gray-300 group-hover:text-primary transition-all shrink-0">
                  <FaLinkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-gray-400 font-mono block">LinkedIn</span>
                  <span className="text-xs sm:text-sm text-gray-200 font-medium group-hover:text-primary truncate block">kadariuday</span>
                </div>
              </a>
            </div>

          </div>
        </motion.div>

        {/* Right Column: Interactive Fast Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-surface/90 border border-white/10 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-primary/5 relative overflow-hidden"
        >
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Send a Message</span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </h3>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Instant Delivery
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Fill in the form below and your details will be immediately emailed to <strong className="text-white font-mono">{recipientEmail}</strong>.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status.type === 'success' ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-8 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Dispatched Instantly!</h4>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                    {status.message}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-gray-300 text-left space-y-1">
                  <p><span className="text-gray-500">Destination:</span> <span className="text-primary font-bold">{recipientEmail}</span></p>
                  <p><span className="text-gray-500">Status:</span> <span className="text-emerald-400 font-bold">Delivered with Auto-Responder</span></p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus({ type: '', message: '' })}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmit} 
                className="space-y-4 sm:space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="Enter your full name or company"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-mono"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Purpose / Category Selector */}
                <div>
                  <label htmlFor="category" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all cursor-pointer"
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat} className="bg-[#121212] text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Message / Requirements <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                    placeholder="Describe your project, website idea, feature specifications, or mentoring requirements..."
                  ></textarea>
                </div>

                {/* Error Banner with Direct Mailto Fallback */}
                {status.type === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{status.message}</span>
                    </div>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-medium transition-all"
                    >
                      <span>Open in Mail App & Send to {recipientEmail}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-pink-500 text-white font-semibold hover:opacity-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending to {recipientEmail}...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message Immediately</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500 font-mono">
                  🔒 Fast & secure submission directly routed to <span className="text-gray-400">{recipientEmail}</span>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
