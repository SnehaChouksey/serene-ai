import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/get-messages?sessionId=xxx
 *
 * Returns all messages for a session, ordered by createdAt ascending
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    console.log("[/api/get-messages] Fetching messages for sessionId:", sessionId);

    const messages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    console.log("[/api/get-messages] Found messages:", messages.length);

    // Return with consistent format
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      sessionId: msg.sessionId,
      createdAt: msg.createdAt.toISOString(),
    }));

    return NextResponse.json(
      { messages: formattedMessages },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/get-messages] Error:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch messages",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}