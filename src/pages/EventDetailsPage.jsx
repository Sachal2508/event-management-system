import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEventDetails } from '../redux/eventsSlice';
import { selectIsRegistered } from '../redux/registrationsSlice';
import { showAlert } from '../redux/uiSlice';
import RegistrationModal from '../components/RegistrationModal';
import {
  formatDate,
  formatTime,
  getBestEventImage,
  getVenueInfo,
  getCategoryBadge,
  formatPriceRange,
  isEventPast,
} from '../utils/formatters';

const EventDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedEvent: event, loading } = useSelector((state) => state.events);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isRegistered = useSelector((state) =>
    selectIsRegistered(state, event?.id, user?.email)
  );

  useEffect(() => {
    if (id) {
      dispatch(getEventDetails(id));
    }
  }, [dispatch, id]);

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      dispatch(showAlert({ type: 'warning', message: 'Please log in to register.' }));
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  if (loading || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-sm text-gray-500">
        Loading event details...
      </div>
    );
  }

  const imageUrl = getBestEventImage(event.images);
  const venue = getVenueInfo(event);
  const dateStr = formatDate(event.dates?.start?.localDate, event.dates?.start?.localTime);
  const timeStr = formatTime(event.dates?.start?.localTime);
  const category = getCategoryBadge(event);
  const price = formatPriceRange(event.priceRanges);
  const isPast = isEventPast(event.dates?.start?.localDate, event.dates?.start?.localTime);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/events" className="text-xs text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Events
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <img src={imageUrl} alt={event.name} className="w-full h-64 sm:h-80 object-cover" />

        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
              {category}
            </span>
            {isRegistered ? (
              <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
                You are registered for this event
              </span>
            ) : isPast ? (
              <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">
                This event has ended
              </span>
            ) : null}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">{event.name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700 bg-gray-50 p-4 rounded mb-6">
            <div>
              <p className="font-semibold text-gray-500 uppercase text-[11px]">Date & Time</p>
              <p className="text-sm font-bold text-gray-900">
                {dateStr} {timeStr && `at ${timeStr}`}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 uppercase text-[11px]">Price</p>
              <p className="text-sm font-bold text-gray-900">{price}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 uppercase text-[11px]">Venue</p>
              <p className="text-sm font-medium text-gray-900">{venue.name}</p>
              <p className="text-gray-600">{venue.city}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500 uppercase text-[11px]">Status</p>
              <p className="text-sm font-medium capitalize text-gray-900">
                {event.dates?.status?.code || 'Active'}
              </p>
            </div>
          </div>

          {event.info && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 mb-2">Event Description</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{event.info}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
            {isRegistered ? (
              <Link
                to="/my-events"
                className="px-4 py-2 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700"
              >
                Go to My Events
              </Link>
            ) : (
              <button
                onClick={handleRegisterClick}
                disabled={isPast}
                className={`px-5 py-2 rounded text-xs font-medium text-white ${
                  isPast
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isPast ? 'Registration Closed' : 'Register for Event'}
              </button>
            )}

            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                View on Ticketmaster &rarr;
              </a>
            )}
          </div>
        </div>
      </div>

      <RegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default EventDetailsPage;
