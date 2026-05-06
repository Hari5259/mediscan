import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, RotateCcw, Plus, Activity, MessageCircle, Camera, FileText, Users, AlertCircle, Shield, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Greetings. I am your MediScan AI Health Assistant. How may I support your medical inquiries or wellness goals today?",
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
    { id: 'emergency', icon: AlertCircle, label: 'Emergency Response', path: '/emergency' },
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
    }, 1500);
  };

  const getResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('hello') || q.includes('hi')) return "Greetings. I am online and ready to provide medically-informed guidance or assist with your portal navigation.";
    if (q.includes('fever')) return "A fever is a clinical indication of an immune response. For a more comprehensive evaluation, please utilize our Symptom Checker module.";
    if (q.includes('report')) return "Your secure clinical documentation is stored within the 'Health Reports' section of your dashboard.";
    if (q.includes('doctor')) return "You can browse the specialist directory to schedule a consultation with a certified medical professional.";
    return "I have received your query. Please provide additional clinical context, or I can direct you to one of our specialized diagnostic modules for a more detailed analysis.";
  };

  return (
    <div className="bg-immersive min-h-screen pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="module-tabs bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/40">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item group ${tab.id === 'chatbot' ? 'active' : ''}`}
            >
              <tab.icon size={22} className={`transition-colors duration-300 ${tab.id === 'chatbot' ? 'text-[#1e40af]' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className={`text-[11px] font-bold uppercase tracking-widest ${tab.id === 'chatbot' ? 'text-[#1e40af]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>

        <div className="main-floating-card mt-6 overflow-hidden flex flex-col h-[750px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 rounded-[32px] bg-white/95 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
          {/* Chat Header */}
          <div className="p-8 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center text-white shadow-xl transform transition-transform hover:scale-105">
                  <Bot size={32} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-[24px] font-black tracking-tight text-slate-800">AI Health Assistant</h2>
                  <Sparkles size={18} className="text-blue-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Shield size={12} className="text-[#1e40af]" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">End-to-End Encrypted Session</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">System Status</span>
                <span className="text-[12px] font-bold text-green-600 uppercase tracking-tight">Optimal Performance</span>
              </div>
              <button 
                onClick={() => setMessages([messages[0]])}
                className="w-12 h-12 bg-white hover:bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 transition-all shadow-sm border border-slate-100"
                title="Clear Session"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-slate-50/30">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div className={`max-w-[75%] relative ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`px-8 py-5 rounded-[24px] text-[15px] font-medium leading-relaxed shadow-lg transition-all duration-300 ${
                    msg.type === 'user' 
                    ? 'bg-gradient-to-br from-[#1e40af] to-[#3b82f6] text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-2 mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && <CheckCircle size={10} className="text-blue-500" />}
                    <Clock size={10} />
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-slate-100 rounded-[24px] rounded-tl-none px-8 py-6 flex gap-2 shadow-md">
                  <div className="w-2.5 h-2.5 bg-blue-400/50 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-blue-400/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-blue-400/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 bg-white border-t border-slate-100">
            <form onSubmit={handleSend} className="relative flex items-center gap-5 max-w-[900px] mx-auto">
              <button type="button" className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#1e40af] hover:bg-slate-100 transition-all shadow-sm border border-slate-100">
                <Plus size={24} />
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a medical question or describe symptoms..."
                  className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-[16px] font-semibold text-slate-700 focus:border-[#3b82f6] focus:bg-white focus:shadow-[0_10px_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-slate-300"
                />
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-16 h-16 bg-[#1e40af] hover:bg-[#1e3a8a] text-white rounded-2xl flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-[0_15px_30px_-10px_rgba(30,64,175,0.4)]"
              >
                <Send size={28} />
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Medical Guidance Powered by MediScan AI Core v4.2</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;

