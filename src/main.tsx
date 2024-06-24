import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';

const rootElement = document.getElementById('root');

if (rootElement instanceof HTMLElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Toaster />
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
}
