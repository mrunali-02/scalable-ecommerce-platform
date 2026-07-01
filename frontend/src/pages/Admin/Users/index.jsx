import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, 
  Box, Chip 
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AdminUsers = () => {
  // Mock Data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'Active', joined: '2023-01-15' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'customer', status: 'Active', joined: '2023-05-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'customer', status: 'Suspended', joined: '2023-08-10' },
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Manage Users
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell fontWeight="bold">ID</TableCell>
              <TableCell fontWeight="bold">Name</TableCell>
              <TableCell fontWeight="bold">Email</TableCell>
              <TableCell fontWeight="bold">Role</TableCell>
              <TableCell fontWeight="bold">Status</TableCell>
              <TableCell fontWeight="bold">Joined</TableCell>
              <TableCell fontWeight="bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.role.toUpperCase()} 
                    color={row.role === 'admin' ? 'secondary' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    color={row.status === 'Active' ? 'success' : 'error'} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{row.joined}</TableCell>
                <TableCell align="right">
                  {row.status === 'Active' ? (
                    <IconButton color="error" size="small" title="Suspend"><BlockIcon /></IconButton>
                  ) : (
                    <IconButton color="success" size="small" title="Activate"><CheckCircleOutlineIcon /></IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUsers;
