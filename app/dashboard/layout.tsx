'use client';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <DashboardSidebar />
      
      <div className="lg:pl-72">
        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
