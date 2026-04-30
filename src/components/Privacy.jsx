import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';

export default function Privacy() {
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
              <ShieldCheck className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-4 leading-none">Privacy <span className="text-cyan-400">Vault</span></h1>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Biometric data protection & neural security</p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-12 space-y-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-slate-900 pointer-events-none opacity-[0.03]">
            <Lock size={200} />
          </div>

          {/* Introduction */}
          <section className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                1. Security Mandate
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium text-lg italic">
              MediScan is engineered for absolute biometric confidentiality. This mandate outlines how your clinical data, diagnostic history, and personal identifiers are encrypted, stored, and protected within the neural vault.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="relative z-10">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                2. Data Extraction
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-6">Identity Vectors</h3>
                <ul className="space-y-4">
                  {['Personal Identifiers', 'Biometric Coordinates', 'Neural Access History', 'Financial Metadata'].map((item, i) => (
                    <li key={i} className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                      <div className="w-1 h-1 bg-cyan-500/30 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">Clinical Vectors</h3>
                <ul className="space-y-4">
                  {['Diagnostic History', 'Molecular Scan Results', 'Consultation Logs', 'Vital Baseline Data'].map((item, i) => (
                    <li key={i} className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                      <div className="w-1 h-1 bg-indigo-500/30 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="relative z-10">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                3. Encryption Protocol
              </h2>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
               <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 animate-pulse">
                  <ShieldCheck size={40} />
               </div>
               <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                 ALL NEURAL DATA IS ENCRYPTED VIA AES-256 QUANTUM-RESISTANT ALGORITHMS. DATA IS SHARDED ACROSS SECURE NODES WITH ZERO-KNOWLEDGE ARCHITECTURE.
               </p>
            </div>
          </section>

          {/* Contact */}
          <section className="relative z-10 pt-10 border-t border-white/5">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8 italic">Privacy Control Node</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-6">
                 <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400"><Mail size={20} /></div>
                 <div>
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">DPO Contact</p>
                   <p className="text-xs font-black text-white italic">PRIVACY@MEDISCAN.CORE</p>
                 </div>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-6">
                 <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400"><Lock size={20} /></div>
                 <div>
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Security Node</p>
                   <p className="text-xs font-black text-white italic">SECURE.MEDISCAN.HQ</p>
                 </div>
               </div>
            </div>
          </section>

          {/* Last Updated */}
          <div className="pt-10 flex items-center justify-between border-t border-white/5">
            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
              VAULT VERSION: 2.1.2026
            </p>
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">ALL SYSTEMS PROTECTED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16 pb-20">
          <button
            onClick={() => navigate('/signup')}
            className="flex-1 bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95"
          >
            I UNDERSTAND
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-white/5 border border-white/10 text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-white/10 transition-all"
          >
            SECTOR RETURN
          </button>
        </div>
      </div>
    </div>
  );
}
