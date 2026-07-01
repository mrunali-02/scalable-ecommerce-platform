import React from 'react';
import { Box, Typography, Container, Link, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: theme.palette.mode === 'light' ? 'white' : 'background.paper',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' }}>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 300px' } }}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
              ApexCart
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The premier destination for premium tech. Building the future of commerce today.
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 150px' }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
              Shop
            </Typography>
            <Link href="/products" color="text.secondary" display="block" variant="body2" sx={{ textDecoration: 'none', mb: 1 }}>All Products</Link>
            <Link href="/categories" color="text.secondary" display="block" variant="body2" sx={{ textDecoration: 'none', mb: 1 }}>Categories</Link>
            <Link href="/deals" color="text.secondary" display="block" variant="body2" sx={{ textDecoration: 'none', mb: 1 }}>Hot Deals</Link>
          </Box>
          <Box sx={{ flex: '1 1 150px' }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
              Support
            </Typography>
            <Link href="/faq" color="text.secondary" display="block" variant="body2" sx={{ textDecoration: 'none', mb: 1 }}>FAQ</Link>
            <Link href="/contact" color="text.secondary" display="block" variant="body2" sx={{ textDecoration: 'none', mb: 1 }}>Contact Us</Link>
            <Link href="/shipping" color="text.secondary" display="block" variant="body2" sx={{ textDecoration: 'none', mb: 1 }}>Shipping Info</Link>
          </Box>
        </Box>
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ApexCart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
