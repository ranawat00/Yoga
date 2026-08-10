import React, { lazy, Suspense, useEffect } from 'react';
import { AppProvider } from './redux/AppProvider';
import { useApp } from './hooks/useApp';
import { VIEW_TO_PATH, PATH_TO_VIEW } from './redux/slices/uiSlice';

// Layout Components
import Navbar from './layout/Navbar/Navbar';
import Footer from './layout/Footer/Footer';

// Common Components
import Notification from './common/Notification/Notification';
import Preloader from './common/Preloader/Preloader';
import Celebration from './common/Celebration/Celebration';
import Loader from './common/Loader/Loader';

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
const RegisterFreePage = lazy(() => import('./pages/RegisterFreePage/RegisterFreePage'));

// Lazy load modals/drawers
const CartDrawer = lazy(() => import('./layout/CartDrawer/CartDrawer'));
const CheckoutModal = lazy(() => import('./layout/CheckoutModal/CheckoutModal'));
const AuthModal = lazy(() => import('./layout/AuthModal/AuthModal'));
const ProfileDrawer = lazy(() => import('./layout/ProfileDrawer/ProfileDrawer'));


const VIEW_TITLES = {
  home: 'Yoga Healers | Holistic Health & Satvic Wellness',
  about: 'About Us | Yoga Healers',
  careers: 'Careers | Yoga Healers',
  books: 'Books & Recipe Guides | Yoga Healers',
  products: 'Shop Organic Products | Yoga Healers',
  contact: 'Contact Us | Yoga Healers',
  workshops: 'Holistic Workshops | Yoga Healers',
  'health-score': 'Health Score Assessment | Yoga Healers',
  orders: 'My Orders | Yoga Healers',
  'register-free': 'Register for 5 Days Free Yoga Sessions | Yoga Healers',
};

function AppContent() {
  const { isCartOpen, isCheckoutOpen, view, setView } = useApp();

  // Reset scroll to top on initial page load / refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);



  // Listen for browser Back / Forward navigation events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      const matchedView = PATH_TO_VIEW[path] || 'home';
      setView(matchedView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setView]);

  // Synchronize browser address bar URL and page title when `view` changes
  useEffect(() => {
    const targetPath = VIEW_TO_PATH[view] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
    if (VIEW_TITLES[view]) {
      document.title = VIEW_TITLES[view];
    }
    window.scrollTo(0, 0);
  }, [view]);

  // Scroll entrance animations (Zoom In / Zoom Out on scroll)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-in-view');
        } else {
          entry.target.classList.remove('scroll-in-view');
        }
      });
    }, observerOptions);

    const selectors = [
      '.workshop-card-horizontal',
      '.product-card',
      '.book-card',
      '.success-card',
      '.daily-yoga-card',
      '.daily-yoga-left-content',
      '.hero-content-wrapper',
      '.vertical-card',
      '.educator-card',
      '.about-content-card',
      '.career-card',
      'img.daily-yoga-img',
      'img.about-hero-img',
      'img.contact-hero-img'
    ];

    const updateObservations = () => {
      const elements = document.querySelectorAll(selectors.join(', '));
      elements.forEach((el) => {
        if (!el.classList.contains('scroll-zoom-init')) {
          el.classList.add('scroll-zoom-init');
        }
        observer.observe(el);
      });
    };

    updateObservations();

    // Observe dynamically loaded nodes (e.g. from Suspense or React lazy sections)
    const mutationObserver = new MutationObserver(updateObservations);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [view]);

  return (
    <div className="App">
      {/* Premium Load Preloader */}
      <Preloader />

      {/* Website Refresh / Load Celebration Cannons — Home page only */}
      {view === 'home' && <Celebration />}

      {/* Global Toast Notifications */}
      <Notification />

      {/* Navigation Bar */}
      <Navbar />

      {/* Conditionally Render Home View, Bookstore View, or Shop View with Smooth Transitions */}
      <main key={view} className="page-transition-container">
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
        ) : view === 'register-free' ? (
          <Suspense fallback={<Loader />}><RegisterFreePage /></Suspense>
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
      </main>
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
