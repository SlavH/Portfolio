import { useRef, useEffect } from 'react'

const CHARS = ' .-~=*#%@'

export function AsciiMandelbrot() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, cols = 0, rows = 0
    const cellSize = 8
    let zoom = 1
    let offsetX = -0.5
    let offsetY = 0
    let animId = 0

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
      cols = Math.floor(w / cellSize)
      rows = Math.floor(h / cellSize)
    }

    resize()
    window.addEventListener('resize', resize)

    function mandelbrot(px: number, py: number, maxIter: number): number {
      const x0 = (px / cols - 0.5) * 3.5 / zoom + offsetX
      const y0 = (py / rows - 0.5) * 2.5 / zoom + offsetY
      let x = 0, y = 0, iter = 0
      while (x * x + y * y <= 4 && iter < maxIter) {
        const xt = x * x - y * y + x0
        y = 2 * x * y + y0
        x = xt
        iter++
      }
      return iter
    }

    function draw() {
      if (document.hidden) {
        animId = requestAnimationFrame(draw)
        return
      }
      zoom *= 1.001
      offsetX += 0.00005
      offsetY += 0.00002

      ctx!.fillStyle = 'rgba(10,10,15,0.3)'
      ctx!.fillRect(0, 0, w, h)

      ctx!.font = `${cellSize - 1}px monospace`
      ctx!.textAlign = 'center'

      const maxIter = 50 + Math.floor(Math.sin(Date.now() * 0.0005) * 20)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const iter = mandelbrot(x, y, maxIter)
          if (iter >= maxIter) continue

          const t = iter / maxIter
          const idx = Math.floor(t * (CHARS.length - 1))
          const char = CHARS[Math.min(idx, CHARS.length - 1)]

          const r = Math.round(139 + (6 - 139) * t)
          const g = Math.round(92 + (182 - 92) * t)
          const b = Math.round(246 + (212 - 246) * t)

          ctx!.fillStyle = `rgb(${r},${g},${b})`
          ctx!.globalAlpha = 0.05 + t * 0.35
          ctx!.fillText(char, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2 + 2)
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
