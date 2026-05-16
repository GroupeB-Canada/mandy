import Link from 'next/link'
import { Campaign } from '@/lib/campaigns'

export default function CampaignCard({ c }: { c: Campaign }) {
  const pct = Math.min(100, Math.round((c.raised / c.goal) * 100))
  return (
    <Link href={`/campaign/${c.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-44 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <span className="text-5xl font-black text-red-200">{c.title[0]}</span>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600">{c.category}</span>
        <h3 className="mt-2 font-bold text-lg group-hover:text-red-600 transition-colors">{c.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{c.description}</p>
        <div className="mt-4">
          <div className="progress-bar h-2">
            <div className="progress-fill h-2" style={{width: `${pct}%`}}/>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1.5">
            <span><strong className="text-gray-900">{pct}%</strong> financé</span>
            <span><strong className="text-gray-900">{c.backers}</strong> supporters</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">{c.daysLeft} jours restants</span>
          <span className="text-sm font-bold text-red-600">{c.raised.toLocaleString('fr-CA', {style:'currency',currency:'CAD',maximumFractionDigits:0})} / {c.goal.toLocaleString('fr-CA', {style:'currency',currency:'CAD',maximumFractionDigits:0})}</span>
        </div>
      </div>
    </Link>
  )
}
