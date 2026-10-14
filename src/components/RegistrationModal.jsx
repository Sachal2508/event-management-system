import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRegistration, selectIsRegistered } from '../redux/registrationsSlice';
import { showAlert } from '../redux/uiSlice';
import { formatDate, formatTime, getVenueInfo } from '../utils/formatters';

const RegistrationModal = ({ event, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [ticketCount, setTicketCount] = useState(1);
  const [ticketType, setTicketType] = useState('Standard Admission');
  const [notes, setNotes] = useState('');

  const isRegistered = useSelector((state) =>
    selectIsRegistered(state, event?.id, user?.email)
  );

  if (!isOpen || !event) return null;

  const venue = getVenueInfo(event);
  const dateStr = formatDate(event.dates?.start?.localDate, event.dates?.start?.localTime);
  const timeStr = formatTime(event.dates?.start?.localTime);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      dispatch(showAlert({ type: 'warning', message: 'You must be logged in to register.' }));
      onClose();
      return;
    }

    if (isRegistered) {
      dispatch(showAlert({ type: 'error', message: 'You are already registered for this event.' }));
      return;
    }

    dispatch(
      addRegistration({
        eventId: event.id,
        userEmail: user.email,
        userName: user.name,
        ticketCount: Number(ticketCount),
        ticketType,
        notes,
        eventData: event,
      })
    );

    dispatch(showAlert({ type: 'success', message: 'Successfully registered for this event!' }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Register for Event</h2>
        <p className="text-sm font-semibold text-blue-600 mb-1">{event.name}</p>
        <p className="text-xs text-gray-500 mb-4">
          {dateStr} {timeStr && `• ${timeStr}`} | {venue.name}, {venue.city}
        </p>

        {isRegistered ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded mb-4 text-xs">
            You are already registered for this event. Check your My Events page.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Attendee Name
              </label>
              <input
                type="text"
                disabled
                value={user?.name || ''}
                className="w-full px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Attendee Email
              </label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                className="w-full px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Ticket Type
                </label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="Standard Admission">Standard Admission</option>
                  <option value="VIP Pass">VIP Pass</option>
                  <option value="Student Pass">Student Pass</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value={1}>1 Ticket</option>
                  <option value={2}>2 Tickets</option>
                  <option value={3}>3 Tickets</option>
                  <option value={4}>4 Tickets</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special requirements or guest name"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
