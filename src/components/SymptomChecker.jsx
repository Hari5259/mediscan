import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  Stethoscope, 
  Thermometer, 
  Wind, 
  Brain,
  Plus,
  X,
  ArrowLeft
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

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const filteredSuggestions = SYMPTOMS_DATA.filter(
    s => s.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedSymptoms.includes(s)
  );

  const addSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSearchTerm('');
    }
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      const matchedConditions = CONDITIONS_DATA.map(condition => {
        const matches = condition.symptoms.filter(s => selectedSymptoms.includes(s));
        const matchScore = (matches.length / condition.symptoms.length) * 100;
        return { ...condition, matchScore };
      })
      .filter(c => c.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

      setResults(matchedConditions);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Symptom Checker</h1>
            <p className="text-slate-500 dark:text-slate-400">Identify potential health conditions based on how you feel.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Input */}
          <div className="md:col-span-1 space-y-6">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" />
                Add Symptoms
              </h2>
              
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="e.g. Fever, Headache"
                  className="input-field pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>

              {searchTerm && filteredSuggestions.length > 0 && (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4 shadow-lg">
                  {filteredSuggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => addSymptom(s)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-between group"
                    >
                      <span>{s}</span>
                      <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSymptoms.map(s => (
                  <span 
                    key={s}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-1 animate-in fade-in zoom-in duration-200"
                  >
                    {s}
                    <button onClick={() => removeSymptom(s)}>
                      <X className="w-3 h-3 hover:text-blue-900" />
                    </button>
                  </span>
                ))}
                {selectedSymptoms.length === 0 && (
                  <p className="text-sm text-slate-400 italic">No symptoms added yet.</p>
                )}
              </div>

              <button
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0 || isAnalyzing}
                className={`w-full btn-primary flex items-center justify-center gap-2 ${
                  (selectedSymptoms.length === 0 || isAnalyzing) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    Check Symptoms
                  </>
                )}
              </button>
            </div>

            <div className="glass-card p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-400">Important Disclaimer</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-500/80 mt-1">
                    This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="md:col-span-2">
            {isAnalyzing ? (
              <div className="glass-card p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-100 dark:border-blue-900 rounded-full animate-ping" />
                  <Stethoscope className="w-10 h-10 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-xl font-bold">Scanning Medical Database</h3>
                <p className="text-slate-500 max-w-xs">Comparing your symptoms with thousands of clinical patterns...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Possible Conditions Found
                </h2>
                
                {results.map((condition, idx) => (
                  <div 
                    key={condition.name} 
                    className="glass-card overflow-hidden rounded-2xl hover:border-blue-300 transition-all duration-300 group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{condition.name}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              condition.severity === 'High' ? 'bg-red-100 text-red-700' :
                              condition.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {condition.severity} Risk
                            </span>
                          </div>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                            Match Confidence: {Math.round(condition.matchScore)}%
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          {condition.name.includes('Cold') || condition.name.includes('Flu') ? <Thermometer className="text-blue-500" /> :
                           condition.name.includes('COVID') ? <Wind className="text-blue-500" /> :
                           condition.name.includes('Migraine') ? <Brain className="text-blue-500" /> :
                           <Stethoscope className="text-blue-500" />}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Symptoms Matched</h4>
                          <div className="flex flex-wrap gap-2">
                            {condition.symptoms.map(s => (
                              <span key={s} className={`text-xs px-2 py-1 rounded-md ${
                                selectedSymptoms.includes(s) 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium' 
                                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                              }`}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                          <div className="flex gap-2 mb-2">
                            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <h4 className="text-sm font-bold">Recommended Advice</h4>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {condition.advice}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                          <div className="text-sm">
                            <span className="text-slate-500">Suggested Specialist:</span>
                            <span className="ml-2 font-semibold text-slate-700 dark:text-slate-300">{condition.specialist}</span>
                          </div>
                          <button 
                            onClick={() => navigate('/doctors')}
                            className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Book Consultation <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 rounded-2xl text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Stethoscope className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to Check?</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Add your symptoms on the left and click "Check Symptoms" to see potential health conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
