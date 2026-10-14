import { createSlice } from '@reduxjs/toolkit';

const getInitialRegistrations = () => {
  try {
    const saved = localStorage.getItem('registrations');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (list) => {
  try {
    localStorage.setItem('registrations', JSON.stringify(list));
  } catch {
  }
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    items: getInitialRegistrations(),
    message: null,
    error: null,
  },
  reducers: {
    addRegistration: (state, action) => {
      const { eventId, userEmail } = action.payload;

      const alreadyRegistered = state.items.some(
        (reg) =>
          reg.eventId === eventId &&
          reg.userEmail?.toLowerCase() === userEmail?.toLowerCase() &&
          reg.status !== 'cancelled'
      );

      if (alreadyRegistered) {
        state.error = 'You are already registered for this event.';
        state.message = null;
        return;
      }

      const newRecord = {
        id: 'reg_' + Date.now(),
        ...action.payload,
        status: 'confirmed',
        registeredAt: new Date().toLocaleDateString(),
      };

      state.items.unshift(newRecord);
      state.message = 'Successfully registered for event!';
      state.error = null;
      saveToLocalStorage(state.items);
    },
    cancelRegistration: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index].status = 'cancelled';
        state.message = 'Registration cancelled.';
        state.error = null;
        saveToLocalStorage(state.items);
      }
    },
    clearRegistrationAlert: (state) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const { addRegistration, cancelRegistration, clearRegistrationAlert } =
  registrationsSlice.actions;

export const selectUserRegistrations = (state, email) => {
  if (!email) return [];
  return state.registrations.items.filter(
    (item) => item.userEmail?.toLowerCase() === email.toLowerCase()
  );
};

export const selectIsRegistered = (state, eventId, email) => {
  if (!eventId || !email) return false;
  return state.registrations.items.some(
    (item) =>
      item.eventId === eventId &&
      item.userEmail?.toLowerCase() === email.toLowerCase() &&
      item.status === 'confirmed'
  );
};

export default registrationsSlice.reducer;
