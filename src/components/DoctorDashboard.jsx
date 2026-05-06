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
  const [activeTab, setActiveTab] = useState('patients');
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
    { id: 'diagnosis', label: 'AI SUPPORT', icon: Cpu },
    { id: 'dossiers', label: 'HEALTH DOSSIERS', icon: ShieldCheck },
    { id: 'pharma', label: 'E-PHARMA', icon: Pill },
    { id: 'analytics', label: 'ANALYTICS', icon: TrendingUp },
    { id: 'patients', label: 'PATIENT LIST', icon: Users },
    { id: 'schedule', label: 'SCHEDULE', icon: Calendar },
    { id: 'reports', label: 'CLINICAL REPORTS', icon: FileText },
    { id: 'emergency', label: 'EMERGENCY', icon: AlertCircle },
  ];

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderEmergencyModule = () => (
    <div className="animate-slide-up space-y-10">
      <div className="bg-rose-50 border border-rose-100 rounded-[32px] p-10 flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-20 h-20 bg-rose-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-rose-600/40 animate-pulse">
            <AlertCircle size={40} />
          </div>
          <div>
            <h2 className="text-[32px] font-black text-rose-900 uppercase italic tracking-tighter leading-none mb-2">Critical Response Core</h2>
            <p className="text-rose-600/70 font-bold uppercase tracking-widest text-[12px]">Network-wide Emergency Protocol Active • Level 4 Clearance</p>
          </div>
        </div>
        <button className="px-10 py-5 bg-rose-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3 active:scale-95">
          <Zap size={20} /> Broadcast SOS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[22px] font-black uppercase italic tracking-tighter text-slate-800 flex items-center gap-3">
              <Users size={24} className="text-rose-500" /> Urgent Specialist Contact
            </h3>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">12 Available Now</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Dr. Sarah Miller', role: 'Neurosurgeon', status: 'Online', id: 'NRO-772', color: 'bg-emerald-500' },
              { name: 'Dr. James Wilson', role: 'Cardiologist', status: 'In Surgery', id: 'CRD-102', color: 'bg-amber-500' },
              { name: 'Dr. Elena Rossi', role: 'Toxicologist', status: 'Online', id: 'TOX-994', color: 'bg-emerald-500' },
              { name: 'Dr. Marcus Thorne', role: 'Critical Care', status: 'Online', id: 'CRT-551', color: 'bg-emerald-500' },
            ].map((doc, idx) => (
              <div key={idx} className="p-6 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-rose-200 hover:bg-rose-50/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-rose-600 group-hover:text-white transition-all">
                    {doc.name.split(' ')[1].charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 leading-tight">{doc.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{doc.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${doc.color} rounded-full`}></div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">{doc.status}</span>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-rose-600 hover:underline">Contact Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl"></div>
          <h3 className="text-[20px] font-black uppercase italic tracking-tighter mb-10 flex items-center gap-3">
            <Activity size={22} className="text-rose-500" /> Active Incidents
          </h3>
          <div className="space-y-8">
            <div className="pb-8 border-b border-white/10 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-rose-500 text-[11px] font-black uppercase tracking-[0.2em]">High Alert</span>
                <span className="text-white/40 text-[10px] font-bold">2m ago</span>
              </div>
              <p className="text-[14px] font-bold leading-relaxed mb-3">Trauma Code in Sector 09-C. Neurosurgical consult required immediately.</p>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-white/5 rounded-md text-[9px] font-black uppercase tracking-widest border border-white/10">ID: TX-9921</span>
                <span className="px-3 py-1 bg-rose-500/20 text-rose-500 rounded-md text-[9px] font-black uppercase tracking-widest border border-rose-500/30">Action Needed</span>
              </div>
            </div>
            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-500 text-[11px] font-black uppercase tracking-[0.2em]">Monitoring</span>
                <span className="text-white/40 text-[10px] font-bold">15m ago</span>
              </div>
              <p className="text-[14px] font-bold leading-relaxed mb-3">Post-op stability check for NOD-442. Vitals normalizing.</p>
              <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Clear Notification</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAISupportModule = () => (
    <div className="animate-slide-up space-y-10">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-[32px] p-12 relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_50%)] animate-pulse"></div>
          <div className="grid grid-cols-10 gap-4 p-4">
            {Array(50).fill(0).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                <Cpu size={36} />
              </div>
              <div>
                <h2 className="text-[36px] font-black text-white uppercase italic tracking-tighter leading-none mb-1">Neural Diagnostic Engine</h2>
                <p className="text-blue-300 font-bold uppercase tracking-[0.2em] text-[12px]">Clinical Intelligence v9.4 • Sync Active</p>
              </div>
            </div>
            <p className="text-slate-300 text-[18px] font-medium leading-relaxed mb-8">
              Analyze complex patient data nodes using high-precision neural models for differential diagnosis and personalized treatment protocols.
            </p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter clinical query or patient ID for deep analysis..." 
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-8 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
              <button className="absolute right-3 top-3 bottom-3 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest text-[12px] transition-all flex items-center gap-2">
                Analyze <Zap size={16} />
              </button>
            </div>
          </div>
          <div className="w-full md:w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-8">
            <h4 className="text-white text-[12px] font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Engine Metrics</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-blue-300 mb-2 uppercase">
                  <span>Accuracy Confidence</span>
                  <span>99.8%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[99.8%] h-full bg-blue-500"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-bold text-indigo-300 mb-2 uppercase">
                  <span>Processing Latency</span>
                  <span>42ms</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
            <h3 className="text-[24px] font-black uppercase italic tracking-tighter text-slate-800 mb-10 flex items-center gap-3">
              <Star size={26} className="text-blue-600" /> AI-Generated Differential Diagnosis
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Pathological Anomaly Detected', confidence: '94%', details: 'Neural scan indicates atypical protein structures in Sector-7.', tag: 'Priority' },
                { title: 'Metabolic Trend Analysis', confidence: '82%', details: 'Projected glucose fluctuation suggests proactive insulin adjustment.', tag: 'Observation' },
                { title: 'Genetic Marker Screening', confidence: '76%', details: 'High correlation with hereditary cardiac risk profiles identified.', tag: 'Screening' },
              ].map((diag, i) => (
                <div key={i} className="p-8 border border-slate-50 bg-slate-50/50 rounded-[24px] group hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{diag.tag}</span>
                    <span className="text-blue-600 font-black text-[20px]">{diag.confidence}</span>
                  </div>
                  <h4 className="text-[20px] font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{diag.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{diag.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-10">
          <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
            <h3 className="text-[20px] font-black uppercase italic tracking-tighter mb-8 text-slate-800">Analytical Insights</h3>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h5 className="font-black text-slate-900 text-[15px] mb-1">Global Health Trends</h5>
                  <p className="text-[13px] text-slate-500 leading-tight">Spike in viral patterns detected across Sector 04-F.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h5 className="font-black text-slate-900 text-[15px] mb-1">Protocol Optimization</h5>
                  <p className="text-[13px] text-slate-500 leading-tight">New FDA-approved diagnostic sequence available for download.</p>
                </div>
              </div>
              <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[12px] hover:bg-blue-600 transition-all shadow-lg hover:-translate-y-1">
                Download Global Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEPharmaModule = () => (
    <div className="animate-slide-up space-y-10">
      <div className="bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-950 rounded-[32px] p-12 relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-purple-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-purple-600/40">
                <Pill size={40} />
              </div>
              <div>
                <h2 className="text-[36px] font-black text-white uppercase italic tracking-tighter leading-none mb-1">E-Pharma Network</h2>
                <p className="text-purple-300 font-bold uppercase tracking-[0.2em] text-[12px]">Digital Prescription Protocol • Global Node Sync</p>
              </div>
            </div>
            <p className="text-slate-300 text-[18px] font-medium leading-relaxed mb-10">
              Manage pharmaceutical authorizations and synchronize digital prescriptions with the global pharmacy network in real-time.
            </p>
            <div className="flex gap-4">
              <button className="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black uppercase tracking-widest text-[13px] transition-all flex items-center gap-3 shadow-xl hover:-translate-y-1">
                <FileText size={20} /> Issue Digital Script
              </button>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[13px] transition-all flex items-center gap-3">
                <Search size={20} /> Inventory Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 text-center">
              <span className="text-purple-400 font-black text-[28px] block">1,402</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Pharmacies</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 text-center">
              <span className="text-emerald-400 font-black text-[28px] block">99.9%</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Stock Uptime</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[24px] font-black uppercase italic tracking-tighter text-slate-800 flex items-center gap-3">
              <Globe size={26} className="text-purple-600" /> Global Medicine Registry
            </h3>
            <div className="flex gap-2">
              <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">Filter: Critical</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Amoxicillin Beta-Core', stock: 'High Stock', level: 92, id: 'PHR-992-A', color: 'text-emerald-500' },
              { name: 'Insulin Neural-Sync', stock: 'Low Stock', level: 14, id: 'PHR-102-I', color: 'text-rose-500' },
              { name: 'Atorvastatin Alpha', stock: 'Optimal', level: 76, id: 'PHR-551-S', color: 'text-blue-500' },
              { name: 'Metformin Global', stock: 'High Stock', level: 88, id: 'PHR-334-M', color: 'text-emerald-500' },
            ].map((med, i) => (
              <div key={i} className="p-6 border border-slate-50 bg-slate-50/50 rounded-2xl flex items-center justify-between group hover:bg-white hover:border-purple-200 hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <Pill size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-[18px] leading-tight">{med.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Registry ID: {med.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <span className={`text-[12px] font-black uppercase tracking-tighter ${med.color}`}>{med.stock}</span>
                    <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full ${med.level < 20 ? 'bg-rose-500' : 'bg-purple-600'}`} style={{ width: `${med.level}%` }}></div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm">
          <h3 className="text-[20px] font-black uppercase italic tracking-tighter mb-8 text-slate-800">Linked Pharmacy Nodes</h3>
          <div className="space-y-8">
            {[
              { name: 'Central Pharma 01', status: 'Online', distance: '0.4km' },
              { name: 'Nexus Medical Bay', status: 'Online', distance: '1.2km' },
              { name: 'Bio-Sync Dispensary', status: 'Offline', distance: '2.5km' },
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                  <div>
                    <h5 className="font-black text-slate-900 text-[14px]">{node.name}</h5>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{node.distance} • Sync Active</p>
                  </div>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-purple-600 hover:underline">Connect</button>
              </div>
            ))}
            <div className="pt-6 border-t border-slate-50 mt-6">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-purple-600 transition-all shadow-lg">
                View Global Network Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f1f5f9] min-h-screen flex overflow-hidden">
      {/* Premium Cyber-Sidebar */}
      <aside className="w-80 bg-slate-900 flex flex-col relative z-50 shadow-[10px_0_40px_rgba(0,0,0,0.2)]">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-16 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
              <Stethoscope size={32} className="text-blue-600" />
            </div>
            <div>
              <span className="font-black text-[24px] italic tracking-tighter uppercase text-white block leading-none">Clinical<span className="text-blue-400">Core</span></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/60">Node v9.2.4</span>
            </div>
          </div>

          <nav className="space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 block">Main Operational Hub</span>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-2xl cursor-pointer transition-all duration-300 group relative ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute left-0 w-1 h-8 bg-white rounded-full"></div>
                )}
                <tab.icon size={22} className={activeTab === tab.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-[13px] font-black uppercase tracking-widest">{tab.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-10 space-y-8">
          <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <User size={24} className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-black text-[14px] uppercase tracking-tighter">{doctorInfo.doctorId}</h4>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest italic">Authorized Access</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest border border-white/5 hover:border-rose-500/20"
            >
              <LogOut size={16} /> Logout Node
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative">
        <header className="sticky top-0 z-40 bg-[#f1f5f9]/80 backdrop-blur-xl px-12 py-6 flex justify-between items-center border-b border-slate-200">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">System Integrity: Verified</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300"></div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-slate-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Node Sync: 42ms Latency</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-600 shadow-sm">
              <Activity size={14} className="text-blue-500" />
              <span>Operational Phase: Active</span>
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-12">
          {activeTab === 'emergency' ? (
            renderEmergencyModule()
          ) : activeTab === 'diagnosis' ? (
            renderAISupportModule()
          ) : activeTab === 'pharma' ? (
            renderEPharmaModule()
          ) : (
            <div className="animate-slide-up">
              <div className="bg-white rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-slate-100 p-12 relative mb-20">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h1 className="text-[42px] font-black text-slate-900 tracking-tighter leading-none mb-3 uppercase italic">Clinical Command Hub</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[12px] flex items-center gap-2">
                      <ShieldCheck size={16} className="text-blue-500" /> Chief Clinical Node • Multi-Modal Operations Active
                    </p>
                  </div>
                  <div className="flex items-center gap-6 bg-slate-50 p-2 rounded-2xl">
                    {['Critical Operations', 'Routine Consults'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setViewType(type)}
                        className={`px-8 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${
                          viewType === type 
                            ? 'bg-white text-blue-600 shadow-lg' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                  {[
                    { label: 'Patient Nodes', value: '24 Active', sub: 'Verified Clinical Registry', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Critical Alerts', value: '08 Urgent', sub: 'Response Required', color: 'text-rose-500', bg: 'bg-rose-50' },
                    { label: 'Registry Status', value: 'Alpha Node', sub: 'Global Rank Top 1%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Clinical Reports', value: '1,240 Syncs', sub: 'End-to-End Encrypted', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  ].map((stat, i) => (
                    <div key={i} className="p-8 border border-slate-100 rounded-[24px] bg-white group hover:border-blue-200 hover:shadow-2xl transition-all cursor-pointer">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">{stat.label}</span>
                      <span className={`text-[32px] font-black text-slate-900 block mb-2`}>{stat.value}</span>
                      <span className={`text-[11px] font-bold ${stat.color} uppercase tracking-tighter`}>{stat.sub}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                  <div className="flex items-center gap-6">
                    <span className="text-[13px] font-black text-slate-900 uppercase tracking-widest italic">Command Tools:</span>
                    <div className="flex gap-4">
                      {[
                        { icon: Zap, label: 'Sync Wearables' },
                        { icon: FileText, label: 'Export Dossiers' },
                        { icon: RefreshCw, label: 'Refresh Core' }
                      ].map((btn, i) => (
                        <button key={i} className="flex items-center gap-3 px-6 py-3 border border-slate-200 rounded-xl text-[12px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all">
                          <btn.icon size={16} /> {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    disabled={isInitializing}
                    onClick={() => { setIsInitializing(true); setTimeout(() => setIsInitializing(false), 2000); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white min-w-[300px] py-5 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-4 transition-all hover:-translate-y-1 active:scale-95 group font-black uppercase tracking-widest text-[14px]"
                  >
                    {isInitializing ? (
                      <><div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div><span>Synchronizing...</span></>
                    ) : (
                      <><Zap size={24} className="group-hover:animate-pulse" /> Initialize Operations</>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-[40px] overflow-hidden relative cursor-pointer group shadow-2xl border border-white/5 p-16">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#3b82f61a_0%,transparent_70%)]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                  <div className="flex items-center gap-12">
                    <div className="relative">
                      <div className="w-32 h-32 bg-blue-600 rounded-[32px] flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform duration-700 shadow-2xl shadow-blue-500/40">
                        <Cpu size={64} className="text-white transform -rotate-6 group-hover:-rotate-12 transition-transform duration-700" />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border-8 border-slate-900">
                        <Activity size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-5 py-1.5 bg-blue-500/20 text-blue-400 text-[12px] font-black uppercase tracking-widest rounded-full border border-blue-500/30">Advanced Clinical Vault</span>
                      </div>
                      <h3 className="text-white text-[48px] font-black tracking-tighter leading-none mb-4 uppercase italic">Tele-Diagnostics Hub</h3>
                      <p className="text-slate-400 text-[18px] font-medium max-w-xl leading-relaxed">Secure neural synchronization for high-precision virtual diagnostics and intervention protocols.</p>
                    </div>
                  </div>
                  <button className="px-12 py-6 bg-white text-slate-900 rounded-2xl font-black text-[16px] flex items-center gap-4 hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-2 active:scale-95 uppercase tracking-widest shrink-0">
                    Access System <ChevronRight size={24} className="text-blue-600 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
