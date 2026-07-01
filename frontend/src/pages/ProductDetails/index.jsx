import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Grid, Box, Typography, Button, 
  Divider, Rating, Avatar, Paper, Tab, Tabs
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';
import { formatCurrency } from '../../utils/helpers';

// TabPanel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${ENDPOINTS.PRODUCTS.BASE}/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        // Fallback mock data
        setProduct({
          id,
          name: 'Premium Noise-Cancelling Headphones',
          price: 299.99,
          stock: 50,
          category: 'Electronics',
          description: 'Experience pure audio bliss with our latest noise-cancelling technology. These over-ear headphones deliver crisp highs and deep bass, perfect for audiophiles. Features up to 30 hours of battery life and rapid USB-C charging.',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
          rating: 4.8,
          reviews: 124
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'inc' && quantity < product.stock) {
      setQuantity(q => q + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCart(product, quantity);
    if (success) {
      showNotification(`Added ${quantity} x ${product.name} to cart`, 'success');
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (!product) return <Typography align="center" mt={10}>Product not found.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box 
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{ width: '100%', borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
          />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="overline" color="primary" fontWeight="bold">
            {product.category}
          </Typography>
          <Typography variant="h3" component="h1" fontWeight="800" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating || 0} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
              ({product.reviews || 0} reviews)
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
            {formatCurrency(product.price)}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
            <Typography variant="subtitle2">Quantity:</Typography>
            <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', borderRadius: 2 }}>
              <Button onClick={() => handleQuantityChange('dec')} disabled={quantity <= 1} sx={{ minWidth: 40 }}><RemoveIcon /></Button>
              <Typography sx={{ px: 2, fontWeight: 'bold' }}>{quantity}</Typography>
              <Button onClick={() => handleQuantityChange('inc')} disabled={quantity >= product.stock} sx={{ minWidth: 40 }}><AddIcon /></Button>
            </Paper>
            <Typography variant="body2" color={product.stock > 0 ? "success.main" : "error.main"}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              fullWidth
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ p: 1.5, borderRadius: 2, minWidth: 64 }}
            >
              <FavoriteBorderIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs Section for Reviews & Details */}
      <Box sx={{ width: '100%', mt: 8 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="product details tabs">
            <Tab label="Description" />
            <Tab label={`Reviews (${product.reviews || 0})`} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" color="text.secondary">
            {product.description}
            <br/><br/>
            Product dimensions, technical specifications, and shipping details would go here in a full production system.
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {/* Mock Reviews UI */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
            {[1, 2].map((review) => (
              <Box key={review} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>U</Avatar>
                  <Box>
                    <Typography variant="subtitle2">Verified User</Typography>
                    <Rating value={5} size="small" readOnly />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Absolutely love this product! It exceeds all my expectations and the build quality is fantastic. Highly recommended.
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductDetails;
