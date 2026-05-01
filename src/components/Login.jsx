import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Shield, ArrowRight, Briefcase, Heart, AlertCircle } from 'lucide-react';

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
    <div className="bg-immersive min-h-screen flex flex-col">
      {/* Mini Nav for Login */}
      <nav className="px-12 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Shield size={24} className="text-[#008cff]" />
          </div>
          <span className="text-white font-black text-2xl italic tracking-tighter">MEDI<span className="text-blue-400">SCAN</span></span>
        </div>
        <div className="flex items-center gap-8 text-white/80 text-[12px] font-black uppercase tracking-widest">
          <button className="hover:text-blue-400">Support</button>
          <button className="hover:text-blue-400">Corporate</button>
          <div className="w-4 h-4 rounded-full bg-white/20"></div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pb-24">
        <div className="main-floating-card w-full max-w-[500px] p-12 animate-slide-up">
          <div className="text-center mb-12">
            <h1 className="text-[36px] font-black tracking-tighter leading-tight mb-2">Access Portal</h1>
            <p className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">Secure Medical Synchronization</p>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-full mb-10 border border-gray-200">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${
                userType === 'patient' 
                ? 'bg-[#008cff] text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Patient Node
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${
                userType === 'doctor' 
                ? 'bg-[#008cff] text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Clinical Pro
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Registry Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexus.med"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
                <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Neural Key</label>
                <button type="button" className="text-[11px] text-[#008cff] font-black uppercase hover:underline">Recover</button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
                <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-search !text-[18px] py-4 mt-4 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>INITIALIZE SYNC</span>
                  <ArrowRight size={22} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center border-t border-gray-100 pt-10">
            <p className="text-[14px] font-bold text-gray-500">
              New to MediScan?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-[#008cff] font-black hover:underline"
              >
                CREATE IDENTITY
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="px-12 py-8 flex justify-between items-center bg-black/40 backdrop-blur-sm relative z-10">
        <div className="flex gap-10">
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <Shield size={14} />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <Heart size={14} />
            <span>End-to-End Encryption</span>
          </div>
        </div>
        <p className="text-white/20 text-[10px] font-black tracking-widest">© 2026 MEDISCAN CORE SYSTEMS</p>
      </footer>
    </div>
  );
}
