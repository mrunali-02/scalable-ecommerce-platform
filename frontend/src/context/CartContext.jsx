import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync cart from backend when user logs in
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await api.get(ENDPOINTS.CART.BASE);
      // Normalize — handle both {items:[]} and plain array responses
      const data = response.data;
      const items = Array.isArray(data) ? data : (data?.items || []);
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) return false;
    
    try {
      await api.post(ENDPOINTS.CART.BASE, { productId: product.id, quantity });
      // Optimistic update for better UX could go here
      await fetchCart();
      return true;
    } catch (error) {
      console.error("Failed to add to cart", error);
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;
    
    try {
      await api.delete(`${ENDPOINTS.CART.BASE}/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated || quantity < 1) return;
    
    try {
      await api.put(`${ENDPOINTS.CART.BASE}/${itemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed to update cart quantity", error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      await api.delete(ENDPOINTS.CART.BASE);
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + ((item?.product?.price || item?.price || 0) * (item?.quantity || 0)),
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + (item?.quantity || 0),
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        isLoading, 
        cartTotal, 
        cartCount,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
