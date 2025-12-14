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
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 transition-all duration-300">
        
        {/* LEFT: Mobile Logo (Visible only when Sidebar is hidden on mobile) */}
        {/* We add pl-10 on mobile to avoid overlap with the Floating Sidebar Button */}
        <div className="flex items-center gap-2 pl-10 md:pl-0 md:hidden transition-all">
           <span className="font-bold text-lg tracking-tight text-primary">Serene</span>
        </div>

        {/* DESKTOP SPACER: Pushes nav to center on large screens */}
        <div className="hidden md:flex flex-1" />

        {/* CENTER: Navigation Pills */}
        <nav className="flex items-center gap-1 sm:gap-2 mx-2 md:mx-0">
          <button
            onClick={() => router.push("/chat")}
            className={`relative flex items-center justify-center gap-2 rounded-full px-3 py-2 sm:px-5 sm:py-2 text-sm font-medium transition-all duration-200 ${
              isActive("/chat")
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <MessageCircle className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Chat</span>
            {isActive("/chat") && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary sm:hidden" />
            )}
          </button>

          <button
            onClick={() => router.push("/self-help")}
            className={`relative flex items-center justify-center gap-2 rounded-full px-3 py-2 sm:px-5 sm:py-2 text-sm font-medium transition-all duration-200 ${
              isActive("/self-help")
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <FolderOpen className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Collections</span>
          </button>

          <button
            onClick={() => router.push("/user/me")}
            className={`relative flex items-center justify-center gap-2 rounded-full px-3 py-2 sm:px-5 sm:py-2 text-sm font-medium transition-all duration-200 ${
              isActive("/user/me")
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <HeartPulse className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Mood</span>
          </button>
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </header>
  );
}