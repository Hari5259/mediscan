import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  ArrowLeft, 
  RotateCcw, 
  Search,
  Activity,
  ChevronRight,
  AlertCircle,
  X,
  Plus
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
    advice: "Rest, stay hydrated, and use over-the-counter cold medicine if needed. Consult a doctor if symptoms persist beyond 10 days.",
    severity: "Low",
    specialist: "General Physician",
    color: "#34C759"
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["Fever", "Fatigue", "Body ache", "Chills", "Headache", "Cough"],
    advice: "Get plenty of rest and fluids. Antiviral medication may be prescribed by a doctor within the first 48 hours.",
    severity: "Medium",
    specialist: "General Physician",
    color: "#FF9500"
  },
  {
    name: "COVID-19",
    symptoms: ["Fever", "Cough", "Fatigue", "Loss of taste", "Loss of smell", "Shortness of breath"],
    advice: "Isolate yourself and get tested. Monitor oxygen levels and seek medical attention if breathing becomes difficult.",
    severity: "High",
    specialist: "Infectious Disease Specialist",
    color: "#FF3B30"
  },
  {
    name: "Migraine",
    symptoms: ["Headache", "Nausea", "Dizziness", "Sensitivity to light"],
    advice: "Rest in a dark, quiet room. Stay hydrated. Consult a neurologist for recurring severe headaches.",
    severity: "Medium",
    specialist: "Neurologist",
    color: "#AF52DE"
  }
];

export default function SymptomChecker() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hello. Describe how you're feeling, and I'll help you identify potential causes.",
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
      
      const newDetected = [...new Set([...detectedSymptoms, ...found])];
      setDetectedSymptoms(newDetected);
      
      const conditions = CONDITIONS_DATA.map(condition => {
        const matches = condition.symptoms.filter(s => 
          newDetected.some(d => d.toLowerCase() === s.toLowerCase())
        );
        const score = (matches.length / condition.symptoms.length) * 100;
        return { ...condition, matchScore: score, matchedCount: matches.length };
      })
      .filter(c => c.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

      setMatchedConditions(conditions);

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: found.length > 0 
          ? `I've noted: ${found.join(', ')}. Based on these symptoms, I've identified some potential conditions.`
          : "Could you tell me more? For example, do you have a fever, cough, or any pain?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasAction: conditions.length > 0
      };
      setMessages(prev => [...prev, botResponse]);
      if (conditions.length > 0) setShowResults(true);
    }, 1000);
  };

  const removeSymptom = (symptom) => {
    setDetectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 py-12 flex flex-col">
        <header className="mb-10 text-center animate-fade-in">
          <h1 className="apple-heading mb-3">Symptom Checker</h1>
          <p className="apple-subheading">A simple way to understand your health.</p>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row gap-8">
          {/* Chat Section */}
          <div className="flex-1 flex flex-col apple-card overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[80%] rounded-[20px] px-5 py-3 text-[16px] leading-relaxed ${
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
                <div className="flex justify-start animate-pulse">
                  <div className="bg-[#F2F2F7] rounded-[20px] rounded-tl-none px-5 py-3 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-[#F2F2F7]">
              {detectedSymptoms.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {detectedSymptoms.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F2F7] text-[#0071E3] rounded-full text-[13px] font-medium transition-all hover:bg-[#E5E5EA]">
                      {s}
                      <button onClick={() => removeSymptom(s)} className="text-[#86868B] hover:text-[#FF3B30]">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="How are you feeling?"
                  className="apple-input pr-14"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2.5 text-[#0071E3] disabled:text-[#86868B] transition-all"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          {showResults && matchedConditions.length > 0 && (
            <div className="lg:w-[380px] space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 px-2 mb-4">
                <Activity size={18} className="text-[#0071E3]" />
                <h2 className="text-[17px] font-semibold">Potential Causes</h2>
              </div>
              
              {matchedConditions.map((condition, idx) => (
                <div key={idx} className="apple-card p-5 border border-black/5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[18px] font-semibold">{condition.name}</h3>
                    <span 
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${condition.color}15`, color: condition.color }}
                    >
                      {condition.severity}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-[#F2F2F7] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#0071E3] transition-all duration-1000" 
                        style={{ width: `${condition.matchScore}%` }}
                      />
                    </div>
                    <span className="text-[12px] text-[#86868B] mt-1 inline-block">
                      {Math.round(condition.matchScore)}% match based on symptoms
                    </span>
                  </div>
                  <p className="text-[14px] text-[#86868B] leading-relaxed mb-4 italic">
                    "{condition.advice}"
                  </p>
                  <button 
                    onClick={() => navigate('/doctors')}
                    className="w-full apple-button apple-button-secondary text-[14px] flex items-center justify-center gap-2"
                  >
                    Consult {condition.specialist}
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}

              <div className="p-5 bg-[#FFF2F2] rounded-[20px] border border-[#FF3B30]/10 flex gap-4">
                <AlertCircle size={20} className="text-[#FF3B30] shrink-0" />
                <p className="text-[12px] text-[#1D1D1F] leading-tight">
                  <span className="font-bold">Disclaimer:</span> This is for informational purposes only and is not a medical diagnosis. In an emergency, contact emergency services immediately.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
