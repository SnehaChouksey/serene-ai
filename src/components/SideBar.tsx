"use client";

import { ChatSessionSchema } from "@/schemas/chatSessionSchema";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Menu, LucidePanelRightOpen, PlusIcon, X } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const chatItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle Resize & Init
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true); // Default to closed on mobile
      } else {
        setIsCollapsed(false); // Default to open on desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = async (title: string) => {
    try {
      const res = await axios.post("/api/new-chat", { title });
      const { sessionId } = res.data;
      router.push(`/chat/${sessionId}`);
      if (isMobile) setIsCollapsed(true);
    } catch (err) {
      console.error("Failed to create new chat session", err);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSessionClick = (id: string) => {
    router.push(`/chat/${id}`);
    if (isMobile) setIsCollapsed(true);
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

  // GSAP Animations
  useEffect(() => {
    if (sidebarRef.current && !isMobile) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isMobile]); // Re-run if switching modes

  useEffect(() => {
    if (chatItemRefs.current.length > 0) {
      gsap.fromTo(
        chatItemRefs.current,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power1.out",
          stagger: 0.05,
          delay: 0.2,
        }
      );
    }
  }, [chatLogs]);

  return (
    <>
      {/* MOBILE OVERLAY BACKDROP */}
      {isMobile && !isCollapsed && (
        <div 
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        />
      )}

      {/* MOBILE FLOATING TOGGLE BUTTON (Visible only when Sidebar is HIDDEN on Mobile) */}
      {isMobile && isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-3.5 left-4 z-[70] p-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-sm text-foreground hover:bg-muted transition-all"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        ref={sidebarRef}
        className={`
          flex flex-col h-dvh bg-background border-r border-border
          transition-all duration-300 ease-in-out
          
          /* LAYOUT LOGIC */
          fixed md:relative top-0 left-0 z-[80]
          
          /* MOBILE: Full width drawer or hidden */
          ${isMobile 
            ? (isCollapsed ? "-translate-x-full w-[280px]" : "translate-x-0 w-[280px] shadow-2xl") 
            : (isCollapsed ? "w-[80px]" : "w-[280px]")
          }
          
          /* DESKTOP: Sticky/Relative behavior handled by parent flex */
        `}
      >
        {/* HEADER */}
        <div className={`flex items-center h-16 flex-shrink-0 ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between px-4'}`}>
          {/* Logo - Hidden if collapsed on desktop */}
          <div
            onClick={() => router.push("/")}
            className={`flex items-center gap-3 cursor-pointer overflow-hidden transition-all duration-300 ${isCollapsed && !isMobile ? 'hidden' : 'flex'}`}
            ref={logoRef}
          >
            <div className="relative h-8 w-8 flex-shrink-0">
               <Image src="/serene-logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <h2 className="text-lg font-bold text-foreground whitespace-nowrap">Serene.AI</h2>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground ${isMobile ? 'ml-auto' : ''}`}
          >
            {isMobile 
              ? <X size={20} /> // Close icon on mobile
              : (isCollapsed ? <LucidePanelRightOpen size={20} /> : <Menu size={20} />)
            }
          </button>
        </div>

        {/* NEW CHAT BUTTON */}
        <div className="px-3 mt-2 mb-2 flex-shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all shadow-sm group
              ${isCollapsed && !isMobile
                ? "justify-center bg-transparent hover:bg-muted text-foreground" 
                : "w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium"
              }
            `}
          >
            <PlusIcon size={20} className="flex-shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed && !isMobile ? 'w-0 opacity-0 hidden' : 'block'}`}>
              New Chat
            </span>
          </button>
        </div>

        {/* CHAT LIST */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-border/50">
          {(!isCollapsed || isMobile) && chatLogs.length > 0 && (
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
              onClick={() => item.id && handleSessionClick(item.id)}
              className={`
                flex items-center gap-3 px-3 py-3 text-sm rounded-xl cursor-pointer transition-all duration-200 group
                ${isCollapsed && !isMobile ? "justify-center" : ""}
                hover:bg-muted hover:shadow-sm
              `}
              title={item.title}
            >
              <div className="flex-shrink-0 text-muted-foreground/70 group-hover:text-primary transition-colors">
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              
              <span className={`truncate text-muted-foreground group-hover:text-foreground transition-all duration-300 ${isCollapsed && !isMobile ? 'hidden' : 'block'}`}>
                {item.title}
              </span>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-border/50 px-4 py-4 mt-auto bg-muted/5 flex-shrink-0">
          {(!isCollapsed || isMobile) ? (
            <p className="text-xs text-muted-foreground text-center font-medium opacity-80">
              Powered by Serene.AI
            </p>
          ) : (
             <div className="flex justify-center">
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