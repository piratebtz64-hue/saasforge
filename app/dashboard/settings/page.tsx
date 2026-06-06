import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Paramètres du compte</h1>
      <Card>
        <CardHeader><CardTitle>Informations du profil</CardTitle></CardHeader>
        <CardContent>
          <div>Email : {user?.email}</div>
        </CardContent>
      </Card>
    </div>
  );
}