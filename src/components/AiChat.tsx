import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export function AiChat() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: t('chat.greeting') }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && messages.length === 1 && messages[0].text === t('chat.greeting')) return
    setMessages([{ role: 'assistant', text: t('chat.greeting') }])
  }, [t])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const conversation = messages
        .filter((m) => m.role === 'user')
        .map((m) => ({ role: 'user' as const, parts: [{ text: m.text }] }))
      conversation.push({ role: 'user', parts: [{ text: userMsg }] })

      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDWEy2rEEbxm13fzk8TeGaXpvjL3i2qfCY',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{
                text: 'You are Nairi — Slav Hayrapetyan\'s AI portfolio assistant. Introduce yourself as Nairi when greeting. Answer questions about Slav\'s projects (Nairi, eGrabar, World Engine, CleanEx, AI Legal Guardian, Chronos Nexus), his skills (React, Next.js, TypeScript, Python, AI/ML, Three.js), his experience (Locator CJSC, TUMO, ACA, NPUA), and his contact info. Be concise, friendly, and helpful.',
              }],
            },
            contents: conversation,
          }),
        }
      )

      if (!res.ok) {
        const errText = await res.text().catch(() => '')
        throw new Error(`Gemini API ${res.status}: ${errText}`)
      }
      const data = await res.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || t('chat.error')
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setMessages((prev) => [...prev, { role: 'assistant', text: `⚠️ ${msg}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transition-shadow"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-400" />
                <span className="text-sm font-medium text-white">Nairi</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-purple-600/20 text-purple-200 border border-purple-500/20'
                        : 'bg-white/5 text-gray-300 border border-white/5'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl bg-white/5 text-gray-400 text-sm border border-white/5">
                    {t('chat.thinking')}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex items-center gap-2 p-3 border-t border-white/5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/30 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center disabled:opacity-30 hover:bg-purple-600/30 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
