import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthOpen: false,
  isProfileOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthOpen: (state, action) => {
      state.isAuthOpen = action.payload;
    },
    setIsProfileOpen: (state, action) => {
      state.isProfileOpen = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setUser, setIsAuthOpen, setIsProfileOpen, logoutUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthOpen = (state) => state.auth.isAuthOpen;
export const selectIsProfileOpen = (state) => state.auth.isProfileOpen;

export default authSlice.reducer;
