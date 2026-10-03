// GitHub Synchronization and Data Mapping Service
// Gracefully merges live GitHub API repository telemetry with curated rich metadata.
// Includes caching, error fallbacks, and automatic formatting for new repositories.

import { PROJECTS_DATA } from '../data/projectsData.js';

const GITHUB_USERNAME = 'KadariUday';
const CACHE_KEY = 'kadari_uday_github_repos_v8';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

// Excluded repositories explicitly requested to be removed
export const EXCLUDED_KEYWORDS = [
  'agentic-ai-bootcamp',
  'jfs_visem',
  'plagarism',
  'plagiarism',
  'veritext',
  'lpd',
  'prompt_pilot',
  'diabetic-care-platform-'
];

export function isExcludedRepo(name) {
  if (!name) return false;
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return EXCLUDED_KEYWORDS.some(kw => {
    const kwClean = kw.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === kwClean || clean.includes(kwClean) || kwClean.includes(clean);
  });
}

function normalizeName(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Helper to format raw GitHub repo name into clean title
function formatRepoName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim();
}

// Helper to infer categories and tech for new/unmapped repositories
function inferRepoMetadata(repo) {
  const lang = repo.language || 'Code';
  const categories = ['All'];
  const tech = [];

  if (lang) tech.push(lang);

  const nameLower = repo.name.toLowerCase();
  const descLower = (repo.description || '').toLowerCase();
  const text = `${nameLower} ${descLower}`;

  if (text.includes('ai') || text.includes('ml') || text.includes('nlp') || text.includes('model')) {
    categories.push('AI / ML');
  }
  if (text.includes('prompt') || text.includes('llm') || text.includes('gpt') || text.includes('agent')) {
    categories.push('Generative AI');
  }
  if (text.includes('full') || text.includes('stack') || text.includes('api') || text.includes('backend') || text.includes('next') || text.includes('react')) {
    categories.push('Full Stack');
  }
  if (text.includes('web') || text.includes('site') || text.includes('frontend') || text.includes('html')) {
    categories.push('Web Development');
  }
  if (text.includes('health') || text.includes('medical') || text.includes('diabet') || text.includes('doctor')) {
    categories.push('Healthcare');
  }
  if (text.includes('security') || text.includes('phish') || text.includes('privacy') || text.includes('auth')) {
    categories.push('Cybersecurity');
  }
  if (lang === 'Python') categories.push('Python');
  if (lang === 'TypeScript') categories.push('TypeScript');
  if (lang === 'JavaScript') categories.push('JavaScript');

  if (categories.length === 1) {
    categories.push('Tools / Utilities');
  }

  return { categories, tech };
}

export async function fetchProjectsWithGitHub() {
  try {
    // 1. Check Session Cache First
    const cached = typeof window !== 'undefined' ? sessionStorage.getItem(CACHE_KEY) : null;
    if (cached) {
      try {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data)) {
          return mergeGitHubWithCurated(data);
        }
      } catch {
        // Cache parse error, proceed to fetch
      }
    }

    // 2. Fetch from GitHub API
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      },
      signal: controller?.signal
    });

    if (timeoutId) clearTimeout(timeoutId);

    const sanitizedCurated = PROJECTS_DATA.filter(p => !isExcludedRepo(p.repoName) && !isExcludedRepo(p.displayName));

    if (!response.ok) {
      // Return curated fallback on rate limit (403) or not found (404)
      return {
        projects: sanitizedCurated,
        featured: sanitizedCurated.filter(p => p.featured),
        totalCount: sanitizedCurated.length,
        liveCount: sanitizedCurated.filter(p => p.isLive).length,
        source: 'curated-fallback'
      };
    }

    const repos = await response.json();

    // Cache successful response
    if (typeof window !== 'undefined' && Array.isArray(repos)) {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: repos
        }));
      } catch {
        // storage full or unavailable
      }
    }

    return mergeGitHubWithCurated(repos);

  } catch (error) {
    // Graceful offline / error fallback
    const sanitizedCurated = PROJECTS_DATA.filter(p => !isExcludedRepo(p.repoName) && !isExcludedRepo(p.displayName));
    return {
      projects: sanitizedCurated,
      featured: sanitizedCurated.filter(p => p.featured),
      totalCount: sanitizedCurated.length,
      liveCount: sanitizedCurated.filter(p => p.isLive).length,
      source: 'offline-fallback'
    };
  }
}

