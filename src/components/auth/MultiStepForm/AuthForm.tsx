import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import EmailStep from './EmailStep';
import OtpStep from './OtpStep';
import RegistrationStep from './RegistrationStep';

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: -100,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AuthForm = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    setStep(1);
  };

  const handleOtpSubmit = (otp: number) => {
    setOtp(otp);
    setStep(2);
  };

  const handleRegistrationSubmit = (data: any) => {
    setFormData(data);
    console.log('Registration complete', { email, otp, ...data });
    setTimeout(() => {
      setStep(0);
      setEmail('');
      setOtp(null);
      setFormData({
        fullName: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
      });
    }, 2000);
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-md p-8 relative">
        {step > 0 && (
          <button
            onClick={goBack}
            className="absolute top-4 left-4 p-2 rounded-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="email-step"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <EmailStep onSubmit={handleEmailSubmit} />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="otp-step"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <OtpStep email={email} onSubmit={handleOtpSubmit} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="registration-step"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <RegistrationStep onSubmit={handleRegistrationSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm;
