import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement instanceof HTMLElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Toaster />
      <App />
    </React.StrictMode>,
  );
}

// const codesTable = [{ id: '', code: '024', userId: 'hjfkhs-sdfjsdf-sdf' }];
//
// const usersTable = [{ id: '', name: 'sdfd', pickedBy: null }];
//
//
//
// const code = '024';
//
// const userCode = codesTable.find(currentCode => currentCode.code === code);
//
// if (!userCode) {
// }
//
// const unpickedUsers = usersTable.filter(
//   user => user.id !== userCode?.userId && user.pickedBy !== null,
// );
