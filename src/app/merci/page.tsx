import Link from 'next/link'
import Logo from '@/components/Logo'

export const metadata = { title: 'Merci pour votre don !' }

export default async function MerciPage({ searchParams }: { searchParams: Promise<{project?:string,amount?:string}> }) {
  const { project, amount } = await searchParams
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size={80}/>
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Merci ! 🎉</h1>
        <p className="text-xl text-gray-600 mb-2">
          Votre don de <strong style={{color:'var(--mandy-red)'}}>{amount}$</strong> a bien été reçu.
        </p>
        <p className="text-gray-500 mb-8">Vous venez d&apos;accélérer le développement d&apos;un projet québécois. Ça compte vraiment.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {project && (
            <Link href={`/campaign/${project}`} className="btn-red px-6 py-3 inline-block">Retour au projet</Link>
          )}
          <Link href="/campaigns" className="px-6 py-3 border-2 border-gray-200 rounded-full font-semibold text-gray-700 hover:border-red-300 transition-colors inline-block">Voir d&apos;autres projets</Link>
        </div>
      </div>
    </div>
  )
}
