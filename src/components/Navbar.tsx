import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { href: '#projects', key: 'projects' },
  { href: '#skills', key: 'skills' },
  { href: '#experience', key: 'experience' },
  { href: '#blog', key: 'blog' },
  { href: '#contact', key: 'contact' },
]

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  const changeLang = (lng: string) => i18n.changeLanguage(lng)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--nav-bg)] border-b border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          SH
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                active === l.key ? 'text-purple-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs border border-[var(--border)] rounded-lg p-0.5">
            {['EN', 'RU', 'ARM'].map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l === 'EN' ? 'en' : l === 'RU' ? 'ru' : 'arm')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  i18n.language === (l === 'EN' ? 'en' : l === 'RU' ? 'ru' : 'arm')
                    ? 'bg-purple-600/20 text-purple-300'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] px-6 py-4 flex flex-col gap-3"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm transition-colors ${
                active === l.key ? 'text-purple-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
          <div className="flex items-center gap-2 text-xs pt-2 border-t border-[var(--border)]">
            {['EN', 'RU', 'ARM'].map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l === 'EN' ? 'en' : l === 'RU' ? 'ru' : 'arm')}
                className={`px-2 py-1 rounded-md ${
                  i18n.language === (l === 'EN' ? 'en' : l === 'RU' ? 'ru' : 'arm')
                    ? 'bg-purple-600/20 text-purple-300'
                    : 'text-gray-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
