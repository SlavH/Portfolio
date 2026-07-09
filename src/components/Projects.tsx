import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink, GitBranch } from 'lucide-react'
import { projects } from '../data/projects'

export function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('projects.title') }} />
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">{t('projects.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2 group-hover:text-purple-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 min-h-[60px]">
                  {p.descKey}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-gray-500 border border-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink size={12} />
                      {t('projects.live')}
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-purple-300 transition-colors"
                    >
                      <GitBranch size={12} />
                      {t('projects.code')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
