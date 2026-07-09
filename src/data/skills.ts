export interface SkillCategory {
  titleKey: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    titleKey: 'frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
  },
  {
    titleKey: 'backend',
    skills: ['Node.js', 'PHP', 'Laravel', 'Python', 'PostgreSQL', 'REST APIs', 'WebSockets'],
  },
  {
    titleKey: 'ai_ml',
    skills: ['LLMs', 'AI Agents', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'LangChain'],
  },
  {
    titleKey: 'tools',
    skills: ['Docker', 'Git', 'Linux', 'Vite', 'Webpack', 'Redis', 'Supabase'],
  },
]
