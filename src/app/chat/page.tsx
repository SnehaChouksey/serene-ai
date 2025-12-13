"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ChatRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasRun = useRef(false); // prevents double execution in strict mode

  useEffect(() => {
    if (hasRun.current) return;
    if (status === "loading") return;

    hasRun.current = true;

    // 1️⃣ Not logged in → go home + login modal
    if (!session?.user?.id) {
      router.replace("/?loginRequired=true");
      return;
    }

    // 2️⃣ Logged in → decide chat destination
    const resolveChat = async () => {
      try {
        // fetch existing sessions
        const res = await fetch(
          `/api/get-sessions?userId=${session.user.id}`,
          { cache: "no-store" }
        );

        if (res.ok) {
          const data = await res.json();
          const sessions = data.sessions ?? [];

          if (sessions.length > 0) {
            // open latest chat
            router.replace(`/chat/${sessions[0].id}`);
            return;
          }
        }

        // 3️⃣ No sessions → create one
        const createRes = await axios.post("/api/new-chat", {
          title: "New Chat",
        });

        const sessionId = createRes.data?.sessionId;
        if (sessionId) {
          router.replace(`/chat/${sessionId}`);
        }
      } catch (err) {
        console.error("[ChatRedirectPage] failed:", err);
      }
    };

    resolveChat();
  }, [session, status, router]);

  // 🚫 NOTHING RENDERS — THIS IS THE KEY
  return null;
}
