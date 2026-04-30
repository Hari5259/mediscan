import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, LogOut, Stethoscope, ClipboardList, 
  BrainCircuit, Calendar, Pill, BarChart3, 
  Settings, User, Bell, ChevronRight, Activity, Scale, ShieldAlert,
  Sparkles, Zap, Smartphone, Globe, ShieldCheck, Microscope
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const biometricStats = [
    { label: 'Neural Sync', value: '98%', icon: BrainCircuit, color: 'text-cyan-400', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500/10' },
    { label: 'Cardio Core', value: '72 BPM', icon: Activity, color: 'text-rose-500', glow: 'shadow-rose-500/20', bg: 'bg-rose-500/10' },
    { label: 'Hydration', value: '84%', icon: Sparkles, color: 'text-blue-500', glow: 'shadow-blue-500/20', bg: 'bg-blue-500/10' },
  ];

  const modules = [
    { 
      id: 'bot', 
      name: 'MediBot AI', 
      desc: 'Advanced neural diagnostics & real-time symptom analysis companion.', 
      path: '/symptom-checker', 
      icon: <BrainCircuit size={32} />, 
      color: 'from-cyan-500 to-blue-600',
      tag: 'Neural Core',
      status: 'Ready',
      uptime: '99.9%'
    },
    { 
      id: 'lens', 
      name: 'MedLens Pro', 
      desc: 'Precision optical scanner for pharmaceutical identification & analysis.', 
      path: '/medicine-scanner', 
      icon: <Smartphone size={32} />, 
      color: 'from-purple-500 to-indigo-600',
      tag: 'Optics',
      status: 'Active',
      uptime: '98.4%'
    },
    { 
      id: 'reports', 
      name: 'Health Dossier', 
      desc: 'Secure encrypted repository for clinical reports & medical history.', 
      path: '/health-reports', 
      icon: <ClipboardList size={32} />, 
      color: 'from-emerald-500 to-teal-600',
      tag: 'Secure Data',
      status: 'Syncing',
      uptime: '100%'
    },
    { 
      id: 'doctors', 
      name: 'Specialist Hub', 
      desc: 'Direct neural link to certified clinical experts & specialists.', 
      path: '/doctors', 
      icon: <Stethoscope size={32} />, 
      color: 'from-amber-500 to-orange-600',
      tag: 'Human Link',
      status: 'Online',
      uptime: '94.2%'
    },
    { 
      id: 'bmi', 
      name: 'Biometric Lab', 
      desc: 'Real-time computation of body mass & advanced health indices.', 
      path: '/bmi-calculator', 
      icon: <Scale size={32} />, 
      color: 'from-pink-500 to-rose-600',
      tag: 'Analytics',
      status: 'Calibrated',
      uptime: '99.7%'
    },
    { 
      id: 'emergency', 
      name: 'Protocol Red', 
      desc: 'High-priority emergency protocols & rapid response contacts.', 
      path: '/emergency', 
      icon: <ShieldAlert size={32} />, 
      color: 'from-red-600 to-rose-800',
      tag: 'Critical',
      status: 'Standby',
      uptime: '100%'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* HUD Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Cyber Nav */}
      <nav className="bg-black/40 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.02)]">
              <Heart className="w-7 h-7 text-cyan-400" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter italic">
                MEDI<span className="text-cyan-400">SCAN</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OS v4.0.2</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 pr-6 border-r border-white/5">
              <button className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Network</button>
              <button className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Labs</button>
              <button className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">Security</button>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black uppercase tracking-tight italic">Alex Johnson</p>
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Authorized User</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-[#050505] rounded-[0.9rem] flex items-center justify-center text-sm font-black tracking-tighter">
                  AJ
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl border border-white/10 transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        
        {/* Professional Module Access Bar - Setup at the Top */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white uppercase italic">Command Center</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Module Subsystems</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All Modules Active</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
              <div className="relative group/search hidden sm:block">
                <Globe size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/search:text-cyan-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH MODULES..." 
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-[10px] font-black tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-48"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 cursor-pointer hover:bg-[#111] hover:border-white/20 transition-all duration-300 shadow-xl overflow-hidden flex flex-col items-center text-center"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                
                <div className={`w-14 h-14 bg-gradient-to-br ${mod.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                  {mod.icon}
                </div>
                
                <h4 className="text-sm font-bold uppercase tracking-tight text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {mod.name.split(' ')[0]}
                </h4>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                  {mod.tag}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-center">
                  <span className={`text-[8px] font-black uppercase tracking-tight px-2 py-0.5 rounded border ${mod.status === 'Standby' ? 'border-slate-500/30 text-slate-500' : 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'}`}>
                    {mod.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scaled-down Professional Status Section (Former Hero) */}
        <section className="mb-12">
          <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-[#050505] to-[#0a0a0a] border border-white/5 overflow-hidden shadow-2xl group">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400 text-[9px] font-black uppercase tracking-[0.4em] mb-6 shadow-inner">
                  <div className="relative w-1.5 h-1.5">
                    <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                  </div>
                  System Status: Encrypted
                </div>
                
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4 leading-tight">
                  Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-600">Diagnostics Hub</span>
                </h2>
                
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                  Welcome back, <span className="text-white">Commander Alex</span>. Your biometric profile is currently synced with <span className="text-white">Node MS-772</span>. 12 clinical markers verified.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <button className="group px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95">
                  <Calendar size={16} />
                  <span>Execute Sync</span>
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 backdrop-blur-md text-slate-300">
                  System Dossier
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Biometric HUD Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {biometricStats.map((stat, idx) => (
            <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-105 transition-transform shadow-xl ${stat.glow}`}>
                  <stat.icon size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black tracking-tighter italic">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${stat.bg.replace('/10', '')} transition-all duration-1000 w-[70%] group-hover:w-[85%]`}></div>
              </div>
            </div>
          ))}
        </section>

        {/* Intelligence Feed Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter italic text-white">Intelligence Feed</h3>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Clinical Data</p>
                </div>
              </div>
              <button className="text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors">Archive</button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Neural Diagnostics Complete', time: '14:00', type: 'MediBot', status: 'Available', icon: BrainCircuit, color: 'text-cyan-400' },
                { title: 'New Lab Report Integrated', time: 'Yesterday', type: 'Dossier', status: 'Review', icon: Microscope, color: 'text-purple-400' },
                { title: 'Security Protocol Updated', time: '2 Days Ago', type: 'System', status: 'Verified', icon: ShieldCheck, color: 'text-emerald-400' },
              ].map((feed, i) => (
                <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/5">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 bg-black rounded-xl flex items-center justify-center ${feed.color} border border-white/5 group-hover:scale-105 transition-transform`}>
                      <feed.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-base tracking-tight group-hover:text-cyan-400 transition-colors">{feed.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{feed.type}</span>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">• {feed.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500 group-hover:text-white transition-colors`}>
                    {feed.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px]"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center mb-6 border border-white/10 backdrop-blur-md">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-2xl font-black mb-6 italic leading-tight tracking-tighter">"Molecular hydration scales recovery speed."</h4>
                <p className="text-white/70 text-xs font-medium leading-relaxed mb-6">
                  Latest data suggests cellular optimization is linked to early morning protocols.
                </p>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Source: Bio-Net AI</span>
                  <ChevronRight size={16} className="text-white/40" />
                </div>
              </div>
            </div>
            
            <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-8 relative overflow-hidden">
              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Neural Roadmap</h4>
              <div className="space-y-5">
                {[
                  { label: 'Lab 3D Visualization', status: 'Pending', progress: 40 },
                  { label: 'Neural Link v5', status: 'Locked', progress: 0 },
                  { label: 'Vital Sync', status: 'Live', progress: 100 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">{item.label}</span>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${item.status === 'Live' ? 'text-emerald-500' : 'text-slate-600'}`}>{item.status}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
