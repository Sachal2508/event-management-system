import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, setCategory } from '../redux/eventsSlice';
import EventCard from '../components/EventCard';
import EventGridSkeleton from '../components/LoadingSkeleton';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: events, loading } = useSelector((state) => state.events);

  useEffect(() => {
    if (!events.length) {
      dispatch(getEvents({ page: 0 }));
    }
  }, [dispatch, events.length]);

  const handleCategoryClick = (cat) => {
    dispatch(setCategory(cat));
    navigate('/events');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Event Management System
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm">
          A web application to explore live events from the Ticketmaster API, view details, and manage your registrations.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/events"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
          >
            Explore Events
          </Link>
          <Link
            to="/my-events"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm font-medium border border-gray-300"
          >
            My Registrations
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Music', 'Sports', 'Arts & Theatre', 'Film'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center transition-colors"
            >
              <span className="font-semibold text-gray-800 text-sm block">{cat}</span>
              <span className="text-xs text-gray-500">View {cat.toLowerCase()} events</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Events</h2>
          <Link to="/events" className="text-sm text-blue-600 hover:underline">
            View All Events &rarr;
          </Link>
        </div>

        {loading ? (
          <EventGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-xs text-gray-600">
        <h3 className="font-bold text-gray-800 text-sm mb-2">Assignment Details</h3>
        <p>
          This project was created for Web Programming Assignment 2 (Instructor: Mahhek Tahir). It uses React.js, Redux Toolkit for state management, React Router for navigation, and Ticketmaster Discovery API for real-time event exploration.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
