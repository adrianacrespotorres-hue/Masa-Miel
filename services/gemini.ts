import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Función para obtener la API Key de forma segura
const getApiKey = () => {
  try {
    // Intentamos acceder a process.env solo si está definido
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Masa & Miel: No se pudo acceder a process.env.API_KEY");
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

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