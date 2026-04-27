import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Upload, AlertCircle, CheckCircle } from 'lucide-react';

export default function DoctorLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorId: '',
    email: '',
    password: '',
    idProofFile: null
  });

  const [errors, setErrors] = useState({});
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          idProofFile: 'File size must be less than 5MB'
        }));
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          idProofFile: 'Only JPG, PNG, or PDF files are allowed'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        idProofFile: file
      }));

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setIdProofPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setIdProofPreview(null);
      }

      setErrors(prev => ({
        ...prev,
        idProofFile: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.doctorId.trim()) {
      newErrors.doctorId = 'Doctor ID is required';
    } else if (!/^DOC\d{6}$/.test(formData.doctorId)) {
      newErrors.doctorId = 'Doctor ID format: DOC followed by 6 digits (e.g., DOC123456)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.idProofFile) {
      newErrors.idProofFile = 'ID proof document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate verification process
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);

      // Simulate successful verification after 2 seconds
      setTimeout(() => {
        sessionStorage.setItem('doctorLogged', JSON.stringify({
          doctorId: formData.doctorId,
          email: formData.email,
          verified: true
        }));
        navigate('/doctor-dashboard');
      }, 2000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful!</h2>
          <p className="text-gray-600 mb-6">Your ID proof has been verified. Redirecting to dashboard...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-10 group cursor-pointer" onClick={() => navigate('/login')}>
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-10 h-10 text-blue-600 animate-pulse" fill="#2563eb" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Medi<span className="text-blue-600">Scan</span>
          </h1>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-[2.5rem] p-10 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Doctor Login</h2>
            <p className="text-slate-500 font-medium">Secure doctor portal with ID verification</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor ID Field */}
            <div>
              <label htmlFor="doctorId" className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                Doctor ID
              </label>
              <input
                type="text"
                id="doctorId"
                name="doctorId"
                placeholder="DOC123456"
                value={formData.doctorId}
                onChange={handleInputChange}
                className={`input-field ${
                  errors.doctorId
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }`}
              />
              {errors.doctorId && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.doctorId}
                </div>
              )}
              <p className="text-slate-400 text-xs mt-1 ml-1">Format: DOC followed by 6 digits</p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="doctor@hospital.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={`input-field ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }`}
              />
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.password}
                </div>
              )}
            </div>

            {/* ID Proof Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                📄 Upload ID Proof
              </label>
              <p className="text-slate-500 text-sm mb-3 ml-1">
                Government-issued medical license or ID (JPG, PNG, or PDF)
              </p>

              <div className="relative">
                <input
                  type="file"
                  id="idProof"
                  name="idProof"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,application/pdf"
                  className="hidden"
                />
                <label
                  htmlFor="idProof"
                  className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-6 cursor-pointer transition ${
                    errors.idProofFile
                      ? 'border-red-500 bg-red-50/50 hover:bg-red-100/50'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 dark:border-slate-700 dark:bg-slate-800/50'
                  }`}
                >
                  <Upload size={24} className={errors.idProofFile ? 'text-red-500' : 'text-blue-600'} />
                  <div className="text-center">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {formData.idProofFile ? formData.idProofFile.name : 'Click to upload'}
                    </p>
                    <p className="text-slate-400 text-xs">Max size: 5MB</p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              {idProofPreview && (
                <div className="mt-4 animate-in fade-in zoom-in duration-300">
                  <p className="text-xs font-bold text-slate-500 mb-2 ml-1">Preview:</p>
                  <img
                    src={idProofPreview}
                    alt="ID Proof Preview"
                    className="w-full h-48 object-cover rounded-2xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
              )}

              {errors.idProofFile && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.idProofFile}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-[56px] text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                'Login & Verify'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-slate-500 font-medium">
            <p>Not a doctor?</p>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 font-bold hover:underline underline-offset-4"
            >
              Patient Login
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-4">
            <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed font-medium">
              🔒 <span className="font-bold">Security Notice:</span> Your ID proof will be securely verified and stored in compliance with medical regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
