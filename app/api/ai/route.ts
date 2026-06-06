import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Groq from "groq-sdk";
import { ROLE_LIMITS } from "@/lib/config";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role, ai_calls_used").eq("id", user.id).single();
    const role = (profile?.role || "free") as keyof typeof ROLE_LIMITS;
    const limit = ROLE_LIMITS[role].aiCallsPerMonth;
    const used = profile?.ai_calls_used || 0;

    if (limit !== Infinity && used >= limit) {
      return NextResponse.json({ error: `Quota atteint (${limit} appels/mois)` }, { status: 429 });
    }

    const { prompt } = await request.json();
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 600,
    });

    const response = completion.choices[0]?.message?.content || "Erreur IA";

    await supabase.from("profiles").update({ ai_calls_used: used + 1 }).eq("id", user.id);

    return NextResponse.json({ response, remaining: limit === Infinity ? "∞" : limit - used - 1 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}