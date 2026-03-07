import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function ShowcaseShell() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
          height: '100vh',
          px: { xs: 3, md: 6 },
          py: 5,
          maxWidth: 960,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
