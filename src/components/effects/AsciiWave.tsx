import { useRef, useEffect } from 'react'

const CHARS = ' .-~=*#%@'

export function AsciiWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, cols = 0, rows = 0
    const cellSize = 10
    let time = 0
    let animId = 0

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
      cols = Math.floor(w / cellSize)
      rows = Math.floor(h / cellSize)
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (document.hidden) {
        animId = requestAnimationFrame(draw)
        return
      }
      time += 0.02
      ctx!.fillStyle = 'rgba(10,10,15,0.15)'
      ctx!.fillRect(0, 0, w, h)

      ctx!.font = `${cellSize - 1}px monospace`
      ctx!.textAlign = 'center'

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = x / cols - 0.5
          const dy = y / rows - 0.5
          const dist = Math.sqrt(dx * dx + dy * dy)
          const val = Math.sin(x * 0.15 + time) * Math.cos(y * 0.12 + time * 0.7) + Math.sin(dist * 6 - time * 1.3) * 0.5
          const norm = (val + 1.5) / 3
          const idx = Math.floor(norm * (CHARS.length - 1))
          const char = CHARS[Math.min(idx, CHARS.length - 1)]

          const t = norm
          const r = Math.round(139 + (6 - 139) * t)
          const g = Math.round(92 + (182 - 92) * t)
          const b = Math.round(246 + (212 - 246) * t)

          ctx!.fillStyle = `rgb(${r},${g},${b})`
          ctx!.globalAlpha = 0.05 + t * 0.3
          ctx!.fillText(char, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2 + 3)
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
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}
