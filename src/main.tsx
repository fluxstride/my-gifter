import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement instanceof HTMLElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Toaster />
      <App />
    </React.StrictMode>,
  );
}
