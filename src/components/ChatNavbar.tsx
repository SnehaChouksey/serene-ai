"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, FolderOpen, HeartPulse } from "lucide-react";
import Profile from "./Profile";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function ChatNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Mobile: Just spacer / Desktop: Spacer to push nav center */}
        <div className="hidden md:flex flex-1" />

        {/* Center: Feature tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => router.push("/chat")}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-sm font-medium transition-colors ${
              isActive("/chat")
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Chat"
          >
            <MessageCircle className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Chat</span>
          </button>

          <button
            onClick={() => router.push("/self-help")}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-sm font-medium transition-colors ${
              isActive("/self-help")
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Collections"
          >
            <FolderOpen className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Collections</span>
          </button>

          <button
            onClick={() => router.push("/user/me")}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-sm font-medium transition-colors ${
              isActive("/user/me")
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Mood Tracker"
          >
            <HeartPulse className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Mood tracker</span>
          </button>
        </nav>

        {/* Right: Mode toggle + Profile */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </header>
  );
}