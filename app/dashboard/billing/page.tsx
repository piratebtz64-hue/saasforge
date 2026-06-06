"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROLE_LIMITS, PLANS } from "@/lib/config";
import { toast } from "sonner";
import { Loader2, ExternalLink, CreditCard } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

export default function BillingPage() {
  const { profile, refreshProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const currentRole = (profile?.role as 'free' | 'pro' | 'enterprise') || 'free';
  const currentPlan = ROLE_LIMITS[currentRole];

  const handleSubscribe = async (plan: 'pro' | 'enterprise', interval: 'monthly' | 'annual') => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to create checkout session');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/create-portal', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to open customer portal');
      }
    } catch (error: any) {
      toast.error('Unable to open billing portal. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan, payments, and invoices via Stripe.</p>
      </div>

      {/* Current Plan */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                Current Plan: {currentPlan.name}
                <Badge variant={currentRole === 'enterprise' ? 'default' : currentRole === 'pro' ? 'secondary' : 'outline'}>
                  {currentRole.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {currentPlan.callsPerMonth} AI calls per month • {currentPlan.priceMonthly}€/mo or {currentPlan.priceAnnual}€/yr
              </CardDescription>
            </div>
            {currentRole !== 'free' && (
              <Button 
                onClick={handleManageSubscription} 
                disabled={portalLoading}
                variant="outline"
              >
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CreditCard className="h-4 w-4 mr-2" />}
                Manage Subscription
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Upgrade Plans */}
      {currentRole !== 'enterprise' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Upgrade your plan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pro Plan */}
            <Card className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Pro</CardTitle>
                    <div className="mt-2">
                      <span className="text-4xl font-bold">{PLANS.pro.priceMonthly}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                  <Badge>Popular</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li>✓ {PLANS.pro.callsPerMonth} AI calls/month</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced models access</li>
                </ul>
                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleSubscribe('pro', 'monthly')}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe Monthly'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleSubscribe('pro', 'annual')}
                    disabled={loading}
                  >
                    Annual (save 20%)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-primary relative">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{PLANS.enterprise.priceMonthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li>✓ {PLANS.enterprise.callsPerMonth} AI calls/month</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ All models + priority queue</li>
                  <li>✓ Custom limits available</li>
                </ul>
                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1" 
                    variant="default"
                    onClick={() => handleSubscribe('enterprise', 'monthly')}
                    disabled={loading}
                  >
                    Subscribe Monthly
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleSubscribe('enterprise', 'annual')}
                    disabled={loading}
                  >
                    Annual (save 20%)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground pt-4">
        All payments are securely processed by Stripe. You can cancel or change your plan anytime from the customer portal.
      </div>
    </div>
  );
}
