import { campaigns } from '@/lib/campaigns'
import CampaignCard from '@/components/CampaignCard'

export const metadata = { title: 'Toutes les campagnes' }

export default function CampaignsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-2">Tous les projets</h1>
      <p className="text-gray-500 mb-8">Chaque projet est développé par GroupeB.ca. Votre don accélère directement le développement.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(c => <CampaignCard key={c.slug} c={c}/>)}
      </div>
    </div>
  )
}
