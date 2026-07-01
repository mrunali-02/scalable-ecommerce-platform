import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, Button 
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/helpers';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get(ENDPOINTS.ORDERS.BASE);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        // Fallback mock data
        setOrders([
          { id: 'ORD-100234', date: '2023-10-15T10:30:00Z', total: 314.99, status: 'Delivered', items: 2 },
          { id: 'ORD-100235', date: '2023-10-20T14:45:00Z', total: 49.99, status: 'Processing', items: 1 },
          { id: 'ORD-100236', date: '2023-11-01T09:15:00Z', total: 1299.99, status: 'Shipped', items: 1 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'processing': return 'warning';
      case 'shipped': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You haven't placed any orders yet.
          </Typography>
          <Button variant="contained" component={Link} to="/products" sx={{ mt: 2 }}>
            Start Shopping
          </Button>
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mt: 4 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Total</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)} 
                      size="small" 
                      sx={{ fontWeight: 'bold' }} 
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="outlined" 
                      size="small" 
                      component={Link} 
                      to={`/orders/${order.id}`}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Orders;
