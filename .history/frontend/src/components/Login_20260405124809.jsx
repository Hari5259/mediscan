import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#f8fafc, #eef2ff)' }}>
      <div className="container max-w-5xl auth-grid">
        {/* Left promo panel for larger screens */}
        <div className="hidden lg:block rounded-xl p-8" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(59,130,246,0.04))' }}>
          <div className="flex flex-col h-full justify-center gap-6">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-blue-600" fill="currentColor" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">MediCare</h2>
                <p className="text-muted small">Professional healthcare management</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Secure. Reliable. Human.</h3>
              <p className="text-muted mt-2">Manage appointments, records and consultations in one modern platform designed for healthcare professionals and patients.</p>
            </div>

            <ul className="mt-4 text-muted list-disc ml-5">
              <li>HIPAA-aligned practices</li>
              <li>End-to-end encryption</li>
              <li>24/7 clinical support</li>
            </ul>
          </div>
        </div>

        {/* Auth card */}
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <Heart className="w-12 h-12 text-blue-600" fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-muted small">Sign in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-field" required />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="userType" value="patient" checked={userType === 'patient'} onChange={(e) => setUserType(e.target.value)} className="w-4 h-4 text-blue-600" />
                    <span className="ml-2 text-sm">Patient</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="userType" value="doctor" checked={userType === 'doctor'} onChange={(e) => setUserType(e.target.value)} className="w-4 h-4 text-blue-600" />
                    <span className="ml-2 text-sm">Doctor</span>
                  </label>
                </div>

                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Signing in...' : 'Sign in'}</button>
            </form>

            <div className="divider"><span>or</span></div>

            <p className="text-center text-muted small">Don’t have an account? <button onClick={() => navigate('/signup')} className="text-blue-600 font-medium">Create account</button></p>
          </div>

          <p className="text-center text-muted small mt-4">By signing in you agree to our <a href="/terms" className="text-blue-600">Terms</a></p>
        </div>
      </div>
    </div>
  );
}
