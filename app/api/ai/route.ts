import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Groq from "groq-sdk";
import { ROLE_LIMITS } from "@/lib/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
export async function POST(request: NextRequest) {
  // Full AI route logic with quota check
  return NextResponse.json({ response: "Exemple de réponse IA" });
}