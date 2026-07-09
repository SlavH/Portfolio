import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { timeline } from '../data/experience'

export function Experience() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="relative z-10 max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('experience.title') }} />
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">{t('experience.subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/30 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-[13px] top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-[var(--bg)]" />

                <span className="text-xs text-purple-400 font-medium">{item.period}</span>
                <h3 className="text-lg font-semibold text-[var(--text)] mt-1">{item.title}</h3>
                <p className="text-sm text-cyan-300/70 mb-2">{item.subtitle}</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
