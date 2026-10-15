import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    alert: null,
    apiKeyModal: false,
  },
  reducers: {
    showAlert: (state, action) => {
      state.alert = {
        type: action.payload.type || 'info',
        message: action.payload.message,
      };
    },
    clearAlert: (state) => {
      state.alert = null;
    },
    toggleApiKeyModal: (state, action) => {
      state.apiKeyModal = action.payload !== undefined ? action.payload : !state.apiKeyModal;
    },
  },
});

export const { showAlert, clearAlert, toggleApiKeyModal } = uiSlice.actions;
export default uiSlice.reducer;
