import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRegistrations } from '../redux/registrationsSlice';
import CancelRegistrationModal from '../components/CancelRegistrationModal';
import TicketBadgeModal from '../components/TicketBadgeModal';
import EmptyState from '../components/EmptyState';
import { formatDate, formatTime, getVenueInfo, isEventPast } from '../utils/formatters';

const MyEventsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const userRegistrations = useSelector((state) => selectUserRegistrations(state, user?.email));

  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedForCancel, setSelectedForCancel] = useState(null);
  const [selectedForPass, setSelectedForPass] = useState(null);

  const activeEvents = userRegistrations.filter((r) => r.status === 'confirmed');
  const cancelledEvents = userRegistrations.filter((r) => r.status === 'cancelled');

  const upcomingEvents = activeEvents.filter((r) => {
    return !isEventPast(r.eventData?.dates?.start?.localDate, r.eventData?.dates?.start?.localTime);
  });

  const completedEvents = activeEvents.filter((r) => {
    return isEventPast(r.eventData?.dates?.start?.localDate, r.eventData?.dates?.start?.localTime);
  });

  let currentList = [];
  if (activeTab === 'upcoming') currentList = upcomingEvents;
  else if (activeTab === 'completed') currentList = completedEvents;
  else if (activeTab === 'cancelled') currentList = cancelledEvents;
  else currentList = userRegistrations;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Registered Events</h1>
          <p className="text-xs text-gray-600">
            Logged in as: <strong className="text-gray-900">{user?.name}</strong> ({user?.email})
          </p>
        </div>
        <Link
          to="/events"
          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 self-start"
        >
          + Find More Events
        </Link>
      </div>

      <div className="flex border-b border-gray-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 ${
            activeTab === 'upcoming'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming ({upcomingEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 ${
            activeTab === 'completed'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed ({completedEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 ${
            activeTab === 'cancelled'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Cancelled ({cancelledEvents.length})
        </button>
      </div>

      {currentList.length > 0 ? (
        <div className="space-y-4">
          {currentList.map((reg) => {
            const event = reg.eventData;
            const venue = getVenueInfo(event);
            const dateStr = formatDate(
              event?.dates?.start?.localDate,
              event?.dates?.start?.localTime
            );
            const timeStr = formatTime(event?.dates?.start?.localTime);
            const isCancelled = reg.status === 'cancelled';
            const isPast = isEventPast(
              event?.dates?.start?.localDate,
              event?.dates?.start?.localTime
            );

            return (
              <div
                key={reg.id}
                className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        isCancelled
                          ? 'bg-red-100 text-red-700'
                          : isPast
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {isCancelled ? 'Cancelled' : isPast ? 'Completed' : 'Confirmed'}
                    </span>
                    <span className="text-xs text-gray-500">ID: {reg.id}</span>
                  </div>

                  <Link to={`/events/${reg.eventId}`}>
                    <h3 className="text-base font-bold text-gray-900 hover:text-blue-600">
                      {event?.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-600 mt-1">
                    {dateStr} {timeStr && `at ${timeStr}`} | {venue.name}, {venue.city}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Pass: {reg.ticketCount}x {reg.ticketType} • Registered: {reg.registeredAt}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  {!isCancelled && (
                    <>
                      <button
                        onClick={() => setSelectedForPass(reg)}
                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border border-gray-300"
                      >
                        View Ticket
                      </button>

                      {!isPast && (
                        <button
                          onClick={() => setSelectedForCancel(reg)}
                          className="px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-200"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          message={
            activeTab === 'upcoming'
              ? 'No upcoming event registrations.'
              : activeTab === 'completed'
              ? 'No completed events.'
              : 'No cancelled events.'
          }
        />
      )}

      <TicketBadgeModal
        registration={selectedForPass}
        isOpen={!!selectedForPass}
        onClose={() => setSelectedForPass(null)}
      />

      <CancelRegistrationModal
        registration={selectedForCancel}
        isOpen={!!selectedForCancel}
        onClose={() => setSelectedForCancel(null)}
      />
    </div>
  );
};

export default MyEventsPage;
