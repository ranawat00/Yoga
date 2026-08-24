import { createSlice } from '@reduxjs/toolkit';

export const VIEW_TO_PATH = {
  home: '/',
  about: '/about',
  internship: '/internship',
  contact: '/contact',
  workshops: '/workshops',
  'health-score': '/health-score',
  orders: '/orders',
  'register-free': '/register-free',
  'daily-yoga-together-details': '/daily-yoga-together-details',
  blog: '/blog',
  registrations: '/registrations',
};

export const PATH_TO_VIEW = {
  '/': 'home',
  '/about': 'about',
  '/about-us': 'about',
  '/internship': 'internship',
  '/internships': 'internship',
  '/careers': 'internship',
  '/career': 'internship',
  '/contact': 'contact',
  '/contact-us': 'contact',
  '/workshops': 'workshops',
  '/health-score': 'health-score',
  '/orders': 'orders',
  '/register-free': 'register-free',
  '/daily-yoga-together-details': 'daily-yoga-together-details',
  '/blog': 'blog',
  '/blogs': 'blog',
  '/registrations': 'registrations',
};

const getInitialViewingBlog = () => {
  try {
    const stored = sessionStorage.getItem('viewingBlog');
    return stored || 'climate-change-collective-action';
  } catch (e) {
    return 'climate-change-collective-action';
  }
};

const getInitialViewingWorkshop = () => {
  try {
    const stored = sessionStorage.getItem('viewingWorkshop');
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
};

const getInitialView = () => {
  // If a workshop detail is stored, always show workshops view
  if (getInitialViewingWorkshop()) {
    return 'workshops';
  }
  if (typeof window !== 'undefined' && window.location) {
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    return PATH_TO_VIEW[path] || 'home';
  }
  return 'home';
};

const initialState = {
  view: getInitialView(),
  isCheckoutOpen: false,
  isRegisterModalOpen: false,
  notifications: [],
  viewingWorkshop: getInitialViewingWorkshop(),
  viewingBlog: getInitialViewingBlog(),
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
    setIsRegisterModalOpen: (state, action) => {
      state.isRegisterModalOpen = action.payload;
    },
    addNotification: (state, action) => {
      const { message, type = 'success' } = action.payload;
      const id = Date.now() + Math.random().toString(36).substring(2, 9);
      state.notifications.push({ id, message, type });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    setViewingWorkshop: (state, action) => {
      state.viewingWorkshop = action.payload;
      // Persist to sessionStorage so it survives page refresh
      try {
        if (action.payload) {
          sessionStorage.setItem('viewingWorkshop', JSON.stringify(action.payload));
        } else {
          sessionStorage.removeItem('viewingWorkshop');
        }
      } catch (e) { /* ignore storage errors */ }
    },
    setViewingBlog: (state, action) => {
      state.viewingBlog = action.payload;
      try {
        if (action.payload) {
          sessionStorage.setItem('viewingBlog', action.payload);
        } else {
          sessionStorage.removeItem('viewingBlog');
        }
      } catch (e) { /* ignore storage errors */ }
    },
  },
});

export const { setView, setIsCheckoutOpen, setIsRegisterModalOpen, addNotification, removeNotification, setViewingWorkshop, setViewingBlog } = uiSlice.actions;

export const selectView = (state) => state.ui.view;
export const selectIsCheckoutOpen = (state) => state.ui.isCheckoutOpen;
export const selectIsRegisterModalOpen = (state) => state.ui.isRegisterModalOpen;
export const selectNotifications = (state) => state.ui.notifications;
export const selectViewingWorkshop = (state) => state.ui.viewingWorkshop;
export const selectViewingBlog = (state) => state.ui.viewingBlog;

export default uiSlice.reducer;

