import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Slav Hayrapetyan. {t('footer.built')}.
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <a href="https://github.com/SlavH" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/slav-hayrapetyan-b867a5243/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">LinkedIn</a>
          <a href="mailto:slavhayrapetyan10@gmail.com" className="hover:text-gray-400 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  )
}
