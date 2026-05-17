import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY manquante' }, { status: 500 })
    }

    const stripe = new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
    const { slug, amount, title } = await req.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mandy.groupeb.ca'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'cad',
          unit_amount: amount * 100,
          product_data: {
            name: `Don — ${title}`,
            description: `Soutenir le projet ${title} sur Mandy`,
          },
        },
      }],
      success_url: `${baseUrl}/merci?project=${slug}&amount=${amount}`,
      cancel_url: `${baseUrl}/campaign/${slug}`,
      metadata: { project: slug, campaign_title: title },
      custom_text: {
        submit: { message: 'Ce don finance directement le développement du projet. Non remboursable.' },
      },
      locale: 'fr',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[checkout] Erreur Stripe:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
