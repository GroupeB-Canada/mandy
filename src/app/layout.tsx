import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DebugScreenshotWidget from '@/components/DebugScreenshotWidget';

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
              {/* GroupeB Chatbot — Léa */}
      <Script src="https://groupeb-chatbot-widget-prod.s3.ca-central-1.amazonaws.com/chatbot.js" data-site="mandy" data-api="https://chatbot.groupeb.ca/api" data-lang="fr" strategy="afterInteractive" />

      <DebugScreenshotWidget siteId="mandy.groupeb.ca" />
      </body>
    </html>
  )
}
