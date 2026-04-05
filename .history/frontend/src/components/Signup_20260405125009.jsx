import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff } from 'lucide-react';

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
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) { setError('First and last name are required'); return false; }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Please enter a valid email address'); return false; }
    if (!formData.phone.match(/^\+?[\d\s()-]{10,}$/)) { setError('Please enter a valid phone number'); return false; }
    if (formData.password.length < 8) { setError('Password must be at least 8 characters'); return false; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return false; }
    if (!agreeToTerms) { setError('You must agree to the terms and conditions'); return false; }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('pendingVerification', JSON.stringify({ email: formData.email, phone: formData.phone, userType: formData.userType }));
      navigate('/verify');
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#f8fafc, #eef2ff)' }}>
      <div className="container max-w-5xl auth-grid">
        <div className="hidden lg:block rounded-xl p-8" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(59,130,246,0.03))' }}>
          <div className="flex flex-col h-full justify-center gap-6">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-blue-600" fill="currentColor" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create your MediCare account</h2>
                <p className="text-muted small">Quick setup for patients and doctors</p>
              </div>
            </div>

            <div>
              <p className="text-muted">By creating an account, you can manage appointments, access records, and communicate securely with providers.</p>
            </div>

            <ul className="mt-4 text-muted list-disc ml-5">
              <li>Secure data storage</li>
              <li>Verified healthcare professionals</li>
              <li>Easy scheduling</li>
            </ul>
          </div>
        </div>

        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <Heart className="w-12 h-12 text-blue-600" fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-muted small">It takes less than a minute</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md"><p className="text-red-700 small">{error}</p></div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Register as</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="userType" value="patient" checked={formData.userType === 'patient'} onChange={handleChange} className="w-4 h-4 text-blue-600" /><span className="ml-2">Patient</span></label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="userType" value="doctor" checked={formData.userType === 'doctor'} onChange={handleChange} className="w-4 h-4 text-blue-600" /><span className="ml-2">Doctor</span></label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">First name</label><input name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Last name</label><input name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" required /></div>
              </div>

              <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} className="input-field" required /><p className="text-xs text-muted mt-1">We'll send a verification code to this email</p></div>

              <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone</label><input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="input-field" required /><p className="text-xs text-muted mt-1">We'll send an OTP to this number</p></div>

              <div className="relative"><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="input-field pr-10" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>

              <div className="relative"><label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label><input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field pr-10" required /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-500">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>

              <div className="flex items-start gap-3"><input id="agree" type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="w-4 h-4 mt-1" /><label htmlFor="agree" className="text-sm text-gray-700">I agree to the <button type="button" onClick={() => navigate('/terms')} className="text-blue-600">Terms</button> and <button type="button" onClick={() => navigate('/privacy')} className="text-blue-600">Privacy</button></label></div>

              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating account...' : 'Create account'}</button>
            </form>

            <div className="divider"><span>or</span></div>

            <p className="text-center text-muted small">Already have an account? <button onClick={() => navigate('/login')} className="text-blue-600 font-medium">Sign in</button></p>
          </div>

          <p className="text-center text-muted small mt-4">Your data is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
}
