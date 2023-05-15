import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home.tsx';
import ErrorPage from './errorPage.tsx';
import Header from './components/header/header.tsx';
import LoginPage from './routes/login.tsx';
import SignUp from './routes/signup.tsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
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
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
