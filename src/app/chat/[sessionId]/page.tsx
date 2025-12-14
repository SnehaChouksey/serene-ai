"use client";

import MessageLogs from "@/components/MessageLogs";
import ChatNavbar from "@/components/ChatNavbar";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

export default function ChatClientPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background relative">
      {/* Sidebar: Mobile Drawer | Desktop Relative Panel */}
      <SideBar />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col h-full relative min-w-0 transition-all duration-300">
        
        {/* Navbar */}
        <div className="flex-shrink-0 border-b border-border z-20 bg-background/95 backdrop-blur-md">
          <ChatNavbar />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 w-full h-full relative">
             <MessageLogs sessionId={sessionId} />
          </div>
        </div>
      </main>
    </div>
  );
}