'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, Play, CreditCard, Settings, History, LogOut } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { signOut } from '@/lib/supabase/client';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/playground', label: 'Playground IA', icon: Play },
  { href: '/dashboard/usage', label: 'Historique IA', icon: History },
  { href: '/dashboard/billing', label: 'Abonnement', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { profile, signOut: handleSignOut } = useProfile();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="h-6 w-6 rounded bg-white" />
          <span>SaaSForge</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-white text-black" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{profile?.email}</p>
            <p className="text-xs text-white/50 capitalize">{profile?.role || 'free'}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden border-r border-white/10 bg-zinc-950 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-72">
        <SidebarContent />
      </div>

      {/* Mobile Header + Sheet */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/95 px-4 backdrop-blur lg:hidden">
        <Link href="/dashboard" className="font-semibold tracking-tight">SaaSForge</Link>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-zinc-950 p-0 text-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
