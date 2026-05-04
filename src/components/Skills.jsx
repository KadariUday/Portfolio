import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      title: "Backend & APIs",
      skills: ["Node.js", "Python", "FastAPI", "PHP", "Java"]
    },
    {
      title: "Emerging Tech",
      skills: ["LLM Integrations", "Prompt Engineering", "NLP", "Machine Learning Concepts"]
    },
    {
      title: "Tools & Deployment",
      skills: ["Git", "GitHub", "Vercel", "Render", "Postman"]
    },
    {
      title: "Vibe Coding",
      skills: ["Bolt", "Lovable", "Replit", "Z0", "v0", "Windsurf", "Antigravity", "Cursor", "Claude Code", "Gemini CLI"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-surface/50 border-y border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full mix-blend-screen filter blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-gray-400">Tools and technologies I use to build things.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-background rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/10 pb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300 hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
