import React, { useState } from 'react';
import { 
  Container, Grid, Box, Typography, Button, 
  Paper, TextField, Avatar, Divider, CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants';

const profileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});

const Profile = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const { register: regProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const { register: regPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPasswordForm } = useForm({
    resolver: yupResolver(passwordSchema)
  });

  const onProfileUpdate = async (data) => {
    setIsUpdatingProfile(true);
    try {
      await api.put(ENDPOINTS.USERS.PROFILE, data);
      showNotification('Profile updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update profile', 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPasswordUpdate = async (data) => {
    setIsUpdatingPassword(true);
    try {
      // Typically /auth/change-password or /users/me/password
      await api.put('/users/me/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      showNotification('Password changed successfully', 'success');
      resetPasswordForm();
    } catch (error) {
      showNotification('Failed to change password', 'error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Avatar 
              src="/static/images/avatar/2.jpg" 
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '3rem' }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {user?.name || 'User Name'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user?.email || 'user@example.com'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, display: 'inline-block', px: 2, py: 0.5, bgcolor: 'primary.50', color: 'primary.main', borderRadius: 4 }}>
              Role: {user?.role || 'Customer'}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <form onSubmit={handleProfileSubmit(onProfileUpdate)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Full Name" 
                    {...regProfile('name')} 
                    error={!!profileErrors.name} 
                    helperText={profileErrors.name?.message} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Email Address" 
                    {...regProfile('email')} 
                    error={!!profileErrors.email} 
                    helperText={profileErrors.email?.message} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Change Password
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handlePasswordSubmit(onPasswordUpdate)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    type="password" 
                    label="Current Password" 
                    {...regPassword('currentPassword')} 
                    error={!!passwordErrors.currentPassword} 
                    helperText={passwordErrors.currentPassword?.message} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    type="password" 
                    label="New Password" 
                    {...regPassword('newPassword')} 
                    error={!!passwordErrors.newPassword} 
                    helperText={passwordErrors.newPassword?.message} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    type="password" 
                    label="Confirm New Password" 
                    {...regPassword('confirmPassword')} 
                    error={!!passwordErrors.confirmPassword} 
                    helperText={passwordErrors.confirmPassword?.message} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="outlined" 
                    color="primary"
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
