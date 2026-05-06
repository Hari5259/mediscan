import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, ArrowRight, Heart, Globe, Cpu, Zap } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(userType === 'doctor' ? '/doctor-login' : '/dashboard');
    }, 1200);
  };

  return (
    <div className="bg-immersive min-h-screen flex flex-col overflow-hidden perspective-1000">
      {/* Animated 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        {/* Floating 3D Icons */}
        <div className="absolute top-[20%] right-[20%] animate-bounce transition-all duration-[3000ms] opacity-20">
          <Cpu size={120} className="text-blue-400 rotate-12" />
        </div>
        <div className="absolute bottom-[30%] left-[15%] animate-bounce transition-all duration-[4000ms] opacity-20">
          <Globe size={80} className="text-blue-300 -rotate-12" />
        </div>
      </div>

      {/* Mini Nav */}
      <nav className="px-12 py-8 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,140,255,0.3)] group-hover:rotate-12 transition-transform duration-500">
            <Shield size={28} className="text-[#008cff]" />
          </div>
          <span className="text-white font-black text-3xl italic tracking-tighter drop-shadow-lg">
            MEDI<span className="text-blue-400">SCAN</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80 text-[13px] font-black uppercase tracking-widest">
          <button className="hover:text-blue-400 transition-colors">Protocol Support</button>
          <button className="hover:text-blue-400 transition-colors">Network Status</button>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Zap size={18} className="text-yellow-400" />
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-[540px] transition-all duration-500 hover:scale-[1.02] transform-gpu">
          <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[32px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_30px_60px_-30px_rgba(0,0,0,0.3),inset_0_-2px_20px_rgba(0,0,0,0.05)] border border-white/20 relative overflow-hidden group">
            
            {/* Top Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6 shadow-inner">
                <Lock size={32} className="text-[#008cff]" />
              </div>
              <h1 className="text-[42px] font-black tracking-tighter leading-tight mb-2 text-gray-900 drop-shadow-sm">Access Portal</h1>
              <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                Secure Medical Synchronization
              </p>
            </div>

            <div className="flex p-1.5 bg-gray-100/80 rounded-2xl mb-10 shadow-inner border border-gray-200/50">
              <button
                onClick={() => setUserType('patient')}
                className={`flex-1 py-3.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-500 ${
                  userType === 'patient' 
                  ? 'bg-white text-[#008cff] shadow-[0_10px_20px_rgba(0,0,0,0.1)] scale-100' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                }`}
              >
                Patient Node
              </button>
              <button
                onClick={() => setUserType('doctor')}
                className={`flex-1 py-3.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-500 ${
                  userType === 'doctor' 
                  ? 'bg-white text-[#008cff] shadow-[0_10px_20px_rgba(0,0,0,0.1)] scale-100' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                }`}
              >
                Clinical Pro
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3 group/field">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-[#008cff]">Registry Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@nexus.med"
                    className="w-full bg-white border-2 border-gray-100 rounded-[16px] px-6 py-5 text-[16px] font-bold focus:border-[#008cff] focus:shadow-[0_10px_30px_rgba(0,140,255,0.1)] outline-none transition-all placeholder:text-gray-300 shadow-sm"
                    required
                  />
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-[#008cff] transition-colors" size={22} />
                </div>
              </div>

              <div className="space-y-3 group/field">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest transition-colors group-focus-within/field:text-[#008cff]">Secure Password</label>
                  <button type="button" className="text-[11px] text-[#008cff] font-black uppercase hover:underline tracking-tighter">Reset Password</button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border-2 border-gray-100 rounded-[16px] px-6 py-5 text-[16px] font-bold focus:border-[#008cff] focus:shadow-[0_10px_30px_rgba(0,140,255,0.1)] outline-none transition-all placeholder:text-gray-300 shadow-sm"
                    required
                  />
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-[#008cff] transition-colors" size={22} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#008cff] to-[#0056cc] transition-transform duration-500 group-hover/btn:scale-110"></div>
                <div className="relative py-5 px-8 flex items-center justify-center gap-3 text-white font-black text-[18px] tracking-widest uppercase">
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>INITIALIZE SYNC</span>
                      <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform" />
                    </>
                  )}
                </div>
                {/* 3D Reflection Effect */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-white/20 skew-x-[-25deg] group-hover/btn:left-[150%] transition-all duration-700"></div>
              </button>
            </form>

            <div className="mt-10 text-center border-t border-gray-100 pt-8">
              <p className="text-[14px] font-bold text-gray-400">
                New to MediScan?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-[#008cff] font-black hover:underline hover:scale-105 transition-transform inline-block"
                >
                  CREATE IDENTITY
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-12 py-10 flex flex-col md:flex-row justify-between items-center bg-black/60 backdrop-blur-xl border-t border-white/5 relative z-20">
        <div className="flex gap-10 mb-6 md:mb-0">
          <div className="flex items-center gap-2 text-white/40 text-[11px] font-black uppercase tracking-widest hover:text-white/60 transition-colors cursor-default">
            <Shield size={16} className="text-blue-500/50" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-[11px] font-black uppercase tracking-widest hover:text-white/60 transition-colors cursor-default">
            <Heart size={16} className="text-rose-500/50" />
            <span>End-to-End Encryption</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/20 text-[11px] font-black tracking-[0.2em] mb-1">© 2026 MEDISCAN CORE SYSTEMS</p>
          <p className="text-white/10 text-[9px] font-bold uppercase tracking-widest">Global Bio-Diagnostic Network v4.2.0</p>
        </div>
      </footer>
    </div>
  );
}

