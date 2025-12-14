"use client";

import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Menu, LucidePanelRightOpen, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NewChatModal from "./NewChatModal";
import Image from "next/image";
import gsap from "gsap";

export default function SideBar() {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const [chatLogs, setChatLogs] = useState<z.infer<typeof ChatSessionSchema>[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const chatItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-collapse on mobile init
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    // Initial check
    handleResize();

    // Optional: Add listener if you want dynamic resizing logic
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = async (title: string) => {
    try {
      const res = await axios.post("/api/new-chat", { title });
      const { sessionId } = res.data;
      router.push(`/chat/${sessionId}`);
      // On mobile, close sidebar after navigation for better UX
      if (window.innerWidth < 768) setIsCollapsed(true);
    } catch (err) {
      console.error("Failed to create new chat session", err);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSessionClick = (id?: string) => {
    if (!id) return;
    router.push(`/chat/${id}`);
    if (window.innerWidth < 768) setIsCollapsed(true);
  };

  useEffect(() => {
    if (session?.user?.id) {
      const fetchSessions = async () => {
        const res = await fetch(`/api/get-sessions?userId=${session.user.id}`);
        const data = await res.json();
        setChatLogs(data.sessions);
      };
      fetchSessions();
    }
  }, [session]);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );
    }
  }, []);

  useEffect(() => {
    if (chatItemRefs.current.length > 0) {
      gsap.fromTo(
        chatItemRefs.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.4,
        }
      );
    }
  }, [chatLogs]);

  return (
    <>
      {/* Mobile Backdrop: Closes sidebar when clicking outside on small screens */}
      {!isCollapsed && (
        <div 
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`h-dvh bg-background border-r border-border transition-all duration-300 flex flex-col z-50 fixed md:relative left-0 top-0 shadow-xl md:shadow-none ${
          isCollapsed ? "w-[72px]" : "w-[280px]"
        }`}
      >
        {/* Header: Logo & Toggle */}
        <div className={`flex items-center py-4 bg-background ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          {!isCollapsed && (
            <div
              onClick={() => router.push("/")}
              className="flex items-center gap-3 cursor-pointer overflow-hidden"
              ref={logoRef}
            >
              <div className="flex-shrink-0">
                <Image src="/serene-logo.png" alt="Logo" width={28} height={28} className="object-contain" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-foreground whitespace-nowrap">Serene.AI</h2>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-muted/80 rounded-md transition-colors text-foreground/80 hover:text-foreground"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={24} /> : <LucidePanelRightOpen size={24} />}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 mt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium text-left text-foreground bg-primary/5 hover:bg-primary/10 border border-transparent hover:border-primary/20 rounded-lg transition-all shadow-sm ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <PlusIcon size={22} className="text-primary flex-shrink-0" />
            {!isCollapsed && <span className="truncate">New Chat</span>}
          </button>
        </div>

        {/* Chat History List */}
        <nav className="mt-6 flex-1 overflow-y-auto px-2 space-y-1 scrollbar-thin scrollbar-thumb-border">
          {!isCollapsed && chatLogs.length > 0 && (
             <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Chats</h3>
          )}
          
          {chatLogs.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                chatItemRefs.current[index] = el;
              }}
              onClick={() => handleSessionClick(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors group ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              {!isCollapsed ? (
                <span className="truncate">{item.title}</span>
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 group-hover:bg-primary transition-colors" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-4 py-4 mt-auto">
          {!isCollapsed ? (
            <p className="text-xs text-muted-foreground text-center font-medium">
              Powered by Serene.AI
            </p>
          ) : (
            <div className="flex justify-center">
                <div className="h-1 w-8 rounded-full bg-border" />
            </div>
          )}
        </div>
      </aside>
      
      <NewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleNewChat}
      />
    </>
  );
}