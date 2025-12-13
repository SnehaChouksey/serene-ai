"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageContainerProps {
  id: string;
  role: "human" | "ai";
  content: string;
  avatarUrl: string;
  name: string;
  isStreaming?: boolean;
}

export default function MessageContainer({
  id,
  role,
  content,
  avatarUrl,
  name,
  isStreaming = false,
}: MessageContainerProps) {
  const [displayContent, setDisplayContent] = useState(content);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isStreaming) {
      setDisplayContent(content);
      return;
    }

    setDisplayContent("");
    let index = 0;
    const fullContent = content;

    intervalRef.current = setInterval(() => {
      setDisplayContent(fullContent.slice(0, index));
      index++;

      if (index > fullContent.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 15);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [content, isStreaming, id]);

  // USER MESSAGE (on right)
  if (role === "human") {
    return (
      <div className="w-full flex justify-end mb-4">
        <div className="flex items-end gap-2 max-w-[70%]">
          {/* Message bubble */}
          <div className="bg-violet-600 text-white rounded-2xl rounded-br-none px-4 py-2.5 text-sm leading-relaxed break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2" {...props} />,
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code className="bg-violet-700 px-1.5 py-0.5 rounded text-xs" {...props} />
                  ) : (
                    <code className="block bg-violet-900 text-white p-2 rounded mb-2 overflow-x-auto text-xs" {...props} />
                  ),
              }}
            >
              {displayContent}
            </ReactMarkdown>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={avatarUrl || "/default-avatar.png"}
              alt={name}
              height={28}
              width={28}
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // AI MESSAGE (on left)
  return (
    <div className="w-full flex justify-start mb-4">
      <div className="flex items-end gap-2 max-w-[70%]">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={avatarUrl || "/ai-avatar.jpg"}
            alt={name}
            height={28}
            width={28}
            className="w-7 h-7 rounded-full object-cover"
          />
        </div>

        {/* Message bubble */}
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-none px-4 py-2.5 text-sm leading-relaxed break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2" {...props} />,
              code: ({ node, inline, ...props }: any) =>
                inline ? (
                  <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs" {...props} />
                ) : (
                  <code className="block bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded mb-2 overflow-x-auto text-xs" {...props} />
                ),
            }}
          >
            {displayContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
