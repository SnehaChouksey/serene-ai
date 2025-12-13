"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, FolderOpen, HeartPulse } from "lucide-react";
import Profile from "@/components/Profile";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function FeatureNavbar() {   // Capitalized name
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md fixed top-0 left-0 z-40 ">
      <div className="mx-auto flex max-w-6xl items-center px-3 py-2">
        {/* Left: Logo + Title (extreme left) */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/serene-logo.png"
              alt="Serene.AI logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Serene.AI
            </span>
          </Link>
        </div>

        {/* Center: Feature tabs */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => router.push("/chat")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive("/chat")
                ? "bg-primary/55 text-white"
                : "text-foreground hover:bg-primary/40"
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => router.push("/self-help")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive("/self-help")
                ? "bg-primary/55 text-white"
                : "text-foreground hover:bg-primary/40"
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            <span>Collections</span>
          </button>

          <button
            onClick={() => router.push("/user/me")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive("/user/me")
                ? "bg-primary/55 text-white"
                : "text-foreground hover:bg-primary/40"
            }`}
          >
            <HeartPulse className="h-4 w-4" />
            <span>Mood tracker</span>
          </button>
        </nav>

        {/* Right: Mode toggle + Profile (extreme right) */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </header>
  );
}
