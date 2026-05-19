# JP Tasks — Mandy

Ces tâches sont physiquement impossibles pour Claude. Chacune est click-par-click.

---

## 🔴 CRITIQUE — Stripe (sans ça, zéro don possible)

### 1. Ajouter STRIPE_SECRET_KEY dans Amplify
1. Aller sur https://console.aws.amazon.com/amplify/
2. Cliquer sur l'app **mandy** (ID: d2uyokqm9uaong)
3. Onglet **Environment variables**
4. Cliquer **Add variable**
5. Key: `STRIPE_SECRET_KEY`  Value: ta clé `sk_live_...` (ou `sk_test_...` pour tests)
6. Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`  Value: ta clé `pk_live_...` (ou `pk_test_...`)
7. Cliquer **Save**
8. Déclencher un nouveau build : Onglet **Hosting** > **Run build**

### 2. Confirmer ton compte Stripe
- S'assurer que ton compte Stripe (https://dashboard.stripe.com) est en mode **Live** et vérifié
- Sinon les dons ne passeront pas en production

---

## 🟠 IMPORTANT — Test du flow de don

Après que le build Amplify soit vert :
1. Ouvrir https://mandy.groupeb.ca (ou le domaine Amplify temporaire)
2. Cliquer sur une campagne
3. Choisir un montant → cliquer **Supporter ce projet**
4. Vérifier que la page Stripe Checkout s'ouvre
5. Faire un don test avec la carte Stripe test: `4242 4242 4242 4242` / expiry: `12/34` / CVC: `123`
6. Vérifier la page `/merci` s'affiche
7. Vérifier dans ton dashboard Stripe que le paiement test apparaît

---

## 🟡 OPTIONNEL — Stripe Connect (si tu veux ouvrir Mandy à d'autres créateurs)
- Créer un compte Stripe Connect Platform : https://dashboard.stripe.com/connect/overview
- Me donner le `STRIPE_CONNECT_CLIENT_ID`
- Je connecterai le flow pour que d'autres projets puissent recevoir des dons directement

---
Mis à jour: 2026-05-16 par Claude
