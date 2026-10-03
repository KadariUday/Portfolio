import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Search, 
  Sparkles, 
  Layers, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  ArrowUpRight, 
  Globe, 
  Star,
  Info,
  GitBranch,
  Filter,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Cpu,
  Brain,
  Compass,
  Activity,
  HeartPulse,
  CloudSun,
  Users
} from 'lucide-react';
import { FaGithub, FaReact, FaPython, FaJs, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTypescript, SiFastapi, SiMongodb, SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECT_CATEGORIES, TECH_FILTERS, PROJECTS_DATA } from '../data/projectsData.js';
import { fetchProjectsWithGitHub, isExcludedRepo } from '../lib/github.js';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

// Helper to render relevant icon based on project title or category
const getProjectIcon = (project) => {
  const text = `${project.repoName} ${project.displayName} ${project.categories?.join(' ')}`.toLowerCase();
  if (text.includes('phish') || text.includes('security') || text.includes('privacy')) return <ShieldCheck className="w-6 h-6 text-purple-400" />;
  if (text.includes('career') || text.includes('forge') || text.includes('compass')) return <Compass className="w-6 h-6 text-cyan-400" />;
  if (text.includes('aura') || text.includes('health') || text.includes('medimap')) return <Activity className="w-6 h-6 text-emerald-400" />;
  if (text.includes('diabet') || text.includes('insulin')) return <HeartPulse className="w-6 h-6 text-rose-400" />;
  if (text.includes('weather') || text.includes('lumina')) return <CloudSun className="w-6 h-6 text-sky-400" />;
  if (text.includes('attendance') || text.includes('student') || text.includes('docu')) return <Users className="w-6 h-6 text-blue-400" />;
  if (text.includes('libmaster') || text.includes('library')) return <Layers className="w-6 h-6 text-indigo-400" />;
  if (text.includes('prompt') || text.includes('agent') || text.includes('ai')) return <Brain className="w-6 h-6 text-indigo-400" />;
  if (text.includes('jewel') || text.includes('e-commerce') || text.includes('sr-')) return <Sparkles className="w-6 h-6 text-amber-400" />;
  return <Code2 className="w-6 h-6 text-primary" />;
};

