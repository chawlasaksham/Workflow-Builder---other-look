import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: 'sysadmin',
    password: 'test3',
    username: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for specific credentials
    if (formData.email === 'sysadmin' && formData.password === 'test3') {
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: 'Sysadmin',
        email: 'sysadmin',
        company: 'RIS'
      }));
      
      // Navigate to home page
      navigate('/workflow-dashboard');
    } else {
      alert('Invalid credentials. Please use email: sysadmin and password: test3');
    }
  };

  const handleGoogleLogin = () => {
    alert('Google login functionality would be implemented here');
  };

  const handleGitHubLogin = () => {
    alert('GitHub login functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <h1 className="text-3xl font-bold text-text-primary">workflowbuilder_pro</h1>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Auth Mode Toggle */}
          <div className="bg-secondary-50 rounded-lg p-1 mb-6 flex">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isSignIn 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isSignIn 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {isSignIn && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-secondary">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary-700"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-text-secondary">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-border rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              <span className="text-text-primary">Continue with Google</span>
            </button>

            <button
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-border rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <Icon name="Github" size={20} className="text-text-primary" />
              <span className="text-text-primary">Continue with GitHub</span>
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-text-tertiary text-center mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:text-primary-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary hover:text-primary-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 