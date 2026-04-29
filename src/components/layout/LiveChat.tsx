import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Loader2 } from 'lucide-react';

export function LiveChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hi there! 👋 How can we help you choose your next device?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API key not configured");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a helpful customer support agent for MobiStore, a mobile phone retailer. 
Keep your answers very brief, friendly, and helpful. 
Current conversation history:
${messages.map(m => `${m.role}: ${m.text}`).join('\n')}
user: ${userMessage}
assistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'assistant', text: response.text || "I'm sorry, I couldn't understand that." }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 w-80 h-96 mb-4 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white pb-8 shrink-0">
        <h3 className="font-extrabold text-lg tracking-tight">MobiSupport</h3>
        <p className="text-xs font-medium text-blue-100 mt-1">AI Assistant</p>
      </div>
      
      <div className="flex-1 p-5 bg-slate-50 flex flex-col gap-4 overflow-y-auto -mt-4 rounded-t-3xl border-t border-slate-100 relative z-10">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm w-fit max-w-[85%] font-medium leading-relaxed p-4 shadow-sm border border-slate-100 ${
            msg.role === 'assistant' 
              ? 'bg-white rounded-2xl rounded-tl-sm text-slate-700 self-start' 
              : 'bg-blue-600 rounded-2xl rounded-tr-sm text-white self-end'
          }`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm text-slate-700 w-fit border border-slate-100 self-start flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..." 
            className="flex-1 bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium" 
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
