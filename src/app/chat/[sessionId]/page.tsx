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
      {/* Sidebar - Mobile: Fixed overlay | Desktop: Relative flex item */}
      <SideBar />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full relative w-full overflow-hidden transition-all duration-300">
        {/* Navbar */}
        <div className="flex-shrink-0 border-b border-border z-20 bg-background">
          <ChatNavbar />
        </div>

        {/* Chat messages + input area */}
        <div className="flex-1 relative overflow-hidden">
          <MessageLogs sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
}