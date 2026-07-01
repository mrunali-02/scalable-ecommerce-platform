import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { TOKEN_KEY, ENDPOINTS } from '../constants';
import { parseJwt } from '../utils/helpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          // Attempt to fetch profile to ensure token is valid
          const response = await api.get(ENDPOINTS.USERS.PROFILE);
          const userData = response.data;
          
          // Decode token to get roles if not included in profile payload
          const decoded = parseJwt(token);
          
          setUser({ ...userData, role: decoded?.role || userData.role || 'customer' });
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth initialization failed:", error);
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
      // Support both 'access_token' (OAuth2 standard) and 'token'
      const token = response.data?.access_token || response.data?.token;
      if (!token) throw new Error('No token received from server');

      localStorage.setItem(TOKEN_KEY, token);
      const decoded = parseJwt(token);

      // Try to get full profile; fall back to decoded JWT payload
      let userData = {};
      try {
        const profileRes = await api.get(ENDPOINTS.USERS.PROFILE);
        userData = profileRes.data;
      } catch (e) {
        userData = { id: decoded?.user_id || decoded?.sub, email: decoded?.email };
      }

      setUser({ ...userData, role: decoded?.role || userData.role || 'customer' });
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || error.response?.data?.message || 'Login failed.' 
      };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      await api.post(ENDPOINTS.AUTH.REGISTER, userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || error.response?.data?.message || 'Registration failed.' 
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
