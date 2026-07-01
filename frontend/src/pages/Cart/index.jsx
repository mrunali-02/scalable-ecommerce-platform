import React from 'react';
import { 
  Container, Grid, Box, Typography, Button, 
  Paper, IconButton, Divider, TextField 
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Cart = () => {
  const { cartItems, isLoading, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is currently empty.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/products" sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                    <Grid item xs={3} sm={2}>
                      <Box 
                        component="img"
                        src={item.product?.imageUrl || 'https://via.placeholder.com/150'}
                        alt={item.product?.name}
                        sx={{ width: '100%', borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={9} sm={4}>
                      <Typography variant="subtitle1" fontWeight="bold" component={Link} to={`/product/${item.product?.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.product?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatCurrency(item.product?.price)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1, width: 'fit-content' }}>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 2 }}>
                        {formatCurrency((item.product?.price || 0) * item.quantity)}
                      </Typography>
                      <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight="bold">{formatCurrency(cartTotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography fontWeight="bold">Calculated at checkout</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Taxes</Typography>
                <Typography fontWeight="bold">Calculated at checkout</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Estimated Total</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">{formatCurrency(cartTotal)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField size="small" placeholder="Discount code" fullWidth />
                <Button variant="outlined">Apply</Button>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                onClick={handleCheckout}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
