import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to restore cart items:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Restore user session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await authApi.fetchMe(token);
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Session restoration failed:', error);
      }
    };

    restoreSession();
  }, []);

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      addNotification('Please fill in all fields.', 'error');
      return false;
    }
    try {
      const data = await authApi.login(email, password);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsAuthOpen(false);
        addNotification(`Welcome back, ${data.user.name}!`, 'success');
        return true;
      } else {
        addNotification(data.message || 'Login failed. Please check your credentials.', 'error');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      addNotification('Connection to server failed. Please try again.', 'error');
      return false;
    }
  };

  const handleSignup = async (name, email, password) => {
    if (!name || !email || !password) {
      addNotification('Please fill in all fields.', 'error');
      return false;
    }
    try {
      const data = await authApi.signup(name, email, password);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsAuthOpen(false);
        addNotification(`Account created successfully! Welcome, ${data.user.name}.`, 'success');
        return true;
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach(err => addNotification(err.message, 'error'));
        } else {
          addNotification(data.message || 'Registration failed.', 'error');
        }
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      addNotification('Connection to server failed. Please try again.', 'error');
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    setUser(null);
    addNotification('Logged out successfully.', 'success');
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      addNotification('Please enter your email address.', 'error');
      return false;
    }
    try {
      const data = await authApi.forgotPassword(email);
      if (data.success) {
        addNotification(data.message || 'Password reset link sent to your email.', 'success');
        return true;
      } else {
        addNotification(data.message || 'Failed to request password reset.', 'error');
        return false;
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      addNotification('Connection to server failed. Please try again.', 'error');
      return false;
    }
  };

  // Toast Notification helper
  const addNotification = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Cart Management
  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);

    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    if (existing) {
      addNotification(`Increased quantity for ${product.title} in cart.`, 'success');
    } else {
      addNotification(`${product.title} added to cart.`, 'success');
    }
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) => 
      prev.map((item) => 
        item.product.id === productId 
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    const removedItem = cartItems.find((item) => item.product.id === productId);
    if (removedItem) {
      addNotification(`${removedItem.product.title} removed from cart.`, 'success');
    }
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]); // Clears cart
  };

  // Calculate cart counts
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        notifications,
        addNotification,
        removeNotification,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveCartItem,
        handleCheckoutSuccess,
        totalCartCount,
        view,
        setView,
        user,
        setUser,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,
        handleLogin,
        handleSignup,
        handleLogout,
        handleForgotPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
