import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Mandy — Financez ce qui compte', template: '%s | Mandy' },
  description: 'La plateforme de financement communautaire québécoise. Soutenez les projets qui font avancer le Québec.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Mandy — Financez ce qui compte',
    description: 'La plateforme de financement communautaire québécoise.',
    url: 'https://mandy.groupeb.ca',
    siteName: 'Mandy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
