"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { APP_NAME } from "@/lib/config";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">SF</span>
          </div>
          <span className="font-semibold text-xl">{APP_NAME}</span>
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild><Link href="/sign-in">Se connecter</Link></Button>
          <Button asChild><Link href="/sign-up">Commencer gratuitement</Link></Button>
        </div>
      </div>
    </nav>
  );
}