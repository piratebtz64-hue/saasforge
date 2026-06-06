# 🚀 Guide de Démarrage Ultime - SaaSForge

**Bienvenue !** Ce guide te permet de lancer **SaaSForge** en **moins de 10 minutes** même si tu es débutant.

> ⚠️ **Important** : Tu as besoin d'un **ordinateur** (PC ou Mac) pour les étapes ci-dessous. Le téléphone ne suffit pas.

---

## ✅ Prérequis (1 minute)

Avant de commencer, assure-toi d'avoir :

1. **Node.js** installé (version 18 ou plus)
   - Télécharge-le ici : [nodejs.org](https://nodejs.org)
2. Un éditeur de texte (VS Code recommandé)
3. Un compte GitHub (tu en as déjà un)

---

## 🔄 Étape 1 : Télécharger le projet

1. Va sur : [https://github.com/piratebtz64-hue/saasforge](https://github.com/piratebtz64-hue/saasforge)
2. Clique sur le bouton vert **Code** → **Download ZIP**
3. Dézippe le fichier sur ton ordinateur
4. Ouvre le dossier `saasforge` dans ton terminal / invite de commandes

---

## 🔧 Étape 2 : Installation (2 minutes)

Ouvre le **Terminal** (ou Invite de commandes) dans le dossier `saasforge` et tape ces commandes une par une :

```bash
# 1. Installe toutes les bibliothèques
npm install

# 2. Crée le fichier de configuration
cp .env.example .env.local
```

Attends que `npm install` finisse (1-2 minutes).

---

## 🔐 Étape 3 : Créer un compte Supabase (3 minutes)

1. Va sur [https://supabase.com](https://supabase.com) et clique sur **Start your project** (gratuit)
2. Crée un nouveau projet (choisis n'importe quel nom et région)
3. Une fois créé, va dans le menu de gauche :
   - **Settings** → **API**
4. Copie ces 2 valeurs dans ton fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Dans Supabase, va dans **SQL Editor** (dans le menu de gauche)
6. Copie **tout le contenu** du fichier `supabase/schema.sql` et colle-le dans l'éditeur SQL
7. Clique sur **Run** (ou `Ctrl/Cmd + Enter`)

---

## 🤖 Étape 4 : Configuration Groq IA (gratuit - fortement recommandé)

1. Va sur [https://console.groq.com/keys](https://console.groq.com/keys)
2. Connecte-toi avec GitHub ou Google
3. Clique sur **Create API Key**
4. Copie la clé et colle-la dans `.env.local` :

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 Étape 5 : Lancer le projet

Dans le terminal, tape :

```bash
npm run dev
```

Ouvre ton navigateur et va sur :
**http://localhost:3000**

Tu devrais voir la landing page de SaaSForge !

---

## 🎯 Que faire maintenant ?

1. Clique sur **Sign up** et crée un compte
2. Connecte-toi
3. Va dans **Dashboard** (protégé)
4. Va dans **Playground IA** pour tester l'intelligence artificielle
5. Va dans **Billing** pour voir les boutons d'abonnement

---

## 🔧 Configuration Stripe (optionnelle mais puissante)

Si tu veux que les boutons "S'abonner" fonctionnent vraiment :

### 1. Créer des prix dans Stripe (Test Mode)

1. Va sur [https://dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)
2. Crée 2 produits :
   - **Pro** (29€/mois ou 290€/an)
   - **Enterprise** (99€/mois ou 990€/an)
3. Copie les **Price IDs** (ils commencent par `price_`)

### 2. Ajoute-les dans `.env.local`

```env
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=price_xxxxxxxx
NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID=price_xxxxxxxx
NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_xxxxxxxx
NEXT_PUBLIC_STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=price_xxxxxxxx
```

### 3. (Avancé) Configurer le Webhook Stripe

Pour que les abonnements s'activent automatiquement :

```bash
# Installe Stripe CLI une seule fois
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Puis copie le `whsec_...` dans `.env.local`.

---

## 🚨 En cas de problème (Dépannage)

| Problème                        | Solution                                      |
|------------------------------------|-----------------------------------------------|
| `npm install` ne marche pas       | Supprime `node_modules` et `package-lock.json`, puis relance `npm install` |
| Erreur Supabase                    | Vérifie que tu as bien exécuté `schema.sql` dans SQL Editor |
| Le Playground IA ne marche pas    | Vérifie que `GROQ_API_KEY` est bien dans `.env.local` |
| Page blanche ou erreur           | Regarde la console du navigateur (F12) et le terminal |
| "Module not found"               | Relance `npm install`                         |

---

## 📄 Variables d'environnement complètes

Ouvre le fichier `.env.local` et remplis-le comme ceci :

```env
# === SUPABASE (Obligatoire) ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# === GROQ IA (Recommandé) ===
GROQ_API_KEY=

# === STRIPE (Optionnel) ===
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
SUPABASE_SERVICE_ROLE_KEY=

# === PRIX STRIPE ===
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID=
NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=

# === APP ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎉 Félicitations !

Tu as maintenant un **vrai SaaS professionnel** qui tourne en local :
- Authentification
- Rôles (Free / Pro / Enterprise)
- Playground IA
- Billing Stripe
- Dashboard protégé

Tu peux maintenant :
- L'utiliser pour ton propre projet
- Le personnaliser
- Le vendre comme template

---

**Besoin d'aide ?** Crée une Issue sur GitHub ou dis-moi ce que tu veux améliorer.

**Projet créé avec soin pour toi.**
