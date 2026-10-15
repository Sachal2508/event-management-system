import React from 'react';
import { formatDate, formatTime, getVenueInfo } from '../utils/formatters';

const TicketBadgeModal = ({ registration, isOpen, onClose }) => {
  if (!isOpen || !registration) return null;

  const event = registration.eventData;
  const venue = getVenueInfo(event);
  const dateStr = formatDate(event?.dates?.start?.localDate, event?.dates?.start?.localTime);
  const timeStr = formatTime(event?.dates?.start?.localTime);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 border border-gray-200">
        <div className="border-b border-gray-200 pb-3 mb-4 flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase">Event Ticket</span>
            <h3 className="font-bold text-gray-900 text-base">{event?.name}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 font-bold">
            &times;
          </button>
        </div>

        <div className="space-y-2 text-xs text-gray-700 mb-4">
          <p>
            <strong>Attendee:</strong> {registration.userName} ({registration.userEmail})
          </p>
          <p>
            <strong>Date:</strong> {dateStr} {timeStr && `at ${timeStr}`}
          </p>
          <p>
            <strong>Venue:</strong> {venue.name}, {venue.city}
          </p>
          <p>
            <strong>Pass:</strong> {registration.ticketCount}x {registration.ticketType}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className="text-green-700 font-semibold capitalize">{registration.status}</span>
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded text-center mb-4">
          <p className="font-mono text-sm tracking-wider text-gray-800 font-bold">
            {registration.id.toUpperCase()}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">Show this ticket ID at the entrance</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="text-xs text-blue-600 hover:underline"
          >
            Print Ticket
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBadgeModal;
