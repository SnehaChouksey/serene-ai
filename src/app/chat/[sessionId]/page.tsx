"use client";

import MessageLogs from "@/components/MessageLogs";
import ChatNavbar from "@/components/ChatNavbar";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

export default function ChatClientPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  return (
    <div className="flex h-screen bg">
      {/* Sidebar */}
      <SideBar />

      {/* Main chat area */}
      <div className="flex-1 h-full flex flex-col ">
        {/* Navbar */}
        <div className="flex-shrink-0 border-b border-border">
          <ChatNavbar />
        </div>

        {/* Chat messages + input (all handled by MessageLogs) */}
        <MessageLogs sessionId={sessionId} />
      </div>
    </div>
  );
}
