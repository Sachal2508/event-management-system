import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-800">Event Management System</p>
          <p className="text-xs">Web Programming - Assignment 2 | Instructor: Mahhek Tahir</p>
        </div>
        <div className="flex gap-4 text-xs">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/events" className="hover:text-blue-600">Events</Link>
          <Link to="/my-events" className="hover:text-blue-600">My Events</Link>
          <a
            href="https://developer.ticketmaster.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600"
          >
            Ticketmaster API
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
