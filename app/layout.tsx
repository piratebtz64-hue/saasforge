import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";

export const metadata: Metadata = {
  title: "SaaSForge - Template SaaS Next.js Premium",
  description: "Le template SaaS ultime avec Auth, Billing Stripe, IA et rôles. Lancez votre produit en jours, pas en mois.",
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </SupabaseProvider>
      </body>
    </html>
  );
}
