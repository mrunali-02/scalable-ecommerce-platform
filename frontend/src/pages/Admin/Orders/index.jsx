import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, 
  Box, Chip, Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { formatCurrency } from '../../../utils/helpers';

const AdminOrders = () => {
  // Mock Data
  const [orders] = useState([
    { id: 'ORD-100234', user: 'john@example.com', date: '2023-10-15', total: 314.99, status: 'Delivered' },
    { id: 'ORD-100235', user: 'sarah@example.com', date: '2023-10-20', total: 49.99, status: 'Processing' },
    { id: 'ORD-100236', user: 'mike@example.com', date: '2023-11-01', total: 1299.99, status: 'Shipped' },
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'processing': return 'warning';
      case 'shipped': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Manage Orders
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell fontWeight="bold">Order ID</TableCell>
              <TableCell fontWeight="bold">Customer</TableCell>
              <TableCell fontWeight="bold">Date</TableCell>
              <TableCell fontWeight="bold">Status</TableCell>
              <TableCell fontWeight="bold">Total</TableCell>
              <TableCell fontWeight="bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    color={getStatusColor(row.status)} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }} 
                  />
                </TableCell>
                <TableCell>{formatCurrency(row.total)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton color="primary" size="small" sx={{ mr: 1 }}><VisibilityIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Mark as Shipped">
                    <IconButton color="info" size="small"><LocalShippingIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrders;
