import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const OtpStep = ({ email, onSubmit }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setIsVerifying(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(otpString);
    } catch (error) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-indigo-600/20 rounded-full mb-6">
        <ShieldCheck size={28} className="text-indigo-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Verification Code</h2>
      <p className="text-gray-400 mb-2 text-center">
        We've sent a code to
      </p>
      <p className="text-white font-medium mb-6">{email}</p>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-xl font-bold bg-gray-800/50 border border-gray-700 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full px-2 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isVerifying ? 'Verifying...' : 'Verify Code'}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Didn't receive a code?{' '}
            <button
              type="button"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Resend
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default OtpStep;
