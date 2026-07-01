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
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: authRegister } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;
    
    const result = await authRegister(registerData);
    
    if (result.success) {
      showNotification('Registration successful! Please sign in.', 'success');
      navigate('/login');
    } else {
      showNotification(result.message || 'Registration failed', 'error');
    }
    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Join ApexCart for the best tech deals
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

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
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ py: 1.5, mt: 3, mb: 2 }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" fontWeight="bold">
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
