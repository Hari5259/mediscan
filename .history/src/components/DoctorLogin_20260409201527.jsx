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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-2">
          <Heart className="w-8 h-8 text-blue-600" fill="currentColor" />
          <h1 className="text-2xl font-bold text-gray-900">MediCare</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Doctor Login</h2>
            <p className="text-gray-600">Secure doctor portal with ID verification</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor ID Field */}
            <div>
              <label htmlFor="doctorId" className="block text-gray-700 font-semibold mb-2">
                Doctor ID
              </label>
              <input
                type="text"
                id="doctorId"
                name="doctorId"
                placeholder="DOC123456"
                value={formData.doctorId}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.doctorId
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.doctorId && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.doctorId}
                </div>
              )}
              <p className="text-gray-500 text-xs mt-1">Format: DOC followed by 6 digits</p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="doctor@hospital.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
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
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
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
              <label className="block text-gray-700 font-semibold mb-2">
                📄 Upload ID Proof
              </label>
              <p className="text-gray-600 text-sm mb-3">
                Please upload a clear copy of your government-issued medical license or ID (JPG, PNG, or PDF)
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
                  className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer transition ${
                    errors.idProofFile
                      ? 'border-red-500 bg-red-50 hover:bg-red-100'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Upload size={24} className={errors.idProofFile ? 'text-red-500' : 'text-blue-600'} />
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {formData.idProofFile ? formData.idProofFile.name : 'Click to upload'}
                    </p>
                    <p className="text-gray-600 text-sm">Max size: 5MB</p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              {idProofPreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={idProofPreview}
                    alt="ID Proof Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Verifying ID...
                </>
              ) : (
                'Login & Verify'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t flex items-center justify-center gap-2 text-gray-600 text-sm">
            <p>Not a doctor?</p>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Patient Login
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-gray-600">
              🔒 <span className="font-semibold">Security Notice:</span> Your ID proof will be securely verified and stored in compliance with medical regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
