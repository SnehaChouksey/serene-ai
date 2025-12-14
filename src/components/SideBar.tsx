"use client";

import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Menu, LucidePanelRightOpen, PlusIcon, X, PanelLeftClose } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NewChatModal from "./NewChatModal";
import Image from "next/image";
import gsap from "gsap";

export default function SideBar() {
  const { data: session } = useSession();
  const [chatLogs, setChatLogs] = useState<z.infer<typeof ChatSessionSchema>[]>([]);
  
  // STATE SPLIT: We need two different states for solid responsiveness
  const [isMobileOpen, setIsMobileOpen] = useState(false);        // Mobile: Open/Closed drawer
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false); // Desktop: Full/Mini sidebar
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const chatItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Safe User ID Access
  const userId = session?.user?.id;

  // 2. Fetch Sessions
  useEffect(() => {
    if (userId) {
      const fetchSessions = async () => {
        try {
          const res = await fetch(`/api/get-sessions?userId=${userId}`);
          const data = await res.json();
          setChatLogs(data.sessions);
        } catch (error) {
          console.error("Error fetching sessions:", error);
        }
      };
      fetchSessions();
    }
  }, [userId]);

  // 3. Auto-close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false); // Reset mobile state when going to desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNewChat = async (title: string) => {
    try {
      const res = await axios.post("/api/new-chat", { title });
      const { sessionId } = res.data;
      router.push(`/chat/${sessionId}`);
      setIsMobileOpen(false); // Close mobile drawer
    } catch (err) {
      console.error("Failed to create new chat session", err);
    }
  };

  const handleSessionClick = (id?: string) => {
    if (!id) return;
    router.push(`/chat/${id}`);
    setIsMobileOpen(false); // Close mobile drawer
  };

  // GSAP Animation
  useEffect(() => {
    if (chatItemRefs.current.length > 0) {
      gsap.fromTo(
        chatItemRefs.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power1.out" }
      );
    }
  }, [chatLogs, isMobileOpen, isDesktopCollapsed]);

  return (
    <>
      {/* --- MOBILE TRIGGER BUTTON --- 
          Visible ONLY on mobile. Fixed to top-left.
          This ensures you can always open the menu on small screens.
      */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-3 left-4 z-50 p-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-sm text-foreground"
        title="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* --- MOBILE BACKDROP --- */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm animate-in fade-in duration-200"
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        ref={sidebarRef}
        className={`
          /* BASE STYLES */
          flex flex-col h-dvh bg-background border-r border-border
          transition-all duration-300 ease-in-out
          
          /* MOBILE: Fixed Drawer Logic */
          fixed top-0 left-0 z-[70]
          ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          
          /* DESKTOP: Relative Sidebar Logic (Overrides Mobile) */
          md:translate-x-0 md:relative md:shadow-none
          
          /* WIDTH LOGIC */
          ${isDesktopCollapsed ? "md:w-[72px]" : "md:w-[280px] w-[280px]"}
        `}
      >
        {/* HEADER */}
        <div className={`flex items-center h-16 flex-shrink-0 ${isDesktopCollapsed ? "justify-center px-0" : "justify-between px-4"}`}>
          
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className={`flex items-center gap-3 cursor-pointer overflow-hidden transition-all duration-300
              ${isDesktopCollapsed ? "md:hidden flex" : "flex"}
            `}
          >
            <div className="relative h-8 w-8 flex-shrink-0">
               <Image src="/serene-logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <h2 className="text-lg font-bold text-foreground whitespace-nowrap">Serene.AI</h2>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileOpen(false); // Close on mobile
              } else {
                setIsDesktopCollapsed(!isDesktopCollapsed); // Collapse on desktop
              }
            }}
            className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
            title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {/* Mobile: Close Icon | Desktop: Collapse Icon */}
            <span className="md:hidden"><X size={20} /></span>
            <span className="hidden md:block">
              {isDesktopCollapsed ? <LucidePanelRightOpen size={20} /> : <PanelLeftClose size={20} />}
            </span>
          </button>
        </div>

        {/* NEW CHAT BUTTON */}
        <div className="px-3 mt-2 mb-2 flex-shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
              ${isDesktopCollapsed 
                ? "md:justify-center bg-transparent hover:bg-muted text-foreground" 
                : "w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium"
              }
            `}
            title="New Chat"
          >
            <PlusIcon size={20} className="flex-shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isDesktopCollapsed ? "md:w-0 md:opacity-0 md:hidden" : "block"}`}>
              New Chat
            </span>
          </button>
        </div>

        {/* CHAT LIST */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-border/50">
          {!isDesktopCollapsed && chatLogs.length > 0 && (
             <h3 className="px-2 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
               Recent
             </h3>
          )}
          
          {chatLogs.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                chatItemRefs.current[index] = el;
              }}
              onClick={() => handleSessionClick(item.id)}
              className={`
                flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-200 group
                ${isDesktopCollapsed ? "md:justify-center" : ""}
                hover:bg-muted hover:shadow-sm
              `}
              title={item.title}
            >
              <div className="flex-shrink-0 text-muted-foreground/70 group-hover:text-primary transition-colors">
                {/* Simple dot or icon for history */}
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
              
              <span className={`truncate text-muted-foreground group-hover:text-foreground transition-all duration-300 ${isDesktopCollapsed ? "md:hidden" : "block"}`}>
                {item.title}
              </span>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-border/50 px-4 py-4 mt-auto bg-muted/5 flex-shrink-0">
          {!isDesktopCollapsed ? (
            <p className="text-xs text-muted-foreground text-center font-medium opacity-80">
              Powered by Serene.AI
            </p>
          ) : (
             <div className="hidden md:flex justify-center">
               <div className="h-1.5 w-1.5 rounded-full bg-border" />
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