import { createSlice } from '@reduxjs/toolkit';

export const VIEW_TO_PATH = {
  home: '/',
  about: '/about',
  careers: '/careers',
  books: '/books',
  products: '/products',
  contact: '/contact',
  workshops: '/workshops',
  'health-score': '/health-score',
  orders: '/orders',
};

export const PATH_TO_VIEW = {
  '/': 'home',
  '/about': 'about',
  '/about-us': 'about',
  '/careers': 'careers',
  '/career': 'careers',
  '/books': 'books',
  '/products': 'products',
  '/shop': 'products',
  '/contact': 'contact',
  '/contact-us': 'contact',
  '/workshops': 'workshops',
  '/health-score': 'health-score',
  '/orders': 'orders',
};

const getInitialView = () => {
  if (typeof window !== 'undefined' && window.location) {
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    return PATH_TO_VIEW[path] || 'home';
  }
  return 'home';
};

const initialState = {
  view: getInitialView(),
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

