import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const EmailStep = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsChecking(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(email);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsChecking(false);
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
        <Mail size={28} className="text-indigo-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
      <p className="text-gray-400 mb-8 text-center">
        Enter your email to continue to your account
      </p>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${
              error ? 'border-red-500' : 'border-gray-700'
            } text-white placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
            placeholder="your@email.com"
            required
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isChecking}
          className="w-full px-2 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isChecking ? 'Checking...' : 'Continue'}
        </button>
      </form>
    </motion.div>
  );
};

export default EmailStep;
