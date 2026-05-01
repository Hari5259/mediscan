import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  ArrowLeft, 
  RotateCcw, 
  Search as SearchIcon,
  Activity,
  ChevronRight,
  AlertCircle,
  X,
  Plus,
  MessageCircle,
  Camera,
  FileText,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

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
    advice: "Rest, stay hydrated, and use over-the-counter cold medicine if needed.",
    severity: "Low",
    specialist: "General Physician",
    color: "#008cff"
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["Fever", "Fatigue", "Body ache", "Chills", "Headache", "Cough"],
    advice: "Get plenty of rest and fluids. Antiviral medication may be prescribed.",
    severity: "Medium",
    specialist: "General Physician",
    color: "#ff9500"
  },
  {
    name: "COVID-19",
    symptoms: ["Fever", "Cough", "Fatigue", "Loss of taste", "Loss of smell", "Shortness of breath"],
    advice: "Isolate yourself and get tested. Monitor oxygen levels.",
    severity: "High",
    specialist: "Infectious Disease Specialist",
    color: "#ff3b30"
  }
];

export default function SymptomChecker() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "HELLO. I AM READY TO ANALYZE YOUR HEALTH VECTORS. DESCRIBE YOUR CURRENT SYMPTOMS BELOW.",
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

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

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
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    const found = SYMPTOMS_DATA.filter(s => currentInput.toLowerCase().includes(s.toLowerCase()));

    setTimeout(() => {
      setIsTyping(false);
      const newDetected = [...new Set([...detectedSymptoms, ...found])];
      setDetectedSymptoms(newDetected);
      
      const conditions = CONDITIONS_DATA.map(condition => {
        const matches = condition.symptoms.filter(s => newDetected.some(d => d.toLowerCase() === s.toLowerCase()));
        const score = (matches.length / condition.symptoms.length) * 100;
        return { ...condition, matchScore: score };
      }).filter(c => c.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);

      setMatchedConditions(conditions);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: found.length > 0 ? `I've analyzed: ${found.join(', ')}. Cross-referencing database...` : "Could you provide more specific symptoms?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      if (conditions.length > 0) setShowResults(true);
    }, 1000);
  };

  return (
    <div className="bg-immersive pb-24 min-h-screen">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'symptom-checker' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card mt-4 overflow-hidden">
          <div className="flex flex-col lg:flex-row h-[600px]">
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col border-r border-gray-100">
              <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-[20px] font-extrabold">Symptom Checker</h2>
                  <p className="text-[12px] font-bold text-gray-500 uppercase">Interactive AI Diagnostics</p>
                </div>
                <button onClick={() => setMessages([messages[0]])} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <RotateCcw size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-[12px] px-5 py-3 shadow-md ${
                      msg.type === 'user' 
                      ? 'bg-[#008cff] text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-900 rounded-tl-none border border-gray-200'
                    }`}>
                      <p className="text-[15px] font-medium leading-relaxed">{msg.text}</p>
                      <span className="text-[10px] mt-1 block opacity-60 font-bold">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-[12px] rounded-tl-none px-5 py-4 flex gap-1 animate-pulse">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 bg-white border-t border-gray-200">
                <form onSubmit={handleSend} className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your symptoms (e.g., 'I have a fever and headache')"
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all pr-16"
                  />
                  <button 
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#008cff] text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>

            {/* Analysis Side */}
            <div className="lg:w-[400px] bg-gray-50 p-10 overflow-y-auto">
              <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <SearchIcon size={16} /> Diagnostic Results
              </h3>

              {!showResults ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Activity size={32} className="text-gray-400" />
                  </div>
                  <p className="text-[14px] font-bold text-gray-500 uppercase tracking-tighter">Awaiting input for analysis...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {matchedConditions.map((condition, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[12px] shadow-lg border border-gray-200 group hover:border-[#008cff] transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-[18px] font-extrabold">{condition.name}</h4>
                        <span 
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                          style={{ backgroundColor: `${condition.color}15`, color: condition.color }}
                        >
                          {condition.severity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full mb-4 overflow-hidden">
                        <div 
                          className="h-full bg-[#008cff] transition-all duration-1000" 
                          style={{ width: `${condition.matchScore}%` }}
                        />
                      </div>
                      <p className="text-[13px] text-gray-600 font-medium leading-relaxed mb-6 italic">"{condition.advice}"</p>
                      <button className="w-full py-3 bg-gray-100 hover:bg-[#008cff] hover:text-white rounded-[8px] text-[12px] font-black uppercase tracking-widest transition-all">
                        Consult Specialist
                      </button>
                    </div>
                  ))}

                  <div className="p-5 bg-red-50 border border-red-100 rounded-[12px] flex gap-4 mt-12">
                    <AlertCircle size={24} className="text-red-500 shrink-0" />
                    <p className="text-[11px] font-bold text-red-900 leading-tight uppercase tracking-tight">
                      Notice: This AI synthesis is an estimation. Mandatory clinical verification required.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
