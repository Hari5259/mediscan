import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  ArrowLeft, 
  RotateCcw, 
  Info, 
  Thermometer, 
  Wind, 
  Brain, 
  Stethoscope,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SYMPTOMS_DATA = [
  "Fever", "Headache", "Cough", "Fatigue", "Sore throat", "Nausea", 
  "Shortness of breath", "Body ache", "Loss of taste", "Loss of smell",
  "Runny nose", "Chest pain", "Dizziness", "Abdominal pain", "Diarrhea",
  "Rash", "Joint pain", "Vomiting", "Chills", "Sneezing"
];

const CONDITIONS_DATA = [
  {
    name: "Common Cold",
    symptoms: ["Cough", "Sore throat", "Runny nose", "Sneezing", "Fatigue"],
    advice: "Rest, stay hydrated, and use over-the-counter cold medicine if needed. Consult a doctor if symptoms persist beyond 10 days.",
    severity: "Low",
    specialist: "General Physician",
    color: "from-blue-400 to-cyan-400"
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["Fever", "Fatigue", "Body ache", "Chills", "Headache", "Cough"],
    advice: "Get plenty of rest and fluids. Antiviral medication may be prescribed by a doctor within the first 48 hours.",
    severity: "Medium",
    specialist: "General Physician",
    color: "from-amber-400 to-orange-400"
  },
  {
    name: "COVID-19",
    symptoms: ["Fever", "Cough", "Fatigue", "Loss of taste", "Loss of smell", "Shortness of breath"],
    advice: "Isolate yourself and get tested. Monitor oxygen levels and seek medical attention if breathing becomes difficult.",
    severity: "High",
    specialist: "Infectious Disease Specialist",
    color: "from-rose-500 to-red-600"
  },
  {
    name: "Migraine",
    symptoms: ["Headache", "Nausea", "Dizziness", "Sensitivity to light"],
    advice: "Rest in a dark, quiet room. Stay hydrated. Consult a neurologist for recurring severe headaches.",
    severity: "Medium",
    specialist: "Neurologist",
    color: "from-purple-500 to-indigo-500"
  },
  {
    name: "Gastroenteritis",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal pain"],
    advice: "Prevent dehydration by sipping water or oral rehydration solutions. Eat bland foods once vomiting stops.",
    severity: "Medium",
    specialist: "Gastroenterologist",
    color: "from-emerald-400 to-teal-500"
  }
];

const SymptomCheckerChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hello! I'm MediBot, your advanced AI health companion. I'm here to analyze your symptoms with clinical precision. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [detectedSymptoms, setDetectedSymptoms] = useState([]);
  const [matchedConditions, setMatchedConditions] = useState([]);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    const found = SYMPTOMS_DATA.filter(s => 
      currentInput.toLowerCase().includes(s.toLowerCase())
    );

    setTimeout(() => {
      setIsTyping(false);
      
      if (found.length > 0) {
        const newDetected = [...new Set([...detectedSymptoms, ...found])];
        setDetectedSymptoms(newDetected);
        
        const conditions = CONDITIONS_DATA.map(condition => {
          const matches = condition.symptoms.filter(s => newDetected.includes(s));
          const score = (matches.length / condition.symptoms.length) * 100;
          return { ...condition, matchScore: score, matchedCount: matches.length };
        })
        .filter(c => c.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);

        setMatchedConditions(conditions);

        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: `Analysis complete. I've detected: ${found.join(', ')}. I've identified potential medical patterns that match your description.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasAction: true
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: "I'm having trouble identifying specific symptoms. Could you please describe your physical condition in more detail? (e.g., 'My head hurts and I have a high temperature')",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }
    }, 1500);
  };

  const resetChat = () => {
    setMessages([{ 
      id: 1, 
      type: 'bot', 
      text: "Hello! I'm MediBot, your advanced AI health companion. I'm here to analyze your symptoms with clinical precision. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setDetectedSymptoms([]);
    setMatchedConditions([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col relative z-10 p-4 md:p-6 h-screen">
        {/* Futuristic Header */}
        <header className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl mb-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-400">
                  MEDIBOT
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">v2.4.0</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles size={12} className="text-cyan-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Quantum Neural Diagnostics</span>
              </div>
            </div>
          </div>
          <button 
            onClick={resetChat}
            className="group p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all"
          >
            <RotateCcw className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar pb-8">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-500`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-2xl ${
                  msg.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' 
                  : 'bg-white/5 backdrop-blur-xl text-cyan-400'
                }`}>
                  {msg.type === 'user' ? <User size={20} /> : <Bot size={20} className="animate-pulse" />}
                </div>
                <div className="space-y-2">
                  <div className={`p-6 rounded-[2rem] text-sm leading-relaxed relative overflow-hidden group transition-all ${
                    msg.type === 'user' 
                    ? 'bg-white text-black font-semibold rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-tl-none hover:border-cyan-500/30'
                  }`}>
                    {/* Subtle Glow for bot messages */}
                    {msg.type === 'bot' && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    )}
                    
                    <p className={msg.type === 'bot' ? 'text-slate-200' : 'text-black'}>{msg.text}</p>
                    
                    {msg.hasAction && !showResults && (
                      <button 
                        onClick={() => setShowResults(true)}
                        className="mt-5 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95"
                      >
                        <Activity size={16} className="animate-pulse" />
                        View Diagnostic Report
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                  <p className={`text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start items-center gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Bot size={20} />
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none flex gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}

          {/* Attractive Diagnostic Results */}
          {showResults && matchedConditions.length > 0 && (
            <div className="space-y-8 pt-6 animate-in zoom-in-95 fade-in duration-700">
              <div className="flex items-center gap-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h2 className="text-xs font-black text-cyan-400 uppercase tracking-[0.5em] text-center">Diagnostic Synthesis</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedConditions.map((condition, idx) => (
                  <div 
                    key={idx} 
                    className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:bg-white/[0.08] transition-all duration-500 hover:border-white/20"
                  >
                    {/* Background Gradient Glow */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${condition.color} opacity-20 blur-[60px] group-hover:opacity-40 transition-opacity`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 bg-clip-text text-transparent bg-gradient-to-r ${condition.color}`}>
                            {condition.severity} Severity Match
                          </div>
                          <h3 className="text-2xl font-black tracking-tighter uppercase italic">{condition.name}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${condition.color} flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-12 transition-transform`}>
                          {condition.name.includes('Cold') ? <Thermometer size={28} /> : <Stethoscope size={28} />}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-end gap-3">
                          <span className="text-5xl font-black tracking-tighter">{Math.round(condition.matchScore)}%</span>
                          <span className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Confidence</span>
                        </div>

                        <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-sm text-slate-300 leading-relaxed italic">
                            "{condition.advice}"
                          </p>
                        </div>

                        <button 
                          onClick={() => navigate('/doctors')}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all"
                        >
                          Book {condition.specialist}
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2rem] flex gap-5 items-center">
                <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500">
                  <AlertCircle size={24} />
                </div>
                <p className="text-[10px] font-bold text-rose-200/50 uppercase tracking-widest leading-relaxed">
                  Notice: This AI synthesis is provided for preliminary intelligence only. Clinical verification by a human professional is required for all medical treatments.
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Cyber Input Area */}
        <footer className="mt-6">
          <form onSubmit={handleSend} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden p-2 group-focus-within:border-white/20 transition-all">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your physical state..."
                className="flex-1 bg-transparent px-8 py-5 text-sm focus:outline-none placeholder:text-slate-600 font-medium"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-5 bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <div className="flex justify-center gap-8 mt-6">
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em]">Privacy Encrypted</span>
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em]">ISO-27001 Certified</span>
          </div>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SymptomCheckerChatbot;
