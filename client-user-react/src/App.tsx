import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/home/home.tsx';
import ErrorPage from './errorPage.tsx';
import LoginPage from './routes/login.tsx';
import SignUp from './routes/signup.tsx';
import Layout from './layout.tsx';
import LogOut from './routes/logout.tsx';
import Ledgers from './routes/ledgers/ledgers.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import LayoutInverse from './layoutInverse.tsx';
import NotFoundPage from './routes/notfound.tsx';
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout children={<Home />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/ledgers',
      element: <Layout children={<Ledgers />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/ledgers/part1',
      element: <Layout children={<Ledgers />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LayoutInverse children={<LoginPage />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element: <LayoutInverse children={<SignUp />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/logout',
      element: <LogOut />,
      errorElement: <ErrorPage />,
    },
    {
      path: '*',
      element: <Layout children={<NotFoundPage />} />,
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
