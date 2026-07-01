export const API_BASE_URL = 'http://localhost:8088';
export const TOKEN_KEY = 'ecommerce_jwt_token';

// API Endpoints Mapping
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
  },
  PRODUCTS: {
    BASE: '/products',
  },
  CART: {
    BASE: '/cart',
  },
  ORDERS: {
    BASE: '/orders',
  },
  USERS: {
    PROFILE: '/users/profile',
  },
};

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};
