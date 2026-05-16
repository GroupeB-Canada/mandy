import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide" style={{color:'var(--mandy-red)'}}>
          <Logo size={36}/>
          MANDY
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/campaigns" className="hover:text-red-600 transition-colors">Campagnes</Link>
          <Link href="/how-it-works" className="hover:text-red-600 transition-colors">Comment ça marche</Link>
        </nav>
        <Link href="/campaigns" className="btn-red px-5 py-2 text-sm">
          Voir les projets
        </Link>
      </div>
    </header>
  )
}
