import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Products', icon: <StoreIcon />, path: '/products' },
  ];

  if (isAuthenticated) {
    navItems.push({ text: 'Profile', icon: <PersonIcon />, path: '/profile' });
  } else {
    navItems.push({ text: 'Login', icon: <LoginIcon />, path: '/login' });
  }

  const drawer = (
    <div>
      <Toolbar /> {/* Spacer for Navbar */}
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                onClick={isMobile ? handleDrawerToggle : undefined}
                selected={location.pathname === item.path}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': { color: 'white' }
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop Drawer (Hidden, since we primarily use Top Navbar for Desktop) */}
      {/* If a permanent sidebar is desired on desktop, uncomment below */}
      {/* <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', boxShadow: 1 },
        }}
        open
      >
        {drawer}
      </Drawer> */}
    </Box>
  );
};

export default Sidebar;
