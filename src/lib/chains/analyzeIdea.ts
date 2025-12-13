import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { prisma } from "../prisma";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGroq } from "@langchain/groq";

const modelCache = new Map<string, BaseChatModel>();

function getModelByName(modelName: string): BaseChatModel {
  if (modelCache.has(modelName)) {
    return modelCache.get(modelName)!;
  }

  let model: BaseChatModel;

  switch (modelName) {
    case "gemini-2.5-flash-lite":
      model = new ChatGoogleGenerativeAI({
        model: modelName,
        temperature: 0.8,
        maxOutputTokens: 2048,
        topP: 1,
        topK: 40,
        apiKey: process.env.GEMINI_API_KEY,
      });
      break;

    case "llama-3.3-70b-versatile":
    case "llama-3.1-8b-instant":
      model = new ChatGroq({
        model: modelName,
        temperature: 0.8,
        maxTokens: undefined,
        maxRetries: 2,
        apiKey: process.env.GROQ_API_KEY,
      });
      break;

    default:
      throw new Error(`Unsupported model: ${modelName}`);
  }

  modelCache.set(modelName, model);
  return model;
}

export async function analyzeIdeaChain(
  idea: string,
  sessionId: string,
  modelName: string
): Promise<string> {
  //creating the model
  const model = getModelByName(modelName);

  // Loading messages from db
  const messagesFromDB = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  //storing messages in history
  const messageHistory = new ChatMessageHistory();
  for (const msg of messagesFromDB) {
    if (msg.role === "human") {
      await messageHistory.addUserMessage(msg.content);
    }
    if (msg.role === "ai") {
      await messageHistory.addAIMessage(msg.content);
    }
  }

  //setting up buffer memory
  const memory = new BufferMemory({
    chatHistory: messageHistory,
    memoryKey: "chat_context",
    returnMessages: true,
  });

  const systemPrompt = `You are a compassionate and supportive AI Mental Health Companion designed to help users cope with emotional distress, anxiety, stress, or sadness in a private and anonymous setting.

Your core role is to offer empathetic conversation, detect and respond to emotional states, and suggest helpful coping strategies like breathing exercises, grounding techniques, music, journaling prompts, or encouraging words.

You must always:

Respond warmly, respectfully, and without judgment.

Maintain a non-clinical and supportive tone — you are not a therapist, but a supportive AI friend.

Detect emotional cues from the user's messages (e.g., sadness, anger, loneliness) and adapt your tone and suggestions accordingly.

Encourage the user to express themselves safely and freely.

Offer coping tools, mental health tips, and emotional regulation techniques in response to distress.

If signs of a crisis (e.g., suicidal thoughts, self-harm) are detected, gently suggest seeking professional help or contacting a local helpline.

Respect user privacy at all times and never store or share personal data. You must reassure users that their conversation is anonymous and secure.

Avoid offering any diagnosis, medical opinion, or medication advice.

When appropriate, you can say things like:

"Would you like to try a quick grounding exercise with me?"

"I’m here to listen whenever you’re ready to talk."

"You’re not alone in this. Many people feel this way sometimes."

"Would journaling or listening to calming music help right now?"

If a user expresses a neutral or positive mood, focus on celebrating emotional wins, suggesting well-being practices, and keeping the conversation light and friendly.`;

  const contexualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chat_context"),
    ["human", "{idea}"],
  ]);

  const chain = new ConversationChain({
    prompt: contexualizeQPrompt,
    llm: model,
    memory,
  });

  const response = await chain.call({ idea });

  const now = new Date();
  const nowplus3 = new Date(now.getTime() + 3000);

  const saveToDb = await prisma.message.createMany({
    data: [
      { sessionId, role: "human", content: idea },
      {
        sessionId,
        role: "ai",
        content: response.response,
        createdAt: nowplus3,
      },
    ],
  });

  console.log(response.response);
  if (saveToDb) return response.response;
  return "There is an error in saving message to Db";
}
