import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been placed successfully and is now being processed.
          You will receive an email confirmation shortly.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" component={Link} to="/orders" size="large">
            View Orders
          </Button>
          <Button variant="contained" component={Link} to="/" size="large">
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
