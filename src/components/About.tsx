import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import { Sparkles, Brain, Code } from 'lucide-react'

export function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const cards = [
    { icon: Code, key: 'card1' },
    { icon: Brain, key: 'card2' },
    { icon: Sparkles, key: 'card3' },
  ]

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('about.title') }} />
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            <Trans i18nKey="about.body" components={{ highlight: <span className="text-purple-300" /> }} />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <item.icon className="text-purple-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{t(`about.${item.key}_title`)}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t(`about.${item.key}_desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
