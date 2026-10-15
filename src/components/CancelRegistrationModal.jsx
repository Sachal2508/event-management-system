import React from 'react';
import { useDispatch } from 'react-redux';
import { cancelRegistration } from '../redux/registrationsSlice';
import { showAlert } from '../redux/uiSlice';

const CancelRegistrationModal = ({ registration, isOpen, onClose }) => {
  const dispatch = useDispatch();

  if (!isOpen || !registration) return null;

  const handleConfirm = () => {
    dispatch(cancelRegistration(registration.id));
    dispatch(showAlert({ type: 'info', message: 'Registration has been cancelled.' }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2">Cancel Registration</h3>
        <p className="text-xs text-gray-600 mb-4">
          Are you sure you want to cancel your registration for{' '}
          <strong className="text-gray-800">{registration.eventData?.name}</strong>?
        </p>

        <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs mb-4 text-gray-700">
          <p>Registration ID: {registration.id}</p>
          <p>Tickets: {registration.ticketCount} ({registration.ticketType})</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
          >
            Keep
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRegistrationModal;
