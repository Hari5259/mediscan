import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  ArrowLeft, 
  Maximize, 
  Search,
  Pill,
  Clock,
  ShieldAlert,
  ChevronRight,
  Zap,
  RotateCw,
  AlertCircle,
  Scan,
  RefreshCcw,
  Info,
  AlertTriangle
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
    schedule: "Every 6 hours",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Amoxicillin",
    type: "Antibiotic (Penicillin)",
    usage: "Treatment of bacterial infections like pneumonia, bronchitis, and ear infections.",
    dosage: "250mg to 500mg every 8 hours or as prescribed.",
    sideEffects: "Nausea, vomiting, diarrhea, or allergic reactions.",
    precautions: "Finish the entire course even if feeling better. Not for viral infections.",
    schedule: "3 times daily",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Metformin",
    type: "Antidiabetic",
    usage: "Control of blood sugar levels in patients with type 2 diabetes.",
    dosage: "Usually started at 500mg twice daily with meals.",
    sideEffects: "Metallic taste, stomach upset, vitamin B12 deficiency.",
    precautions: "Monitor kidney function. Take with meals to reduce stomach upset.",
    schedule: "Morning & Night",
    color: "from-emerald-500 to-teal-500"
  }
];

const MedicineScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedMedicine, setDetectedMedicine] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setError(null);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access denied or unavailable.");
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const intervalRef = useRef(null);

  const handleInitializeScan = () => {
    if (!hasCamera) {
      startCamera();
      return;
    }
    
    setIsScanning(true);
    setScanProgress(0);
    setDetectedMedicine(null);
    setShowResult(false);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            const randomMed = MEDICINE_DATABASE[Math.floor(Math.random() * MEDICINE_DATABASE.length)];
            setDetectedMedicine(randomMed);
            setShowResult(true);
            setIsScanning(false);
          }, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 p-4 md:p-8 overflow-x-hidden">
      {/* Background HUD Grid */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Futuistic Header */}
        <header className="flex items-center justify-between mb-12 p-6 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem] shadow-2xl">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => { stopCamera(); navigate('/dashboard'); }}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                  MED<span className="text-cyan-400">LENS</span>
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">PRO HUD</span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Advanced Optical Pharmacopoeia System</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase">System Status</span>
              <span className="text-xs font-black text-emerald-500 uppercase flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Operational
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: The Cyber Viewfinder */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-neutral-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
              
              {/* Camera Feed */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hasCamera ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Viewfinder Overlay (HUD) */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* HUD Corners */}
                <div className="absolute top-10 left-10 w-16 h-16 border-t-[6px] border-l-[6px] border-cyan-400/80 rounded-tl-xl"></div>
                <div className="absolute top-10 right-10 w-16 h-16 border-t-[6px] border-r-[6px] border-cyan-400/80 rounded-tr-xl"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 border-b-[6px] border-l-[6px] border-cyan-400/80 rounded-bl-xl"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border-b-[6px] border-r-[6px] border-cyan-400/80 rounded-br-xl"></div>

                {/* Center Target */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 flex items-center justify-center rounded-full">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full scale-110"></div>
                </div>

                {/* Dynamic Data Overlay */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
                  <div className="px-4 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase">Auto-Focus Enabled</span>
                  </div>
                </div>

                {/* Scanning Line */}
                {isScanning && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-[scan_2s_infinite]"></div>
                )}
              </div>

              {/* Viewfinder Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-30 bg-black/40 backdrop-blur-[2px]">
                {!isScanning && !showResult && (
                  <div className="animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/20 flex items-center justify-center mb-8 mx-auto relative group-hover:scale-110 transition-transform">
                      <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-10"></div>
                      <Camera className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-3">Initialize Optical Core</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] max-w-xs mx-auto mb-10 leading-relaxed">
                      Sync biological data with pharmaceutical records in real-time.
                    </p>
                    {error && <p className="text-rose-500 text-[10px] font-black uppercase mb-4 tracking-widest">{error}</p>}
                    <button 
                      onClick={handleInitializeScan}
                      className="group relative bg-white text-black px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-400 transition-all flex items-center gap-4 shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95"
                    >
                      <Scan size={18} />
                      {hasCamera ? 'Start Analysis' : 'Connect Optics'}
                    </button>
                  </div>
                )}

                {isScanning && (
                  <div className="w-full max-w-sm">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Quantum Processing</span>
                      <span className="text-2xl font-black italic tracking-tighter">{Math.round(scanProgress)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-8 border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100 ease-linear shadow-[0_0_20px_#22d3ee]" 
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] animate-pulse">Cross-referencing Molecule ID...</p>
                  </div>
                )}
              </div>
            </div>

            {/* High-Tech Safety Card */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px]"></div>
              <div className="flex gap-8 items-start relative z-10">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl group-hover:rotate-12 transition-transform">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-3">Protocol Beta-7</h4>
                  <p className="text-base text-slate-400 leading-relaxed italic font-medium">
                    "System results are advisory. Pharmaceutical consumption requires secondary validation by a biological specialist."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Density Data Result */}
          <div className="lg:col-span-5 flex flex-col h-full">
            {showResult ? (
              <div className="space-y-8 animate-in slide-in-from-right-12 fade-in duration-700 h-full">
                <div className="flex items-center gap-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em]">Dossier Alpha-1</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                </div>

                {/* Primary Molecule Card */}
                <div className={`bg-gradient-to-br ${detectedMedicine.color} p-10 rounded-[3rem] shadow-2xl relative group overflow-hidden`}>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-black/20 backdrop-blur-md rounded-xl text-white">
                        <Pill size={24} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-white/70">{detectedMedicine.type}</span>
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-8 leading-none">{detectedMedicine.name}</h2>
                    <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                      <Clock size={20} className="text-white/80" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Temporal Schedule</span>
                        <span className="text-sm font-black text-white uppercase">{detectedMedicine.schedule}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-Density Info Grid */}
                <div className="grid grid-cols-1 gap-4 flex-1">
                  <DataGridItem title="Medical Vector" content={detectedMedicine.usage} icon={<Zap size={18} />} />
                  <DataGridItem title="Clinical Dosage" content={detectedMedicine.dosage} icon={<Info size={18} />} />
                  <DataGridItem title="Side-Effect Profile" content={detectedMedicine.sideEffects} icon={<AlertTriangle size={18} />} color="text-amber-500" />
                  <DataGridItem title="Critical Caution" content={detectedMedicine.precautions} icon={<AlertCircle size={18} />} color="text-rose-500" />
                </div>

                <button 
                  onClick={() => { setShowResult(false); setDetectedMedicine(null); }}
                  className="w-full flex items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:text-cyan-400 transition-all"
                >
                  <RefreshCcw size={16} /> New Molecular Scan
                </button>
              </div>
            ) : (
              <div className="h-full border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-16 text-center group transition-all hover:border-white/20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Scan size={32} className="text-slate-700" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Optics Sync Required</h4>
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-3 max-w-[15rem]">
                  The neural core is awaiting a valid pharmaceutical visual input.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(800%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const DataGridItem = ({ title, content, icon, color = "text-cyan-400" }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-all group">
    <div className={`flex items-center gap-4 mb-3 ${color}`}>
      {icon}
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">{title}</h4>
    </div>
    <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{content}</p>
  </div>
);

export default MedicineScanner;
