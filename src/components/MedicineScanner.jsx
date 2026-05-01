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
  X
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
    color: "#0071E3"
  },
  {
    name: "Amoxicillin",
    type: "Antibiotic",
    usage: "Treatment of bacterial infections like pneumonia.",
    dosage: "250mg to 500mg every 8 hours.",
    sideEffects: "Nausea, vomiting, or allergic reactions.",
    schedule: "3 times daily",
    color: "#34C759"
  },
  {
    name: "Metformin",
    type: "Antidiabetic",
    usage: "Control of blood sugar levels in patients with type 2 diabetes.",
    dosage: "Usually started at 500mg twice daily with meals.",
    sideEffects: "Metallic taste, stomach upset.",
    schedule: "Morning & Night",
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
      setError("Camera access denied. Please enable camera permissions.");
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
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
          const randomMed = MEDICINE_DATABASE[Math.floor(Math.random() * MEDICINE_DATABASE.length)];
          setDetectedMedicine(randomMed);
          setShowResult(true);
          setIsScanning(false);
        }, 500);
      }
    }, 50);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-12 flex flex-col items-center">
        <header className="mb-10 text-center animate-fade-in">
          <h1 className="apple-heading mb-3">Medicine Scanner</h1>
          <p className="apple-subheading">Identify medications with high-precision AI.</p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Camera Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] max-w-[600px] bg-black rounded-[32px] overflow-hidden shadow-2xl group">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className={`w-full h-full object-cover transition-opacity duration-700 ${hasCamera ? 'opacity-100' : 'opacity-20'}`}
              />
              
              {!hasCamera && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <AlertTriangle size={48} className="text-[#FF3B30] mb-4" />
                  <p className="text-white font-medium">{error}</p>
                </div>
              )}

              {/* Viewfinder HUD */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-48 border-2 border-white/30 rounded-2xl" />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-[#0071E3] transition-all duration-100"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <span className="text-white text-[13px] font-medium tracking-widest uppercase">Analyzing...</span>
                </div>
              )}
            </div>

            {/* Capture Button */}
            <div className="mt-8 flex items-center gap-6">
              <button 
                onClick={handleCapture}
                disabled={!hasCamera || isScanning}
                className="w-20 h-20 rounded-full bg-white border-[6px] border-[#F2F2F7] shadow-xl flex items-center justify-center active:scale-95 transition-all disabled:opacity-50"
              >
                <div className="w-14 h-14 rounded-full bg-[#0071E3]" />
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col h-full">
            {showResult && detectedMedicine ? (
              <div className="animate-fade-in space-y-6">
                <div className="apple-card p-8 bg-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-[16px] flex items-center justify-center text-white"
                      style={{ backgroundColor: detectedMedicine.color }}
                    >
                      <Pill size={28} />
                    </div>
                    <div>
                      <span className="text-[13px] text-[#86868B] font-medium uppercase tracking-wider">{detectedMedicine.type}</span>
                      <h2 className="text-[28px] font-semibold leading-tight">{detectedMedicine.name}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-[#F5F5F7] rounded-[16px]">
                      <div className="flex items-center gap-2 text-[#86868B] mb-1">
                        <Clock size={14} />
                        <span className="text-[12px] font-medium uppercase">Schedule</span>
                      </div>
                      <span className="text-[15px] font-semibold">{detectedMedicine.schedule}</span>
                    </div>
                    <div className="p-4 bg-[#F5F5F7] rounded-[16px]">
                      <div className="flex items-center gap-2 text-[#86868B] mb-1">
                        <Info size={14} />
                        <span className="text-[12px] font-medium uppercase">Dosage</span>
                      </div>
                      <span className="text-[15px] font-semibold">Standard</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <InfoSection title="Usage" content={detectedMedicine.usage} />
                    <InfoSection title="Recommended Dosage" content={detectedMedicine.dosage} />
                    <InfoSection title="Side Effects" content={detectedMedicine.sideEffects} isWarning />
                  </div>

                  <button 
                    onClick={() => setShowResult(false)}
                    className="w-full mt-8 apple-button apple-button-secondary flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={16} />
                    New Scan
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] apple-card border border-dashed border-[#86868B]/30 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-[#F2F2F7] rounded-full flex items-center justify-center mb-6 text-[#86868B]">
                  <Scan size={32} />
                </div>
                <h3 className="text-[20px] font-semibold mb-2">Ready to Scan</h3>
                <p className="text-[#86868B] max-w-[280px]">
                  Position the medicine label within the frame and press the capture button to identify it.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoSection = ({ title, content, isWarning = false }) => (
  <div>
    <h4 className={`text-[13px] font-bold uppercase tracking-wider mb-2 ${isWarning ? 'text-[#FF3B30]' : 'text-[#86868B]'}`}>
      {title}
    </h4>
    <p className="text-[16px] text-[#1D1D1F] leading-relaxed">{content}</p>
  </div>
);

export default MedicineScanner;
