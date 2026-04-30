import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (userType === 'doctor') {
      setTimeout(() => {
        setLoading(false);
        navigate('/doctor-login');
      }, 800);
    } else {
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* HUD Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent animate-scan"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-[2rem] mb-8 shadow-2xl relative group">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <Heart className="w-10 h-10 text-cyan-400" fill="currentColor" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none mb-3">
            MEDI<span className="text-cyan-400">SCAN</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20"></div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] italic">Access Node v9.4</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
        </div>

        {/* Main Access Card */}
        <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
          {/* Internal HUD elements */}
          <div className="absolute top-0 right-0 p-8 text-slate-800 pointer-events-none group-hover:text-cyan-500/20 transition-colors">
            <ShieldCheck size={40} />
          </div>
          
          <div className="mb-12 relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-3">Neural Link</h2>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Initialize secure medical session</p>
          </div>

          {/* User Type Matrix */}
          <div className="flex p-2 bg-black/40 border border-white/5 rounded-3xl mb-12 relative">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 z-10 ${
                userType === 'patient' 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-100' 
                : 'text-slate-700 hover:text-slate-400'
              }`}
            >
              <User size={16} />
              <span>Identity: Patient</span>
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 z-10 ${
                userType === 'doctor' 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-100' 
                : 'text-slate-700 hover:text-slate-400'
              }`}
            >
              <ShieldCheck size={16} />
              <span>Identity: Doctor</span>
            </button>
          </div>

          {/* Authentication Protocol */}
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="space-y-4">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Registry Email</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="USER@NEXUS.MED"
                  className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Passcode</label>
                <button type="button" className="text-[9px] font-black text-cyan-500/50 hover:text-cyan-400 transition-colors uppercase tracking-[0.4em]">LOST KEY?</button>
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-cyan-400 transition-all duration-500 shadow-2xl active:scale-95 group/btn"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Initialize Link</span>
                  <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Identity Migration */}
          <div className="mt-14 text-center border-t border-white/5 pt-10">
            <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">
              Node not registered?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-cyan-400 hover:text-white transition-colors underline underline-offset-8 decoration-cyan-500/20"
              >
                Sync New Identity
              </button>
            </p>
          </div>
        </div>

        {/* Global Security Markers */}
        <div className="mt-16 flex items-center justify-center gap-12 text-[8px] font-black text-slate-800 uppercase tracking-[0.6em]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_#06b6d4]"></div>
            <span>AES-256</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse shadow-[0_0_5px_#3b82f6]"></div>
            <span>RSA-4096</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
            <span>SSL-LINK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
