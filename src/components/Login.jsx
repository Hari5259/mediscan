import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Activity, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-10 group">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-10 h-10 text-blue-600 animate-pulse" fill="#2563eb" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Medi<span className="text-blue-600">Scan</span>
          </h1>
          <p className="text-slate-500 font-medium tracking-wide flex items-center justify-center gap-2">
            Advanced Health Intelligence <Activity size={16} className="text-blue-400" />
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-[2.5rem] p-10 sm:p-12">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Enter your credentials to access your health portal</p>
          </div>

          {/* User Type Switcher */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-10 relative">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 z-10 ${
                userType === 'patient' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User size={18} />
              <span>Patient</span>
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 z-10 ${
                userType === 'doctor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Activity size={18} />
              <span>Doctor</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 group mt-4 h-[56px] text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Legal Links */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm font-semibold text-slate-400">
          <a href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
          <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
