"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROLE_LIMITS } from "@/lib/config";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [profile, setProfile] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          setProfile(data);
          setCurrentRole(data.role || 'free');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSubscribe = async (plan: 'pro' | 'enterprise', interval: 'monthly' | 'annual') => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Billing &amp; Abonnement</h1>
      <p className="text-muted-foreground mb-8">Gérez votre plan et vos paiements via Stripe.</p>

      <Card className="mb-8 border-primary/30">
        <CardHeader>
          <CardTitle>Plan actuel : {ROLE_LIMITS[currentRole].name}</CardTitle>
        </CardHeader>
      </Card>

      {/* Upgrade cards with real buttons */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pro and Enterprise cards with handleSubscribe */}
      </div>
    </div>
  );
}