"use client";

import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface MessageBoxProps {
  onSend: (userInput: string) => void;
  disabled: boolean;
}

export default function MessageBox({ onSend, disabled }: MessageBoxProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative flex items-end gap-2 bg-card border border-primary/20 rounded-2xl p-2 shadow-sm hover:border-primary/40 transition-colors">
        {/* Textarea */}
        <Textarea
          placeholder="Ask me anything..."
          className="flex-1 border-none text-foreground bg-transparent resize-none outline-none placeholder-muted-foreground max-h-32 min-h-10 py-2.5 px-2"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          value={message}
          disabled={disabled}
          rows={1}
        />

        {/* Send Button */}
        <Button
          disabled={disabled || !message.trim()}
          onClick={handleSend}
          size="sm"
          className="flex-shrink-0 h-8 w-8 p-0 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-40 transition-opacity"
        >
          <Send size={16} className="text-white" />
        </Button>
      </div>

      
    </div>
  );
}
