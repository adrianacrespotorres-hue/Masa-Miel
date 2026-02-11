import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, X, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/gemini';
import { Chat, GenerateContentResponse } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: '¡Hola! Soy Aura 🌿. Estoy aquí para recomendarte el pan perfecto o ese postre que te mereces hoy. ¿Qué se te antoja?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to persist the chat session across renders
  const chatSessionRef = useRef<Chat | null>(null);

  // Initialize chat session once
  useEffect(() => {
    if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const stream = await sendMessageToGemini(chatSessionRef.current, userMessage.text);
        
        const botMessageId = (Date.now() + 1).toString();
        // Add placeholder message
        setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '' }]);

        let fullText = '';
        
        for await (const chunk of stream) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                fullText += c.text;
                setMessages(prev => 
                    prev.map(msg => 
                        msg.id === botMessageId ? { ...msg, text: fullText } : msg
                    )
                );
            }
        }
    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            role: 'model', 
            text: 'Lo siento, tuve un problema al hornear esa respuesta. ¿Intenta de nuevo?' 
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-bakery-200 w-80 sm:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 invisible'
        }`}
        style={{ maxHeight: '600px', height: '80vh' }}
      >
        {/* Header */}
        <div className="bg-bakery-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-accent-500" />
            <div>
              <h3 className="font-serif font-bold">Aura AI</h3>
              <p className="text-xs text-bakery-200">Asistente de Panadería</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-bakery-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bakery-50 h-[calc(100%-130px)]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-bakery-600 text-white rounded-br-none'
                    : 'bg-white text-bakery-800 rounded-bl-none border border-bakery-100'
                }`}
              >
                {msg.role === 'model' ? (
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                    msg.text
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-bakery-100">
                <Loader2 className="animate-spin text-bakery-400" size={16} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-bakery-100 absolute bottom-0 w-full h-[70px]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pregunta por pan sin gluten..."
              className="flex-1 bg-bakery-50 border border-bakery-200 text-bakery-800 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-400 placeholder:text-bakery-300"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-bakery-800 text-white p-2 rounded-full hover:bg-bakery-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto bg-bakery-800 hover:bg-bakery-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center group ${isOpen ? 'rotate-90 opacity-0 absolute' : 'opacity-100'}`}
      >
        <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-3 bg-white text-bakery-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Pregúntale a Aura
        </span>
      </button>
    </div>
  );
};

export default AIChat;