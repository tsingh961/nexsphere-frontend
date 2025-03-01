"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, UserCircle } from 'lucide-react';
import Link from 'next/link';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Login successful', formData);
      // Here you would typically redirect the user or update app state
    } catch (error) {
      setErrors({ form: 'Invalid email or password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/60 rounded-lg p-8 relative"
      >
        {/* <button className="absolute top-6 left-6 text-gray-400 hover:text-white">
          <ArrowLeft size={20} />
        </button> */}
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#2a3654] rounded-full p-4 mb-4">
            <UserCircle size={32} className="text-[#6c7ddb]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-center">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              className={`w-full px-2 py-1 rounded-lg bg-[#1a2540] border ${
                errors.email ? 'border-red-500' : 'border-[#2a3654]'
              } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6c7ddb] focus:border-transparent transition-all`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className={`w-full px-2 py-1 rounded-lg bg-[#1a2540] border ${
                  errors.password ? 'border-red-500' : 'border-[#2a3654]'
                } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6c7ddb] focus:border-transparent transition-all`}
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#6c7ddb] focus:ring-[#6c7ddb] border-gray-600 rounded bg-[#1a2540]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label> */}
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#6c7ddb] hover:text-[#8c9deb]">
                Forgot password?
              </a>
            </div>
          </div>

          {errors.form && <p className="text-sm text-red-500 text-center">{errors.form}</p>}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c7ddb] focus:ring-offset-2 focus:ring-offset-[#131c31] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-[#6c7ddb] hover:text-[#8c9deb]">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;