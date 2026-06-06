'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  role: 'free' | 'pro' | 'enterprise';
  ai_calls_used: number;
  ai_calls_limit: number;
}

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) setProfile(data as Profile);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) await fetchProfile(user.id);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) await fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/sign-in';
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  const remainingCalls = profile ? Math.max(0, (profile.ai_calls_limit || 0) - (profile.ai_calls_used || 0)) : 0;
  const isPro = profile?.role === 'pro' || profile?.role === 'enterprise';
  const isEnterprise = profile?.role === 'enterprise';

  return {
    user,
    profile,
    loading,
    remainingCalls,
    isPro,
    isEnterprise,
    signOut,
    refreshProfile,
  };
}
