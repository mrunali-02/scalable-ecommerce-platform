import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Notifications = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Notifications list placeholder
        </Typography>
      </Box>
    </Container>
  );
};

export default Notifications;
