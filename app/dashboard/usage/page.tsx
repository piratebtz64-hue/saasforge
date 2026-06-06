'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface UsageRecord {
  id: string;
  created_at: string;
  prompt: string;
  response_length: number;
  model: string;
}

export default function UsageHistoryPage() {
  const { profile } = useProfile();
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      if (!profile?.id) return;
      
      const supabase = createClient();
      const { data, error } = await supabase
        .from('ai_usage')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setRecords(data);
      }
      setLoading(false);
    };

    fetchUsage();
  }, [profile?.id]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Historique des appels IA</h1>
        <p className="text-white/60 mt-1">Vos 50 derniers appels au Playground</p>
      </div>

      <Card className="border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Activité récente
            <Badge variant="outline">{records.length} appels</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-white/50">Chargement de l\'historique...</div>
          ) : records.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-white/60">Aucun appel IA pour le moment.</p>
              <p className="text-sm text-white/40 mt-1">Commencez à utiliser le Playground pour voir vos statistiques.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/60">
                    <th className="py-3 pr-4 font-medium">Date</th>
                    <th className="py-3 pr-4 font-medium">Modèle</th>
                    <th className="py-3 pr-4 font-medium">Prompt</th>
                    <th className="py-3 text-right font-medium">Tokens</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-white/5">
                      <td className="py-4 pr-4 text-white/80 whitespace-nowrap">
                        {format(new Date(record.created_at), 'dd MMM yyyy HH:mm')}
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="outline" className="font-mono text-xs">{record.model}</Badge>
                      </td>
                      <td className="py-4 pr-4 max-w-[420px] truncate text-white/90">
                        {record.prompt}
                      </td>
                      <td className="py-4 text-right font-mono text-white/70">
                        {record.response_length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
