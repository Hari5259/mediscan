import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';

export default function Verification() {
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState('email'); // 'email' or 'phone'
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get pending verification data from session storage
    const data = sessionStorage.getItem('pendingVerification');
    if (data) {
      setVerificationData(JSON.parse(data));
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  useEffect(() => {
    // Countdown timer for resend
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

    // Simulate API call to verify code
    setTimeout(() => {
      setLoading(false);
      // In production, verify with backend
      if (code.length === 6) {
        setVerified(true);
        setTimeout(() => {
          // Clear the session data and redirect
          sessionStorage.removeItem('pendingVerification');
          navigate('/login');
        }, 2000);
      }
    }, 1000);
  };

  const handleResend = () => {
    setCanResend(false);
    setTimer(60);
    setCode('');
    // Simulate resending code
    console.log(`Resending code to ${verificationMethod}`);
  };

  if (!verificationData) {
    return null;
  }

  const displayValue = verificationMethod === 'email'
    ? verificationData.email
    : verificationData.phone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-blue-600" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MediCare</h1>
          <p className="text-gray-600 mt-2">Verify Your Information</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!verified ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Verification Code
              </h2>

              {/* Verification Method Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => {
                    setVerificationMethod('email');
                    setCode('');
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    verificationMethod === 'email'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✉️ Email
                </button>
                <button
                  onClick={() => {
                    setVerificationMethod('phone');
                    setCode('');
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    verificationMethod === 'phone'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📱 Phone
                </button>
              </div>

              {/* Verification Info */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  We've sent a verification code to:
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  {displayValue}
                </p>
              </div>

              {/* Verification Form */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    className="input-field text-center text-2xl tracking-widest font-mono"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the 6-digit code sent to your {verificationMethod}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="btn-primary w-full disabled:opacity-50 mt-6"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>

              {/* Resend Code */}
              <div className="text-center mt-6">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Didn't receive the code? Resend
                  </button>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Resend code in <span className="font-semibold">{timer}s</span>
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="divider">
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-gray-500 text-sm">
                  or
                </span>
              </div>

              {/* Back Link */}
              <p className="text-center text-gray-600">
                <button
                  onClick={() => navigate('/signup')}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Back to signup
                </button>
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Complete!
              </h3>
              <p className="text-gray-600 mb-6">
                Your account has been successfully created and verified.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to login...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Your account is protected with advanced encryption
        </p>
      </div>
    </div>
  );
}