function mergeGitHubWithCurated(repos) {
  const sanitizedCurated = PROJECTS_DATA.filter(p => !isExcludedRepo(p.repoName) && !isExcludedRepo(p.displayName));

  if (!Array.isArray(repos)) {
    return {
      projects: sanitizedCurated,
      featured: sanitizedCurated.filter(p => p.featured),
      totalCount: sanitizedCurated.length,
      liveCount: sanitizedCurated.filter(p => p.isLive).length,
      source: 'curated'
    };
  }

  const repoMap = new Map();
  repos.forEach(r => {
    if (!isExcludedRepo(r.name)) {
      repoMap.set(normalizeName(r.name), r);
    }
  });

  const merged = sanitizedCurated.map(curated => {
    const normCurated = normalizeName(curated.repoName);
    const liveRepo = repoMap.get(normCurated);
    if (liveRepo) {
      // Consume live repo
      repoMap.delete(normCurated);
      return {
        ...curated,
        stars: liveRepo.stargazers_count || curated.stars || 0,
        forks: liveRepo.forks_count || curated.forks || 0,
        updatedAt: liveRepo.updated_at || liveRepo.pushed_at,
        githubUrl: liveRepo.html_url || curated.githubUrl,
        liveUrl: (liveRepo.homepage && liveRepo.homepage.startsWith('http')) ? liveRepo.homepage : curated.liveUrl,
        isLive: Boolean((liveRepo.homepage && liveRepo.homepage.startsWith('http')) || curated.liveUrl),
        isFork: liveRepo.fork || false
      };
    }
    return curated;
  });

  // Automatically process any newly discovered repos not in our curated data and not excluded
  repoMap.forEach(newRepo => {
    if (isExcludedRepo(newRepo.name)) return;

    const { categories, tech } = inferRepoMetadata(newRepo);
    const hasLiveUrl = Boolean(newRepo.homepage && newRepo.homepage.startsWith('http'));

    merged.push({
      id: newRepo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      repoName: newRepo.name,
      displayName: formatRepoName(newRepo.name),
      tagline: newRepo.description || `Open-source project built with ${newRepo.language || 'modern technologies'}.`,
      description: newRepo.description || `A public software repository by Kadari Uday implementing ${newRepo.language || 'clean code'} architectures.`,
      problem: "Software problem addressed by this repository.",
      solution: "Implemented automated logic and modular components using standard development practices.",
      keyFeatures: [
        `Built using ${newRepo.language || 'modern languages'}`,
        "Modular and extensible codebase structure",
        "Publicly available source code on GitHub"
      ],
      technologies: tech.length ? tech : [newRepo.language || 'Code'],
      categories: categories,
      myRole: "Developer — Created and maintained repository code.",
      architecture: [
        { step: "User", detail: "Interacts with project" },
        { step: "Application Logic", detail: `Processes tasks using ${newRepo.language || 'clean architecture'}` }
      ],
      learning: `Practiced ${newRepo.language || 'software'} design principles and version control management.`,
      featured: false,
      isLive: hasLiveUrl,
      liveUrl: hasLiveUrl ? newRepo.homepage : "",
      githubUrl: newRepo.html_url,
      stars: newRepo.stargazers_count || 0,
      forks: newRepo.forks_count || 0,
      updatedAt: newRepo.updated_at,
      isFork: newRepo.fork || false,
      gradient: "from-slate-500/20 via-gray-500/10 to-transparent",
      iconColor: "text-gray-300",
      badge: newRepo.fork ? "Fork / Adaptation" : "Open Source"
    });
  });

  return {
    projects: merged,
    featured: merged.filter(p => p.featured),
    totalCount: merged.length,
    liveCount: merged.filter(p => p.isLive).length,
    source: 'github-synced'
  };
}
