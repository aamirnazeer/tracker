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
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../lib/axiosClient';
import { IUser } from '../../types/user';

import { useDispatch } from 'react-redux';
import { ledgerApi } from '../../store/ledger/ledgerSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOutFn } from '../../lib/api/user';
import { ISignoutResponse } from '../../types/user';

const AvatarHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const { data: userData } = useGetCurrentUserQuery();
  const { data: userData } = useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => (await axiosClient.get('/currentuser')).data,
    retry: false,
  });

  const signOut = useMutation<ISignoutResponse, unknown, void>({
    mutationFn: signOutFn,
    onSuccess: () => {
      {
        console.log('success');
        queryClient.removeQueries({ queryKey: ['user'] });
        navigate('/login');
        dispatch(ledgerApi.util.resetApiState());
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    handleCloseUserMenu();
    signOut.mutate();
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
