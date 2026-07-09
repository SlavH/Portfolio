import { useEffect, useState } from 'react'
import { AsciiRain } from './AsciiRain'
import { AsciiWave } from './AsciiWave'
import { AsciiTerminal } from './AsciiTerminal'
import { AsciiMandelbrot } from './AsciiMandelbrot'

const SECTIONS = [
  { id: 'hero', Component: AsciiRain },
  { id: 'about', Component: AsciiWave },
  { id: 'experience', Component: AsciiTerminal },
  { id: 'contact', Component: AsciiMandelbrot },
]

export function AsciiManager() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ratios = new Array(SECTIONS.length).fill(0)
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }, i) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[i] = entry.intersectionRatio
          const maxRatio = Math.max(...ratios)
          if (maxRatio > 0) {
            const maxIndex = ratios.findIndex((r) => r === maxRatio)
            setActiveIndex(maxIndex)
          }
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
      {SECTIONS.map(({ Component }, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <Component />
        </div>
      ))}
    </div>
  )
}
