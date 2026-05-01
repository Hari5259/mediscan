import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, RotateCcw, X, Plus, Paperclip, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hi! I'm your MediScan Health Assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getResponse(input),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1200);
  };

  const getResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('hello') || q.includes('hi')) return "Hello! I'm here to assist with your medical questions or help you navigate the app.";
    if (q.includes('fever')) return "A fever is usually a sign that your body is fighting off an infection. Have you taken your temperature? You might want to use our Symptom Checker for a more detailed analysis.";
    if (q.includes('report')) return "You can view all your medical records in the 'Health Reports' section of your dashboard.";
    if (q.includes('doctor')) return "You can find specialists and book appointments in the 'Doctors' section.";
    return "I understand. Could you provide more details, or would you like me to guide you to a specific tool like the Symptom Checker?";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[800px] w-full mx-auto px-6 py-8 flex flex-col">
        <div className="flex-1 apple-card border border-black/5 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-5 border-b border-[#F2F2F7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0071E3] flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold">Health Assistant</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse" />
                  <span className="text-[11px] text-[#86868B] font-medium uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setMessages([messages[0]])}
              className="p-2 text-[#86868B] hover:bg-[#F2F2F7] rounded-full transition-all"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFFFFF]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[75%] px-5 py-3 rounded-[22px] text-[15px] leading-relaxed ${
                  msg.type === 'user' 
                  ? 'bg-[#0071E3] text-white rounded-tr-none' 
                  : 'bg-[#F2F2F7] text-[#1D1D1F] rounded-tl-none'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 opacity-60 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#F2F2F7] rounded-[22px] rounded-tl-none px-5 py-4 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-[#F2F2F7]">
            <form onSubmit={handleSend} className="relative flex items-center gap-3">
              <button type="button" className="p-2 text-[#86868B] hover:bg-[#F2F2F7] rounded-full transition-all">
                <Plus size={22} />
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="iMessage"
                  className="w-full bg-[#F2F2F7] border-none rounded-full px-5 py-3 text-[15px] focus:ring-0 outline-none"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B]">
                  <Smile size={20} />
                </button>
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-[#0071E3] text-white rounded-full flex items-center justify-center disabled:opacity-30 transition-all active:scale-90"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
