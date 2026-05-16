export interface Campaign {
  slug: string
  title: string
  description: string
  longDescription: string
  goal: number
  raised: number
  backers: number
  daysLeft: number
  category: string
  image: string
  stripeProductId?: string
}

export const campaigns: Campaign[] = [
  {
    slug: 'canagram',
    title: 'Canagram',
    description: 'La messagerie privée québécoise — chiffrement de bout en bout, hébergée au Canada.',
    longDescription: 'Canagram est une application de messagerie 100% québécoise avec chiffrement de bout en bout, PIN de sécurité, et hébergement AWS Canada. Votre vie privée, vos données, au Québec.',
    goal: 10000,
    raised: 0,
    backers: 0,
    daysLeft: 45,
    category: 'Tech',
    image: '/campaigns/canagram.png',
  },
  {
    slug: 'postepro',
    title: 'PostePro',
    description: 'Plateforme de gestion postale intelligente pour PME québécoises.',
    longDescription: 'PostePro automatise la gestion du courrier entrant et sortant pour les PME. Numérisation automatique, archivage cloud, et intégration comptable.',
    goal: 8000,
    raised: 0,
    backers: 0,
    daysLeft: 45,
    category: 'SaaS',
    image: '/campaigns/postepro.png',
  },
  {
    slug: 'amateurcast',
    title: 'AmateurCast',
    description: 'La plateforme de streaming pour le sport amateur québécois.',
    longDescription: 'AmateurCast permet aux équipes sportives amateurs de diffuser leurs matchs en direct. Aucun équipement spécialisé requis — juste un téléphone.',
    goal: 15000,
    raised: 0,
    backers: 0,
    daysLeft: 45,
    category: 'Sport',
    image: '/campaigns/amateurcast.png',
  },
  {
    slug: 'comptab',
    title: 'ComptaB',
    description: 'Le logiciel de comptabilité 100% québécois, alternatif à QuickBooks.',
    longDescription: 'ComptaB est le seul logiciel de comptabilité conçu spécifiquement pour les PME québécoises : TPS/TVQ automatique, conforme Revenu Québec et Loi 25, bilingue FR/EN.',
    goal: 12000,
    raised: 0,
    backers: 0,
    daysLeft: 45,
    category: 'Finance',
    image: '/campaigns/comptab.png',
  },
]

export function getCampaign(slug: string) {
  return campaigns.find(c => c.slug === slug)
}
