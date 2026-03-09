import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@/lib/i18n';
import '@/styles/globals.css';

(globalThis as any).__GRIMOIRE_DEBUG = true;

console.log(
  '%c[main.tsx] Grimoire starting...',
  'color: #10b981; font-weight: bold; font-size: 14px;'
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[main.tsx] FATAL: root element not found');
  document.body.innerHTML =
    '<div style="color: #ef4444; padding: 20px; font-family: monospace;">Error: root element not found</div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    console.log('%c[main.tsx] React mounted successfully', 'color: #10b981; font-weight: bold;');
  } catch (err) {
    console.error('[main.tsx] Mount error:', err);
    rootElement.innerHTML = `<div style="color: #ef4444; padding: 20px; font-family: monospace; font-size: 12px;">Error: ${err instanceof Error ? err.message : String(err)}</div>`;
  }
}
