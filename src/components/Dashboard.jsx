import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  MessageCircle, 
  Camera, 
  FileText,
  ClipboardList, 
  AlertCircle, 
  ChevronRight, 
  Search,
  Stethoscope,
  Pill,
  Microscope,
  Zap,
  Users,
  Scale,
  UtensilsCrossed,
  Bell,
  Video,
  Download,
  Watch,
  RefreshCw,
  User
} from 'lucide-react';
import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [checkType, setCheckType] = useState('General Checkup');
  const [isScanning, setIsScanning] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'bmi-calculator', label: 'BMI Index', icon: Scale, path: '/bmi-calculator' },
    { id: 'health-reports', icon: ClipboardList, label: 'Health Report', path: '/health-reports' },
    { id: 'food-tracker', icon: UtensilsCrossed, label: 'Food Tracker', path: '/food-tracker' },
    { id: 'medicine-reminder', icon: Bell, label: 'Reminders', path: '/medicine-reminder' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
  ];

  return (
    <div className="bg-immersive pb-24">
      <Navbar />
      
      <main className="floating-container animate-slide-up">
        {/* Module Selection Tabs */}
        <div className="module-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); navigate(tab.path); }}
              className={`module-tab-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Main Floating Card */}
        <div className="main-floating-card p-12 mt-4">
          <div className="flex items-center justify-between mb-8">
            <div className="radio-group">
              <label className="radio-item group">
                <input 
                  type="radio" 
                  name="checkType" 
                  checked={checkType === 'General Checkup'}
                  onChange={() => setCheckType('General Checkup')}
                />
                <Stethoscope size={18} className={`transition-colors ${checkType === 'General Checkup' ? 'text-[#008cff]' : 'text-gray-400 group-hover:text-[#008cff]/70'}`} />
                <span className={`transition-colors ${checkType === 'General Checkup' ? 'text-[#008cff]' : 'group-hover:text-[#008cff]/70'}`}>General Checkup</span>
              </label>
              <label className="radio-item group">
                <input 
                  type="radio" 
                  name="checkType" 
                  checked={checkType === 'Specialized Consultation'}
                  onChange={() => setCheckType('Specialized Consultation')}
                />
                <Microscope size={18} className={`transition-colors ${checkType === 'Specialized Consultation' ? 'text-[#008cff]' : 'text-gray-400 group-hover:text-[#008cff]/70'}`} />
                <span className={`transition-colors ${checkType === 'Specialized Consultation' ? 'text-[#008cff]' : 'group-hover:text-[#008cff]/70'}`}>Specialized Consultation</span>
              </label>
              <label className="radio-item group">
                <input 
                  type="radio" 
                  name="checkType" 
                  checked={checkType === 'Emergency Review'}
                  onChange={() => setCheckType('Emergency Review')}
                />
                <AlertCircle size={18} className={`transition-colors ${checkType === 'Emergency Review' ? 'text-[#008cff]' : 'text-gray-400 group-hover:text-[#008cff]/70'}`} />
                <span className={`transition-colors ${checkType === 'Emergency Review' ? 'text-[#008cff]' : 'group-hover:text-[#008cff]/70'}`}>Emergency Review</span>
              </label>
            </div>
            <p className="text-[14px] font-bold text-gray-500">Fast & Accurate Health Diagnostics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-gray-200 rounded-[12px] overflow-hidden">
            <div className="section-card border-r rounded-none">
              <span className="section-label">Identity Core</span>
              <span className="section-value text-[24px]">John Doe</span>
              <span className="section-sub font-bold text-green-600">Verified Citizen Node</span>
            </div>
            <div className="section-card border-r rounded-none">
              <span className="section-label">ABHA Address</span>
              <span className="section-value text-[24px]">john.doe@abdm</span>
              <span className="section-sub font-bold">National Health ID Active</span>
            </div>
            <div className="section-card border-r rounded-none">
              <span className="section-label">Government ID (Aadhaar)</span>
              <span className="section-value text-[24px]">•••• 4567</span>
              <span className="section-sub font-bold text-blue-600">Biometrics Synced</span>
            </div>
            <div className="section-card rounded-none">
              <span className="section-label">Biological Profile</span>
              <span className="section-value text-[24px]">O+ (Pos)</span>
              <span className="section-sub font-bold">Universal Donor</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 relative z-10 pb-6">
            <span className="text-[14px] font-bold text-gray-500 uppercase flex items-center pt-2">Command Actions:</span>
            
            <button 
              onClick={() => {
                setIsSyncing(true);
                setTimeout(() => setIsSyncing(false), 2000);
              }}
              className={`px-5 py-2 border rounded-[6px] text-[13px] font-bold transition-all flex items-center gap-2 ${
                isSyncing ? 'border-[#008cff] bg-blue-50 text-[#008cff]' : 'border-gray-200 hover:bg-blue-50 hover:text-[#008cff] hover:border-[#008cff]'
              }`}
            >
              <Watch size={14} className={isSyncing ? 'animate-pulse' : ''} /> 
              {isSyncing ? 'Syncing...' : 'Sync Wearables'}
            </button>
            
            <button 
              onClick={() => {
                setIsExporting(true);
                setTimeout(() => setIsExporting(false), 1500);
              }}
              className={`px-5 py-2 border rounded-[6px] text-[13px] font-bold transition-all flex items-center gap-2 ${
                isExporting ? 'border-[#008cff] bg-blue-50 text-[#008cff]' : 'border-gray-200 hover:bg-blue-50 hover:text-[#008cff] hover:border-[#008cff]'
              }`}
            >
              <Download size={14} className={isExporting ? 'animate-bounce' : ''} /> 
              {isExporting ? 'Exporting...' : 'Export Core Data'}
            </button>

            <button 
              onClick={() => navigate('/health-reports')}
              className="px-5 py-2 border border-gray-200 rounded-[6px] text-[13px] font-bold hover:bg-blue-50 hover:text-[#008cff] hover:border-[#008cff] transition-all flex items-center gap-2"
            >
              <User size={14} /> Update Profile
            </button>

            <button 
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => setIsRefreshing(false), 1000);
              }}
              className={`px-5 py-2 border rounded-[6px] text-[13px] font-bold transition-all flex items-center gap-2 ${
                isRefreshing ? 'border-[#008cff] bg-blue-50 text-[#008cff]' : 'border-gray-200 hover:bg-blue-50 hover:text-[#008cff] hover:border-[#008cff]'
              }`}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> 
              {isRefreshing ? 'Refreshing...' : 'Refresh Network'}
            </button>
          </div>

          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2">
            <button 
              disabled={isScanning}
              onClick={() => {
                setIsScanning(true);
                setTimeout(() => {
                  navigate('/symptom-checker', { state: { checkType } });
                }, 1500);
              }}
              className="btn-search flex items-center justify-center gap-3 min-w-[320px]"
            >
              {isScanning ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>INITIALIZING SCAN...</span>
                </>
              ) : (
                <>
                  <Activity size={24} />
                  <span>RUN DIAGNOSTICS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => navigate('/medicine-scanner')}
            className="bg-white/95 backdrop-blur px-8 py-6 rounded-[12px] shadow-xl border border-white/20 flex items-center gap-6 group hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Zap size={32} />
            </div>
            <div>
              <h4 className="text-[18px] font-extrabold mb-1">Instant Scan</h4>
              <p className="text-[13px] text-gray-500 font-medium">Get medicine details in 2 seconds.</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/bmi-calculator')}
            className="bg-white/95 backdrop-blur px-8 py-6 rounded-[12px] shadow-xl border border-white/20 flex items-center gap-6 group hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
              <Scale size={32} />
            </div>
            <div>
              <h4 className="text-[18px] font-extrabold mb-1">Metabolic Index</h4>
              <p className="text-[13px] text-gray-500 font-medium">Calculate your BMI and health score.</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/health-reports')}
            className="bg-white/95 backdrop-blur px-8 py-6 rounded-[12px] shadow-xl border border-white/20 flex items-center gap-6 group hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <ClipboardList size={32} />
            </div>
            <div>
              <h4 className="text-[18px] font-extrabold mb-1">Digital Vault</h4>
              <p className="text-[13px] text-gray-500 font-medium">All your reports in one secure place.</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/food-tracker')}
            className="bg-white/95 backdrop-blur px-8 py-6 rounded-[12px] shadow-xl border border-white/20 flex items-center gap-6 group hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <UtensilsCrossed size={32} />
            </div>
            <div>
              <h4 className="text-[18px] font-extrabold mb-1">Food Tracker</h4>
              <p className="text-[13px] text-gray-500 font-medium">Log meals & track your nutrition.</p>
            </div>
          </div>
          <div
            onClick={() => navigate('/medicine-reminder')}
            className="bg-white/95 backdrop-blur px-8 py-6 rounded-[12px] shadow-xl border border-white/20 flex items-center gap-6 group hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Bell size={32} />
            </div>
            <div>
              <h4 className="text-[18px] font-extrabold mb-1">Med Reminders</h4>
              <p className="text-[13px] text-gray-500 font-medium">Never miss a dose again.</p>
            </div>
          </div>
          <div
            onClick={() => navigate('/webinars')}
            className="bg-white/95 backdrop-blur px-8 py-6 rounded-[12px] shadow-xl border border-white/20 flex items-center gap-6 group hover:bg-white transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
              <Video size={32} />
            </div>
            <div>
              <h4 className="text-[18px] font-extrabold mb-1">Live Sessions</h4>
              <p className="text-[13px] text-gray-500 font-medium">Join free webinars by top doctors.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
