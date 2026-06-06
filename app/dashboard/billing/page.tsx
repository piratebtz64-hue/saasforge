"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROLE_LIMITS } from "@/lib/config";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const currentRole = "free";

  const handleSubscribe = async (plan, interval) => {
    setLoading(`${plan}-${interval}`);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {success && <Alert variant="success"><AlertTitle>Paiement réussi !</AlertTitle></Alert>}
      {canceled && <Alert variant="warning"><AlertTitle>Paiement annulé</AlertTitle></Alert>}
      {/* Full billing content */}
    </div>
  );
}