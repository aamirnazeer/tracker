/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, logIn } from '@/redux/user/userSlice';
import { RootState } from '@/redux/store';
import { axiosInstance } from '@/axios/axiosInstance';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  Link,
} from '@mui/material';
import Image from 'mui-image';

import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get('/currentuser')
      .then((res) => dispatch(logIn(res.data)))
      .catch((err) => {
        dispatch(logOut());
        router.push('/login');
      });
  }, []);

  const logoutHandler = () => {
    axios
      .delete('http://localhost:5000/api/logout', {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logOut());
        router.push('/login');
      })
      .catch((err) => console.log(err));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon sx={{ color: 'white' }} />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() => {
                  router.push('/');
                  handleClose();
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push('/entries');
                  handleClose();
                }}
              >
                Entries
              </MenuItem>
            </Menu>
          </div>

          <Box sx={{ maxWidth: '140px', opacity: '100' }}>
            <Link href="/">
              <Image src="./logo.png" alt="logo" style={{ opacity: '100' }} />
            </Link>
          </Box>

          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Box sx={{ justifyContent: 'flex-end' }}>
            {!user.loggedIn ? (
              <div>
                <Button color="inherit" onClick={() => router.push('/login')}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => router.push('/signup')}>
                  Signup
                </Button>
              </div>
            ) : (
              <Button color="inherit" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
