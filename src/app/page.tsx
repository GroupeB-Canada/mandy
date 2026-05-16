import Link from 'next/link'
import { campaigns } from '@/lib/campaigns'
import CampaignCard from '@/components/CampaignCard'
import Logo from '@/components/Logo'

export default function HomePage() {
  const featured = campaigns.slice(0, 3)
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size={90}/>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
            Financez ce qui<br/>
            <span style={{color:'var(--mandy-red)'}}>compte vraiment.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            La plateforme de financement communautaire 100% québécoise. Soutenez les projets technologiques et culturels qui font avancer le Québec.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaigns" className="btn-red px-8 py-4 text-lg inline-block text-center">
              Voir les projets →
            </Link>
            <Link href="/how-it-works" className="px-8 py-4 text-lg border-2 border-gray-200 rounded-full font-semibold text-gray-700 hover:border-red-300 transition-colors inline-block text-center">
              Comment ça marche
            </Link>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-50 rounded-full opacity-40 blur-3xl pointer-events-none"/>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          {[
            { val: '4', label: 'Projets actifs' },
            { val: '100%', label: 'Québécois' },
            { val: '0$', label: 'Pour commencer' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-black" style={{color:'var(--mandy-red)'}}>{s.val}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured campaigns ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900">Projets en vedette</h2>
          <Link href="/campaigns" className="text-sm font-semibold hover:underline" style={{color:'var(--mandy-red)'}}>Voir tous →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map(c => <CampaignCard key={c.slug} c={c}/>)}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-12">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', t: 'Choisissez un projet', d: 'Parcourez les campagnes et trouvez le projet qui vous inspire.' },
              { n: '02', t: 'Faites un don', d: 'Donnez le montant de votre choix. Paiement 100% sécurisé via Stripe.' },
              { n: '03', t: 'Le projet avance', d: 'Votre contribution accélère directement le développement.' },
            ].map(s => (
              <div key={s.n} className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-4xl font-black mb-3" style={{color:'var(--mandy-red)'}}>{s.n}</p>
                <p className="font-bold text-lg mb-2">{s.t}</p>
                <p className="text-gray-500 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-black text-gray-900">Prêt à faire la différence ?</h2>
        <p className="text-gray-500 mt-3 mb-8">Même 5$ peut accélérer un projet québécois.</p>
        <Link href="/campaigns" className="btn-red px-10 py-4 text-lg inline-block">Voir les projets</Link>
      </section>
    </>
  )
}
