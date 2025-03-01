import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Calendar, Eye, EyeOff } from 'lucide-react';

const RegistrationStep = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      // Check if user is at least 18 years old
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        if (age - 1 < 18) {
          newErrors.dateOfBirth = 'You must be at least 18 years old';
        }
      } else if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

      onSubmit(formData);
    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
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
        <UserPlus size={28} className="text-indigo-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
      <p className="text-gray-400 mb-8 text-center">
        Just a few more details to get you started
      </p>

      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="mb-5">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded-lg bg-gray-800/50 border ${
              errors.fullName ? 'border-red-500' : 'border-gray-700'
            } text-white placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-2 py-1 rounded-lg bg-gray-800/50 border ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-700'
              } text-white placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          {errors.dateOfBirth && <p className="mt-2 text-sm text-red-500">{errors.dateOfBirth}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-2 py-1 rounded-lg bg-gray-800/50 border ${
                errors.password ? 'border-red-500' : 'border-gray-700'
              } text-white placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-2 py-1 rounded-lg bg-gray-800/50 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
              } text-white placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        {errors.form && <p className="mb-4 text-sm text-red-500 text-center">{errors.form}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-2 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
        </button>
      </form>
    </motion.div>
  );
};

export default RegistrationStep;