import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ py: 10 }}>
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
            <WarningAmberOutlinedIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              An unexpected error occurred. Please try refreshing the page.
            </Typography>
            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <Box
                sx={{
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                  textAlign: 'left',
                  overflowX: 'auto',
                }}
              >
                <Typography variant="caption" color="error" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}
            <Button variant="contained" color="primary" onClick={this.handleReset} size="large">
              Go to Home
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
