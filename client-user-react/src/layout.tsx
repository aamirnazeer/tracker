import Header from './components/header/header';
import { useGetCurrentUserQuery } from './store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { JsxChild } from './types/jsxChild';
import Loader from './components/loader/loader';

const Layout = ({ children }: JsxChild) => {
  const navigate = useNavigate();
  const { error, isLoading } = useGetCurrentUserQuery();
  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (isLoading === false) {
    return (
      <>
        {!error ? (
          <>
            <Header />
            {children}
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  } else return <Loader />;
};

export default Layout;
