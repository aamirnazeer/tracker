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
import Signup from '@/components/signup';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signin, setSignin] = useState(false);

  const loginHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoggedIn(true);
    setSignin(false);
  };
  const signinHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoggedIn(false);
    setSignin(true);
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
              Tracker
            </Typography>
            <Button
              color="inherit"
              onClick={(e) => loginHandler(e)}
              disabled={false}
            >
              Login
            </Button>
            <Button color="inherit" onClick={(e) => signinHandler(e)}>
              Signup
            </Button>
          </Toolbar>
        </AppBar>
        {loggedIn && <Login />}
        {signin && <Signup />}
      </Box>
    </div>
  );
}
