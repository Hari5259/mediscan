import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';

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
    if (data) setVerificationData(JSON.parse(data)); else navigate('/signup');
  }, [navigate]);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0) setCanResend(true);
  }, [timer, canResend]);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code.length === 6) {
        setVerified(true);
        setTimeout(() => { sessionStorage.removeItem('pendingVerification'); navigate('/login'); }, 1400);
      }
    }, 800);
  };

  const handleResend = () => { setCanResend(false); setTimer(60); setCode(''); console.log(`Resend to ${verificationMethod}`); };

  if (!verificationData) return null;
  const displayValue = verificationMethod === 'email' ? verificationData.email : verificationData.phone;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#f8fafc, #eef2ff)' }}>
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2"><Heart className="w-10 h-10 text-blue-600" fill="currentColor" /></div>
            <h1 className="text-xl font-bold text-gray-900">Verify your account</h1>
            <p className="text-muted small">Enter the code we sent to you</p>
          </div>

          {!verified ? (
            <>
              <div className="flex gap-2 mb-4">
                <button onClick={() => { setVerificationMethod('email'); setCode(''); }} className={`flex-1 py-2 rounded-lg font-medium transition ${verificationMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}>
                  Email
                </button>
                <button onClick={() => { setVerificationMethod('phone'); setCode(''); }} className={`flex-1 py-2 rounded-lg font-medium transition ${verificationMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}>
                  Phone
                </button>
              </div>

              <div className="bg-blue-50 p-3 rounded-md mb-4">
                <p className="text-sm text-gray-700">We've sent a verification code to</p>
                <p className="font-semibold text-gray-900 mt-1">{displayValue}</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verification code</label>
                  <input type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" maxLength={6} className="input-field text-center text-2xl tracking-widest font-mono" required />
                </div>

                <button type="submit" disabled={loading || code.length !== 6} className="btn-primary w-full">{loading ? 'Verifying...' : 'Verify'}</button>
              </form>

              <div className="text-center mt-3">
                {canResend ? (
                  <button onClick={handleResend} className="text-blue-600 small">Didn't get it? Resend</button>
                ) : (
                  <p className="text-muted small">Resend available in <span className="font-semibold">{timer}s</span></p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Verification complete</h3>
              <p className="text-muted small">Redirecting to login...</p>
            </div>
          )}
        </div>

        <p className="text-center text-muted small mt-4">Your account is protected with advanced encryption</p>
      </div>
    </div>
  );
}
