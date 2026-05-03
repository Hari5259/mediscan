import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  MessageCircle, 
  Camera, 
  FileText, 
  AlertCircle, 
  ChevronRight, 
  Search,
  Stethoscope,
  Pill,
  Microscope,
  Zap,
  Star,
  Users,
  Scale,
  UtensilsCrossed,
  Bell,
  Video
} from 'lucide-react';
import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Activity, path: '/symptom-checker' },
    { id: 'chatbot', label: 'Health AI', icon: MessageCircle, path: '/chatbot' },
    { id: 'medicine-scanner', label: 'Medicine Scan', icon: Camera, path: '/medicine-scanner' },
    { id: 'bmi-calculator', label: 'BMI Index', icon: Scale, path: '/bmi-calculator' },
    { id: 'health-reports', icon: FileText, label: 'Health Report', path: '/health-reports' },
    { id: 'food-tracker', icon: UtensilsCrossed, label: 'Food Tracker', path: '/food-tracker' },
    { id: 'medicine-reminder', icon: Bell, label: 'Reminders', path: '/medicine-reminder' },
    { id: 'doctors', icon: Users, label: 'Find Doctors', path: '/doctors' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency', path: '/emergency' },
    { id: 'webinars', icon: Video, label: 'Live Sessions', path: '/webinars' },
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
              <label className="radio-item">
                <input type="radio" name="checkType" defaultChecked />
                <span>General Checkup</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="checkType" />
                <span>Specialized Consultation</span>
              </label>
              <label className="radio-item">
                <input type="radio" name="checkType" />
                <span>Emergency Review</span>
              </label>
            </div>
            <p className="text-[14px] font-bold text-gray-500">Fast & Accurate Health Diagnostics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-gray-200 rounded-[12px] overflow-hidden">
            <div className="section-card border-r rounded-none">
              <span className="section-label">Your Current Location</span>
              <span className="section-value">Bengaluru</span>
              <span className="section-sub">KA, India - Reliable Connectivity</span>
            </div>
            <div className="section-card border-r rounded-none">
              <span className="section-label">Health Priority</span>
              <span className="section-value">Urgent</span>
              <span className="section-sub">Analyze symptoms immediately</span>
            </div>
            <div className="section-card border-r rounded-none">
              <span className="section-label">Last Sync Date</span>
              <span className="section-value">01 May'26</span>
              <span className="section-sub">Friday - 12:30 PM</span>
            </div>
            <div className="section-card rounded-none">
              <span className="section-label">Connected Device</span>
              <span className="section-value">MediScan Pro</span>
              <span className="section-sub">Optical Core v4.2 Active</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <span className="text-[14px] font-bold text-gray-500 uppercase flex items-center pt-2">Special Filters:</span>
            <button className="px-5 py-2 border border-gray-200 rounded-[6px] text-[13px] font-bold hover:bg-blue-50 transition-colors">AI Diagnostics</button>
            <button className="px-5 py-2 border border-gray-200 rounded-[6px] text-[13px] font-bold hover:bg-blue-50 transition-colors">Tele-Consult</button>
            <button className="px-5 py-2 border border-gray-200 rounded-[6px] text-[13px] font-bold hover:bg-blue-50 transition-colors">Digital Pharmacy</button>
            <button className="px-5 py-2 border border-gray-200 rounded-[6px] text-[13px] font-bold hover:bg-blue-50 transition-colors">Health Wallet</button>
          </div>

          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2">
            <button 
              onClick={() => navigate('/symptom-checker')}
              className="btn-search"
            >
              RUN DIAGNOSTICS
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
              <FileText size={32} />
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
