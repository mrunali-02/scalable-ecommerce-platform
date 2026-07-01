import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullScreen ? '100vh' : '40vh',
        width: '100%',
        p: 3
      }}
    >
      <CircularProgress size={48} thickness={4} color="primary" sx={{ mb: 2 }} />
      {message && (
        <Typography variant="body1" color="text.secondary" fontWeight="500">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
