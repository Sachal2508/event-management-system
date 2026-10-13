import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, setPage } from '../redux/eventsSlice';
import EventFilterBar from '../components/EventFilterBar';
import EventCard from '../components/EventCard';
import EventGridSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

const EventsPage = () => {
  const dispatch = useDispatch();
  const { items: events, loading, page, filters, isLive, error } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(getEvents({ page: filters.page }));
  }, [dispatch, filters.page]);

  const handlePageClick = (p) => {
    dispatch(setPage(p));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = page.number || 0;
  const totalPages = page.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Events</h1>
          <p className="text-xs text-gray-500">
            {isLive ? 'Showing events from Ticketmaster API' : 'Using sample events (offline demo mode)'}
          </p>
        </div>
        <div className="text-xs text-gray-500">
          Total: <strong className="text-gray-800">{events.length}</strong> events on this page
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded mb-4">
          {error}
        </div>
      )}

      <EventFilterBar />

      {loading ? (
        <EventGridSkeleton />
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          message="No events found for this search or category."
          onReset={() => dispatch(getEvents({ keyword: '', classificationName: 'All', city: '', page: 0 }))}
        />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1.5 border border-gray-300 rounded text-xs bg-white disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-xs text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1.5 border border-gray-300 rounded text-xs bg-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
