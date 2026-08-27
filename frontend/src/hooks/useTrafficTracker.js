import { useEffect, useRef } from 'react';

function getOrCreateVisitorId() {
  let id = localStorage.getItem('yh_visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem('yh_visitor_id', id);
  }
  return id;
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) return 'Mobile';
  if (width <= 1024) return 'Tablet';
  return 'Desktop';
}

export function useTrafficTracker(currentView) {
  const lastTrackedView = useRef(null);

  useEffect(() => {
    if (!currentView || lastTrackedView.current === currentView) return;

    const visitorId = getOrCreateVisitorId();
    const device = getDeviceType();
    const path = window.location.pathname || '/';

    // Map view name to human-readable page title
    const viewNameMap = {
      home: 'Home',
      about: 'About Us',
      contact: 'Contact Us',
      workshops: 'Workshops',
      internship: 'Internship',
      blog: 'Blog',
      orders: 'My Orders',
      'register-free': 'Register Free',
      'daily-yoga-together-details': 'Daily Yoga Details',
      registrations: 'Registrations'
    };

    const pageName = viewNameMap[currentView] || currentView;
    lastTrackedView.current = currentView;

    // Send asynchronous page view log
    fetch('/api/traffic/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: pageName,
        path,
        visitorId,
        device
      })
    }).catch((err) => {
      console.log('Traffic log error:', err);
    });
  }, [currentView]);
}

export default useTrafficTracker;
