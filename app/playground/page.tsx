"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';
import { Loader2, Send, Trash2, Zap } from 'lucide-react';
import { toast } from 'sonner';

const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B (Recommended)', badge: 'Best' },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', badge: 'Fast' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', badge: 'Balanced' },
];

export default function PlaygroundPage() {
  const { profile, remainingCalls, isPro, isEnterprise, refreshProfile } = useProfile();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  const currentModel = MODELS.find(m => m.id === selectedModel)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    if (remainingCalls <= 0 && !isEnterprise) {
      toast.error("You've reached your monthly limit. Upgrade to continue.");
      return;
    }

    const userMessage = prompt.trim();
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setPrompt('');
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage, model: selectedModel }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Something went wrong');
      }

      const data = await res.json();
      const assistantMessage = data.response;

      setResponse(assistantMessage);
      setConversation(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

      await refreshProfile();
      toast.success(`Response generated! ${data.remaining} calls remaining.`);

    } catch (error: any) {
      toast.error(error.message || 'Failed to generate response');
      setConversation(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setResponse('');
    setPrompt('');
    toast.info('Conversation cleared');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Playground</h1>
          <p className="text-muted-foreground mt-1">
            Test powerful AI models with your quota
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isEnterprise ? "default" : isPro ? "secondary" : "outline"}>
            {profile?.role?.toUpperCase() || 'FREE'} • {remainingCalls} calls left
          </Badge>
          <Button variant="outline" size="sm" onClick={clearConversation}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Model Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4" /> Choose Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full md:w-[320px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{model.name}</span>
                    <Badge variant="outline" className="ml-2 text-[10px]">{model.badge}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            {currentModel.name} — Powered by Groq (fast inference)
          </p>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Conversation History */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Conversation</CardTitle>
            {conversation.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearConversation}>
                Clear chat
              </Button>
            )}
          </CardHeader>
          <CardContent className="min-h-[420px] max-h-[520px] overflow-y-auto space-y-4 pr-2">
            {conversation.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[380px] text-center text-muted-foreground">
                <Zap className="h-10 w-10 mb-4 opacity-50" />
                <p className="font-medium">Start a conversation</p>
                <p className="text-sm">Ask anything. The AI will respond instantly.</p>
              </div>
            )}

            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'}`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Input Panel */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything... (e.g. Explain quantum computing in simple terms)"
                className="min-h-[180px] resize-y"
                disabled={isLoading}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isLoading || !prompt.trim()}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Send to {currentModel.name.split(' ')[0]}</>
                )}
              </Button>

              <p className="text-[10px] text-center text-muted-foreground">
                {remainingCalls} calls remaining this month
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {response && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Latest Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {response}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
