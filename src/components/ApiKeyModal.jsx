import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleApiKeyModal, showAlert } from '../redux/uiSlice';
import { getApiKey, saveApiKey } from '../services/ticketmasterApi';
import { getEvents } from '../redux/eventsSlice';

const ApiKeyModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.apiKeyModal);
  const [keyInput, setKeyInput] = useState(getApiKey());

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveApiKey(keyInput);
    dispatch(toggleApiKeyModal(false));
    dispatch(
      showAlert({
        type: 'success',
        message: keyInput.trim() ? 'Ticketmaster API key saved.' : 'Switched to demo mode.',
      })
    );
    dispatch(getEvents({ page: 0 }));
  };

  const handleUseDemo = () => {
    setKeyInput('');
    saveApiKey('');
    dispatch(toggleApiKeyModal(false));
    dispatch(showAlert({ type: 'info', message: 'Demo mode enabled.' }));
    dispatch(getEvents({ page: 0 }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Ticketmaster API Key</h2>
        <p className="text-xs text-gray-600 mb-4">
          Enter your API key from developer.ticketmaster.com or leave blank to use built-in demo events.
        </p>

        <form onSubmit={handleSave}>
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter API Key here..."
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:border-blue-500"
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-xs text-gray-600 hover:text-gray-900 underline"
            >
              Use Demo Events
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => dispatch(toggleApiKeyModal(false))}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
