import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Typography, TextField, MenuItem, 
  Select, FormControl, InputLabel, Pagination, Paper 
} from '@mui/material';
import ProductCard from '../../components/common/ProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build query string based on filters
        const params = new URLSearchParams({
          page,
          limit: itemsPerPage,
          ...(searchTerm && { search: searchTerm }),
          ...(category && { category }),
          ...(sort && { sort })
        });
        
        // Use generic endpoint or mock data if backend not fully up
        const response = await api.get(`${ENDPOINTS.PRODUCTS.BASE}?${params.toString()}`);
        setProducts(response.data.products || []);
        setTotalPages(Math.ceil((response.data.total || 0) / itemsPerPage) || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Fallback mock data for UI demo purposes if backend fails
        setProducts([
          { id: 1, name: 'Premium Noise-Cancelling Headphones', price: 299.99, stock: 50, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' },
          { id: 2, name: 'Minimalist Smartwatch Series X', price: 199.99, stock: 30, category: 'Wearables', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80' },
          { id: 3, name: 'Ultra-Slim Laptop 15"', price: 1299.99, stock: 15, category: 'Computers', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' },
          { id: 4, name: 'Wireless Charging Dock', price: 49.99, stock: 100, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80' },
          { id: 5, name: '4K Action Camera', price: 349.99, stock: 0, category: 'Cameras', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80' },
          { id: 6, name: 'Mechanical Keyboard', price: 129.99, stock: 42, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80' },
        ]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, category, sort, page]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Explore Products
      </Typography>

      {/* Filters & Search */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1.2fr' }, gap: 3 }}>
          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 1' } }}>
            <TextField
              fullWidth
              label="Search products..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Wearables">Wearables</MenuItem>
                <MenuItem value="Computers">Computers</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Cameras">Cameras</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="newest">Newest Arrivals</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Best Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>

      {/* Product Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : products.length > 0 ? (
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
            {products.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={(e, value) => setPage(value)} 
              color="primary" 
              size="large" 
            />
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Products;
