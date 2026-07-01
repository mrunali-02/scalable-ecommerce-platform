import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#1976D2', // Brand Primary
    },
    secondary: {
      main: '#424242', // Brand Secondary
    },
    background: {
      default: mode === 'light' ? '#F5F5F5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0 4px 12px rgba(0,0,0,0.05)' 
            : '0 4px 12px rgba(0,0,0,0.5)',
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
