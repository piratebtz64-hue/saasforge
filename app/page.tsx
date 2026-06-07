'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PlaygroundPage() {
  const { remainingCalls, isEnterprise } = useProfile();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null);

  const quickPrompts = [
    "Génère une landing page premium pour un SaaS de productivité",
    "Crée un site pour un restaurant italien moderne",
    "Génère une landing page pour vendre un template Next.js premium",
  ];

  const generateWebsite = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    if (remainingCalls <= 0 && !isEnterprise) {
      toast.error("Tu as atteint ta limite.");
      return;
    }

    setIsLoading(true);
    setGeneratedWebsite(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          systemPrompt: `Tu es un expert en création de sites web. Réponds UNIQUEMENT avec un JSON valide.`,
        }),
      });

      const data = await res.json();
      const parsed = JSON.parse(data.content);
      setGeneratedWebsite(parsed);
      toast.success("Site généré !");
    } catch (error) {
      toast.error("Erreur de génération");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copié !");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Générateur de Sites IA</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {quickPrompts.map((p, i) => (
          <Button key={i} variant="outline" onClick={() => generateWebsite(p)} disabled={isLoading}>
            {p}
          </Button>
        ))}
      </div>

      <div className="flex gap-3 mb-8">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Décris le site que tu veux générer..."
          className="min-h-[100px]"
        />
        <Button onClick={() => generateWebsite(prompt)} disabled={isLoading || !prompt.trim()}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Générer"}
        </Button>
      </div>

      {generatedWebsite && (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{generatedWebsite.title}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(generatedWebsite, null, 2))}>
              Copier JSON
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-zinc-950 text-white p-10 text-center">
                <h1 className="text-5xl font-bold tracking-tight">{generatedWebsite.hero?.headline}</h1>
                <p className="mt-4 text-xl text-zinc-400">{generatedWebsite.hero?.subheadline}</p>
                <Button size="lg" className="mt-8">{generatedWebsite.hero?.ctaText}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}