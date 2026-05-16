export const metadata = { title: 'Comment ça marche' }

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-4">Comment ça marche</h1>
      <p className="text-gray-500 text-lg mb-12">Mandy est une plateforme de dons pour financer des projets technologiques québécois développés par GroupeB.ca.</p>
      {[
        { t: 'Vous donnez, le projet avance', d: "Chaque don est directement utilisé pour financer le développement du projet que vous avez choisi. Pas d'intermédiaire, pas de délai." },
        { t: 'Paiement 100% sécurisé', d: "Tous les paiements sont traités par Stripe, le leader mondial du paiement en ligne. Vos informations bancaires ne passent jamais par nos serveurs." },
        { t: 'Un don, pas une action', d: "Votre contribution finance le développement. Vous ne recevez pas d'actions, de parts, ni de remboursement. C'est un soutien direct à l'innovation québécoise." },
        { t: 'Accès prioritaire', d: "Les supporters des projets sont les premiers informés du lancement et reçoivent souvent un accès beta prioritaire." },
        { t: 'Transparence totale', d: "Le montant collecté et le nombre de supporters sont affichés en temps réel sur chaque page de campagne." },
      ].map((s, i) => (
        <div key={i} className="flex gap-5 mb-8">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-sm" style={{background:'var(--mandy-red)'}}>{i+1}</div>
          <div>
            <h2 className="font-bold text-lg mb-1">{s.t}</h2>
            <p className="text-gray-500">{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
