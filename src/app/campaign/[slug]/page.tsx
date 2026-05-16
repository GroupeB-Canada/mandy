import { campaigns, getCampaign } from '@/lib/campaigns'
import { notFound } from 'next/navigation'
import DonateButton from './DonateButton'

export async function generateStaticParams() {
  return campaigns.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params
  const c = getCampaign(slug)
  return { title: c?.title ?? 'Campagne' }
}

export default async function CampaignPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params
  const c = getCampaign(slug)
  if (!c) notFound()

  const pct = Math.min(100, Math.round((c.raised / c.goal) * 100))

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-10">
        {/* ── Main ── */}
        <div className="md:col-span-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600">{c.category}</span>
          <h1 className="text-4xl font-black mt-3 mb-4">{c.title}</h1>
          <div className="h-56 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-6">
            <span className="text-8xl font-black text-red-200">{c.title[0]}</span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">{c.longDescription}</p>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-1">💡 Pourquoi ce projet ?</p>
            <p>Votre don va directement financer le développement. Plus on avance vite, plus vous avez accès tôt à la version complète.</p>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-3xl font-black" style={{color:'var(--mandy-red)'}}>
              {c.raised.toLocaleString('fr-CA', {style:'currency',currency:'CAD',maximumFractionDigits:0})}
            </p>
            <p className="text-sm text-gray-500">financé sur {c.goal.toLocaleString('fr-CA', {style:'currency',currency:'CAD',maximumFractionDigits:0})}</p>

            <div className="progress-bar h-3 my-4">
              <div className="progress-fill h-3" style={{width:`${pct}%`}}/>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-6">
              <div>
                <p className="font-black text-xl">{pct}%</p>
                <p className="text-xs text-gray-500">financé</p>
              </div>
              <div>
                <p className="font-black text-xl">{c.backers}</p>
                <p className="text-xs text-gray-500">supporters</p>
              </div>
              <div>
                <p className="font-black text-xl">{c.daysLeft}</p>
                <p className="text-xs text-gray-500">jours</p>
              </div>
            </div>

            <DonateButton slug={c.slug} title={c.title}/>

            <p className="text-xs text-gray-400 text-center mt-3">
              Paiement sécurisé via Stripe.<br/>
              Les dons financent le développement, pas des actions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
