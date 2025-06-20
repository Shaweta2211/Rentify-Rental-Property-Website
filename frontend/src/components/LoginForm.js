

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // For redirection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setError('');
    setResetPasswordMessage('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forget-password`, { email });
      setResetPasswordMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send password reset email. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token); // Save token
      onLogin(token); // Pass token to App.js
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#fcfcfc] px-4 pt-10">
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-sm text-red-900 mb-4">{error}</p>}
        {resetPasswordMessage && <p className="text-sm text-black mb-4">{resetPasswordMessage}</p>}

        <form className="space-y-4" onSubmit={showForgotPassword ? handleResetPassword : handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b-2 border-stone-600 bg-transparent focus:outline-none rounded-lg transition duration-300"
              required
            />
          </div>

          {!showForgotPassword && (
            <div>
              <label htmlFor="password" className="block text-gray-800 font-semibold mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-stone-600 bg-transparent focus:outline-none rounded-lg transition duration-300"
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-stone-700 hover:bg-stone-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              {showForgotPassword ? 'Reset Password' : 'Login'}
            </button>

            {!showForgotPassword && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-stone-800 font-semibold hover:underline transition duration-300"
              >
                Forgot Password?
              </button>
            )}
          </div>
        </form>

        {!showForgotPassword ? (
          <div className="text-center mt-6">
            <p className="text-gray-900">
              Don't have an account?{' '}
              <Link to="/register" className="text-neutral-800 font-semibold hover:underline transition duration-300">
                Register
              </Link>
            </p>
          </div>
        ) : (
          <div className="text-center mt-6">
            <p className="text-gray-900">
              Remembered your password?{' '}
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-stone-800 font-semibold hover:underline transition duration-300"
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
