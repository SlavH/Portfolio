import { useRef, useEffect } from 'react'

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'

interface Stream {
  x: number
  y: number
  speed: number
  length: number
  chars: string[]
}

function randomChar(): string {
  return KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
}

function randomDiffChar(prev: string): string {
  let c: string
  do { c = randomChar() } while (c === prev)
  return c
}

export function AsciiRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0
    const streams: Stream[] = []
    const fontSize = 26
    let animId = 0

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
      const cols = Math.floor(w / (fontSize * 1.5))
      streams.length = 0
      for (let i = 0; i < cols; i++) {
        if (Math.random() > 0.55) continue
        const len = 8 + Math.floor(Math.random() * 15)
        streams.push({
          x: i * fontSize * 1.5,
          y: -Math.random() * h,
          speed: 30 + Math.random() * 15,
          length: len,
          chars: Array.from({ length: len }, () => randomChar()),
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx!.fillStyle = 'rgba(10,10,15,0.05)'
      ctx!.fillRect(0, 0, w, h)

      ctx!.font = `${fontSize}px monospace`
      ctx!.textAlign = 'center'

      for (const s of streams) {
        s.y += s.speed
        if (s.y > h + s.length * fontSize) {
          s.y = -s.length * fontSize
          s.chars = Array.from({ length: s.length }, () => randomChar())
        }

        s.chars.unshift(randomDiffChar(s.chars[0]))
        s.chars.pop()

        for (let i = 0; i < s.length; i++) {
          const y = s.y - i * fontSize
          if (y < -fontSize || y > h + fontSize) continue

          s.chars[i] = randomDiffChar(s.chars[i])

          const t = i / s.length
          const char = s.chars[i]

          const tx = s.x / w
          const r = Math.round(217 - 211 * tx)
          const g = Math.round(70 + 112 * tx)
          const b = Math.round(239 - 27 * tx)

          ctx!.fillStyle = `rgb(${r},${g},${b})`
          ctx!.globalAlpha = i === 0 ? 1 : Math.max(0, 0.35 * (1 - t))

          ctx!.fillText(char, s.x, y)
        }
      }

      ctx!.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
