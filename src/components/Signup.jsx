import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Shield, ArrowRight, UserPlus, Stethoscope } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-apple selection:bg-[#0071E3]/20">
      <div className="w-full max-w-[600px] animate-fade-in py-12">
        {/* Logo Section */}
        <div className="text-center mb-10 cursor-pointer" onClick={() => navigate('/login')}>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#0071E3] rounded-[16px] mb-4 shadow-lg shadow-[#0071E3]/10 transition-transform hover:scale-105">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1D1D1F]">MediScan</h1>
        </div>

        {/* Signup Card */}
        <div className="apple-card p-10 bg-white border border-black/5 shadow-2xl">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-[24px] font-semibold text-[#1D1D1F] mb-1">Create Account</h2>
            <p className="text-[15px] text-[#86868B]">Join the next generation of healthcare.</p>
          </div>

          {/* User Type Switcher */}
          <div className="flex p-1 bg-[#F2F2F7] rounded-full mb-10">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'patient' })}
              className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-2 ${
                formData.userType === 'patient' 
                ? 'bg-white text-[#1D1D1F] shadow-sm' 
                : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <User size={16} /> Patient
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'doctor' })}
              className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-2 ${
                formData.userType === 'doctor' 
                ? 'bg-white text-[#1D1D1F] shadow-sm' 
                : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <Stethoscope size={16} /> Doctor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="apple-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="apple-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="apple-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className="apple-input"
                  required
                />
              </div>
            </div>

            {formData.userType === 'doctor' && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-[13px] font-semibold ml-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology"
                  className="apple-input"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="apple-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold ml-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="apple-input"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#F5F5F7] rounded-[18px]">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[#D2D2D7] text-[#0071E3] focus:ring-[#0071E3]" required />
              <p className="text-[12px] text-[#86868B] leading-snug">
                I agree to the <a href="/terms" className="text-[#0071E3] font-medium hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#0071E3] font-medium hover:underline">Privacy Policy</a>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full apple-button apple-button-primary mt-4 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Create Account</span>
                  <ArrowRight size={18} className="ml-auto transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-[#F2F2F7] pt-8">
            <p className="text-[14px] text-[#86868B]">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#0071E3] font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
