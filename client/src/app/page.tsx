'use client';

import { useState, MouseEvent } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Login from '@/components/login';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoggedIn((prevState) => !prevState);
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit" onClick={(e) => loginHandler(e)}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        {loggedIn && <Login />}
      </Box>
    </div>
  );
}
