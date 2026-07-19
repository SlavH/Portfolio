import { motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/50 to-[var(--bg)] z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-6">
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            {t('hero.name')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.desc1')}
          <br />
          <Trans i18nKey="hero.desc2" components={{ highlight: <span className="text-purple-300 font-medium" /> }} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            {t('hero.cta_work')}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-[var(--border)] text-gray-300 hover:bg-white/5 transition-colors"
          >
            {t('hero.cta_contact')}
          </a>
          <a
            href="/Portfolio/Slav_Hayrapetyan_Resume_EN.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors"
          >
            {t('hero.cta_cv')}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown className="text-gray-500 animate-bounce" size={20} />
      </motion.div>
    </section>
  )
}
