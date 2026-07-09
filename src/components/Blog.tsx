import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'
import { blogPosts } from '../data/blog'

export function Blog() {
  const { t } = useTranslation()

  return (
    <section id="blog" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('blog.title') }} />
          <p className="text-gray-400 max-w-xl mx-auto">{t('blog.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-purple-500/20 transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span>{post.date}</span>
                <span>·</span>
                <span>{t('blog.read_more')}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{post.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
              <ExternalLink size={14} className="text-gray-600 mt-3 group-hover:text-purple-400 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
