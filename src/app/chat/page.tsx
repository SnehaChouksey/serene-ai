"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ChatRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    if (status === "loading") return;

    hasRun.current = true;

    // 🔁 Redirect intent has priority
    const redirectIntent =
      typeof window !== "undefined"
        ? localStorage.getItem("postLoginRedirect")
        : null;

    if (!session?.user?.id) {
      router.replace("/?loginRequired=true");
      return;
    }

    if (redirectIntent && redirectIntent !== "/chat") {
      localStorage.removeItem("postLoginRedirect");
      router.replace(redirectIntent);
      return;
    }

    const resolveChat = async () => {
      try {
        const res = await fetch(
          `/api/get-sessions?userId=${session.user.id}`,
          { cache: "no-store" }
        );

        if (res.ok) {
          const data = await res.json();
          const sessions = data.sessions ?? [];

          if (sessions.length > 0) {
            router.replace(`/chat/${sessions[0].id}`);
            return;
          }
        }

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

  return null;
}
