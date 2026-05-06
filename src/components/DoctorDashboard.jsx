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
  AlertCircle
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
    <div className="bg-immersive min-h-screen pb-24">
      {/* Doctor Specific Nav */}
      <nav className="px-12 py-6 flex justify-between items-center bg-slate-900/80 backdrop-blur-xl border-b border-white/5 fixed top-0 w-full z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(30,64,175,0.3)]">
              <Stethoscope size={28} className="text-[#1e40af]" />
            </div>
            <span className="text-white font-black text-2xl italic tracking-tighter uppercase">Clinical<span className="text-blue-400">Core</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-10">
            <div className="flex items-center gap-2 text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Network Status: Optimal</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button className="text-white/60 hover:text-white transition-colors relative group">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900 shadow-lg group-hover:scale-125 transition-transform"></span>
          </button>
          
          <div className="flex items-center gap-5 border-l border-white/10 pl-8">
            <div className="text-right hidden sm:block">
              <p className="text-white text-[12px] font-black uppercase tracking-widest">{doctorInfo.doctorId}</p>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-tighter">Chief Medical Officer</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-2xl flex items-center justify-center font-black text-white shadow-xl text-xl italic border border-white/20">
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
      
      <main className="max-w-[1400px] mx-auto pt-32 px-6 animate-slide-up">
        {/* Main Dashboard Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 p-10 md:p-14 overflow-hidden relative">
          
          {/* Header Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Command Center v4.2</span>
              </div>
              <h1 className="text-[56px] font-black tracking-tighter leading-none text-slate-900 italic">Operations Active.</h1>
              <p className="text-[16px] text-slate-400 font-bold uppercase tracking-tight mt-4">Welcome back, Specialist. <span className="text-[#1e40af]">14 clinical diagnostics</span> are awaiting your review.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 min-w-[160px] transition-all hover:scale-105 hover:shadow-lg group">
                  <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-[24px] font-black text-slate-900 tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Command Hub */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-8 bg-[#1e40af] rounded-full"></div>
              <h2 className="text-[24px] font-black uppercase italic tracking-tighter text-slate-800">Clinical Command Hub</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {clinicalModules.map((module) => (
                <div key={module.id} className="group bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${module.bg} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
                  
                  <div className={`${module.bg} ${module.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:rotate-6 transition-transform`}>
                    <module.icon size={32} />
                  </div>
                  
                  <h3 className="text-[20px] font-black text-slate-900 mb-3 relative z-10">{module.title}</h3>
                  <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-8 relative z-10">{module.desc}</p>
                  
                  <button className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-[#1e40af] group-hover:translate-x-2 transition-transform">
                    {module.action} <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 pt-16 border-t border-slate-100">
            {/* Patient Queue */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users size={24} className="text-slate-400" />
                  <h3 className="text-[22px] font-black uppercase italic tracking-tighter">Biometric Queue</h3>
                </div>
                <button className="px-5 py-2 bg-slate-50 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-colors">View Archives</button>
              </div>
              <div className="space-y-5">
                {[
                  { name: 'John Anderson', id: 'NOD-921', time: '10:00 AM', type: 'Critical Review', status: 'Urgent', color: 'text-rose-600 bg-rose-50 border-rose-100' },
                  { name: 'Sarah Chen', id: 'NOD-452', time: '11:15 AM', type: 'Clinical Consult', status: 'In Queue', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                  { name: 'Michael Lee', id: 'NOD-108', time: '01:30 PM', type: 'Neural Sync', status: 'Ready', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                ].map((appt, i) => (
                  <div key={i} className="flex items-center justify-between p-8 bg-white border border-slate-100 rounded-[24px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-300 text-[24px] italic group-hover:bg-[#1e40af] group-hover:text-white transition-all shadow-inner">
                        {appt.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-[20px] font-black tracking-tight text-slate-900">{appt.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{appt.id}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                          <span className="text-[10px] font-black text-[#1e40af] uppercase tracking-widest">{appt.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[20px] font-black text-slate-900 italic mb-2 flex items-center justify-end gap-2">
                        <Clock size={18} className="text-slate-300" />
                        {appt.time}
                      </p>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${appt.color}`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Feed */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <Activity size={24} className="text-slate-400" />
                <h3 className="text-[22px] font-black uppercase italic tracking-tighter">System Feed</h3>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[32px] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <Zap size={22} className="text-blue-400" />
                    <span className="text-[12px] font-black uppercase tracking-widest text-blue-100">Critical Alerts</span>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="pb-6 border-b border-white/10 group-hover:border-white/20 transition-colors">
                      <p className="text-[14px] font-bold text-white leading-relaxed">Patient Anderson: Vital spike detected in Sector 04-B.</p>
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
                        2 Minutes Ago
                      </span>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-white leading-relaxed">Neural Core: Diagnostic sequence for NOD-921 finalized.</p>
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-3 block">15 Minutes Ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                  <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Quick Diagnostics</h4>
                  <div className="space-y-4">
                    <button className="w-full py-5 bg-white border border-slate-200 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-[#1e40af] hover:text-white hover:border-[#1e40af] transition-all shadow-sm flex items-center justify-center gap-3 group">
                      Sync Bio-Wearables <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="w-full py-5 bg-white border border-slate-200 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-[#1e40af] hover:text-white hover:border-[#1e40af] transition-all shadow-sm flex items-center justify-center gap-3 group">
                      Clinical Archives <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
