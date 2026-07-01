import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../../components/common/ProductCard';

const Wishlist = () => {
  // Mock wishlist data for UI rendering
  const wishlistItems = [
    { id: 2, name: 'Minimalist Smartwatch Series X', price: 199.99, stock: 30, category: 'Wearables', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80' },
    { id: 4, name: 'Wireless Charging Dock', price: 49.99, stock: 100, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        My Wishlist
      </Typography>

      {wishlistItems.length > 0 ? (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {wishlistItems.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            Your wishlist is empty.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Wishlist;
