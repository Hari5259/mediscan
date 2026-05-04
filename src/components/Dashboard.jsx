import React, { useState, useEffect } from 'react';
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
  User,
  Dumbbell,
  Wind,
  Heart
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
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@abdm'
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

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
              <span className="section-value text-[24px] truncate" title={`${userProfile.firstName} ${userProfile.lastName}`}>
                {userProfile.firstName} {userProfile.lastName}
              </span>
              <span className="section-sub font-bold text-green-600">Verified Citizen Node</span>
            </div>
            <div className="section-card border-r rounded-none">
              <span className="section-label">Primary Email</span>
              <span className="section-value text-[24px] truncate" title={userProfile.email}>
                {userProfile.email}
              </span>
              <span className="section-sub font-bold">Communication Link Active</span>
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
              onClick={() => navigate('/profile')}
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

        {/* Unique Exercise Module Banner */}
        <div 
          onClick={() => navigate('/exercise')}
          className="mt-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-[24px] overflow-hidden relative cursor-pointer group shadow-2xl border border-gray-800"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-green-500/20 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 group-hover:bg-blue-500/20 transition-all duration-500"></div>
          
          <div className="relative p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8 z-10 flex-col md:flex-row text-center md:text-left">
              {/* Great Unique Logo */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-green-500/30">
                  <Dumbbell size={48} className="text-white transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Wind size={20} className="text-cyan-500" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Heart size={16} className="text-rose-500" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-sm border border-white/20">
                    Premium Module
                  </span>
                </div>
                <h3 className="text-white text-[32px] font-black tracking-tight leading-none mb-3">
                  Wellness & Activity Hub
                </h3>
                <p className="text-gray-400 text-[15px] font-medium max-w-md">
                  Elevate your physical and mental health with guided breathing, structured workouts, and mindfulness yoga.
                </p>
              </div>
            </div>
            
            <div className="z-10 shrink-0">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-[15px] flex items-center gap-3 group-hover:bg-green-50 transition-colors">
                Enter Hub <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
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
