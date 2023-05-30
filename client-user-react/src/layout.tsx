import Header from './components/header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { JsxChild } from './types/jsxChild';
import Loader from './components/loader/loader';
import { useQuery } from '@tanstack/react-query';
import { currentUserFn } from './lib/api/user';

const Layout = ({ children }: JsxChild) => {
  const { error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: currentUserFn,
    retry: false,
    onSuccess: (res) => {
      console.log(res);
    },
  });
  console.log(error, isLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (!isLoading) {
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
