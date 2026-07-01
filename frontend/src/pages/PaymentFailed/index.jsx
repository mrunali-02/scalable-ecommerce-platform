import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We're sorry, but we were unable to process your payment. 
          Please check your payment details and try again, or use a different payment method.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" component={Link} to="/cart" size="large">
            Back to Cart
          </Button>
          <Button variant="contained" component={Link} to="/checkout" size="large" color="error">
            Try Again
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentFailed;
