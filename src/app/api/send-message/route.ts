import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Groq } from "groq-sdk";

/**
 * POST body: { sessionId: string, userInput: string, model?: string }
 *
 * This version uses Groq's SDK for fast, reliable inference
 * Models available:
 * - "llama-3.1-70b-versatile" (default, most capable)
 * - "llama-3.1-8b-instant" (fast, lightweight)
 * - "gemma-2-9b-it" (good balance)
 * - "llama2-70b-4096" (fallback)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { userInput, sessionId, model: modelFromBody } = body;

    if (!userInput || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: userInput and sessionId" },
        { status: 400 }
      );
    }

    console.log(
      "[/api/send-message] Received request for sessionId:",
      sessionId
    );

    // 1) Save user message to database
    const humanMessage = await prisma.message.create({
      data: {
        content: String(userInput),
        role: "human",
        sessionId: String(sessionId),
      },
    });

    console.log("[/api/send-message] Created human message:", humanMessage.id);

    // 2) Get AI response
    let aiText = "Sorry — could not generate a response right now.";

    if (!process.env.GROQ_API_KEY) {
      console.warn("[/api/send-message] No GROQ_API_KEY configured");
      aiText =
        "Please configure GROQ_API_KEY in your environment variables.";
    } else {
      try {
        // Initialize Groq client
        const groq = new Groq({
          apiKey: process.env.GROQ_API_KEY,
        });

        // Select model (with fallback to Llama 3.1)
        // Available models: llama-3.1-70b-versatile, llama-3.1-8b-instant, gemma-2-9b-it
        const modelName =
          modelFromBody || "llama-3.3-70b-versatile";

        console.log(
          "[/api/send-message] Calling Groq with model:",
          modelName
        );

        // Call Groq API
        const message = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: String(userInput),
            },
          ],
          model: modelName,
          temperature: 0.7,
          max_tokens: 512,
        });

        // Extract response text
        aiText =
          message.choices[0]?.message?.content ||
          "No response generated";

        console.log(
          "[/api/send-message] Got Groq response, length:",
          aiText.length
        );
      } catch (aiError) {
        console.error("[/api/send-message] Groq Error:", aiError);
        aiText =
          aiError instanceof Error
            ? `AI Error: ${aiError.message}`
            : "Failed to get AI response";
      }
    }

    // 3) Save AI message to database
    const aiMessage = await prisma.message.create({
      data: {
        content: String(aiText),
        role: "ai",
        sessionId: String(sessionId),
      },
    });

    console.log("[/api/send-message] Created AI message:", aiMessage.id);

    // 4) Return both messages
    return NextResponse.json(
      {
        humanMessage: {
          id: humanMessage.id,
          content: humanMessage.content,
          role: humanMessage.role,
          sessionId: humanMessage.sessionId,
          createdAt: humanMessage.createdAt.toISOString(),
        },
        aiMessage: {
          id: aiMessage.id,
          content: aiMessage.content,
          role: aiMessage.role,
          sessionId: aiMessage.sessionId,
          createdAt: aiMessage.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/send-message] Fatal error:", err);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}