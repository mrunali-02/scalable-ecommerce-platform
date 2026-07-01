import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, IconButton, 
  Box, Chip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency } from '../../../utils/helpers';

const AdminProducts = () => {
  // Mock Data
  const [products] = useState([
    { id: 1, name: 'Premium Noise-Cancelling Headphones', price: 299.99, stock: 50, category: 'Electronics' },
    { id: 2, name: 'Minimalist Smartwatch Series X', price: 199.99, stock: 30, category: 'Wearables' },
    { id: 3, name: 'Ultra-Slim Laptop 15"', price: 1299.99, stock: 0, category: 'Computers' },
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Manage Products
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell fontWeight="bold">ID</TableCell>
              <TableCell fontWeight="bold">Product Name</TableCell>
              <TableCell fontWeight="bold">Category</TableCell>
              <TableCell fontWeight="bold">Price</TableCell>
              <TableCell fontWeight="bold">Stock</TableCell>
              <TableCell fontWeight="bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell fontWeight="500">{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{formatCurrency(row.price)}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.stock > 0 ? `${row.stock} in stock` : 'Out of Stock'} 
                    color={row.stock > 0 ? 'success' : 'error'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small"><EditIcon /></IconButton>
                  <IconButton color="error" size="small"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminProducts;
