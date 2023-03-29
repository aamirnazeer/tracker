import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import axios from 'axios';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const router = useRouter();

  const logoutHandler = () => {
    axios
      .delete('http://localhost:5000/api/logout', {
        withCredentials: true,
      })
      .then(() => router.push('/login'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              sx={{ flexGrow: 1 }}
              onClick={() => router.push('/')}
            >
              Tracker
            </Typography>

            <Button color="inherit" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => router.push('/signup')}>
              Signup
            </Button>
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
