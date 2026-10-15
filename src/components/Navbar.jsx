import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { toggleApiKeyModal, showAlert } from '../redux/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const registrations = useSelector((state) => state.registrations.items);
  const isLive = useSelector((state) => state.events.isLive);

  const userActiveCount = user
    ? registrations.filter(
        (r) => r.userEmail?.toLowerCase() === user.email?.toLowerCase() && r.status === 'confirmed'
      ).length
    : 0;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showAlert({ type: 'info', message: 'You have logged out.' }));
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold text-blue-600">
            EventHub
          </Link>

          <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'
              }
            >
              Events
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/my-events"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'
                }
              >
                My Events {userActiveCount > 0 && `(${userActiveCount})`}
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => dispatch(toggleApiKeyModal(true))}
            className="px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-700 bg-gray-50 hover:bg-gray-100"
          >
            {isLive ? 'API: Live' : 'API: Demo'}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-gray-700 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
