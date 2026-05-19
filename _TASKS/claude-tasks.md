# Claude Tasks — Mandy

## ✅ Complété

- [x] Brand assets: favicon.svg, logo-full.svg, favicons PNG (16→512)
- [x] Scaffold Next.js 16 avec TypeScript + Tailwind + App Router
- [x] Lib: campaigns.ts (4 campagnes: Canagram, PostePro, AmateurCast, ComptaB)
- [x] Components: Logo, Header, Footer, CampaignCard
- [x] Pages: home, /campaigns, /campaign/[slug], /how-it-works, /merci
- [x] API: /api/checkout (Stripe Checkout CAD, force-dynamic)
- [x] Client: DonateButton (sélecteur montant + redirect Stripe)
- [x] Build propre: tsc 0 err, 11 routes, Turbopack ✅
- [x] amplify.yml (npm ci --legacy-peer-deps + next build)
- [x] GitHub: https://github.com/GroupeB-Canada/mandy (commit 88d44cf)
- [x] AWS Amplify app: d2uyokqm9uaong (ca-central-1, WEB_COMPUTE)
- [x] Amplify branche main (auto-build activé)
- [x] Route53: mandy.groupeb.ca CNAME → d36r5pabl5flee.cloudfront.net
- [x] Amplify domain association: mandy.groupeb.ca (PENDING_VERIFICATION → auto-SSL)

## 🟡 En attente de JP

- [ ] Stripe keys dans Amplify env vars (STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
- [ ] Test E2E don sur device réel (voir jp-tasks.md)

## 📋 Backlog

- [ ] Terms of service + Privacy policy (Loi 25) pages
- [ ] Analytics GA4 (NEXT_PUBLIC_GA_MEASUREMENT_ID)
- [ ] CloudWatch alarms (erreurs 5xx, latence p95)
- [ ] Stripe webhook (confirmation côté serveur)
- [ ] Email de remerciement post-don (SES)
- [ ] Compteur "raised" temps réel (DynamoDB ou RDS)
- [ ] Stripe Connect pour ouvrir à d'autres créateurs

---
Mis à jour: 2026-05-16 par Claude
