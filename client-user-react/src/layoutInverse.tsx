import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { currentUserFn } from './lib/api/user';

interface ILayout {
  children: React.ReactNode;
}

const LayoutInverse = ({ children }: ILayout) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: currentUserFn,
    retry: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && userData) {
      navigate('/');
    }
  }, [isLoading, userData]);

  return <>{children}</>;
};

export default LayoutInverse;
