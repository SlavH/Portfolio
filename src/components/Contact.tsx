import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Code, UserRound, MessageCircle, Globe, ExternalLink } from 'lucide-react'

const contacts = [
  { icon: Code, label: 'GitHub', value: '@SlavH', href: 'https://github.com/SlavH' },
  { icon: UserRound, label: 'LinkedIn', value: 'Slav Hayrapetyan', href: 'https://www.linkedin.com/in/slav-hayrapetyan-b867a5243/' },
  { icon: MessageCircle, label: 'Telegram', value: '@SlavHayrapetyan', href: 'https://t.me/SlavHayrapetyan' },
  { icon: Mail, label: 'Email', value: 'slavhayrapetyan10@gmail.com', href: 'mailto:slavhayrapetyan10@gmail.com' },
  { icon: Globe, label: 'Habr Career', value: 'Slav Hayrapetyan', href: 'https://career.habr.com/slav_hayrapetyan' },
  { icon: ExternalLink, label: 'Upwork', value: 'Slav H.', href: 'https://www.upwork.com/freelancers/~01286c5c27aa1b808d' },
]

export function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] hover:border-purple-500/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <c.icon className="text-purple-400" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">{c.label}</p>
                <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors truncate">
                  {c.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
