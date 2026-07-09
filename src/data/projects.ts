export interface Project {
  title: string
  descKey: string
  tags: string[]
  href: string | null
  github: string | null
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'Nairi',
    descKey: 'An AI-powered platform that turns text prompts into complete digital products — websites, apps, presentations, and more.',
    tags: ['Next.js', 'React 19', 'Supabase', 'Stripe', 'Three.js', 'Tailwind'],
    href: 'https://nairi-seven.vercel.app/',
    github: 'https://github.com/SlavH/Nairi',
    image: '',
    featured: true,
  },
  {
    title: 'eGrabar',
    descKey: 'Educational platform for preserving and teaching Classical Armenian (Grabar) with digital library, courses, and video hub.',
    tags: ['Next.js', 'React', 'Supabase', 'Stripe', 'CKEditor'],
    href: null,
    github: 'https://github.com/SlavH/eGrabar',
    image: '',
    featured: true,
  },
  {
    title: 'World Engine',
    descKey: 'Generative AI pipeline that transforms PDFs into interactive 3D explorable worlds using Llama 3.1, SDXL Turbo, and InstantMesh.',
    tags: ['Python', 'FastAPI', 'LangChain', 'vLLM', 'Three.js', 'Docker'],
    href: null,
    github: null,
    image: '',
    featured: false,
  },
  {
    title: 'CleanEx',
    descKey: 'CleanTech application with 3D physics simulation using React Three Fiber and Rapier physics engine.',
    tags: ['Next.js', 'Three.js', 'Rapier', 'GSAP', 'XState', 'Supabase'],
    href: null,
    github: null,
    image: '',
    featured: false,
  },
  {
    title: 'AI Legal Guardian',
    descKey: 'Real-time AI-powered legal protection platform. Captures audio via WebSocket, transcribes with Whisper, detects legal-risk signals.',
    tags: ['Python', 'FastAPI', 'Whisper', 'WebSocket', 'Docker'],
    href: null,
    github: null,
    image: '',
    featured: false,
  },
  {
    title: 'Chronos Nexus',
    descKey: 'Full PHP/MySQL e-commerce system for luxury watches with advanced analytics (RFM, ABC/XYZ, LTV, revenue forecasting).',
    tags: ['PHP 8', 'MySQL', 'JavaScript', 'HTML/CSS'],
    href: null,
    github: null,
    image: '',
    featured: false,
  },
]
