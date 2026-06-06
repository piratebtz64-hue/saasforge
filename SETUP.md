# 🚀 Guide de Démarrage Ultime - SaaSForge

**Bienvenue dans SaaSForge** — Le template SaaS Next.js le plus complet et professionnel que tu puisses avoir.

Ce guide te permet de lancer ton projet **en moins de 10 minutes**, même si tu es débutant.

> ⚠️ **Important** : Tu as besoin d'un **ordinateur** (PC ou Mac). Le téléphone ne suffit pas pour les étapes techniques.

---

## ✅ Prérequis (1 minute)

Avant de commencer, assure-toi d'avoir :

1. **Node.js 18+** installé  
   → Télécharge-le ici : [nodejs.org](https://nodejs.org)
2. Un bon éditeur : **VS Code** (recommandé)
3. Un compte GitHub (tu en as déjà un)

---

## 🔄 Étape 1 : Télécharger le projet (30 secondes)

1. Va sur : [https://github.com/piratebtz64-hue/saasforge](https://github.com/piratebtz64-hue/saasforge)
2. Clique sur le bouton vert **Code** → **Download ZIP**
3. Dézippe le fichier
4. Ouvre le dossier `saasforge` dans ton terminal

---

## 🔧 Étape 2 : Installation (2 minutes)

Dans le terminal, tape ces commandes **une par une** :

```bash
# 1. Installe toutes les dépendances
npm install

# 2. Crée ton fichier de configuration
cp .env.example .env.local
```

Attends que `npm install` se termine (1-2 minutes).

---

## 🔐 Étape 3 : Configurer Supabase (3 minutes)

1. Va sur [https://supabase.com](https://supabase.com) et clique sur **Start your project**
2. Crée un nouveau projet (nom + région au choix)
3. Une fois créé, va dans le menu de gauche :
   - **Settings** → **API**
4. Copie ces deux valeurs dans ton fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Dans Supabase, va dans **SQL Editor** (menu de gauche)
6. Ouvre le fichier `supabase/schema.sql` de ton projet
7. Copie **tout le contenu** et colle-le dans l'éditeur SQL
8. Clique sur **Run** (ou `Ctrl/Cmd + Enter`)

✅ Supabase est maintenant configuré !

---

## 🤖 Étape 4 : Activer l'IA Groq (gratuit - fortement recommandé)

1. Va sur [https://console.groq.com/keys](https://console.groq.com/keys)
2. Connecte-toi avec GitHub ou Google
3. Clique sur **Create API Key**
4. Copie la clé et colle-la ici :

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

L'IA est maintenant active dans le Playground.

---

## 🚀 Étape 5 : Lancer le projet

Dans le terminal, tape :

```bash
npm run dev
```

Ouvre ton navigateur et va sur :
**http://localhost:3000**

Tu devrais voir la belle landing page de SaaSForge !

---

## 🎯 Que faire maintenant ?

1. Clique sur **Sign up** et crée un compte
2. Connecte-toi
3. Explore le **Dashboard** (protégé par authentification)
4. Va dans **Playground IA** et teste l'intelligence artificielle
5. Va dans **Billing** pour voir les plans d'abonnement

---

## 💳 Configuration Stripe (optionnelle mais très puissante)

Si tu veux que les boutons d'abonnement fonctionnent vraiment :

### 1. Créer des prix dans Stripe (Test Mode)

1. Va sur [https://dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)
2. Crée deux produits :
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

### 3. (Avancé) Activer les webhooks Stripe

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Puis copie le `whsec_...` dans `.env.local`.

---

## 🚨 En cas de problème (Dépannage)

| Problème                              | Solution                                                                 |
|-------------------------------------------|--------------------------------------------------------------------------|
| `npm install` ne marche pas              | Supprime `node_modules` et `package-lock.json`, puis relance `npm install` |
| Erreur Supabase                           | Vérifie que tu as bien exécuté `schema.sql` dans SQL Editor                |
| Le Playground IA ne marche pas           | Vérifie que `GROQ_API_KEY` est bien dans `.env.local`                     |
| Page blanche ou erreur                   | Ouvre la console du navigateur (F12) et regarde les erreurs dans le terminal |
| "Module not found"                      | Relance `npm install`                                                    |
| Les boutons Stripe ne font rien          | Vérifie que les Price IDs sont bien remplis dans `.env.local`            |

---

## 📝 Variables d'environnement complètes

Ouvre `.env.local` et remplis-le comme ceci :

```env
# === SUPABASE (OBLIGATOIRE) ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === GROQ IA (RECOMMANDÉ) ===
GROQ_API_KEY=

# === STRIPE (OPTIONNEL) ===
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# === PRIX STRIPE ===
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID=
NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=

# === APPLICATION ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎉 Félicitations !

Tu as maintenant un **vrai SaaS professionnel** qui tourne en local :

- Authentification sécurisée
- Système de rôles (Free / Pro / Enterprise)
- Playground IA avec quotas
- Billing Stripe complet (Checkout + Customer Portal)
- Dashboard moderne et protégé

Tu peux maintenant :
- L'utiliser pour lancer ton propre produit
- Le personnaliser
- Le vendre comme template premium

**Projet créé avec soin et minutie pour toi.**

Besoin d'aide ? Crée une Issue sur GitHub.
