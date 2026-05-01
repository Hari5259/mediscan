import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, AlertCircle, CheckCircle, ChevronLeft, ArrowRight, FileText, Lock, Mail } from 'lucide-react';

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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, idProofFile: 'File size exceeds 5MB limit' }));
        return;
      }
      setFormData(prev => ({ ...prev, idProofFile: file }));
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setIdProofPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setIdProofPreview(null);
      }
      setErrors(prev => ({ ...prev, idProofFile: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.doctorId.trim()) newErrors.doctorId = 'Registry ID required';
    if (!formData.email.trim()) newErrors.email = 'Secure email required';
    if (!formData.password) newErrors.password = 'Neural passcode required';
    if (!formData.idProofFile) newErrors.idProofFile = 'Identity proof mandatory';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        sessionStorage.setItem('doctorLogged', JSON.stringify({
          doctorId: formData.doctorId,
          email: formData.email,
          verified: true
        }));
        navigate('/doctor-dashboard');
      }, 2500);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-immersive min-h-screen flex items-center justify-center p-6">
        <div className="main-floating-card w-full max-w-[500px] p-16 text-center space-y-10 animate-slide-up">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-xl shadow-green-100">
            <CheckCircle size={56} />
          </div>
          <div>
            <h2 className="text-[32px] font-black tracking-tighter italic uppercase">Identity Verified</h2>
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Establishing secure neural uplink...</p>
          </div>
          <div className="flex justify-center">
            <div className="h-1.5 w-48 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 animate-[scan_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-immersive min-h-screen flex flex-col">
      <nav className="px-12 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/login')}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Shield size={24} className="text-[#008cff]" />
          </div>
          <span className="text-white font-black text-2xl italic tracking-tighter">CLINICAL<span className="text-blue-400">ACCESS</span></span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-white text-[12px] font-black uppercase tracking-widest hover:text-blue-400"
        >
          <ChevronLeft size={16} /> Patient Access
        </button>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pb-24">
        <div className="main-floating-card w-full max-w-[800px] p-14 animate-slide-up">
          <div className="text-center mb-12">
            <h1 className="text-[42px] font-black tracking-tighter leading-tight mb-2 italic">Specialist Login</h1>
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest">Biometric & Clinical Credentials Required</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Registry ID</label>
                <div className="relative">
                  <input
                    type="text"
                    name="doctorId"
                    placeholder="EX: DOC123456"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border-2 rounded-[12px] px-6 py-4 text-[16px] font-bold outline-none transition-all ${
                      errors.doctorId ? 'border-red-500' : 'border-gray-100 focus:border-[#008cff]'
                    }`}
                    required
                  />
                  <FileText className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="dr.nexus@med.pro"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border-2 rounded-[12px] px-6 py-4 text-[16px] font-bold outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-100 focus:border-[#008cff]'
                    }`}
                    required
                  />
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Neural Key</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border-2 rounded-[12px] px-6 py-4 text-[16px] font-bold outline-none transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-100 focus:border-[#008cff]'
                    }`}
                    required
                  />
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Proof Artifact</label>
                <div className="relative">
                  <input
                    type="file"
                    id="idProof"
                    name="idProof"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="hidden"
                  />
                  <label
                    htmlFor="idProof"
                    className={`flex flex-col items-center justify-center gap-6 border-2 border-dashed rounded-[24px] p-10 cursor-pointer transition-all duration-500 ${
                      errors.idProofFile ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-[#008cff] hover:bg-blue-50'
                    }`}
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#008cff] shadow-md">
                      <Upload size={28} />
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-black uppercase tracking-widest mb-1">
                        {formData.idProofFile ? formData.idProofFile.name : 'Link Artifact'}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JPG, PNG OR PDF (MAX 5MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              {idProofPreview && (
                <div className="animate-slide-up bg-gray-50 p-4 rounded-[16px] border border-gray-200">
                  <img src={idProofPreview} alt="Preview" className="w-full h-32 object-cover rounded-[12px] grayscale hover:grayscale-0 transition-all" />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-search !text-[16px] py-4 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>AUTHORIZE SESSION</span>
                    <ArrowRight size={22} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
