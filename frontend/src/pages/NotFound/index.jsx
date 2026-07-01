import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 12, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom color="primary" sx={{ fontSize: '6rem', fontWeight: 800 }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
