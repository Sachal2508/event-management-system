import React from 'react';

export const EventGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
          <div className="h-44 bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  );
};

export default EventGridSkeleton;
