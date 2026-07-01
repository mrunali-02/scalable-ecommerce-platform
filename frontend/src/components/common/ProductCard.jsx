import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Chip, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent triggering Link navigation
    const success = await addToCart(product, 1);
    if (success) {
      showNotification(`${product.name} added to cart`, 'success');
    }
  };

  return (
    <Card 
      component={Link} 
      to={`/product/${product.id}`}
      sx={{ 
        textDecoration: 'none',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {product.stock <= 0 && (
          <Chip 
            label="Out of Stock" 
            color="error" 
            size="small" 
            sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1, fontWeight: 'bold' }} 
          />
        )}
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.7)',
            '&:hover': { backgroundColor: 'white' }
          }}
          onClick={(e) => { e.preventDefault(); /* Wishlist toggle logic */ }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        <CardMedia
          component="img"
          height="220"
          image={product.imageUrl || 'https://via.placeholder.com/220'}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Typography gutterBottom variant="subtitle1" fontWeight="600" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '48px'
        }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category || 'Uncategorized'}
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {formatCurrency(product.price)}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<ShoppingCartOutlinedIcon />}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          sx={{ borderRadius: '8px' }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
