import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRegistrations } from '../redux/registrationsSlice';
import { logout } from '../redux/authSlice';
import { showAlert } from '../redux/uiSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => selectUserRegistrations(state, user?.email));

  const activeCount = registrations.filter((r) => r.status === 'confirmed').length;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showAlert({ type: 'info', message: 'You have logged out.' }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">User Profile</h1>
        <p className="text-xs text-gray-500 mb-6">Account information and activity summary</p>

        <div className="space-y-3 text-xs text-gray-700 border-b border-gray-200 pb-6 mb-6">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Active Bookings:</strong> {activeCount} events
          </p>
          <p>
            <strong>Total Registrations:</strong> {registrations.length}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/my-events"
            className="px-4 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            View My Events
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-red-300 text-red-600 rounded text-xs hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
