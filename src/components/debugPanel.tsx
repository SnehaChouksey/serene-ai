"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  role: string;
  content: string;
}

interface DebugPanelProps {
  messages: Message[];
  sessionId: string;
}

/**
 * Add this component temporarily to diagnose the issue
 * Place it at the bottom of your MessageLogs component
 * 
 * Usage:
 * <DebugPanel messages={messages} sessionId={sessionId} />
 */
export default function DebugPanel({ messages, sessionId }: DebugPanelProps) {
  const [renderCount, setRenderCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
    setLastUpdate(new Date().toLocaleTimeString());
  }, [messages]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "lime",
        padding: "15px",
        borderRadius: "8px",
        fontFamily: "monospace",
        fontSize: "12px",
        zIndex: 9999,
        maxWidth: "400px",
        maxHeight: "300px",
        overflow: "auto",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "10px", color: "yellow" }}>
        🔍 DEBUG PANEL
      </div>
      
      <div style={{ marginBottom: "5px" }}>
        <strong>Session ID:</strong> {sessionId.slice(0, 8)}...
      </div>
      
      <div style={{ marginBottom: "5px" }}>
        <strong>Message Count:</strong> {messages.length}
      </div>
      
      <div style={{ marginBottom: "5px" }}>
        <strong>Render Count:</strong> {renderCount}
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>Last Update:</strong> {lastUpdate}
      </div>
      
      <div style={{ borderTop: "1px solid #333", paddingTop: "10px" }}>
        <strong>Messages:</strong>
        {messages.length === 0 ? (
          <div style={{ color: "orange" }}>No messages</div>
        ) : (
          <div style={{ maxHeight: "150px", overflow: "auto", marginTop: "5px" }}>
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                style={{
                  padding: "5px",
                  marginBottom: "5px",
                  backgroundColor: msg.role === "human" ? "#1a3a1a" : "#1a1a3a",
                  borderRadius: "4px",
                }}
              >
                <div style={{ fontSize: "10px", color: "#888" }}>
                  #{idx + 1} - {msg.id.slice(0, 12)}...
                </div>
                <div style={{ color: msg.role === "human" ? "#90EE90" : "#ADD8E6" }}>
                  <strong>{msg.role}:</strong> {msg.content.slice(0, 50)}
                  {msg.content.length > 50 ? "..." : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: "10px", fontSize: "10px", color: "#666" }}>
        Press F12 to see console logs
      </div>
    </div>
  );
}