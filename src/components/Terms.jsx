import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 py-16 px-6 relative overflow-x-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent animate-scan"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-105 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-12 shadow-2xl"
          >
            <ChevronLeft size={18} />
            Sector Return
          </button>

          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-6 bg-white/5 border border-white/10 rounded-[2.5rem] mb-10 shadow-2xl relative group">
              <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-10"></div>
              <Heart className="w-12 h-12 text-cyan-400" fill="currentColor" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-4 leading-none">Terms of <span className="text-cyan-400">Operation</span></h1>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Protocol compliance & user authorization</p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-12 space-y-16 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 text-slate-900 pointer-events-none opacity-[0.03]">
            <ShieldCheck size={200} />
          </div>

          {/* Introduction */}
          <section className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                1. Initial Protocol
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium text-lg italic">
              Welcome to MediScan. These operational protocols govern your access to our neural diagnostic core, clinical archives, and specialist network. By initializing a session, you agree to these clinical parameters.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="relative z-10">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                2. Node Responsibilities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Provide accurate biometric information',
                'Maintain neural key confidentiality',
                'Authorized clinical use only',
                'No third-party node sharing',
                'Compliance with global bio-laws',
                'No platform reverse-engineering'
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4 group hover:bg-white/[0.04] transition-all">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="relative z-10 p-10 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem]">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic text-rose-500">
                3. Tactical Warning
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-black uppercase text-[10px] tracking-[0.2em]">
              MEDISCAN PROVIDES ADVISORY DIAGNOSTIC DATA. INFORMATION GENERATED BY THE NEURAL CORE IS NOT A SUBSTITUTE FOR SPECIALIST INTERVENTION. ALWAYS VALIDATE DATA WITH A BIOLOGICAL SPECIALIST.
            </p>
          </section>

          {/* Contact */}
          <section className="relative z-10 pt-10 border-t border-white/5">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8 italic">Operational Command</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                 <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2">Legal Node</p>
                 <p className="text-xs font-black text-cyan-400 italic">LEGAL@MEDISCAN.CORE</p>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                 <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2">Support ID</p>
                 <p className="text-xs font-black text-white italic">+1 (800) MEDI-CORE</p>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                 <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-2">HQ Sector</p>
                 <p className="text-xs font-black text-white italic">CYBER CITY, S-7</p>
               </div>
            </div>
          </section>

          {/* Last Updated */}
          <div className="pt-10 flex items-center justify-between">
            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
              ARCHIVE VERSION: 9.4.2026
            </p>
            <div className="flex gap-2">
               {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: `${i*0.5}s` }}></div>)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16 pb-20">
          <button
            onClick={() => navigate('/signup')}
            className="flex-1 bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95"
          >
            AUTHORIZE COMPLIANCE
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-white/5 border border-white/10 text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-white/10 transition-all"
          >
            REJECT PROTOCOL
          </button>
        </div>
      </div>
    </div>
  );
}
