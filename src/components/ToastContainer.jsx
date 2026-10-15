import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../redux/uiSlice';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.ui.alert);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (!alert) return null;

  let bgClass = 'bg-blue-600';
  if (alert.type === 'success') bgClass = 'bg-green-600';
  if (alert.type === 'error') bgClass = 'bg-red-600';
  if (alert.type === 'warning') bgClass = 'bg-yellow-600';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${bgClass} text-white px-4 py-3 rounded shadow-lg text-sm flex items-center justify-between gap-4 max-w-sm`}>
        <span>{alert.message}</span>
        <button
          onClick={() => dispatch(clearAlert())}
          className="text-white hover:opacity-80 font-bold ml-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
