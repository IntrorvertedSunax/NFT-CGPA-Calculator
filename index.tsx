
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const removeLoader = () => {
  const loader = document.getElementById('initial-loader');
  const root = document.getElementById('root');
  if (loader) {
    loader.style.opacity = '0';
    loader.setAttribute('aria-hidden', 'true');
    setTimeout(() => loader.remove(), 400);
  }
  if (root) {
    root.classList.add('loaded');
  }
};

// Fail-safe: Remove loader after 5 seconds no matter what
const failSafeTimeout = setTimeout(removeLoader, 5000);

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Clear fail-safe and remove loader on successful initial render
    clearTimeout(failSafeTimeout);
    // requestAnimationFrame ensures the browser has had a chance to paint the React app
    requestAnimationFrame(() => {
      setTimeout(removeLoader, 100);
    });
  } catch (error) {
    console.error("Mounting error:", error);
    removeLoader(); // Show the UI anyway even if partial failure
  }
};

// Handle global errors to prevent stuck loader
window.addEventListener('error', () => {
  removeLoader();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
