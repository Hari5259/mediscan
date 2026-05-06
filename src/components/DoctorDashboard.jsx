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
  ArrowRight
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);

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

  const clinicalModules = [
    { 
      id: 'diagnosis', 
      title: 'AI Diagnosis Support', 
      desc: 'Neural-assisted diagnostic interpretation and risk assessment.', 
      icon: Cpu, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      action: 'Launch Support'
    },
    { 
      id: 'dossiers', 
      title: 'Patient Health Dossiers', 
      desc: 'Secure access to end-to-end encrypted medical histories.', 
      icon: ShieldCheck, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      action: 'Access Vault'
    },
    { 
      id: 'pharma', 
      title: 'E-Pharma Portal', 
      desc: 'Digital prescription issuance and pharmaceutical sync.', 
      icon: Zap, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      action: 'Issue Rx'
    },
    { 
      id: 'analytics', 
      title: 'Clinical Analytics', 
      desc: 'Real-time population health data and performance metrics.', 
      icon: TrendingUp, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      action: 'View Metrics'
    }
  ];

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Patient Nodes', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Critical Cases', value: '08', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Digital Records', value: '1,240', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Network Rank', value: 'Alpha', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="bg-immersive min-h-screen flex flex-col overflow-hidden perspective-1000">
      {/* Animated 3D Background Elements - Similar to Patient Login */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        
        {/* Floating 3D Icons */}
        <div className="absolute top-[15%] right-[10%] animate-bounce transition-all duration-[5000ms] opacity-10">
          <Cpu size={180} className="text-blue-400 rotate-12" />
        </div>
        <div className="absolute bottom-[20%] left-[5%] animate-bounce transition-all duration-[7000ms] opacity-10">
          <Globe size={140} className="text-indigo-300 -rotate-12" />
        </div>
        <div className="absolute top-[40%] left-[40%] animate-pulse opacity-5">
          <Zap size={300} className="text-blue-500 rotate-45" />
        </div>
      </div>

      {/* Professional Nav */}
      <nav className="px-12 py-6 flex justify-between items-center bg-slate-900/80 backdrop-blur-xl border-b border-white/10 relative z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(30,64,175,0.3)] group-hover:rotate-12 transition-transform duration-500">
              <Stethoscope size={28} className="text-[#1e40af]" />
            </div>
            <span className="text-white font-black text-2xl italic tracking-tighter uppercase drop-shadow-lg">
              Clinical<span className="text-blue-400">Core</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-10">
            <div className="flex items-center gap-2 text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Network Status: Optimal</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 text-white/80">
          <button className="hover:text-white transition-colors relative group">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900 shadow-lg group-hover:scale-125 transition-transform"></span>
          </button>
          
          <div className="flex items-center gap-5 border-l border-white/10 pl-8">
            <div className="text-right hidden sm:block">
              <p className="text-white text-[12px] font-black uppercase tracking-widest">{doctorInfo.doctorId}</p>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-tighter">Chief Medical Officer</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-2xl flex items-center justify-center font-black text-white shadow-xl text-xl italic border border-white/20 transform hover:scale-110 transition-transform">
              DR
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-3.5 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-lg border border-rose-500/20"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>
      
      <main className="flex-1 max-w-[1500px] mx-auto w-full pt-12 px-12 relative z-10 animate-slide-up">
        {/* Main Dashboard Card with Patient Login Aesthetic */}
        <div className="bg-white/95 backdrop-blur-3xl rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/20 p-10 md:p-14 overflow-hidden relative transition-all duration-500 hover:scale-[1.01] transform-gpu">
          
          {/* Top Shine Effect like Login Page */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          
          {/* Header Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-widest border border-blue-100">Operation Command v4.2.0</span>
              </div>
              <h1 className="text-[64px] font-black tracking-tighter leading-none text-slate-900 italic drop-shadow-sm">System Operations.</h1>
              <p className="text-[18px] text-slate-500 font-bold uppercase tracking-tight mt-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
                Specialist Synchronized • <span className="text-[#1e40af]">14 Pending Diagnostics</span>
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/50 rounded-[32px] p-7 min-w-[170px] transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-2 group">
                  <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform shadow-sm`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-[28px] font-black text-slate-900 tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Command Hub */}
          <div className="mb-20">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-2 h-10 bg-gradient-to-b from-[#1e40af] to-blue-400 rounded-full shadow-lg"></div>
              <h2 className="text-[28px] font-black uppercase italic tracking-tighter text-slate-800">Clinical Command Hub</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {clinicalModules.map((module) => (
                <div key={module.id} className="group bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-4 cursor-pointer relative overflow-hidden">
                  {/* Hover Background Orb */}
                  <div className={`absolute top-0 right-0 w-40 h-40 ${module.bg} opacity-0 group-hover:opacity-10 rounded-full -mr-20 -mt-20 scale-50 group-hover:scale-150 transition-all duration-700`}></div>
                  
                  <div className={`${module.bg} ${module.color} w-20 h-20 rounded-[24px] flex items-center justify-center mb-8 shadow-sm relative z-10 group-hover:rotate-6 transition-transform duration-500`}>
                    <module.icon size={36} />
                  </div>
                  
                  <h3 className="text-[22px] font-black text-slate-900 mb-4 relative z-10 group-hover:text-[#1e40af] transition-colors">{module.title}</h3>
                  <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-10 relative z-10">{module.desc}</p>
                  
                  <button className="flex items-center gap-3 text-[13px] font-black uppercase tracking-widest text-[#1e40af] group-hover:translate-x-3 transition-transform">
                    {module.action} <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-20 border-t border-slate-100">
            {/* Patient Queue */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Users size={24} />
                  </div>
                  <h3 className="text-[26px] font-black uppercase italic tracking-tighter text-slate-800">Biometric Queue</h3>
                </div>
                <button className="px-7 py-3 bg-slate-900 text-white rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1">View Archives</button>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'John Anderson', id: 'NOD-921', time: '10:00 AM', type: 'Critical Review', status: 'Urgent', color: 'text-rose-600 bg-rose-50 border-rose-100' },
                  { name: 'Sarah Chen', id: 'NOD-452', time: '11:15 AM', type: 'Clinical Consult', status: 'In Queue', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                  { name: 'Michael Lee', id: 'NOD-108', time: '01:30 PM', type: 'Neural Sync', status: 'Ready', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                ].map((appt, i) => (
                  <div key={i} className="flex items-center justify-between p-10 bg-white border border-slate-100 rounded-[32px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
                    <div className="flex items-center gap-10">
                      <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center font-black text-slate-200 text-[32px] italic group-hover:bg-[#1e40af] group-hover:text-white transition-all duration-500 shadow-inner">
                        {appt.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-[24px] font-black tracking-tight text-slate-900">{appt.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{appt.id}</span>
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                          <span className="text-[11px] font-black text-[#1e40af] uppercase tracking-widest">{appt.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[24px] font-black text-slate-900 italic mb-3 flex items-center justify-end gap-3">
                        <Clock size={22} className="text-slate-300" />
                        {appt.time}
                      </p>
                      <span className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm ${appt.color}`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Feed */}
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Activity size={24} />
                </div>
                <h3 className="text-[26px] font-black uppercase italic tracking-tighter text-slate-800">System Feed</h3>
              </div>
              <div className="space-y-8">
                <div className="p-10 bg-gradient-to-br from-slate-950 to-slate-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden group">
                  {/* Internal Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-blue-400/30 transition-all duration-700"></div>
                  
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <Zap size={26} className="text-blue-400 animate-pulse" />
                    <span className="text-[14px] font-black uppercase tracking-widest text-blue-100">Critical Alerts</span>
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="pb-8 border-b border-white/10 group-hover:border-white/20 transition-colors">
                      <p className="text-[16px] font-bold text-white leading-relaxed">Patient Anderson: Abnormal vital spike detected in Sector 04-B.</p>
                      <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest mt-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                        Live • 2 Minutes Ago
                      </span>
                    </div>
                    <div>
                      <p className="text-[16px] font-bold text-white leading-relaxed">Neural Core: Advanced diagnostic sequence finalized for NOD-921.</p>
                      <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest mt-4 block">15 Minutes Ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-slate-50 border border-slate-100 rounded-[40px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0"></div>
                  <h4 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-10 italic group-hover:text-blue-100 transition-colors relative z-10">Tactical Actions</h4>
                  <div className="space-y-5 relative z-10">
                    <button className="w-full py-6 bg-white border border-slate-200 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:shadow-xl transition-all flex items-center justify-center gap-4 group/btn">
                      Sync Bio-Wearables <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    <button className="w-full py-6 bg-white border border-slate-200 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:shadow-xl transition-all flex items-center justify-center gap-4 group/btn">
                      Clinical Archives <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-12 py-10 flex flex-col md:flex-row justify-between items-center bg-black/60 backdrop-blur-xl border-t border-white/5 relative z-20 mt-24">
        <div className="flex gap-10 mb-6 md:mb-0">
          <div className="flex items-center gap-2 text-white/40 text-[11px] font-black uppercase tracking-widest hover:text-white/60 transition-colors cursor-default">
            <ShieldCheck size={16} className="text-blue-500/50" />
            <span>Identity Secured</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-[11px] font-black uppercase tracking-widest hover:text-white/60 transition-colors cursor-default">
            <Heart size={16} className="text-rose-500/50" />
            <span>Clinical Integrity</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/20 text-[11px] font-black tracking-[0.2em] mb-1">© 2026 MEDISCAN CLINICAL CORE</p>
          <p className="text-white/10 text-[9px] font-bold uppercase tracking-widest">Authorized Specialist Access Only</p>
        </div>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
