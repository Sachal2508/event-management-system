import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setKeyword,
  setCategory,
  setCity,
  setSort,
  resetFilters,
  getEvents,
} from '../redux/eventsSlice';

const EventFilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.events.filters);
  const categories = useSelector((state) => state.events.categories);

  const [search, setSearch] = useState(filters.keyword);
  const [cityInput, setCityInput] = useState(filters.city);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setKeyword(search));
    dispatch(setCity(cityInput));
    dispatch(getEvents({ keyword: search, city: cityInput, page: 0 }));
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    dispatch(setCategory(cat));
    dispatch(getEvents({ classificationName: cat, page: 0 }));
  };

  const handleSortChange = (e) => {
    const s = e.target.value;
    dispatch(setSort(s));
    dispatch(getEvents({ sort: s, page: 0 }));
  };

  const handleClear = () => {
    setSearch('');
    setCityInput('');
    dispatch(resetFilters());
    dispatch(getEvents({ keyword: '', classificationName: 'All', city: '', sort: 'date,asc', page: 0 }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by event name or keyword..."
          className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="City (e.g. New York)..."
          className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
        />

        <select
          value={filters.classificationName}
          onChange={handleCategoryChange}
          className="px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="date,asc">Date: Earliest First</option>
          <option value="date,desc">Date: Latest First</option>
          <option value="name,asc">Name: A to Z</option>
          <option value="name,desc">Name: Z to A</option>
        </select>

        <div className="md:col-span-4 flex items-center justify-between pt-1">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-gray-800 underline"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventFilterBar;
