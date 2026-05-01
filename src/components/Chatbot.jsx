import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, RotateCcw, X, Plus, Paperclip, Smile, Activity, MessageCircle, Camera, FileText, Users, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "HELLO. I AM YOUR MEDISCAN NEURAL ASSISTANT. HOW CAN I AID YOUR CLINICAL INQUIRY TODAY?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

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
    if (q.includes('hello') || q.includes('hi')) return "Greetings. I am online and ready to assist with your medical questions or portal navigation.";
    if (q.includes('fever')) return "A fever is a systemic inflammatory response. I recommend using our Symptom Checker for a detailed diagnostic estimation.";
    if (q.includes('report')) return "Your clinical dossiers are stored securely in the 'Health Reports' vault.";
    if (q.includes('doctor')) return "You can access the specialist registry to book secure consultations.";
    return "Understood. Please provide more clinical context or select a module from the dashboard for specialized analysis.";
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'chatbot' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card mt-4 overflow-hidden flex flex-col h-[700px]">
          {/* Chat Header */}
          <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-[16px] bg-[#008cff] flex items-center justify-center text-white shadow-lg">
                <Bot size={28} />
              </div>
              <div>
                <h2 className="text-[22px] font-black tracking-tighter italic">NEURAL ASSISTANT</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Core Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setMessages([messages[0]])}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-400 transition-all shadow-sm"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-white">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] px-6 py-4 rounded-[18px] text-[16px] font-bold leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                  ? 'bg-[#008cff] text-white rounded-tr-none' 
                  : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-2 opacity-50 font-black uppercase tracking-widest ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 rounded-[18px] rounded-tl-none px-6 py-5 flex gap-1.5 animate-pulse">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <form onSubmit={handleSend} className="relative flex items-center gap-4">
              <button type="button" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-[#008cff] transition-all shadow-sm">
                <Plus size={24} />
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="TRANSMIT MESSAGE..."
                  className="w-full bg-white border-2 border-gray-100 rounded-full px-8 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none shadow-sm transition-all"
                />
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-14 h-14 bg-[#008cff] text-white rounded-full flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
              >
                <Send size={24} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
