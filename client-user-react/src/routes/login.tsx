import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BackDropLoader from '../components/backdropLoader/backdropLoader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginFn } from '../lib/api/user';

const LogIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        const delayDebounceFn = setTimeout(() => {
          navigate('/');
        }, 3000);
        clearTimeout(delayDebounceFn);
      }
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    loginMutation.mutate({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <>
      {loading && <BackDropLoader />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernmae"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LogIn;
