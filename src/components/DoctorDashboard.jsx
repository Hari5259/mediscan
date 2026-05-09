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
  Shield,
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
  RefreshCw,
  Lock,
  Database,
  FileSearch,
  Key,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  UserPlus,
  MoreVertical,
  Mail,
  Phone,
  Plus,
  MapPin,
  MessageSquare,
  Download,
  Share2,
  Check,
  LayoutDashboard
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewType, setViewType] = useState('All Nodes');
  const [dutyStatus, setDutyStatus] = useState('On Duty');

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
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
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

  const renderDossiersModule = () => (
    <div className="animate-slide-up space-y-10">
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 rounded-[40px] p-16 relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#10b9811a_0%,transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-8 mb-8">
              <div className="w-24 h-24 bg-emerald-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-emerald-600/40 transform rotate-3">
                <ShieldCheck size={48} />
              </div>
              <div>
                <h2 className="text-[42px] font-black text-white uppercase italic tracking-tighter leading-none mb-2">Secure Dossier Vault</h2>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-[11px] font-black uppercase tracking-widest rounded-full border border-emerald-500/30">AES-256 Quantum Encrypted</span>
                  <div className="flex items-center gap-2 text-white/40 text-[11px] font-black uppercase tracking-widest">
                    <Lock size={14} /> Level 5 Clearance
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-[20px] font-medium leading-relaxed mb-12 max-w-xl">
              Access the high-integrity clinical archives. Each dossier is a neural-synced medical history, verified through decentralized clinical consensus.
            </p>
            <div className="flex gap-6">
              <button className="px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 shadow-2xl hover:-translate-y-2 active:scale-95 group">
                <Database size={22} className="group-hover:animate-bounce" /> Access Archives
              </button>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Sync Patient Node ID..." 
                  className="bg-white/5 border border-white/10 rounded-[24px] py-6 px-10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-black uppercase tracking-widest text-[12px] w-80"
                />
                <FileSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 space-y-6">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8">
              <h4 className="text-white text-[13px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <RefreshCw size={16} className="text-emerald-500 animate-spin-slow" /> Recent Vault Syncs
              </h4>
              <div className="space-y-6">
                {[
                  { node: 'PAT-9921-X', time: '12s ago', action: 'Biometric Update' },
                  { node: 'PAT-1022-Y', time: '5m ago', action: 'Neural Scan Sync' },
                  { node: 'PAT-5531-Z', time: '22m ago', action: 'Archive Export' }
                ].map((sync, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div>
                      <span className="text-white font-black text-[13px] block">{sync.node}</span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{sync.action}</span>
                    </div>
                    <span className="text-white/20 text-[10px] font-bold italic">{sync.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[24px] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Key size={24} className="text-emerald-500" />
                <span className="text-white font-black uppercase tracking-widest text-[11px]">Integrity Audit: Passed</span>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[40px] border border-slate-100 p-12 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-[26px] font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-4">
              <Database size={32} className="text-emerald-600" /> Clinical Data Nodes
            </h3>
            <button className="text-[12px] font-black uppercase tracking-widest text-emerald-600 hover:underline">Batch Sync</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Total Dossiers', count: '12,402', growth: '+142', sub: 'Verified Archives' },
              { label: 'Active Syncs', count: '24 Nodes', growth: 'Live', sub: 'Biometric Stream' },
              { label: 'Data Integrity', count: '99.99%', growth: 'Max', sub: 'Blockchain Verified' },
              { label: 'Storage Load', count: '42.8 TB', growth: '34%', sub: 'Global Cluster 09' },
            ].map((node, i) => (
              <div key={i} className="p-8 border border-slate-50 bg-slate-50/50 rounded-[32px] group hover:bg-white hover:border-emerald-200 hover:shadow-2xl transition-all cursor-pointer text-center md:text-left">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">{node.label}</span>
                <div className="flex items-baseline justify-center md:justify-start gap-4 mb-2">
                  <span className="text-[36px] font-black text-slate-900 leading-none">{node.count}</span>
                  <span className="text-[12px] font-black text-emerald-500 uppercase tracking-tighter">{node.growth}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#10b9811a_0%,transparent_50%)]"></div>
          <h3 className="text-[24px] font-black uppercase italic tracking-tighter mb-10 flex items-center gap-4">
            <FileSearch size={28} className="text-emerald-500" /> Intelligence Feed
          </h3>
          <div className="space-y-8">
            {[
              { title: 'Node Consistency Audit', status: 'Completed', details: 'Sector 04-A data redundancy check finished without anomalies.', color: 'text-emerald-400' },
              { title: 'Archive Decentralization', status: 'In Progress', details: 'Syncing clinical dossiers with global node mesh 09.', color: 'text-blue-400' },
              { title: 'Unauthorized Sync Attempt', status: 'Blocked', details: 'IP-Node 192.x.x.x denied access to patient registry PAT-001.', color: 'text-rose-500' }
            ].map((feed, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[12px] font-black uppercase tracking-widest ${feed.color}`}>{feed.status}</span>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                </div>
                <h4 className="text-[18px] font-black uppercase tracking-tight mb-2">{feed.title}</h4>
                <p className="text-slate-400 text-[14px] font-medium leading-relaxed italic">{feed.details}</p>
              </div>
            ))}
            <div className="pt-8 mt-4 border-t border-white/5">
              <button className="w-full py-5 bg-white text-slate-900 rounded-[24px] font-black uppercase tracking-widest text-[12px] hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
                Generate Network Integrity Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsModule = () => (
    <div className="animate-slide-up space-y-12">
      {/* Analytics Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[48px] p-16 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-white/10">
        <div className="absolute top-0 right-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-8 mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[32px] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(59,130,246,0.5)] transform hover:rotate-6 transition-transform">
                <TrendingUp size={48} />
              </div>
              <div>
                <h2 className="text-[48px] font-black text-white uppercase italic tracking-tighter leading-none mb-2">Neural Analytics</h2>
                <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[12px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div> Global Clinical Intelligence • Node v4.0
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-[22px] font-medium leading-relaxed mb-12 italic max-w-2xl">
              Leveraging massive-scale biometric datasets to project health trajectories and preemptive clinical interventions across the regional mesh.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-12 py-6 bg-white text-slate-900 hover:bg-blue-500 hover:text-white rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 shadow-2xl hover:-translate-y-2 group">
                <Zap size={22} className="group-hover:fill-current" /> Run Deep-Scan
              </button>
              <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 backdrop-blur-xl">
                <PieChart size={22} /> Export Intelligence
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-white text-[14px] font-black uppercase tracking-widest italic">Core Engine Status</h4>
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
            </div>
            <div className="space-y-12">
              {[
                { label: 'Prediction Accuracy', value: '98.4%', color: 'from-blue-500 to-cyan-400' },
                { label: 'Risk Identification', value: '72%', color: 'from-emerald-500 to-teal-400' },
                { label: 'Computational Load', value: '14%', color: 'from-indigo-500 to-purple-400' }
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-black text-slate-400 mb-4 uppercase tracking-widest">
                    <span>{metric.label}</span>
                    <span className="text-white">{metric.value}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full bg-gradient-to-r ${metric.color} shadow-[0_0_15px_rgba(59,130,246,0.3)]`} style={{ width: metric.value }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center italic">Encryption Protocol: AES-512-V2</p>
          </div>
        </div>
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-50/50 backdrop-blur-xl rounded-[48px] border border-slate-100 p-12 relative group">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-[32px] font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-4">
                <LineChart size={36} className="text-blue-600" /> Biometric Variance Matrix
              </h3>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-2">Historical Cluster Analysis • Yearly Cycle</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-blue-500 transition-all shadow-sm">Monthly View</button>
            </div>
          </div>
          
          <div className="h-80 flex items-end gap-6 px-6 mb-16 relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none px-6 pb-20">
              {[1,2,3,4,5].map(i => <div key={i} className="w-full h-[1px] bg-slate-900"></div>)}
            </div>

            {[45, 78, 52, 91, 63, 85, 94, 67, 88, 72, 95, 82].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-6 group/bar relative z-10">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-2xl transition-all duration-700 relative shadow-xl transform group-hover/bar:scale-x-110 group-hover/bar:-translate-y-2 group-hover/bar:brightness-110" 
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[12px] px-3 py-1.5 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all font-black shadow-2xl border border-white/10 scale-75 group-hover/bar:scale-100">
                    {height}%
                  </div>
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Clinical Volatility', value: 'Low Node', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Resource Congestion', value: 'Critical', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
              { label: 'Neural Resolution', value: '94.2%', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-50' }
            ].map((kpi, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-2xl transition-all cursor-default group">
                <div className={`w-14 h-14 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <kpi.icon size={28} />
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">{kpi.label}</span>
                <span className={`text-[28px] font-black uppercase tracking-tighter ${kpi.color}`}>{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
            <h3 className="text-[24px] font-black uppercase italic tracking-tighter mb-12 flex items-center gap-4">
              <Target size={28} className="text-blue-400" /> Intelligence Targets
            </h3>
            <div className="space-y-12">
              {[
                { label: 'Clinical Latency', current: 42, target: 50, unit: 'ms', color: 'bg-blue-500' },
                { label: 'Diagnostic Speed', current: 880, target: 1000, unit: 'p/h', color: 'bg-indigo-500' },
                { label: 'Neural Drift', current: 0.2, target: 0.5, unit: '%', color: 'bg-emerald-500' }
              ].map((kpi, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h5 className="font-black text-white text-[15px] uppercase tracking-tight">{kpi.label}</h5>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest italic mt-1">Goal: {kpi.target}{kpi.unit}</p>
                    </div>
                    <span className="text-[24px] font-black text-blue-400 leading-none">{kpi.current}<span className="text-[14px] ml-1 opacity-60">{kpi.unit}</span></span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full ${kpi.color} shadow-[0_0_15px_rgba(59,130,246,0.3)]`} style={{ width: `${(kpi.current / kpi.target) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-6 bg-white text-slate-900 hover:bg-blue-500 hover:text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-[13px] mt-16 transition-all shadow-2xl transform active:scale-95">
              Sync Intelligence Node
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <h4 className="text-[22px] font-black uppercase italic tracking-tighter mb-4 relative z-10">Export Dataset</h4>
            <p className="text-white/70 text-[14px] font-medium leading-relaxed mb-10 italic relative z-10">Generate encrypted multi-modal dataset for external neural training nodes.</p>
            <button className="px-8 py-4 bg-black/20 hover:bg-black/40 rounded-2xl font-black uppercase tracking-widest text-[12px] transition-all border border-white/20 relative z-10">
              Generate Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientListModule = () => (
    <div className="animate-slide-up space-y-10">
      <div className="border border-slate-100 p-10 rounded-[32px] relative bg-slate-50/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-[36px] font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">Patient Node Registry</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[12px] flex items-center gap-2">
              <Globe size={16} className="text-blue-500" /> Authorized Clinical Database • Sector 09-Alpha
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[12px] transition-all flex items-center gap-3 shadow-xl hover:-translate-y-1">
              <UserPlus size={18} /> Register New Node
            </button>
            <button className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
              <Filter size={24} />
            </button>
          </div>
        </div>

        <div className="relative mb-10">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
          <input 
            type="text" 
            placeholder="Search patient name, biometric ID, or clinical node..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-6 px-16 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
          {['All Nodes', 'Critical', 'Stable', 'In-Process', 'Archived'].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                viewType === type 
                  ? 'bg-slate-900 text-white shadow-xl' 
                  : 'bg-white border border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-50 text-left">
                <th className="pb-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Patient Node</th>
                <th className="pb-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="pb-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Last Sync</th>
                <th className="pb-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Biometric Flow</th>
                <th className="pb-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Alex Rivera', id: 'PAT-9921-X', status: 'Stable', sync: '2m ago', flow: 94, type: 'stable' },
                { name: 'Sarah Johnson', id: 'PAT-1022-Y', status: 'Critical', sync: 'Live', flow: 12, type: 'critical' },
                { name: 'Michael Chen', id: 'PAT-5531-Z', status: 'Stable', sync: '15m ago', flow: 88, type: 'stable' },
                { name: 'Emma Davis', id: 'PAT-2291-K', status: 'In-Process', sync: '1h ago', flow: 64, type: 'pending' },
                { name: 'David Wilson', id: 'PAT-3382-L', status: 'Stable', sync: '4h ago', flow: 82, type: 'stable' },
              ].map((patient, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-black text-slate-900 block group-hover:text-blue-600 transition-colors">{patient.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{patient.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${patient.type === 'critical' ? 'bg-rose-500 animate-pulse' : patient.type === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                      <span className={`text-[11px] font-black uppercase tracking-tighter ${patient.type === 'critical' ? 'text-rose-500' : patient.type === 'pending' ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {patient.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 text-[12px] font-bold text-slate-500 italic">{patient.sync}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${patient.flow < 20 ? 'bg-rose-500' : 'bg-blue-600'}`} style={{ width: `${patient.flow}%` }}></div>
                      </div>
                      <span className="text-[11px] font-black text-slate-900">{patient.flow}%</span>
                    </div>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-all" title="Remote Sync"><RefreshCw size={16} /></button>
                      <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all" title="View Dossier"><ShieldCheck size={16} /></button>
                      <button className="p-2 hover:bg-slate-200 text-slate-600 rounded-lg transition-all"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Showing 05 of 24 Active Patient Nodes</p>
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-10 h-10 rounded-xl font-black text-[12px] flex items-center justify-center transition-all ${p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-slate-50 text-slate-400'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: 'Patient Support', desc: 'Direct neural communication channel.', icon: Mail, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Family Connect', desc: 'Authorized family node dashboard.', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Emergency Contact', desc: 'Primary trauma intervention line.', icon: Phone, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((tool, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 flex items-center gap-6 group hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer">
            <div className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
              <tool.icon size={28} />
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight">{tool.label}</h4>
                <span className="text-[12px] text-slate-400 font-bold leading-tight uppercase tracking-widest italic">{tool.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleModule = () => (
    <div className="animate-slide-up space-y-12">
      {/* Schedule Hero Section */}
      <div className="bg-gradient-to-br from-amber-900 via-slate-900 to-amber-950 rounded-[48px] p-16 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-white/10">
        <div className="absolute top-0 right-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-8 mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[32px] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(245,158,11,0.5)] transform hover:scale-105 transition-transform">
                <Calendar size={48} />
              </div>
              <div>
                <h2 className="text-[48px] font-black text-white uppercase italic tracking-tighter leading-none mb-2">Operation Timeline</h2>
                <p className="text-amber-400 font-black uppercase tracking-[0.4em] text-[12px] flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div> Mission Date: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-[22px] font-medium leading-relaxed mb-12 italic max-w-2xl">
              Synchronize clinical interventions and neural sync sessions. Real-time patient flow management for the authorized lead node.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-12 py-6 bg-white text-slate-900 hover:bg-amber-500 hover:text-white rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 shadow-2xl hover:-translate-y-2 group">
                <Plus size={22} /> Add Intervention
              </button>
              <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 backdrop-blur-xl">
                <Activity size={22} /> View Efficiency Matrix
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
              <h4 className="text-white text-[14px] font-black uppercase tracking-widest italic">Timeline Metrics</h4>
              <span className="text-[11px] font-black text-amber-500">Live Node</span>
            </div>
            <div className="grid grid-cols-2 gap-10 text-center">
              <div>
                <span className="text-white font-black text-[32px] block leading-none mb-2">14</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Slots</span>
              </div>
              <div>
                <span className="text-amber-500 font-black text-[32px] block leading-none mb-2">04</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available</span>
              </div>
              <div className="col-span-2 pt-6 border-t border-white/5">
                <span className="text-white font-black text-[24px] block leading-none mb-2">12m</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Session Latency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Schedule Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-50/50 backdrop-blur-xl rounded-[48px] border border-slate-100 p-12 relative">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-[32px] font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-4 leading-none">
                <Activity size={36} className="text-amber-500" /> Daily Intervention Flow
              </h3>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-2">Active Mission Log • Sector 09-Alpha</p>
            </div>
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-amber-500 transition-all shadow-sm">Filter Timeline</button>
          </div>

          <div className="space-y-10 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-200">
            {[
              { time: '09:00', patient: 'Alex Rivera', id: 'PAT-9921', type: 'Neural Sync', status: 'Completed', color: 'bg-emerald-500', icon: ShieldCheck },
              { time: '10:30', patient: 'Sarah Johnson', id: 'PAT-1022', type: 'Clinical Consult', status: 'In Progress', color: 'bg-blue-500 animate-pulse', icon: Activity },
              { time: '12:00', patient: 'Michael Chen', id: 'PAT-5531', type: 'Diagnostic Audit', status: 'Pending', color: 'bg-amber-500', icon: FileSearch },
              { time: '14:30', patient: 'Emma Davis', id: 'PAT-2291', type: 'Biometric Update', status: 'Confirmed', color: 'bg-slate-300', icon: RefreshCw },
            ].map((op, i) => (
              <div key={i} className="flex items-start gap-12 group relative">
                <span className="text-[12px] font-black text-slate-400 tabular-nums w-12 shrink-0 pt-2">{op.time}</span>
                <div className="relative z-10 w-6 h-6 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center -ml-[61px] mt-2 group-hover:border-amber-100 transition-all shadow-sm">
                  <div className={`w-2.5 h-2.5 rounded-full ${op.color}`}></div>
                </div>
                <div className="flex-1 bg-white border border-slate-100 rounded-[32px] p-10 hover:border-amber-400 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                        <op.icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-[22px] font-black text-slate-900 leading-none mb-2 uppercase italic tracking-tight">{op.patient}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{op.id}</span>
                          <span className="text-slate-200">•</span>
                          <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest">{op.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        op.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        op.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {op.status}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Launch</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
            <h3 className="text-[24px] font-black uppercase italic tracking-tighter mb-12 flex items-center gap-4">
              <Database size={28} className="text-amber-500" /> Operational Zones
            </h3>
            <div className="space-y-10">
              {[
                { zone: 'Main Clinical Bay', load: 84, status: 'Active', color: 'bg-amber-500' },
                { zone: 'Neural Sync Lab 04', load: 12, status: 'Available', color: 'bg-emerald-500' },
                { zone: 'Virtual Consult Hub', load: 95, status: 'Critical', color: 'bg-rose-500' },
              ].map((zone, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="font-black text-white text-[15px] uppercase tracking-tight leading-none mb-1">{zone.zone}</h5>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{zone.status}</span>
                    </div>
                    <span className="text-[20px] font-black text-white">{zone.load}<span className="text-[12px] opacity-40 ml-1">%</span></span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full ${zone.color} shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-1000`} style={{ width: `${zone.load}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-6 bg-white text-slate-900 hover:bg-amber-500 hover:text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-[13px] mt-16 transition-all shadow-2xl transform active:scale-95">
              Redistribute Nodes
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-[24px] font-black uppercase italic tracking-tighter mb-6 relative z-10 flex items-center gap-4">
              <MessageSquare size={28} /> Mission Control
            </h3>
            <p className="text-white/80 text-[15px] font-medium leading-relaxed mb-10 italic relative z-10">
              Coordinated handover protocols and team sync active. sector-wide communications are encrypted.
            </p>
            <button className="px-8 py-4 bg-black/20 hover:bg-black/40 rounded-2xl font-black uppercase tracking-widest text-[12px] transition-all border border-white/20 relative z-10">
              Enter Secure Comms
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsModule = () => (
    <div className="animate-slide-up space-y-12">
      {/* Premium Report Hero */}
      <div className="bg-gradient-to-br from-sky-900 via-slate-900 to-blue-950 rounded-[48px] p-16 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/10 mb-12">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#0ea5e91a_0%,transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-8 mb-10">
              <div className="w-24 h-24 bg-sky-500 rounded-[32px] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(14,165,233,0.4)]">
                <FileText size={48} />
              </div>
              <div>
                <h2 className="text-[48px] font-black text-white uppercase italic tracking-tighter leading-none mb-2">Clinical Document Vault</h2>
                <div className="flex items-center gap-6">
                  <span className="px-6 py-2 bg-sky-500/20 text-sky-400 text-[11px] font-black uppercase tracking-widest rounded-full border border-sky-500/30">Verified Ledger v9.4</span>
                  <div className="flex items-center gap-3 text-white/50 text-[11px] font-black uppercase tracking-widest italic">
                    <ShieldCheck size={16} /> End-to-End Encryption Active
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-[22px] font-medium leading-relaxed mb-12 italic">
              Access and manage high-precision clinical documentation. All reports are cryptographically signed and verified against the regional healthcare mesh.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-12 py-6 bg-sky-500 hover:bg-sky-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 shadow-2xl hover:-translate-y-2 group">
                <Plus size={22} /> Initialize New Report
              </button>
              <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[24px] font-black uppercase tracking-widest text-[14px] transition-all flex items-center gap-4 backdrop-blur-xl">
                <Download size={22} /> Global Batch Export
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-black/30 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
            <h4 className="text-sky-400 text-[12px] font-black uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/10 italic text-center">Archive Integrity</h4>
            <div className="space-y-8">
              {[
                { label: 'Blockchain Sync', status: 'Optimal', color: 'bg-emerald-500' },
                { label: 'Data Latency', status: '12ms', color: 'bg-sky-500' },
                { label: 'Record Count', status: '2,482', color: 'bg-indigo-500' }
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">{metric.label}</span>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${metric.color} animate-pulse`}></div>
                    <span className="text-white font-black text-[12px] uppercase">{metric.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center leading-relaxed italic">
                Last System Audit: 42 Seconds Ago<br/>Node Location: Regional Sector 09
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Repository Main View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-50/50 backdrop-blur-xl rounded-[48px] border border-slate-100 p-12 relative shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div>
              <h3 className="text-[32px] font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-4 leading-none">
                <FileSearch size={36} className="text-sky-500" /> Clinical Repository
              </h3>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-2">Accessing Local Node Document Registry</p>
            </div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search Biometric ID or Record Name..." 
                className="bg-white border border-slate-100 rounded-[20px] py-4 px-14 text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 w-80 shadow-sm placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: 'Neural Scan v4', type: 'Full Brain Diagnostic', patient: 'Alex Rivera', date: 'May 06, 2026', status: 'Physician Signed', color: 'text-emerald-500', icon: Zap },
              { name: 'Cardio-Flow Profile', type: 'Vascular Analysis', patient: 'Sarah Johnson', date: 'May 05, 2026', status: 'Awaiting Signature', color: 'text-amber-500', icon: Activity },
              { name: 'Metabolic Audit', type: 'Systemic Screening', patient: 'Michael Chen', date: 'May 04, 2026', status: 'Finalized', color: 'text-emerald-500', icon: ShieldCheck },
              { name: 'Biometric Drift', type: 'Baseline Correlation', patient: 'Emma Davis', date: 'May 02, 2026', status: 'Draft Phase', color: 'text-slate-400', icon: RefreshCw },
            ].map((report, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] flex items-center justify-between group hover:border-sky-400 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-inner">
                    <report.icon size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-[20px] font-black text-slate-900 tracking-tight leading-none uppercase italic">{report.name}</h4>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-widest">{report.type}</span>
                    </div>
                    <p className="text-[12px] font-bold text-slate-400 flex items-center gap-3 uppercase tracking-widest">
                      <User size={14} className="text-sky-500" /> {report.patient} <span className="text-slate-200">•</span> <Clock size={14} /> {report.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <span className={`text-[12px] font-black uppercase tracking-tighter block ${report.color}`}>{report.status}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 block">Clinical Integrity: OK</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white rounded-xl transition-all shadow-sm"><Download size={18} /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white rounded-xl transition-all shadow-sm"><Share2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
            <h3 className="text-[22px] font-black uppercase italic tracking-tighter mb-10 text-white flex items-center gap-4 relative z-10">
              <ShieldCheck size={28} className="text-sky-400" /> Registry Compliance
            </h3>
            <div className="space-y-10 relative z-10">
              {[
                { label: 'Neural Signature', status: 'Verified', details: 'RSA-4096 Protocol', color: 'text-emerald-400' },
                { label: 'Mesh Sync Level', status: 'Global', details: 'Full Node Replica', color: 'text-sky-400' },
                { label: 'Clinical Standards', status: 'Compliant', details: 'ISO-9001-MD', color: 'text-emerald-400' }
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                    <span className={`text-[12px] font-black uppercase italic ${item.color}`}>{item.status}</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-white/60 transition-colors">{item.details}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-6 bg-white text-slate-900 hover:bg-sky-500 hover:text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-[13px] mt-16 transition-all shadow-2xl transform active:scale-95">
              Force Registry Audit
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-100 to-white rounded-[48px] p-12 border border-slate-200 shadow-sm group hover:border-sky-400 transition-all">
            <h4 className="text-[22px] font-black text-slate-900 uppercase italic tracking-tighter mb-6">Archive Notice</h4>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed italic mb-10">
              All documents older than 24 months are automatically migrated to high-density cold storage node.
            </p>
            <button className="text-[12px] font-black text-sky-600 uppercase tracking-widest flex items-center gap-3 group-hover:translate-x-2 transition-transform">
              Access Cold Storage <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardModule = () => (
    <div className="animate-slide-up space-y-12">
      <div className="relative overflow-hidden">
        {/* Clinical Availability & Operational Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-10 bg-gradient-to-br from-slate-900 to-blue-950 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#3b82f61a_0%,transparent_50%)]"></div>
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <h3 className="text-[22px] font-black uppercase italic tracking-tighter leading-none mb-2 text-white">Doctor Availability</h3>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-[11px]">Public Status Sync</p>
              </div>
              <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${dutyStatus === 'On Duty' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>
                Node: {dutyStatus === 'On Duty' ? 'ACTIVE' : 'OFFLINE'}
              </div>
            </div>
            
            <div className="flex gap-6 relative z-10 mb-8">
              <button 
                onClick={() => setDutyStatus('On Duty')}
                className={`flex-1 py-6 rounded-3xl font-black uppercase tracking-widest text-[12px] transition-all flex flex-col items-center justify-center gap-3 border ${dutyStatus === 'On Duty' ? 'bg-blue-600 border-blue-500 text-white shadow-[0_20px_40px_rgba(37,99,235,0.4)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                <div className={`w-3 h-3 rounded-full ${dutyStatus === 'On Duty' ? 'bg-white animate-pulse shadow-[0_0_10px_white]' : 'bg-slate-700'}`}></div>
                Available
              </button>
              <button 
                onClick={() => setDutyStatus('Standby')}
                className={`flex-1 py-6 rounded-3xl font-black uppercase tracking-widest text-[12px] transition-all flex flex-col items-center justify-center gap-3 border ${dutyStatus === 'Standby' ? 'bg-rose-600 border-rose-500 text-white shadow-[0_20px_40px_rgba(225,29,72,0.4)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                <div className={`w-3 h-3 rounded-full ${dutyStatus === 'Standby' ? 'bg-white animate-pulse shadow-[0_0_10px_white]' : 'bg-slate-700'}`}></div>
                Not Available
              </button>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-slate-400 text-[13px] font-medium leading-relaxed italic">
                Changing your status will instantly update the regional medical directory. Patients will see you as {dutyStatus === 'On Duty' ? 'Available for consultation' : 'Currently Unavailable'}.
              </p>
            </div>
          </div>

          <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-[22px] font-black uppercase italic tracking-tighter text-slate-900 leading-none mb-2">Clinic Operational Hub</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Infrastructure Control</p>
              </div>
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <MapPin size={32} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Patient Wait-Time</span>
                  <span className="text-[20px] font-black uppercase text-blue-600">~15 Mins</span>
               </div>
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Clinic Visibility</span>
                  <span className="text-[20px] font-black uppercase text-emerald-600">Online</span>
               </div>
            </div>
            <button className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[12px] hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1 transform">
              Modify Operational Parameters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative z-10">
          <div>
            <h1 className="text-[48px] font-black text-slate-900 tracking-tighter leading-none mb-3 uppercase italic">Clinical Command Hub</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[13px] flex items-center gap-3">
              <ShieldCheck size={18} className="text-blue-500" /> Authorized Chief Clinical Node • Multi-Modal Operations Active
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Network Optimal</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Active Patients', value: '24 Nodes', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Emergency Alerts', value: '08 Urgent', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
            { label: 'Neural Accuracy', value: '99.8%', icon: Cpu, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Reports Pending', value: '12 Vault', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-[32px] bg-white group hover:border-blue-200 hover:shadow-2xl transition-all cursor-pointer">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">{stat.label}</span>
              <span className="text-[32px] font-black text-slate-900 block leading-none">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!doctorInfo) return (
    <div className="min-h-screen bg-immersive flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-black uppercase tracking-[0.3em] animate-pulse">Initializing Neural Link...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-immersive pb-24 min-h-screen">
      {/* Premium Doctor Navbar */}
      <nav className="nav-top">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Shield size={24} className="text-[#008cff]" />
            </div>
            <span className="text-white font-black text-2xl italic tracking-tighter uppercase">MEDI<span className="text-blue-400">SCAN</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-6 border-l border-white/20 pl-6">
            <div className="nav-link">
              <div className="p-1.5 bg-blue-600 rounded-lg"><Stethoscope size={14} /></div>
              <span>Clinical Core Pro</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/20 pr-6">
            <div className="flex flex-col items-end mr-2">
              <span className="text-white font-black text-[14px] uppercase italic tracking-tighter leading-none">{doctorInfo.doctorId}</span>
              <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">Authorized Lead Node</span>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <User size={20} className="text-blue-400" />
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white/10 hover:bg-rose-500/20 text-white px-4 py-2 rounded-lg text-[12px] font-black uppercase tracking-wider flex items-center gap-2 border border-white/20 hover:border-rose-500/50 transition-all shadow-lg"
          >
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </nav>

      <main className="floating-container animate-slide-up">
        {/* Module Selection Tabs - Doctor Version */}
        <div className="module-tabs !max-w-none !w-full !justify-start overflow-x-auto no-scrollbar py-4 px-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`module-tab-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={24} className="icon" />
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="main-floating-card p-12 mt-4">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="radio-group">
                  <label className="radio-item group">
                    <input 
                      type="radio" 
                      name="dutyStatus" 
                      checked={dutyStatus === 'On Duty'}
                      onChange={() => setDutyStatus('On Duty')}
                    />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${dutyStatus === 'On Duty' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981] scale-110' : 'bg-gray-300'}`}></div>
                    <span className={`transition-colors ${dutyStatus === 'On Duty' ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-600/70'}`}>Active Duty</span>
                  </label>
                  <label className="radio-item group">
                    <input 
                      type="radio" 
                      name="dutyStatus" 
                      checked={dutyStatus === 'Standby'}
                      onChange={() => setDutyStatus('Standby')}
                    />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${dutyStatus === 'Standby' ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b] scale-110' : 'bg-gray-300'}`}></div>
                    <span className={`transition-colors ${dutyStatus === 'Standby' ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600/70'}`}>Standby Mode</span>
                  </label>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue-500" />
                    Neural Encryption Protocol: Active
                  </p>
                  <div className="h-4 w-[1px] bg-gray-200"></div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Sync: 42ms Latency</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-gray-200 rounded-[12px] overflow-hidden mb-12">
                <div className="section-card border-r rounded-none bg-transparent">
                  <span className="section-label">Registry Node</span>
                  <span className="section-value text-[24px] truncate" title={doctorInfo.doctorId}>{doctorInfo.doctorId}</span>
                  <span className="section-sub font-bold text-blue-600 uppercase text-[10px]">Verified Specialist Node</span>
                </div>
                <div className="section-card border-r rounded-none bg-transparent">
                  <span className="section-label">Secure Uplink</span>
                  <span className="section-value text-[24px] truncate" title={doctorInfo.email}>{doctorInfo.email}</span>
                  <span className="section-sub font-bold uppercase text-[10px]">Communication Link Live</span>
                </div>
                <div className="section-card border-r rounded-none bg-transparent">
                  <span className="section-label">System Role</span>
                  <span className="section-value text-[24px]">Chief Surgeon</span>
                  <span className="section-sub font-bold text-purple-600 uppercase text-[10px]">Level 5 Clearance</span>
                </div>
                <div className="section-card rounded-none bg-transparent">
                  <span className="section-label">Operational Sync</span>
                  <span className="section-value text-[24px]">42ms Latency</span>
                  <span className="section-sub font-bold text-green-600 uppercase text-[10px]">Global Mesh Sync OK</span>
                </div>
              </div>
            </>
          )}

          {/* Render Active Module */}
          <div className="mt-8">
            {activeTab === 'dashboard' ? (
              renderDashboardModule()
            ) : activeTab === 'emergency' ? (
              renderEmergencyModule()
            ) : activeTab === 'diagnosis' ? (
              renderAISupportModule()
            ) : activeTab === 'pharma' ? (
              renderEPharmaModule()
            ) : activeTab === 'dossiers' ? (
              renderDossiersModule()
            ) : activeTab === 'analytics' ? (
              renderAnalyticsModule()
            ) : activeTab === 'patients' ? (
              renderPatientListModule()
            ) : activeTab === 'schedule' ? (
              renderScheduleModule()
            ) : activeTab === 'reports' ? (
              renderReportsModule()
            ) : (
              renderDashboardModule()
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
