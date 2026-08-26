import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Suppress benign ResizeObserver loop limit errors in dev overlay
window.addEventListener('error', (e) => {
  if (
    e?.message?.includes('ResizeObserver loop') ||
    e?.message === 'ResizeObserver loop completed with undelivered notifications.' ||
    e?.message === 'ResizeObserver loop limit exceeded'
  ) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

