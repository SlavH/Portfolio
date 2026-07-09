import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Pause, Play } from 'lucide-react'
import { landings } from '../data/landings'

const ITEMS_PER_VIEW = 6
const INTERVAL = 3000

export function LandingsCarousel() {
  const total = Math.ceil(landings.length / ITEMS_PER_VIEW)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setPage((p) => (p + 1) % total)
  }, [total])

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(next, INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, next])

  const batch = landings.slice(page * ITEMS_PER_VIEW, (page + 1) * ITEMS_PER_VIEW)

  return (
    <section id="landings" className="py-24 px-6 bg-[var(--bg-muted)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Client{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Landings
            </span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">{landings.length}+ websites built for businesses in Armenia</p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 min-h-[280px]">
            <AnimatePresence mode="wait">
              {batch.map((item) => (
                <motion.a
                  key={item.dir}
                  href={`https://slavh.github.io/Landings/${item.dir}/index.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-white font-medium truncate">{item.name}</span>
                      <ExternalLink size={12} className="text-white shrink-0" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setPage(i); setPaused(true) }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === page ? 'bg-purple-500 w-6' : 'bg-white/10 hover:bg-white/20 w-2'
              }`}
            />
          ))}
          <button
            onClick={() => setPaused(!paused)}
            className="ml-3 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-colors"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>

        <div className="text-center mt-6">
          <a
            href="https://slavh.github.io/Landings"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-purple-300 transition-colors"
          >
            <ExternalLink size={14} />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
