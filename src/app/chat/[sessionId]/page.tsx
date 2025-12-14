"use client";

import MessageLogs from "@/components/MessageLogs";
import ChatNavbar from "@/components/ChatNavbar";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";

export default function ChatClientPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  return (
    // Outer Wrapper: Hides overflow to prevent double scrollbars
    <div className="flex h-dvh w-full overflow-hidden bg-background relative">
      
      {/* Sidebar Component handles its own responsive width/visibility */}
      <SideBar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative min-w-0 bg-background/50 transition-all duration-300">
        
        {/* Navbar Wrapper */}
        <div className="flex-shrink-0 border-b border-border z-20 bg-background/80 backdrop-blur-md">
           {/* pl-12 pushes navbar content right ON MOBILE ONLY to avoid the floating menu button */}
           <div className="pl-12 md:pl-0 transition-all">
              <ChatNavbar />
           </div>
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