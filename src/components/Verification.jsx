import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, ChevronLeft, Mail, Phone, Lock } from 'lucide-react';

export default function Verification() {
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('pendingVerification');
    if (data) {
      setVerificationData(JSON.parse(data));
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code.length === 6) {
        setVerified(true);
        setTimeout(() => {
          sessionStorage.removeItem('pendingVerification');
          navigate('/login');
        }, 2500);
      }
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setTimer(60);
    setCode('');
  };

  if (!verificationData) return null;

  const displayValue = verificationMethod === 'email'
    ? verificationData.email
    : verificationData.phone;

  if (verified) {
    return (
      <div className="bg-immersive min-h-screen flex items-center justify-center p-6">
        <div className="main-floating-card w-full max-w-[500px] p-16 text-center space-y-8 animate-slide-up">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-xl shadow-green-100">
            <CheckCircle size={56} />
          </div>
          <div>
            <h2 className="text-[32px] font-black tracking-tighter italic uppercase">Verification Success</h2>
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mt-2">Dossier active. Redirecting to login...</p>
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
          <span className="text-white font-black text-2xl italic tracking-tighter">SECURE<span className="text-blue-400">NODE</span></span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pb-24">
        <div className="main-floating-card w-full max-w-[500px] p-12 animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-[36px] font-black tracking-tighter leading-tight mb-2 italic">Verify Identity</h1>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">establishing secure clinical link</p>
          </div>

          <div className="flex gap-2 mb-10 bg-gray-50 p-1.5 rounded-[16px] border border-gray-100">
            <button
              onClick={() => { setVerificationMethod('email'); setCode(''); }}
              className={`flex-1 py-3 rounded-[12px] text-[12px] font-black uppercase tracking-widest transition-all ${
                verificationMethod === 'email' ? 'bg-white text-[#008cff] shadow-md' : 'text-gray-400'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => { setVerificationMethod('phone'); setCode(''); }}
              className={`flex-1 py-3 rounded-[12px] text-[12px] font-black uppercase tracking-widest transition-all ${
                verificationMethod === 'phone' ? 'bg-white text-[#008cff] shadow-md' : 'text-gray-400'
              }`}
            >
              Mobile
            </button>
          </div>

          <div className="bg-blue-50/50 border-2 border-blue-100 p-6 rounded-[16px] mb-10 text-center">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Authorization Code sent to</p>
            <p className="text-[18px] font-black text-gray-800 italic">{displayValue}</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1 text-center block">Enter 6-Digit PIN</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000 000"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-[12px] px-6 py-5 text-[32px] font-black text-center tracking-[12px] outline-none focus:border-[#008cff] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="btn-search w-full py-5 !text-[16px] flex items-center justify-center gap-3 disabled:opacity-30"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                'VALIDATE IDENTITY'
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-[#008cff] font-black text-[12px] uppercase tracking-widest hover:underline"
              >
                Resend Protocol Code
              </button>
            ) : (
              <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest italic">
                Resend window in <span className="text-[#008cff]">{timer}s</span>
              </p>
            )}
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="w-full mt-10 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 flex items-center justify-center gap-2"
          >
            <ChevronLeft size={16} /> Return to Registration
          </button>
        </div>
      </main>
    </div>
  );
}
