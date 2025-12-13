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
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-3 py-2">
        {/* Left spacer to push nav to center */}
        <div className="flex flex-1" />

        {/* Center: Feature tabs */}
        <nav className="flex items-center gap-2">
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
