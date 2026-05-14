import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import api from '../../services/api';
import Logo from '../../components/common/Logo';
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'WORKER';

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState(defaultRole);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if(phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setError('');
    try {
      console.log("url",process.env.REACT_APP_API_BASE_URL);
      const res = await api.post('/auth/send-otp', { phone });
      setStep(2);
      // For testing purposes only - remove in production
      console.log('Generated OTP:', res.data.otp);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if(otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }
    setError('');
    try {
      const res = await api.post('/auth/verify-otp', { phone, otp, role });
      login(res.data.data.user, res.data.data.accessToken);
      
      if (res.data.data.user.role === 'WORKER') {
        navigate('/worker-dashboard');
      } else {
        navigate('/contractor-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side / Top branding */}
      <div className="md:flex-1 bg-indigo-600 text-white p-8 flex flex-col justify-between hidden md:flex">
        <div>
          <Logo showText={true} className="grayscale brightness-200 mb-12" />
          <h2 className="text-4xl font-extrabold leading-tight mb-4">Join the fastest growing workforce network.</h2>
          <p className="text-indigo-200 text-lg">Connect directly. Get hired instantly. Get paid daily.</p>
        </div>
        <div className="bg-indigo-700/50 p-6 rounded-2xl backdrop-blur-sm border border-indigo-500/30">
          <div className="flex items-center gap-3 text-indigo-100 font-medium">
            <ShieldCheck size={24} className="text-green-400" />
            <span>100% Secure & Verified profiles</span>
          </div>
        </div>
      </div>

      {/* Right side / Auth form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-gray-50 md:bg-white relative">
        <button 
          onClick={() => step === 2 ? setStep(1) : navigate('/')}
          className="absolute top-6 left-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="w-full max-w-sm mx-auto">
          <div className="md:hidden flex justify-center mb-10">
            <Logo />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            {step === 1 ? 'Welcome back' : 'Verify your number'}
          </h2>
          <p className="text-gray-500 mb-8">
            {step === 1 ? 'Enter your details to access your account' : `We sent a code to +91 ${phone}`}
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg text-sm font-medium animate-slide-up">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    className="block w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none text-lg font-medium"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">I want to...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('WORKER')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${role === 'WORKER' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                  >
                    Find Work
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('CONTRACTOR')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${role === 'CONTRACTOR' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                  >
                    Hire Workers
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-200 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">4-Digit Code</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  className="block w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none text-2xl font-bold text-center tracking-widest"
                  placeholder="••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-green-200 text-base font-bold text-white bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Verify & Continue
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-6">
                Didn't receive code? <button type="button" onClick={handleSendOtp} className="text-indigo-600 font-bold hover:underline">Resend</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;