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
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Welcome Section - Command Center Hero */}
        <section className="mb-16">
          <div className="relative p-12 rounded-[3.5rem] bg-[#050505] border border-white/5 overflow-hidden shadow-2xl group">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] group-hover:bg-cyan-600/15 transition-colors duration-700"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/15 transition-colors duration-700"></div>
            
            {/* Decorative Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="absolute top-0 right-0 p-12 hidden lg:block">
              <div className="relative">
                <ShieldCheck size={180} className="text-white/[0.03] -rotate-12 animate-float" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border border-cyan-500/20 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-inner">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-2 h-2 bg-cyan-500 rounded-full"></div>
                </div>
                Neural Sync: Operational
              </div>
              
              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-6 leading-[0.9]">
                Welcome Back,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-600">Commander Alex.</span>
              </h2>
              
              <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12 max-w-xl">
                Your biometric profile is locked. <span className="text-white">3 protocol updates</span> and <span className="text-white">12 clinical markers</span> have been synthesized for your review.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <button className="group px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all flex items-center gap-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
                  <Calendar size={18} />
                  <span>Execute Sync</span>
                </button>
                <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 backdrop-blur-md">
                  System Dossier
                </button>
              </div>
            </div>
            
            {/* Bottom Status Bar */}
            <div className="absolute bottom-0 left-0 w-full px-12 py-4 border-t border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-sm">
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Latency</span>
                  <span className="text-xs font-mono font-bold text-emerald-500">12ms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Identity</span>
                  <span className="text-xs font-mono font-bold text-slate-300">USER_882_ALPHA</span>
                </div>
              </div>
              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] animate-pulse">
                Mediscan Core Engine v4.0.2
              </div>
            </div>
          </div>
        </section>

        {/* Biometric HUD Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {biometricStats.map((stat, idx) => (
            <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.08] transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-xl ${stat.glow}`}>
                  <stat.icon size={28} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black tracking-tighter italic">{stat.value}</p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${stat.bg.replace('/10', '')} transition-all duration-1000 w-[70%] group-hover:w-[85%]`}></div>
              </div>
            </div>
          ))}
        </section>

        {/* Module Matrix - Professional Splitup Hub */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <Microscope size={16} />
                </div>
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Core Subsystems</span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter italic">Module Matrix</h3>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <div className="relative group/search">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within/search:text-cyan-400 transition-colors">
                  <Globe size={14} className="animate-spin-slow" />
                </div>
                <input 
                  type="text" 
                  placeholder="SEARCH SUBSYSTEMS..." 
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-black tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all w-64"
                />
              </div>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All Systems Operational</span>
              </div>
              <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                Node: <span className="text-white">MS-772</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className="group relative h-96 rounded-[2.5rem] bg-[#080808] border border-white/5 overflow-hidden cursor-pointer hover:border-white/20 hover:bg-[#0c0c0c] transition-all duration-500 shadow-2xl"
              >
                {/* Background Glow */}
                <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${mod.color} opacity-[0.03] blur-[100px] group-hover:opacity-[0.15] transition-opacity duration-700`}></div>
                
                {/* Border Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 bg-gradient-to-br ${mod.color} rounded-2xl text-white shadow-lg shadow-black/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {mod.icon}
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</span>
                        <span className={`text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-md border ${mod.status === 'Standby' ? 'border-slate-500/30 text-slate-400' : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'}`}>
                          {mod.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-white/20"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{mod.tag}</span>
                      </div>
                      <h4 className="text-3xl font-black uppercase tracking-tighter italic leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                        {mod.name.split(' ')[0]}<br/>
                        <span className="text-cyan-500">{mod.name.split(' ')[1]}</span>
                      </h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[16rem] group-hover:text-slate-300 transition-colors">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">System Uptime</span>
                      <span className="text-xs font-mono font-bold text-slate-400">{mod.uptime}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-500">Initialize</span>
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none rotate-12">
                  {mod.icon}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence & Analytics Feed */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Activity size={150} />
            </div>
            
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-inner">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">Intelligence Feed</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Clinical Synchronization</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors">View All Archive</button>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Neural Diagnostics Complete', time: '14:00', type: 'MediBot', status: 'Analysis Available', icon: BrainCircuit, color: 'text-cyan-400' },
                { title: 'New Lab Report Integrated', time: 'Yesterday', type: 'Dossier', status: 'Clinical Review', icon: Microscope, color: 'text-purple-400' },
                { title: 'Security Protocol Updated', time: '2 Days Ago', type: 'System', status: 'Verified', icon: ShieldCheck, color: 'text-emerald-400' },
              ].map((feed, i) => (
                <div key={i} className="group flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/5 hover:border-white/10">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 bg-black rounded-2xl flex items-center justify-center ${feed.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                      <feed.icon size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg tracking-tight group-hover:text-cyan-400 transition-colors">{feed.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{feed.type}</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{feed.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:text-white transition-colors`}>
                      {feed.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* Pro Insight Card */}
            <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group cursor-default">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center mb-8 border border-white/10 backdrop-blur-md">
                  <Sparkles size={24} />
                </div>
                <span className="px-3 py-1 bg-black/20 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 inline-block border border-white/10">Pro Insight</span>
                <h4 className="text-3xl font-black mb-8 italic leading-tight tracking-tighter">"Molecular hydration scales your recovery speed by 2.4x."</h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">
                  The latest data suggests cellular optimization is directly linked to early morning hydration protocols.
                </p>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Source: Bio-Net AI</span>
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* System Roadmap */}
            <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Neural Roadmap</h4>
              <div className="space-y-6">
                {[
                  { label: 'Lab 3D Visualization', status: 'Pending', progress: 40 },
                  { label: 'Neural Link v5', status: 'Locked', progress: 0 },
                  { label: 'Real-time Vital Sync', status: 'Live', progress: 100 }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-300 italic">{item.label}</span>
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
