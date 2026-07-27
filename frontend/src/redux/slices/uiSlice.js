import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'home',
  isCheckoutOpen: false,
  notifications: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setIsCheckoutOpen: (state, action) => {
      state.isCheckoutOpen = action.payload;
    },
    addNotification: (state, action) => {
      const { message, type = 'success' } = action.payload;
      const id = Date.now() + Math.random().toString(36).substring(2, 9);
      state.notifications.push({ id, message, type });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { setView, setIsCheckoutOpen, addNotification, removeNotification } = uiSlice.actions;

export const selectView = (state) => state.ui.view;
export const selectIsCheckoutOpen = (state) => state.ui.isCheckoutOpen;
export const selectNotifications = (state) => state.ui.notifications;

export default uiSlice.reducer;
