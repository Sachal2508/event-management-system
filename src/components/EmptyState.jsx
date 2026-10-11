import React from 'react';

const EmptyState = ({ message = 'No events found.', onReset }) => {
  return (
    <div className="text-center py-12 px-4 bg-white border border-gray-200 rounded-lg">
      <p className="text-gray-600 mb-4">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
