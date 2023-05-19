import Header from './components/header/header';
import { useGetCurrentUserQuery } from './store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { JsxChild } from './types/jsxChild';
import Loader from './components/loader/loader';

const Layout = ({ children }: JsxChild) => {
  const navigate = useNavigate();
  const { data: userData, error, isLoading } = useGetCurrentUserQuery();
  console.log('from layout', userData, error, isLoading);
  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error]);

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
