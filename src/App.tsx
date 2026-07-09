import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { LandingsCarousel } from './components/LandingsCarousel'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Blog } from './components/Blog'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AiChat } from './components/AiChat'
import { AsciiManager } from './components/effects/AsciiManager'
import { NotFound } from './components/NotFound'
import { useTheme } from './hooks/useTheme'
import { ReactLenis } from 'lenis/react'

function AppContent() {
  useTheme()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      if (a && a.href && a.href.startsWith(window.location.origin + '/') && !a.getAttribute('target')) {
        e.preventDefault()
        const p = new URL(a.href).pathname
        window.history.pushState({}, '', p)
        setPath(p)
      }
    }
    const handlePop = () => setPath(window.location.pathname)
    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePop)
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePop)
    }
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  if (path !== '/') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <NotFound />
      </div>
    )
  }

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-purple-500/30">
        <Navbar />
        <AsciiManager />
        <main className="relative z-10">
          <Hero />
          <About />
          <Stats />
          <LandingsCarousel />
          <Skills />
          <Projects />
          <Experience />
          <Blog />
          <Contact />
          <Footer />
        </main>
        <AiChat />
      </div>
    </ReactLenis>
  )
}

function App() {
  return <AppContent />
}

export default App
