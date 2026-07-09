import { useRef, useEffect, useState } from 'react'

const LINES = [
  { cmd: 'git clone https://github.com/SlavH/Nairi.git', delay: 400 },
  { cmd: 'Cloning into Nairi...', delay: 600, output: true },
  { cmd: 'Receiving objects: 100% (2.4k/2.4k), done.', delay: 800, output: true },
  { cmd: '', delay: 200 },
  { cmd: 'cd Nairi && npm install', delay: 500 },
  { cmd: 'added 1842 packages in 12s', delay: 700, output: true },
  { cmd: '', delay: 200 },
  { cmd: 'npm run dev', delay: 400 },
  { cmd: '▲ Next.js 16.0.0', delay: 500, output: true },
  { cmd: '➜ Local: http://localhost:3000', delay: 300, output: true },
  { cmd: '➜ Ready in 2.3s', delay: 400, output: true },
  { cmd: '', delay: 300 },
  { cmd: '# Building World Engine pipeline...', delay: 600 },
  { cmd: '✓ PDF ingested via LangChain RAG', delay: 500, output: true },
  { cmd: '✓ World description generated (Llama 3.1 70B)', delay: 700, output: true },
  { cmd: '✓ 3D models created (InstantMesh)', delay: 600, output: true },
  { cmd: '', delay: 200 },
  { cmd: '# eGrabar — Classical Armenian Platform', delay: 500 },
  { cmd: '✓ Supabase connected', delay: 400, output: true },
  { cmd: '✓ Stripe integration ready', delay: 400, output: true },
  { cmd: '', delay: 300 },
  { cmd: '# Deploying to production...', delay: 500 },
  { cmd: '✓ Vercel deployment complete', delay: 600, output: true },
  { cmd: '✓ Ready: https://nairi-seven.vercel.app', delay: 800, output: true },
]

export function AsciiTerminal() {
  const [visible, setVisible] = useState(0)
  const lineRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let idx = 0

    function tick() {
      setVisible(LINES.length)
      setTimeout(() => {
        setVisible(0)
        idx = 0
        runNext()
      }, 3000)
    }

    function runNext() {
      if (idx >= LINES.length) {
        tick()
        return
      }
      const line = LINES[idx]
      idx++
      setVisible(idx)
      timerRef.current = setTimeout(runNext, line.delay)
    }

    runNext()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.5]">
      <div
        ref={lineRef}
        className="p-6 font-mono text-xs leading-relaxed"
        style={{ whiteSpace: 'pre' }}
      >
        {LINES.slice(0, visible).map((line, i) => {
          if (!line.cmd) return <div key={i}>&nbsp;</div>
          if (line.cmd.startsWith('#')) {
            return <div key={i} style={{ color: '#8b5cf6' }}>{line.cmd}</div>
          }
          if (line.cmd.startsWith('✓')) {
            return <div key={i} style={{ color: '#22d3ee' }}>{line.cmd}</div>
          }
          if (line.output) {
            return <div key={i} style={{ color: '#a78bfa' }}>{line.cmd}</div>
          }
          return (
            <div key={i}>
              <span style={{ color: '#8b5cf6' }}>$ </span>
              <span style={{ color: '#e2e8f0' }}>{line.cmd}</span>
            </div>
          )
        })}
        {visible < LINES.length && (
          <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-1" />
        )}
      </div>
    </div>
  )
}
