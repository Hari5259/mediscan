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
  AlertCircle
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
    specialist: "General Physician"
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["Fever", "Fatigue", "Body ache", "Chills", "Headache", "Cough"],
    advice: "Get plenty of rest and fluids. Antiviral medication may be prescribed by a doctor within the first 48 hours.",
    severity: "Medium",
    specialist: "General Physician"
  },
  {
    name: "COVID-19",
    symptoms: ["Fever", "Cough", "Fatigue", "Loss of taste", "Loss of smell", "Shortness of breath"],
    advice: "Isolate yourself and get tested. Monitor oxygen levels and seek medical attention if breathing becomes difficult.",
    severity: "High",
    specialist: "Infectious Disease Specialist"
  },
  {
    name: "Migraine",
    symptoms: ["Headache", "Nausea", "Dizziness", "Sensitivity to light"],
    advice: "Rest in a dark, quiet room. Stay hydrated. Consult a neurologist for recurring severe headaches.",
    severity: "Medium",
    specialist: "Neurologist"
  },
  {
    name: "Gastroenteritis",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal pain"],
    advice: "Prevent dehydration by sipping water or oral rehydration solutions. Eat bland foods once vomiting stops.",
    severity: "Medium",
    specialist: "Gastroenterologist"
  },
  {
    name: "Allergies",
    symptoms: ["Sneezing", "Runny nose", "Itchy eyes", "Cough"],
    advice: "Identify and avoid triggers. Antihistamines can help manage symptoms.",
    severity: "Low",
    specialist: "Allergist"
  }
];

const SymptomCheckerChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hello! I'm your AI Medical Assistant. How are you feeling today? Please describe your symptoms.",
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

    // Analyze symptoms from input
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
          text: `I've noted these symptoms: ${found.join(', ')}. Based on what you've told me, I've found some possible conditions. Would you like to see the analysis?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasAction: true
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: "I couldn't identify specific medical symptoms from that. Could you try describing them differently? (e.g., 'I have a fever and a headache')",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }
    }, 1200);
  };

  const resetChat = () => {
    setMessages([{ 
      id: 1, 
      type: 'bot', 
      text: "Hello! I'm your AI Medical Assistant. How are you feeling today? Please describe your symptoms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setDetectedSymptoms([]);
    setMatchedConditions([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-5xl mx-auto min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-white/10 flex items-center justify-between backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter italic">Medi<span className="text-slate-500">Bot</span> v1.0</h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Diagnostics Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={resetChat}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-500 hover:text-white"
            title="Reset Conversation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-300`}
            >
              <div className={`flex gap-4 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${msg.type === 'user' ? 'bg-white text-black' : 'bg-neutral-900 text-white'}`}>
                  {msg.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className="space-y-2">
                  <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                    msg.type === 'user' 
                    ? 'bg-neutral-900 border border-white/20 text-white rounded-tr-none' 
                    : 'bg-white text-black font-medium rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.hasAction && !showResults && (
                      <button 
                        onClick={() => setShowResults(true)}
                        className="mt-4 w-full bg-black text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                      >
                        Show Analysis <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                  <p className={`text-[10px] font-bold text-slate-600 uppercase tracking-widest ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div className="bg-neutral-900 border border-white/10 p-4 rounded-3xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}

          {/* Results Pane (Inline when requested) */}
          {showResults && matchedConditions.length > 0 && (
            <div className="animate-in zoom-in fade-in duration-500 space-y-6 pt-4">
              <div className="flex items-center gap-3 px-4">
                <div className="h-[1px] flex-1 bg-white/10"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Diagnostic Report</span>
                <div className="h-[1px] flex-1 bg-white/10"></div>
              </div>

              {matchedConditions.map((condition, idx) => (
                <div key={idx} className="bg-neutral-900 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/30 transition-all duration-300">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black uppercase tracking-tighter italic">{condition.name}</h3>
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                            condition.severity === 'High' ? 'bg-white text-black' : 'border border-white/20 text-white'
                          }`}>
                            {condition.severity} RISK
                          </span>
                        </div>
                        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
                          System Confidence: {Math.round(condition.matchScore)}%
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        {condition.name.includes('Cold') ? <Thermometer size={24} /> : <Stethoscope size={24} />}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                          <Info size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Medical Protocol</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed italic">
                          "{condition.advice}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Specialist: <span className="text-white ml-2">{condition.specialist}</span>
                        </div>
                        <button 
                          onClick={() => navigate('/doctors')}
                          className="flex items-center gap-2 text-white hover:text-slate-300 text-[10px] font-black uppercase tracking-widest group transition-all"
                        >
                          Book Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex gap-4">
                <AlertCircle className="w-6 h-6 text-white shrink-0" />
                <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-widest">
                  Legal Disclaimer: This automated report is for informational purposes only and does not constitute a medical diagnosis. Consult a human professional for all health matters.
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Area */}
        <footer className="p-6 border-t border-white/10 backdrop-blur-md sticky bottom-0 bg-black/80">
          <form onSubmit={handleSend} className="relative group">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms (e.g. 'I have a dry cough and fatigue')"
              className="w-full bg-neutral-900 border border-white/10 rounded-3xl px-6 py-5 pr-16 text-sm focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all duration-300 placeholder:text-slate-600 font-medium"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-4 bg-white text-black rounded-2xl hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-center text-[10px] font-black text-slate-700 uppercase tracking-widest mt-4">
            MediBot Intelligence System © 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SymptomCheckerChatbot;
