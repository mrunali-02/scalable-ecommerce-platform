import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Common guard imports
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import Layout from './components/layout/Layout';

// Lazy load pages for optimized loading speed and code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentFailed = lazy(() => import('./pages/PaymentFailed'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Notifications = lazy(() => import('./pages/Notifications'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/Products'));
const AdminOrders = lazy(() => import('./pages/Admin/Orders'));
const AdminUsers = lazy(() => import('./pages/Admin/Users'));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      flexGrow: 1,
    }}
  >
    <CircularProgress size={40} thickness={4} />
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />

            {/* Protected Routes (requires login) */}
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment-success"
              element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment-failed"
              element={
                <ProtectedRoute>
                  <PaymentFailed />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
