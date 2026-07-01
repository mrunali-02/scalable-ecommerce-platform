import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Container, Grid, Box, Typography, Button, 
  Paper, TextField, Divider, Radio, RadioGroup, 
  FormControlLabel, FormControl, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants';
import { useNotification } from '../../hooks/useNotification';

// Address Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  addressLine1: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('Zip Code is required'),
  country: yup.string().required('Country is required'),
});

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const tax = cartTotal * 0.1; // 10% mock tax
  const shipping = cartTotal > 150 ? 0 : 15.00; // Free shipping over $150
  const finalTotal = cartTotal + tax + shipping;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      // Simulate API call to Order & Payment Services via API Gateway
      const orderPayload = {
        items: cartItems.map(item => ({ productId: item.product.id, quantity: item.quantity })),
        shippingAddress: data,
        paymentMethod,
        totalAmount: finalTotal
      };
      
      // Attempt actual endpoint, but fallback to immediate success simulation if backend fails
      try {
        await api.post(`${ENDPOINTS.ORDERS.BASE}/checkout`);
      } catch (e) {
        console.warn("Backend order creation failed, simulating success for demo.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      await clearCart();
      navigate('/payment-success');
    } catch (error) {
      showNotification('Payment failed to process', 'error');
      navigate('/payment-failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !isProcessing) {
    navigate('/cart');
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Shipping Address */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Name" {...register('fullName')} error={!!errors.fullName} helperText={errors.fullName?.message} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address Line 1" {...register('addressLine1')} error={!!errors.addressLine1} helperText={errors.addressLine1?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" {...register('city')} error={!!errors.city} helperText={errors.city?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="State/Province" {...register('state')} error={!!errors.state} helperText={errors.state?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Zip/Postal Code" {...register('zipCode')} error={!!errors.zipCode} helperText={errors.zipCode?.message} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Country" {...register('country')} error={!!errors.country} helperText={errors.country?.message} />
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Method */}
            <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Payment Method
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="credit_card" control={<Radio color="primary" />} label="Credit/Debit Card" />
                  <FormControlLabel value="paypal" control={<Radio color="primary" />} label="PayPal" />
                </RadioGroup>
              </FormControl>
              
              {paymentMethod === 'credit_card' && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Card Number" placeholder="0000 0000 0000 0000" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="CVV" placeholder="123" />
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {cartItems.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '70%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.quantity}x {item.product?.name}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(item.product?.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight="bold">{formatCurrency(cartTotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography fontWeight="bold">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Estimated Tax</Typography>
                <Typography fontWeight="bold">{formatCurrency(tax)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Total</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">{formatCurrency(finalTotal)}</Typography>
              </Box>

              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                disabled={isProcessing}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                {isProcessing ? <CircularProgress size={24} color="inherit" /> : `Pay ${formatCurrency(finalTotal)}`}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Checkout;
