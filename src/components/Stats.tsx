import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const stats = [
  { value: 4, suffix: '+', key: 'years' },
  { value: 18, suffix: '+', key: 'projects' },
  { value: 86, suffix: '+', key: 'clients' },
  { value: 11, suffix: '', key: 'repos' },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let animId: number
    const duration = 1500
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * to))
      if (progress < 1) {
        animId = requestAnimationFrame(animate)
      }
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [inView, to])

  return (
    <span ref={ref}>
      {inView ? display : 0}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { t } = useTranslation()

  return (
    <section className="py-16 px-6 border-y border-white/5">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-gray-500 mt-1">{t(`stats.${s.key}`)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
