import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../../store/user/userSlice';

const pages = [{ id: 1, name: 'Ledgers', path: '/ledgers' }];

interface LoggedIn {
  loggedIn: boolean;
}

const Header = () => {
  const navigate = useNavigate();

  const { data: userData, error, isLoading } = useGetCurrentUserQuery();
  // error && navigate('/login');

  // useEffect(() => {
  //   navigate('/login');
  // }, [loggedIn]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // useEffect(() => {
  //   if (!user.loggedIn) {
  //     axios
  //       .get('http://localhost:5000/api/currentuser', {
  //         withCredentials: true,
  //       })
  //       .then((res) => dispatch(logIn(res.data)))
  //       .catch((err) => {
  //         console.log(err.response.status);
  //         navigate('/login');
  //       });
  //   }
  // }, [user]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
      {
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <CurrencyRupeeIcon
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                HISAB
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.id} onClick={() => navigate(page.path)}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <CurrencyRupeeIcon
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={() => navigate(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {userData ? userData.firstname[0].toUpperCase() : ''}
                  </Avatar>
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
            </Toolbar>
          </Container>
        </AppBar>
      }
    </>
  );
};
export default Header;
