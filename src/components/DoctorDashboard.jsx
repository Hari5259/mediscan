import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Users, Calendar, FileText, 
  TrendingUp, CheckCircle, Bell, Settings, 
  Search, Filter, ChevronRight, Activity,
  Stethoscope, Clock, ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DoctorDashboard() {
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

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020202]">
        <div className="w-12 h-12 border-4 border-cyan-600/30 border-t-cyan-600 rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Patient Node Count', value: '24', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Urgent Orders', value: '12', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { label: 'Active Dossiers', value: '08', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Global Rank', value: 'Top 5%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* HUD Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent animate-scan"></div>
      </div>

      {/* Premium Header HUD */}
      <nav className="bg-[#050505]/80 backdrop-blur-3xl sticky top-0 z-50 border-b border-white/5 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl shadow-2xl relative group">
               <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <Stethoscope className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
                Specialist <span className="text-cyan-400">HUB</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Secure Uplink Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <button className="relative p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95 shadow-2xl group">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-black animate-ping"></span>
            </button>
            <div className="h-10 w-px bg-white/5"></div>
            <div className="flex items-center gap-5">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-black text-white uppercase tracking-widest">{doctorInfo.doctorId}</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Verified Surgeon Alpha</p>
                </div>
              </div>
              <div className="w-14 h-14 bg-white text-black rounded-[1.25rem] flex items-center justify-center font-black shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden ring-4 ring-white/5 transition-all hover:scale-105 active:scale-95">
                <span className="text-xl italic">DR</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-2xl active:scale-95"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Command Center Area */}
      <main className="max-w-[1600px] mx-auto px-8 py-12 w-full space-y-12 relative z-10">
        
        {/* Welcome Section / Hero HUD */}
        <section className="bg-[#080808] border border-white/5 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-1000"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-12 bg-cyan-500 rounded-full shadow-[0_0_20px_#06b6d4]"></div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">System Initialized.</h2>
            </div>
            <p className="text-slate-400 text-lg font-black uppercase tracking-[0.1em] leading-relaxed mb-10 italic">
              AWAITING BIOMETRIC VALIDATION. YOU HAVE <span className="text-cyan-400">4 URGENT CRITICAL PATHS</span> PENDING FOR THE ALPHA SESSION.
            </p>
            <div className="flex gap-6">
              <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all flex items-center gap-3 shadow-2xl active:scale-95">
                <Calendar size={18} />
                Manage Master Calendar
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/10 transition-all active:scale-95 text-slate-500 hover:text-white shadow-2xl">
                System Protocols
              </button>
            </div>
          </div>
          {/* Abstract HUD Decoration */}
          <div className="absolute top-[-20%] right-[-5%] w-96 h-96 bg-cyan-600 rounded-full blur-[140px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-[0.03] rotate-12 group-hover:rotate-6 group-hover:opacity-[0.07] transition-all duration-1000">
            <Stethoscope size={350} />
          </div>
        </section>

        {/* Stats Grid Matrix */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 hover:bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 shadow-2xl group border-l-4 border-l-transparent hover:border-l-cyan-500">
              <div className={`${stat.bg} ${stat.color} p-5 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Clinical Queue */}
          <section className="lg:col-span-8 bg-[#080808] border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                   <Clock size={20} />
                 </div>
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter">Alpha Session Queue</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-cyan-400 transition-colors" />
                  <input type="text" placeholder="SEARCH NODES..." className="bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-cyan-500/5 focus:border-cyan-500/20 outline-none w-64 transition-all" />
                </div>
                <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-700 hover:text-white transition-all shadow-2xl">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              {[
                { name: 'John Anderson', time: '10:00 AM', type: 'POST-OP PROTOCOL', status: 'CRITICAL', statusColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]' },
                { name: 'Sarah Chen', time: '11:15 AM', type: 'NEURAL CONSULTATION', status: 'OPTIMUM', statusColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
                { name: 'Michael Johnson', time: '12:00 PM', type: 'MOLECULAR REVIEW', status: 'UPLINK', statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
              ].map((appt, idx) => (
                <div key={idx} className="group flex items-center justify-between p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all hover:border-cyan-500/30 cursor-pointer shadow-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-black border border-white/5 rounded-2xl shadow-2xl flex items-center justify-center font-black text-slate-700 text-xl italic group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                      {appt.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-cyan-400 transition-all">{appt.name}</p>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-1">{appt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-right">
                      <p className="text-2xl font-black text-white italic tracking-tighter mb-2">{appt.time}</p>
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${appt.statusColor}`}>
                        {appt.status}
                      </span>
                    </div>
                    <ChevronRight size={24} className="text-slate-800 group-hover:text-cyan-400 transition-all group-hover:translate-x-2" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center gap-4 group hover:bg-white hover:text-black transition-all shadow-2xl font-black uppercase text-[10px] tracking-[0.5em] italic">
              <span>Access Master Schedule Database</span>
              <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </section>

          {/* Right Column: Tactical Tools HUD */}
          <section className="lg:col-span-4 space-y-10">
            <div className="bg-cyan-600 border border-cyan-400/30 p-10 rounded-[3.5rem] text-white shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10 leading-none">Clinical Nexus</h3>
              <div className="space-y-4">
                {[
                  { icon: FileText, label: 'E-PHARMA PROTOCOLS', count: '12' },
                  { icon: Activity, label: 'BIOMETRIC ORDERS', count: '05' },
                  { icon: ShieldCheck, label: 'REFERRAL UPLINK', count: '02' },
                ].map((tool, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-black/20 hover:bg-black/40 border border-white/10 transition-all text-left shadow-2xl group/item">
                    <div className="flex items-center gap-4">
                      <tool.icon size={22} className="group-hover/item:scale-110 transition-transform" />
                      <span className="font-black uppercase text-[10px] tracking-[0.2em]">{tool.label}</span>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black italic tracking-widest">{tool.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#080808] border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative group">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent animate-scan pointer-events-none"></div>
              <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mb-10 italic">Intelligence Feed</h3>
              <div className="space-y-8">
                {[
                  { user: 'CORE NURSE ALPHA', msg: 'PATIENT ANDERSON IN CHAMBER 402 READY FOR PROTOCOL.', time: '05M' },
                  { user: 'NEURAL LAB NODE', msg: 'MOLECULAR RESULTS READY FOR NODE ID #9201.', time: '12M' },
                ].map((note, i) => (
                  <div key={i} className="flex gap-6 group/note">
                    <div className="w-2 h-10 bg-cyan-500 rounded-full group-hover:h-12 transition-all shadow-[0_0_10px_#06b6d4]"></div>
                    <div>
                      <p className="text-[10px] font-black text-white mb-2 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">{note.user}</p>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic uppercase tracking-wide group-hover:text-slate-300 transition-colors">{note.msg}</p>
                      <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.3em] mt-3 block">{note.time} AGO</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
