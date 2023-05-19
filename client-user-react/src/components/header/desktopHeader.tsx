import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import pages from './pages';

const DesktopHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <CurrencyRupeeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        HISAB
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        {pages.map((page) => (
          <Button
            key={page.id}
            onClick={() => {
              navigate(page.path);
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default DesktopHeader;
