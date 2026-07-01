import React from 'react';
import { 
  Container, Grid, Paper, Typography, Box, 
  Card, CardContent, Divider 
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { formatCurrency } from '../../../utils/helpers';
// React-chartjs-2 is installed per package.json, so we could build real charts here
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', borderRadius: 2, borderLeft: `6px solid ${color}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
    <CardContent>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <Typography variant="overline" color="text.secondary" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ p: 2, bgcolor: `${color}15`, borderRadius: '50%', display: 'flex' }}>
            {React.cloneElement(icon, { sx: { color, fontSize: 32 } })}
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  // Mock data for charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#1976D2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Electronics', 'Wearables', 'Accessories'],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ['#1976D2', '#2e7d32', '#ed6c02'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="TOTAL REVENUE" value={formatCurrency(124500)} icon={<AttachMoneyIcon />} color="#1976D2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="TOTAL ORDERS" value="1,284" icon={<ShoppingBagIcon />} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="NEW USERS" value="452" icon={<PeopleAltIcon />} color="#ed6c02" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="CONVERSION RATE" value="4.8%" icon={<AssessmentIcon />} color="#9c27b0" />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Revenue Overview
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: 300 }}>
              <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Sales by Category
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
