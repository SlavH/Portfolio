export interface BlogPost {
  title: string
  desc: string
  date: string
  url: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Building Nairi: A Reality Executor with Next.js and AI',
    desc: 'How I built an AI platform that generates complete digital products from text prompts — the architecture, challenges, and lessons learned.',
    date: '2026-06-15',
    url: 'https://t.me/SlavHayrapetyan',
    tags: ['Next.js', 'AI', 'Architecture'],
  },
  {
    title: 'From PDF to 3D World: Building a Generative AI Pipeline',
    desc: 'Exploring how to transform static PDF documents into interactive 3D explorable worlds using Llama 3.1, SDXL Turbo, and InstantMesh.',
    date: '2026-05-20',
    url: 'https://t.me/SlavHayrapetyan',
    tags: ['AI', '3D', 'Python', 'ML'],
  },
  {
    title: 'AI Agents in Production: Lessons from OpenJarvis',
    desc: 'What I learned contributing to Stanford\'s OpenJarvis framework — building reliable, local-first AI agents for real-world tasks.',
    date: '2026-04-10',
    url: 'https://t.me/SlavHayrapetyan',
    tags: ['AI Agents', 'Python', 'Production'],
  },
]
