import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-sm text-gray-600 mb-6">Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
