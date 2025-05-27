// src/main.jsx or src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      theme="light"
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
    />
    <App />
  </StrictMode>
);
