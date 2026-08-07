import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setUser,
  setIsAuthOpen,
  setIsProfileOpen,
  logoutUser,
  selectUser,
  selectIsAuthOpen,
  selectIsProfileOpen,
} from '../redux/slices/authSlice';
import { addNotification } from '../redux/slices/uiSlice';
import * as authApi from '../api/auth';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthOpen = useAppSelector(selectIsAuthOpen);
  const isProfileOpen = useAppSelector(selectIsProfileOpen);

  // Restore user session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await authApi.fetchMe(token);
        if (data.success) {
          dispatch(setUser(data.user));
        } else {
          localStorage.removeItem('token');
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error('Session restoration failed:', error);
      }
    };

    restoreSession();
  }, [dispatch]);

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      dispatch(addNotification({ message: 'Please fill in all fields.', type: 'error' }));
      return false;
    }
    try {
      const data = await authApi.login(email, password);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setUser(data.user));
        dispatch(setIsAuthOpen(false));
        dispatch(addNotification({ message: `Welcome back, ${data.user.name}!`, type: 'success' }));
        return true;
      } else {
        dispatch(addNotification({ message: data.message || 'Login failed. Please check your credentials.', type: 'error' }));
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch(addNotification({ message: 'Connection to server failed. Please try again.', type: 'error' }));
      return false;
    }
  };

  const handleSignup = async (name, email, password) => {
    if (!name || !email || !password) {
      dispatch(addNotification({ message: 'Please fill in all fields.', type: 'error' }));
      return false;
    }
    try {
      const data = await authApi.signup(name, email, password);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setUser(data.user));
        dispatch(setIsAuthOpen(false));
        dispatch(addNotification({ message: `Account created successfully! Welcome, ${data.user.name}.`, type: 'success' }));
        return true;
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach(err => dispatch(addNotification({ message: err.message, type: 'error' })));
        } else {
          dispatch(addNotification({ message: data.message || 'Registration failed.', type: 'error' }));
        }
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      dispatch(addNotification({ message: 'Connection to server failed. Please try again.', type: 'error' }));
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await authApi.logout(refreshToken);
    } catch (error) {
      console.error('Logout error:', error);
    }
    dispatch(logoutUser());
    dispatch(addNotification({ message: 'Logged out successfully.', type: 'success' }));
  };

  const handleLogoutAll = async () => {
    try {
      await authApi.logoutAllDevices();
    } catch (error) {
      console.error('Logout all devices error:', error);
    }
    dispatch(logoutUser());
    dispatch(addNotification({ message: 'Successfully logged out of all devices.', type: 'success' }));
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      dispatch(addNotification({ message: 'Please enter your email address.', type: 'error' }));
      return false;
    }
    try {
      const data = await authApi.forgotPassword(email);
      if (data.success) {
        dispatch(addNotification({ message: data.message || 'Password reset link sent to your email.', type: 'success' }));
        return true;
      } else {
        dispatch(addNotification({ message: data.message || 'Failed to request password reset.', type: 'error' }));
        return false;
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      dispatch(addNotification({ message: 'Connection to server failed. Please try again.', type: 'error' }));
      return false;
    }
  };

  return {
    user,
    setUser: (val) => dispatch(setUser(val)),
    isAuthOpen,
    setIsAuthOpen: (val) => dispatch(setIsAuthOpen(val)),
    isProfileOpen,
    setIsProfileOpen: (val) => dispatch(setIsProfileOpen(val)),
    handleLogin,
    handleSignup,
    handleLogout,
    handleLogoutAll,
    handleForgotPassword,
  };
}

export default useAuth;
