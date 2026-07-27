import React, { lazy, Suspense } from 'react';
import { AppProvider } from './redux/AppProvider';
import { useApp } from './hooks/useApp';

// Layout Components
import Navbar from './layout/Navbar/Navbar';
import Footer from './layout/Footer/Footer';

// Common Components
import Notification from './components/common/Notification/Notification';
import Preloader from './components/common/Preloader/Preloader';
import Celebration from './components/common/Celebration/Celebration';
import Loader from './components/common/Loader/Loader';

// Main / Feature Section Components
import Hero from './components/Hero/Hero';
import MediaLogos from './components/MediaLogos/MediaLogos';
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
const BooksPage = lazy(() => import('./pages/BooksPage/BooksPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const AboutUs = lazy(() => import('./pages/AboutUsPage/AboutUsPage'));
const Contact = lazy(() => import('./pages/ContactPage/ContactPage'));
const Careers = lazy(() => import('./pages/CareersPage/CareersPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));

// Lazy load modals/drawers
const CartDrawer = lazy(() => import('./layout/CartDrawer/CartDrawer'));
const CheckoutModal = lazy(() => import('./layout/CheckoutModal/CheckoutModal'));
const AuthModal = lazy(() => import('./layout/AuthModal/AuthModal'));
const ProfileDrawer = lazy(() => import('./layout/ProfileDrawer/ProfileDrawer'));
const ChatAssistant = lazy(() => import('./components/ChatAssistant/ChatAssistant'));

function AppContent() {
  const { isCartOpen, isCheckoutOpen, view } = useApp();

  return (
    <div className="App">
      {/* Premium Load Preloader */}
      <Preloader />

      {/* Website Refresh / Load Celebration Cannons */}
      <Celebration />

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

          {/* Featured In: Newspaper Logos Marquee */}
          <MediaLogos />

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
