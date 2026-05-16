import Logo from './Logo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg" style={{color:'var(--mandy-red)'}}>
            <Logo size={28}/> MANDY
          </div>
          <p className="text-sm text-gray-500 mt-2 max-w-xs">Financez ce qui compte. La plateforme de financement communautaire québécoise.</p>
          <p className="text-xs text-gray-400 mt-3">Une initiative de <a href="https://groupeb.ca" className="underline hover:text-red-600">GroupeB.ca</a></p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="font-semibold text-gray-800 mb-2">Plateforme</p>
            <ul className="space-y-1.5 text-gray-500">
              <li><Link href="/campaigns" className="hover:text-red-600">Toutes les campagnes</Link></li>
              <li><Link href="/how-it-works" className="hover:text-red-600">Comment ça marche</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-2">Légal</p>
            <ul className="space-y-1.5 text-gray-500">
              <li><Link href="/terms" className="hover:text-red-600">Conditions d&apos;utilisation</Link></li>
              <li><Link href="/privacy" className="hover:text-red-600">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Mandy / GroupeB.ca — Rawdon, Québec
      </div>
    </footer>
  )
}
