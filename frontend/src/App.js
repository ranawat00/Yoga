import React, { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Notification from './components/Notification/Notification';
import Preloader from './components/Preloader/Preloader';
import Loader from './components/Loader/Loader';
import './App.css';

// Lazy load non-critical sections below the fold
const DailyYogaBanner = lazy(() => import('./components/DailyYogaBanner/DailyYogaBanner'));
const Workshops = lazy(() => import('./components/Workshops/Workshops'));
const Products = lazy(() => import('./components/Products/Products'));
const Books = lazy(() => import('./components/Books/Books'));
const HealthScore = lazy(() => import('./components/HealthScore/HealthScore'));
const Verticals = lazy(() => import('./components/Verticals/Verticals'));
const SuccessStories = lazy(() => import('./components/SuccessStories/SuccessStories'));
const Educators = lazy(() => import('./components/Educators/Educators'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));

// Lazy load full page views
const BooksPage = lazy(() => import('./components/BooksPage/BooksPage'));
const ProductsPage = lazy(() => import('./components/ProductsPage/ProductsPage'));
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Careers = lazy(() => import('./components/Careers/Careers'));
const OrdersPage = lazy(() => import('./components/OrdersPage/OrdersPage'));

// Lazy load modals/drawers
const CartDrawer = lazy(() => import('./components/CartDrawer/CartDrawer'));
const CheckoutModal = lazy(() => import('./components/CheckoutModal/CheckoutModal'));
const AuthModal = lazy(() => import('./components/AuthModal/AuthModal'));
const ProfileDrawer = lazy(() => import('./components/ProfileDrawer/ProfileDrawer'));
const ChatAssistant = lazy(() => import('./components/ChatAssistant/ChatAssistant'));


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
        <Suspense fallback={<Loader />}><BooksPage /></Suspense>
      ) : view === 'products' ? (
        <Suspense fallback={<Loader />}><ProductsPage /></Suspense>
      ) : view === 'about' ? (
        <Suspense fallback={<Loader />}><AboutUs /></Suspense>
      ) : view === 'contact' ? (
        <Suspense fallback={<Loader />}><Contact /></Suspense>
      ) : view === 'careers' ? (
        <Suspense fallback={<Loader />}><Careers /></Suspense>
      ) : view === 'workshops' ? (
        <Suspense fallback={<Loader />}><Workshops isStandalone={true} /></Suspense>
      ) : view === 'health-score' ? (
        <Suspense fallback={<Loader />}><HealthScore isStandalone={true} /></Suspense>
      ) : view === 'orders' ? (
        <Suspense fallback={<Loader />}><OrdersPage /></Suspense>
      ) : (
        <>
          {/* Main Page Sections */}
          <Hero />

          <Suspense fallback={<Loader />}>
            <DailyYogaBanner />
            <Workshops />
            <Products />
            <Books />
            <HealthScore />
            <Verticals />
            <SuccessStories />
            <Educators />
            <FAQ />
          </Suspense>
        </>
      )}

      {/* Floating AI Chat Guide */}
      <Suspense fallback={null}>
        <ChatAssistant />
      </Suspense>

      {/* Footer (Dark Navy) */}
      <Footer />

      {/* Shopping Cart Drawer Slider */}
      <Suspense fallback={null}>
        {isCartOpen && <CartDrawer />}
      </Suspense>

      {/* Checkout Steps Modal */}
      <Suspense fallback={null}>
        {isCheckoutOpen && <CheckoutModal />}
      </Suspense>

      {/* Authentication Modal */}
      <Suspense fallback={null}>
        <AuthModal />
      </Suspense>

      {/* User Profile Drawer */}
      <Suspense fallback={null}>
        <ProfileDrawer />
      </Suspense>
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
