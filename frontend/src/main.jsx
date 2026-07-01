import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeModeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeModeProvider>
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeModeProvider>
    </ErrorBoundary>
  </StrictMode>
);
