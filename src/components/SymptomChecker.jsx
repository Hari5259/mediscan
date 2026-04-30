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

export default function SymptomCheckerChatbot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "HELLO. I AM MEDIBOT. SYSTEM INITIALIZED. I AM READY TO ANALYZE YOUR PATHOLOGICAL VECTORS. DESCRIBE YOUR CURRENT BIOMETRIC IRREGULARITIES.",
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
      text: input.toUpperCase(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    const found = SYMPTOMS_DATA.filter(s => 
      currentInput.toLowerCase().includes(s.toLowerCase())
    );

    const botTimer = setTimeout(() => {
      setIsTyping(false);
      
      if (found.length > 0 || currentInput.length > 3) {
        const newDetected = [...new Set([...detectedSymptoms, ...found])];
        setDetectedSymptoms(newDetected);
        
        const conditions = CONDITIONS_DATA.map(condition => {
          const matches = condition.symptoms.filter(s => 
            newDetected.some(d => d.toLowerCase() === s.toLowerCase()) || 
            currentInput.toLowerCase().includes(s.toLowerCase())
          );
          const score = (matches.length / condition.symptoms.length) * 100;
          return { ...condition, matchScore: score, matchedCount: matches.length };
        })
        .filter(c => c.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);

        setMatchedConditions(conditions);

        const responseText = found.length > 0 
          ? `NEURAL ANALYSIS COMPLETE. VECTORS DETECTED: ${found.join(', ').toUpperCase()}. CROSS-REFERENCING CLINICAL DATABASE... IDENTIFIED POTENTIAL PATHOLOGICAL PATTERNS.`
          : `INPUT ANALYZED: "${currentInput.toUpperCase()}". PATTERN MATCHING SUGGESTS PARTIAL SYMPTOMATIC OVERLAP. ANALYZING SECONDARY VECTORS...`;

        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasAction: conditions.length > 0
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: "ERROR: INSUFFICIENT BIOMETRIC DATA. PROVIDE MORE PRECISE SYMPTOMATIC INPUT (E.G., 'SEVERE HEADACHE AND ELEVATED TEMPERATURE').",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }
    }, 1500);

    return () => clearTimeout(botTimer);
  };

  const resetChat = () => {
    setMessages([{ 
      id: 1, 
      type: 'bot', 
      text: "SYSTEM REBOOT COMPLETE. MEDIBOT STANDBY. AWAITING BIOMETRIC INPUT.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setDetectedSymptoms([]);
    setMatchedConditions([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
      {/* Dynamic Animated Background HUD */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* HUD Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent animate-scan"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col relative z-10 p-4 md:p-8 h-screen overflow-hidden">
        {/* Futuristic Header */}
        <header className="flex items-center justify-between p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl mb-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 text-cyan-400 shadow-2xl"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-black tracking-tighter italic uppercase italic leading-none">
                  Neural <span className="text-cyan-400">Bot</span>
                </h1>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">Core v4.0</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Diagnostic Link Established</span>
              </div>
            </div>
          </div>
          <button 
            onClick={resetChat}
            className="group p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all shadow-2xl"
          >
            <RotateCcw className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 overflow-y-auto space-y-10 pr-6 custom-scrollbar pb-12">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-8 duration-700`}
            >
              <div className={`flex gap-6 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-2xl transition-all ${
                  msg.type === 'user' 
                  ? 'bg-white text-black' 
                  : 'bg-[#080808] border-white/10 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.05)]'
                }`}>
                  {msg.type === 'user' ? <User size={24} /> : <Bot size={24} className="animate-pulse" />}
                </div>
                <div className="space-y-3">
                  <div className={`p-8 rounded-[3rem] text-sm leading-relaxed relative overflow-hidden group transition-all duration-500 ${
                    msg.type === 'user' 
                    ? 'bg-white/5 border border-white/10 text-white font-black italic uppercase tracking-widest rounded-tr-none' 
                    : 'bg-[#080808] border border-white/5 backdrop-blur-3xl rounded-tl-none hover:border-cyan-500/30 shadow-2xl'
                  }`}>
                    {/* HUD Scanline for bot messages */}
                    {msg.type === 'bot' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
                    )}
                    
                    <p className={`relative z-10 ${msg.type === 'bot' ? 'text-slate-300 font-medium tracking-wide' : 'text-cyan-400 font-black tracking-widest'}`}>{msg.text}</p>
                    
                    {msg.hasAction && !showResults && (
                      <button 
                        onClick={() => setShowResults(true)}
                        className="mt-8 w-full bg-cyan-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl border border-white/10"
                      >
                        <Activity size={18} className="animate-pulse" />
                        Execute Diagnostic Synthesis
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                  <p className={`text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] px-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    TIMESTAMP: {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start items-center gap-6 animate-pulse">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-cyan-400 shadow-2xl">
                <Bot size={24} />
              </div>
              <div className="bg-[#080808] border border-white/5 p-6 rounded-[2rem] rounded-tl-none flex gap-3 shadow-2xl">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce shadow-[0_0_10px_#06b6d4]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s] shadow-[0_0_10px_#3b82f6]"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s] shadow-[0_0_10px_#a855f7]"></div>
              </div>
            </div>
          )}

          {/* Attractive Diagnostic Results - HUD Style */}
          {showResults && matchedConditions.length > 0 && (
            <div className="space-y-12 pt-10 animate-in zoom-in-95 fade-in duration-1000">
              <div className="flex items-center gap-10">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-cyan-500/20"></div>
                <h2 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.8em] text-center italic">Diagnostic Synthesis</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/10 to-cyan-500/20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {matchedConditions.map((condition, idx) => (
                  <div 
                    key={idx} 
                    className="group relative bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 overflow-hidden hover:bg-white/[0.02] transition-all duration-700 hover:border-cyan-500/30 shadow-2xl"
                  >
                    {/* Background HUD Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
                    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${condition.color} opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <div className={`text-[9px] font-black uppercase tracking-[0.4em] mb-3 italic bg-clip-text text-transparent bg-gradient-to-r ${condition.color}`}>
                            {condition.severity} Severity Threat
                          </div>
                          <h3 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">{condition.name}</h3>
                        </div>
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-2xl transform group-hover:rotate-12 transition-all duration-500 group-hover:scale-110`}>
                          {condition.name.includes('Cold') ? <Thermometer size={28} /> : <Stethoscope size={28} />}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="flex items-end gap-4">
                          <span className="text-6xl font-black tracking-tighter italic text-white leading-none">{Math.round(condition.matchScore)}%</span>
                          <span className="text-[9px] font-black text-slate-500 mb-2 uppercase tracking-[0.3em]">Match Accuracy</span>
                        </div>

                        <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 shadow-inner">
                          <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                            "{condition.advice.toUpperCase()}"
                          </p>
                        </div>

                        <button 
                          onClick={() => navigate('/doctors')}
                          className="w-full flex items-center justify-between p-6 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95"
                        >
                          Mobilize {condition.specialist}
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-rose-500/[0.02] border border-rose-500/20 rounded-[3rem] flex gap-8 items-center shadow-2xl group hover:bg-rose-500/[0.05] transition-all">
                <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-2xl">
                  <AlertCircle size={32} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] mb-2 italic">Legal Disclaimer</h4>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
                    This neural synthesis is an algorithmic estimation based on provided biometric vectors. Clinical verification by human medical personnel is mandatory for all pharmacological protocols.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Cyber Input Area */}
        <footer className="mt-8 relative">
          <form onSubmit={handleSend} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#080808] border border-white/10 rounded-[3rem] overflow-hidden p-3 group-focus-within:border-cyan-500/30 transition-all shadow-2xl">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="DESCRIBE BIOMETRIC ANOMALIES..."
                className="flex-1 bg-transparent px-10 py-6 text-[11px] font-black tracking-[0.2em] focus:outline-none placeholder:text-slate-800 text-white uppercase"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-20 h-20 bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-all disabled:opacity-10 disabled:scale-100 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center shrink-0 border-4 border-black group-hover:bg-cyan-400"
              >
                <Send size={24} />
              </button>
            </div>
          </form>
          <div className="flex justify-center gap-12 mt-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_#06b6d4]"></div>
              <span className="text-[8px] font-black text-slate-800 uppercase tracking-[0.6em]">Encrypted Node</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse shadow-[0_0_5px_#3b82f6]"></div>
              <span className="text-[8px] font-black text-slate-800 uppercase tracking-[0.6em]">ISO-27001 Protocol</span>
            </div>
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
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}
