import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Shield, ArrowRight, UserPlus, Stethoscope, Heart } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'patient',
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
    <div className="bg-immersive min-h-screen flex flex-col">
      <nav className="px-12 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/login')}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Shield size={24} className="text-[#008cff]" />
          </div>
          <span className="text-white font-black text-2xl italic tracking-tighter">MEDI<span className="text-blue-400">SCAN</span></span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 py-24">
        <div className="main-floating-card w-full max-w-[700px] p-14 animate-slide-up">
          <div className="text-center mb-12">
            <h1 className="text-[42px] font-black tracking-tighter leading-tight mb-2">Create Identity</h1>
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest">Join the Global Healthcare Node</p>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-full mb-12 border border-gray-200 w-fit mx-auto px-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'patient' })}
              className={`px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                formData.userType === 'patient' 
                ? 'bg-[#008cff] text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <User size={16} /> Patient
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'doctor' })}
              className={`px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                formData.userType === 'doctor' 
                ? 'bg-[#008cff] text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Stethoscope size={16} /> Doctor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Given Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Surname</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Registry</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@nexus.med"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Link</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
            </div>

            {formData.userType === 'doctor' && (
              <div className="space-y-3 animate-slide-up">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Clinical Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Neural Key</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Verify Key</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-4 text-[16px] font-bold focus:border-[#008cff] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-search !text-[18px] py-4 mt-6 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus size={22} />
                  <span>INITIALIZE ENROLLMENT</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center border-t border-gray-100 pt-10">
            <p className="text-[14px] font-bold text-gray-500">
              Already provisioned?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#008cff] font-black hover:underline"
              >
                ACCESS SESSION
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="px-12 py-8 flex justify-between items-center bg-black/40 backdrop-blur-sm relative z-10">
        <div className="flex gap-10">
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <Shield size={14} />
            <span>Identity Secured</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <Heart size={14} />
            <span>Privacy Ensured</span>
          </div>
        </div>
        <p className="text-white/20 text-[10px] font-black tracking-widest">© 2026 MEDISCAN CORE SYSTEMS</p>
      </footer>
    </div>
  );
}
