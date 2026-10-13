import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsRegistered, addRegistration } from '../redux/registrationsSlice';
import { showAlert } from '../redux/uiSlice';
import { formatDate, formatTime, getVenueInfo, getBestEventImage, getCategoryBadge, isEventPast } from '../utils/formatters';

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isRegistered = useSelector((state) =>
    selectIsRegistered(state, event?.id, user?.email)
  );

  if (!event) return null;

  const imageUrl = getBestEventImage(event.images);
  const venue = getVenueInfo(event);
  const dateStr = formatDate(event.dates?.start?.localDate, event.dates?.start?.localTime);
  const timeStr = formatTime(event.dates?.start?.localTime);
  const category = getCategoryBadge(event);
  const isPast = isEventPast(event.dates?.start?.localDate, event.dates?.start?.localTime);

  const handleQuickRegister = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(showAlert({ type: 'warning', message: 'Please login to register for events.' }));
      navigate('/login');
      return;
    }

    if (isRegistered) {
      dispatch(showAlert({ type: 'warning', message: 'You are already registered for this event.' }));
      return;
    }

    dispatch(
      addRegistration({
        eventId: event.id,
        userEmail: user.email,
        userName: user.name,
        ticketCount: 1,
        ticketType: 'General Admission',
        eventData: event,
      })
    );
    dispatch(showAlert({ type: 'success', message: 'Registered successfully!' }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-gray-300 transition-colors">
      <div>
        <img
          src={imageUrl}
          alt={event.name}
          className="w-full h-44 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
              {category}
            </span>
            {isRegistered && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-semibold">
                Registered
              </span>
            )}
            {!isRegistered && isPast && (
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                Past Event
              </span>
            )}
          </div>

          <Link to={`/events/${event.id}`}>
            <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2 hover:text-blue-600">
              {event.name}
            </h3>
          </Link>

          <p className="text-xs text-blue-600 font-medium mb-1">
            {dateStr} {timeStr && `• ${timeStr}`}
          </p>

          <p className="text-xs text-gray-500 line-clamp-1">
            {venue.name}, {venue.city}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
        <Link
          to={`/events/${event.id}`}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          View Details
        </Link>

        {isRegistered ? (
          <Link
            to="/my-events"
            className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded hover:bg-green-100"
          >
            My Ticket
          </Link>
        ) : (
          <button
            onClick={handleQuickRegister}
            disabled={isPast}
            className={`text-xs px-3 py-1.5 rounded text-white font-medium ${
              isPast
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPast ? 'Closed' : 'Register'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
