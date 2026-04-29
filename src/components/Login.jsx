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

    // Route to appropriate dashboard
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
    <div className="min-h-screen bg-black flex items-center justify-center p-6 sm:p-12 relative overflow-hidden font-sans">
      {/* Sharp Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Abstract monochrome shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full mb-6 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <Heart className="w-8 h-8 text-black" fill="black" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2 uppercase italic">
            Medi<span className="text-slate-400">Scan</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-slate-500 text-xs font-bold tracking-[0.3em] uppercase">
            <span>Precision</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span>Intelligence</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span>Care</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-neutral-900/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 sm:p-14 shadow-2xl">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white mb-3">Sign In</h2>
            <p className="text-slate-400 font-medium">Access the future of healthcare management.</p>
          </div>

          {/* User Type Switcher */}
          <div className="flex p-1.5 bg-black border border-white/5 rounded-2xl mb-10 relative">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-500 z-10 ${
                userType === 'patient' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-slate-500 hover:text-white'
              }`}
            >
              <User size={16} />
              <span>PATIENT</span>
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-500 z-10 ${
                userType === 'doctor' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-slate-500 hover:text-white'
              }`}
            >
              <ShieldCheck size={16} />
              <span>DOCTOR</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexus.com"
                  className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all duration-300 placeholder:text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Password</label>
                <a href="#" className="text-[10px] font-black text-white hover:text-slate-300 transition-colors uppercase tracking-widest">
                  Reset?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-white transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all duration-300 placeholder:text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-200 active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-xs font-bold tracking-wider uppercase">
              New to the platform?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-white hover:underline underline-offset-8 decoration-white/30"
              >
                Create Identity
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Legal Links */}
        <div className="mt-12 flex items-center justify-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <div className="w-1 h-1 bg-white/10 rounded-full"></div>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <div className="w-1 h-1 bg-white/10 rounded-full"></div>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
}
