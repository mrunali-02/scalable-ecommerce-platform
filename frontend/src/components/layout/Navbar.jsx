import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Badge, Box, Menu, MenuItem, Avatar, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useThemeMode } from '../../hooks/useThemeMode';

const Navbar = ({ onMenuClick }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="inherit" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'primary.main', 
            fontWeight: 800,
            letterSpacing: '-0.5px'
          }}
        >
          ApexCart
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {!isMobile && (
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
          )}

          <IconButton color="inherit" component={Link} to="/cart" sx={{ ml: 1 }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenu} sx={{ p: 0, ml: 2 }}>
                <Avatar alt={user?.name || 'User'} src="/static/images/avatar/2.jpg" sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to="/orders" onClick={handleClose}>My Orders</MenuItem>
                {user?.role === 'admin' && (
                  <MenuItem component={Link} to="/admin/dashboard" onClick={handleClose}>Admin Dashboard</MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
              <Button color="primary" variant="outlined" component={Link} to="/login" sx={{ mr: 1, borderRadius: 2 }}>
                Login
              </Button>
              <Button color="primary" variant="contained" component={Link} to="/register" sx={{ borderRadius: 2 }}>
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
