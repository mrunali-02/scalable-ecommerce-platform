import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../styles/theme';

export const ThemeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
