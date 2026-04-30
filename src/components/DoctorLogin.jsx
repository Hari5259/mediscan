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
          idProofFile: 'File size exceeds 5MB limit'
        }));
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          idProofFile: 'Invalid file format: JPG, PNG, or PDF required'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        idProofFile: file
      }));

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
      newErrors.doctorId = 'Registry ID required';
    } else if (!/^DOC\d{6}$/.test(formData.doctorId)) {
      newErrors.doctorId = 'Format: DOC+6-DIGIT_SEQ';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Secure email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email syntax';
    }

    if (!formData.password) {
      newErrors.password = 'Neural passcode required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Min. 6 characters required';
    }

    if (!formData.idProofFile) {
      newErrors.idProofFile = 'Identity proof mandatory';
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
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
            <CheckCircle className="w-24 h-24 text-emerald-500 relative z-10 mx-auto" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Identity Verified</h2>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Establishing secure neural uplink to Command Center...</p>
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 animate-[scan_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent animate-scan"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-12 group cursor-pointer" onClick={() => navigate('/login')}>
          <div className="inline-flex items-center justify-center p-5 bg-white/5 border border-white/10 rounded-[2rem] mb-6 shadow-2xl relative group-hover:scale-110 transition-all duration-500">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-10"></div>
            <Heart className="w-10 h-10 text-cyan-400" fill="currentColor" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-3">
            MEDI<span className="text-cyan-400">SCAN</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20"></div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] italic">Specialist Verification Node</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
        </div>

        {/* Main Enrollment Card */}
        <div className="bg-[#080808] border border-white/5 rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
          <div className="mb-12 relative z-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-3">Specialist Login</h2>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Credentials & Biometric Validation required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Doctor ID Field */}
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Registry ID</label>
                <input
                  type="text"
                  name="doctorId"
                  placeholder="EX: DOC123456"
                  value={formData.doctorId}
                  onChange={handleInputChange}
                  className={`w-full bg-black border rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase ${
                    errors.doctorId ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-cyan-500/30'
                  }`}
                />
                {errors.doctorId && (
                  <div className="flex items-center gap-2 px-4 text-rose-500 text-[10px] font-black uppercase tracking-widest italic">
                    <AlertCircle size={14} />
                    {errors.doctorId}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Secure Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="DR.NEXUS@MED.PRO"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-black border rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 uppercase ${
                    errors.email ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-cyan-500/30'
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-2 px-4 text-rose-500 text-[10px] font-black uppercase tracking-widest italic">
                    <AlertCircle size={14} />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-4">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Neural Passcode</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full bg-black border rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/5 transition-all font-black text-xs tracking-widest placeholder:text-slate-900 ${
                  errors.password ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-cyan-500/30'
                }`}
              />
              {errors.password && (
                <div className="flex items-center gap-2 px-4 text-rose-500 text-[10px] font-black uppercase tracking-widest italic">
                  <AlertCircle size={14} />
                  {errors.password}
                </div>
              )}
            </div>

            {/* ID Proof Upload HUD */}
            <div className="space-y-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 group/upload">
              <div className="flex justify-between items-center px-2">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Identity Proof Artifact</h4>
                  <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] mt-1 italic">JPG, PNG, OR PDF | MAX 5MB</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl text-slate-700 group-hover/upload:text-cyan-400 transition-colors">
                  <Upload size={20} />
                </div>
              </div>

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
                  className={`flex flex-col items-center justify-center gap-6 border-2 border-dashed rounded-[2rem] p-10 cursor-pointer transition-all duration-500 ${
                    errors.idProofFile
                      ? 'border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10'
                      : 'border-white/5 bg-black/40 hover:bg-white/5 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 group-hover/upload:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-white mb-2">
                      {formData.idProofFile ? formData.idProofFile.name : 'Initialize File Link'}
                    </p>
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">Awaiting document stream...</p>
                  </div>
                </label>
              </div>

              {/* Artifact Preview HUD */}
              {idProofPreview && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-4 mb-4 px-2">
                    <div className="h-px flex-1 bg-white/5"></div>
                    <p className="text-[9px] font-black text-cyan-500/50 uppercase tracking-[0.5em]">ARTIFACT PREVIEW</p>
                    <div className="h-px flex-1 bg-white/5"></div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group/preview">
                    <img
                      src={idProofPreview}
                      alt="ID Proof Preview"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.05] to-transparent animate-scan pointer-events-none"></div>
                  </div>
                </div>
              )}

              {errors.idProofFile && (
                <div className="flex items-center gap-2 px-4 text-rose-500 text-[10px] font-black uppercase tracking-widest italic">
                  <AlertCircle size={14} />
                  {errors.idProofFile}
                </div>
              )}
            </div>

            {/* Submit Authorization */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-cyan-400 transition-all duration-500 shadow-2xl active:scale-95 group/btn mt-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-black/20 border-t-black"></div>
                  <span>VALIDATING IDENTITY...</span>
                </>
              ) : (
                'AUTHORIZE LOGIN & VERIFY'
              )}
            </button>
          </form>

          {/* Identity Link Migration */}
          <div className="mt-12 pt-10 border-t border-white/5 text-center space-y-6">
            <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">
              Not a specialized node?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:text-white transition-colors underline underline-offset-8 decoration-cyan-500/20"
              >
                Patient Access Session
              </button>
            </p>
            
            <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-3xl p-6 text-left">
              <p className="text-[10px] text-cyan-500 leading-relaxed font-black uppercase tracking-wider">
                🔒 <span className="text-white">Protocol Alpha:</span> IDENTITY PROOFS ARE ANALYZED VIA ENCRYPTED NEURAL PIPELINES IN COMPLIANCE WITH GLOBAL MEDICAL REGULATORY ARCHIVES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
