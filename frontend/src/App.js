import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import DailyYogaBanner from './components/DailyYogaBanner/DailyYogaBanner';
import Workshops from './components/Workshops/Workshops';
import Products from './components/Products/Products';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Books from './components/Books/Books';
import BooksPage from './components/BooksPage/BooksPage';
import HealthScore from './components/HealthScore/HealthScore';
import Verticals from './components/Verticals/Verticals';
import SuccessStories from './components/SuccessStories/SuccessStories';
import Educators from './components/Educators/Educators';
import FAQ from './components/FAQ/FAQ';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/Contact/Contact';
import Careers from './components/Careers/Careers';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import CheckoutModal from './components/CheckoutModal/CheckoutModal';
import Notification from './components/Notification/Notification';
import ChatAssistant from './components/ChatAssistant/ChatAssistant';
import AuthModal from './components/AuthModal/AuthModal';
import Preloader from './components/Preloader/Preloader';
import ProfileDrawer from './components/ProfileDrawer/ProfileDrawer';
import OrdersPage from './components/OrdersPage/OrdersPage';
import './App.css';

function AppContent() {
  const { isCartOpen, isCheckoutOpen, view } = useApp();

  return (
    <div className="App">
      {/* Premium Load Preloader */}
      <Preloader />

      {/* Global Toast Notifications */}
      <Notification />

      {/* Navigation Bar */}
      <Navbar />

      {/* Conditionally Render Home View, Bookstore View, or Shop View */}
      {view === 'books' ? (
        <BooksPage />
      ) : view === 'products' ? (
        <ProductsPage />
      ) : view === 'about' ? (
        <AboutUs />
      ) : view === 'contact' ? (
        <Contact />
      ) : view === 'careers' ? (
        <Careers />
      ) : view === 'workshops' ? (
        <Workshops isStandalone={true} />
      ) : view === 'health-score' ? (
        <HealthScore isStandalone={true} />
      ) : view === 'orders' ? (
        <OrdersPage />
      ) : (
        <>
          {/* Main Page Sections */}
          <Hero />

          <DailyYogaBanner />

          <Workshops />

          <Products />

          <Books />

          <HealthScore />

          <Verticals />

          <SuccessStories />

          <Educators />

          <FAQ />
        </>
      )}

      {/* Floating AI Chat Guide */}
      <ChatAssistant />

      {/* Footer (Dark Navy) */}
      <Footer />

      {/* Shopping Cart Drawer Slider */}
      {isCartOpen && <CartDrawer />}

      {/* Checkout Steps Modal */}
      {isCheckoutOpen && <CheckoutModal />}

      {/* Authentication Modal */}
      <AuthModal />

      {/* User Profile Drawer */}
      <ProfileDrawer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
