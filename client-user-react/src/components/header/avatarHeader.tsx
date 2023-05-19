import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
} from '@mui/material';
import { useGetCurrentUserQuery } from '../../store/user/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarHeader = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetCurrentUserQuery();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    handleCloseUserMenu();
    navigate('/logout');
  };

  const loginHandler = () => {
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>{userData ? userData.firstname[0].toUpperCase() : ''}</Avatar>
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {userData && (
            <MenuItem onClick={logoutHandler}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          )}
          {!userData && (
            <MenuItem onClick={loginHandler}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </>
  );
};

export default AvatarHeader;
