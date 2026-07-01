import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 0, 
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Toolbar /> {/* Spacer for fixed Navbar */}
          <Box sx={{ flexGrow: 1, minHeight: 'calc(100vh - 64px - 200px)' }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
