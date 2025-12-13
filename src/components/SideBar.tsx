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

  const handleNewChat = async (title: string) => {
    try {
      const res = await axios.post("/api/new-chat", { title });
      const { sessionId } = res.data;
      router.push(`/chat/${sessionId}`);
    } catch (err) {
      console.error("Failed to create new chat session", err);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
    <aside
      ref={sidebarRef}
      className={`h-screen bg-background border-r border-primary/30 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      
      <div className="flex items-center justify-between px-3 py-3 bg-background">
        {!isCollapsed && (
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
            ref={logoRef}
          >
            <Image src="/serene-logo.png" alt="Logo" width={24} height={24} />
            <h2 className="text-lg font-semibold text-foreground">Serene.AI</h2>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-primary/10 rounded transition text-foreground"
        >
          {isCollapsed ? <Menu size={25} /> : <LucidePanelRightOpen size={25} />}
        </button>
      </div>

      
      <div className="px-3 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-foreground bg-transparent hover:bg-primary/10 rounded-md transition"
        >
          <PlusIcon size={25} className="text-foreground" />
          {!isCollapsed  && <span className="truncate">New Chat</span>}
        </button>
        
      </div>

      
      <nav className="mt-4 flex-1 overflow-auto px-2">
        {chatLogs.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
            chatItemRefs.current[index] = el;
            }}
            onClick={() => router.push(`/chat/${item.id}`)}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-primary/10 text-muted-foreground transition ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            {!isCollapsed && <span className="truncate">{item.title}</span>}
          </div>
        ))}
      </nav>

      
      <div className="border-t border-border px-4 py-3 mt-auto">
        {!isCollapsed && (
          <p className="text-xs text-muted-foreground text-center">
            Powered by Serene.AI
          </p>
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
