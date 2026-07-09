import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('not_found.title')}</h1>
          <p className="text-gray-400 mb-8">{t('not_found.desc')}</p>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            {t('not_found.home')}
          </a>
        </motion.div>
      </div>
    </div>
  )
}
