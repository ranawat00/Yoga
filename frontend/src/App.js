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
const DailyYogaTogether = lazy(() => import('./components/DailyYogaTogether/DailyYogaTogether'));
const BlogSection = lazy(() => import('./components/BlogSection/BlogSection'));
const ScienceBackedBenefits = lazy(() => import('./components/ScienceBackedBenefits/ScienceBackedBenefits'));
const HealthScore = lazy(() => import('./components/HealthScore/HealthScore'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const RunningTicker = lazy(() => import('./components/RunningTicker/RunningTicker'));

// Lazy load full page views
const AboutUs = lazy(() => import('./pages/AboutUsPage/AboutUsPage'));
const Contact = lazy(() => import('./pages/ContactPage/ContactPage'));
const Internship = lazy(() => import('./pages/InternshipPage/InternshipPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
// eslint-disable-next-line no-unused-vars
const RegisterFreePage = lazy(() => import('./pages/RegisterFreePage/RegisterFreePage'));
const DailyYogaTogetherDetails = lazy(() => import('./components/DailyYogaTogether/DailyYogaTogetherDetails'));
const BlogPage = lazy(() => import('./pages/BlogPage/BlogPage'));

// Lazy load modals/drawers
const CheckoutModal = lazy(() => import('./layout/CheckoutModal/CheckoutModal'));
const AuthModal = lazy(() => import('./layout/AuthModal/AuthModal'));
const ProfileDrawer = lazy(() => import('./layout/ProfileDrawer/ProfileDrawer'));

const VIEW_TITLES = {
  home: 'Yoga Healers | Holistic Health & Satvic Wellness',
  about: 'About Us | Yoga Healers',
  internship: 'Internship | Yoga Healers',
  careers: 'Internship | Yoga Healers',
  contact: 'Contact Us | Yoga Healers',
  workshops: 'Holistic Workshops | Yoga Healers',
  'health-score': 'Health Score Assessment | Yoga Healers',
  orders: 'My Orders | Yoga Healers',
  'register-free': 'Register for 5 Days Free Yoga Sessions | Yoga Healers',
  'daily-yoga-together-details': 'Daily Yoga Together | Yoga Healers',
  blog: 'Blog Articles | Yoga Healers',
};

function AppContent() {
  // Main application view controller
  const { isCheckoutOpen, view, setView, setViewingWorkshop } = useApp();

  // Reset viewingWorkshop if we navigate away from workshops view
  useEffect(() => {
    if (view !== 'workshops') {
      setViewingWorkshop(null);
    }
  }, [view, setViewingWorkshop]);

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
      rootMargin: '100px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-in-view');
        }
      });
    }, observerOptions);

    const selectors = [
      '.workshop-card-horizontal',
      '.daily-yoga-card',
      '.daily-yoga-together-container',
      '.educator-card'
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

    const timer = setTimeout(updateObservations, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
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

      {/* Conditionally Render Views with Smooth Transitions */}
      <main key={view} className="page-transition-container">
        {view === 'about' ? (
          <Suspense fallback={<Loader />}><AboutUs /></Suspense>
        ) : view === 'contact' ? (
          <Suspense fallback={<Loader />}><Contact /></Suspense>
        ) : (view === 'internship' || view === 'careers') ? (
          <Suspense fallback={<Loader />}><Internship /></Suspense>
        ) : view === 'workshops' ? (
          <Suspense fallback={<Loader />}><Workshops isStandalone={true} /></Suspense>
        ) : view === 'health-score' ? (
          <Suspense fallback={<Loader />}><HealthScore isStandalone={true} /></Suspense>
        ) : view === 'orders' ? (
          <Suspense fallback={<Loader />}><OrdersPage /></Suspense>
        ) : view === 'register-free' ? (
          <Suspense fallback={<Loader />}><RegisterFreePage /></Suspense>
        ) : view === 'daily-yoga-together-details' ? (
          <Suspense fallback={<Loader />}><DailyYogaTogetherDetails /></Suspense>
        ) : view === 'blog' ? (
          <Suspense fallback={<Loader />}><BlogPage /></Suspense>
        ) : (
          <>
            {/* Main Page Sections */}
            <Hero />

            {/* Featured In: Newspaper Logos Marquee */}
            <MediaLogos />

            <Suspense fallback={null}><DailyYogaBanner /></Suspense>

            <Suspense fallback={null}><Workshops /></Suspense>
            <Suspense fallback={null}><DailyYogaTogether /></Suspense>
            <Suspense fallback={null}><RunningTicker /></Suspense>
            <Suspense fallback={null}><BlogSection /></Suspense>
            <Suspense fallback={null}><ScienceBackedBenefits /></Suspense>
            <Suspense fallback={null}><HealthScore /></Suspense>
            <Suspense fallback={null}><FAQ /></Suspense>
          </>
        )}
      </main>
      {/* Footer (Dark Navy) */}
      <Footer />

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
