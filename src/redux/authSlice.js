import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const getUsers = () => {
  try {
    const users = localStorage.getItem('users_list');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const initialUser = getInitialUser();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isAuthenticated: !!initialUser,
    error: null,
    loading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export const registerUser = (userData) => (dispatch) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    dispatch(loginFailure('Please fill in all fields.'));
    return { success: false };
  }

  const users = getUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    dispatch(loginFailure('An account with this email already exists.'));
    return { success: false };
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem('users_list', JSON.stringify(users));
  dispatch(loginSuccess(newUser));
  return { success: true, user: newUser };
};

export const loginUser = (credentials) => (dispatch) => {
  const { email, password } = credentials;

  if (!email || !password) {
    dispatch(loginFailure('Please enter both email and password.'));
    return { success: false };
  }

  if (email.toLowerCase() === 'demo@eventhub.com' && password === 'password123') {
    const demo = { id: 'user_demo', name: 'Demo Student', email: 'demo@eventhub.com' };
    dispatch(loginSuccess(demo));
    return { success: true, user: demo };
  }

  const users = getUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!found) {
    dispatch(loginFailure('Invalid email or password.'));
    return { success: false };
  }

  dispatch(loginSuccess(found));
  return { success: true, user: found };
};

export default authSlice.reducer;
