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
      desc: 'Symptom analysis & health companion.', 
      path: '/symptom-checker', 
      icon: <BrainCircuit size={32} />, 
      color: 'from-cyan-500 to-blue-600',
      tag: 'Neural Core'
    },
    { 
      id: 'lens', 
      name: 'MedLens Pro', 
      desc: 'Optical pharmaceutical scanner.', 
      path: '/medicine-scanner', 
      icon: <Smartphone size={32} />, 
      color: 'from-purple-500 to-indigo-600',
      tag: 'Optics'
    },
    { 
      id: 'reports', 
      name: 'Health Dossier', 
      desc: 'Clinical reports & history.', 
      path: '/health-reports', 
      icon: <ClipboardList size={32} />, 
      color: 'from-emerald-500 to-teal-600',
      tag: 'Data'
    },
    { 
      id: 'doctors', 
      name: 'Specialists', 
      desc: 'Find & book clinical experts.', 
      path: '/doctors', 
      icon: <Stethoscope size={32} />, 
      color: 'from-amber-500 to-orange-600',
      tag: 'Human Link'
    },
    { 
      id: 'bmi', 
      name: 'Biometric Calc', 
      desc: 'Body mass & health indices.', 
      path: '/bmi-calculator', 
      icon: <Scale size={32} />, 
      color: 'from-pink-500 to-rose-600',
      tag: 'Metrics'
    },
    { 
      id: 'emergency', 
      name: 'Protocol Red', 
      desc: 'Emergency contact & protocols.', 
      path: '/emergency', 
      icon: <ShieldAlert size={32} />, 
      color: 'from-red-600 to-rose-800',
      tag: 'Critical'
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
        
        {/* Welcome Section */}
        <section className="mb-16">
          <div className="relative p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8">
              <ShieldCheck size={120} className="text-white/5 -rotate-12" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Zap size={14} className="animate-pulse" />
                Biometric Integrity Verified
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4 leading-none">
                System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Online</span>, Alex.
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-lg">
                Your neural link is synchronized. We've detected 3 new clinical updates since your last session.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
                  <Calendar size={16} /> Sync Schedule
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95">
                  Full Dossier
                </button>
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

        {/* Module Grid - Attractive Splitup Page */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                <Microscope size={20} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Module Matrix</h3>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">6 Active Subsystems</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className="group relative h-80 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500"
              >
                {/* Module Background Gradient Glow */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${mod.color} opacity-[0.08] blur-[80px] group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-5 bg-gradient-to-br ${mod.color} rounded-3xl text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        {mod.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/5 px-3 py-1 rounded-full">{mod.tag}</span>
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-3 group-hover:text-cyan-400 transition-colors">{mod.name}</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[15rem]">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Optimal Sync</span>
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>

                {/* Cyber-Pattern Overlay */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <Globe size={128} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10">
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8">Clinical Intelligence Feed</h3>
            <div className="space-y-6">
              {[
                { title: 'Neural Diagnostics Complete', time: '14:00', type: 'MediBot', status: 'Analysis Available' },
                { title: 'New Lab Report Integrated', time: 'Yesterday', type: 'Dossier', status: 'Clinical Review' },
                { title: 'Security Protocol Updated', time: '2 Days Ago', type: 'System', status: 'Verified' },
              ].map((feed, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-[#050505] rounded-xl flex items-center justify-center text-slate-500 border border-white/5">
                      <Activity size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white tracking-tight">{feed.title}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{feed.type} • {feed.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/10">
                    {feed.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <span className="px-3 py-1 bg-black/20 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 inline-block">Pro Insight</span>
                <h4 className="text-2xl font-black mb-6 italic leading-tight">"Molecular hydration scales your recovery speed by 2.4x."</h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                  The latest data suggests cellular optimization is directly linked to early morning hydration protocols.
                </p>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Neural Roadmap</h4>
              <div className="space-y-5">
                {['Lab 3D Visualization', 'Neural Link v5', 'Real-time Vital Sync'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 italic">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                    {item}
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
