import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Shield, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-apple selection:bg-[#0071E3]/20">
      <div className="w-full max-w-[440px] animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0071E3] rounded-[18px] mb-6 shadow-lg shadow-[#0071E3]/20 transition-transform hover:scale-105">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">MediScan</h1>
          <p className="text-[17px] text-[#86868B] mt-1">Your health, refined.</p>
        </div>

        {/* Login Card */}
        <div className="apple-card p-10 bg-white border border-black/5 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-[24px] font-semibold text-[#1D1D1F] mb-1">Welcome Back</h2>
            <p className="text-[15px] text-[#86868B]">Sign in to your secure health node.</p>
          </div>

          {/* Segmented Control (iOS Style) */}
          <div className="flex p-1 bg-[#F2F2F7] rounded-full mb-8">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 py-2 rounded-full text-[13px] font-semibold transition-all ${
                userType === 'patient' 
                ? 'bg-white text-[#1D1D1F] shadow-sm' 
                : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 py-2 rounded-full text-[13px] font-semibold transition-all ${
                userType === 'doctor' 
                ? 'bg-white text-[#1D1D1F] shadow-sm' 
                : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Doctor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold ml-1 text-[#1D1D1F]">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="apple-input"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[13px] font-semibold text-[#1D1D1F]">Password</label>
                <button type="button" className="text-[13px] text-[#0071E3] hover:underline font-medium">Forgot?</button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="apple-input"
                  required
                />
              </div>
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
                  <span>Sign In</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-[#F2F2F7] pt-8">
            <p className="text-[14px] text-[#86868B]">
              New to MediScan?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-[#0071E3] font-semibold hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex items-center justify-center gap-8 text-[11px] font-medium text-[#86868B] uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-[#34C759] rounded-full" />
            Secure
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-[#34C759] rounded-full" />
            Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-[#34C759] rounded-full" />
            HIPAA Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
