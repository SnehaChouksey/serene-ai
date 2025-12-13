"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import MessageContainer from "./MessageContainer";
import { motion } from "motion/react";

type Role = "human" | "ai";

interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  isOptimistic?: boolean;
  isStreaming?: boolean;
}

export default function MessageLogs({ sessionId }: { sessionId: string }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const tempIdRef = useRef(0);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
    });
  }, []);

  // Fetch initial messages on mount
  useEffect(() => {
    if (!sessionId) return;
    let mounted = true;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/get-messages?sessionId=${sessionId}`);

        if (!mounted) return;

        const raw = res.data?.messages ?? [];
        const parsed: Message[] = raw.map((m: any) => ({
          id: m.id,
          role: (m.role as Role) || "human",
          content: String(m.content ?? ""),
          createdAt: new Date(m.createdAt).toISOString(),
          isOptimistic: false,
          isStreaming: false,
        }));

        setMessages(parsed);
        setHasLoaded(true);

        setTimeout(() => scrollToBottom("instant"), 100);
      } catch (err) {
        console.error("[MessageLogs] fetchMessages error:", err);
        setHasLoaded(true);
      }
    };

    fetchMessages();

    return () => {
      mounted = false;
    };
  }, [sessionId, scrollToBottom]);

  // Send message handler
  const handleSend = useCallback(
    async (userInput: string) => {
      if (!userInput || !userInput.trim()) return;

      const trimmed = userInput.trim();
      setLoading(true);

      // Create optimistic user message
      const tempId = `temp-${tempIdRef.current++}`;
      const optimisticUser: Message = {
        id: tempId,
        role: "human",
        content: trimmed,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
        isStreaming: false,
      };

      // Add optimistic message
      setMessages((prev) => [...prev, optimisticUser]);
      scrollToBottom("instant");

      try {
        const res = await axios.post("/api/send-message", {
          sessionId,
          userInput: trimmed,
        });

        const { humanMessage, aiMessage } = res.data;

        if (!humanMessage || !aiMessage) {
          throw new Error("Invalid API response");
        }

        // Replace optimistic with real messages
        setMessages((prev) => {
          const withoutOptimistic = prev.filter((m) => m.id !== tempId);

          const userMsg: Message = {
            id: humanMessage.id,
            role: "human",
            content: humanMessage.content,
            createdAt: humanMessage.createdAt,
            isOptimistic: false,
            isStreaming: false,
          };

          const aiMsg: Message = {
            id: aiMessage.id,
            role: "ai",
            content: aiMessage.content,
            createdAt: aiMessage.createdAt,
            isOptimistic: false,
            isStreaming: false,
          };

          return [...withoutOptimistic, userMsg, aiMsg];
        });

        scrollToBottom("smooth");
      } catch (err) {
        console.error("[MessageLogs] Send error:", err);
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
        alert("Failed to send message");
      } finally {
        setLoading(false);
      }
    },
    [sessionId, scrollToBottom]
  );

  // Auto-scroll when messages arrive
  useEffect(() => {
    if (hasLoaded && messages.length > 0) {
      scrollToBottom("smooth");
    }
  }, [messages.length, hasLoaded, scrollToBottom]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-4 py-6 flex flex-col">
          {hasLoaded && messages.length === 0 ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="text-center text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600">
                Hello{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}!
              </div>
              <div className="text-center text-muted-foreground text-lg mt-4">
                What's on your mind today?
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageContainer
                  key={msg.id}
                  id={msg.id}
                  role={msg.role}
                  content={msg.content}
                  name={msg.role === "human" ? session?.user?.name ?? "You" : "AI"}
                  avatarUrl={
                    msg.role === "human"
                      ? session?.user?.image ?? "/default-avatar.png"
                      : "/ai-avatar.jpg"
                  }
                  isStreaming={msg.isStreaming}
                />
              ))}

              {loading && (
                <MessageContainer
                  key="loading-indicator"
                  id="loading-indicator"
                  role="ai"
                  content="Thinking..."
                  name="AI"
                  avatarUrl="/ai-avatar.jpg"
                  isStreaming={false}
                />
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input box (sticky at bottom) */}
      <div className="flex-shrink-0 flex justify-center w-full px-4 py-4 bg-background ">
        <MessageBox
          disabled={loading}
          onSend={(input) => handleSend(input)}
        />
      </div>
    </div>
  );
}
