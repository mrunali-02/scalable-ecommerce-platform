import React, { createContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info'); // 'error', 'warning', 'info', 'success'

  const showNotification = useCallback((msg, sev = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
