import { useGetCurrentUserQuery } from './store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ILayout {
  children: React.ReactNode;
}

const LayoutInverse = ({ children }: ILayout) => {
  const navigate = useNavigate();
  const { data: userData, error, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && userData) {
      navigate('/');
    }
  }, [isLoading, userData]);

  return <>{children}</>;
};

export default LayoutInverse;
