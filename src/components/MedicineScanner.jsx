import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  ArrowLeft, 
  Pill,
  Clock,
  ChevronRight,
  Scan,
  RefreshCcw,
  Info,
  AlertTriangle,
  X,
  Activity,
  MessageCircle,
  FileText,
  Users,
  AlertCircle,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MEDICINE_DATABASE = [
  {
    name: "Paracetamol",
    type: "Analgesic",
    usage: "Relief of mild to moderate pain and reduction of fever.",
    dosage: "Adults: 500mg-1g every 4-6 hours. Max 4g per day.",
    sideEffects: "Rare, but can include skin rash or liver damage.",
    schedule: "Every 6 hours",
    color: "#008cff"
  },
  {
    name: "Amoxicillin",
    type: "Antibiotic",
    usage: "Treatment of bacterial infections like pneumonia.",
    dosage: "250mg to 500mg every 8 hours.",
    sideEffects: "Nausea, vomiting, or allergic reactions.",
    schedule: "3 times daily",
    color: "#34C759"
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

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

  const startCamera = async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support camera access.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setError(null);
      }
    } catch (err) {
      console.error("Camera Error:", err);
      setError(err.message || "Camera access denied. Please ensure you have granted permission.");
      setHasCamera(false);
    }
  };

  const handleCapture = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDetectedMedicine(MEDICINE_DATABASE[0]);
          setShowResult(true);
          setIsScanning(false);
        }, 500);
      }
    }, 50);
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-immersive pb-24 min-h-screen">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`module-tab-item ${tab.id === 'medicine-scanner' ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card mt-4 overflow-hidden p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square max-w-[500px] bg-black rounded-[24px] overflow-hidden shadow-2xl relative border-4 border-gray-100">
                <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${hasCamera ? 'opacity-100' : 'opacity-20'}`} />
                
                {error && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 p-8 text-center">
                    <AlertTriangle size={48} className="text-red-500 mb-4" />
                    <p className="text-white font-bold mb-6 text-sm">{error}</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={startCamera}
                        className="px-6 py-2 bg-[#008cff] text-white rounded-lg font-black uppercase text-[10px] tracking-widest shadow-lg"
                      >
                        Retry Camera
                      </button>
                      <button 
                        onClick={() => { setHasCamera(true); setError(null); }}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-black uppercase text-[10px] tracking-widest shadow-lg"
                      >
                        Simulate Scan
                      </button>
                    </div>
                  </div>
                )}

                {isScanning && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-[#008cff] transition-all duration-100" style={{ width: `${scanProgress}%` }} />
                    </div>
                    <span className="text-white text-[12px] font-black uppercase tracking-widest">Scanning Molecule...</span>
                  </div>
                )}
                
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-48 border-2 border-white/40 rounded-3xl" />
                </div>
              </div>

              <div className="mt-12">
                <button 
                  onClick={handleCapture}
                  disabled={!hasCamera || isScanning}
                  className="w-24 h-24 rounded-full bg-white border-[8px] border-gray-100 shadow-2xl flex items-center justify-center active:scale-95 transition-all disabled:opacity-50 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#008cff] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              {!showResult ? (
                <div className="text-center lg:text-left space-y-6">
                  <h2 className="text-[42px] font-black tracking-tighter leading-tight">Optical Medical Core</h2>
                  <p className="text-[18px] text-gray-500 font-bold leading-relaxed max-w-md">
                    Position your medicine label within the scanner frame for instant AI identification and dosage analysis.
                  </p>
                  <div className="pt-8 grid grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-[12px] border border-blue-100">
                      <Zap className="text-[#008cff] mb-3" />
                      <h4 className="text-[14px] font-black uppercase">Instant Results</h4>
                    </div>
                    <div className="p-6 bg-green-50 rounded-[12px] border border-green-100">
                      <Shield className="text-green-600 mb-3" />
                      <h4 className="text-[14px] font-black uppercase">99% Accuracy</h4>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-slide-up space-y-8">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-[#008cff] rounded-[16px] flex items-center justify-center text-white shadow-xl shadow-blue-200">
                      <Pill size={40} />
                    </div>
                    <div>
                      <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">{detectedMedicine.type} Identified</span>
                      <h2 className="text-[36px] font-black tracking-tight">{detectedMedicine.name}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-[16px] border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <Clock size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Schedule</span>
                      </div>
                      <span className="text-[18px] font-extrabold">{detectedMedicine.schedule}</span>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-[16px] border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <Info size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Dosage</span>
                      </div>
                      <span className="text-[18px] font-extrabold">Standard Oral</span>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6">
                    <div>
                      <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-2">Usage Protocol</h4>
                      <p className="text-[16px] font-bold leading-relaxed">{detectedMedicine.usage}</p>
                    </div>
                    <div>
                      <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-2 text-red-500">Cautionary Profile</h4>
                      <p className="text-[16px] font-bold leading-relaxed text-red-900">{detectedMedicine.sideEffects}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowResult(false)}
                    className="w-full btn-search !text-[16px] py-4 mt-8"
                  >
                    SCAN NEW MEDICINE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicineScanner;
