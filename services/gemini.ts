import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Create a persistent chat session helper
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (
  chatSession: Chat,
  message: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const responseStream = await chatSession.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};