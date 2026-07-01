import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Link, InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Check if we were redirected here
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const result = await login(data);
    
    if (result.success) {
      showNotification('Successfully logged in!', 'success');
      navigate(from, { replace: true });
    } else {
      showNotification(result.message || 'Login failed', 'error');
    }
    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sign in to access your ApexCart account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ py: 1.5, mt: 1, mb: 2 }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" fontWeight="bold">
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
