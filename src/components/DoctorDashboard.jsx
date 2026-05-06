import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Bell, 
  Settings, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity,
  Stethoscope, 
  Clock, 
  ShieldCheck,
  ChevronLeft,
  Briefcase,
  Heart,
  Plane,
  User,
  Zap,
  Star,
  Cpu,
  AlertCircle,
  Globe,
  ArrowRight,
  Pill,
  RefreshCw
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [viewType, setViewType] = useState('Critical Operations');
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const doctorData = sessionStorage.getItem('doctorLogged');
    if (!doctorData) {
      navigate('/doctor-login');
      return;
    }
    setDoctorInfo(JSON.parse(doctorData));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('doctorLogged');
    navigate('/doctor-login');
  };

  const tabs = [
    { id: 'diagnosis', label: 'AI SUPPORT', icon: Cpu, path: '#' },
    { id: 'dossiers', label: 'HEALTH DOSSIERS', icon: ShieldCheck, path: '#' },
    { id: 'pharma', label: 'E-PHARMA', icon: Pill, path: '#' },
    { id: 'analytics', label: 'ANALYTICS', icon: TrendingUp, path: '#' },
    { id: 'patients', label: 'PATIENT LIST', icon: Users, path: '#' },
    { id: 'schedule', label: 'SCHEDULE', icon: Calendar, path: '#' },
    { id: 'reports', label: 'CLINICAL REPORTS', icon: FileText, path: '#' },
    { id: 'emergency', label: 'EMERGENCY', icon: AlertCircle, path: '#' },
  ];

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-24">
      {/* Top Professional Nav */}
      <nav className="bg-slate-900 px-12 py-3 flex justify-between items-center text-white">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Stethoscope size={24} className="text-[#1e40af]" />
            </div>
            <span className="font-black text-2xl italic tracking-tighter uppercase">Clinical<span className="text-blue-400">Core</span></span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer">
              <Briefcase size={16} className="text-orange-500" />
              <span>Institutional Access</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer">
              <FileText size={16} className="text-rose-500" />
              <span>Clinical Archives</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
              <Activity size={16} />
              <span>System</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
              <ShieldCheck size={16} />
              <span>Verified</span>
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-[12px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20">
            <User size={18} />
            <span>{doctorInfo.doctorId}</span>
          </button>
          
          <button onClick={handleLogout} className="text-white/40 hover:text-rose-500 transition-colors">
            <LogOut size={22} />
          </button>
        </div>
      </nav>
      
      <main className="max-w-[1400px] mx-auto pt-8 px-6 animate-slide-up">
        {/* Module Selection Tabs - Similar to Patient View */}
        <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 flex items-center justify-between px-2 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col items-center justify-center min-w-[120px] py-6 px-4 cursor-pointer group hover:bg-slate-50 transition-all border-b-4 border-transparent hover:border-blue-500"
            >
              <tab.icon size={24} className="text-slate-400 group-hover:text-blue-500 transition-colors mb-2" />
              <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-widest text-center">{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Main Floating Card - White Style from Image */}
        <div className="bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-12 relative mb-20 transition-all">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="viewType" 
                  checked={viewType === 'Critical Operations'}
                  onChange={() => setViewType('Critical Operations')}
                  className="w-5 h-5 border-2 border-slate-200 text-blue-600 focus:ring-blue-500"
                />
                <Activity size={18} className={viewType === 'Critical Operations' ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'} />
                <span className={`text-[14px] font-bold ${viewType === 'Critical Operations' ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`}>Critical Operations</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="viewType" 
                  checked={viewType === 'Routine Consults'}
                  onChange={() => setViewType('Routine Consults')}
                  className="w-5 h-5 border-2 border-slate-200 text-blue-600 focus:ring-blue-500"
                />
                <Users size={18} className={viewType === 'Routine Consults' ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'} />
                <span className={`text-[14px] font-bold ${viewType === 'Routine Consults' ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`}>Routine Consults</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="viewType" 
                  checked={viewType === 'Emergency Sync'}
                  onChange={() => setViewType('Emergency Sync')}
                  className="w-5 h-5 border-2 border-slate-200 text-blue-600 focus:ring-blue-500"
                />
                <AlertCircle size={18} className={viewType === 'Emergency Sync' ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'} />
                <span className={`text-[14px] font-bold ${viewType === 'Emergency Sync' ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`}>Emergency Sync</span>
              </label>
            </div>
            <p className="text-[14px] font-bold text-slate-400 italic">Chief Clinical Node • Operations Active</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-slate-100 rounded-[12px] overflow-hidden bg-slate-50/30">
            <div className="p-8 border-r border-slate-100 bg-white group hover:bg-slate-50 transition-colors">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Patient Nodes</span>
              <span className="text-[28px] font-black text-slate-900 block mb-1">24 Active</span>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-tighter">Verified Clinical Registry</span>
            </div>
            <div className="p-8 border-r border-slate-100 bg-white group hover:bg-slate-50 transition-colors">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Critical Alerts</span>
              <span className="text-[28px] font-black text-slate-900 block mb-1">08 Urgent</span>
              <span className="text-[11px] font-bold text-rose-500 uppercase tracking-tighter">Response Required</span>
            </div>
            <div className="p-8 border-r border-slate-100 bg-white group hover:bg-slate-50 transition-colors">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Registry Status</span>
              <span className="text-[28px] font-black text-slate-900 block mb-1">Alpha Node</span>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-tighter">Global Rank Top 1%</span>
            </div>
            <div className="p-8 bg-white group hover:bg-slate-50 transition-colors">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Clinical Reports</span>
              <span className="text-[28px] font-black text-slate-900 block mb-1">1,240 Syncs</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">End-to-End Encrypted</span>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <span className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Command Actions:</span>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-[12px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <Zap size={16} /> Sync Wearables
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-[12px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <FileText size={16} /> Export Dossiers
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-[12px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <User size={16} /> Specialist Profile
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-[12px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <RefreshCw size={16} /> Refresh Core
              </button>
            </div>
          </div>

          {/* Overlapping Action Button */}
          <div className="absolute left-1/2 -bottom-8 -translate-x-1/2">
            <button 
              disabled={isInitializing}
              onClick={() => {
                setIsInitializing(true);
                setTimeout(() => setIsInitializing(false), 2000);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[380px] py-5 rounded-full shadow-[0_20px_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-4 transition-all hover:-translate-y-1 active:scale-95 group"
            >
              {isInitializing ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span className="text-[18px] font-black uppercase tracking-widest">Synchronizing...</span>
                </>
              ) : (
                <>
                  <Zap size={24} className="group-hover:animate-pulse" />
                  <span className="text-[18px] font-black uppercase tracking-widest">Initialize Operations</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Premium Module Banner Style */}
        <div 
          className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 rounded-[32px] overflow-hidden relative cursor-pointer group shadow-2xl border border-white/5"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 group-hover:bg-blue-500/20 transition-all duration-700"></div>
          
          <div className="relative p-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-10 z-10 flex-col md:flex-row text-center md:text-left">
              <div className="relative shrink-0">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-2xl shadow-blue-500/40">
                  <Cpu size={56} className="text-white transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-slate-900">
                  <Activity size={22} className="text-blue-600" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-4 mb-3 justify-center md:justify-start">
                  <span className="px-4 py-1 bg-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-widest rounded-full border border-blue-500/30">
                    Advanced Clinical Module
                  </span>
                </div>
                <h3 className="text-white text-[36px] font-black tracking-tighter leading-none mb-4 italic">
                  Tele-Diagnostics Hub
                </h3>
                <p className="text-slate-400 text-[16px] font-medium max-w-lg leading-relaxed">
                  Real-time neural synchronization with patient nodes for high-precision virtual diagnostics and intervention.
                </p>
              </div>
            </div>
            
            <div className="z-10 shrink-0">
              <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-[16px] flex items-center gap-4 hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
                Access Vault <ChevronRight size={22} className="text-blue-600 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Actions Section - Similar to Feature Highlights */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Neural Support', desc: 'AI-assisted clinical decision making.', icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: 'Dossier Vault', desc: 'Secure medical history archives.', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { title: 'Pharma Sync', desc: 'Digital prescription network.', icon: Pill, color: 'text-purple-600', bg: 'bg-purple-100' },
            { title: 'Population Health', desc: 'Analytics and demographic metrics.', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
            { title: 'Doctor Network', desc: 'Global specialist collaboration.', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
            { title: 'Emergency Core', desc: 'Immediate incident response.', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-100' },
          ].map((item, i) => (
            <div 
              key={i}
              className="bg-white px-8 py-8 rounded-[20px] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
            >
              <div className={`w-20 h-20 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                <item.icon size={36} />
              </div>
              <div>
                <h4 className="text-[20px] font-black text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[14px] text-slate-400 font-medium leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-24 px-12 py-10 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="flex gap-12 z-10">
          <div className="flex items-center gap-3 text-white/40 text-[11px] font-black uppercase tracking-widest hover:text-white/80 transition-colors cursor-default">
            <ShieldCheck size={18} className="text-blue-500" />
            <span>Secure Node</span>
          </div>
          <div className="flex items-center gap-3 text-white/40 text-[11px] font-black uppercase tracking-widest hover:text-white/80 transition-colors cursor-default">
            <Activity size={18} className="text-emerald-500" />
            <span>Clinical Integrity</span>
          </div>
        </div>
        <div className="text-right z-10">
          <p className="text-white/20 text-[11px] font-black tracking-[0.2em] mb-1 italic">© 2026 MEDISCAN CLINICAL CORE</p>
          <p className="text-white/10 text-[9px] font-bold uppercase tracking-widest">Authorized Personnel Access Only</p>
        </div>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
