import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Phone, Activity, ArrowRight, UserPlus, Stethoscope } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'patient', // 'patient' or 'doctor'
    specialization: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      <div className="w-full max-w-3xl relative z-10 py-12">
        {/* Logo Section */}
        <div className="text-center mb-12 group cursor-pointer" onClick={() => navigate('/login')}>
          <div className="inline-flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-[2rem] mb-6 shadow-2xl relative group-hover:scale-110 transition-all duration-500">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <Heart className="w-10 h-10 text-cyan-400" fill="currentColor" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-3">
            MEDI<span className="text-cyan-400">SCAN</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20"></div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] italic">Identity Provisioning Node</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
        </div>

        {/* Main Enrollment Card */}
        <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
          <div className="mb-12 relative z-10 text-center md:text-left">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-3">Account Enrollment</h2>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Initialize your neural health profile</p>
          </div>

          {/* Identity Matrix Switcher */}
          <div className="flex p-2 bg-black/40 border border-white/5 rounded-3xl mb-12 relative">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'patient' })}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 z-10 ${
                formData.userType === 'patient' 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                : 'text-slate-700 hover:text-slate-400'
              }`}
            >
              <User size={18} />
              <span>Identity: Patient</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'doctor' })}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 z-10 ${
                formData.userType === 'doctor' 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                : 'text-slate-700 hover:text-slate-400'
              }`}
            >
              <Stethoscope size={18} />
              <span>Identity: Doctor</span>
            </button>
          </div>

          {/* Enrollment Protocol Form */}
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">GIVEN NAME</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="EX: JOHN"
                  className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">SURNAME</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="EX: DOE"
                  className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Registry Email</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="USER@NEXUS.MED"
                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase"
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">COMMUNICATION LINK</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+00 (000) 000-0000"
                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase"
                    required
                  />
                </div>
              </div>
            </div>

            {formData.userType === 'doctor' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">CLINICAL SPECIALIZATION</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Stethoscope size={18} />
                  </div>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="EX: NEUROSURGERY"
                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase"
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Neural Passcode</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900"
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Re-verify Passcode</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-700 group-focus-within/input:text-cyan-400 transition-colors">
                    <Activity size={18} />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 pl-14 text-white focus:outline-none focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 px-4 py-4 bg-white/[0.02] border border-white/5 rounded-3xl group/terms hover:bg-white/[0.04] transition-all">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/10 bg-black text-cyan-500 focus:ring-cyan-500/50" required />
              <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] leading-relaxed">
                I AUTHORIZE THE NEURAL LINK PROTOCOL AND AGREE TO THE <a href="/terms" className="text-cyan-500 hover:text-white transition-colors">TERMS OF SERVICE</a> AND <a href="/privacy" className="text-cyan-500 hover:text-white transition-colors">PRIVACY ARCHIVE</a>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-cyan-400 transition-all duration-500 shadow-2xl active:scale-95 group/btn mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>INITIALIZE IDENTITY ENROLLMENT</span>
                  <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform ml-auto" />
                </>
              )}
            </button>
          </form>

          {/* Identity Link */}
          <div className="mt-14 text-center border-t border-white/5 pt-10">
            <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">
              IDENTITY ALREADY PROVISIONED?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:text-white transition-colors underline underline-offset-8 decoration-cyan-500/20"
              >
                ACCESS SESSION
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
