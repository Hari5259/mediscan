import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Maximize, 
  Search,
  Pill,
  Clock,
  ShieldAlert,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MEDICINE_DATABASE = [
  {
    name: "Paracetamol (Acetaminophen)",
    type: "Analgesic & Antipyretic",
    usage: "Relief of mild to moderate pain (headache, muscle ache) and reduction of fever.",
    dosage: "Adults: 500mg-1g every 4-6 hours. Max 4g per day.",
    sideEffects: "Rare, but can include skin rash or liver damage if overdosed.",
    precautions: "Avoid alcohol. Do not take with other paracetamol-containing products.",
    schedule: "Every 6 hours"
  },
  {
    name: "Amoxicillin",
    type: "Antibiotic (Penicillin)",
    usage: "Treatment of bacterial infections like pneumonia, bronchitis, and ear infections.",
    dosage: "250mg to 500mg every 8 hours or as prescribed.",
    sideEffects: "Nausea, vomiting, diarrhea, or allergic reactions.",
    precautions: "Finish the entire course even if feeling better. Not for viral infections.",
    schedule: "3 times daily"
  },
  {
    name: "Metformin",
    type: "Antidiabetic",
    usage: "Control of blood sugar levels in patients with type 2 diabetes.",
    dosage: "Usually started at 500mg twice daily with meals.",
    sideEffects: "Metallic taste, stomach upset, vitamin B12 deficiency.",
    precautions: "Monitor kidney function. Take with meals to reduce stomach upset.",
    schedule: "Morning & Night"
  },
  {
    name: "Loratadine",
    type: "Antihistamine",
    usage: "Relief of allergy symptoms like sneezing, runny nose, and itchy eyes.",
    dosage: "10mg once daily.",
    sideEffects: "Headache, dry mouth, drowsiness (rare).",
    precautions: "Consult doctor if you have liver or kidney disease.",
    schedule: "Once daily"
  }
];

const MedicineScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedMedicine, setDetectedMedicine] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const startScan = () => {
    setIsScanning(true);
    setDetectedMedicine(null);
    setShowResult(false);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishScan();
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const finishScan = () => {
    // Pick a random medicine from DB for simulation
    const randomMed = MEDICINE_DATABASE[Math.floor(Math.random() * MEDICINE_DATABASE.length)];
    setTimeout(() => {
      setIsScanning(false);
      setDetectedMedicine(randomMed);
      setShowResult(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black p-4 md:p-8">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:bg-white/10 rounded-full transition-colors border border-white/5"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter italic">Med<span className="text-slate-500">Lens</span> v2.0</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Optical Pharmaceutical Analyzer</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-neutral-900 border border-white/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Scanner Ready</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Viewfinder */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-video sm:aspect-square bg-neutral-900 rounded-[2.5rem] border border-white/10 overflow-hidden group">
              {/* Corner Accents */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-white z-20"></div>
              <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-white z-20"></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-white z-20"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-white z-20"></div>

              {/* Viewfinder Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                {!isScanning && !showResult ? (
                  <>
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Align Medicine Package</h3>
                    <p className="text-slate-500 text-sm max-w-xs mb-8 uppercase tracking-widest font-bold">
                      Position the label within the frame for identification
                    </p>
                    <button 
                      onClick={startScan}
                      className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-200 transition-all flex items-center gap-3 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      <Maximize size={16} />
                      Initialize Scan
                    </button>
                  </>
                ) : isScanning ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-12">
                    <div className="w-full max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                      <div 
                        className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 border-2 border-white/50 rounded-xl animate-ping"></div>
                      <Search className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter italic mt-6">Analyzing Label...</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Accessing Global Pharmacopoeia</p>
                    
                    {/* Floating Scan Line */}
                    <div className="absolute inset-0 w-full h-[2px] bg-white/50 shadow-[0_0_20px_white] animate-[scan_2s_infinite]"></div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-900/50">
                    <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Analysis Complete</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">{detectedMedicine.name}</p>
                    <button 
                      onClick={startScan}
                      className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <RotateCw size={14} className="w-3 h-3" /> Re-Scan Module
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-neutral-900 border border-white/10 p-8 rounded-[2rem] flex gap-6 items-start">
              <div className="p-3 bg-white/5 rounded-2xl text-white">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Safety Protocol</h4>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "Never consume medicine without cross-verifying with a certified prescription. This tool is for educational purposes only."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5">
            {showResult ? (
              <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Medicine Dossier</span>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>

                {/* Primary Info */}
                <div className="bg-white text-black p-8 rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-black text-white rounded-lg">
                      <Pill size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{detectedMedicine.type}</span>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">{detectedMedicine.name}</h2>
                  <div className="flex items-center gap-4 py-4 border-t border-black/10">
                    <Clock size={16} />
                    <div className="text-[10px] font-bold uppercase tracking-widest">Schedule: <span className="font-black text-xs">{detectedMedicine.schedule}</span></div>
                  </div>
                </div>

                {/* Detail Sections */}
                <div className="space-y-4">
                  <DetailCard title="Primary Usage" content={detectedMedicine.usage} icon={<Zap size={16} />} />
                  <DetailCard title="Standard Dosage" content={detectedMedicine.dosage} icon={<Info size={16} />} />
                  <DetailCard title="Side Effects" content={detectedMedicine.sideEffects} icon={<AlertTriangle size={16} />} color="text-amber-500" />
                  <DetailCard title="Critical Precautions" content={detectedMedicine.precautions} icon={<ShieldAlert size={16} />} color="text-rose-500" />
                </div>

                <button 
                  onClick={() => navigate('/doctors')}
                  className="w-full border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-white/40 transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">Consult Doctor Regarding Dosage</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="h-full border border-white/5 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center opacity-30">
                <Pill className="w-16 h-16 mb-6" />
                <h4 className="text-sm font-black uppercase tracking-[0.2em]">Awaiting Analysis</h4>
                <p className="text-[10px] uppercase tracking-widest mt-2">Scan a package to view pharmaceutical data</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

const DetailCard = ({ title, content, icon, color = "text-white" }) => (
  <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
    <div className={`flex items-center gap-3 mb-3 ${color}`}>
      {icon}
      <h4 className="text-[10px] font-black uppercase tracking-widest">{title}</h4>
    </div>
    <p className="text-sm text-slate-400 font-medium leading-relaxed">{content}</p>
  </div>
);

const RotateCw = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export default MedicineScanner;
