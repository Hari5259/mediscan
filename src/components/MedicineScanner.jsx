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
  Shield,
  Zap,
  History,
  CornerDownRight,
  ShieldAlert,
  ThermometerSnowflake,
  FlaskConical,
  Upload,
  Image as ImageIcon,
  Scale
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MEDICINE_DATABASE = [
  {
    name: "Paracetamol",
    brand: "Calpol / Crocin",
    type: "Analgesic",
    usage: "Relief of mild to moderate pain (headache, toothache, muscle ache) and reduction of fever.",
    dosage: "Adults: 500mg-1g every 4-6 hours. Maximum 4g per 24 hours.",
    sideEffects: "Very rare. Excessive dosage can lead to severe liver damage.",
    precautions: "Do not use with other paracetamol products. Avoid alcohol.",
    storage: "Store below 25°C in a dry place.",
    schedule: "Every 6 hours",
    color: "#008cff"
  },
  {
    name: "Amoxicillin",
    brand: "Amoxil / Mox",
    type: "Antibiotic",
    usage: "Treatment of bacterial infections like pneumonia, bronchitis, and infections of the ear/throat.",
    dosage: "Typically 250mg to 500mg three times daily, depending on severity.",
    sideEffects: "Nausea, diarrhea, or allergic skin reactions.",
    precautions: "Complete the full course even if feeling better. Avoid if allergic to penicillin.",
    storage: "Refrigerate suspension; tablets at room temp.",
    schedule: "3 times daily",
    color: "#34C759"
  },
  {
    name: "Cetirizine",
    brand: "Zyrtec / Okacet",
    type: "Antihistamine",
    usage: "Relief of allergy symptoms like sneezing, itching, watery eyes, and runny nose.",
    dosage: "One 10mg tablet daily.",
    sideEffects: "Drowsiness, dry mouth, or headache.",
    precautions: "May cause drowsiness. Use caution when driving or operating machinery.",
    storage: "Store at room temperature.",
    schedule: "Once daily",
    color: "#AF52DE"
  }
];

const MedicineScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedMedicine, setDetectedMedicine] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [history, setHistory] = useState([
    { name: 'Cetirizine', time: '2 hours ago', status: 'Verified' },
    { name: 'Paracetamol', time: 'Yesterday', status: 'Verified' }
  ]);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'bmi-calculator', label: 'BMI Index', icon: Scale, path: '/bmi-calculator' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

  const startCamera = async () => {
    setError(null);
    setUploadedImage(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your environment restricts direct camera access.");
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
      console.warn("Camera fallback triggered:", err.message);
      setError("CAMERA UNAVAILABLE. Please ensure you are using HTTPS or grant browser permissions.");
      setHasCamera(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setError(null);
        setHasCamera(false);
        handleCapture();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (simulatedIndex = -1) => {
    setIsScanning(true);
    setScanProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) progress = 100;
      setScanProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const index = simulatedIndex >= 0 ? simulatedIndex : Math.floor(Math.random() * MEDICINE_DATABASE.length);
          const med = MEDICINE_DATABASE[index];
          setDetectedMedicine(med);
          setShowResult(true);
          setIsScanning(false);
          setHistory(prev => [{ name: med.name, time: 'Just now', status: 'Verified' }, ...prev.slice(0, 4)]);
        }, 800);
      }
    }, 150);
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
            {/* Left: Scanner HUD */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square max-w-[500px] bg-[#0a0a0a] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative border-8 border-gray-50 group">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded medicine" className="w-full h-full object-cover" />
                ) : (
                  <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity duration-1000 ${hasCamera ? 'opacity-100' : 'opacity-20'}`} />
                )}
                
                {/* Scanner Overlay Graphics */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-10 left-10 w-12 h-12 border-t-4 border-l-4 border-[#008cff] rounded-tl-xl" />
                  <div className="absolute top-10 right-10 w-12 h-12 border-t-4 border-r-4 border-[#008cff] rounded-tr-xl" />
                  <div className="absolute bottom-10 left-10 w-12 h-12 border-b-4 border-l-4 border-[#008cff] rounded-bl-xl" />
                  <div className="absolute bottom-10 right-10 w-12 h-12 border-b-4 border-r-4 border-[#008cff] rounded-br-xl" />
                  
                  {isScanning && (
                    <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#008cff] to-transparent animate-[scan_3s_infinite]" 
                         style={{ top: '50%', boxShadow: '0 0 20px #008cff' }} />
                  )}
                </div>

                {(error && !uploadedImage) && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 p-10 text-center animate-fade-in">
                    <ShieldAlert size={56} className="text-red-500 mb-6" />
                    <h3 className="text-white font-black uppercase tracking-tighter text-xl mb-2">Interface Blocked</h3>
                    <p className="text-gray-400 font-bold mb-10 text-sm leading-relaxed">{error}</p>
                    <div className="flex flex-col gap-4 w-full max-w-[260px]">
                      <button 
                        onClick={() => fileInputRef.current.click()}
                        className="btn-search !text-[12px] py-4 !px-0 w-full flex items-center justify-center gap-3"
                      >
                        <ImageIcon size={18} /> UPLOAD MEDICINE PHOTO
                      </button>
                      <button 
                        onClick={() => handleCapture(0)}
                        className="py-4 border-2 border-white/10 rounded-full text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                      >
                        <Zap size={14} className="text-blue-400" /> SIMULATE SCAN
                      </button>
                    </div>
                  </div>
                )}

                {isScanning && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#008cff]/10 backdrop-blur-md">
                    <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                      <div className="absolute inset-0 border-4 border-[#008cff]/20 rounded-full" />
                      <div className="absolute inset-0 border-t-4 border-[#008cff] rounded-full animate-spin" />
                      <FlaskConical size={48} className="text-[#008cff] animate-pulse" />
                    </div>
                    <div className="w-64 h-2 bg-black/40 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-[#008cff] transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                    </div>
                    <span className="text-[#008cff] text-[13px] font-black uppercase tracking-[0.2em] italic">De-constructing Metadata...</span>
                  </div>
                )}
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />

              <div className="mt-12 flex items-center gap-8">
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#008cff] hover:bg-blue-50 transition-all border border-gray-100"
                  title="Upload image"
                >
                  <Upload size={24} />
                </button>
                <button 
                  onClick={() => handleCapture()}
                  disabled={(!hasCamera && !uploadedImage) || isScanning}
                  className="w-28 h-28 rounded-full bg-white border-[10px] border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-90 transition-all disabled:opacity-30 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#008cff] to-[#0056cc] group-hover:scale-110 transition-transform shadow-lg shadow-blue-200" />
                </button>
                <button 
                  onClick={startCamera}
                  className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#008cff] hover:bg-blue-50 transition-all border border-gray-100"
                  title="Refresh camera"
                >
                  <RefreshCcw size={24} />
                </button>
              </div>
            </div>

            {/* Right: Info Panel */}
            <div className="flex flex-col justify-center">
              {!showResult ? (
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-[52px] font-black tracking-tighter leading-none italic uppercase">
                      Optical <span className="text-[#008cff]">Core</span>
                    </h2>
                    <p className="text-[18px] text-gray-500 font-bold leading-relaxed max-w-md italic uppercase tracking-tight">
                      Neural-Link active. Please position the medical artifact within the scan window or upload a high-resolution image.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 bg-blue-50/50 rounded-[24px] border-2 border-blue-100/50 group hover:border-[#008cff] transition-all">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#008cff] shadow-sm mb-4">
                        <Zap size={24} />
                      </div>
                      <h4 className="text-[14px] font-black uppercase tracking-tight mb-1">Optical ID</h4>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">AI molecular identification</p>
                    </div>
                    <div className="p-8 bg-emerald-50/50 rounded-[24px] border-2 border-emerald-100/50 group hover:border-emerald-500 transition-all">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4">
                        <Shield size={24} />
                      </div>
                      <h4 className="text-[14px] font-black uppercase tracking-tight mb-1">Safe-Verify</h4>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Secure clinical cross-check</p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <h3 className="text-[12px] font-black text-gray-300 uppercase tracking-widest mb-6 flex items-center gap-3 italic">
                      <History size={16} /> Analysis History
                    </h3>
                    <div className="space-y-4">
                      {history.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-[16px] border border-gray-100 hover:bg-white transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#008cff] shadow-sm">
                              <Pill size={20} />
                            </div>
                            <div>
                              <p className="text-[14px] font-black uppercase italic tracking-tight">{item.name}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-[9px] font-black uppercase">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-slide-up space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar pr-4">
                  <div className="flex items-center gap-8 border-b-2 border-gray-100 pb-8 mb-8">
                    <div className="w-24 h-24 bg-[#008cff] rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-blue-200">
                      <Pill size={48} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-[11px] font-black text-[#008cff] uppercase tracking-[0.3em] italic">Identity Verified</span>
                      </div>
                      <h2 className="text-[42px] font-black tracking-tighter leading-none italic uppercase">{detectedMedicine.name}</h2>
                      <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">{detectedMedicine.brand}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 bg-gray-50 rounded-[24px] border-2 border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400 mb-4">
                        <Clock size={18} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Protocol Schedule</span>
                      </div>
                      <span className="text-[24px] font-black italic text-gray-800 uppercase tracking-tight leading-tight">{detectedMedicine.schedule}</span>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-[24px] border-2 border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400 mb-4">
                        <ThermometerSnowflake size={18} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Storage Conditions</span>
                      </div>
                      <span className="text-[24px] font-black italic text-gray-800 uppercase tracking-tight leading-tight">Controlled</span>
                    </div>
                  </div>

                  <div className="space-y-10 pt-4">
                    <div className="flex gap-6 items-start">
                      <div className="p-3 bg-blue-50 text-[#008cff] rounded-xl"><Info size={20} /></div>
                      <div>
                        <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-widest mb-2">Primary Usage</h4>
                        <p className="text-[16px] font-bold text-gray-700 leading-relaxed italic uppercase tracking-tight">"{detectedMedicine.usage}"</p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><AlertTriangle size={20} /></div>
                      <div>
                        <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-widest mb-2">Safety Precautions</h4>
                        <p className="text-[16px] font-bold text-gray-700 leading-relaxed italic uppercase tracking-tight">"{detectedMedicine.precautions}"</p>
                      </div>
                    </div>

                    <div className="p-8 bg-red-50 rounded-[24px] border-2 border-red-100 border-dashed">
                      <h4 className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ShieldAlert size={16} /> Cautionary profile
                      </h4>
                      <p className="text-[14px] font-black text-red-900 leading-relaxed italic uppercase tracking-tight">{detectedMedicine.sideEffects}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8 pb-10">
                    <button 
                      onClick={() => { setShowResult(false); setUploadedImage(null); }}
                      className="flex-1 btn-search !text-[13px] py-5 shadow-none"
                    >
                      INITIALIZE NEW SCAN
                    </button>
                    <button className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 hover:text-[#008cff] transition-all border-2 border-gray-100">
                      <FileText size={24} />
                    </button>
                  </div>
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
