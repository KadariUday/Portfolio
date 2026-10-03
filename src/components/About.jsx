import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, Code, Cpu, Rocket, Sparkles, GraduationCap } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      title: "Founder & Creator",
      description: "Vision Verse: Built and managed a digital services platform offering websites, portfolios, resumes, and college project solutions.",
      border: "hover:border-pink-500/40"
    },
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Full-Stack Web Dev",
      description: "Building scalable, performant, and responsive web applications using modern full-stack architectures.",
      border: "hover:border-primary/40"
    },
    {
      icon: <Brain className="w-6 h-6 text-secondary" />,
      title: "AI Integration & ML",
      description: "Leveraging LLMs, NLP pipelines, and prompt engineering to create intelligent, automated systems.",
      border: "hover:border-secondary/40"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      title: "Student Mentorship",
      description: "Guiding engineering peers through source code architectures, project deployment, and interview viva readiness.",
      border: "hover:border-emerald-500/40"
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="inline-flex items-center justify-center gap-2 text-gray-300 mb-8 font-mono bg-white/5 mx-auto px-4 py-2 rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Based in Hyderabad, India</span>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed">
            I am a B.Tech Engineering student and the <strong className="text-white">Founder of Vision Verse 24</strong>. 
            My journey bridges full-stack engineering with frontier AI innovations. Through Vision Verse 24, I actively mentor students, 
            craft tailored digital platforms, and help emerging developers turn conceptual ideas into deployed, production-grade applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`p-6 rounded-2xl bg-surface border border-white/5 ${card.border} transition-all duration-300 group relative overflow-hidden flex flex-col justify-between hover:-translate-y-1`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div>
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/20 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
