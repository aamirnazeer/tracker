import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/home.tsx';
import ErrorPage from './errorPage.tsx';
import LoginPage from './routes/login.tsx';
import SignUp from './routes/signup.tsx';
import Layout from './layout.tsx';
import LogOut from './routes/logout.tsx';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';

const App = () => {
  const user = useSelector((state: RootState) => state.User);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout loggedIn={user.loggedIn} children={<Home />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/logout',
      element: <LogOut />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
