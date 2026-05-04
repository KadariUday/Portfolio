import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, Code, Cpu } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Full-Stack Dev",
      description: "Building scalable and performant web applications using modern stacks."
    },
    {
      icon: <Brain className="w-6 h-6 text-secondary" />,
      title: "AI Integration",
      description: "Leveraging LLMs and NLP to create intelligent, context-aware systems."
    },
    {
      icon: <Cpu className="w-6 h-6 text-accent" />,
      title: "High Performance",
      description: "Optimizing backend infrastructure for speed and reliable computation."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="inline-flex items-center justify-center gap-2 text-gray-400 mb-8 font-mono bg-white/5 mx-auto px-4 py-2 rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Based in Hyderabad, India</span>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            I am a B.Tech Engineering student deeply passionate about technology and innovation. 
            My journey bridges the gap between traditional full-stack development and the 
            frontier of AI. I constantly explore emerging technologies, particularly 
            prompt engineering, LLM integrations, and high-performance computing, to 
            architect solutions that are not just functional, but genuinely intelligent 
            and forward-thinking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/20 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
