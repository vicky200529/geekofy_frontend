
import React, { useState } from 'react';
import { X, Mail, Phone, Lock, ChevronLeft } from 'lucide-react';
import { backend } from '../services/backend';

type AuthView = 'login' | 'signup' | 'forgot-password' | 'otp';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<AuthView>(initialView);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<'email' | 'password' | 'otp' | 'general' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setErrorField(null);
    
    const result = await backend.login(emailOrPhone, password);
    
    if (result.success) {
      alert('Login successful!');
      onClose();
    } else {
      setError(result.message || 'Authentication failed');
      setErrorField(result.errorField || 'general');
    }
    setIsSubmitting(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await backend.requestOtp(emailOrPhone);
    if (result.success) {
      setView('otp');
    }
    setIsSubmitting(false);
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    const code = otp.join('');
    const result = await backend.verifyOtp(code);
    if (result.success) {
      alert('Account verified successfully!');
      onClose();
    } else {
      setError(result.message || 'Invalid OTP');
      setErrorField('otp');
    }
    setIsSubmitting(false);
  };

  const handleSocialLogin = async (provider: 'Google' | 'Apple') => {
    await backend.socialLogin(provider);
    alert(`Redirecting to ${provider}...`);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus next input
      if (value !== '' && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500 text-sm mt-1">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email or Mobile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${
                      errorField === 'email' ? 'border-red-500 ring-red-100 ring-2' : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="name@example.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button 
                    type="button"
                    onClick={() => setView('forgot-password')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 outline-none transition-all ${
                      errorField === 'password' ? 'border-red-500 ring-red-100 ring-2' : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorField === 'password') {
                        setError(null);
                        setErrorField(null);
                      }
                    }}
                  />
                </div>
                {errorField === 'password' && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
                {errorField === 'email' && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
              >
                {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Sign In'}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Google
              </button>
              <button 
                onClick={() => handleSocialLogin('Apple')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700"
              >
                <img src="https://www.svgrepo.com/show/303108/apple-black-logo.svg" className="w-5 h-5" alt="Apple" />
                Apple
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <button onClick={() => setView('signup')} className="text-blue-600 font-bold hover:underline">Sign up</button>
              </p>
            </div>
          </div>
        );

      case 'signup':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 text-sm mt-1">Join the Geekofy tech community</p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile or Email</label>
                <input 
                  type="text" 
                  required 
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Mobile number or email" 
                />
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md flex justify-center items-center"
              >
                {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Get OTP'}
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <button onClick={() => setView('login')} className="text-blue-600 font-bold hover:underline">Login</button>
              </p>
            </div>
          </div>
        );

      case 'forgot-password':
        return (
          <div className="space-y-6">
            <button 
              onClick={() => setView('login')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              <ChevronLeft size={16} /> Back to login
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your email or phone to receive instructions</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); backend.resetPasswordRequest(emailOrPhone); alert('Reset link sent!'); }}>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Email or Mobile"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Send Reset Link
              </button>
            </form>
          </div>
        );

      case 'otp':
        return (
          <div className="space-y-6 text-center">
            <button 
              onClick={() => setView('signup')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors mb-4"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
            <p className="text-gray-500 text-sm">We've sent a 6-digit code to {emailOrPhone}</p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input 
                  key={i} 
                  id={`otp-${i}`}
                  type="text" 
                  maxLength={1} 
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className={`w-12 h-14 text-center text-xl font-bold border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                    errorField === 'otp' ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'
                  }`}
                />
              ))}
            </div>
            {errorField === 'otp' && <p className="text-xs text-red-500 font-medium">{error}</p>}
            <button 
              onClick={handleVerifyOtp}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md flex justify-center items-center"
            >
              {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Verify & Sign Up'}
            </button>
            <p className="text-sm text-gray-500">
              Didn't receive it? <button className="text-blue-600 font-bold hover:underline" onClick={() => backend.requestOtp(emailOrPhone)}>Resend</button>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={20} />
        </button>
        <div className="p-8 pt-12 md:p-10 md:pt-14">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Auth;
