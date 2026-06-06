 'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:4px_4px]" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20">Nouveau • Template SaaS 2025</Badge>
            
            <h1 className="text-7xl font-semibold tracking-tighter md:text-8xl">
              Le template SaaS<br />le plus abouti.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/60">
              Authentification, IA, abonnements Stripe, rôles &amp; limites. Tout est déjà fait.
              Lancez votre produit en quelques jours au lieu de plusieurs mois.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-14 px-10 text-base">
                <Link href="/sign-up">Commencer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base border-white/20 hover:bg-white/5">
                <Link href="#features">Voir les fonctionnalités</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/40">Aucune carte bancaire requise • 14 jours d’essai Pro</p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            ↓
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-white/10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Fonctionnalités</Badge>
            <h2 className="text-5xl font-semibold tracking-tighter">Tout ce dont vous avez besoin.<br />Rien de superflu.</h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {[ 
              { title: "Authentification &amp; Rôles", desc: "Supabase Auth + système de rôles Free / Pro / Enterprise avec limites IA" },
              { title: "Playground IA Premium", desc: "Groq + plusieurs modèles (Llama 3.3, Gemma, Mixtral) + quotas en temps réel" },
              { title: "Billing Stripe Complet", desc: "Checkout + Customer Portal. Gérez abonnements, factures, cartes." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full border-white/10 bg-zinc-950/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base text-white/60 mt-2">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-5xl font-semibold tracking-tighter">Tarification simple.<br />Résultats immédiats.</h2>
          <p className="mt-4 text-white/60">Choisissez le plan qui correspond à votre ambition.</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Pricing cards with subtle hover animations */}
            {['Free', 'Pro', 'Enterprise'].map((plan, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className={`h-full ${plan === 'Pro' ? 'border-white/80 ring-1 ring-white/20' : 'border-white/10'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan}</CardTitle>
                      {plan === 'Pro' && <Badge>Populaire</Badge>}
                    </div>
                    <div className="mt-4">
                      <span className="text-5xl font-semibold">{plan === 'Free' ? '0' : plan === 'Pro' ? '29' : '99'}</span>
                      <span className="text-white/60">€ / mois</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant={plan === 'Pro' ? 'default' : 'outline'}>
                      {plan === 'Free' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-6xl font-semibold tracking-tighter">Prêt à lancer votre SaaS ?</h2>
          <p className="mt-4 text-xl text-white/60">Rejoignez les fondateurs qui ont déjà choisi SaaSForge.</p>
          <Button asChild size="lg" className="mt-10 h-14 px-12 text-lg">
            <Link href="/sign-up">Créer mon compte gratuitement</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 text-center text-sm text-white/40">
        © {new Date().getFullYear()} SaaSForge. Fait avec exigence.
      </footer>
    </div>
  );
}
