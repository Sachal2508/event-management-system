import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearError } from '../redux/authSlice';
import { showAlert } from '../redux/uiSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath = location.state?.from?.pathname || '/events';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, redirectPath, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(loginUser({ email, password }));
    if (res.success) {
      dispatch(showAlert({ type: 'success', message: 'Logged in successfully!' }));
      navigate(redirectPath, { replace: true });
    }
  };

  const handleDemoFill = () => {
    setEmail('demo@eventhub.com');
    setPassword('password123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">User Login</h1>
        <p className="text-xs text-gray-500 mb-4">
          Sign in to register for events and manage your bookings.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-4 text-xs flex justify-between items-center text-blue-900">
          <div>
            <p className="font-semibold">Demo Account</p>
            <p className="text-[11px] text-gray-600">demo@eventhub.com / password123</p>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="px-2.5 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Auto Fill
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
