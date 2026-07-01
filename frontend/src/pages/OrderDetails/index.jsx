import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, Grid, Box, Typography, Button, 
  Paper, Divider, Chip, Stepper, Step, StepLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/helpers';

const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${ENDPOINTS.ORDERS.BASE}/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
        // Fallback mock data
        setOrder({
          id,
          date: '2023-10-15T10:30:00Z',
          total: 314.99,
          subtotal: 299.99,
          shipping: 15.00,
          tax: 0.00,
          status: 'Shipped',
          items: [
            { id: 1, name: 'Premium Noise-Cancelling Headphones', price: 299.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80' }
          ],
          shippingAddress: {
            fullName: 'John Doe',
            addressLine1: '123 Tech Lane',
            city: 'Innovation City',
            state: 'CA',
            zipCode: '90210',
            country: 'USA'
          },
          paymentMethod: 'Credit Card (**** 1234)'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!order) return <Typography align="center" mt={10}>Order not found.</Typography>;

  const getActiveStep = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button startIcon={<ArrowBackIcon />} component={Link} to="/orders" sx={{ mb: 4 }}>
        Back to Orders
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Order #{order.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Placed on {new Date(order.date).toLocaleString()}
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Invoice
        </Button>
      </Box>

      {/* Order Timeline */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Items Ordered
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {order.items.map((item, index) => (
              <Box key={item.id} sx={{ display: 'flex', mb: index !== order.items.length -1 ? 3 : 0 }}>
                <Box 
                  component="img"
                  src={item.imageUrl}
                  alt={item.name}
                  sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, mr: 3 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Qty: {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {formatCurrency(item.price * item.quantity)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>{formatCurrency(order.subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography>{formatCurrency(order.shipping)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Tax</Typography>
              <Typography>{formatCurrency(order.tax)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                {formatCurrency(order.total)}
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Shipping Address
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {order.shippingAddress?.fullName}<br/>
              {order.shippingAddress?.addressLine1}<br/>
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br/>
              {order.shippingAddress?.country}
            </Typography>

            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
              Payment Method
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">
              {order.paymentMethod}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;