const Projects = () => {
  const headerRef = useRef(null);
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ 
    totalCount: PROJECTS_DATA.length, 
    liveCount: PROJECTS_DATA.filter(p => p.isLive).length 
  });

  // Fetch and sync live GitHub metadata on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const res = await fetchProjectsWithGitHub();
      if (isMounted && res && res.projects) {
        const cleanProjects = res.projects.filter(p => !isExcludedRepo(p.repoName) && !isExcludedRepo(p.displayName) && !isExcludedRepo(p.name));
        setProjects(cleanProjects);
        setStats({ 
          totalCount: cleanProjects.length, 
          liveCount: cleanProjects.filter(p => p.isLive).length 
        });
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // GSAP Entrance
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Excluded repo check
      if (isExcludedRepo(project.repoName) || isExcludedRepo(project.displayName) || isExcludedRepo(project.name)) {
        return false;
      }

      // Category filter
      if (selectedCategory === 'Featured' && !project.featured) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'Featured') {
        const matchesCategory = project.categories?.some(c => c.toLowerCase() === selectedCategory.toLowerCase());
        if (!matchesCategory) return false;
      }

      // Tech filter
      if (selectedTech !== 'All') {
        const matchesTech = project.technologies?.some(t => t.toLowerCase().includes(selectedTech.toLowerCase()));
        if (!matchesTech) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inName = (project.displayName || project.name || '').toLowerCase().includes(query);
        const inTagline = (project.tagline || '').toLowerCase().includes(query);
        const inDesc = (project.description || '').toLowerCase().includes(query);
        const inTech = project.technologies?.some(t => t.toLowerCase().includes(query));
        const inProblem = (project.problem || '').toLowerCase().includes(query);
        const inCategories = project.categories?.some(c => c.toLowerCase().includes(query));
        return inName || inTagline || inDesc || inTech || inProblem || inCategories;
      }

      return true;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured).slice(0, 6);
  }, [projects]);

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-secondary/10 to-transparent pointer-events-none filter blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Code2 className="w-4 h-4" />
            <span className="font-semibold tracking-wider uppercase">ENGINEERING PORTFOLIO</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Projects</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of production-ready AI systems, full-stack platforms, healthcare models, and software architectures.
          </p>

          {/* Quick Recruiter Summary Strip */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-surface/90 border border-white/10 backdrop-blur-md max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2 border-r border-white/5 last:border-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 font-mono">
                {stats.totalCount}+
              </span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Repositories</span>
            </div>
            <div className="p-2 border-r border-white/5 last:border-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {stats.liveCount}
              </span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Live Deployments</span>
            </div>
            <div className="p-2 border-r border-white/5 last:border-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-secondary font-mono">
                AI & ML
              </span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Specialization</span>
            </div>
            <div className="p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">
                100%
              </span>
              <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Open Source</span>
            </div>
          </div>
        </div>

        {/* Search and Category Filtering Section */}
        <div className="mb-10 space-y-6">
          
          {/* Search Input Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, technology (FastAPI, React, Python, NLP), or domain..."
              className="w-full bg-surface/80 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 hover:text-white px-2 py-1 bg-white/5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Technology Quick Tag Filters */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-gray-400 font-mono pt-1">
            <span className="flex items-center gap-1 text-gray-500">
              <Filter className="w-3 h-3" /> Tech:
            </span>
            {TECH_FILTERS.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
                  selectedTech === tech
                    ? 'bg-secondary/20 border-secondary text-secondary font-bold'
                    : 'bg-transparent border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Showing Count */}
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 max-w-7xl mx-auto px-2 pt-2 border-t border-white/5">
            <span>
              Showing <strong className="text-white">{filteredProjects.length}</strong> of {projects.length} projects
            </span>
            {(selectedCategory !== 'All' || selectedTech !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTech('All');
                  setSearchQuery('');
                }}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="p-6 rounded-3xl bg-surface/50 border border-white/5 animate-pulse h-80 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10"></div>
                  <div className="h-6 bg-white/10 rounded-md w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded-md w-full"></div>
                  <div className="h-4 bg-white/5 rounded-md w-2/3"></div>
                </div>
                <div className="h-10 bg-white/10 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-surface/40 rounded-3xl border border-white/10 max-w-xl mx-auto p-8">
            <Info className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold text-white mb-2">No Projects Match Your Search</h3>
            <p className="text-gray-400 text-sm mb-6">
              Try searching for a different skill (like Python, React, FastAPI) or reset your filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTech('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-primary text-black font-semibold text-xs font-mono hover:opacity-90 transition-all"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.08 }}
                className="group p-6 rounded-3xl bg-surface border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl hover:-translate-y-1"
              >
                {/* Ambient Top Glow */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${project.gradient || 'from-primary/10 to-transparent'} rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-125 pointer-events-none`}></div>

                <div>
                  {/* Top Header Card Info */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner">
                      {getProjectIcon(project)}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-1.5 justify-end">
                      {project.isLive && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Live
                        </span>
                      )}
                      {project.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono">
                          {project.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                    {project.displayName || project.name}
                  </h3>

                  {/* Short Tagline / Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.tagline || project.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md bg-white/5 text-[11px] font-mono text-gray-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                  <button
                    onClick={() => handleOpenDetails(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-primary/20 hover:border-primary/40 border border-white/10 text-white hover:text-primary text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:text-cyan-400 text-gray-300 transition-all"
                      aria-label="GitHub Repository"
                      title="View GitHub Repository"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}

                  {project.isLive && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-white transition-all"
                      aria-label="Live Demo"
                      title="Open Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom GitHub Profile Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-surface to-secondary/10 border border-white/15 backdrop-blur-xl text-center relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-primary shadow-lg">
              <FaGithub className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Want to inspect more code and experiments?
            </h3>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Explore all 21+ open-source repositories, architectural prototypes, and scripts directly on my GitHub.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://github.com/KadariUday"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-primary text-black font-semibold text-sm font-mono flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105"
              >
                <FaGithub className="w-4 h-4" />
                <span>Explore GitHub Profile (@KadariUday)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <span>Discuss a Project</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Projects;
