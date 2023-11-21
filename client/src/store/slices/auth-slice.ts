import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user-credentials')
    ? JSON.parse(localStorage.getItem('user-credentials')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload;
      localStorage.setItem('user-credentials', JSON.stringify(action.payload));
    },
    clearCredentials(state) {
      state.user = null;
      localStorage.removeItem('user-credentials');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
