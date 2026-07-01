import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardMedia, 
  CardContent,
  CardActions,
  Chip,
  IconButton,
  useTheme
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

const Home = () => {
  const theme = useTheme();

  const featuredProducts = [
    { id: 1, name: 'Premium Noise-Cancelling Headphones', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', tag: 'New' },
    { id: 2, name: 'Minimalist Smartwatch Series X', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', tag: 'Trending' },
    { id: 3, name: 'Ultra-Slim Laptop 15"', price: 1299.99, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80', tag: 'Sale' },
    { id: 4, name: 'Wireless Charging Dock', price: 49.99, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80' },
  ];

  const features = [
    { icon: <LocalShippingOutlinedIcon fontSize="large" />, title: 'Free Global Delivery', desc: 'On orders over $150' },
    { icon: <SecurityOutlinedIcon fontSize="large" />, title: 'Secure Payments', desc: '256-bit encryption' },
    { icon: <SupportAgentOutlinedIcon fontSize="large" />, title: '24/7 Support', desc: 'Dedicated customer care' },
  ];

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 16 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="800" 
                gutterBottom
                sx={{ 
                  textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  letterSpacing: '-1px'
                }}
              >
                Discover the Future of Tech.
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400, maxWidth: '500px' }}>
                Experience unparalleled innovation with our curated selection of premium electronics.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  endIcon={<ShoppingBagOutlinedIcon />}
                  sx={{ 
                    borderRadius: '30px', 
                    px: 4, 
                    py: 1.5, 
                    fontWeight: 'bold',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)' 
                  }}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderRadius: '30px', 
                    px: 4, 
                    py: 1.5, 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, width: '100%', display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=800&q=80"
                alt="Premium tech"
                sx={{
                  width: '100%',
                  borderRadius: '24px',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                  transform: 'rotate(-3deg)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(0deg)'
                  }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 3 }}>
        <Card sx={{ borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, justifyContent: 'center' }}>
              {features.map((feature, idx) => (
                <Box key={idx} sx={{ flex: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Box>
            <Typography variant="overline" color="primary" fontWeight="bold" sx={{ letterSpacing: 2 }}>
              Curated Collection
            </Typography>
            <Typography variant="h3" component="h2" fontWeight="700">
              Trending Now
            </Typography>
          </Box>
          <Button endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 'bold' }}>
            View All
          </Button>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
          {featuredProducts.map((product) => (
            <Box key={product.id}>
              <Card 
                sx={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  {product.tag && (
                    <Chip 
                      label={product.tag} 
                      color={product.tag === 'Sale' ? 'error' : 'primary'}
                      size="small"
                      sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1, fontWeight: 'bold' }}
                    />
                  )}
                  <IconButton 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      zIndex: 1,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'white' }
                    }}
                  >
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.name}
                    sx={{ transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.05)' } }}
                  />
                </Box>
                <CardContent sx={{ pt: 3 }}>
                  <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1, height: '48px', overflow: 'hidden' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth disableElevation sx={{ borderRadius: '8px', py: 1 }}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
